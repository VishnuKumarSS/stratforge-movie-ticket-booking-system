import React, { useState, useEffect } from "react";

// Generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate random squares with positions and colors
const generateSquares = (count) => {
  const squares = [];
  for (let i = 0; i < count; i++) {
    squares.push({
      id: i,
      x: Math.random() * 560, // 600 - 40 (square width)
      y: Math.random() * 360, // 400 - 40 (square height)
      color: getRandomColor(),
    });
  }
  return squares;
};

export const Canvas = ({ squares: squareCount, onSquareRemoved }) => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    setSquares(generateSquares(squareCount));
  }, [squareCount]);

  const handleSquareClick = (id) => {
    setSquares(squares.filter((square) => square.id !== id));
    onSquareRemoved();
  };

  return (
    <div className="relative w-[600px] h-[400px] border-gray-300 my-5 overflow-hidden rounded-xl border-2 shadow-sm">
      {squares.map((square) => (
        <div
          key={square.id}
          className="absolute w-10 h-10 cursor-pointer"
          style={{
            backgroundColor: square.color,
            left: `${square.x}px`,
            top: `${square.y}px`,
          }}
          onClick={() => handleSquareClick(square.id)}
        />
      ))}
    </div>
  );
};
