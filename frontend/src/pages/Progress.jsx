import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import ProgressBar from "../components/ProgressBar";
import Card from "../components/Card";

export default function Progress() {
  const { user } = useAuth();
  
  // Mock data - ovo kasnije povezati sa backend-om
  const [progress, setProgress] = useState({
    completedLessons: 5,
    totalLessons: 20,
    currentStreak: 3,
    totalPoints: 450
  });

  const completionRate = (progress.completedLessons / progress.totalLessons) * 100;

  return (
    <div className="container">
      <h1>My Progress</h1>
      <p>Track your learning journey!</p>

      <div style={{ marginTop: 20 }}>
        <h3>Overall Progress</h3>
        <ProgressBar
          progress={completionRate}
          showLabel
          label={`${progress.completedLessons} of ${progress.totalLessons} lessons completed`}
          height={20}
        />
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: 16, 
        marginTop: 20 
      }}>
        <Card
          title="Lessons Completed"
          subtitle={`${progress.completedLessons} / ${progress.totalLessons}`}
        />
        <Card
          title="Current Streak"
          subtitle={`${progress.currentStreak} days`}
        />
        <Card
          title="Total Points"
          subtitle={progress.totalPoints}
        />
        <Card
          title="Completion Rate"
          subtitle={`${Math.round(completionRate)}%`}
        />
      </div>
    </div>
  );
}