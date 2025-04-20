
let count = 0;
const button = document.getElementById("clickBtn");
const display = document.getElementById("count");

button.addEventListener("click", () => {
  count++;
  display.textContent = count;
  createFirework(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
});


const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.color = color;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createFirework(x, y) {
  const colors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateFireworks);
}

animateFireworks();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
