import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null means logged out

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  console.log('AuthProvider user:', user); // Log the current user state
  console.log('AuthProvider login function:', login); // Log the login function
  console.log('AuthProvider logout function:', logout); // Log the logout function

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext); //[cite: 1]
  
  // Guard clause to catch missing providers early
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};