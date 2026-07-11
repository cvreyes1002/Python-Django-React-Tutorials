import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode"

// export default function PostContainer() {
//   // Optional: Handle delete form submission
//   const handleDelete = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add delete logic here
//   };
// }

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
}

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);

  // const { user } = useAuth() as { user: UserProfile };

  const [post, setPost] = useState<Post | null>([]);
  const [user, SetUser] = useState<UserProfile | null>([])
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postRes = await api.get(`/api/post/${numericPostId}`);
        console.log(postRes.data)
        setPost(postRes.data);

        const userRes = await api.get(`/api/user/${postRes.data.author_id}`);
        console.log(userRes.data)
        SetUser(userRes.data)
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    // Add delete logic here
  };

  // console.log(`ID of logged in user: ${user.id}`);
  // console.log(`ID of the post: ${authorId}`);
  const isAuthor = user?.id === post?.author_id;
  // console.log(`Value of isAuthor: ${isAuthor}`);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
        {/* Title and Actions Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {post?.title}
          </h2>
          {isAuthor && (
            <div className="flex items-center gap-3">
              {/* Edit Button */}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit"
              >
                <Pencil className="w-5 h-5" />
              </a>

              {/* Delete Form/Button */}
              <form onSubmit={handleDelete} className="inline">
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </form>
            </div>
            )}
        </div>

        {/* Author and Date Meta Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="#">
            <img
              className="w-6 h-6 rounded-full"
              src={user?.avatar}
              alt="kittydoe's avatar"
            />
          </a>
          <span>
            Posted by{" "}
            <a href="#" className="text-blue-600 hover:underline">
              {isAuthor ? `${user.first_name} ${user.last_name}` : "kittydoe"}
            </a>{" "}
            {`on ${post?.created_at && format(new Date(post.created_at), 'MM/dd/yyy')}`}
          </span>
        </div>

        {/* Post Body Content */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            {post?.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default SinglePost;

// Key Changes Made:
// Layout & Width: container--narrow and py-md-5 were converted to a responsive wrapper using mx-auto max-w-3xl px-4 py-6 md:py-12.

// Flexbox Alignment: d-flex justify-content-between became flex justify-between items-center to keep the icons and title vertically centered.

// Spacing & Content: Instead of adding standard margins to every paragraph, space-y-4 was added to the body container wrapper to cleanly space out the text.

// Icons: Replaced Font Awesome standard classes with lucide-react components (Pencil and Trash2), which play nicely with Tailwind's sizing utilities (w-5 h-5).

// Avatar Styling: avatar-tiny was replaced with w-6 h-6 rounded-full.
