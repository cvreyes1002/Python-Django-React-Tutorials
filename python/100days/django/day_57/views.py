from django.shortcuts import render
from django.http import HttpResponse
import requests


# Create your views here.

parameters = {
    "name": ""
}


def agify(request, name):
    # Get age based on name
    parameters["name"] = name
    response = requests.get("https://api.agify.io", params=parameters)
    data = response.json()
    age = data["age"]

    # Get gender based on name
    response = requests.get("https://api.genderize.io", params=parameters)
    data = response.json()
    gender = data["gender"]

    return render(request, "day_57/agify.html", {
        "name": parameters["name"],
        "age": age,
        "gender": gender,
    })


def blog(request):
    response = requests.get("https://api.npoint.io/c790b4d5cab58020d391")
    all_posts = response.json()

    return render(request, "day_57/blog.html", {
        "posts": all_posts,
    })


def blog_final(request):
    response = requests.get("https://api.npoint.io/c790b4d5cab58020d391")
    all_posts = response.json()

    return render(request, "day_57/final/index.html", {
        "posts": all_posts,
    })


def blog_final_read_post(request, post_id):
    response = requests.get("https://api.npoint.io/c790b4d5cab58020d391")
    all_posts = response.json()
    # print(all_posts)
    # print(all_posts[0]["title"])
    # print(all_posts[0]["body"])
    return render(request, "day_57/final/post.html", {
        "title": all_posts[post_id - 1]["title"],
        "body": all_posts[post_id - 1]["body"],
    })
