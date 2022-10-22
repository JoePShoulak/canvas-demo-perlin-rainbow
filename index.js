import { resizeCanvas, rotate } from "./lib/helper.js";
import { Particle } from "./lib/Particle.js";
import { noise } from "./lib/Perlin.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const bgAlpha = 0.014;

let particles;

const center = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const setup = () => {
  resizeCanvas(canvas);

  c.fillStyle = "#222";
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles = [];
  for (let i = -180; i < 180; i += 4) {
    const particle = new Particle(c, innerWidth / 2 + i, innerHeight / 2);
    particle.color = `hsl(${180 + i}, 75%, 50%)`;
    particles.push(particle);
  }
};

// noise(1)
let increment = 0;

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  center.x += noise(increment + 5 * Math.PI) - 0.5;
  center.y += noise(increment + 10 * Math.PI) - 0.5;

  // TODO: Keep this damn thing in the window
  center.x = Math.min(center.x, innerWidth - 100);
  center.x = Math.max(center.x, 100);
  center.y = Math.min(center.y, innerHeight - 100);
  center.y = Math.max(center.y, 100);

  increment += 0.001;

  particles.forEach((particle) => {
    const newPoint = rotate(
      center.x,
      center.y,
      particle.x,
      particle.y,
      noise(increment) - 0.5
    );

    [particle.x, particle.y] = newPoint;

    particle.update();
  });
};

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  setup();
});

window.addEventListener("resize", () => {
  resizeCanvas(canvas);
});

setup();
animate();
