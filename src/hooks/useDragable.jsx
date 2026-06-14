import { useState } from "react";

export default function useDraggable(
  initialX = 100,
  initialY = 100
) {
  const [position, setPosition] = useState({
    x: initialX,
    y: initialY,
  });

  const moveWindow = (x, y) => {
    setPosition({
      x,
      y,
    });
  };

  return {
    position,
    moveWindow,
  };
}