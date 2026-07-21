export default function Success() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <h1 style={{ color: "#0b5d3b" }}>Order confirmed.</h1>
        <p style={{ color: "#444", fontSize: 16 }}>
          Check your email — instructions for sending in your ball are on the
          way. I build every watch by hand, and I'm excited to build yours.
        </p>
        <p style={{ color: "#888", fontSize: 14 }}>— AJ, Links Time Co.</p>
      </div>
    </main>
  );
}
