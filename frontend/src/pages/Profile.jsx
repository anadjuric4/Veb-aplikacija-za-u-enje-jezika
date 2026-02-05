import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { isAuthed } = useAuth();

  // Kasnije dolazi iz backend-a
  const user = {
    name: "Ana",
    email: "ana@example.com",
    role: "User",
  };

  return (
    <div className="container">
      <h1>My Profile</h1>
      <p>View and manage your personal information.</p>

      <div className="card">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Account type:</strong> {user.role}
        </p>

        {isAuthed && (
          <p style={{ marginTop: 12, color: "#555" }}>
            You are currently signed in.
          </p>
        )}
      </div>
    </div>
  );
}
