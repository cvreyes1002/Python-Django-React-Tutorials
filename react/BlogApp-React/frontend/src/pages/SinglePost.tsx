import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import api from "../api";
import Navbar from "../components/Navbar";
import axios from "axios";

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

  const { user } = useAuth() as { user: UserProfile };

  const [post, setPost] = useState<Post | null>(null);
  const [postAuthor, SetPostAuthor] = useState<UserProfile | null>(null)
  
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   const navigate = useNavigate();


  // const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const postRes = await api.get(`/api/post/${numericPostId}/`);
        // console.log(postRes.data)
        setPost(postRes.data);

        const authorRes = await api.get(`/api/user/${postRes.data.author_id}/`);
        SetPostAuthor(authorRes.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
        // TypeScript now knows `err` is an AxiosError
        const apiError =
          err.response?.data?.detail ||
          (err.response?.data ? JSON.stringify(err.response.data) : null) ||
          err.message;

        setError(apiError);
      } else {
        // Handles non-Axios runtime errors (e.g., standard JS Errors)
        setError("Network Error. Please try again");
      }
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError(null);
    // setSuccess(false);

    try {
      // setLoading(true);
      const response = await api.delete(`/api/post/delete/${numericPostId}/`);

      if (response.status === 204) {  // Django's DestroyAPIView returns a 204 No Content status on success
        console.log('Post deleted successfully!');
        navigate(`/profile/${user.id}`)
      }
    } catch (err) {
      // Axios catches any response outside the 2xx range in the catch block
      if (axios.isAxiosError(err)) {
        // TypeScript now knows `err` is an AxiosError
        const apiError =
          err.response?.data?.detail ||
          (err.response?.data ? JSON.stringify(err.response.data) : null) ||
          err.message;

        setError(apiError);
      } else {
        // Handles non-Axios runtime errors (e.g., standard JS Errors)
        setError("Network Error. Please try again");
      }
    }
  };

  const isAuthor = user?.id === post?.author_id;

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
                href={`/post/${postId}/edit`}
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
              src={isAuthor ? user?.avatar : postAuthor?.avatar}
              alt="kittydoe's avatar"
            />
          </a>
          <span>
            Posted by{" "}
            <a href="#" className="text-blue-600 hover:underline">
              {isAuthor ? `${user.first_name} ${user.last_name}` : `${postAuthor?.first_name} ${postAuthor?.last_name}`}
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


// {/* Optional Error Banner */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}
