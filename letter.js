/* Floating Emojis 🌷🍓❤️ */
const bg = document.getElementById("floating-bg");
const emojis = ["🌷", "🍓", "❤️"];

function createFloatingEmoji() {
  const span = document.createElement("span");
  span.classList.add("float-emoji");
  span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDuration = (4 + Math.random() * 4) + "s";
  span.style.fontSize = (24 + Math.random() * 18) + "px";
  bg.appendChild(span);
  setTimeout(() => span.remove(), 8000);
}
setInterval(createFloatingEmoji, 450);

/* 🎶 Autoplay Fix for Mobile */
const bgMusic = document.getElementById("bgMusic");
document.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
}, { once: true });

/* Page fade-in on load */
window.addEventListener("load", () => {
  document.body.classList.add("show");
});

/* Flipbook Navigation */
const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const backBtn = document.getElementById("backBtn");

let current = 0;

function updatePages() {
  pages.forEach((p, i) => {
    p.classList.remove("active");
    if (i === current) p.classList.add("active");
  });

  // Show/Hide buttons
  prevBtn.style.display = current === 0 ? "none" : "inline-block";
  nextBtn.style.display = current === pages.length - 1 ? "none" : "inline-block";
  backBtn.style.display = current === pages.length - 1 ? "inline-block" : "none";
}

nextBtn.addEventListener("click", () => {
  if (current < pages.length - 1) current++;
  updatePages();
});

prevBtn.addEventListener("click", () => {
  if (current > 0) current--;
  updatePages();
});

backBtn.addEventListener("click", () => {
  document.body.classList.remove("show");
  setTimeout(() => history.back(), 650);
});

updatePages();
