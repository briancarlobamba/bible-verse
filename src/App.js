import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  useEffect(() => {
    fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
      .then((res) => res.json())
      .then((data) => {
        const verseData = data.verse.details;
        setVerse(verseData.text);
        setReference(verseData.reference);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching verse:", err);
        setVerse("Could not load verse.");
        setReference("");
        setLoading(false);
      });
  }, []);

  return (
    <div className="App" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Bible Verse of the Day</h1>
      <p className="text-muted">{today}</p>
      {loading ? (
        <p></p>
      ) : (
        <blockquote style={{ fontSize: "1.5rem", margin: "2rem 0" }}>
          “{verse}”
          <footer style={{ marginTop: "1rem", fontWeight: "bold" }}>
            — {reference}
          </footer>
        </blockquote>
      )}
    </div>
  );
}

export default App;
