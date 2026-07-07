from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

# Create your models here.
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    # @property
    # def followers(self):
    #     return CustomUser.objects.filter(following_set__following=self)
    
    # @property
    # def following(self):
    #     return CustomUser.objects.filter(followers_set__follower=self)

    def __str__(self):
        return self.email