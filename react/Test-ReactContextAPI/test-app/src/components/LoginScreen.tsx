// import React from 'react';
import { useAuth } from '../AuthContext';

function LoginScreen() {
  const { login } = useAuth();
  console.log("LoginScreen component - login function:", login); // Debugging line to check login function

  const handleFakeLogin = () => {
    // Mimicking an API response
    const mockUser = { id: "user_7721", token: "abc_jwt_token" };
    
    // This updates the global state AND saves to localStorage
    login(mockUser.id, mockUser.token); 
  };

  return (
    <div className="login-box">
      <h2>Please Sign In</h2>
      <button onClick={handleFakeLogin}>Log In as User 7721</button>
    </div>
  );
}
export default LoginScreen;