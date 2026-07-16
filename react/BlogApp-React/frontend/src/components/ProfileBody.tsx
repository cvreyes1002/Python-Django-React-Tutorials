import { useState } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { format } from "date-fns";

import api from "../api";

// API Fetcher function
// const fetchFollowStats = async () => {
//   const { data } = await api.get("/api/follow-stats/");
//   return data;  // Returns { followers_count: X,  following_count: Y }
// }

const ProfileBody = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['followStats'],
    queryFn: async () => {
      const { data } = await api.get("/api/follow-stats/");
      // console.log(data)
      return data;  // Returns { followers_count: X,  following_count: Y }
    },
  });

  // 1. Define state to keep track of active tab ID
  const [activeTab, setActiveTab] = useState<"posts" | "followers" | "following">("posts");

  // This runs automatically because activeTab starts as "posts"
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await api.get("/api/posts/", { params: { author_id: userId } });
      return res.data;
    },
    enabled: activeTab === "posts"
  });

  // This will ONLY fire the network request the moment the activeTab changes to "followers"
  const { data: followers, isLoading: followersLoading } = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res = await api.get(`/api/profile/${userId}/followers/`);
      console.log(res.data);
      return res.data;
    },
    enabled: activeTab === "followers"
  });

  // This will ONLY fire the network request the moment the activeTab changes to "following"
  const { data: following, isLoading: followingLoading } = useQuery({
    queryKey: ["following", userId],
    queryFn: async () => {
      const res = await api.get(`/api/profile/${userId}/following/`);
      // console.log(res.data);
      return res.data;
    },
    enabled: activeTab === "following"
  });

  // Helper function to handle tab clicks
  const handleTabClick = (e: React.MouseEvent, tabId: "posts" | "followers" | "following") => {
    e.preventDefault()  // Prevent the '#' from altering the URL
    setActiveTab(tabId)
  }

  // Helper to keep Taiwind classes clean and dry
  const getTabClass = (tabId: "posts" | "followers" | "following") => {
    const baseClass = "py-2 px-4 border-b-2 transition duration-150";
    const activeClass = "text-blue-600 font-medium border-blue-600";
    const inactiveClass = "text-gray-600 hover:text-blue-600 border-transparent hover:border-gray-300";

    return `${baseClass} ${activeTab === tabId ? activeClass : inactiveClass}`;
  }

  // console.log("Followers: " , followers)
  // console.log("Following: " , following)

  return (
    <div>
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-gray-200 pt-2 mb-4">
        <a
          href="#"
          onClick={(e) => handleTabClick(e, "posts")}
          className={getTabClass("posts")}
        >
          Posts: {posts?.length}
        </a>
        <a
          href="#"
          onClick={(e) => handleTabClick(e, "followers")}
          className={getTabClass("followers")}
        >
          Followers: {data?.followers_count}
        </a>
        <a
          href="#"
          onClick={(e) => handleTabClick(e, "following")}
          className={getTabClass("following")}
        >
          Following: {data?.following_count}
        </a>
      </div>

      {/* 2. Render content conditionally based on activeTab */}
      <div className="p-4 bg-gray-50 rounded-lg">
        {activeTab === "posts" && (
          postLoading ? (
            <p>Loading posts...</p>
          ) : (
            posts.length === 0 ? (
              <p>You have {posts?.length || 0} posts.</p>
            ) : (
                <div className="space-y-6">
                  {/* 4. Map over the array of posts to render each one */}
                  {posts.map((post) => (
                    <div key={post.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <Link to={`/post/${post.id}`}>
                        <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm mb-3">
                        {post.created_at && format(new Date(post.created_at), 'MM/dd/yyyy')}
                      </p>
                      <p className="text-gray-700 line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
                 )
          )
        )}

        {activeTab === "followers" && (
          followersLoading ? (
            <p>Loading followers...</p>
          ) : (
            data?.followers_count === 0 ? (
              <p> No Followers </p>
            ) : (
              <div className="flex flex-col border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden">
                {followers.map((follower) => (
                  <div key={follower.id} className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                    <Link to={`/profile/${follower.id}`} className="flex items-center gap-3">
                      <img className="w-8 h-8 rounded-full object-cover" src={follower.avatar} alt={`${follower.first_name}'s avatar`} />
                      <span>{follower.first_name} {follower.last_name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            )
          )
        )}
        {activeTab === "following" && <div>👀 Here are the accounts being followed...</div>}
      </div>
    </div>
  )
}

export default ProfileBody

