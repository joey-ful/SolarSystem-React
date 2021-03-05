// import React, { useState } from 'react';
import Canvas from './Canvas';

const Planet = () => {
  const draw = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageHeight, stageHeight);
    ctx.beginPath();
    ctx.arc(stageWidth/2, stageHeight/2, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
  return <Canvas draw={draw} type='dynamic' id='main'/>
}

export default Planet;