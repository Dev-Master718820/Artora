export default function Loading() {
  return (
    <div
      className="container page-content"
      aria-label="Loading Artora"
      aria-busy="true"
    >
      <div className="skeleton" />
      <div className="four-grid" style={{ marginTop: 25 }}>
        {[1, 2, 3, 4].map((i) => (
          <div className="skeleton" key={i} />
        ))}
      </div>
    </div>
  );
}
