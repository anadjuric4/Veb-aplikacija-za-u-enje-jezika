import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AudioPlayer from "../components/AudioPlayer";
import ProgressBar from "../components/ProgressBar";

export default function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Mock zadaci za lekciju
  const tasks = [
  {
    id: 1,
    type: "translate",
    question: "Translate the following word to English:",
    word: "Zdravo",
    correctAnswer: "Hello",
    explanation: "Zdravo is a common Serbian greeting that translates to Hello in English."
  },
  {
    id: 2,
    type: "audio",
    question: "Listen to the audio and choose the correct word:",
    audioUrl: "/audio/hello.mp3", // ← Prvi audio
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    correctAnswer: "Hello",
    explanation: "The audio says 'Hello' - a basic English greeting."
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "What does 'Good morning' mean in Serbian?",
    options: ["Dobro veče", "Dobro jutro", "Laku noć", "Dobar dan"],
    correctAnswer: "Dobro jutro",
    explanation: "Dobro jutro is the Serbian translation of Good morning."
  },
  {
    id: 4,
    type: "audio",
    question: "Listen carefully and identify the word:",
    audioUrl: "/audio/goodbye.mp3", // ← Drugi audio
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    correctAnswer: "Goodbye",
    explanation: "The audio says 'Goodbye' - used when parting ways."
  }
];

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  const checkAnswer = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correct = userAnswer === currentTask.correctAnswer.toLowerCase();
    
    setIsCorrect(correct);
    setShowModal(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowModal(false);
    setAnswer("");

    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // Lekcija završena
      alert(`Lesson completed! Your score: ${score}/${tasks.length}`);
      navigate("/progress");
    }
  };

  const renderTask = () => {
    switch (currentTask.type) {
      case "translate":
        return (
          <div>
            <p><strong>{currentTask.word}</strong></p>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 4,
                border: "1px solid #ddd",
                marginTop: 12
              }}
            />
          </div>
        );

      case "audio":
        return (
          <div>
            <AudioPlayer 
              src={currentTask.audioUrl} 
              label="Listen to the pronunciation" 
            />
            <div style={{ marginTop: 16 }}>
              {currentTask.options.map((option, idx) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="audio-answer"
                      value={option}
                      checked={answer === option}
                      onChange={(e) => setAnswer(e.target.value)}
                      style={{ marginRight: 8 }}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "multiple-choice":
        return (
          <div>
            {currentTask.options.map((option, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="mc-answer"
                    value={option}
                    checked={answer === option}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Lesson {lessonId}</h1>
      
      <ProgressBar 
        progress={progress} 
        showLabel 
        label={`Task ${currentTaskIndex + 1} of ${tasks.length}`}
        height={12}
      />

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Task {currentTaskIndex + 1}</h3>
        <p>{currentTask.question}</p>

        {renderTask()}

        <div style={{ marginTop: 16 }}>
          <Button onClick={checkAnswer} disabled={!answer}>
            Check Answer
          </Button>
        </div>
      </div>

      {/* Modal za feedback */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isCorrect ? "✅ Correct!" : "❌ Incorrect"}
        footer={
          <Button onClick={handleNext}>
            {currentTaskIndex < tasks.length - 1 ? "Next Task" : "Finish Lesson"}
          </Button>
        }
      >
        <div>
          <p>
            {isCorrect 
              ? "Great job! Your answer is correct." 
              : `The correct answer is: ${currentTask.correctAnswer}`
            }
          </p>
          <p style={{ marginTop: 12, fontSize: 14, color: "#666" }}>
            <strong>Explanation:</strong> {currentTask.explanation}
          </p>
        </div>
      </Modal>
    </div>
  );
}
