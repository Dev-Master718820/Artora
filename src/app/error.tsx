"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-content">
      <div className="empty-state">
        <h1>Let's try that again.</h1>
        <p>
          A little interruption in the gallery. Your browser-local demo activity
          is still here.
        </p>
        <button className="button" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
