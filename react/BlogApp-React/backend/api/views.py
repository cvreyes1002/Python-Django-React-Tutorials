from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    AvatarSerializer,
    PostSerializer,
    FollowSerializer,
    UserMinSerializer,
)
from rest_framework.generics import (
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from .models import Post, Follow
from .permissions import IsAuthorOrReadOnly
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


class FollowStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        
        target_user = get_object_or_404(User, id=pk)  # Fetch the specified user or return 404 if they don't exist

        followers_count = target_user.followers_set.count()
        following_count = target_user.following_set.count()

        return Response(
            {
                # "user_id": target_user.id,
                "followers_count": followers_count,
                "following_count": following_count,
            }
        )


# class FollowStatsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         # 'followers_set' comes from the related_name in the 'following' field
#         followers_count = user.followers_set.count()

#         # 'following_set' comes from the related_name in the 'follower' field
#         following_count = user.following_set.count()

#         return Response({
#             "followers_count": followers_count,
#             "following_count": following_count
#         })


class FollowUnfollowView(APIView):
    permission_classes = [IsAuthenticated]

    # GET (Check if current user is following target user)
    def get(self, request, pk):
        # Check if a follow record exists matching the current user and the target user
        is_following = Follow.objects.filter(
            follower=request.user.id,
            following=pk
        ).exists()

        return Response({"is_following": is_following}, status=status.HTTP_200_OK)


    # POST (to follow)
    def post(self, request, pk):
        user_to_follow = get_object_or_404(User, id=pk)

        if request.user == user_to_follow:
            return Response(
                {"detail": "You cannot follow yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # get_or_create prevents duplicate follow records gracefully
        follow, created = Follow.objects.get_or_create(
            follower=request.user, following=user_to_follow
        )

        if not created:
            return Response(
                {"detail": "You are already following this user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = FollowSerializer(follow)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # DELETE (to unfollow)
    def delete(self, request, pk):
        user_to_unfollow = get_object_or_404(User, id=pk)

        # Try to find the follow relationship and delete it
        follow_relation = Follow.objects.filter(
            follower=request.user, following=user_to_unfollow
        )

        if follow_relation.exists():
            follow_relation.delete()
            return Response(
                {"detail": "Successfully unfollowed."},
                status=status.HTTP_204_NO_CONTENT,
            )

        return Response(
            {"detail": "You are not following this user."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ProfileFollowersView(APIView):
    """
    Returns a list of users who are following the user specified by pk.
    """
    def get(self, request, pk):
        # Verify the user exists first
        target_user = get_object_or_404(User, pk=pk)
        
        # Get all follow relations where 'following' is our target user
        follows = Follow.objects.filter(following=target_user).select_related('follower')
        followers = [follow.follower for follow in follows]
        
        serializer = UserMinSerializer(followers, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ProfileFollowingView(APIView):
    """
    Returns a list of users whom the user specified by pk is following.
    """
    def get(self, request, pk):
        # Verify the user exists first
        target_user = get_object_or_404(User, pk=pk)
        
        # Get all follow relations where 'follower' is our target user
        follows = Follow.objects.filter(follower=target_user).select_related('following')
        following = [follow.following for follow in follows]
        
        serializer = UserMinSerializer(following, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeletePostView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class UserDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class ShowPostView(RetrieveAPIView):
class ShowPostView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class RetrieveAllPostsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        author_id = self.request.query_params.get("author_id")

        if author_id is not None:
            queryset = queryset.filter(author_id=author_id)

        return queryset


class CreatePostView(CreateAPIView):
    # queryset = Post.objects.all().order_by("-created_at")
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Anyone can reach this endpoint to sign up

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED,
            )
        # Returns specific validation errors (e.g., "This email is already in use")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)


class ImageUploadView(APIView):
    # MultiPartParser handles the file, FormParser handles text fields like 'title'
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AvatarSerializer(
            request.user, data=request.data, partial=True
        )  # partial=True allows updating only the avatar field
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Avatar uploaded successfully!"}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def check_user_by_id_view(request, pk):
#     try:
#         user = User.objects.get(pk=pk)
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except User.DoesNotExist:
#         return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


# def manage_avatar(request):
#     # Fetch or auto-create the profile instance for the logged-in user
#     profile, created = Profile.objects.get_or_create(user=request.user)

#     if request.method == "POST":
#         form = ProfileForm(request.POST, request.FILES, instance=profile)
#         old_avatar = profile.avatar
#         print("Old avatar before form validation:", old_avatar)

#         if form.is_valid():
#             form.save()
#             messages.success(
#                 request, "Your avatar has been updated successfully!")
#             if old_avatar and old_avatar.url != profile.avatar.url:
#                 old_avatar.delete(save=False)
#         else:
#             messages.error(request, "Please select an image to upload.")
#         return redirect("view_profile", user_id=request.user.id)
#     else:
#         form = ProfileForm(instance=profile)

#     return render(request, "blog/avatar-form.html", {"form": form})


# from django.shortcuts import render
# from users.models import CustomUser
# from rest_framework import generics
# # from .serializers import UserSerializer, PostSerializer
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated, AllowAny

# # Create your views here.
# class CreateUserView(generics.CreateAPIView):
#     # Get all data first from DB to make sure we do not create data that already exists.
#     queryset = CustomUser.objects.all()
#     # Tells View what data we need to accept to create a new user
#     serializer_class = UserSerializer
#     # Specify who can call this class, even if not authenticated
#     permission_classes = [AllowAny]
