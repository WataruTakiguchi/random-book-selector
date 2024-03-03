const LoadingMessage = () => {
  return (
    <p style={{ fontWeight: "bold", fontSize: "20px" }}>
      <span role="img" aria-label="glass" className="mr-2">
        🔎
      </span>
      本を探しています...
    </p>
  );
};

export default LoadingMessage;
