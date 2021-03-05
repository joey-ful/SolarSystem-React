import React from 'react';
// import Planet from './Planet.js';
import { usePlanetState, usePlanetDispatch } from './PlanetContext.js';
import Canvas from './Canvas.js';

export default function SolarSystem() {
  const planets = usePlanetState();
  const dispatch = usePlanetDispatch();
  

  // const onDrag = e => {
  //   dispatch({
  //     type: 'DRAG',
  //     orbitRadius: ,
  //     x: e.clientX,
  //     y: e.clientY,
  //   });
  // }

  const drawSolarSystem = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageHeight, stageHeight);

    for (let planet of planets) {
      update(planet, planets);
      draw(ctx, planet.radius, planet.color, planet.x, planet.y);
    }
  }

  const update = (planet, planets) => {
    planet.theta += planet.velocity;
    let updatedX;
    let updatedY;

    if (planet.clicked) {
      updatedX = planet.mouseX;
      updatedY = planet.mouseY;
    } else {
      let star = planets.find(element => element.name === planet.star);

      updatedX = star.x + planet.orbitRadius * Math.cos(planet.theta);
      updatedY = star.y + planet.orbitRadius * Math.sin(planet.theta);
    }

    dispatch({
      type: 'ANIMATE',
      name: planet.name,
      x: updatedX,
      y: updatedY,
    });
    console.log(planet.x, planet.y);
  }

  const draw = (ctx, radius, color, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  const onMouseDown = e => {
    for (let planet of planets) {
      let offsetX = e.clientX - planet.x;
      let offsetY = e.clientY - planet.y;

      if (
        Math.abs(offsetX) <= planet.radius &&
        Math.abs(offsetY) <= planet.radius
      ) {
        planet.clicked = true;
        dispatch({
          type: 'CLICK',
          name: planet.name,
        });
        planet.mouseX = e.clientX - offsetX;
        planet.mouseY = e.clientY - offsetY;
        console.log(planet);
        window.addEventListener("mousemove", () => onMouseMove(e, offsetX, offsetY));
      }
    }
  }

  const onMouseMove = (e, offsetX, offsetY) => {
    for (let planet of planets) {
      if (planet.clicked) {
        dispatch({
          type: 'DRAG',
          name: planet.name,
          mouseX: e.clientX - offsetX,
          mouseY: e.clientY - offsetY,
        })
      }
    }
  }

  const restore = e => {
    for (let planet of planets) {
      if (planet.clicked) {
        dispatch({
          type: 'CLICK',
          name: planet.name,
        })
        window.removeEventListener('mousemove', onMouseMove);
      }
    }
  }

  return (
    <Canvas 
      draw={drawSolarSystem} 
      id='main' 
      type='dynamic' 
      onMouseDown={onMouseDown} 
      onMouseUp={restore} 
      onMouseOut={restore}
    />
  );
}