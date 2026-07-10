import { Link } from "react-router";
import { useAuth } from "../components/ProtectedRoute";
import { useParams } from "react-router-dom";

import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNavTabs from "../components/ProfileNavTabs";
import ProfileListGrp from "../components/ProfileListGrp";
import Navbar from "../components/Navbar";

interface UserProfile {
  id: number;
  first_name: string;
  avatar: string;
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
  const { id } = useParams<{ id: string }>(); // Get the user ID from the URL parameters

  const numericId = Number(id); // Convert the id from string to number for comparison
  console.log(`Numeric ID: ${numericId}`)
  // console.log("Profile component rendered. Logged-in user:", user.id, "Profile ID from URL:", id);

  // const { user } = useAuth() as { user: UserProfile };
  // const token = localStorage.getItem(ACCESS_TOKEN);


  // if (user.id !== numericId) {
  //   try {
  //     // const response = await api.get(`/api/user/${numericId}/`, {headers: {Authorization: `Bearer ${token}`, },});
  //     const response = await axios.get(`http://127.0.0.1:8000/api/user/${numericId}/`, {
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

  //   // const response1 = await fetchUserProfile(numericId, token);
  //   // console.log("Fetched user profile data from fetchUserProfile:", response1.data);

  //   // const response = api.get(`/api/user/${numericId}/`, {
  //   //   headers: { Authorization: `Bearer ${token}` },
  //   // });
  // }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 md:py-12">
        <ProfileHeader userId={numericId} />
        <ProfileNavTabs />
        <ProfileListGrp />
      </div>
    </>
  );
};

export default Profile;
