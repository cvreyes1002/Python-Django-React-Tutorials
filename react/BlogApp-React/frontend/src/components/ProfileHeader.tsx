import { useEffect, useState } from "react";
import { useAuth } from "../components/ProtectedRoute";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router";
import api from "../api";

interface UserProfile {
  id: number;
  first_name: string;
  avatar: string;
}

const ProfileHeader = ({ userId }: { userId: number }) => {
  const { user: currentUser } = useAuth() as { user: UserProfile };

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  const isCurrentUser = userId === currentUser.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/user/${userId}/`);
        // const response = await api.get(`/api/user/${userId}/`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        setUserProfile(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [userId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // 3. Use userProfile data if it's someone else, otherwise use the logged-in user data
  const profileToDisplay = isCurrentUser ? currentUser : userProfile;

  // if ( userId !== user.id ) {
  //   Object.assign(user, userProfile);
  // }

  // const handleFollowSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle follow logic here
  // };

  const handleFollowSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle follow logic here (e.g., API call to follow)
    console.log(`Following user ${userId}`);
  };

  return (
    <h2 className="flex items-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
      <img
        className="h-8 w-8 rounded-full md:h-12 md:w-12"
        src={profileToDisplay?.avatar}
        alt="Avatar"
      />
      <span className="capitalize">{profileToDisplay?.first_name}</span>

      {isCurrentUser ? (
        <Link to="/manage-avatar" className="ml-2 inline-block">
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded transition-colors duration-200">
            Manage Avatar
          </button>
        </Link>
      ) : (
        <button
          onClick={handleFollowSubmit}
          className="ml-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-200"
        >
          Follow +
        </button>
      )}
    </h2>
  );
};

export default ProfileHeader;
