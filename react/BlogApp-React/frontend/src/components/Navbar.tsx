import { Link } from "react-router-dom"
import { useAuth } from "./ProtectedRoute";

interface UserProfile {
  id: number;
  avatar: string;
}

const Navbar = () => {
  const { user } = useAuth() as { user: UserProfile }; // Type assertion to ensure user has an avatar property

  return (
    <header className="bg-[#f9322c] text-white mb-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center p-3">
        <h4 className="my-0 md:mr-auto text-xl font-normal">
          <a href="/" className="text-white hover:text-gray-200">
            OurApp
          </a>
        </h4>
        <div className="flex flex-row my-3 md:my-0 items-center">
          <a href="#" className="text-white mr-2" title="Search">
            <i className="fas fa-search"></i>
          </a>
          <span className="text-white mr-2 cursor-pointer" title="Chat">
            <i className="fas fa-comment"></i>
          </span>
          <Link to={`/profile/${user.id || "default"}`} state={{userId: user.id}} reloadDocument className="mr-2">
            <img
              title="My Profile"
              className="w-8 h-8 rounded-full"
              src={ user?.avatar }
            />
          </Link>
          <Link to="/create-post" className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded mr-2" >
            Create Post
          </Link>
          <Link to="/logout" className="bg-gray-600 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded">
              Sign Out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



          // <a
          //   className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded mr-2"
          //   href="#"
          // >
          //   Create Post
          // </a>
