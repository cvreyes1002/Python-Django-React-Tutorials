import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";


const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(null);
    setSuccess(false);

    try {
      // Axios automatically stringifies formData to JSON and sets Content-Type header
      // const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      const response = await api.post("/api/create-post/", formData);

      if (response.status === 201) {
        setSuccess(true);
        setFormData({ title: '', content: '' });  // Clear out the form fields on success
        navigate(`/post/${response.data.id}`)
      }
    } catch (err) {
      // Axios catches any response outside the 2xx range in the catch block
      if (err.response && err.response.data) {
        // Populates validation issues returned by Django REST Framework
        setErrors(err.response.data);
      } else {
        setErrors({ detail: "Network error. Please make sure your backend server is running." });
      }
    }
  };

  return (
    <>
      <Navbar />
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