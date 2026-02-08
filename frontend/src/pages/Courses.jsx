import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coursesAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      await fetchCourses();
    })();
  }, []);


  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAll();
      setCourses(response.data?.data ?? response.data);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading courses...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <Button onClick={fetchCourses}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Available Courses</h1>
      <p>Choose a course to start learning!</p>

      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
          {courses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              subtitle={course.description}
              footer={
                <Link to={`/courses/${course.id}/lessons`}>
                  <Button>View Lessons</Button>
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}