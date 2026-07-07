import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopPage from "./pages/TopPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AvatarUploadForm from "./pages/AvatarUploadForm";
// import { useEffect } from "react";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// Make sure all sessions are cleared before registering.
// const RegisterAndLogout = () => {
//   localStorage.clear();
//   return <TopPage />;
// };

const App = () => {

  return (
    // Fixed-width??
    // <div className="w-full min-h-screen bg-gray-100">
    //   <div className="w-full max-w-7xl mx-auto bg-white min-h-screen p-6 shadow-md">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/manage-avatar" element={<ProtectedRoute><AvatarUploadForm /></ProtectedRoute>} />
        <Route path="/login" element={<TopPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
