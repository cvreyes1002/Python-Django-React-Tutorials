// import React from 'react'
import { useAuth } from './AuthContext';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';

const App = () => {
  const { userId, isLoading } = useAuth();
  // console.log("App component - userId:", userId, "isLoading:", isLoading); // Debugging line to check values

  // Prevent UI flickering or premature redirects while checking localStorage
  if (isLoading) {
    return <div className="loading-screen">Resuming session...</div>;
  }

  // If we have a userId, show the private app, otherwise show login
  return userId ? <Dashboard /> : <LoginScreen />;
}

export default App
