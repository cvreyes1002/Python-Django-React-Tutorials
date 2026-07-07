from django.contrib import admin

from .models import Follow, Post, Profile

# Register your models here.


class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "user_id", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "body", "user_id__email")
    ordering = ("-created_at",)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user_id", "avatar")
    search_fields = ("user_id__email",)
    ordering = ("user_id__email",)

class FollowAdmin(admin.ModelAdmin):
    list_display = ("follower", "following", "created_at")
    search_fields = ("follower__email", "following__email")
    ordering = ("-created_at",)

admin.site.register(Post, PostAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Follow, FollowAdmin)

# class CustomUserAdmin(UserAdmin):
#     add_form = CustomUserCreationForm
#     form = CustomUserChangeForm
#     model = CustomUser
#     list_display = ("email", "first_name", "last_name", "is_staff", "is_active",)
#     list_filter = ("email", "is_staff", "is_active",)
#     fieldsets = (
#         (None, {"fields": ("email", "password")}),
#         ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
#     )
#     add_fieldsets = (
#         (None, {
#             "classes": ("wide",),
#             "fields": (
#                 "email", "password1", "password2", "is_staff",
#                 "is_active", "groups", "user_permissions"
#             )}
#         ),
#     )
#     search_fields = ("email",)
#     ordering = ("email",)


# admin.site.register(CustomUser, CustomUserAdmin)