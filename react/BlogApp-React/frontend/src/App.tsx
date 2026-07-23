import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import TopPage from "./pages/TopPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AvatarUploadForm from "./pages/AvatarUploadForm";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";
import Footer from "./components/Footer";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,   // Optional configuration (e.g., don't refetch on window focus)
      retry: 1,
    },
  },
});

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
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
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
