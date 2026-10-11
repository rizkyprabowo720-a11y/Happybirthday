// Isi nama dari config.js
document.querySelectorAll(".nama").forEach((el) => (el.textContent = NAMA));

// Buka hadiah lalu pindah ke halaman 2
const gift = document.getElementById("gift");
const openBtn = document.getElementById("openBtn");
let opened = false;

function openGift() {
  if (opened) return;
  opened = true;
  openBtn.disabled = true;

  gift.classList.add("shake");
  setTimeout(() => {
    gift.classList.remove("shake");
    gift.classList.add("open");
  }, 600);

  setTimeout(() => document.body.classList.add("leaving"), 1700);
  setTimeout(() => (window.location.href = "birthday.html"), 2500);
}

openBtn.addEventListener("click", openGift);
gift.addEventListener("click", openGift);
gift.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openGift();
  }
});
