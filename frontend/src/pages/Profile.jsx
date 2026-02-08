import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { authAPI } from "../services/api";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.me();
      setProfile(response.data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading profile...</h1>
      </div>
    );
  }

  const userData = profile || user;

  return (
    <div className="container">
      <h1>My Profile</h1>
      <p>View and manage your personal information.</p>

      <div className="card">
        <p>
          <strong>Name:</strong> {userData?.name}
        </p>
        <p>
          <strong>Email:</strong> {userData?.email}
        </p>
        <p>
          <strong>Account type:</strong> {userData?.is_admin ? 'Admin' : 'User'}
        </p>

        <div style={{ marginTop: 20 }}>
          <Button onClick={logout} style={{ background: '#d32f2f' }}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}