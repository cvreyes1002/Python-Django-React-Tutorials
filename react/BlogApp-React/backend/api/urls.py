from django.urls import path
from . import views

urlpatterns = [
    path("user/me/", views.CurrentUserView.as_view(), name="current-user"),
    path("manage-avatar/", views.ImageUploadView.as_view(), name="manage-avatar"),
    # path("user/<int:pk>/", views.UserDetailView.as_view(), name="check-user-by-id"),
    path("profile/<int:pk>/", views.UserDetailView.as_view(), name="check-user-by-id"),

    path("profile/<int:pk>/followers/", views.ProfileFollowersView.as_view(), name="profile-followers"),
    path("profile/<int:pk>/following/", views.ProfileFollowingView.as_view(), name="profile-following"),

    # Post related URLs
    path("create-post/", views.CreatePostView.as_view(), name="create-post"),
    path("post/<int:pk>/", views.ShowPostView.as_view(), name="show-post"),
    path("post/delete/<int:pk>/", views.DeletePostView.as_view(), name="delete-post"),
    # path("posts/user/<int:pk>/", views.RetrieveAllPostsView.as_view(), name="show-all-post"),
    path("posts/", views.RetrieveAllPostsView.as_view(), name="show-all-post"),

    # Follow related URLs
    # path("follow/<int:pk>/", views.FollowView.as_view(), name="follow-user"),
    # path("unfollow/<int:pk>/", views.UnfollowView.as_view(), name="unfollow-user"),
    path("follow/<int:pk>/", views.FollowUnfollowView.as_view(), name="follow-unfollow"),
    path("follow-stats/", views.FollowStatsView.as_view(), name="follow-stats"),

    # path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    # path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]
