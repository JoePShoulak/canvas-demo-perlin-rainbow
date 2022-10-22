import { COLORS } from "./helper.js";

export class Particle {
  static radius = 5;

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    /** @type {CanvasRenderingContext2D} */
    this.c = context;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update = () => {
    // this.y++;
    this.draw();
  };

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.beginPath();
    this.c.arc(this.x, this.y, Particle.radius, 0, Math.PI * 2);
    this.c.fill();
  };
}
