import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../components/ProtectedRoute";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import ProfileHeader from "../components/ProfileHeader";
// import ProfileNavTabs from "../components/ProfileNavTabs";
import ProfileListGrp from "../components/ProfileListGrp";
import ProfileBody from "../components/ProfileBody";

import { format } from "date-fns";

import api from "../api";
import Navbar from "../components/Navbar";

interface UserProfile {
  id: number;
  first_name: string;
  avatar: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
}

// const fetchUserProfile = async (userId: number, token: string | null): Promise<UserProfile> => {
//   try {
//     // const response = await api.get(`/api/user/${numericId}/`, {headers: {Authorization: `Bearer ${token}`, },});
//     const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("Fetched user profile data:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

const Profile = () => {
  // 1. Grab the userId from the URL params ("/profile/:userId")
  const { userId } = useParams<{ userId: string }>();
  const numericId = Number(userId); // Convert the id from string to number for comparison

  // 2. Initialize posts state as an empty array instead of null or an empty array typed loosely
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        // 3. Hit your backend endpoint designed to filter posts by user ID
        // Adjust this URL path to match your Django URL configurations (e.g., /api/posts/user/1/)
        // const response = await api.get(`/api/posts/user/${userId}/`);
        const response = await api.get("/api/posts/", {
          params: { author_id: userId}
        });
        // console.log(response.data)
        setPosts(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading posts...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">User Posts</h2> */}
        <ProfileHeader userId={numericId} />
        <ProfileBody />
        {posts.length === 0 ? (
          <p className="text-gray-500">This user hasn't posted anything yet.</p>
        ) : (
          <div className="space-y-6">
            {/* 4. Map over the array of posts to render each one */}
            {posts.map((post) => (
              <div key={post.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <Link to={`/post/${post.id}`}>
                  <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-3">
                  {post.created_at && format(new Date(post.created_at), 'MM/dd/yyyy')}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;



      // <Navbar />
      // <div className="mx-auto max-w-2xl px-4 py-6 md:py-12">
      //   <ProfileHeader userId={numericId} />
      //   <ProfileNavTabs />
      //   <ProfileListGrp />
      // </div>

