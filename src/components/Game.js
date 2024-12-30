import React, { useState } from "react";
import styles from "./Game.module.css";

const CHOICES = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

const choiceStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: 40,
};

const emojiStyles = {
  fontSize: 64,
  marginRight: 20,
};

const nameStyles = {
  margin: 0,
  fontSize: 24,
  color: "#ffff",
};

const resultStyle = {
  marginTop: 40,
  fontSize: 48,
  color: "#ffff",
};

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [codeyChoice, setCodeyChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handlePlayerChoice(choice) {
    if (gameOver) return; // Prevent playing if game is over

    const codeyChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayerChoice(choice);
    setCodeyChoice(codeyChoice);

    if (choice.name === codeyChoice.name) {
      setResult("Tie!");
    } else if (
      (choice.name === "rock" && codeyChoice.name === "scissors") ||
      (choice.name === "paper" && codeyChoice.name === "rock") ||
      (choice.name === "scissors" && codeyChoice.name === "paper")
    ) {
      setResult("You win!");
      const newPlayerScore = playerScore + 1;
      setPlayerScore(newPlayerScore);
      if (newPlayerScore >= 10) {
        setResult("Game Over - You Win!");
        setGameOver(true);
      }
    } else {
      setResult("You lose!");
      const newComputerScore = computerScore + 1;
      setComputerScore(newComputerScore);
      if (newComputerScore >= 10) {
        setResult("Game Over - Computer Wins!");
        setGameOver(true);
      }
    }
  }

  function resetGame() {
    setPlayerChoice(null);
    setCodeyChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setGameOver(false);
  }

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: 48, marginTop: 0 }}>Rock Paper Scissors</h1>
      <div className={styles.scoreDisplay}>
        Score - Player: {playerScore} Computer: {computerScore}
      </div>
      <div className={styles.choices}>
        {CHOICES.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handlePlayerChoice(choice)}
            aria-label={choice.name}
            className={styles.button}
            disabled={gameOver}
          >
            {choice.emoji}
          </button>
        ))}
      </div>
      {(playerChoice && codeyChoice) || gameOver ? (
        <div className={styles.results}>
          {playerChoice && codeyChoice && (
            <>
              <div style={choiceStyles}>
                <span style={emojiStyles}>{playerChoice.emoji}</span>
                <p style={nameStyles}>You chose {playerChoice.name}</p>
              </div>
              <div style={choiceStyles}>
                <span style={emojiStyles}>{codeyChoice.emoji}</span>
                <p style={nameStyles}>The computer chose {codeyChoice.name}</p>
              </div>
            </>
          )}
          <h2 style={resultStyle}>{result}</h2>
          <button onClick={resetGame} className={styles.button}>
            {gameOver ? "New Game" : "Play again"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Game;
