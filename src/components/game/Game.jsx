import { useState } from "react";
import Board from "./Board";
import ToggleMoves from "./ToggleMoves";

function Game() {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [toggleMovesAscending, setToggleMovesAscending] = useState(true);
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
  ///
  function handleToggle() {
    setToggleMovesAscending(!toggleMovesAscending);
  }

  const toggleStyle = toggleMovesAscending
    ? {}
    : {
        display: "flex",
        flexDirection: "column-reverse",
      };
  ///
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
        <ol start="0" style={toggleStyle}>
          {moves}
        </ol>
      </div>
      <ToggleMoves onToggleClick={handleToggle} />
    </div>
  );
}

export default Game;
