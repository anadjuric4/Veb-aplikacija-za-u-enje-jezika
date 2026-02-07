export default function ProgressBar({ 
  progress = 0, 
  height = 8, 
  color = "#111",
  backgroundColor = "#e0e0e0",
  showLabel = false,
  label = ""
}) {
  // Osiguraj da je progress između 0 i 100
  const validProgress = Math.max(0, Math.min(100, progress));

  return (
    <div style={{ width: "100%" }}>
      {showLabel && (
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: 4,
          fontSize: 12,
          color: "#666"
        }}>
          <span>{label}</span>
          <span>{Math.round(validProgress)}%</span>
        </div>
      )}
      
      <div
        style={{
          width: "100%",
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${validProgress}%`,
            height: "100%",
            backgroundColor: color,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
