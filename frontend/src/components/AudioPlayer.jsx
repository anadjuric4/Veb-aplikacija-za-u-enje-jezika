import { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function AudioPlayer({ src, label = "Play Audio" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setError("Failed to load audio file");
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const percent = e.target.value;
    const time = (percent / 100) * duration;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        background: "#f9f9f9"
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div style={{ marginBottom: 12 }}>
        <strong>{label}</strong>
      </div>

      {error ? (
        <p style={{ color: "red", fontSize: 14 }}>{error}</p>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <Button onClick={togglePlay}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </Button>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 8 }}>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              style={{ width: "100%" }}
            />
          </div>

          {/* Time display */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            fontSize: 12, 
            color: "#666" 
          }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
}
