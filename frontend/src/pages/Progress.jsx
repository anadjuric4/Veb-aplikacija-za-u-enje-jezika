import { useFetch } from "../hooks/useFetch";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

export default function Progress() {
  // Mock podaci za napredak
  const mockProgress = {
    level: 5,
    totalScore: 450,
    completedLessons: 12,
    totalLessons: 20,
    recentResults: [
      { id: 1, lessonTitle: "Greetings", score: 8, total: 10, date: "2024-02-05" },
      { id: 2, lessonTitle: "Numbers", score: 9, total: 10, date: "2024-02-04" },
      { id: 3, lessonTitle: "Food & Drinks", score: 7, total: 10, date: "2024-02-03" },
      { id: 4, lessonTitle: "Colors", score: 10, total: 10, date: "2024-02-02" },
    ],
    courseProgress: [
      { courseName: "English for Beginners", completed: 10, total: 15, percentage: 67 },
      { courseName: "Spanish Basics", completed: 2, total: 12, percentage: 17 },
    ]
  };

  const { data: progress } = useFetch("https://api.example.com/progress");
  const displayProgress = progress || mockProgress;

  const overallProgress = (displayProgress.completedLessons / displayProgress.totalLessons) * 100;

  return (
    <div className="container">
      <h1>My Progress</h1>
      <p>Track your learning journey and achievements.</p>

      {/* Overall Progress */}
      <Card 
        title="Overall Progress"
        style={{ marginTop: 20 }}
      >
        <div style={{ marginBottom: 20 }}>
          <ProgressBar
            progress={overallProgress}
            showLabel
            label={`${displayProgress.completedLessons} of ${displayProgress.totalLessons} lessons completed`}
            height={16}
          />
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
          gap: 16,
          marginTop: 20
        }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, color: "#666" }}>Current Level</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}>
              {displayProgress.level}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, color: "#666" }}>Total Score</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}>
              {displayProgress.totalScore}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, color: "#666" }}>Completion Rate</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: "bold" }}>
              {Math.round(overallProgress)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Course Progress */}
      <h2 style={{ marginTop: 32 }}>Course Progress</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {displayProgress.courseProgress.map((course, idx) => (
          <Card key={idx} title={course.courseName}>
            <ProgressBar
              progress={course.percentage}
              showLabel
              label={`${course.completed} of ${course.total} lessons`}
              height={12}
            />
          </Card>
        ))}
      </div>

      {/* Recent Results */}
      <h2 style={{ marginTop: 32 }}>Recent Results</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {displayProgress.recentResults.map((result) => {
          const scorePercent = (result.score / result.total) * 100;
          
          return (
            <Card 
              key={result.id}
              title={result.lessonTitle}
              subtitle={result.date}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar
                    progress={scorePercent}
                    height={10}
                    color={scorePercent >= 70 ? "#4CAF50" : scorePercent >= 50 ? "#FF9800" : "#d32f2f"}
                  />
                </div>
                <div style={{ fontWeight: "bold", minWidth: 60, textAlign: "right" }}>
                  {result.score}/{result.total}
                  <span style={{ 
                    display: "block", 
                    fontSize: 12, 
                    color: "#666",
                    fontWeight: "normal"
                  }}>
                    {Math.round(scorePercent)}%
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
