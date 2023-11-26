import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const boardSize = 3;
  let status = "";

  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares); // pass new squres to onPlay to update the board for the next play
  }

  const rows = new Array(boardSize).fill(null).map((_, i) => {
    const row = new Array(boardSize).fill(null).map((_, j) => {
      const index = i * boardSize + j;
      return (
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    });
    return <div className="board-row"> {row}</div>;
  });

  return (
    <>
      <div className="status">{status} </div>
      {rows}
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, index) => {
    let text = "";
    if (index > 0) {
      text = "Go to move # " + index;
    } else {
      text = "Go to start";
    }
    if (index === history.length - 1) {
      return <span> You are at move # {index} </span>;
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}> {text} </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol start="0"> {moves} </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
