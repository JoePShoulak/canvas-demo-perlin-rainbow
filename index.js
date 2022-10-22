import { resizeCanvas, rotate } from "./lib/helper.js";
import { Particle } from "./lib/Particle.js";
import { noise } from "./lib/Perlin.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const bgAlpha = 0.015;
const speed = 0.001;

let particles;

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

const getCenter = () => {
  return particles[Math.floor(particles.length / 2)];
};

let increment = 0;

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  increment += speed;

  const centerParticle = getCenter();
  const dx = (noise(increment + 200) - 0.5) * 2;
  const dy = (noise(increment + 200) - 0.5) * 2;

  const centerWoudBeOffscreen =
    centerParticle.x + dx > innerWidth - 20 ||
    centerParticle.y + dy > innerHeight - 20 ||
    centerParticle.x - dx < 20 ||
    centerParticle.y - dy < 20;

  // console.log(dx, dy);
  particles.forEach((particle) => {
    const newPoint = rotate(
      centerParticle.x,
      centerParticle.y,
      particle.x,
      particle.y,
      noise(increment) - 0.5
    );
    [particle.x, particle.y] = newPoint;

    if (!centerWoudBeOffscreen) {
      particle.x += dx;
      particle.y += dy;
    } else {
      particle.x += particle.x > innerWidth / 2 ? -1 : 1;
      particle.y += particle.y > innerHeight / 2 ? -1 : 1;
    }

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
