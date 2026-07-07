from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.hashers import make_password
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views import View
from django.contrib import messages
from django.utils.html import strip_tags
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.template.loader import render_to_string
from django.views.decorators.cache import cache_page

from .forms import ProfileForm, RegisterForm, CreatePostForm
from .models import Post, Profile, Follow
from users.models import CustomUser

# Create your views here.

@login_required(redirect_field_name=None)
def profile_posts(request, user_id):
    first_name = CustomUser.objects.get(pk=user_id).first_name
    posts = Post.objects.filter(user=user_id).order_by("-created_at")
    avatar_url = Profile.objects.get(user_id=user_id).avatar.url
    # avatar_url = Profile.objects.get(user_id=user_id).avatar.url if Profile.objects.filter(user_id=user_id).exists() else None
    isFollowing = False
    if request.user.id != user_id:
        isFollowing = Follow.objects.filter(
            follower=request.user, following_id=user_id).exists()

    return render(request, "blog/profile_posts.html", {
        "first_name": first_name,
        "user_id": user_id,
        "posts": posts,
        "pos1ts_count": posts.count(),
        "avatar_url": avatar_url,
        "isFollowing": isFollowing
    })

@cache_page(20)
def profile_posts_raw(request, user_id):
    first_name = CustomUser.objects.get(pk=user_id).first_name
    posts = Post.objects.filter(user=user_id).order_by("-created_at")

    html_string = render_to_string("blog/includes/profile_posts_only.html", {
        "posts": posts,
        })

    return JsonResponse({
        "theHTML": html_string,
        "docTitle": first_name + "'s Profile",
    })

@login_required(redirect_field_name=None)
def profile_followers(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    followers = Follow.objects.filter(following=user).select_related('follower')
    avatar_url = Profile.objects.get(user_id=user_id).avatar.url
    return render(request, "blog/profile_followers.html", {
        "followers": followers,
        "user_id": user_id,
        "avatar_url": avatar_url,
        "first_name": user.first_name
    })

@cache_page(20)
def profile_followers_raw(request, user_id):
    first_name = CustomUser.objects.get(pk=user_id).first_name
    user = get_object_or_404(CustomUser, id=user_id)
    followers = Follow.objects.filter(following=user).select_related('follower')

    html_string = render_to_string("blog/includes/profile_followers_only.html", {
        "followers": followers,
        })

    return JsonResponse({
        "theHTML": html_string,
        "docTitle": first_name + "'s Followers",
    })


@login_required(redirect_field_name=None)
def profile_following(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    following = Follow.objects.filter(follower=user).select_related('following')
    avatar_url = Profile.objects.get(user_id=user_id).avatar.url
    return render(request, "blog/profile_following.html", {
        "following": following,
        "user_id": user_id,
        "avatar_url": avatar_url,
        "first_name": user.first_name
    })


@cache_page(20)
def profile_following_raw(request, user_id):
    first_name = CustomUser.objects.get(pk=user_id).first_name
    user = get_object_or_404(CustomUser, id=user_id)
    following = Follow.objects.filter(follower=user).select_related('following')

    html_string = render_to_string("blog/includes/profile_following_only.html", {
        "following": following,
        })

    return JsonResponse({
        "theHTML": html_string,
        "docTitle": "Who " + first_name + " Follows",
    })


@login_required(redirect_field_name=None)
def follow_user(request, user_id):
    # if request.method == "POST":
    target_user = get_object_or_404(CustomUser, id=user_id)

    # Create the follow relationship
    Follow.objects.get_or_create(
        follower=request.user,
        following=target_user
    )
    messages.success(request, "User successfully followed!")
    return redirect("view_profile", user_id=user_id)


@login_required(redirect_field_name=None)
def unfollow_user(request, user_id):
    # if request.method == "POST":
    target_user = get_object_or_404(CustomUser, id=user_id)

    # Remove the relationship
    Follow.objects.filter(
        follower=request.user,
        following=target_user
    ).delete()
    messages.success(request, "User successfully unfollowed!")
    return redirect("view_profile", user_id=user_id)


@login_required(redirect_field_name=None)
def manage_avatar(request):
    # Fetch or auto-create the profile instance for the logged-in user
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        old_avatar = profile.avatar
        print("Old avatar before form validation:", old_avatar)

        if form.is_valid():
            form.save()
            messages.success(
                request, "Your avatar has been updated successfully!")
            if old_avatar and old_avatar.url != profile.avatar.url:
                old_avatar.delete(save=False)
        else:
            messages.error(request, "Please select an image to upload.")
        return redirect("view_profile", user_id=request.user.id)
    else:
        form = ProfileForm(instance=profile)

    return render(request, "blog/avatar-form.html", {"form": form})


@login_required(redirect_field_name=None)
def delete_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    can_edit = post.can_edit(request.user)
    if can_edit:
        post.delete()
        messages.success(request, "Your post has been deleted successfully!")
    else:
        messages.error(
            request, "You do not have permission to delete this post.")

    return redirect("view_profile", user_id=request.user.id)


@login_required(redirect_field_name=None)
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    can_edit = post.can_edit(request.user)
    if not can_edit:
        messages.error(
            request, "You do not have permission to edit this post.")
        return redirect("view_profile", user_id=request.user.id)

    if request.method == "POST":
        form = CreatePostForm(request.POST, instance=post)
        if form.is_valid():
            edited_post = form.save(commit=False)
            edited_post.title = strip_tags(request.POST.get("title"))
            edited_post.body = strip_tags(request.POST.get("body"))
            edited_post.save()
            messages.success(request, "Your post has been updated successfully!")
            return redirect("view_single_post", post_id=post.id)
    else:
        form = CreatePostForm(instance=post)

    return render(request, "blog/edit_post.html", {"form": form, "post": post})


class SearchPostsView(View):
    def get(self, request, term):
        # query = request.GET.get("q", "")
        posts = Post.objects.filter(title__icontains=term).order_by("-created_at").values("id", "title", "body")
        posts_list = list(posts)  # Convert QuerySet to a list of dictionaries
        # posts_list_json = JsonResponse(posts_list, safe=False)  # Convert list to JSON response

        return HttpResponse(JsonResponse(posts_list, safe=False), content_type="application/json")


        # return render(request, "blog/search_results.html", {
        #     "query": term,
        #     "page_obj": page_obj,
        # })


class ShowCorrectHomepageView(View):
    def get(self, request):
        if request.user.is_authenticated:
            posts = Post.objects.filter(user__followers_set__follower=request.user).order_by("-created_at")

            paginator = Paginator(posts, 5)  # Show 5 posts per page
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)

            return render(request, "blog/homepage_feed.html", {
                "first_name": request.user.first_name,
                "page_obj": page_obj,
                # "posts": posts
            })
        else:
            form = RegisterForm()
            return render(request, "blog/homepage.html", {
                "form": form
            })


def register(request):
    form = RegisterForm(request.POST)
    if form.is_valid():
        user = form.save(commit=False)
        user.password = make_password(form.cleaned_data["password"])
        user.save()

        profile = Profile.objects.create(user=user)
        profile.avatar = "avatars/fallback-avatar.webp"
        profile.save()

        login(request, user, backend="django.contrib.auth.backends.ModelBackend")

        return redirect("index")
    else:
        return render(request, "blog/homepage.html", {
            "form": form
        })


def blog_login(request):
    # if request.method == "POST":
    entered_email = request.POST.get("email")
    entered_password = request.POST.get("password")

    user = authenticate(request, email=entered_email,
                        password=entered_password)

    if user is not None:
        login(request, user)
        messages.success(request, "You have logged in successfully!")
        return redirect("index")
    else:
        messages.error(
            request, "Invalid email or password. Please try again.")
        return redirect("index")


def blog_logout(request):
    logout(request)
    messages.success(request, "You have logged out successfully!")
    return redirect("index")


class CreatePostView(LoginRequiredMixin, View):
    redirect_field_name = None

    def get(self, request):
        form = CreatePostForm()
        return render(request, "blog/create-post.html", {"form": form})

    def post(self, request):
        form = CreatePostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.title = strip_tags(request.POST.get("title"))
            post.body = strip_tags(request.POST.get("body"))
            post.save()
            # print(post.pk)
            # return HttpResponse("Post created successfully!")
            return redirect("view_single_post", post_id=post.pk)

        else:
            return render(request, "blog/create-post.html", {"form": form})


@login_required(redirect_field_name=None)
def view_single_post(request, post_id):
    post = Post.objects.get(pk=post_id)
    avatar_url = Profile.objects.get(user_id=post.user.id).avatar.url
    can_edit = post.can_edit(request.user)

    return render(request, "blog/single_post.html", {
        "first_name": post.user.first_name,
        "last_name": post.user.last_name,
        "post": post,
        "avatar_url": avatar_url,
        "user_id": post.user.id,
        "can_edit": can_edit
    })


# def create_post(request):
#     form = CreatePostForm()
#     if form.is_valid():
#         post = form.save(commit=False)
#         post.user_id = request.user
#         post.save()
#         messages.success(request, "Your post has been created successfully!")
#         return redirect("index")
