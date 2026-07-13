import { useState } from "react"

const ProfileBody = () => {
  // 1. Define state to keep track of active tab ID
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');

  // Helper function to handle tab clicks
  const handleTabClick = (e: React.MouseEvent, tabId: 'posts' | 'followers' | 'following') => {
    e.preventDefault()  // Prevent the '#' from altering the URL
    setActiveTab(tabId)
  }

  // Helper to keep Taiwind classes clean and dry
  const getTabClass = (tabId: 'posts' | 'followers' | 'following') => {
    const baseClass = "py-2 px-4 border-b-2 transition duration-150";
    const activeClass = "text-blue-600 font-medium border-blue-600";
    const inactiveClass = "text-gray-600 hover:text-blue-600 border-transparent hover:border-gray-300";

    return `${baseClass} ${activeTab === tabId ? activeClass : inactiveClass}`;
  }

  return (
    <div>
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-gray-200 pt-2 mb-4">
        <a
          href="#"
          onClick={(e) => handleTabClick(e, 'posts')}
          className={getTabClass('posts')}
        >
          Posts: 3
        </a>
        <a
          href="#"
          onClick={(e) => handleTabClick(e, 'followers')}
          className={getTabClass('followers')}
        >
          Followers: 3
        </a>
        <a
          href="#"
          onClick={(e) => handleTabClick(e, 'following')}
          className={getTabClass('following')}
        >
          Following: 2
        </a>
      </div>

      {/* 2. Render content conditionally based on activeTab */}
      <div className="p-4 bg-gray-50 rounded-lg">
        {activeTab === 'posts' && <div>📜 Here are the 3 posts...</div>}
        {activeTab === 'followers' && <div>👥 Here is the list of followers...</div>}
        {activeTab === 'following' && <div>👀 Here are the accounts being followed...</div>}
      </div>
    </div>
  )
}

export default ProfileBody