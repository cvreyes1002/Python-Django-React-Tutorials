// import React from 'react';
import { useAuth } from '../AuthContext';

function Dashboard() {
  const { userId, logout } = useAuth();

  return (
    <div>
      <h1>Welcome back!</h1>
      <p>Your Secure Global ID: <strong>{userId}</strong></p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
export default Dashboard;