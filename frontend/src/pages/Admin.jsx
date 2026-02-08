import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { coursesAPI, lessonsAPI, tasksAPI } from "../services/api";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (activeTab === "courses") fetchCourses();
    if (activeTab === "lessons") fetchLessons();
    if (activeTab === "tasks") fetchTasks();
  }, [activeTab]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to load courses:", err);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async () => {
    try {
      setLoading(true);
      // Za admin panel, učitaj sve lekcije (moraš dodati endpoint u backend)
      // Privremeno koristimo samo courses
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to load lessons:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    setLoading(false);
  };

  // Course handlers
  const handleCreateCourse = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleSaveCourse = async (courseData) => {
    try {
      if (editingItem) {
        // Update - need to add update endpoint in backend
        alert("Update not implemented yet");
      } else {
        // Create
        await coursesAPI.create(courseData);
        alert("Course created successfully!");
        fetchCourses();
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save course:", err);
      alert("Failed to save course");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // Need to add delete endpoint in backend
        alert("Delete not implemented yet in backend");
      } catch (err) {
        console.error("Failed to delete course:", err);
        alert("Failed to delete course");
      }
    }
  };

  // Check if user is admin
  if (!user?.is_admin) {
    return (
      <div className="container">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <p>Manage courses, lessons, and tasks.</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 20 }}>
        <Button
          onClick={() => setActiveTab("courses")}
          style={{ background: activeTab === "courses" ? "#111" : "#666" }}
        >
          Courses
        </Button>
        <Button
          onClick={() => setActiveTab("lessons")}
          style={{ background: activeTab === "lessons" ? "#111" : "#666" }}
        >
          Lessons
        </Button>
        <Button
          onClick={() => setActiveTab("tasks")}
          style={{ background: activeTab === "tasks" ? "#111" : "#666" }}
        >
          Tasks
        </Button>
        <Button
          onClick={() => setActiveTab("stats")}
          style={{ background: activeTab === "stats" ? "#111" : "#666" }}
        >
          Statistics
        </Button>
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button onClick={handleCreateCourse}>+ Create New Course</Button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {courses.map((course) => (
                <Card
                  key={course.id}
                  title={course.title}
                  subtitle={course.description}
                  footer={
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button onClick={() => {
                        setEditingItem(course);
                        setShowModal(true);
                      }}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteCourse(course.id)}
                        style={{ background: "#d32f2f" }}
                      >
                        Delete
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <div>
          <p>Lessons management - coming soon</p>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div>
          <p>Tasks management - coming soon</p>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === "stats" && (
        <div>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: 16 
          }}>
            <Card title="Total Courses" subtitle={courses.length} />
            <Card title="Total Users" subtitle="Coming soon" />
            <Card title="Completion Rate" subtitle="Coming soon" />
            <Card title="Active Learners" subtitle="Coming soon" />
          </div>
        </div>
      )}

      {/* Modal za kreiranje/izmenu kursa */}
      {showModal && (
        <CourseModal
          course={editingItem}
          onSave={handleSaveCourse}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// Modal komponenta za kurseve
function CourseModal({ course, onSave, onClose }) {
  const [form, setForm] = useState({
    title: course?.title || "",
    description: course?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={course ? "Edit Course" : "Create New Course"}
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={onClose} style={{ background: "#666" }}>
            Cancel
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g., English for Beginners"
          required
        />
        <InputField
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Course description"
        />
      </form>
    </Modal>
  );
}