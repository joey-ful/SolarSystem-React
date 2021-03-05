import React from 'react';
import Planet from './Planet.js';
import { usePlanetState, usePlanetDispatch, usePlanetClicked } from './PlanetContext.js';
import Canvas from './Canvas.js';

export default function SolarSystem() {
  const planets = usePlanetState();
  const dispatch = usePlanetDispatch();
  const clicked = usePlanetClicked();
  

  // const onDrag = e => {
  //   dispatch({
  //     type: 'DRAG',
  //     orbitRadius: ,
  //     x: e.clientX,
  //     y: e.clientY,
  //   });
  // }

  const update = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageHeight, stageHeight);

    for (let planet of planets) {
      planet.theta += planet.velocity;

      if (clicked.current) {
        planet.x = planet.mouseX;
        planet.y = planet.mouseY;
        console.log('mouse',planet.mouseX, planet.mouseY);
      } else {
        let star = planets.find(element => element.name === planet.star);

        planet.x = star.x + planet.orbitRadius * Math.cos(planet.theta);
        planet.y = star.y + planet.orbitRadius * Math.sin(planet.theta);
      }

      draw(ctx, planet.radius, planet.color, planet.x, planet.y);
    }
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
        clicked.current = true;
        planet.mouseX = e.clientX - offsetX;
        planet.mouseY = e.clientY - offsetY;
        
        window.addEventListener("mousemove", () => {
          planet.mouseX = e.clientX - offsetX;
          planet.mouseY = e.clientY - offsetY;
          // console.log('planet', planet);
          console.log('mousemove', planet.mouseX, planet.mouseY);
        });
        // planet.x = planet.mouseX;
        // planet.y = planet.mouseY;
      }
    }
    
  }

  const onMouseMove = (e, planet, offsetX, offsetY) => {
    planet.mouseX = e.clientX - offsetX;
    planet.mouseY = e.clientY - offsetY;
  }

  const restore = e => {
    clicked.current = false;
  }

  return (
    <Canvas 
      draw={update} 
      id='main' 
      type='dynamic' 
      onMouseDown={onMouseDown} 
      onMouseUp={restore} 
      onMouseOut={restore}
    />
  );
}