import Navbar from "../components/Navbar"
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import api from "../api";
// import axios from "axios";
import { useAuth } from "../components/ProtectedRoute";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="grow max-w-2xl mx-auto px-4 py-12">
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
     </>
  )
}

export default Home
