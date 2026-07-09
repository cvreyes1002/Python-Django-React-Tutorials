from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "id", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("email",)
    ordering = ("-created_at",)


admin.site.register(Post, PostAdmin)
