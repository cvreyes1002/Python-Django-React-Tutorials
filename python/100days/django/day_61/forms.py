from django import forms

class LoginForm(forms.Form):
    email_address = forms.CharField(label="Email", max_length=100, error_messages={
        "required": "Email must not be empty!"
    })
    password = forms.CharField(widget=forms.PasswordInput, error_messages={
        "required": "Password must not be empty!"
    })
