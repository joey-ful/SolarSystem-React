import React from 'react';
import Canvas from './Canvas.js';
import { useToggleState } from '../contexts/ToggleContext.js';
import { useRadioState } from '../contexts/RadioContext.js';

export default function SolarSystem({planets}) {
  const toggleOptions = useToggleState();
  const radioOptions = useRadioState();
  const dragType = radioOptions[0].options.find(option => option.checked === true).name;
  const shadowType = radioOptions[1].options.find(option => option.checked === true).name;
  const backgroundToggle = toggleOptions.find(option => option.name === 'background').checked;
  const orbitToggle = toggleOptions.find(option => option.name === 'orbit-path').checked;
  const planetArtToggle = toggleOptions.find(option => option.name === 'planet-art').checked;

  const draw = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    
    for (let planet of planets) {
      planet.update(ctx, dragType, planetArtToggle);
    }
  }

  const drawShadow = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageWidth, stageHeight);

    for (let planet of planets) {
      planet.drawShadow(ctx, shadowType, planetArtToggle, backgroundToggle);
    }
  }

  const drawPath = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    if (orbitToggle) {
      for (let planet of planets) {
        planet.drawOrbitPath(ctx);
      }
    }
  }

  return (
    <>
      <Canvas id='path-canvas' draw={drawPath} type='dynamic'/>
      <Canvas 
        draw={draw} 
        id='main-canvas' 
        type='dynamic'
      />
      <Canvas id='shadow-canvas' draw={drawShadow} type='dynamic'/>
    </>
  );
}