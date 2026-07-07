from django.shortcuts import render

from .forms import LoginForm

# Create your views here.
def index(request):
    return render(request, "day_61/index.html")

def login(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            if form.cleaned_data["email_address"] == "admin@email.com" and form.cleaned_data["password"] == "12345678":
                return render(request, "day_61/success.html")
            else:
                return render(request, "day_61/denied.html")
    else:
        form = LoginForm()

    return render(request, "day_61/login.html", {
        "form": form
    })
