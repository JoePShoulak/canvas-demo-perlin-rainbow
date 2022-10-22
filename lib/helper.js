export const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

export const resizeCanvas = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

export function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
