import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Lesson() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const correctAnswer = "Hello";

  const check = () => {
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct answer!");
    } else {
      setFeedback("Incorrect answer. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Lesson</h1>
      <p>Translate the following word:</p>

      <div className="card">
        <p><strong>Zdravo</strong></p>

        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
        />

        <div style={{ marginTop: 12 }}>
          <Button onClick={check}>Check answer</Button>
        </div>

        {feedback && <p style={{ marginTop: 12 }}>{feedback}</p>}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to="/progress">View progress</Link>
      </p>
    </div>
  );
}
