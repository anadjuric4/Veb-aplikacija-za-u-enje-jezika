import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Custom hook za kontrolu audio plejera
 * Koristi useState, useEffect, useRef, useCallback
 * 
 * @param {string} audioSrc - URL audio fajla
 * @returns {object} - kontrole i stanje plejera
 */
export function useAudioPlayer(audioSrc) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);

  // Inicijalizuj audio element
  useEffect(() => {
    if (!audioSrc) {
      setError("No audio source provided");
      return;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e) => {
      setError("Failed to load audio file");
      setIsPlaying(false);
      console.error("Audio error:", e);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.src = "";
    };
  }, [audioSrc]);

  // Play funkcija
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.error("Play error:", err);
      setError("Failed to play audio");
    });
  }, []);

  // Pause funkcija
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Seek (skoči na određeno vreme)
  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(audio.currentTime);
  }, [duration]);

  // Promeni volume (0-1)
  const changeVolume = useCallback((newVolume) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = Math.max(0, Math.min(1, newVolume));
    audio.volume = vol;
    setVolume(vol);
  }, []);

  // Reset audio na početak
  const reset = useCallback(() => {
    pause();
    seek(0);
  }, [pause, seek]);

  // Format vremena
  const formatTime = useCallback((seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // State
    isPlaying,
    duration,
    currentTime,
    volume,
    error,
    
    // Controls
    play,
    pause,
    togglePlay,
    seek,
    changeVolume,
    reset,
    
    // Utils
    formatTime,
    progress: duration ? (currentTime / duration) * 100 : 0,
  };
}
