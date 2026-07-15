from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def can_edit(self, user_id):
    #     return user_id.is_authenticated and self.user == user_id


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="following_set", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="followers_set", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Optional: Track when the follow relationship was created

    class Meta:
        # Prevents a user from following the same person twice
        unique_together = ('follower', 'following')
        indexes = [
            models.Index(fields=['follower', 'following']),
        ]

        def __str__(self):
            return f"{self.follower} follows {self.following}"
