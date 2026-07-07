from django.db import models
# from django.db.models import Q, F
from django_resized import ResizedImageField
from users.models import CustomUser


class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, related_name="following_set", on_delete=models.CASCADE)
    following = models.ForeignKey(CustomUser, related_name="followers_set", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Optional: Track when the follow relationship was created

    class Meta:
        # Prevents a user from following the same person twice
        unique_together = ('follower', 'following')
        indexes = [
            models.Index(fields=['follower', 'following']),
        ]

        def __str__(self):
            return f"{self.follower} follows {self.following}"


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    # avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    avatar = ResizedImageField(
        size=(120, 120),
        quality=75,
        upload_to="avatars/",
        force_format="WEBP",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def can_edit(self, user_id):
        return user_id.is_authenticated and self.user == user_id
    
    # def can_delete(self, user_id):
    #     return user_id.is_authenticated and self.user_id == user_id
