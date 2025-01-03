import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../Css/PlayerVsPlayer.css";

export const PlayerVsPlayer = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" });
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell)) {
      return "Draw";
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsNameSubmitted(true);
  };

  if (!isNameSubmitted) {
    return (
      <div className="name-container">
        <Link to="/" className="back-home-button">
            <button>
                <KeyboardArrowLeftIcon />
            </button>
        </Link>
        <h1>Enter Player Names</h1>
        <form onSubmit={handleNameSubmit} className="name-form">
          <input
            type="text"
            placeholder="Player 1"
            value={playerNames.player1}
            onChange={(e) =>
              setPlayerNames({ ...playerNames, player1: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Player 2"
            value={playerNames.player2}
            onChange={(e) =>
              setPlayerNames({ ...playerNames, player2: e.target.value })
            }
            required
          />
          <button type="submit" className="submit-button">
            Start Game
          </button>
        </form>
      </div>
    );
  }

  const getStatusMessage = () => {
    if (winner) {
      if (winner === "Draw") {
        return "It's a Draw!";
      }
      return `Winner: ${
        winner === "X" ? `${playerNames.player1} (X)` : `${playerNames.player2} (O)`
      }`;
    }
    return `Next Turn: ${
      isXNext ? `${playerNames.player1} (X)` : `${playerNames.player2} (O)`
    }`;
  };

  return (
    <div className="game-container">
      {/* Back to Home Button */}
      <Link to="/" className="back-home-button">
        <button>
          <KeyboardArrowLeftIcon />
        </button>
      </Link>

      <div className="status-container">
        <div className="player-sign">
          <h2>{playerNames.player1}: <span className="player-x">X</span></h2>
          <h2>{playerNames.player2}: <span className="player-o">O</span></h2>
        </div>
        <div className="game-status">{getStatusMessage()}</div>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? "filled" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};
