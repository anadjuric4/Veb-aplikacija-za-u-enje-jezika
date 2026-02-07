import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("lessons"); // lessons, users, audio
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Mock podaci
  const mockLessons = [
    { id: 1, title: "Greetings", courseId: 1, order: 1, tasks: 5 },
    { id: 2, title: "Numbers", courseId: 1, order: 2, tasks: 8 },
    { id: 3, title: "Food & Drinks", courseId: 2, order: 1, tasks: 10 },
  ];

  const mockUsers = [
    { id: 1, username: "john_doe", email: "john@example.com", role: "user", status: "active" },
    { id: 2, username: "jane_smith", email: "jane@example.com", role: "user", status: "active" },
    { id: 3, username: "admin_user", email: "admin@example.com", role: "admin", status: "active" },
  ];

  const [lessons, setLessons] = useState(mockLessons);
  const [users, setUsers] = useState(mockUsers);

  // Funkcije za lekcije
  const handleCreateLesson = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingItem(lesson);
    setShowModal(true);
  };

  const handleDeleteLesson = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter(l => l.id !== id));
      alert("Lesson deleted successfully!");
    }
  };

  const handleSaveLesson = (lessonData) => {
    if (editingItem) {
      // Update
      setLessons(lessons.map(l => l.id === editingItem.id ? { ...l, ...lessonData } : l));
      alert("Lesson updated successfully!");
    } else {
      // Create
      const newLesson = { ...lessonData, id: Math.max(...lessons.map(l => l.id)) + 1 };
      setLessons([...lessons, newLesson]);
      alert("Lesson created successfully!");
    }
    setShowModal(false);
  };

  // Funkcije za korisnike
  const handleBlockUser = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === "active" ? "blocked" : "active" }
        : u
    ));
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <p>Manage lessons, users, and content.</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 20 }}>
        <Button 
          onClick={() => setActiveTab("lessons")}
          style={{ background: activeTab === "lessons" ? "#111" : "#666" }}
        >
          Lessons
        </Button>
        <Button 
          onClick={() => setActiveTab("users")}
          style={{ background: activeTab === "users" ? "#111" : "#666" }}
        >
          Users
        </Button>
        <Button 
          onClick={() => setActiveTab("stats")}
          style={{ background: activeTab === "stats" ? "#111" : "#666" }}
        >
          Statistics
        </Button>
      </div>

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button onClick={handleCreateLesson}>+ Create New Lesson</Button>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                title={lesson.title}
                subtitle={`Course ID: ${lesson.courseId} | Order: ${lesson.order} | Tasks: ${lesson.tasks}`}
                footer={
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button onClick={() => handleEditLesson(lesson)}>Edit</Button>
                    <Button 
                      onClick={() => handleDeleteLesson(lesson.id)}
                      style={{ background: "#d32f2f" }}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <div style={{ display: "grid", gap: 12 }}>
            {users.map((user) => (
              <Card
                key={user.id}
                title={user.username}
                subtitle={`${user.email} | Role: ${user.role}`}
                footer={
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ 
                      color: user.status === "active" ? "green" : "red",
                      fontWeight: "bold"
                    }}>
                      {user.status.toUpperCase()}
                    </span>
                    <Button 
                      onClick={() => handleBlockUser(user.id)}
                      style={{ background: user.status === "active" ? "#d32f2f" : "#4CAF50" }}
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === "stats" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <Card title="Total Users" subtitle="125 active users" />
            <Card title="Total Lessons" subtitle={`${lessons.length} lessons`} />
            <Card title="Completion Rate" subtitle="78% average" />
            <Card title="Most Popular Course" subtitle="English for Beginners" />
          </div>
        </div>
      )}

      {/* Modal za kreiranje/izmenu lekcije */}
      {showModal && <LessonModal 
        lesson={editingItem}
        onSave={handleSaveLesson}
        onClose={() => setShowModal(false)}
      />}
    </div>
  );
}

// Modal komponenta za lekcije
function LessonModal({ lesson, onSave, onClose }) {
  const [form, setForm] = useState({
    title: lesson?.title || "",
    courseId: lesson?.courseId || "",
    order: lesson?.order || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={lesson ? "Edit Lesson" : "Create New Lesson"}
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={onClose} style={{ background: "#666" }}>Cancel</Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Lesson Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g., Greetings"
        />
        <InputField
          label="Course ID"
          type="number"
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
          placeholder="1"
        />
        <InputField
          label="Order"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
          placeholder="1"
        />
      </form>
    </Modal>
  );
}
