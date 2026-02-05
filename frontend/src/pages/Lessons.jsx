import { useParams, Link } from "react-router-dom";

export default function Lessons() {
  const { courseId } = useParams();

  const lessons = [
    { id: "l1", title: "Basics" },
    { id: "l2", title: "Greetings" },
    { id: "l3", title: "Everyday phrases" },
  ];

  return (
    <div className="container">
      <h1>Lessons</h1>
      <p>Choose a lesson to begin.</p>

      <div className="grid">
        {lessons.map((l) => (
          <div className="card" key={l.id}>
            <h3>{l.title}</h3>
            <Link to={`/lesson/${l.id}`}>Start lesson</Link>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to="/courses">Back to courses</Link>
      </p>
    </div>
  );
}
