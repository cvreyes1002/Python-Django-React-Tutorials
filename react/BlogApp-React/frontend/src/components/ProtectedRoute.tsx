import { Navigate, Outlet } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN, USER_ID } from "../constants"
import { useState, useEffect, type ReactNode, createContext, useContext } from "react"
import axios from "axios"

// interface ProtectedRouteProps {
//   children: ReactNode
// }

// 1. Create the context container
const AuthContext = createContext(null);

// export function ProtectedRoute({ children }: ProtectedRouteProps) {
export const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [isAuthorized])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(USER_ID, res.data.user_id);
        // setUserId(res.data.user_id);
        setIsAuthorized(true);
      } else {
        //  setUserId(null);
         setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.log("No access token found, user is not authorized."); // Debugging line
      setIsAuthorized(false);
      setUser(null);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (!tokenExpiration) {
      console.log("Token does not have an expiration date, user is not authorized."); // Debugging line
      setIsAuthorized(false)
      setUser(null);
      return
    }

    if (tokenExpiration < now) {
      console.log("Access token has expired, attempting to refresh..."); // Debugging line
      await refreshToken()
    } else {
      const response = await api.get("/api/user/me/", {headers: {Authorization: `Bearer ${token}`, },});
      setUser(response.data);
      setIsAuthorized(true)
    }
  }
  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return (
    isAuthorized ? (
      <AuthContext.Provider value={{ user }}>
        <Outlet />
      </AuthContext.Provider>
    ) : (
      <Navigate to="/login" />
    )
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log("useAuth context:", context); // Debugging line to check context value
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // console.log("useAuth context:", context); // Debugging line to check context value
  return context;
}