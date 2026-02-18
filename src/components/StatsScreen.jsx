import { useNavigate } from "react-router-dom";

function StatsScreen({ stats, setScreen }) {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <h2>📊 Game Statistics Dashboard</h2>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <p><strong>Total Matches:</strong> {stats.totalMatches}</p>
        <p><strong>Total Wins:</strong> {stats.wins}</p>
        <p><strong>Total Losses:</strong> {stats.losses}</p>
        <p><strong>Current Win Streak:</strong> {stats.currentStreak}</p>
        <p><strong>Best Win Streak:</strong> {stats.bestStreak}</p>

        <p>
          <strong>Win Rate:</strong>{" "}
          {stats.totalMatches > 0
            ? ((stats.wins / stats.totalMatches) * 100).toFixed(1)
            : 0}%
        </p>
      </div>

      <button onClick={() => navigate("/")}>
        Back To Menu
      </button>
    </div>
  );
}

export default StatsScreen;
