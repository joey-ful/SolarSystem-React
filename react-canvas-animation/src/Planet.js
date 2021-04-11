import React from 'react';
import Canvas from './Canvas.js';

class Planet extends React.Component {
  constructor(props) {
    super(props);
    const {name, star, x, y, radius, color, velocity, orbitRadius, src} = props.props;
    
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.theta = Math.random() * Math.PI * 2;
    this.clicked = false;
    this.star = {
      x: x,
      y: y,
    };

    this.distanceFromCenter = orbitRadius;
    this.x = this.star.x + orbitRadius * Math.cos(this.theta);
    this.y = this.star.y + orbitRadius * Math.sin(this.theta);
    this.img = new Image();
    this.img.src = src;

    // this.render();
  }

  animate = (ctx, stageWidth, stageHeight) => {
    ctx.clearRect(0, 0, stageHeight, stageHeight);

    this.update();
    this.draw(ctx);
  }

  update = () => {
    // if (this.clicked) {
    //   this.x = this.mouseX;
    //   this.y = this.mouseY;
    //   // console.log('mouse',planet.mouseX, planet.mouseY);
    // } else {
    //   let star = this.find(element => element.name === this.star);

    //   this.x = star.x + this.orbitRadius * Math.cos(this.theta);
    //   this.y = star.y + this.orbitRadius * Math.sin(this.theta);
    // }
    this.theta += this.velocity;
    this.x = this.star.x + this.orbitRadius * Math.cos(this.theta);
    this.y = this.star.y + this.orbitRadius * Math.sin(this.theta);
  }

  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
 
  render() {
  return (
    <>
    <div>Hello</div>
    <Canvas 
      draw={this.animate} 
      id={this.name}
      type='dynamic' 
    />
    </>
  );
  }
}

export default Planet;


