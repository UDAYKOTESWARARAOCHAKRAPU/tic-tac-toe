import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "../Css/PlayerVsPlayer.css";

export const PlayerVsPlayer = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" });
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [draws, setDraws] = useState(0);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      handleGameEnd(gameWinner);
    }
  };

  const handleGameEnd = (gameWinner) => {
    setGamesPlayed((prev) => prev + 1);
    if (gameWinner === "X") {
      setPlayer1Wins((prev) => prev + 1);
    } else if (gameWinner === "O") {
      setPlayer2Wins((prev) => prev + 1);
    } else if (gameWinner === "Draw") {
      setDraws((prev) => prev + 1);
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

  return (
    <div className="game-container">
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
            {cell && <span className={cell === "X" ? "x" : "o"}>{cell}</span>}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      <Link to="/" className="back-home-button">
        <button>
          <KeyboardArrowLeftIcon />
        </button>
      </Link>
      <div className="game-statistics">
        <p>Total Games Played: {gamesPlayed}</p>
        <p>{playerNames.player1}'s Wins: {player1Wins}</p>
        <p>{playerNames.player2}'s Wins: {player2Wins}</p>
        <p>Draws: {draws}</p>
      </div>
    </div>
  );
};
