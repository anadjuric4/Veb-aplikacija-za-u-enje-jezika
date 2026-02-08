import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { lessonsAPI, coursesAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Lessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch course info
      const courseResponse = await coursesAPI.getById(courseId);
      setCourse(courseResponse.data?.data ?? courseResponse.data);

      // Fetch lessons
      const lessonsResponse = await lessonsAPI.getByCourse(courseId);
      setLessons(lessonsResponse.data?.data ?? lessonsResponse.data);
    } catch (err) {
      console.error("Failed to load lessons:", err);
      setError("Failed to load lessons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading lessons...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p style={{ color: "red" }}>{error}</p>
        <Button onClick={fetchData}>Try Again</Button>
        <Button onClick={() => navigate("/courses")} style={{ marginLeft: 8 }}>
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="container">
      <Button onClick={() => navigate("/courses")} style={{ marginBottom: 16 }}>
        ← Back to Courses
      </Button>

      <h1>{course?.title || "Course Lessons"}</h1>
      <p>{course?.description}</p>

      {lessons.length === 0 ? (
        <p>No lessons available yet for this course.</p>
      ) : (
        <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
          {lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              title={`${index + 1}. ${lesson.title}`}
              subtitle={lesson.content}
              footer={
                <Link to={`/lesson/${lesson.id}`}>
                  <Button>Start Lesson</Button>
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
