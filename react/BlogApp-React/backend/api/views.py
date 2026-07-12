from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    AvatarSerializer,
    PostSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, CreateAPIView, DestroyAPIView
from .models import Post
from .permissions import IsAuthorOrReadOnly

User = get_user_model()


class DeletePostView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class UserDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ShowPostView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePostView(CreateAPIView):
    # queryset = Post.objects.all().order_by("-created_at")
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Anyone can reach this endpoint to sign up

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED,
            )
        # Returns specific validation errors (e.g., "This email is already in use")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)


class ImageUploadView(APIView):
    # MultiPartParser handles the file, FormParser handles text fields like 'title'
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AvatarSerializer(
            request.user, data=request.data, partial=True
        )  # partial=True allows updating only the avatar field
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Avatar uploaded successfully!"}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def check_user_by_id_view(request, pk):
#     try:
#         user = User.objects.get(pk=pk)
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except User.DoesNotExist:
#         return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


# def manage_avatar(request):
#     # Fetch or auto-create the profile instance for the logged-in user
#     profile, created = Profile.objects.get_or_create(user=request.user)

#     if request.method == "POST":
#         form = ProfileForm(request.POST, request.FILES, instance=profile)
#         old_avatar = profile.avatar
#         print("Old avatar before form validation:", old_avatar)

#         if form.is_valid():
#             form.save()
#             messages.success(
#                 request, "Your avatar has been updated successfully!")
#             if old_avatar and old_avatar.url != profile.avatar.url:
#                 old_avatar.delete(save=False)
#         else:
#             messages.error(request, "Please select an image to upload.")
#         return redirect("view_profile", user_id=request.user.id)
#     else:
#         form = ProfileForm(instance=profile)

#     return render(request, "blog/avatar-form.html", {"form": form})


# from django.shortcuts import render
# from users.models import CustomUser
# from rest_framework import generics
# # from .serializers import UserSerializer, PostSerializer
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated, AllowAny

# # Create your views here.
# class CreateUserView(generics.CreateAPIView):
#     # Get all data first from DB to make sure we do not create data that already exists.
#     queryset = CustomUser.objects.all()
#     # Tells View what data we need to accept to create a new user
#     serializer_class = UserSerializer
#     # Specify who can call this class, even if not authenticated
#     permission_classes = [AllowAny]
