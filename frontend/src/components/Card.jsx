export default function Card({ 
  title, 
  subtitle, 
  children, 
  onClick, 
  image,
  footer,
  style = {} 
}) {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    background: "#fff",
    cursor: onClick ? "pointer" : "default",
    transition: "box-shadow 0.2s",
    ...style
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleMouseEnter = (e) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    }
  };

  const handleMouseLeave = (e) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = "none";
    }
  };

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image && (
        <img 
          src={image} 
          alt={title || "Card image"} 
          style={{ 
            width: "100%", 
            height: 150, 
            objectFit: "cover", 
            borderRadius: 6,
            marginBottom: 12
          }} 
        />
      )}

      {title && <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>}
      
      {subtitle && (
        <p style={{ 
          margin: "0 0 12px 0", 
          color: "#666", 
          fontSize: 14 
        }}>
          {subtitle}
        </p>
      )}

      {children && <div>{children}</div>}

      {footer && (
        <div style={{ 
          marginTop: 12, 
          paddingTop: 12, 
          borderTop: "1px solid #eee" 
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}
