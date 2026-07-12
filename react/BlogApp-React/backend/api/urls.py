from django.urls import path
from . import views

urlpatterns = [
    path("user/me/", views.CurrentUserView.as_view(), name="current-user"),
    path("manage-avatar/", views.ImageUploadView.as_view(), name="manage-avatar"),
    path("user/<int:pk>/", views.UserDetailView.as_view(), name="check-user-by-id"),
    path("create-post/", views.CreatePostView.as_view(), name="create-post"),
    path("post/<int:pk>/", views.ShowPostView.as_view(), name="show-post"),
    # path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    # path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]
