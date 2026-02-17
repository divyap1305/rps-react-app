import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

function GameScreen({ setScreen, difficulty }) {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("-");
  const [matchOver, setMatchOver] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [pendingChoice, setPendingChoice] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);

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
              setResult("🎉 You Won The Match!");
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
              setResult("💻 Computer Won The Match!");
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
    setIsThinking(false);
    setPendingChoice(null);
    setMoveHistory([]);
  };

  return (
    <div>
      <h2>Difficulty: {difficulty}</h2>

      <h3>Score: {userScore} - {computerScore}</h3>

      <div>
        <button disabled={matchOver || isThinking} onClick={() => playGame("rock")}>🪨</button>
        <button disabled={matchOver || isThinking} onClick={() => playGame("paper")}>📄</button>
        <button disabled={matchOver || isThinking} onClick={() => playGame("scissors")}>✂️</button>
      </div>

      <h3>{result}</h3>

      {matchOver && (
        <button onClick={resetMatch}>
          Play Again
        </button>
      )}

      <br /><br />

      <button onClick={() => setScreen("start")}>
        Back To Menu
      </button>
    </div>
  );
}

export default GameScreen;
