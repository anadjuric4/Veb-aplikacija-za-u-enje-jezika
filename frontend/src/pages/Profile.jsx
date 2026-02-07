import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Profile() {
  const { isAuthed, user: authUser } = useAuth();

  // Mock user data (kasnije iz backend-a)
  const [user, setUser] = useState({
    name: authUser?.name || "Ana",
    email: authUser?.email || "ana@example.com",
    role: "User",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSave = () => {
    // Ovde kasnije šalješ API poziv
    setUser({ ...user, name: formData.name, email: formData.email });
    setShowEditModal(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({ name: user.name, email: user.email });
    setShowEditModal(false);
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

        <div style={{ marginTop: 16 }}>
          <Button onClick={() => setShowEditModal(true)}>
            ✏️ Edit Profile
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCancel}
        title="Edit Profile"
        footer={
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={handleSave}>Save Changes</Button>
            <Button onClick={handleCancel} style={{ background: "#666" }}>
              Cancel
            </Button>
          </div>
        }
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <InputField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
        </form>
      </Modal>
    </div>
  );
}