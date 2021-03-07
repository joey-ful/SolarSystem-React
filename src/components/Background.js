import React from 'react';
import Canvas from './Canvas';
import { useToggleState } from '../contexts/ToggleContext.js';

const Background = () => {
  const toggleOptions = useToggleState();
  const backgroundToggle = toggleOptions.find(option => option.name === 'background').checked;

  const draw = (ctx, stageWidth, stageHeight) => {
    ctx.fillStyle = backgroundToggle ? createGradient(ctx, stageWidth, stageHeight) : '#4D5769';
    ctx.fillRect(0, 0, stageWidth, stageHeight);
    if (backgroundToggle) {
      fillStars(ctx, 200, stageWidth, stageHeight);
    }
  }

  const fillStars = (ctx, starNumber, stageWidth, stageHeight) => {
    for (let i = 0; i < starNumber; i++) {
      let radius = Math.random() * 1 + 0.1;
      let x = radius + Math.random() * (stageWidth - radius * 2);
      let y = radius + Math.random() * (stageHeight - radius * 2);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.closePath();
    }
  }

  const createGradient = (ctx, stageWidth, stageHeight) => {
    let gradient = ctx.createRadialGradient(
      stageWidth / 2,
      stageHeight / 2,
      stageWidth / 3,
      stageWidth / 2,
      stageHeight / 2,
      stageWidth / 1.5
    );

    gradient.addColorStop(0, '#214568');
    gradient.addColorStop(1, '#162133');

    return gradient;
  }

  return <Canvas draw={draw} type='static' id='back-canvas'/>
}

export default Background;