export default function Progress() {
  const progress = [
    { course: "English A1", completed: 2, total: 5 },
    { course: "German A1", completed: 1, total: 5 },
  ];

  return (
    <div className="container">
      <h1>My Progress</h1>
      <p>Track your learning progress across courses.</p>

      <div className="grid">
        {progress.map((p) => (
          <div className="card" key={p.course}>
            <h3>{p.course}</h3>
            <p>
              Completed lessons: {p.completed} / {p.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
