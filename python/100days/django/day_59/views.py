from django.shortcuts import render
from django.http import HttpResponse
import requests

posts = requests.get("https://api.npoint.io/c790b4d5cab58020d391").json()

# Create your views here.


def main_page(request):
    print(posts)
    return render(request, "day_59/index.html", {
        "all_posts": posts,
    })


# @app.route("/post/<int:index>")
def show_post(request, index):
    requested_post = None
    for blog_post in posts:
        if blog_post["id"] == index:
            requested_post = blog_post
    return render(request, "day_59/post.html", {
        "post": requested_post,
    })

# @app.route("/about")


def about(request):
    return render(request, "day_59/about.html")
# @app.route("/contact")


def contact(request):
    if request.method == "POST":
        data = request.POST
        # data = request.form
        print(data)
        # send_email(data["name"], data["email"], data["phone"], data["message"])
        return render(request, "day_59/contact.html", {
            "msg_sent": True,
        })
    return render(request, "day_59/contact.html", {
        "msg_sent": False,
    })
