import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    const winner = calculateWinner(board);
    if (winner || board.every(square => square)) {
      setGameHistory([...gameHistory, { winner, board }]);
    }
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "Game Draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, i) => (
          <button 
            key={i} 
            className="square" 
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      
      <div className="history">
        <h2>Game History</h2>
        {gameHistory.map((game, i) => (
          <div key={i} className="history-item">
            Game {i + 1}: {game.winner ? `Winner - ${game.winner}` : 'Draw'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
