import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (isAuthed) return <Outlet />;

  return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
}
