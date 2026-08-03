import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api";
import Navbar from "../components/Navbar";
import axios from "axios";

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   author_id: number;
//   // created_at: Date;
// }

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  // const numericPostId = Number(postId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false)

  // const [post, setPost] = useState<Post | null>([]);

  // 1. Fetch the existing post data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await api.get(`/api/post/${postId}/`);
        setFormData({
          title: postRes.data.title,
          content: postRes.data.content,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load the post data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // setSuccess(false);

    try {
      // Send a PUT request to update the specific post
      const response = await api.put(`/api/post/${postId}/`, formData);

      if (response.status === 200 || response.status === 204) {
        // setSuccess(true);
        navigate(`/post/${postId}`); // Redirect to the view page
      }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading post data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col">
            <label
              htmlFor="post-title"
              className="text-gray-500 text-sm mb-1 font-medium"
            >
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title..."
              autoComplete="off"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Body Textarea */}
          <div className="flex flex-col">
            <label
              htmlFor="post-body"
              className="text-gray-500 text-sm mb-1 font-medium"
            >
              Body Content
            </label>
            <textarea
              required
              name="content"
              id="post-body"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your content here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y min-h-[200px]"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={() => navigate(`/post/${postId}`)}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPost;
