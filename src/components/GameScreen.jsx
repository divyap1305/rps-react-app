import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Modal from "./Modal";

function GameScreen({ setScreen, difficulty, stats, setStats }) {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("-");
  const [matchOver, setMatchOver] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [pendingChoice, setPendingChoice] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [matchWinner, setMatchWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const winningScore = 5;
  const choices = ["rock", "paper", "scissors"];

  const getComputerChoice = (userChoice) => {

  // Easy mode → random
  if (difficulty === "easy") {
    return choices[Math.floor(Math.random() * 3)];
  }

  // Medium → 50% smart
  if (difficulty === "medium") {
    if (Math.random() < 0.5) {
      return getCounterMove(userChoice);
    }
    return choices[Math.floor(Math.random() * 3)];
  }

  // Hard → Pattern-based AI
  if (difficulty === "hard") {

    if (moveHistory.length >= 3) {

      const moveCount = {
        rock: 0,
        paper: 0,
        scissors: 0
      };

      moveHistory.forEach(move => {
        moveCount[move]++;
      });

      const predictedMove = Object.keys(moveCount).reduce((a, b) =>
        moveCount[a] > moveCount[b] ? a : b
      );

      return getCounterMove(predictedMove);
    }

    return choices[Math.floor(Math.random() * 3)];
  }
};
const getCounterMove = (move) => {
  const counter = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock"
  };
  return counter[move];
};

  const playGame = (userChoice) => {
    if (matchOver || isThinking) return;

    setIsThinking(true);
    setPendingChoice(userChoice);
    setResult("Computer is thinking...");
  };

  // useEffect handles delay logic
  useEffect(() => {
    if (!isThinking || !pendingChoice) return;

    const timer = setTimeout(() => {
      const computerChoice = getComputerChoice(pendingChoice);

      if (pendingChoice === computerChoice) {
        setResult("Draw!");
      } else {
        const winMap = {
          rock: "scissors",
          paper: "rock",
          scissors: "paper"
        };

        if (winMap[pendingChoice] === computerChoice) {
          setUserScore(prev => {
            const newScore = prev + 1;
            if (newScore >= winningScore) {
              setMatchOver(true);
              setMatchWinner("user");
              setStats(prev => {
                const newStreak = prev.currentStreak + 1;

                return {
                  totalMatches: prev.totalMatches + 1,
                  wins: prev.wins + 1,
                  losses: prev.losses,
                  currentStreak: newStreak,
                  bestStreak: Math.max(prev.bestStreak, newStreak)
                };
              });
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
              });

            } else {
              setResult("You Win!");
            }
            return newScore;
          });
        } else {
          setComputerScore(prev => {
            const newScore = prev + 1;
            if (newScore >= winningScore) {
              setMatchOver(true);
              setMatchWinner("computer");
              setStats(prev => ({
                totalMatches: prev.totalMatches + 1,
                wins: prev.wins,
                losses: prev.losses + 1,
                currentStreak: 0,
                bestStreak: prev.bestStreak
              }));
            } else {
              setResult("Computer Wins!");
            }
            return newScore;
          });
        }
        setMoveHistory(prev => {
  const updated = [...prev, pendingChoice];
  if (updated.length > 5) {
    updated.shift(); // keep only last 5 moves
  }
  return updated;
});

      }

      setIsThinking(false);
      setPendingChoice(null);

    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [isThinking, pendingChoice]);

  const resetMatch = () => {
    setUserScore(0);
    setComputerScore(0);
    setResult("-");
    setMatchOver(false);
    setMatchWinner(null);
    setIsThinking(false);
    setPendingChoice(null);
    setMoveHistory([]);
  };

  return (
  <div className="screen">
    <h2>Difficulty: {difficulty}</h2>

    <h3>Score: {userScore} - {computerScore}</h3>
    <div style={{ marginTop: "10px" }}>
  <p>You Progress:</p>
  <div style={{ 
    height: "10px", 
    background: "#ddd", 
    borderRadius: "10px",
    overflow: "hidden"
  }}>
    <div style={{
      height: "100%",
      width: `${(userScore / 5) * 100}%`,
      background: "#2ecc71",
      transition: "width 0.3s ease"
    }} />
  </div>

  <p style={{ marginTop: "10px" }}>Computer Progress:</p>
  <div style={{ 
    height: "10px", 
    background: "#ddd", 
    borderRadius: "10px",
    overflow: "hidden"
  }}>
    <div style={{
      height: "100%",
      width: `${(computerScore / 5) * 100}%`,
      background: "#e74c3c",
      transition: "width 0.3s ease"
    }} />
  </div>
</div>

    {matchOver && (
      <div className="winner-banner">
        <h2>
          {matchWinner === "user"
            ? "🏆 You Are The Champion!"
            : "🤖 Computer Dominates This Time!"}
        </h2>
      </div>
    )}
    {matchOver && (
      <div style={{
        marginTop: "20px",
        padding: "15px",
        borderRadius: "12px",
        background: "rgba(0,0,0,0.05)"
      }}>
        <h3>📊 Game Statistics</h3>
        <p>Total Matches: {stats.totalMatches}</p>
        <p>Total Wins: {stats.wins}</p>
        <p>Total Losses: {stats.losses}</p>
        <p>Current Win Streak: {stats.currentStreak}</p>
        <p>Best Win Streak: {stats.bestStreak}</p>
      </div>
    )}    

    <div className="choices">
      <button disabled={matchOver || isThinking} onClick={() => playGame("rock")}>🪨</button>
      <button disabled={matchOver || isThinking} onClick={() => playGame("paper")}>📄</button>
      <button disabled={matchOver || isThinking} onClick={() => playGame("scissors")}>✂️</button>
    </div>

    <h3
      className={
        result.includes("You Win")
          ? "win-text"
          : result.includes("Computer")
          ? "lose-text"
          : result.includes("Draw")
          ? "draw-text"
          : ""
      }
    >
      {result}
  </h3>


    {matchOver && (
      <button onClick={resetMatch}>
        Play Again
      </button>
    )}

    <button onClick={() => setShowModal(true)}>
      Back To Menu
    </button>
    {showModal && (
      <Modal
        title="Are you sure?"
        message="Your current match progress will be lost."
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          resetMatch();
          setShowModal(false);
          setScreen("start");
        }}
      />
    )}
  </div>
);
}

export default GameScreen;
