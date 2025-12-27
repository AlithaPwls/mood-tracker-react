import { useState, useEffect } from "react";

function App() {
  // datum van vandaag (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // moods
  const moods = ["🙂", "😐", "😕", "😔", "😄"];

  // state
  const [entries, setEntries] = useState([]);

  // 1️⃣ LAAD data uit localStorage bij opstart
  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // 2️⃣ SLA data op bij elke wijziging
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem(
        "moodEntries",
        JSON.stringify(entries)
      );
    }
  }, [entries]);

  // mood kiezen
  function selectMood(mood) {
    // verwijder mood van vandaag (indien bestaat)
    const withoutToday = entries.filter(
      (entry) => entry.date !== today
    );

    // voeg nieuwe mood toe
    setEntries([
      ...withoutToday,
      { date: today, mood },
    ]);
  }

  // mood van vandaag ophalen (voor display)
  const todayEntry = entries.find(
    (entry) => entry.date === today
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Mood Tracker</h1>

      <p>Kies hoe je je vandaag voelt:</p>

      <div style={{ marginBottom: "20px" }}>
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => selectMood(mood)}
            style={{
              fontSize: "26px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {mood}
          </button>
        ))}
      </div>

      {todayEntry && (
        <p>
          <strong>Vandaag:</strong> {todayEntry.mood}
        </p>
      )}

      <h2>Overzicht</h2>

      <ul>
        {entries.map((entry) => (
          <li key={entry.date}>
            {entry.date} — {entry.mood}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;