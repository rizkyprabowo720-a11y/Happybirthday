// ===== Elemen =====
const cake = document.getElementById("cake");
const wish = document.getElementById("wish");
const blowBtn = document.getElementById("blowBtn");
const relightBtn = document.getElementById("relightBtn");
const confettiBtn = document.getElementById("confettiBtn");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const colors = ["#ff4081", "#ffca28", "#29b6f6", "#66bb6a", "#ab47bc", "#ff7043", "#ffffff"];

// ===== Nama (dari config.js) =====
document.querySelectorAll(".nama").forEach((el) => (el.textContent = NAMA));

// ===== Konfeti =====
let particles = [];
let animating = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(amount = 160) {
  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 4,
      speedX: -1.5 + Math.random() * 3,
      angle: Math.random() * Math.PI * 2,
      spin: -0.2 + Math.random() * 0.4,
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(drawConfetti);
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.angle += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  particles = particles.filter((p) => p.y < canvas.height + 30);

  if (particles.length > 0) {
    requestAnimationFrame(drawConfetti);
  } else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ===== Efek mengetik =====
let typingTimer = null;
function typeText(text) {
  clearInterval(typingTimer);
  wish.textContent = "";
  let i = 0;
  typingTimer = setInterval(() => {
    wish.textContent += text[i++];
    if (i >= text.length) clearInterval(typingTimer);
  }, 45);
}

// ===== Tiup lilin =====
blowBtn.addEventListener("click", () => {
  cake.classList.add("blown");
  blowBtn.hidden = true;
  relightBtn.hidden = false;
  typeText(`Semoga semua harapanmu terkabul, ${NAMA}! Panjang umur dan bahagia selalu! ,Serta diberi kemudahan untuk menggapai semua hal yang kamu inginkan 🎂💖
    `);
  launchConfetti(220);
});

relightBtn.addEventListener("click", () => {
  cake.classList.remove("blown");
  relightBtn.hidden = true;
  blowBtn.hidden = false;
  typeText("Buat permohonan, lalu tiup lilinnya! 🕯️");
});

confettiBtn.addEventListener("click", () => launchConfetti(200));

cake.addEventListener("click", () => {
  if (!cake.classList.contains("blown")) blowBtn.click();
});

// Konfeti pembuka saat halaman dimuat
window.addEventListener("load", () => setTimeout(() => launchConfetti(120), 500));
