import { useFetch } from "../hooks/useFetch";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  
  // Primer korišćenja useFetch hooka
  // Zameni sa pravim API endpoint-om
  const { data: courses, loading, error } = useFetch("https://api.example.com/courses");

  // Mock podaci ako nema API-ja
  const mockCourses = [
    {
      id: 1,
      title: "English for Beginners",
      description: "Start learning English from scratch with basic vocabulary and grammar.",
      level: "Beginner",
      lessons: 20,
      image: "https://via.placeholder.com/300x150/4CAF50/ffffff?text=English"
    },
    {
      id: 2,
      title: "Spanish Basics",
      description: "Learn essential Spanish phrases and pronunciation.",
      level: "Beginner",
      lessons: 15,
      image: "https://via.placeholder.com/300x150/FF9800/ffffff?text=Spanish"
    },
    {
      id: 3,
      title: "German Intermediate",
      description: "Improve your German skills with complex grammar and conversations.",
      level: "Intermediate",
      lessons: 25,
      image: "https://via.placeholder.com/300x150/2196F3/ffffff?text=German"
    },
    {
      id: 4,
      title: "French Advanced",
      description: "Master French literature, culture, and advanced expressions.",
      level: "Advanced",
      lessons: 30,
      image: "https://via.placeholder.com/300x150/9C27B0/ffffff?text=French"
    }
  ];

  const displayCourses = courses || mockCourses;

  if (loading) {
    return (
      <div className="container">
        <h1>My Courses</h1>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>My Courses</h1>
        <p style={{ color: "red" }}>Error loading courses: {error}</p>
        <p style={{ marginTop: 12 }}>Showing mock data instead.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Courses</h1>
      <p>Choose a course to start learning.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 20
        }}
      >
        {displayCourses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            subtitle={course.description}
            image={course.image}
            onClick={() => navigate(`/courses/${course.id}/lessons`)}
            footer={
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                <span><strong>Level:</strong> {course.level}</span>
                <span><strong>Lessons:</strong> {course.lessons}</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
