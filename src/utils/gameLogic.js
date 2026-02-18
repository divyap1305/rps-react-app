export const getCounterMove = (move) => {
  const counter = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock"
  };
  return counter[move];
};

export const getComputerChoice = (difficulty, userChoice, moveHistory) => {
  const choices = ["rock", "paper", "scissors"];

  if (difficulty === "easy") {
    return choices[Math.floor(Math.random() * 3)];
  }

  if (difficulty === "medium") {
    if (Math.random() < 0.5) {
      return getCounterMove(userChoice);
    }
    return choices[Math.floor(Math.random() * 3)];
  }

  if (difficulty === "hard") {
    if (moveHistory.length >= 3) {
      const moveCount = { rock: 0, paper: 0, scissors: 0 };

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
