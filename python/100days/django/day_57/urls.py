from django.urls import path
from . import views

urlpatterns = [
    path("guess/<str:name>", views.agify),
    path("blog", views.blog),
    path("blog_final", views.blog_final),
    path("blog_final/<int:post_id>", views.blog_final_read_post, name="post-body"),
]
