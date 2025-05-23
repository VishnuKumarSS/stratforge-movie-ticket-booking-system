//
// # Problem Statement:
// Build a React application that displays a set of randomly positioned squares. When a square is clicked, it disappears. Display the number of removed squares in the top-right corner.
// ## Requirements1. User Input - Accept an integer input n (0 ≤ n ≤ 50), representing the number of squares to draw.
// 2. Square Rendering - Generate n squares with the following:- Fixed size: 40×40 pixels.
// - Random positions fully within a 600×400 container.
// - Random background colors.
// - On click, remove the clicked square from the screen.
// 3. Removed Squares Counter- Display a counter in the top-right corner showing how many squares have been removed.
// ## Constraints- Use React (functional components + Hooks).
// - Use div elements with absolute positioning or SVG.
// - Use any styling method (CSS, Tailwind, styled-components, etc.).
// - Keep the logic simple — no intersection or animations required.

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Squares = () => {
  const [noOfRemovedSquares, setNoOfRemovedSquares] = useState(0);
  const [numberOfSquares, setNumberOfSquares] = useState(20);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.squares.value);
    if (!isNaN(value) && value >= 0 && value <= 50) {
      setNumberOfSquares(value);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-fit">
        <Label htmlFor="squares">Number of squares:</Label>
        <Input
          type="number"
          placeholder="Enter the number of squares to draw"
          name="squares"
          min="0"
          max="50"
          defaultValue={numberOfSquares}
        />
        <Button type="submit">Draw</Button>
      </form>

      <div className="relative">
        <div className="absolute top-2.5 right-2.5 font-bold">
          Removed: {noOfRemovedSquares}
        </div>
        <Canvas
          squares={numberOfSquares}
          onSquareRemoved={() => setNoOfRemovedSquares((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default Squares;
