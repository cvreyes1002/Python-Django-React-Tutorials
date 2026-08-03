import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
// import { jwtDecode } from "jwt-decode";
// import { verify, type JwtPayload } from "jsonwebtoken";

// Define your custom payload structure
// interface CustomJwtPayload extends JwtPayload {
//   sub?: string;
//   user_id?: number; // or string, depending on your ID type
// }

const LoginBar = () => {
  // const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post("/api/token/", {email, password});
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // const decodedToken = jwtDecode<CustomJwtPayload>(response.data.access);
      // const userId = decodedToken.user_id || decodedToken.sub;
      navigate("/");
    } catch (error) {
        alert(error);
    } 
    // finally {
    //     setLoading(false);
    // }
  };

  return (
    <header className="mb-3 bg-[#f9322c] text-white">
      <div className="container mx-auto flex flex-col items-center justify-between p-4 md:flex-row">
        {/* Logo */}
        <h4 className="text-xl font-normal">
          <a href="/" className="text-white hover:text-gray-300">
            Blog App
          </a>
        </h4>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-4 w-full md:mt-0 md:w-auto">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="email"
              // name="loginusername"
              placeholder="Email Address"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-[#212529] placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
              required
            />

            <input
              type="password"
              name="loginpassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-[#212529] placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
              required
            />

            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </header>
 );
};

export default LoginBar;
