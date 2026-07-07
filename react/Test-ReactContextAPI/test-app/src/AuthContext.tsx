import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context container
const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Crucial for handling refreshes

  // Handle Page Refresh Check
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('userId');
        // Optional: If you use JWTs, grab the token and verify it with your API here
        
        if (savedUser) {
          setUserId(savedUser);
        }
      } catch (error) {
        console.error("Auth hydration failed:", error);
      } finally {
        // Once checked, turn off loading so the app can render
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login handler
  const login = (id, token) => {
    setUserId(id);
    localStorage.setItem('userId', id);
    if (token) localStorage.setItem('token', token); // Save auth token if backend uses it
  };

  // Logout handler
  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for consuming auth data quickly
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth context:", context); // Debugging line to check context value
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // console.log("useAuth context:", context); // Debugging line to check context value
  return context;
}