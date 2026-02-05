import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses([
      { id: "en-a1", title: "English", level: "A1" },
      { id: "de-a1", title: "German", level: "A1" },
      { id: "es-a1", title: "Spanish", level: "A1" },
    ]);
  }, []);

  return (
    <div className="container">
      <h1>Courses</h1>
      <p>Select a language and start learning.</p>

      <div className="grid">
        {courses.map((c) => (
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p>Level: {c.level}</p>
            <Link to={`/courses/${c.id}/lessons`}>View lessons</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
