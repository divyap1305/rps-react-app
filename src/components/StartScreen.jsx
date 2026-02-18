import { useNavigate } from "react-router-dom";

function StartScreen({ setScreen, difficulty, setDifficulty }) {
  const navigate = useNavigate();
  return (
  <div className="screen">
    <h2>Select Difficulty</h2>

    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <br /><br />

    <button onClick={() => navigate("/game")}>
      Start Game
    </button>
    <button onClick={() => navigate("/stats")}>
      View Statistics
    </button>
  </div>
);
}

export default StartScreen;
