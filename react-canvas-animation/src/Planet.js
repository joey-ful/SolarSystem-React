import React from 'react';

export default function Planet() {
  const update = (planets, planet) => {
    if (planet.clicked) {
      planet.x = planet.mouseX;
      planet.y = planet.mouseY;
      console.log('mouse',planet.mouseX, planet.mouseY);
    } else {
      let star = planets.find(element => element.name === planet.star);

      planet.x = star.x + planet.orbitRadius * Math.cos(planet.theta);
      planet.y = star.y + planet.orbitRadius * Math.sin(planet.theta);
    }
  }

  const draw = (ctx, radius, color, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

export const update = (planets, planet) => {
  if (planet.clicked) {
    planet.x = planet.mouseX;
    planet.y = planet.mouseY;
    console.log('mouse',planet.mouseX, planet.mouseY);
  } else {
    let star = planets.find(element => element.name === planet.star);

    planet.x = star.x + planet.orbitRadius * Math.cos(planet.theta);
    planet.y = star.y + planet.orbitRadius * Math.sin(planet.theta);
  }
}

export const draw = (ctx, radius, color, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}