import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import { GameState } from "../../constants/game-state";

function buildFlappyHTML(stage: number): string {
  const STAGE_NAMES: Record<number, string> = { 1: "Hatchling", 2: "Explorer", 3: "Elder" };
  const stageName = STAGE_NAMES[stage] ?? "Hatchling";
  const gapSize   = stage === 3 ? 172 : stage === 2 ? 155 : 138;
  const flapVel   = stage === 3 ? -0.51 : stage === 2 ? -0.49 : -0.47;

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  overflow:hidden; width:100vw; height:100vh;
  user-select:none; -webkit-user-select:none;
  -webkit-tap-highlight-color:transparent;
}
#scene { position:relative; width:100vw; height:100vh; overflow:hidden; }

/* SKY */
.sky { position:absolute; inset:0; transition:background 2s ease; }

/* CLOUDS */
.cloud { position:absolute; background:rgba(255,255,255,.88); border-radius:60px; z-index:3; }
.cloud::before,.cloud::after { content:''; position:absolute; background:rgba(255,255,255,.88); border-radius:50%; }
.fc1 { width:110px; height:30px; top:12%; animation:fdrift 22s linear infinite; }
.fc1::before { width:44px; height:44px; top:-22px; left:18px; }
.fc1::after  { width:32px; height:32px; top:-16px; left:56px; }
.fc2 { width:80px; height:24px; top:24%; animation:fdrift 30s linear infinite 9s; }
.fc2::before { width:36px; height:36px; top:-18px; left:12px; }
.fc2::after  { width:26px; height:26px; top:-12px; left:46px; }
.fc3 { width:130px; height:36px; top:7%; animation:fdrift 26s linear infinite 16s; }
.fc3::before { width:54px; height:54px; top:-28px; left:24px; }
.fc3::after  { width:40px; height:40px; top:-20px; left:72px; }
@keyframes fdrift { from{left:-160px} to{left:110vw} }

/* GROUND */
.ground {
  position:absolute; bottom:0; width:100%; height:18%;
  background:linear-gradient(180deg,#6abf38 0%,#52a028 30%,#3d8018 100%);
  border-radius:55% 55% 0 0/22% 22% 0 0;
  z-index:10;
}
.ground::before {
  content:''; position:absolute; top:0; left:0; right:0; height:18px;
  background:repeating-linear-gradient(90deg,transparent 0,transparent 5px,rgba(100,190,50,.5) 5px,rgba(100,190,50,.5) 7px);
  border-radius:55% 55% 0 0/100% 100% 0 0;
}
.ground::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(0deg,rgba(0,0,0,.18) 0%,transparent 55%);
}

/* PIPES — tree trunks */
.pipe { position:absolute; width:58px; z-index:8; }
.pipe-body {
  position:absolute; left:0; right:0;
  background:linear-gradient(90deg,#3a2010 0%,#6a4828 22%,#9a6a3a 48%,#6a4828 76%,#3a2010 100%);
  border-left:2.5px solid #231208;
  border-right:2.5px solid #231208;
}
.pipe-top .pipe-body { top:0; bottom:24px; }
.pipe-bot .pipe-body { top:24px; bottom:0; }
.pipe-cap {
  position:absolute; left:-6px; right:-6px; height:24px;
  border:2.5px solid #162008; border-radius:6px;
}
.pipe-top .pipe-cap {
  bottom:0;
  background:linear-gradient(180deg,#3a5010 0%,#6a8c1c 45%,#2e3e08 100%);
}
.pipe-bot .pipe-cap {
  top:0;
  background:linear-gradient(180deg,#2e3e08 0%,#6a8c1c 55%,#3a5010 100%);
}

/* TURTLE */
#turtle {
  position:absolute; width:72px; height:54px;
  left:22%;
  filter:drop-shadow(0 4px 5px rgba(0,0,0,.3));
  will-change:top,transform;
  z-index:9;
  transform-origin:36px 27px;
}
.t-shadow { position:absolute; bottom:-8px; left:5px; width:62px; height:11px; background:radial-gradient(ellipse,rgba(0,0,0,.28) 0%,transparent 68%); border-radius:50%; }
.t-body   { position:absolute; width:66px; height:43px; top:7px; left:3px; background:#388038; border-radius:33px; transition:background 1.2s; }
.t-shell  {
  position:absolute; width:58px; height:40px; top:5px; left:7px; border-radius:29px;
  background:radial-gradient(ellipse at 38% 32%,#5ecf5e 0%,#2f9930 50%,#1a6620 100%);
  border:2px solid #0e3e0e; overflow:hidden;
  box-shadow:inset -4px -6px 12px rgba(0,0,0,.38),inset 2px 2px 7px rgba(255,255,255,.18);
  transition:background 1.2s,box-shadow 1.2s;
}
.t-shell::before {
  content:''; position:absolute; inset:0; border-radius:29px;
  background-image:
    radial-gradient(circle at 26% 38%,rgba(0,0,0,.26) 5px,transparent 5px),
    radial-gradient(circle at 50% 22%,rgba(0,0,0,.26) 5px,transparent 5px),
    radial-gradient(circle at 74% 38%,rgba(0,0,0,.26) 5px,transparent 5px),
    radial-gradient(circle at 38% 64%,rgba(0,0,0,.24) 5px,transparent 5px),
    radial-gradient(circle at 62% 64%,rgba(0,0,0,.24) 5px,transparent 5px);
}
.t-shell::after { content:''; position:absolute; inset:0; background:linear-gradient(130deg,rgba(255,255,255,.22) 0%,transparent 48%); border-radius:29px; }
.t-tail { position:absolute; left:-6px; top:22px; width:10px; height:8px; background:radial-gradient(ellipse,#4ab04a,#257025); border-radius:4px 2px 2px 4px; border:1.5px solid #1a5e1a; transition:background 1.2s; }
.t-head { position:absolute; right:-13px; top:13px; width:22px; height:20px; background:radial-gradient(ellipse at 38% 32%,#60cc60,#2d7d2d); border-radius:11px 11px 8px 8px; border:1.5px solid #1a5a1a; box-shadow:inset -2px -2px 4px rgba(0,0,0,.28); transition:background 1.2s; }
.t-eye  { position:absolute; top:4px; right:3px; width:6px; height:6px; background:#0e1a0e; border-radius:50%; box-shadow:inset 1px 1px 2px rgba(255,255,255,.55); }
.t-eye::after { content:''; position:absolute; width:2px; height:2px; background:white; border-radius:50%; top:1px; left:1px; }
.t-leg { position:absolute; width:12px; height:14px; background:radial-gradient(ellipse at 40% 35%,#52bf52,#226622); border-radius:6px; border:1.5px solid #1a5a1a; box-shadow:inset -1px -2px 3px rgba(0,0,0,.25); transition:background 1.2s; }
.t-leg.fl { top:2px; left:6px;  transform-origin:50% 0%; }
.t-leg.fr { top:2px; right:6px; transform-origin:50% 0%; }
.t-leg.bl { bottom:2px; left:6px;  transform-origin:50% 100%; }
.t-leg.br { bottom:2px; right:6px; transform-origin:50% 100%; }

/* STAGE 2 */
.stage2 .t-body  { background:#2a6828; }
.stage2 .t-shell { background:radial-gradient(ellipse at 38% 32%,#48b448 0%,#226822 50%,#104010 100%); border-color:#072207; }
.stage2 .t-head  { background:radial-gradient(ellipse at 38% 32%,#48b448,#206020); }
.stage2 .t-tail  { background:radial-gradient(ellipse,#389838,#1a5018); }
.stage2 .t-leg   { background:radial-gradient(ellipse at 40% 35%,#3ea83e,#185818); }

/* STAGE 3 */
.stage3 .t-body  { background:#1c481c; }
.stage3 .t-shell {
  background:radial-gradient(ellipse at 38% 32%,#4a8a20 0%,#1e5a10 45%,#082808 100%);
  border-color:#041404; border-width:2.5px;
  box-shadow:inset -4px -6px 12px rgba(0,0,0,.52),inset 2px 2px 6px rgba(255,255,255,.10),
             0 0 18px rgba(200,170,40,.58),0 0 6px rgba(255,220,80,.32);
}
.stage3 .t-shell::before {
  background-image:
    radial-gradient(circle at 50% 50%,rgba(255,235,100,.88) 2.5px,transparent 2.5px),
    radial-gradient(ellipse at 50% 50%,transparent 16%,rgba(255,215,80,.44) 18%,rgba(255,215,80,.44) 20%,transparent 22%),
    radial-gradient(ellipse at 50% 50%,transparent 34%,rgba(255,190,60,.34) 36%,rgba(255,190,60,.34) 38%,transparent 40%),
    repeating-conic-gradient(rgba(255,220,80,0) 0deg 11deg,rgba(255,220,80,.35) 11deg 15deg,rgba(255,220,80,0) 15deg 30deg);
}
.stage3 .t-head  { background:radial-gradient(ellipse at 38% 32%,#389838,#184e18); }
.stage3 .t-tail  { background:radial-gradient(ellipse,#2c8028,#124012); }
.stage3 .t-leg   { background:radial-gradient(ellipse at 40% 35%,#2e9828,#104010); }
#turtle.stage3   { filter:drop-shadow(0 0 14px rgba(210,175,40,.68)) drop-shadow(0 4px 5px rgba(0,0,0,.28)); }

/* FLAP ANIMATION */
.flapping .t-leg.fl,.flapping .t-leg.bl { animation:flapOut .22s ease-out; }
.flapping .t-leg.fr,.flapping .t-leg.br { animation:flapIn  .22s ease-out; }
@keyframes flapOut { 0%{transform:rotate(0)} 35%{transform:rotate(-38deg)} 100%{transform:rotate(0)} }
@keyframes flapIn  { 0%{transform:rotate(0)} 35%{transform:rotate( 38deg)} 100%{transform:rotate(0)} }

/* DEATH SPIN */
#turtle.dead { animation:dieSpin .45s ease-out forwards; }
@keyframes dieSpin {
  0%  { }
  40% { transform:rotate(80deg) scale(.92); }
  100%{ transform:rotate(110deg) translateY(12px) scale(.88); }
}

/* SCORE */
#score-display {
  position:absolute; top:7%; width:100%; text-align:center;
  font-family:sans-serif; font-size:56px; font-weight:900; color:white;
  text-shadow:0 0 12px rgba(0,0,0,.35),2px 3px 6px rgba(0,0,0,.65);
  pointer-events:none; z-index:20;
  transition:transform .08s;
}
#score-display.bump { animation:scoreBump .18s cubic-bezier(.34,1.56,.64,1); }
@keyframes scoreBump { 0%{transform:scale(1)} 45%{transform:scale(1.3)} 100%{transform:scale(1)} }

/* STAGE BADGE */
#stage-badge {
  position:absolute; top:14px; right:14px;
  background:rgba(0,0,0,.46); backdrop-filter:blur(6px);
  color:white; font-family:sans-serif; font-size:13px; font-weight:700;
  padding:5px 12px; border-radius:18px; z-index:30; pointer-events:none;
}

/* OVERLAY */
#overlay {
  position:absolute; inset:0; z-index:25;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
  background:rgba(0,0,0,.34);
}
#overlay.hidden { display:none; }

.ov-title {
  font-family:sans-serif; font-size:36px; font-weight:900; color:white;
  text-shadow:0 0 22px rgba(0,0,0,.5),2px 3px 6px rgba(0,0,0,.7);
  margin-bottom:4px;
}
.ov-score {
  font-family:sans-serif; font-size:26px; font-weight:800; color:#ffe566;
  text-shadow:0 0 14px rgba(255,200,0,.7),1px 2px 4px rgba(0,0,0,.6);
}
.ov-best {
  font-family:sans-serif; font-size:16px; color:rgba(255,255,255,.85);
  text-shadow:1px 1px 3px rgba(0,0,0,.5);
}
.ov-stage {
  font-family:sans-serif; font-size:14px; color:rgba(255,255,255,.7);
  text-shadow:1px 1px 3px rgba(0,0,0,.5);
  margin-bottom:6px;
}
.ov-tap {
  font-family:sans-serif; font-size:18px; color:white;
  background:rgba(255,255,255,.18); padding:11px 28px; border-radius:26px;
  margin-top:8px;
  animation:tapPulse 1.5s ease-in-out infinite;
}
@keyframes tapPulse { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.06);opacity:1} }

/* FLASH on score */
#flash { position:absolute; inset:0; background:white; opacity:0; pointer-events:none; z-index:22; }
#flash.pop { animation:flashPop .22s ease-out forwards; }
@keyframes flashPop { 0%{opacity:.45} 100%{opacity:0} }
</style>
</head>
<body>
<div id="scene">
  <div class="sky" id="sky"></div>
  <div class="cloud fc1"></div>
  <div class="cloud fc2"></div>
  <div class="cloud fc3"></div>

  <div id="pipes"></div>

  <div id="turtle">
    <div class="t-shadow"></div>
    <div class="t-body"></div>
    <div class="t-shell"></div>
    <div class="t-tail"></div>
    <div class="t-head"><div class="t-eye"></div></div>
    <div class="t-leg fl"></div>
    <div class="t-leg fr"></div>
    <div class="t-leg bl"></div>
    <div class="t-leg br"></div>
  </div>

  <div class="ground"></div>

  <div id="score-display">0</div>
  <div id="stage-badge">&#x1F422; ${stageName}</div>
  <div id="flash"></div>

  <div id="overlay">
    <div class="ov-title">Flappy Turtle</div>
    <div class="ov-stage" id="ov-stage">Playing as ${stageName}</div>
    <div class="ov-score" id="ov-score" style="display:none"></div>
    <div class="ov-best"  id="ov-best">Best: 0</div>
    <div class="ov-tap"   id="ov-tap">Tap to Play</div>
  </div>
</div>

<script>
/* ── Constants (injected per stage) ── */
const STAGE      = ${stage};
const STAGE_NAME = "${stageName}";
const GAP_SIZE   = ${gapSize};
const FLAP_VEL   = ${flapVel};

const GRAVITY       = 0.0022;
const MAX_FALL      = 0.56;
const PIPE_W        = 58;
const SPEED_INIT    = 0.13;
const SPEED_MAX     = 0.22;
const SPEED_RAMP    = 18000;
const INTERVAL_INIT = 1700;

/* ── DOM ── */
const scene     = document.getElementById('scene');
const skyEl     = document.getElementById('sky');
const turtleEl  = document.getElementById('turtle');
const scoreEl   = document.getElementById('score-display');
const pipesEl   = document.getElementById('pipes');
const overlay   = document.getElementById('overlay');
const ovScore   = document.getElementById('ov-score');
const ovBest    = document.getElementById('ov-best');
const ovTap     = document.getElementById('ov-tap');
const ovTitle   = document.querySelector('.ov-title');
const flashEl   = document.getElementById('flash');

turtleEl.classList.add('stage' + STAGE);

/* ── Sky (same time-of-day system as pet screen) ── */
function lerp(a,b,t){ return a+(b-a)*t; }
function hexToRgb(h){ return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; }
function lerpColor(h1,h2,t){ const [r1,g1,b1]=hexToRgb(h1),[r2,g2,b2]=hexToRgb(h2); return 'rgb('+Math.round(lerp(r1,r2,t))+','+Math.round(lerp(g1,g2,t))+','+Math.round(lerp(b1,b2,t))+')'; }
const SKY_KEYS=[
  {h:0, top:'#02041a',mid:'#06102e',bot:'#0e1e48'},
  {h:4, top:'#02041a',mid:'#06102e',bot:'#0e1e48'},
  {h:5, top:'#1a0840',mid:'#702060',bot:'#ff6535'},
  {h:6, top:'#283298',mid:'#d85a28',bot:'#ffb055'},
  {h:7, top:'#1565c0',mid:'#40a0f0',bot:'#9fd5f5'},
  {h:12,top:'#0e4fa8',mid:'#1e82e0',bot:'#80c8f8'},
  {h:17,top:'#1a207e',mid:'#5868c0',bot:'#ffb84d'},
  {h:18,top:'#1a1060',mid:'#c03820',bot:'#ff9500'},
  {h:19,top:'#0c0838',mid:'#901818',bot:'#e07800'},
  {h:20,top:'#06051e',mid:'#160828',bot:'#280e3a'},
  {h:21,top:'#02041a',mid:'#06102e',bot:'#0e1e48'},
  {h:24,top:'#02041a',mid:'#06102e',bot:'#0e1e48'},
];
function updateSky(){
  const now=new Date(), fh=now.getHours()+now.getMinutes()/60;
  const t=((fh%24)+24)%24;
  let prev=SKY_KEYS[0],next=SKY_KEYS[1];
  for(let i=0;i<SKY_KEYS.length-1;i++){
    if(t>=SKY_KEYS[i].h&&t<SKY_KEYS[i+1].h){prev=SKY_KEYS[i];next=SKY_KEYS[i+1];break;}
  }
  const frac=(next.h-prev.h)>0?(t-prev.h)/(next.h-prev.h):0;
  skyEl.style.background='linear-gradient(180deg,'+lerpColor(prev.top,next.top,frac)+' 0%,'+lerpColor(prev.mid,next.mid,frac)+' 34%,'+lerpColor(prev.bot,next.bot,frac)+' 65%,#c8ecb0 82%,#7bbf3e 100%)';
}
updateSky();
setInterval(updateSky, 60000);

/* ── High score ── */
let hiScore = 0;
try { hiScore = parseInt(localStorage.getItem('flappyHiScore') || '0', 10) || 0; } catch(e){}
ovBest.textContent = 'Best: ' + hiScore;

/* ── Game state ── */
const W = window.innerWidth;
const H = window.innerHeight;
const GROUND_TOP = H * 0.82;
const TURTLE_X   = W * 0.22;
const TURTLE_W   = 72;
const TURTLE_H   = 54;
const STAGE_SCALE= STAGE === 3 ? 1.28 : STAGE === 2 ? 1.10 : 1.0;

let mode       = 'waiting'; // waiting | playing | dead
let turtleY    = H * 0.44;
let velY       = 0;
let pipes      = [];
let score      = 0;
let speed      = SPEED_INIT;
let playTime   = 0;
let lastTime   = null;
let nextPipe   = INTERVAL_INIT;
let flapTimer  = null;
let inputLock  = false;

/* ── Helpers ── */
function setPos(){
  turtleEl.style.top = turtleY + 'px';
}

function setScore(s){
  score = s;
  scoreEl.textContent = s;
  scoreEl.classList.remove('bump');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('bump');
  flashEl.classList.remove('pop');
  void flashEl.offsetWidth;
  flashEl.classList.add('pop');
}

function getTurtleCX(){ return TURTLE_X + TURTLE_W * 0.5; }
function getTurtleCY(){ return turtleY  + TURTLE_H * 0.5; }

/* ── Sky update ── */

/* ── Spawn pipe ── */
function spawnPipe(){
  const minGC = 70  + GAP_SIZE * 0.5;
  const maxGC = GROUND_TOP - 70 - GAP_SIZE * 0.5;
  const gapCY = minGC + Math.random() * (maxGC - minGC);
  const topH  = gapCY - GAP_SIZE * 0.5;
  const botY  = gapCY + GAP_SIZE * 0.5;
  const botH  = GROUND_TOP - botY;
  const startX = W + 10;

  const topEl = document.createElement('div');
  topEl.className = 'pipe pipe-top';
  topEl.style.cssText = 'position:absolute;left:'+startX+'px;top:0;width:'+PIPE_W+'px;height:'+topH+'px;';
  topEl.innerHTML =
    '<div class="pipe-body" style="position:absolute;top:0;left:0;right:0;bottom:24px;"></div>'+
    '<div class="pipe-cap"  style="position:absolute;bottom:0;left:-6px;right:-6px;height:24px;"></div>';
  pipesEl.appendChild(topEl);

  const botEl = document.createElement('div');
  botEl.className = 'pipe pipe-bot';
  botEl.style.cssText = 'position:absolute;left:'+startX+'px;top:'+botY+'px;width:'+PIPE_W+'px;height:'+botH+'px;';
  botEl.innerHTML =
    '<div class="pipe-cap"  style="position:absolute;top:0;left:-6px;right:-6px;height:24px;"></div>'+
    '<div class="pipe-body" style="position:absolute;top:24px;left:0;right:0;bottom:0;"></div>';
  pipesEl.appendChild(botEl);

  pipes.push({ x: startX, topH, gapCY, scored: false, topEl, botEl });
}

function clearPipes(){
  pipes.forEach(p => { p.topEl.remove(); p.botEl.remove(); });
  pipes = [];
}

/* ── Flap ── */
function doFlap(){
  if(mode === 'dead'){
    if(!overlay.classList.contains('hidden')) startGame();
    return;
  }
  if(mode === 'waiting'){ startGame(); return; }
  velY = FLAP_VEL;
  turtleEl.classList.remove('flapping');
  void turtleEl.offsetWidth;
  turtleEl.classList.add('flapping');
  clearTimeout(flapTimer);
  flapTimer = setTimeout(() => turtleEl.classList.remove('flapping'), 240);
}

/* ── Start ── */
function startGame(){
  mode = 'playing';
  turtleY  = H * 0.44;
  velY     = FLAP_VEL;
  score    = 0;
  speed    = SPEED_INIT;
  playTime = 0;
  lastTime = null;
  nextPipe = 900;
  scoreEl.textContent = '0';
  clearPipes();
  overlay.classList.add('hidden');
  turtleEl.classList.remove('dead');
  turtleEl.classList.remove('flapping');
  void turtleEl.offsetWidth;
  turtleEl.classList.add('flapping');
  flapTimer = setTimeout(() => turtleEl.classList.remove('flapping'), 240);
}

/* ── Die ── */
function die(){
  mode = 'dead';
  turtleEl.classList.remove('flapping');
  turtleEl.classList.add('dead');

  if(score > hiScore){
    hiScore = score;
    try { localStorage.setItem('flappyHiScore', String(hiScore)); } catch(e){}
  }

  setTimeout(() => {
    const isNew = score > 0 && score >= hiScore;
    ovTitle.textContent  = isNew ? '&#x1F3C6; New Best!' : score >= 10 ? 'Amazing!' : 'Game Over';
    ovScore.style.display = 'block';
    ovScore.textContent  = 'Score: ' + score;
    ovBest.textContent   = 'Best: '  + hiScore;
    ovTap.textContent    = 'Tap to Play Again';
    overlay.classList.remove('hidden');
  }, 750);
}

/* ── Collision ── */
function checkHit(){
  const cx = getTurtleCX();
  const cy = getTurtleCY();
  const R  = 18; // forgiving radius
  const FUDGE = 6;

  if(turtleY + TURTLE_H * 0.9 >= GROUND_TOP) return true;
  if(turtleY <= -10) return true;

  for(const p of pipes){
    const pL = p.x + FUDGE;
    const pR = p.x + PIPE_W - FUDGE;
    if(cx + R < pL || cx - R > pR) continue;
    if(cy - R < p.topH  - FUDGE)              return true;
    if(cy + R > p.gapCY + GAP_SIZE*0.5 + FUDGE) return true;
  }
  return false;
}

/* ── Rotation ── */
function applyRotation(){
  const angle  = Math.max(-26, Math.min(72, velY * 88));
  turtleEl.style.transform = 'rotate('+angle+'deg) scale('+STAGE_SCALE+')';
}

/* ── Main Loop ── */
function loop(now){
  if(mode === 'waiting'){
    turtleY = H * 0.44 + Math.sin(now * 0.0018) * 14;
    setPos();
    turtleEl.style.transform = 'rotate('+Math.sin(now*0.0018)*5+'deg) scale('+STAGE_SCALE+')';
    requestAnimationFrame(loop);
    return;
  }

  if(mode === 'dead'){
    requestAnimationFrame(loop);
    return;
  }

  if(!lastTime){ lastTime = now; requestAnimationFrame(loop); return; }
  const dt = Math.min(now - lastTime, 32);
  lastTime = now;
  playTime += dt;

  // Ramp speed
  speed = SPEED_INIT + (SPEED_MAX - SPEED_INIT) * Math.min(1, playTime / SPEED_RAMP);

  // Physics
  velY = Math.min(MAX_FALL, velY + GRAVITY * dt);
  turtleY += velY * dt;

  setPos();
  applyRotation();

  // Pipes
  nextPipe -= dt;
  if(nextPipe <= 0){
    spawnPipe();
    nextPipe = Math.max(900, INTERVAL_INIT * (SPEED_INIT / speed));
  }

  for(const p of pipes){
    p.x -= speed * dt;
    p.topEl.style.left = p.x + 'px';
    p.botEl.style.left = p.x + 'px';
    if(!p.scored && p.x + PIPE_W < TURTLE_X){
      p.scored = true;
      setScore(score + 1);
    }
  }

  pipes = pipes.filter(p => {
    if(p.x + PIPE_W < -10){ p.topEl.remove(); p.botEl.remove(); return false; }
    return true;
  });

  if(checkHit()) die();

  requestAnimationFrame(loop);
}

/* ── Input ── */
document.addEventListener('pointerdown', () => {
  if(inputLock) return;
  doFlap();
});
document.addEventListener('keydown', e => {
  if(e.code === 'Space' || e.code === 'ArrowUp') doFlap();
});

/* ── Boot ── */
setPos();
requestAnimationFrame(loop);
</script>
</body>
</html>`;
}

export default function CompeteScreen() {
  const [stage, setStage] = useState(GameState.turtleStage);

  useFocusEffect(
    React.useCallback(() => {
      setStage(GameState.turtleStage);
    }, [])
  );

  const html = buildFlappyHTML(stage);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          srcDoc={html}
          style={{ width: "100vw", height: "100vh", border: "none" } as React.CSSProperties}
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
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
