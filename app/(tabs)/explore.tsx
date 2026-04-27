import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default function CompeteScreen() {
  const competeHTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  overflow:hidden; width:100vw; height:100vh;
  user-select:none; -webkit-user-select:none;
  -webkit-tap-highlight-color:transparent;
  font-family:sans-serif; touch-action:none;
}
#sky {
  position:absolute; inset:0;
  background:linear-gradient(180deg,#5ba8d8 0%,#87ceeb 55%,#b8e4f8 100%);
}
#ground {
  position:absolute; bottom:0; left:0; right:0; height:22%;
  background:linear-gradient(180deg,#6abf38 0%,#3d8018 100%);
  border-radius:55% 55% 0 0/22% 22% 0 0; z-index:5;
}
#ground::before {
  content:''; position:absolute; top:0; left:0; right:0; height:14px;
  background:repeating-linear-gradient(90deg,transparent 0,transparent 5px,rgba(100,190,50,.5) 5px,rgba(100,190,50,.5) 7px);
  border-radius:55% 55% 0 0/100% 100% 0 0;
}
.cloud { position:absolute; background:rgba(255,255,255,.88); border-radius:60px; pointer-events:none; z-index:2; }
.cloud::before,.cloud::after { content:''; position:absolute; background:rgba(255,255,255,.88); border-radius:50%; }
.c1{width:90px;height:24px;top:10%;animation:drift 22s linear infinite;}
.c1::before{width:36px;height:36px;top:-18px;left:14px;}
.c1::after{width:26px;height:26px;top:-13px;left:46px;}
.c2{width:70px;height:20px;top:20%;animation:drift 30s linear infinite 8s;}
.c2::before{width:30px;height:30px;top:-15px;left:10px;}
.c2::after{width:22px;height:22px;top:-10px;left:38px;}
@keyframes drift{from{left:-160px}to{left:110vw}}
#player {
  position:absolute; font-size:44px; line-height:1;
  width:52px; text-align:center; z-index:10;
  pointer-events:none; transition:transform .07s linear;
}
.pipe {
  position:absolute;
  background:linear-gradient(90deg,#5cb828 0%,#2a7008 65%,#1a5005 100%);
  border:2.5px solid #1a5005; z-index:8;
}
.pipe-cap {
  position:absolute; left:-7px; right:-7px; height:22px;
  background:linear-gradient(90deg,#70d030,#348010);
  border:2.5px solid #1a5005; border-radius:5px; z-index:9;
}
#score {
  position:absolute; top:22px; left:50%; transform:translateX(-50%);
  font-size:40px; font-weight:900; color:white;
  text-shadow:0 3px 10px rgba(0,0,0,.5); z-index:20; pointer-events:none;
}
#best {
  position:absolute; top:70px; left:50%; transform:translateX(-50%);
  font-size:15px; font-weight:700; color:rgba(255,255,255,.85);
  text-shadow:0 1px 4px rgba(0,0,0,.4); z-index:20;
  pointer-events:none; white-space:nowrap;
}
#message {
  position:absolute; top:38%; left:50%; transform:translate(-50%,-50%);
  background:rgba(0,0,0,.52); backdrop-filter:blur(8px);
  color:white; text-align:center; padding:22px 32px; border-radius:22px;
  z-index:30; line-height:1.7; pointer-events:none;
}
#message .title { font-size:26px; font-weight:900; }
#message .sub   { font-size:15px; color:rgba(255,255,255,.8); }
#message .tap   { font-size:13px; margin-top:10px; color:rgba(255,255,255,.65); }
#medal { font-size:36px; display:block; margin-bottom:4px; }
</style>
</head>
<body>
<div id="sky"></div>
<div class="cloud c1"></div>
<div class="cloud c2"></div>
<div id="ground"></div>
<div id="player">🐢</div>
<div id="score">0</div>
<div id="best"></div>
<div id="message">
  <span id="medal"></span>
  <div class="title">Flappy Turtle</div>
  <div class="sub">Tap to flap &middot; Dodge the pipes!</div>
  <div class="tap">Tap anywhere to start</div>
</div>

<script>
const player  = document.getElementById('player');
const scoreEl = document.getElementById('score');
const bestEl  = document.getElementById('best');
const msgEl   = document.getElementById('message');
const medalEl = document.getElementById('medal');

const GRAVITY  = 0.50, FLAP_V = -9.0;
const PIPE_W   = 56,   PIPE_GAP = 145;
const PIPE_SPD = 2.8,  PIPE_INT = 92;

let running = false, started = false;
let pY, pVY, score, pipes, frameN, raf;
let best = parseInt(localStorage.getItem('flappyBest') || '0', 10);

function getW(){ return Math.max(280, window.innerWidth || 360); }
function getH(){ return Math.max(500, window.innerHeight || 667); }
function groundY(){ return getH() * 0.78; }
function playerLeft(){ return Math.round(getW() * 0.20); }

function updateBest(){
  if(best > 0) bestEl.textContent = '🏆 Best: ' + best;
}
updateBest();

function spawnPipe(){
  const gY = groundY();
  const gapTop = 70 + Math.random() * (gY - 70 - PIPE_GAP - 60);
  const g = document.createElement('div');
  g.style.cssText = 'position:absolute;left:' + getW() + 'px;top:0;width:' + PIPE_W + 'px;height:100%;pointer-events:none;';

  const top = document.createElement('div');
  top.className = 'pipe';
  top.style.cssText = 'left:0;top:0;right:0;height:' + gapTop + 'px;';
  const tc = document.createElement('div'); tc.className = 'pipe-cap'; tc.style.bottom = '0';
  top.appendChild(tc);

  const bot = document.createElement('div');
  bot.className = 'pipe';
  bot.style.cssText = 'left:0;right:0;top:' + (gapTop + PIPE_GAP) + 'px;bottom:0;';
  const bc = document.createElement('div'); bc.className = 'pipe-cap'; bc.style.top = '0';
  bot.appendChild(bc);

  g.appendChild(top); g.appendChild(bot);
  g.dataset.x = getW(); g.dataset.gapTop = gapTop; g.dataset.scored = '0';
  document.body.appendChild(g);
  pipes.push(g);
}

function gameLoop(){
  if(!running) return;
  frameN++;
  pVY += GRAVITY; pY += pVY;
  const tilt = Math.max(-28, Math.min(50, pVY * 3.0));
  player.style.top = pY + 'px';
  player.style.transform = 'rotate(' + tilt + 'deg)';
  if(frameN % PIPE_INT === 0) spawnPipe();

  const pL = playerLeft() + 5, pR = playerLeft() + 44;
  const pT = pY + 6, pB = pY + 38;
  for(let i = pipes.length - 1; i >= 0; i--){
    const p = pipes[i];
    let px = parseFloat(p.dataset.x) - PIPE_SPD;
    p.dataset.x = px; p.style.left = px + 'px';
    if(p.dataset.scored === '0' && px + PIPE_W < pL){
      p.dataset.scored = '1'; score++; scoreEl.textContent = score;
    }
    const gt = parseFloat(p.dataset.gapTop);
    if(pR > px && pL < px + PIPE_W && (pT < gt || pB > gt + PIPE_GAP)){ die(); return; }
    if(px < -PIPE_W - 10){ p.remove(); pipes.splice(i, 1); }
  }
  if(pY <= 0){ pY = 0; pVY = 1; }
  if(pY + 40 >= groundY()){ die(); return; }
  raf = requestAnimationFrame(gameLoop);
}

function startGame(){
  pipes.forEach(p => p.remove());
  pY = getH() * 0.38; pVY = 0; score = 0; pipes = []; frameN = 0;
  scoreEl.textContent = '0';
  player.style.top = pY + 'px';
  player.style.left = playerLeft() + 'px';
  player.style.transform = '';
  msgEl.style.display = 'none';
  running = true; started = true;
  cancelAnimationFrame(raf);
  gameLoop();
}

function die(){
  running = false; cancelAnimationFrame(raf);
  if(score > best){ best = score; localStorage.setItem('flappyBest', best); }
  updateBest();
  const medal = score >= 30 ? '🥇' : score >= 15 ? '🥈' : score >= 5 ? '🥉' : '';
  medalEl.textContent = medal;
  msgEl.querySelector('.title').textContent = score > 0 ? 'Score: ' + score : 'Game Over';
  msgEl.querySelector('.sub').textContent   = best > 0 ? '🏆 Best: ' + best : 'Better luck next time!';
  msgEl.querySelector('.tap').textContent   = 'Tap to play again';
  msgEl.style.display = 'block';
}

document.addEventListener('pointerdown', e => {
  e.preventDefault();
  if(!started || !running) startGame();
  else { pVY = FLAP_V; }
});

setTimeout(() => {
  player.style.left = playerLeft() + 'px';
  player.style.top  = (getH() * 0.38) + 'px';
}, 60);
</script>
</body>
</html>`;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          srcDoc={competeHTML}
          style={{ width: "100vw", height: "100vh", border: "none" }}
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{ html: competeHTML }}
          style={{ flex: 1 }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
