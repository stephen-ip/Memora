import { useEffect, useState, useRef } from "react";

export default function Dodge() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="dodge">
      <button id="start">Start Game</button>
      <canvas id="canvas" width={500} height={500} ref={canvasRef}></canvas>
    </div>
  );
}
