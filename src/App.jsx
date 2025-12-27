import { useState } from "react";

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = ["🙂", "😐", "😕", "😔", "😄"];

  return (
    <div>
      <h1>Mood Tracker</h1>

      <p>Kies hoe je je vandaag voelt:</p>

      <div>
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            style={{ fontSize: "24px", marginRight: "10px" }}
          >
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p>Vandaag voel ik mij: {selectedMood}</p>
      )}
    </div>
  );
}

export default App;