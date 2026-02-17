import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState("easy");
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
  totalMatches: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0
});

  // Persist dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Load stats on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("gameStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats whenever updated
  useEffect(() => {
    localStorage.setItem("gameStats", JSON.stringify(stats));
  }, [stats]);

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      
      <button
        style={{ position: "absolute", top: 20, right: 20 }}
        onClick={() => setDarkMode(prev => !prev)}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {screen === "start" && (
        <StartScreen
          setScreen={setScreen}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}

      {screen === "game" && (
        <GameScreen
          setScreen={setScreen}
          difficulty={difficulty}
          stats={stats}
          setStats={setStats}
        />
      )}
    </div>
  );
}

export default App;
