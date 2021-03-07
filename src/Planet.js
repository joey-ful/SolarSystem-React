export default class Planet {
  constructor(name, star, radius, color, velocity, orbitRadius) {
    this.name = name;
    this.star = star;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;

    this.theta = Math.random() * Math.PI * 2;
    this.clicked = false;

    this.mouse = {
      x: star.x,
      y: star.y,
    };

    this.x = this.star.x + this.orbitRadius * Math.cos(this.theta);
    this.y = this.star.y + this.orbitRadius * Math.sin(this.theta);
  }

  update(ctx, canvas) {
    this.interaction(canvas);
    this.theta += this.velocity;

    if (this.clicked) {
      this.x = this.mouse.x;
      this.y = this.mouse.y;
    } else {
      this.x = this.star.x + this.orbitRadius * Math.cos(this.theta);
      this.y = this.star.y + this.orbitRadius * Math.sin(this.theta);
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  interaction(canvas) {
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e, canvas));
    canvas.addEventListener('mouseup', () => this.restore(canvas));
    canvas.addEventListener('mouseout', () => this.restore(canvas));
  }

  onMouseDown = (e, canvas) => {
    this.offsetX = e.clientX - this.x;
    this.offsetY = e.clientY - this.y;

    if (
      Math.abs(this.offsetX) <= this.radius &&
      Math.abs(this.offsetY) <= this.radius
    ) {
      this.clicked = true;
      canvas.addEventListener('mousemove', this.onMouseMove);
    }
  };

  onMouseMove = (e) => {
    this.mouse.x = e.clientX - this.offsetX;
    this.mouse.y = e.clientY - this.offsetY;
  };

  restore = canvas => {
    if (this.clicked && this.name !== 'sun') {
      this.clicked = false;
      
      this.orbitRadius = Math.sqrt(
        Math.pow(this.star.x - this.x, 2) + Math.pow(this.star.y - this.y, 2)
      );

      this.theta = Math.acos((this.x - this.star.x) / this.orbitRadius);

      if (this.y - this.star.y < 0) {
        this.theta = 2 * Math.PI - this.theta;
      }
      canvas.removeEventListener('mousemove', this.onMouseMove);
    } else if (this.clicked && this.name === 'sun') {
      this.clicked = false;
      this.star.x = this.x;
      this.star.y = this.y;
      canvas.removeEventListener('mousemove', this.onMouseMove);
    }
    
    canvas.removeEventListener('mousedown', this.onMouseDown);
  };
}