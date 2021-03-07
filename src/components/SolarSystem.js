import React from 'react';
import { planetInfo } from '../consts/PlanetInfo.js';
import Canvas from './Canvas.js';
import Planet from '../Planet.js';

export default function SolarSystem() {
  let planets = [];
  let sun;
  let earth;

  for (let planet of planetInfo) {
    if (planet.name === 'sun') {
      let sunStar = {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
      }
      sun = new Planet(planet.name, sunStar, planet.radius, planet.color, planet.velocity, planet.orbitRadius);
      planets.push(sun);
    } else if (planet.name === 'earth') {
      earth = new Planet(planet.name, sun, planet.radius, planet.color, planet.velocity, planet.orbitRadius);
      planets.push(earth);
    } else {
      if (planet.star === 'sun') {
        planets.push(new Planet(planet.name, sun, planet.radius, planet.color, planet.velocity, planet.orbitRadius));
      } else {
        planets.push(new Planet(planet.name, earth, planet.radius, planet.color, planet.velocity, planet.orbitRadius));
      }
    }
  }

  const draw = (ctx, canvas, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    
    for (let planet of planets) {
      planet.update(ctx, canvas);
    }
  }

  return (
    <Canvas 
      draw={draw} 
      id='main' 
      type='dynamic'
    />
  );
}