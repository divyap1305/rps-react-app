import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState("easy");

  return (
  <div className="app-container">
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
      />
    )}
  </div>
);
}

export default App;
