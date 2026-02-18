import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import StatsScreen from "./components/StatsScreen";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [darkMode, setDarkMode] = useState(false);
  const initialStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0
};

const [stats, setStats] = useLocalStorage("gameStats", initialStats);

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

       <Routes>
        <Route
          path="/"
          element={
            <StartScreen
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          }
        />

        <Route
          path="/game"
          element={
            <GameScreen
              difficulty={difficulty}
              stats={stats}
              setStats={setStats}
            />
          }
        />

        <Route
          path="/stats"
          element={
            <StatsScreen
              stats={stats}
            />
          }
        />

        <Route
          path="*"
          element={
            <div className="screen">
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
