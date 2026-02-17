function StartScreen({ setScreen, difficulty, setDifficulty }) {
  return (
    <div>
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

      <button onClick={() => setScreen("game")}>
        Start Game
      </button>
    </div>
  );
}

export default StartScreen;
