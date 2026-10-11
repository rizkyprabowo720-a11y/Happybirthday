// Animasi bunga mekar di latar belakang
const flowersEl = document.getElementById("flowers");
const isLanding = document.body.classList.contains("landing");

// [warna dasar kelopak, warna ujung kelopak]
const palettes = isLanding
  ? [
      ["#ff8ab8", "#ffd1e6"],
      ["#ffe082", "#fff8d6"],
      ["#b388ff", "#e6d8ff"],
      ["#80deea", "#d8f8fb"],
      ["#ffffff", "#ffe0f0"],
    ]
  : [
      ["#ec407a", "#ffc1d9"],
      ["#ab47bc", "#ecc3f3"],
      ["#ff7043", "#ffd0bf"],
      ["#fdd835", "#fff6b0"],
      ["#ffffff", "#ffd6e8"],
    ];

const FLOWER_COUNT = window.innerWidth < 600 ? 9 : 16;

function spawnFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";

  const size = 55 + Math.random() * 85;
  const [c1, c2] = palettes[Math.floor(Math.random() * palettes.length)];
  const petalCount = 6 + Math.floor(Math.random() * 4);

  flower.style.setProperty("--s", size + "px");
  flower.style.setProperty("--c1", c1);
  flower.style.setProperty("--c2", c2);
  flower.style.setProperty("--dur", 9 + Math.random() * 6 + "s");
  flower.style.left = Math.random() * 92 + "%";
  flower.style.top = Math.random() * 88 + "%";

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.setProperty("--r", (i * 360) / petalCount + "deg");
    petal.style.setProperty("--d", i * 0.1 + "s");
    flower.appendChild(petal);
  }

  const core = document.createElement("span");
  core.className = "core";
  flower.appendChild(core);

  // Setelah siklus selesai, hapus dan munculkan bunga baru di tempat lain
  flower.addEventListener("animationend", (e) => {
    if (e.target === flower) {
      flower.remove();
      spawnFlower();
    }
  });

  flowersEl.appendChild(flower);
}

for (let i = 0; i < FLOWER_COUNT; i++) {
  setTimeout(spawnFlower, i * 450);
}
