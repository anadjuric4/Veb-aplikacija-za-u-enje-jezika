import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminRoute() {
  const { isAuthed, user } = useAuth();

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.is_admin) {
    return (
      <div className="container">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return <Outlet />;
}