import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { GameState } from "../../constants/game-state";

export default function HomeScreen() {
  const petHTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  overflow: hidden; width: 100vw; height: 100vh;
  user-select: none; -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
#scene { position: relative; width: 100vw; height: 100vh; overflow: hidden; }

/* SKY — JS-controlled gradient */
.sky { position: absolute; inset: 0; transition: background 2s ease; }

/* CELESTIAL */
#sun {
  position: absolute; width: 56px; height: 56px; border-radius: 50%;
  background: radial-gradient(circle at 40% 38%, #fffbe0 20%, #ffe566 60%, #f5c200 100%);
  box-shadow: 0 0 28px 12px rgba(255,220,60,.35), 0 0 60px 30px rgba(255,200,0,.12);
  transition: opacity 1.2s ease; z-index: 2;
}
#moon {
  position: absolute; width: 44px; height: 44px; border-radius: 50%;
  background: radial-gradient(circle at 38% 35%, #fffde8 0%, #e8e0c8 60%, #c8c0a0 100%);
  box-shadow: 0 0 18px 6px rgba(220,210,180,.3);
  transition: opacity 1.2s ease; z-index: 2;
}
.star {
  position: absolute; background: white; border-radius: 50%;
  transition: opacity 1.8s ease; z-index: 2; pointer-events: none;
}

/* CLOUDS */
.cloud { position: absolute; background: rgba(255,255,255,.88); border-radius: 60px; z-index: 3; }
.cloud::before, .cloud::after {
  content: ''; position: absolute;
  background: rgba(255,255,255,.88); border-radius: 50%;
}
.c1{width:110px;height:30px;top:13%;left:-120px;animation:drift 24s linear infinite;}
.c1::before{width:44px;height:44px;top:-22px;left:18px;}
.c1::after{width:32px;height:32px;top:-16px;left:56px;}
.c2{width:80px;height:24px;top:20%;left:-90px;animation:drift 32s linear infinite 9s;}
.c2::before{width:36px;height:36px;top:-18px;left:12px;}
.c2::after{width:26px;height:26px;top:-12px;left:46px;}
.c3{width:130px;height:36px;top:7%;left:-140px;animation:drift 27s linear infinite 16s;}
.c3::before{width:54px;height:54px;top:-28px;left:24px;}
.c3::after{width:40px;height:40px;top:-20px;left:72px;}
@keyframes drift{from{left:-160px}to{left:110vw}}

#trees{position:absolute;bottom:20%;width:100%;height:90px;z-index:4;}
.tree{position:absolute;bottom:0;}
.tree .crown{position:absolute;left:50%;transform:translateX(-50%);border-radius:50%;}
.tree .trunk{position:absolute;left:50%;transform:translateX(-50%);bottom:0;width:7px;background:#4a3020;border-radius:2px;}
#bushes{position:absolute;bottom:19%;width:100%;z-index:4;}
.bush{position:absolute;bottom:0;border-radius:60% 60% 40% 40%;}
.ground{
  position:absolute;bottom:0;width:100%;height:21%;
  background:linear-gradient(180deg,#6abf38 0%,#52a028 30%,#3d8018 100%);
  border-radius:55% 55% 0 0/22% 22% 0 0;
  z-index:4;
}
.ground::before{
  content:'';position:absolute;top:0;left:0;right:0;height:18px;
  background:repeating-linear-gradient(90deg,transparent 0,transparent 5px,rgba(100,190,50,.5) 5px,rgba(100,190,50,.5) 7px);
  border-radius:55% 55% 0 0/100% 100% 0 0;
}
.ground::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(0deg,rgba(0,0,0,.18) 0%,transparent 55%);
}

/* ── TURTLE BASE ── */
#turtle{
  position:absolute;width:96px;height:72px;bottom:21%;
  transform-origin:48px 72px;
  filter:drop-shadow(0 6px 5px rgba(0,0,0,.28));
  will-change:left,transform;
  z-index:10;
}
.t-shadow{
  position:absolute;bottom:-10px;left:8px;width:80px;height:14px;
  background:radial-gradient(ellipse,rgba(0,0,0,.32) 0%,transparent 68%);
  border-radius:50%;
}
.t-body{
  position:absolute;width:88px;height:58px;top:10px;left:4px;
  background:#388038;border-radius:44px;
  transition:background 1.2s;
}
.t-shell{
  position:absolute;width:78px;height:54px;top:6px;left:9px;border-radius:39px;
  background:radial-gradient(ellipse at 38% 32%,#5ecf5e 0%,#2f9930 50%,#1a6620 100%);
  border:2.5px solid #0e3e0e;overflow:hidden;
  box-shadow:inset -5px -7px 14px rgba(0,0,0,.38),inset 3px 3px 8px rgba(255,255,255,.18);
  transition:background 1.2s, box-shadow 1.2s;
}
/* Stage 1 shell pattern — simple dots */
.t-shell::before{
  content:'';position:absolute;inset:0;border-radius:39px;
  background-image:
    radial-gradient(circle at 26% 38%,rgba(0,0,0,.26) 7px,transparent 7px),
    radial-gradient(circle at 50% 22%,rgba(0,0,0,.26) 7px,transparent 7px),
    radial-gradient(circle at 74% 38%,rgba(0,0,0,.26) 7px,transparent 7px),
    radial-gradient(circle at 38% 62%,rgba(0,0,0,.24) 7px,transparent 7px),
    radial-gradient(circle at 62% 62%,rgba(0,0,0,.24) 7px,transparent 7px),
    radial-gradient(circle at 50% 82%,rgba(0,0,0,.18) 6px,transparent 6px);
}
.t-shell::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(130deg,rgba(255,255,255,.22) 0%,transparent 48%);
  border-radius:39px;
}
.t-tail{
  position:absolute;left:-9px;top:30px;width:14px;height:11px;
  background:radial-gradient(ellipse,#4ab04a,#257025);
  border-radius:5px 2px 2px 5px;border:1.5px solid #1a5e1a;
  transition:background 1.2s;
}
.t-head{
  position:absolute;right:-18px;top:17px;width:30px;height:27px;
  background:radial-gradient(ellipse at 38% 32%,#60cc60,#2d7d2d);
  border-radius:15px 15px 11px 11px;
  border:2px solid #1a5a1a;box-shadow:inset -2px -2px 5px rgba(0,0,0,.28);
  overflow:visible;
  transition:background 1.2s;
}
.t-eye{
  position:absolute;top:6px;right:5px;width:8px;height:8px;
  background:#0e1a0e;border-radius:50%;
  box-shadow:inset 1px 1px 2px rgba(255,255,255,.55);
}
.t-eye::after{
  content:'';position:absolute;width:2.5px;height:2.5px;
  background:white;border-radius:50%;top:1.5px;left:1.5px;
}
/* Wise beard — stage 3 only */
.t-beard{
  position:absolute;bottom:-5px;left:2px;
  width:18px;height:9px;
  background:radial-gradient(ellipse,#d8d090,#a8987a);
  border-radius:4px 4px 8px 8px;
  display:none;
}
.t-nostrils{position:absolute;bottom:5px;right:6px;display:flex;gap:3px;}
.t-nostril{width:2.5px;height:2.5px;background:#0a2e0a;border-radius:50%;}
.t-leg{
  position:absolute;width:17px;height:19px;
  background:radial-gradient(ellipse at 40% 35%,#52bf52,#226622);
  border-radius:9px;border:1.5px solid #1a5a1a;
  box-shadow:inset -1px -2px 4px rgba(0,0,0,.25);
  transition:background 1.2s;
}
.t-leg.fl{top:3px;left:9px;transform-origin:50% 0%;}
.t-leg.fr{top:3px;right:9px;transform-origin:50% 0%;}
.t-leg.bl{bottom:3px;left:9px;transform-origin:50% 100%;}
.t-leg.br{bottom:3px;right:9px;transform-origin:50% 100%;}

/* ── STAGE 2 — Explorer: darker, hex pattern ── */
.stage2 .t-body { background: #2a6828; }
.stage2 .t-shell {
  background: radial-gradient(ellipse at 38% 32%,#48b448 0%,#226822 50%,#104010 100%);
  border-color: #072207;
}
.stage2 .t-shell::before {
  background-image:
    radial-gradient(circle at 50% 18%,rgba(0,0,0,.32) 5px,transparent 5px),
    radial-gradient(circle at 26% 34%,rgba(0,0,0,.32) 5px,transparent 5px),
    radial-gradient(circle at 74% 34%,rgba(0,0,0,.32) 5px,transparent 5px),
    radial-gradient(circle at 13% 57%,rgba(0,0,0,.28) 5px,transparent 5px),
    radial-gradient(circle at 38% 57%,rgba(0,0,0,.30) 5px,transparent 5px),
    radial-gradient(circle at 62% 57%,rgba(0,0,0,.30) 5px,transparent 5px),
    radial-gradient(circle at 87% 57%,rgba(0,0,0,.28) 5px,transparent 5px),
    radial-gradient(circle at 26% 80%,rgba(0,0,0,.24) 5px,transparent 5px),
    radial-gradient(circle at 74% 80%,rgba(0,0,0,.24) 5px,transparent 5px),
    radial-gradient(circle at 50% 92%,rgba(0,0,0,.20) 4px,transparent 4px);
}
.stage2 .t-head { background: radial-gradient(ellipse at 38% 32%,#48b448,#206020); }
.stage2 .t-tail { background: radial-gradient(ellipse,#389838,#1a5018); }
.stage2 .t-leg  { background: radial-gradient(ellipse at 40% 35%,#3ea83e,#185818); }

/* ── STAGE 3 — Elder: ancient gold mandala, dramatic glow ── */
.stage3 .t-body { background: #122012; }
.stage3 .t-shell {
  background: radial-gradient(ellipse at 38% 32%,#4e7a18 0%,#183e0c 40%,#030b03 100%);
  border-color: #c8a820; border-width: 3px;
  box-shadow: inset -5px -7px 16px rgba(0,0,0,.60),
              inset 3px 3px 8px rgba(255,255,255,.08),
              0 0 32px rgba(220,180,40,.80),
              0 0 12px rgba(255,220,80,.50);
  animation: elderShellPulse 2.8s ease-in-out infinite;
}
@keyframes elderShellPulse {
  0%,100% { box-shadow: inset -5px -7px 16px rgba(0,0,0,.60), inset 3px 3px 8px rgba(255,255,255,.08),
                         0 0 28px rgba(220,180,40,.75), 0 0 10px rgba(255,220,80,.45); }
  50%      { box-shadow: inset -5px -7px 16px rgba(0,0,0,.60), inset 3px 3px 8px rgba(255,255,255,.08),
                         0 0 46px rgba(255,210,40,.95), 0 0 18px rgba(255,180,0,.65); }
}
.stage3 .t-shell::before {
  background-image:
    /* Blazing center jewel */
    radial-gradient(circle at 50% 50%, rgba(255,255,160,1) 2px, rgba(255,220,40,1) 5px, transparent 5px),
    /* Ring 1 — bright inner halo */
    radial-gradient(ellipse at 50% 50%, transparent 12%, rgba(255,230,60,.92) 13%, rgba(255,205,40,.92) 17%, transparent 18%),
    /* Ring 2 */
    radial-gradient(ellipse at 50% 50%, transparent 26%, rgba(255,200,50,.72) 27%, rgba(220,165,20,.72) 31%, transparent 32%),
    /* Ring 3 */
    radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(200,160,30,.55) 43%, rgba(180,135,10,.55) 47%, transparent 48%),
    /* Ring 4 — outermost */
    radial-gradient(ellipse at 50% 50%, transparent 58%, rgba(170,135,20,.38) 59%, rgba(150,115,5,.38) 63%, transparent 64%),
    /* 12-point starburst spokes */
    repeating-conic-gradient(
      rgba(255,230,80,0) 0deg 6deg,
      rgba(255,215,60,.60) 6deg 9deg,
      rgba(255,230,80,0) 9deg 30deg
    );
}
.stage3 .t-shell::after {
  background: linear-gradient(130deg,rgba(255,245,130,.46) 0%,rgba(255,210,60,.15) 38%,transparent 58%);
  border-radius:39px;
}
.stage3 .t-head { background: radial-gradient(ellipse at 38% 32%,#3a9838,#174e17); overflow:visible; }
/* Crown marking */
.stage3 .t-head::before {
  content:'';
  position:absolute;top:-8px;left:50%;transform:translateX(-50%);
  width:18px;height:9px;
  background:linear-gradient(180deg,#ffe566 0%,#c89800 100%);
  clip-path:polygon(0% 100%,15% 42%,33% 85%,50% 0%,67% 85%,85% 42%,100% 100%);
  filter:drop-shadow(0 0 3px rgba(255,200,40,.8));
}
.stage3 .t-tail { background: radial-gradient(ellipse,#2c8028,#102e10); }
.stage3 .t-leg  { background: radial-gradient(ellipse at 40% 35%,#2e9828,#0e3e0e); }
.stage3 .t-beard { display: block; }
#turtle.stage3 {
  filter: drop-shadow(0 0 26px rgba(230,190,40,.85)) drop-shadow(0 0 9px rgba(255,210,80,.55)) drop-shadow(0 6px 5px rgba(0,0,0,.28));
}

/* Exclamation bubble */
.t-exclaim{
  position:absolute;top:-34px;right:-2px;
  width:20px;height:24px;background:#ff8c00;border-radius:5px;
  display:flex;align-items:center;justify-content:center;
  font-family:sans-serif;font-size:15px;font-weight:900;color:white;
  opacity:0;transform:scale(0);pointer-events:none;
  transition:opacity .15s, transform .15s cubic-bezier(.34,1.56,.64,1);
}
.t-exclaim::after{
  content:'';position:absolute;bottom:-5px;left:50%;
  transform:translateX(-50%);
  border:4px solid transparent;border-top-color:#ff8c00;
}
#turtle.noticed .t-exclaim{opacity:1;transform:scale(1);}

/* Walking */
.walking .t-leg.fl,.walking .t-leg.br{animation:legA .32s ease-in-out infinite alternate;}
.walking .t-leg.fr,.walking .t-leg.bl{animation:legB .32s ease-in-out infinite alternate;}
@keyframes legA{from{transform:rotate(-20deg)}to{transform:rotate(20deg)}}
@keyframes legB{from{transform:rotate(20deg)}to{transform:rotate(-20deg)}}
#turtle.walking{animation:bob .32s ease-in-out infinite alternate;}
@keyframes bob{from{bottom:21%}to{bottom:calc(21% + 2.5px)}}

/* Idle nod */
#turtle.idle-nod .t-head{animation:nod .5s ease-in-out 2;}
@keyframes nod{
  0%{transform:translateY(0)}30%{transform:translateY(-3px)}
  70%{transform:translateY(2px)}100%{transform:translateY(0)}
}

/* Eating */
#turtle.eating .t-head{animation:peck .19s ease-in-out 4;}
@keyframes peck{0%,100%{right:-18px}50%{right:-27px}}
#turtle.eating .t-shell{animation:munch .19s ease-in-out 4;}
@keyframes munch{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.93)}}

/* Yawn */
#turtle.yawning .t-head{animation:yawn .9s ease-in-out;}
@keyframes yawn{
  0%{transform:translateY(0) rotate(0)}
  35%{transform:translateY(-5px) rotate(-10deg)}
  75%{transform:translateY(-6px) rotate(-11deg)}
  100%{transform:translateY(0) rotate(0)}
}

/* Sleep */
#turtle.sleeping .t-leg.fl,
#turtle.sleeping .t-leg.fr{animation:none;transform:rotate(12deg);}
#turtle.sleeping .t-leg.bl,
#turtle.sleeping .t-leg.br{animation:none;transform:rotate(-8deg);}
#turtle.sleeping .t-head{animation:snoreHead 3.5s ease-in-out infinite;}
@keyframes snoreHead{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(3px) rotate(3deg)}}
#turtle.sleeping{animation:snoreBob 3.5s ease-in-out infinite;}
@keyframes snoreBob{0%,100%{bottom:21%}50%{bottom:calc(21% - 1.5px)}}

/* Zzz */
.zzz{
  position:absolute;pointer-events:none;
  font-family:sans-serif;color:rgba(160,200,255,.92);
  animation:zzzFloat 2.4s ease-out forwards;
  z-index:15;
}
@keyframes zzzFloat{
  0%{opacity:0;transform:translateY(0) scale(.6);}
  18%{opacity:1;transform:translateY(-10px) scale(1);}
  80%{opacity:.7;transform:translateY(-35px) scale(.88);}
  100%{opacity:0;transform:translateY(-55px) scale(.72);}
}

/* ── FOOD ── */
.food{
  position:absolute;bottom:21%;
  width:22px;height:20px;
  pointer-events:none;z-index:5;
  border-radius:50% 50% 50% 10%/60% 60% 40% 30%;
  background:radial-gradient(ellipse at 35% 32%,#c2f07a 0%,#56c420 55%,#2d8a0e 100%);
  border:1.5px solid #1c6008;
  transform:rotate(-22deg);
  animation:foodDrop .55s cubic-bezier(.34,1.56,.64,1) forwards;
}
.food::after{
  content:'';position:absolute;
  width:1.5px;height:13px;background:rgba(20,80,5,.55);
  top:3px;left:49%;border-radius:1px;
}
.food.landed{animation:foodPulse 1.5s ease-in-out infinite;}
.food.eaten{animation:foodEat .4s ease-in forwards !important;}
@keyframes foodDrop{
  0%  {opacity:0;transform:translateY(-110px) rotate(30deg) scale(0.5);}
  65% {opacity:1;transform:translateY(0) rotate(-28deg) scale(1.06);}
  82% {transform:translateY(-8px) rotate(-20deg) scale(1);}
  91% {transform:translateY(2px) rotate(-23deg) scale(.98);}
  100%{opacity:1;transform:translateY(0) rotate(-22deg) scale(1);}
}
@keyframes foodPulse{
  0%,100%{transform:rotate(-22deg) scale(1);}
  50%    {transform:rotate(-22deg) scale(1.14);}
}
@keyframes foodEat{
  0%  {transform:rotate(-22deg) scale(1);opacity:1;}
  40% {transform:rotate(-22deg) scale(1.3);opacity:.8;}
  100%{transform:rotate(-22deg) scale(0);opacity:0;}
}

/* ── CRUMBS ── */
.crumb{
  position:absolute;border-radius:50%;pointer-events:none;z-index:8;
  animation:crumbFly .7s ease-out forwards;
}
@keyframes crumbFly{
  0%  {transform:translate(0,0) scale(1);opacity:1;}
  100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0;}
}

/* ── HEART ── */
.heart{
  position:absolute;pointer-events:none;z-index:12;
  font-size:17px;line-height:1;color:#ff4488;
  animation:heartFloat 1.1s ease-out forwards;
}
@keyframes heartFloat{
  0%  {opacity:0;transform:translateY(0) scale(.4);}
  20% {opacity:1;transform:translateY(-6px) scale(1.1);}
  65% {opacity:1;transform:translateY(-22px) scale(1);}
  100%{opacity:0;transform:translateY(-36px) scale(.85);}
}

/* ── RIPPLE ── */
.ripple{
  position:absolute;border-radius:50%;z-index:8;
  background:rgba(255,255,255,.4);pointer-events:none;
  transform:translate(-50%,-50%);
  animation:rippleOut .6s ease-out forwards;
}
@keyframes rippleOut{from{width:0;height:0;opacity:.7}to{width:80px;height:80px;opacity:0}}

/* ── FOOTPRINTS ── */
.footprint{
  position:absolute;pointer-events:none;z-index:5;
  background:rgba(20,70,5,.28);border-radius:50%;
  animation:fadePrint 3.5s ease-out forwards;
}
@keyframes fadePrint{0%{opacity:1}60%{opacity:.35}100%{opacity:0}}

/* ── HINT ── */
#hint{
  position:absolute;bottom:28%;left:50%;transform:translateX(-50%);
  background:rgba(0,0,0,.42);color:white;
  padding:7px 16px;border-radius:22px;
  font-family:sans-serif;font-size:13px;letter-spacing:.3px;
  pointer-events:none;white-space:nowrap;z-index:20;
  animation:hintFade 4.5s ease-out forwards;
}
@keyframes hintFade{0%{opacity:0}10%{opacity:1}75%{opacity:1}100%{opacity:0}}

/* ── THROWN FOOD ── */
.food.flying{
  bottom:auto !important;
  animation:none !important;
  transform:rotate(-22deg) scale(1);
}
.food-shadow{
  position:absolute;
  width:28px;height:9px;border-radius:50%;
  background:radial-gradient(ellipse,rgba(0,0,0,.38) 0%,transparent 72%);
  pointer-events:none;z-index:4;
  transform:translate(-50%,-50%);
}
@keyframes foodLand{
  0%  {transform:rotate(-22deg) scale(1.18);}
  45% {transform:rotate(-22deg) scale(0.88);}
  75% {transform:rotate(-22deg) scale(1.05);}
  100%{transform:rotate(-22deg) scale(1);}
}

/* ── HELD FOOD ── */
.food.held{
  position:fixed !important;
  bottom:auto !important;
  animation:heldPulse .55s ease-in-out infinite alternate !important;
  transform:translate(-50%,-50%) rotate(-22deg) scale(1.25) !important;
  z-index:20;
  filter:drop-shadow(0 0 8px rgba(120,220,60,.60));
}
@keyframes heldPulse{
  from{transform:translate(-50%,-50%) rotate(-22deg) scale(1.2);
       filter:drop-shadow(0 0 5px rgba(120,220,60,.45));}
  to  {transform:translate(-50%,-50%) rotate(-22deg) scale(1.38);
       filter:drop-shadow(0 0 11px rgba(120,220,60,.88));}
}
@keyframes foodSettleDown{
  0%  {transform:rotate(-30deg) scale(1.28);}
  45% {transform:rotate(-25deg) scale(0.88);}
  72% {transform:rotate(-23deg) scale(1.06);}
  100%{transform:rotate(-22deg) scale(1);}
}

/* ── FOOD TYPES ── */
/* Berry */
.food.berry{
  width:20px;height:20px;border-radius:50%;
  background:radial-gradient(ellipse at 32% 28%,#ffb8d0 0%,#e8185a 52%,#9a0030 100%);
  border-color:#7a0025;transform:rotate(0deg);
}
.food.berry::after{
  content:'';position:absolute;
  width:2px;height:7px;background:#2a8010;
  border-radius:1px 1px 0 0;
  top:-6px;left:50%;transform:translateX(-50%) rotate(10deg);
}
/* Mushroom */
.food.mushroom{
  width:24px;height:16px;
  border-radius:50% 50% 22% 22%/65% 65% 28% 28%;
  background:radial-gradient(ellipse at 38% 28%,#ff9060 0%,#e03000 55%,#9a1800 100%);
  border-color:#6a1000;transform:rotate(0deg);
}
.food.mushroom::before{
  content:'';position:absolute;
  width:11px;height:9px;
  background:linear-gradient(180deg,#f8f2ea 0%,#ddd0c0 100%);
  border:1.5px solid #c0a890;border-radius:2px 2px 4px 4px;
  bottom:-9px;left:50%;transform:translateX(-50%);
}
.food.mushroom::after{
  content:'';position:absolute;
  width:5px;height:5px;background:rgba(255,255,255,.88);
  border-radius:50%;top:3px;left:4px;
  box-shadow:9px 1px 0 rgba(255,255,255,.75);
}
/* Type-specific held glow + no-rotation pulse */
.food.held.berry   {filter:drop-shadow(0 0 8px rgba(230,20,100,.65));}
.food.held.mushroom{filter:drop-shadow(0 0 8px rgba(255,100,20,.65));}
@keyframes heldPulseRound{
  from{transform:translate(-50%,-50%) rotate(0deg) scale(1.2);}
  to  {transform:translate(-50%,-50%) rotate(0deg) scale(1.38);}
}
.food.held.berry,.food.held.mushroom{animation-name:heldPulseRound !important;}
/* Landed pulse without leaf rotation */
@keyframes foodPulseRound{
  0%,100%{transform:rotate(0deg) scale(1);}
  50%    {transform:rotate(0deg) scale(1.14);}
}
.food.berry.landed,.food.mushroom.landed{animation-name:foodPulseRound !important;}

/* ── STREAK BADGE ── */
#streak-badge{
  position:absolute;top:14px;left:14px;
  background:rgba(0,0,0,.48);backdrop-filter:blur(6px);
  color:white;font-family:sans-serif;font-size:15px;font-weight:700;
  padding:5px 11px;border-radius:18px;
  display:flex;align-items:center;gap:3px;
  z-index:30;pointer-events:none;
}
#streak-badge.bump{animation:badgeBump .45s cubic-bezier(.34,1.56,.64,1);}
@keyframes badgeBump{
  0%{transform:scale(1)}45%{transform:scale(1.38)}100%{transform:scale(1)}
}

/* ── CELEBRATION POP-UP ── */
#celebration{
  position:absolute;top:28%;left:50%;
  font-family:sans-serif;font-size:22px;font-weight:900;
  color:white;
  text-shadow:0 0 14px rgba(255,210,0,.9),0 2px 5px rgba(0,0,0,.55);
  pointer-events:none;z-index:35;
  opacity:0;white-space:nowrap;
}
#celebration.show{animation:celebFloat 2.8s ease-out forwards;}
@keyframes celebFloat{
  0%  {opacity:0;transform:translateX(-50%) translateY(18px) scale(.72);}
  14% {opacity:1;transform:translateX(-50%) translateY(0) scale(1.1);}
  65% {opacity:1;transform:translateX(-50%) translateY(-12px) scale(1);}
  100%{opacity:0;transform:translateX(-50%) translateY(-44px) scale(.9);}
}

/* ── EVOLUTION FLASH ── */
#evo-flash{
  position:absolute;inset:0;background:white;
  opacity:0;pointer-events:none;z-index:40;
}
#evo-flash.flash{animation:evoFlash 1.4s ease-out forwards;}
@keyframes evoFlash{
  0%{opacity:0}12%{opacity:1}38%{opacity:.5}58%{opacity:.95}78%{opacity:.15}100%{opacity:0}
}

/* ── EVOLUTION BANNER ── */
#evo-banner{
  position:absolute;top:36%;left:50%;
  font-family:sans-serif;font-size:20px;font-weight:900;
  color:#ffe566;
  text-shadow:0 0 18px rgba(255,210,0,1),0 0 7px rgba(255,120,0,.9);
  pointer-events:none;z-index:41;white-space:nowrap;
  opacity:0;
}
#evo-banner.show{animation:evoBanner 3.2s ease-out forwards;}
@keyframes evoBanner{
  0%  {opacity:0;transform:translateX(-50%) scale(.48);}
  18% {opacity:1;transform:translateX(-50%) scale(1.1);}
  70% {opacity:1;transform:translateX(-50%) scale(1);}
  100%{opacity:0;transform:translateX(-50%) scale(.94);}
}

/* ── NAME SCREEN ── */
#name-screen{
  position:absolute;inset:0;z-index:100;
  display:none;flex-direction:column;align-items:center;justify-content:center;
  background:linear-gradient(180deg,#bce6f8 0%,#a8d4f0 38%,#c8e8a8 72%,#7ab83a 100%);
  transition:opacity .6s ease;
}
#name-screen .ns-turtle{font-size:72px;margin-bottom:14px;line-height:1;}
#name-screen h1{
  font-family:sans-serif;font-size:24px;font-weight:800;
  color:#1e4e10;text-shadow:0 1px 3px rgba(255,255,255,.55);
  margin-bottom:28px;text-align:center;padding:0 24px;line-height:1.3;
}
#name-screen input{
  width:220px;font-family:sans-serif;font-size:20px;
  padding:10px 18px;border-radius:26px;
  border:2.5px solid #4a9a30;outline:none;
  background:rgba(255,255,255,.9);color:#163010;
  text-align:center;margin-bottom:22px;
  box-shadow:0 2px 14px rgba(60,160,30,.22);
  -webkit-appearance:none;
}
#name-screen input:focus{
  border-color:#2a7a14;
  box-shadow:0 0 0 3px rgba(80,180,40,.28),0 2px 14px rgba(60,160,30,.22);
}
#name-screen button{
  font-family:sans-serif;font-size:18px;font-weight:700;
  padding:13px 36px;border-radius:30px;border:none;
  background:linear-gradient(135deg,#62d442,#2a9018);
  color:white;cursor:pointer;
  box-shadow:0 4px 18px rgba(50,150,20,.40);
  transition:transform .12s,box-shadow .12s;
}
#name-screen button:active{
  transform:scale(.94);
  box-shadow:0 2px 8px rgba(50,150,20,.28);
}
#turtle-name-label{
  font-size:11px;font-weight:400;opacity:.72;margin-left:5px;letter-spacing:.2px;
}
</style>
</head>
<body>
<div id="scene">
  <div class="sky" id="sky"></div>
  <div id="sun"></div>
  <div id="moon"></div>
  <div id="stars-container"></div>
  <div class="cloud c1"></div>
  <div class="cloud c2"></div>
  <div class="cloud c3"></div>
  <div id="trees"></div>
  <div id="bushes"></div>
  <div class="ground"></div>

  <div id="turtle">
    <div class="t-shadow"></div>
    <div class="t-body"></div>
    <div class="t-shell"></div>
    <div class="t-tail"></div>
    <div class="t-head">
      <div class="t-eye"></div>
      <div class="t-beard"></div>
      <div class="t-nostrils">
        <div class="t-nostril"></div>
        <div class="t-nostril"></div>
      </div>
    </div>
    <div class="t-leg fl"></div>
    <div class="t-leg fr"></div>
    <div class="t-leg bl"></div>
    <div class="t-leg br"></div>
    <div class="t-exclaim">!</div>
  </div>

  <div id="streak-badge">&#x1F525; <span id="streak-num">1</span></div>
  <div id="celebration"></div>
  <div id="evo-flash"></div>
  <div id="evo-banner"></div>

  <div id="hint">Tap to feed &middot; Swipe to throw</div>

  <div id="name-screen">
    <div class="ns-turtle">🐢</div>
    <h1>What will you name<br>your turtle?</h1>
    <input type="text" id="turtle-name-input" maxlength="18" placeholder="Enter a name…" autocomplete="off" spellcheck="false" />
    <button id="name-btn">Let's go!</button>
  </div>
</div>

<script>
const scene  = document.getElementById('scene');
const turtle = document.getElementById('turtle');
const skyEl  = document.getElementById('sky');
const sunEl  = document.getElementById('sun');
const moonEl = document.getElementById('moon');

/* ── Generate trees ── */
const treesEl = document.getElementById('trees');
[5,14,24,36,50,62,74,85,94].forEach(pct => {
  const h = 44+Math.random()*32, w = 22+Math.random()*16;
  const hue = 105+Math.random()*20, lit = 20+Math.random()*10;
  const d = document.createElement('div');
  d.className = 'tree';
  d.style.cssText = 'left:'+pct+'%;height:'+h+'px';
  d.innerHTML =
    '<div class="crown" style="width:'+w+'px;height:'+(h*.78)+'px;bottom:'+(h*.22)+'px;background:hsla('+hue+',42%,'+lit+'%,0.65)"></div>'+
    '<div class="trunk" style="height:'+(h*.38)+'px"></div>';
  treesEl.appendChild(d);
});

/* ── Generate bushes ── */
const bushesEl = document.getElementById('bushes');
[2,11,21,35,52,66,77,89,97].forEach(pct => {
  const w=28+Math.random()*38, h=14+Math.random()*18;
  const hue=108+Math.random()*22, lit=22+Math.random()*10;
  const b = document.createElement('div');
  b.className = 'bush';
  b.style.cssText = 'left:'+pct+'%;width:'+w+'px;height:'+h+'px;background:hsl('+hue+',45%,'+lit+'%)';
  bushesEl.appendChild(b);
});

/* ── Generate stars ── */
const starsContainer = document.getElementById('stars-container');
const stars = [];
for(let i = 0; i < 28; i++){
  const s = document.createElement('div');
  s.className = 'star';
  const sz = 1.4 + Math.random()*2.4;
  s.style.cssText =
    'width:'+sz+'px;height:'+sz+'px;'+
    'left:'+(Math.random()*94+1)+'%;'+
    'top:'+(Math.random()*50+1)+'%;'+
    'opacity:0;';
  starsContainer.appendChild(s);
  stars.push({ el: s, twinkleOffset: Math.random()*Math.PI*2 });
}

/* ── Day / Night Sky System ── */
function lerp(a, b, t){ return a + (b - a) * t; }

function hexToRgb(hex){
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}
function lerpColor(hex1, hex2, t){
  const [r1,g1,b1] = hexToRgb(hex1);
  const [r2,g2,b2] = hexToRgb(hex2);
  return 'rgb('+Math.round(lerp(r1,r2,t))+','+Math.round(lerp(g1,g2,t))+','+Math.round(lerp(b1,b2,t))+')';
}

// Key time stops: hour, sky top/mid/bot gradient colors, star opacity 0-1
const SKY_KEYS = [
  { h: 0,  top:'#02041a', mid:'#06102e', bot:'#0e1e48', star: 1.0 },
  { h: 4,  top:'#02041a', mid:'#06102e', bot:'#0e1e48', star: 1.0 },
  { h: 5,  top:'#1a0840', mid:'#702060', bot:'#ff6535', star: 0.6 },
  { h: 6,  top:'#283298', mid:'#d85a28', bot:'#ffb055', star: 0.1 },
  { h: 7,  top:'#1565c0', mid:'#40a0f0', bot:'#9fd5f5', star: 0.0 },
  { h: 12, top:'#0e4fa8', mid:'#1e82e0', bot:'#80c8f8', star: 0.0 },
  { h: 17, top:'#1a207e', mid:'#5868c0', bot:'#ffb84d', star: 0.0 },
  { h: 18, top:'#1a1060', mid:'#c03820', bot:'#ff9500', star: 0.0 },
  { h: 19, top:'#0c0838', mid:'#901818', bot:'#e07800', star: 0.12},
  { h: 20, top:'#06051e', mid:'#160828', bot:'#280e3a', star: 0.6 },
  { h: 21, top:'#02041a', mid:'#06102e', bot:'#0e1e48', star: 1.0 },
  { h: 24, top:'#02041a', mid:'#06102e', bot:'#0e1e48', star: 1.0 },
];

function getSkyAt(fh){
  const t = ((fh % 24) + 24) % 24;
  let prev = SKY_KEYS[0], next = SKY_KEYS[1];
  for(let i = 0; i < SKY_KEYS.length - 1; i++){
    if(t >= SKY_KEYS[i].h && t < SKY_KEYS[i+1].h){
      prev = SKY_KEYS[i]; next = SKY_KEYS[i+1]; break;
    }
  }
  const span = next.h - prev.h;
  const frac = span > 0 ? (t - prev.h) / span : 0;
  return {
    top:  lerpColor(prev.top,  next.top,  frac),
    mid:  lerpColor(prev.mid,  next.mid,  frac),
    bot:  lerpColor(prev.bot,  next.bot,  frac),
    star: lerp(prev.star, next.star, frac),
  };
}

function isNightHour(h){ return h >= 20 || h < 6; }

let nightMode = false;
let skyTick = 0;

function updateSky(){
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const fh = h + m / 60;
  const cfg = getSkyAt(fh);

  skyEl.style.background =
    'linear-gradient(180deg,' +
    cfg.top + ' 0%,' +
    cfg.mid + ' 34%,' +
    cfg.bot + ' 65%,' +
    '#c8ecb0 82%,#7bbf3e 100%)';

  // Stars — twinkle each update
  const sa = cfg.star;
  skyTick++;
  stars.forEach((s, i) => {
    if(sa < 0.01){
      s.el.style.opacity = '0';
    } else {
      const twinkle = Math.max(0, sa * (0.65 + 0.35 * Math.sin(skyTick * 0.4 + s.twinkleOffset)));
      s.el.style.opacity = twinkle.toFixed(2);
    }
  });

  nightMode = isNightHour(h);

  // Sun arc: rises 5am, sets 8pm (15hr day)
  const sunProgress = getSkyBodyProgress(fh, 5, 20);
  if(sunProgress >= 0 && sunProgress <= 1){
    const sp = celestialXY(sunProgress);
    sunEl.style.left = (sp.x - 28) + 'px';
    sunEl.style.top  = (sp.y - 28) + 'px';
    // Dim near horizon
    const horizonFade = Math.min(1, Math.min(sunProgress, 1 - sunProgress) * 8);
    sunEl.style.opacity = horizonFade.toFixed(2);
  } else {
    sunEl.style.opacity = '0';
  }

  // Moon arc: rises 7pm (19), sets 6am (30 = 19+11)
  let moonFh = fh;
  if(fh < 7) moonFh = fh + 24; // normalize night hours past midnight
  const moonProgress = getSkyBodyProgress(moonFh, 19, 30);
  if(moonProgress >= 0 && moonProgress <= 1){
    const mp = celestialXY(moonProgress);
    moonEl.style.left = (mp.x - 22) + 'px';
    moonEl.style.top  = (mp.y - 22) + 'px';
    const horizonFade = Math.min(1, Math.min(moonProgress, 1 - moonProgress) * 8);
    moonEl.style.opacity = (cfg.star * horizonFade).toFixed(2);
  } else {
    moonEl.style.opacity = '0';
  }
}

function getSkyBodyProgress(fh, rise, set){
  return (fh - rise) / (set - rise);
}

function celestialXY(progress){
  const W = window.innerWidth, H = window.innerHeight;
  const x = W * 0.08 + progress * W * 0.84;
  const y = H * 0.62 - Math.sin(progress * Math.PI) * H * 0.52;
  return { x, y };
}

updateSky();
setInterval(updateSky, 60000);

/* ── Turtle Name ── */
let turtleName = '';

function initNameScreen(){
  try {
    const saved = localStorage.getItem('turtleName');
    if(saved){
      turtleName = saved;
      attachTurtleNameLabel();
      return; // name already set — proceed to game normally
    }
  } catch(e){}
  // First run — show the name screen
  const ns = document.getElementById('name-screen');
  ns.style.display = 'flex';
  setTimeout(() => { document.getElementById('turtle-name-input').focus(); }, 80);

  function confirmName(){
    const input = document.getElementById('turtle-name-input');
    const name  = input.value.trim();
    if(!name) return;
    turtleName = name;
    try { localStorage.setItem('turtleName', name); } catch(e){}
    attachTurtleNameLabel();
    ns.style.opacity = '0';
    setTimeout(() => { ns.style.display = 'none'; }, 650);
  }

  document.getElementById('name-btn').addEventListener('click', confirmName);
  document.getElementById('turtle-name-input').addEventListener('keydown', e => {
    if(e.key === 'Enter') confirmName();
  });
}

function attachTurtleNameLabel(){
  if(!turtleName) return;
  const badge = document.getElementById('streak-badge');
  if(badge.querySelector('#turtle-name-label')) return;
  const el = document.createElement('span');
  el.id = 'turtle-name-label';
  el.textContent = turtleName;
  badge.appendChild(el);
}

/* ── Streak System ── */
let streak = 1;

function initStreak(){
  try {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate  = localStorage.getItem('lastVisitDate') || '';
    const savedStreak = parseInt(localStorage.getItem('streakCount') || '0', 10);
    const savedStage  = parseInt(localStorage.getItem('turtleStage') || '1', 10);

    if(!lastDate){
      // Very first visit
      streak = 1;
      localStorage.setItem('lastVisitDate', today);
      localStorage.setItem('streakCount', '1');
    } else if(lastDate === today){
      // Same day — no change
      streak = savedStreak || 1;
    } else {
      const prevDate  = new Date(lastDate + 'T12:00:00');
      const todayDate = new Date(today    + 'T12:00:00');
      const diffDays  = Math.round((todayDate - prevDate) / 86400000);

      if(diffDays === 1){
        streak = (savedStreak || 0) + 1;
        localStorage.setItem('streakCount', String(streak));
        localStorage.setItem('lastVisitDate', today);
        setTimeout(() => showCelebration('&#x1F525; Day ' + streak + (turtleName ? '! ' + turtleName + ' evolved!' : '!')), 900);
      } else {
        streak = 1;
        localStorage.setItem('streakCount', '1');
        localStorage.setItem('lastVisitDate', today);
        setTimeout(() => showCelebration('&#x1F33F; Welcome back' + (turtleName ? ', ' + turtleName + '!' : '!')), 900);
      }
    }

    document.getElementById('streak-num').textContent = streak;

    const newStage = getStage(streak);
    if(newStage > savedStage){
      setTimeout(() => triggerEvolution(newStage), 1700);
    } else {
      applyStage(newStage);
      localStorage.setItem('turtleStage', String(newStage));
    }
  } catch(e) {
    // localStorage unavailable (e.g. iOS WebView with no baseUrl) — boot with defaults
    document.getElementById('streak-num').textContent = streak;
    applyStage(1);
  }
}

function showCelebration(msg){
  const el = document.getElementById('celebration');
  el.innerHTML = msg;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  const badge = document.getElementById('streak-badge');
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

/* ── Evolution Stages ── */
function getStage(s){
  if(s >= 30) return 3;
  if(s >= 7)  return 2;
  return 1;
}

let currentStage = 1;

function applyStage(stage){
  turtle.classList.remove('stage1', 'stage2', 'stage3');
  turtle.classList.add('stage' + stage);
  currentStage = stage;
  try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type:'stage',value:stage})); } catch(e){}
}

function triggerEvolution(stage){
  const NAMES = { 1:'Hatchling', 2:'Explorer', 3:'Elder' };
  const flash  = document.getElementById('evo-flash');
  const banner = document.getElementById('evo-banner');

  flash.classList.remove('flash');
  void flash.offsetWidth;
  flash.classList.add('flash');

  setTimeout(() => {
    applyStage(stage);
    localStorage.setItem('turtleStage', String(stage));
  }, 420);

  setTimeout(() => {
    banner.innerHTML = '&#x2728; Evolved into ' + NAMES[stage] + '!';
    banner.classList.remove('show');
    void banner.offsetWidth;
    banner.classList.add('show');
  }, 650);
}

/* ── Turtle state ── */
let x = 60, targetX = 240, speed = 1.6, facingR = true;
let state = 'wandering'; // wandering | idle | hunting | eating | sleeping
let fTimer = 0, idleTO = null;
const foods = [];
let targetFood = null;
let sleeping = false;
let zzzIntervalId = null;
let danceAngle = 0, danceDir = 1, danceId = null;

const FOOD_TYPES = ['leaf', 'berry', 'mushroom'];
let currentFoodType = 0;
let typeCycleId = null;

function applyFlip(){
  const sc = currentStage === 3 ? 1.6 : currentStage === 2 ? 1.1 : 0.7;
  turtle.style.transform = 'scaleX(' + (facingR ? 1 : -1) + ') scale(' + sc + ') rotate(' + danceAngle + 'deg)';
}

function pickWanderTarget(){
  targetX = 30 + Math.random() * (window.innerWidth - 120);
  speed   = 0.7 + Math.random() * 1.9;
}

/* ── Sleep / Night behavior ── */
function wakeUp(){
  if(!sleeping) return;
  sleeping = false;
  state = 'wandering';
  turtle.classList.remove('sleeping', 'yawning');
  turtle.classList.add('walking');
  if(zzzIntervalId){ clearInterval(zzzIntervalId); zzzIntervalId = null; }
  pickWanderTarget();
}

function goSleep(){
  if(sleeping || state === 'eating') return;
  sleeping = true;
  state = 'sleeping';
  if(idleTO){ clearTimeout(idleTO); idleTO = null; }
  turtle.classList.remove('walking', 'eating', 'idle-nod', 'noticed');

  // yawn first, then sleep
  setTimeout(() => {
    turtle.classList.add('yawning');
    setTimeout(() => {
      turtle.classList.remove('yawning');
      if(sleeping){
        turtle.classList.add('sleeping');
        zzzIntervalId = setInterval(spawnZzz, 2400);
      }
    }, 950);
  }, 400);
}

function spawnZzz(){
  if(!sleeping) return;
  const z = document.createElement('div');
  z.className = 'zzz';
  z.textContent = ['z', 'z', 'zz', 'zzz'][Math.floor(Math.random() * 4)];
  const sc = currentStage === 3 ? 1.6 : currentStage === 2 ? 1.1 : 0.7;
  const headX = facingR ? (x + 88 * sc) : (x - 10 * sc);
  z.style.left = headX + 'px';
  z.style.top  = (window.innerHeight * (1 - 0.21) - 85 * sc - Math.random() * 8) + 'px';
  z.style.fontSize = (10 + Math.random() * 7) + 'px';
  scene.appendChild(z);
  setTimeout(() => z.remove(), 2500);
}

// Occasionally fall asleep during night idle
function maybeSleepAtNight(){
  if(nightMode && state === 'idle' && !sleeping && Math.random() < 0.4){
    goSleep();
  }
}

/* ── Drop food ── */
function dropFood(screenX, type){
  if(sleeping) wakeUp();
  const fx = Math.max(10, Math.min(window.innerWidth - 32, screenX - 11));
  const el = document.createElement('div');
  el.className = 'food' + (type ? ' ' + type : '');
  el.style.left = fx + 'px';
  scene.appendChild(el);
  const food = { x: fx + 11, el, eaten: false, type: type || 'leaf' };
  foods.push(food);
  setTimeout(() => { if(!food.eaten) el.classList.add('landed'); }, 580);
  if(state !== 'eating') huntNearest();
}

/* ── Hunt nearest food ── */
function huntNearest(){
  if(!foods.length) return;
  const nearest = foods.reduce((a, b) =>
    Math.abs(b.x - (x + 48)) < Math.abs(a.x - (x + 48)) ? b : a
  );
  targetFood = nearest;
  targetX    = nearest.x - 48;
  speed      = 2.7;
  if(idleTO){ clearTimeout(idleTO); idleTO = null; }
  sleeping = false;
  if(zzzIntervalId){ clearInterval(zzzIntervalId); zzzIntervalId = null; }
  state = 'hunting';
  turtle.classList.remove('idle-nod', 'sleeping', 'yawning');
  turtle.classList.add('walking', 'noticed');
  setTimeout(() => turtle.classList.remove('noticed'), 900);
}

/* ── Eat ── */
function startEating(){
  state = 'eating';
  turtle.classList.remove('walking', 'noticed');
  turtle.classList.add('eating');
  const food = targetFood;
  targetFood = null;
  food.eaten = true;
  food.el.classList.remove('landed');
  food.el.classList.add('eaten');
  const idx = foods.indexOf(food);
  if(idx > -1) foods.splice(idx, 1);
  spawnCrumbs(food.x);
  const ftype = food.type || 'leaf';
  if(ftype === 'berry'){
    setTimeout(() => berryEffect(), 300);
  } else if(ftype === 'mushroom'){
    setTimeout(() => mushroomEffect(), 300);
  } else {
    setTimeout(() => spawnHeart(), 340);
  }
  setTimeout(() => food.el.remove(), 420);
  setTimeout(() => {
    turtle.classList.remove('eating');
    if(foods.length) huntNearest();
    else goWander();
  }, 960);
}

/* ── Wander / idle ── */
function goWander(){
  state = 'wandering';
  pickWanderTarget();
  turtle.classList.add('walking');
}

function goIdle(){
  state = 'idle';
  turtle.classList.remove('walking');
  setTimeout(() => {
    if(state !== 'idle') return;
    turtle.classList.add('idle-nod');
    setTimeout(() => turtle.classList.remove('idle-nod'), 1200);
  }, 180);
  idleTO = setTimeout(() => {
    idleTO = null;
    if(state !== 'idle') return;
    if(nightMode && Math.random() < 0.38) goSleep();
    else goWander();
  }, 1500 + Math.random() * 2500);
}

/* ── Particles ── */
function spawnCrumbs(foodX){
  const gy = window.innerHeight * (1 - 0.21) - 8;
  for(let i = 0; i < 7; i++){
    const c = document.createElement('div');
    const ang = Math.random() * Math.PI * 2, d = 12 + Math.random() * 22;
    const sz = 3 + Math.random() * 4, hue = 90 + Math.random() * 40;
    c.className = 'crumb';
    c.style.cssText =
      'left:' + (foodX - 2) + 'px;top:' + gy + 'px;' +
      'width:' + sz + 'px;height:' + sz + 'px;' +
      'background:hsl(' + hue + ',70%,55%);' +
      '--tx:' + (Math.cos(ang) * d) + 'px;--ty:' + (Math.sin(ang) * d - 5) + 'px';
    scene.appendChild(c);
    setTimeout(() => c.remove(), 750);
  }
}

function spawnHeart(){
  const h = document.createElement('div');
  h.className = 'heart'; h.textContent = '♥';
  h.style.cssText = 'left:' + (x + 36) + 'px;bottom:calc(21% + 76px)';
  scene.appendChild(h);
  setTimeout(() => h.remove(), 1150);
}

function spawnStar(cx, cy){
  const s = document.createElement('div');
  s.textContent = '★';
  s.style.cssText = 'position:absolute;font-size:18px;color:#ffcc00;' +
    'left:' + cx + 'px;top:' + cy + 'px;pointer-events:none;' +
    'animation:heartFloat 1.1s ease-out forwards;';
  scene.appendChild(s);
  setTimeout(() => s.remove(), 1100);
}

function berryEffect(){
  speed = Math.min(speed * 1.9, 5.5);
  for(let i = 0; i < 3; i++){
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'heart'; h.textContent = '♥';
      h.style.cssText = 'left:' + (x + 14 + i * 22) + 'px;bottom:calc(21% + 76px);color:#e8185a;';
      scene.appendChild(h);
      setTimeout(() => h.remove(), 1150);
    }, i * 130);
  }
}

function mushroomEffect(){
  if(danceId) return;
  spawnHeart();
  const baseY = window.innerHeight * (1 - 0.21) - 110;
  spawnStar(x + 20, baseY); spawnStar(x + 50, baseY - 20); spawnStar(x + 36, baseY + 10);
  danceAngle = 0; danceDir = 1;
  danceId = setInterval(() => {
    danceAngle += danceDir * 7;
    if(Math.abs(danceAngle) >= 22) danceDir *= -1;
    applyFlip();
  }, 55);
  setTimeout(() => {
    clearInterval(danceId); danceId = null;
    danceAngle = 0; applyFlip();
  }, 1100);
}

function spawnRipple(cx, cy){
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.left = cx + 'px'; r.style.top = cy + 'px';
  scene.appendChild(r);
  setTimeout(() => r.remove(), 650);
}

function spawnFootprint(){
  const gy = window.innerHeight * (1 - 0.21);
  const fp = document.createElement('div');
  const side = facingR ? 1 : -1, sz = 3 + Math.random() * 3;
  fp.className = 'footprint';
  fp.style.cssText =
    'left:' + (x + 48 + side * (10 + Math.random() * 16)) + 'px;' +
    'top:' + (gy - 3 - Math.random() * 5) + 'px;' +
    'width:' + sz + 'px;height:' + sz + 'px';
  scene.appendChild(fp);
  setTimeout(() => fp.remove(), 3600);
}

/* ── Throw food ── */
function throwFood(startX, startY, vx, vy, type){
  const groundY = window.innerHeight * 0.79;
  if(startY >= groundY){ dropFood(startX, type); return; }

  const el = document.createElement('div');
  el.className = 'food flying' + (type ? ' ' + type : '');
  el.style.cssText = 'left:' + (startX - 11) + 'px;top:' + (startY - 10) + 'px;bottom:auto;animation:none;';

  const shadow = document.createElement('div');
  shadow.className = 'food-shadow';
  scene.appendChild(shadow);
  scene.appendChild(el);

  const food = { x: startX, el, eaten: false, type: type || 'leaf' };
  let px = startX, py = startY;
  const GRAVITY = 0.0028;
  let lastT = null;

  function step(now){
    if(!lastT){ lastT = now; requestAnimationFrame(step); return; }
    const dt = Math.min(now - lastT, 32);
    lastT = now;
    vy += GRAVITY * dt;
    px += vx * dt;
    py += vy * dt;

    if(px < 5)                   { px = 5;                    vx = Math.abs(vx) * 0.45; }
    if(px > window.innerWidth-5) { px = window.innerWidth-5;  vx = -Math.abs(vx) * 0.45; }

    if(py >= groundY){
      py = groundY;
      shadow.remove();
      const landX = Math.max(10, Math.min(window.innerWidth - 32, px - 11));
      el.style.cssText = 'left:' + landX + 'px;bottom:21%;top:auto;animation:foodLand .38s ease-out forwards;';
      el.classList.remove('flying');
      food.x = landX + 11;
      foods.push(food);
      setTimeout(() => { if(!food.eaten) el.classList.add('landed'); }, 390);
      if(state !== 'eating') huntNearest();
      return;
    }

    el.style.left = (px - 11) + 'px';
    el.style.top  = (py - 10) + 'px';

    const height = groundY - py;
    const refH   = Math.max(80, groundY - startY);
    const sc     = Math.max(0.12, 1 - (height / refH) * 0.88);
    shadow.style.cssText =
      'left:' + px + 'px;top:' + (groundY + 4) + 'px;' +
      'opacity:' + (sc * 0.6) + ';transform:translate(-50%,-50%) scale(' + sc + ');';

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Input ── */
let _drag = null;
let _pid  = null;
let heldFood = null;
let _trail = [];

document.addEventListener('pointerdown', e => {
  if(_drag) return;
  if(sleeping) wakeUp();
  _drag  = { x: e.clientX, y: e.clientY, t: Date.now() };
  _trail = [{ x: e.clientX, y: e.clientY, t: Date.now() }];
  _pid   = e.pointerId;
  currentFoodType = 0;

  heldFood = document.createElement('div');
  heldFood.className = 'food held ' + FOOD_TYPES[currentFoodType];
  heldFood.style.left = e.clientX + 'px';
  heldFood.style.top  = e.clientY + 'px';
  scene.appendChild(heldFood);

  typeCycleId = setInterval(() => {
    currentFoodType = (currentFoodType + 1) % FOOD_TYPES.length;
    if(heldFood) heldFood.className = 'food held ' + FOOD_TYPES[currentFoodType];
  }, 450);
});

document.addEventListener('pointermove', e => {
  if(!heldFood || !_drag || e.pointerId !== _pid) return;
  heldFood.style.left = e.clientX + 'px';
  heldFood.style.top  = e.clientY + 'px';
  const now = Date.now();
  _trail.push({ x: e.clientX, y: e.clientY, t: now });
  // Keep only the last 100ms of movement for velocity sampling
  while(_trail.length > 1 && now - _trail[0].t > 100) _trail.shift();
});

document.addEventListener('pointerup', e => {
  if(!_drag || e.pointerId !== _pid) return;
  const dx   = e.clientX - _drag.x;
  const dy   = e.clientY - _drag.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if(dist < 10){
    if(heldFood){
      const ft = FOOD_TYPES[currentFoodType];
      const fx = Math.max(10, Math.min(window.innerWidth - 32, e.clientX - 11));
      const el = heldFood;
      heldFood = null;
      el.style.cssText =
        'left:' + fx + 'px;bottom:21%;top:auto;' +
        'animation:foodSettleDown .44s ease-out forwards;';
      el.className = 'food ' + ft;
      const food = { x: fx + 11, el, eaten: false, type: ft };
      foods.push(food);
      setTimeout(() => { if(!food.eaten) el.classList.add('landed'); }, 460);
      if(state !== 'eating') huntNearest();
    } else {
      dropFood(e.clientX, FOOD_TYPES[currentFoodType]);
    }
    spawnRipple(e.clientX, e.clientY);
  } else {
    if(heldFood){ heldFood.remove(); heldFood = null; }
    // Use only the recent trail window for velocity so pausing before a flick
    // doesn't kill the throw speed
    let vx, vy;
    if(_trail.length >= 2){
      const oldest = _trail[0];
      const newest = _trail[_trail.length - 1];
      const dt = Math.max(1, newest.t - oldest.t);
      vx = (newest.x - oldest.x) / dt * 1.7;
      vy = (newest.y - oldest.y) / dt * 1.7;
    } else {
      const dt = Math.max(1, Date.now() - _drag.t);
      vx = dx / dt * 1.7;
      vy = dy / dt * 1.7;
    }
    const MAX_SPD = 2.4;
    const spd = Math.sqrt(vx * vx + vy * vy);
    if(spd > MAX_SPD){ vx = vx / spd * MAX_SPD; vy = vy / spd * MAX_SPD; }
    throwFood(e.clientX, e.clientY, vx, vy, FOOD_TYPES[currentFoodType]);
    spawnRipple(_drag.x, _drag.y);
  }
  if(typeCycleId){ clearInterval(typeCycleId); typeCycleId = null; }
  _drag = null; _pid = null; _trail = [];
});

document.addEventListener('pointercancel', e => {
  if(e.pointerId !== _pid) return;
  if(heldFood){ heldFood.remove(); heldFood = null; }
  if(typeCycleId){ clearInterval(typeCycleId); typeCycleId = null; }
  _drag = null; _pid = null; _trail = [];
});

/* ── Main Loop ── */
function update(){
  if(!sleeping){
    const dx = targetX - x;
    if(state === 'wandering' || state === 'hunting'){
      x += Math.sign(dx) * speed;
      facingR = dx > 0; applyFlip();
      fTimer++; if(fTimer % 20 === 0) spawnFootprint();
      if(state === 'hunting'){
        if(Math.abs(dx) < 22) startEating();
      } else {
        if(Math.abs(dx) < 3) goIdle();
      }
    }
    turtle.style.left = x + 'px';
  }
  requestAnimationFrame(update);
}

/* ── Init ── */
pickWanderTarget();
initNameScreen();
initStreak();
update();
</script>
</body>
</html>`;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          srcDoc={petHTML}
          style={{ width: "100vw", height: "100vh", border: "none" }}
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{ html: petHTML }}
          style={{ flex: 1 }}
          scrollEnabled={false}
          onMessage={(e) => {
            try {
              const msg = JSON.parse(e.nativeEvent.data);
              if (msg.type === 'stage') GameState.turtleStage = msg.value;
            } catch {}
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
