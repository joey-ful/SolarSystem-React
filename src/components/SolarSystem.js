import React from 'react';
import { planetInfo } from '../consts/PlanetInfo.js';
import Canvas from './Canvas.js';
import Planet from '../js/Planet.js';
import { useToggleState } from '../contexts/ToggleContext.js';
import { useRadioState } from '../contexts/RadioContext.js';

export default function SolarSystem() {
  const toggleOptions = useToggleState();
  const radioOptions = useRadioState();
  const dragType = radioOptions[0].options.find(option => option.checked === true).name;
  const shadowType = radioOptions[1].options.find(option => option.checked === true).name;
  const backgroundToggle = toggleOptions.find(option => option.name === 'background').checked;
  const orbitToggle = toggleOptions.find(option => option.name === 'orbit-path').checked;
  const planetArtToggle = toggleOptions.find(option => option.name === 'planet-art').checked;


  


  let planets = [];
  let sun;
  let earth;

  for (let planet of planetInfo) {
    if (planet.name === 'sun') {
      let sunStar = {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
      }
      sun = new Planet(planet.name, sunStar, planet.radius, planet.color, planet.velocity, planet.orbitRadius, planet.src);
      planets.push(sun);
    } else if (planet.name === 'earth') {
      earth = new Planet(planet.name, sun, planet.radius, planet.color, planet.velocity, planet.orbitRadius, planet.src);
      planets.push(earth);
    } else {
      if (planet.star === 'sun') {
        planets.push(new Planet(planet.name, sun, planet.radius, planet.color, planet.velocity, planet.orbitRadius, planet.src));
      } else {
        planets.push(new Planet(planet.name, earth, planet.radius, planet.color, planet.velocity, planet.orbitRadius, planet.src));
      }
    }
  }

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
      <Canvas 
        draw={draw} 
        id='main-canvas' 
        type='dynamic'
      />
      <Canvas id='path-canvas' draw={drawPath} type='dynamic'/>
      <Canvas id='shadow-canvas' draw={drawShadow} type='dynamic'/>
    </>
  );
}