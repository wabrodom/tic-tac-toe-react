import Square from "./Square";
import calculateWinner from "../../helper/calculateWinner";

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

export default Board;
