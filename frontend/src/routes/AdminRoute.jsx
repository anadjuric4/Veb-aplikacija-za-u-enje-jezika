import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminRoute({ redirectTo = "/login" }) {
  const { isAuthed } = useAuth();
  
  // U realnoj aplikaciji, proveri da li je korisnik admin
  // Primer: const { isAuthed, user } = useAuth();
  // const isAdmin = user?.role === "admin";
  
  // Za sada koristimo mock proveru
  const isAdmin = localStorage.getItem("userRole") === "admin";

  if (!isAuthed) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <p>Only administrators can access the admin panel.</p>
      </div>
    );
  }

  return <Outlet />;
}
