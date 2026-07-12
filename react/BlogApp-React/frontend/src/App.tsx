import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopPage from "./pages/TopPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AvatarUploadForm from "./pages/AvatarUploadForm";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";

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
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/manage-avatar" element={<AvatarUploadForm />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/post/:postId/edit" element={<EditPost />} />
        </Route>
        <Route path="/login" element={<TopPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
