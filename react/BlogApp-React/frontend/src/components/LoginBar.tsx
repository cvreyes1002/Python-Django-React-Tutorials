import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "../constants";
import api from "../api";
// import { jwtDecode } from "jwt-decode";
// import { verify, type JwtPayload } from "jsonwebtoken";

// Define your custom payload structure
// interface CustomJwtPayload extends JwtPayload {
//   sub?: string;
//   user_id?: number; // or string, depending on your ID type
// }

const LoginBar = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post("/api/token/", {email, password});
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // const decodedToken = jwtDecode<CustomJwtPayload>(response.data.access);
      // const userId = decodedToken.user_id || decodedToken.sub;
      // localStorage.setItem(USER_ID, String(userId));
      navigate("/");
    } catch (error) {
        alert(error);
    } finally {
        setLoading(false);
    }
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





//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-[#f9322c] border-b border-gray-300 relative transition-all">
//       <h4 className="my-0 mr-md-auto font-weight-normal">
//         <a href="/" className="text-white">
//           Blog App
//         </a>
//       </h4>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center gap-8">
//         <form onSubmit={handleSubmit} className="mb-0 pt-2 md:pt-0">
//           <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-2">
//             {/* Username Field */}
//             <div className="w-full md:flex-1">
//               <input
//                 name="loginusername"
//                 type="email"
//                 placeholder="Email Address"
//                 autoComplete="off"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm bg-white text-[#212529] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//               />
//             </div>

//             {/* Password Field */}
//             <div className="w-full md:flex-1">
//               <input
//                 name="loginpassword"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm bg-white text-[#212529] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//               />
//             </div>

//             {/* Submit Button */}
//             <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Menu Icon SVG */}
//       {/* 
//       <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
//           <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http:www.w3.org/2000/svg">
//               <rect width="21" height="1.5" rx=".75" fill="#426287" />
//               <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
//               <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
//           </svg>
//       </button>
//  */}

//       {/* Mobile Menu */}
//       <div
//         className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
//       >
//         <input
//           name="loginusername"
//           type="email"
//           placeholder="Email Address"
//           autoComplete="off"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-1.5 text-sm bg-white text-[#212529] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//         />
//         <input
//           name="loginpassword"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-1.5 text-sm bg-white text-[#212529] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//         />
//         <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
//           Sign In
//         </button>
//       </div>
//     </nav>



);
};

export default LoginBar;
