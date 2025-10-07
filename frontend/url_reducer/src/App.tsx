import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin_url: url }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "URL creation failed");
        return;
      }

      // Correctly access short_url from nested data
      setNewUrl(data.data.short_url);
      setError("");
      alert(data.message || "URL created successfully");
      setUrl(""); // clear input

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Shorten URL</button>
      </form>

      {newUrl && (
        <p style={{ color: "green" }}>
          Short URL: <a href={newUrl}>{newUrl}</a>
        </p>
      )}
    </>
  );
}

export default App;
