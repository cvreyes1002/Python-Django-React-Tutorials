from django.urls import path
from . import views

urlpatterns = [
    path("", views.ShowCorrectHomepageView.as_view(), name="index"),

    # User related URLs
    path("register/", views.register, name="register"),
    path("login/", views.blog_login, name="blog_login"),
    path("logout/", views.blog_logout, name="blog_logout"),
    path("manage-avatar/", views.manage_avatar, name="manage_avatar"),

    # Post related URLs
    path("create-post/", views.CreatePostView.as_view(), name="create_post"),
    path("post/<int:post_id>", views.view_single_post, name="view_single_post"),
    path("post/delete/<int:post_id>/", views.delete_post, name="delete_post"),
    path("post/<int:post_id>/edit/", views.edit_post, name="edit_post"),
    path("search/<str:term>/", views.SearchPostsView.as_view(), name="search_posts"),

    # Profile related URLs
    path("profile/<int:user_id>/", views.profile_posts, name="view_profile"),
    path("profile/<int:user_id>/followers/", views.profile_followers, name="profile_followers"),
    path("profile/<int:user_id>/following/", views.profile_following, name="profile_following"),

    path("profile/<int:user_id>/raw", views.profile_posts_raw, name="view_profile_raw"),
    path("profile/<int:user_id>/followers/raw", views.profile_followers_raw, name="profile_followers_raw"),
    path("profile/<int:user_id>/following/raw", views.profile_following_raw, name="profile_following_raw"),

    # Follow related URLs
    path('follow/<int:user_id>/', views.follow_user, name='follow_user'),
    path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow_user'),
]