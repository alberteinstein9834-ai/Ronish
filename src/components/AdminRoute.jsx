import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function AdminRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loader />;

  // Agar user logged in nahi hai toh login page par bhej do
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}