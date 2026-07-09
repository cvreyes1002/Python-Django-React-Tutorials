from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    # Set write_only=True so the password is never returned in API responses
    password = serializers.CharField(write_only=True, min_length=4)

    class Meta:
        model = User
        fields = ("email", "password", "first_name", "last_name", "avatar")

    # def create(self, validated_data):
    #     # Your CustomUserManager handles everything seamlessly here
    #     user = User.objects.create_user(
    #         email=validated_data["email"],
    #         password=validated_data["password"],
    #         first_name=validated_data.get("first_name", ""),
    #         last_name=validated_data.get("last_name", ""),
    #         # avatar=validated_data.get("avatar", None),
    #     )
    #     return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "avatar")


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "avatar")
        read_only_fields = (
            "id",
        )  # Prevents changing id during avatar upload


class PostSerializer(serializers.ModelSerializer):
    # author_details = UserSerializer(source="author", read_only=True)

    class Meta:
        model = Post
        # fields = ("id", "title", "content", "author", "author_details", "created_at", "updated_at")
        fields = ("id", "title", "content", "author_id", "created_at", "updated_at")
        read_only_fields = ("author_id", "created_at", "updated_at")
  

###########################
# Original - From Tutorial
###########################

# from users.models import CustomUser
# from rest_framework import serializers
# # from .models import Post

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ["id", "email", "first_name", "last_name", "password"]
#         # Accepts password when creating a new user, but do not return a password when
#         # ..giving information about a user.
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         user = CustomUser.objects.create_user(**validated_data)
#         return user

# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ["id", "title", "content", "created_at", "author"]
#         # We should be able to read who the author is,
#         # ..but should not be able to write who the author is
#         extra_kwargs = {"author": {"read_only": True}}
