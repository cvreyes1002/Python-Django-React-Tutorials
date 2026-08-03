import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    // setSuccess(false);

    try {
      const response = await api.post("/api/create-post/", formData);

      if (response.status === 201) {
        // setSuccess(true);
        setFormData({ title: '', content: '' });  // Clear out the form fields on success
        navigate(`/post/${response.data.id}`)
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

  return (
    <>
      <Navbar />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Input */}
          <div className="flex flex-col">
            <label htmlFor="post-title" className="text-gray-500 text-sm mb-1 font-medium">
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
          </div>

          {/* Body Textarea */}
          <div className="flex flex-col">
            <label htmlFor="post-body" className="text-gray-500 text-sm mb-1 font-medium">
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save New Post
          </button>
          
        </form>
      </div>
    </>
  )
}

export default CreatePost