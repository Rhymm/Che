const envelope = document.getElementById("envelope");
const card = document.getElementById("card");
const floatingBG = document.querySelector(".floating-bg");
const cakeImg = document.getElementById("cakeAnimation");

// Cake frames setup
const totalFrames = 36;
const frames = [];
for (let i = 1; i <= totalFrames; i++) {
  const num = String(i).padStart(4, '0');
  frames.push(`cake/frame_${num}.png`);
}
let currentFrame = 0;
let direction = 1;

// Function to animate cake frames (ping-pong)
function animateCake() {
  cakeImg.src = frames[currentFrame];
  if(currentFrame === frames.length - 1) direction = -1;
  if(currentFrame === 0) direction = 1;
  currentFrame += direction;
  setTimeout(animateCake, 100);
}

// Envelope click: open and show card + cake + sparkle + confetti
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => {
    card.classList.add("show");
    sparkleBurst();
    animateCake();
    createConfettiBurst();
    // Optional: play background music
    // document.getElementById("bgMusic").play();
  }, 450);
});

// Floating berries
function createFloatingBerry(){
  const span = document.createElement("span");
  span.classList.add("floating-straw");
  span.innerText = "🍓";
  span.style.left = Math.random() * 100 + "vw";
  span.style.top = Math.random() * 100 + "vh";
  span.style.animationDuration = (3 + Math.random() * 2) + "s";
  floatingBG.appendChild(span);
  setTimeout(() => span.remove(), 6000);
}
setInterval(createFloatingBerry, 260);

// Falling berries
function createFallingBerry(){
  const berry = document.createElement("div");
  berry.classList.add("falling-strawberry");
  berry.innerText = "🍓";
  berry.style.left = Math.random() * 100 + "vw";
  berry.style.fontSize = (22 + Math.random() * 12) + "px";
  document.body.appendChild(berry);
  setTimeout(() => berry.remove(), 4000);
}
setInterval(createFallingBerry, 600 + Math.random() * 700);

// Sparkle effect
function sparkleBurst() {
  for(let i = 0; i < 24; i++){
    const spark = document.createElement("div");
    spark.classList.add("sparkle");
    const angle = Math.random() * 360;
    const distance = 60 + Math.random() * 40;
    spark.style.left = `calc(50% + ${Math.cos(angle) * 4}px)`;
    spark.style.top = `calc(50% + ${Math.sin(angle) * 4}px)`;
    spark.style.setProperty("--dx", `${Math.cos(angle) * (distance)}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * (distance)}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

// Confetti effect
function createConfettiBurst(){
  for(let i=0;i<30;i++){
    setTimeout(()=>{
      const conf = document.createElement("div");
      conf.style.position = "fixed";
      const size = Math.random()*8 + 4;
      conf.style.width = conf.style.height = size + "px";
      conf.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 70%)`;
      conf.style.left = Math.random()*100 + "vw";
      conf.style.top = "-10px";
      conf.style.borderRadius = "50%";
      conf.style.zIndex = 25;
      document.body.appendChild(conf);
      conf.animate(
        [{transform: "translateY(0)"},{transform: `translateY(100vh) rotate(${Math.random()*360}deg)`}],
        {duration: 2000 + Math.random()*1000, easing: "linear"}
      );
      setTimeout(()=> conf.remove(), 3000);
    }, i*100);
  }
}

// Page fade-in on load
window.addEventListener("load", () => {
  document.body.classList.add("show");
});

// Fade transition when opening letter
document.querySelector(".letter-btn").addEventListener("click", function(e){
  e.preventDefault();
  document.body.classList.remove("show");
  setTimeout(() => {
    window.location = this.href;
  }, 650);
});
