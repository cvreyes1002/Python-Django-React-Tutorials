from django import forms

from users.models import CustomUser
from .models import Post, Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar']
        widgets = {
            'avatar': forms.ClearableFileInput(attrs={
                "class": 'form-control-file',
                "accept": 'image/*',
            }),
        }
        labels = {
            'avatar': 'Upload Avatar',
        }
# class AvatarUploadForm(forms.Form):
#     avatar = forms.ImageField(label="Upload Avatar", required=True)


class CreatePostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'body']
        widgets = {
            'title': forms.TextInput(attrs={
                "id": 'post-title',
                "placeholder": "",
                "class": 'form-control form_control-lg form-control-title',
                "autocomplete": 'off',
            }),
            'body': forms.Textarea(attrs={
                "id": 'post-body',
                "class": 'form-control body-content tall-textarea',
                "rows": 5,
            }),
        }
        labels = {
            'title': 'Title',
            'body': 'Content',
        }

        #   <label for="post-title" class="text-muted mb-1"><small>Title</small></label>
        #   <input required name="title" id="post-title" class="form-control form-control-lg form-control-title" type="text" placeholder="" autocomplete="off" />
        # </div>

        # <div class="form-group">
        #   <label for="post-body" class="text-muted mb-1"><small>Body Content</small></label>
        #   <textarea required name="body" id="post-body" class="body-content tall-textarea form-control" type="text"></textarea>


class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        "placeholder": "Enter your email",
        "class": 'form-control',
        "autocomplete": 'off',
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        "placeholder": "Enter your password",
        "class": 'form-control',
        "autocomplete": 'off',
    }))


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        "placeholder": "Create a password",
        "class": 'form-control',
        "autocomplete": 'off',
    })
    )
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        "placeholder": "Confirm your password",
        "class": 'form-control',
        "autocomplete": 'off',
    })
    )

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password']
        widgets = {
            'email': forms.EmailInput(attrs={
                "placeholder": "Enter your email",
                "class": 'form-control',
                "autocomplete": 'off',
            }),
            'first_name': forms.TextInput(attrs={
                "placeholder": "John",
                "class": 'form-control',
                "autocomplete": 'off',
            }),
            'last_name': forms.TextInput(attrs={
                "placeholder": "Smith",
                "class": 'form-control',
                "autocomplete": 'off',
            }),
            }
        labels = {
            'email': 'Email',
            'password': 'Password',
            'first_name': 'First Name',
            'last_name': 'Last Name',
            }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data


