from django.urls import path
from . import views

urlpatterns = [
    path("", views.main_page),
    path("show_post/<int:index>", views.show_post, name="show-post"),
    path("about", views.about),
    path("contact", views.contact, name="contact"),
]
