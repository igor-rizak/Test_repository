import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

export const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  useEffect(() => {
    if (!playerOne) {
      let name1 = "";
      while (!name1) {
        name1 = prompt("Введіть ім’я першого гравця");
        setPlayerOne(name1);
      }
      
    }
  }, [playerOne]);

  useEffect(() => {
    if (!playerTwo) {
      let name2 = "";
      while (!name2) {
        name2 = prompt("Введіть ім’я другого гравця");
        setPlayerTwo(name2);
      }
      
    }
  }, [playerTwo]);

  const handleClick = (i) => {
    const nextSquares = squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  console.log(winner)
  
  let status = !xIsNext ? playerOne : playerTwo;
  if (winner) {
    status = "Winner 🤪: " + status;
  } else if (!squares.includes(null)) {
    status = "GAME OVER!!!";
  } else {
    status = "Наступний хід: " + (xIsNext ? playerOne : playerTwo);
    console.log(status)
  }

  const onBtnReset = () => {
    setSquares(Array(9).fill(null));
  };

  const onBtnGamers = () => {
    setPlayerOne("");
    setPlayerTwo("");
  };

  return (
  <div className="board-container">
    <div className="status">{status}</div>
    <button onClick={onBtnGamers}>Change gamers</button>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
      <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
      <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
      <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
      <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
      <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
      <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
    </div>
    <button onClick={onBtnReset}>RESET</button>
  </div>
);

};

export default Board;
