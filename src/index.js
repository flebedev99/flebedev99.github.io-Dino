import "./styles.css";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fullbtn = document.getElementById("fullbtn");

let plrX = 20;
let plrY = 50;
let plrw = 20;
let plrh = 20;
let landwidth = 5;
let cactiX = 300;
let cactiY = 90;
let cactiW = 20;
let cactiH = 30;
let gamespeed = 60;
let gameover = false;
let Yvelocity = 0;
let score = 0;

//gameloop
function startgame() {
  clearscreen();
  drawplayer();
  drawland();
  drawcacti();
  updateobstacles();
  checkcollision();
  loopcacti();
  plrpos();
  drawscore();
  if (gameover === true) {
    return;
  }
  score = score + 0.1;
  setTimeout(startgame, 1000 / gamespeed);
}

//functions
function drawscore() {
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + Math.floor(score), 200, 10);
}
function drawplayer() {
  ctx.fillStyle = "black";
  ctx.fillRect(plrX, plrY, plrw, plrh);
}
function clearscreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawland() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, 98 + plrh + landwidth);
  ctx.lineTo(canvas.width, 98 + plrh + landwidth);
  ctx.lineWidth = landwidth;
  ctx.stroke();
}
function updateobstacles() {
  cactiX--;
}
function drawcacti() {
  ctx.fillStyle = "green";
  ctx.fillRect(cactiX, cactiY, cactiW, cactiH);
}
function checkcollision() {
  if (plrX + plrw >= cactiX && plrY + plrh >= cactiY) {
    if (cactiX - cactiW === plrX) {
      gameover = true;
    }
  }
}
function loopcacti() {
  if (cactiX <= -90) {
    cactiX = 300;
  }
}
function plrpos() {
  if (plrY > 100) {
    plrY = 100;
    Yvelocity = 0;
  }
  if (plrY < 0) {
    plrY = 0;
    Yvelocity = 0;
  }
  plrY = plrY + Yvelocity;
  Yvelocity = Yvelocity + 0.2;
  if (Yvelocity > 2) {
    Yvelocity = 2;
  }
  if (Yvelocity < -10) {
    Yvelocity = -10;
  }
}

//input
document.addEventListener("keydown", keyPress);

function keyPress(key) {
  if (key.keyCode === 32) {
    Yvelocity = -6;
  }
}

fullbtn.onclick = function fullscreen() {
  canvas.requestFullscreen();
};
startgame();
