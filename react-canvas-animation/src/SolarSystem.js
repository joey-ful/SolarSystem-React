import React from 'react';
import Planet from './Planet.js';
import { usePlanetState } from './PlanetContext.js';
import Canvas from './Canvas.js';

export default function SolarSystem() {
  const planets = usePlanetState();
  // planets.map(planet => new Planet(planet.name, planet.star, planet.radius, planet.color, planet.velocity, planet.orbitRadius, planet.src))
  let q = planets.map(planet => new Planet(planet))
  // let q = [];
  // for (let planet in planets) {
  //   q.push(new Planet(planet));
  // }

  for (let i of q) {
    console.log(i.star)
  }

  return (
    <>
    {q.map(planet => <Canvas 
    key={planet.name}
    draw={planet.animate}
    planets={q} 
    id={planet.name}
    type='dynamic' 
  />)}
    </>
    
  );
}