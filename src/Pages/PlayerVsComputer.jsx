import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export const PlayerVsComputer = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  // Statistics State
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [draws, setDraws] = useState(0);

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => makeComputerMove(), 500); // Delay for computer move
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) handleWinner(gameWinner);
  };

  const makeComputerMove = () => {
    const newBoard = [...board];

    const blockingMove = findBlockingMove(newBoard);
    if (blockingMove !== null) {
      newBoard[blockingMove] = "O";
    } else {
      const availableCells = newBoard
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null);

      if (availableCells.length > 0) {
        const randomIndex =
          availableCells[Math.floor(Math.random() * availableCells.length)];
        newBoard[randomIndex] = "O";
      }
    }

    setBoard(newBoard);
    setIsXNext(true);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) handleWinner(gameWinner);
  };

  const findBlockingMove = (board) => {
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
      const values = [board[a], board[b], board[c]];

      if (values.filter((val) => val === "X").length === 2 && values.includes(null)) {
        return combo[values.indexOf(null)];
      }
    }

    return null;
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

  const handleWinner = (gameWinner) => {
    setWinner(gameWinner);
    setGamesPlayed((prev) => prev + 1);

    if (gameWinner === "X") {
      setPlayerWins((prev) => prev + 1);
    } else if (gameWinner === "O") {
      setComputerWins((prev) => prev + 1);
    } else {
      setDraws((prev) => prev + 1);
    }
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
      return `Winner: ${winner === "X" ? `${playerName} (X)` : "Computer (O)"}`;
    }
    return `Next Turn: ${isXNext ? `${playerName} (X)` : "Computer (O)"}`;
  };

  if (!isNameSubmitted) {
    return (
      <div className="name-container">
        <Link to="/" className="back-home-button">
        <button>
          <KeyboardArrowLeftIcon />
        </button>
      </Link>
        <h1>Enter Your Name</h1>
        <form onSubmit={handleNameSubmit} className="name-form">
          <input
            type="text"
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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
          <h2>{playerName}: <span className="player-x">X</span></h2>
          <h2>Computer: <span className="player-o">O</span></h2>
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
      <div className="game-statistics">
        
        <p>Total Games Played: {gamesPlayed}</p>
        <p>{playerName}'s Wins: {playerWins}</p>
        <p>Computer Wins: {computerWins}</p>
        <p>Draws: {draws}</p>
      </div>
      <Link to="/" className="back-home-button">
        <button>
          <KeyboardArrowLeftIcon />
        </button>
      </Link>
    </div>
  );
};
