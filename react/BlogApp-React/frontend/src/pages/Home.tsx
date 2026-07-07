import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
// import axios from "axios";
import { useAuth } from "../components/ProtectedRoute";

const Home = () => {
  const { user } = useAuth();
  // console.log("Home.tsx user:", user); // Debugging line
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem(ACCESS_TOKEN);

  //     if (!token) {
  //         setError("No token found, please log in.");
  //         setLoading(false);
  //         return;
  //     }

  //     try {
  //       // const response = await axios.get('http://127.0.0.1:8000/api/user/me/', {
  //       //   headers: {
  //       //     Authorization: `Bearer ${token}`,
  //       //   },
  //       // });

  //       const response = await api.get("/api/user/me/", {headers: {Authorization: `Bearer ${token}`, },});
  //       setUser(response.data);
  //     }
  //     catch (error) {
  //       alert(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (loading) return <p>Loading user profile...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-light mb-4">
            {/* Hello <strong className="font-bold">{user.first_name}</strong>, your feed is empty. */}
            Hello <strong className="font-bold">{user.first_name}</strong>, your feed is empty.
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Your feed displays the latest posts from the people you follow. If you don’t have any friends to follow that’s okay; you can use the “Search” feature in the top menu bar to find content written by people with similar interests and then follow them.
          </p>
        </div>
      </main>
 
      {/* <h2>Welcome, {user.first_name || user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p> */}

    </>
  )
}

export default Home