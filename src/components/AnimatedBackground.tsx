import { useEffect, useRef, useState } from 'react'
import './AnimatedBackground.css'

import { motion } from 'framer-motion'

const randomX = () => Math.floor(Math.random() * window.innerWidth);
const randomY = () => Math.floor(Math.random() * window.innerHeight);

function App() {
  // const canvas = document.getElementById("myCanvas");
  // canvas.imageSmoothingEnabled = false;
  // canvas.width = window.innerWidth * window.devicePixelRatio;
  // canvas.height = window.innerHeight * window.devicePixelRatio;
  // canvas.style.width = window.innerWidth + "px";
  // canvas.style.height = window.innerHeight + "px";

  const [x, setX] = useState(randomX());
  const [y, setY] = useState(randomY());
  const [rotate, setRotate] = useState(0);
  const canvasElement = useRef<HTMLCanvasElement>(null);

  const randomizePosition = () => {
    if (!canvasElement.current) {
      return;
    }
    const ctx : CanvasRenderingContext2D = canvasElement.current.getContext("2d")!;
    ctx.strokeStyle = "rgba(255, 100, 0, 0.2)";
    ctx.lineWidth = 1;
    const screenScale = window.devicePixelRatio;

    const oldX = x * screenScale;
    const oldY = y * screenScale;

    ctx.beginPath();
    ctx.moveTo(oldX, oldY);

    const newPosX = randomX();
    const newPosY = randomY();

    ctx.lineTo(newPosX * screenScale, newPosY * screenScale);
    ctx.stroke();

    setX(newPosX);
    setY(newPosY);
    setRotate(Math.random() * 360 - 180);

    const positionDiv = document.createElement('div');
    positionDiv.className = 'dot';
    positionDiv.style = `top: ${y}px; left: ${x}px; rotate: ${rotate}deg;`;
    document.body.appendChild(positionDiv);
  }

  const maxScreenWidth = window.innerWidth * window.devicePixelRatio;
  const maxScreenHeight = window.innerHeight * window.devicePixelRatio;

  return (
    <>
      <canvas id="myCanvas" width={maxScreenWidth} height={maxScreenHeight} ref={canvasElement} style={{ width: window.innerWidth + "px", height: window.innerHeight + "px" }}
></canvas>
      <motion.div className='square' animate={{ x, y, rotate }} transition={{ type: "spring" }} />
      <button className='position' onClick={randomizePosition}>Hit me</button>
    </>
  )
}

export default App
