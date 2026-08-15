import { useState } from 'react';
import { useAuth } from './AuthContext'; // 1. Import useAuth
import LoginModal from './LoginModal';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth(); // 2. Pull user and logout from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [user, setUser] = useState(null); // null = logged out
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleLogin = (userData) => {
  //   setUser(userData); // Set logged-in user state[cite: 2]
  // };
  
  // const handleLogout = () => {
  //   setUser(null);
  // };

  console.log(user);
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">MyApp</div>

        <div className="nav-actions">
          {user ? (
            <div className="profile-container">
              <button className="btn profile-btn">
                👤 {user.name}
              </button>
              <button className="btn logout-btn" onClick={logout}>
                Log Out
              </button>
            </div>
          ) : (
            <button className="btn login-btn" onClick={() => setIsModalOpen(true)}>
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* Pass only visibility props to LoginModal */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}