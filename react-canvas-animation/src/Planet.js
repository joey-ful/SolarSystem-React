// import React from 'react';
// import Canvas from './Canvas.js';

// class Planet extends React.Component {
//   constructor(props) {
//     super(props);
//     const {name, star, radius, color, velocity, orbitRadius, src} = props;
//     console.log(name)
//     this.name = name;
//     this.star = star;
//     this.radius = radius;
//     this.color = color;
//     this.velocity = velocity;
//     this.orbitRadius = orbitRadius;

//     this.theta = Math.random() * Math.PI * 2;
//     this.clicked = false;
//     this.mouse = {
//       x: star.x,
//       y: star.y,
//     };

//     this.distanceFromCenter = orbitRadius;
//     this.x = star.x + orbitRadius * Math.cos(this.theta);
//     this.y = star.y + orbitRadius * Math.sin(this.theta);
//     this.img = new Image();
//     this.img.src = src;

//     // this.render();
//   }

//   animate = (ctx, stageWidth, stageHeight) => {
//     ctx.clearRect(0, 0, stageHeight, stageHeight);

//     this.update();
//     this.draw(ctx);
//   }

//   update = () => {
//     if (this.clicked) {
//       this.x = this.mouseX;
//       this.y = this.mouseY;
//       // console.log('mouse',planet.mouseX, planet.mouseY);
//     } else {
//       let star = this.find(element => element.name === this.star);

//       this.x = star.x + this.orbitRadius * Math.cos(this.theta);
//       this.y = star.y + this.orbitRadius * Math.sin(this.theta);
//     }
//   }

//   draw = (ctx) => {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//     ctx.closePath();
//   }
 
//   // render() {
//   // return (
//   //   <>
//   //   <div>Hello</div>
//   //   <Canvas 
//   //     draw={this.animate} 
//   //     id={this.name}
//   //     type='dynamic' 
//   //   />
//   //   </>
//   // );
//   // }
// }

// export default Planet;



export default class Planet {
  constructor(props) {
    const {name, star, x, y, radius, color, velocity, orbitRadius, src} = props;
    console.log(name, star)
    
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.theta = Math.random() * Math.PI * 2;
    this.clicked = false;
    this.mouse = {
      x: x,
      y: y,
    };
    this.star = {
      x: x,
      y: y,
    }

    this.distanceFromCenter = orbitRadius;
    this.x = this.star.x + orbitRadius * Math.cos(this.theta);
    this.y = this.star.y + orbitRadius * Math.sin(this.theta);
    this.img = new Image();
    this.img.src = src;

    // this.render();
  }

  animate = (ctx, stageWidth, stageHeight, planets) => {
    ctx.clearRect(0, 0, stageHeight, stageHeight);

    this.update(planets);
    this.draw(ctx);
  }

  update = (planets) => {
    this.theta += this.velocity;
    // console.log(this.x, this.y)
    // if (this.clicked) {
    //   this.x = this.mouseX;
    //   this.y = this.mouseY;
    //   // console.log('mouse',planet.mouseX, planet.mouseY);
    // } else {
    //   // let star = planets.find(element => element.name === this.star);

      this.x = this.star.x + this.orbitRadius * Math.cos(this.theta);
      this.y = this.star.y + this.orbitRadius * Math.sin(this.theta);
    // }
  }

  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}