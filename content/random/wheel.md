---
title: "เกมส์วงล้อ"
seoTitle: "เกมส์วงล้อ ออนไลน์ ฟรี"
h1: "เกมส์วงล้อ"
description: "เกมส์วงล้อออนไลน์ฟรี ใส่ชื่อหรือตัวเลือกได้สูงสุด 100 รายการ กดหมุนเพื่อสุ่มผู้โชคดีได้ง่ายๆ ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งหรือสมัครสมาชิก"
icon: "🎲"
category: "random"
weight: 14
byline: true
date: 2026-11-05
lastmod: 2026-11-07
draft: false
---

เกมส์วงล้อออนไลน์สำหรับสุ่มชื่อหรือตัวเลือก ช่วยตัดสินใจเรื่องที่เลือกไม่ถูก เช่น เมนูอาหาร ผู้โชคดี หรือคิวทำกิจกรรม เพียงพิมพ์รายการแล้วกดหมุน

<div id="wheelTool" class="wt">
<style>
.wt{--wt-b:rgba(128,128,128,.35);margin:1.5rem 0;padding:16px;border:1px solid var(--wt-b);border-radius:14px;font-family:inherit}
.wt *{box-sizing:border-box}
.wt-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;align-items:start}
.wt-stage{position:relative;width:100%;max-width:440px;margin:18px auto 0;aspect-ratio:1/1}
.wt-stage canvas{width:100%;height:100%;display:block;border-radius:50%;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.25)}
.wt-pointer{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:34px;line-height:1;color:#dc2626;z-index:3;text-shadow:0 2px 4px rgba(0,0,0,.35);pointer-events:none}
.wt-spin{position:absolute;top:50%;left:50%;width:22%;height:22%;min-width:56px;min-height:56px;transform:translate(-50%,-50%);border-radius:50%;border:4px solid #fff;background:#111827;color:#fff;font-weight:700;font-size:14px;cursor:pointer;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.4)}
.wt-spin:disabled{opacity:.6;cursor:default}
.wt-panel{display:flex;flex-direction:column;gap:10px}
.wt-panel textarea{width:100%;min-height:180px;max-height:340px;padding:10px;border:1px solid var(--wt-b);border-radius:8px;font:inherit;font-size:15px;line-height:1.5;resize:vertical;background:transparent;color:inherit}
.wt-row{display:flex;flex-wrap:wrap;gap:8px}
.wt-btn{padding:8px 12px;border:1px solid var(--wt-b);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:14px;cursor:pointer}
.wt-btn:hover{background:rgba(128,128,128,.15)}
.wt-count{font-size:13px;opacity:.75}
.wt-warn{color:#dc2626;opacity:1}
.wt-opt{font-size:14px;display:flex;align-items:center;gap:6px}
.wt-result{padding:12px;border-radius:10px;background:rgba(37,99,235,.12);font-size:20px;font-weight:700;text-align:center;min-height:52px;word-break:break-word}
.wt-hist{margin:4px 0 0;padding-left:22px;font-size:14px}
.wt-keys{font-size:12px;opacity:.7}
.wt:fullscreen{background:Canvas;color:CanvasText;overflow:auto;display:flex;align-items:center;justify-content:center}
@media(max-width:720px){.wt-grid{grid-template-columns:1fr}}
</style>
<div class="wt-grid">
<div class="wt-stage">
<div class="wt-pointer">▼</div>
<canvas id="wtCanvas" width="640" height="640" aria-label="วงล้อสุ่มรายการ"></canvas>
<button type="button" id="wtSpin" class="wt-spin">หมุน</button>
</div>
<div class="wt-panel">
<div class="wt-result" id="wtResult" aria-live="polite">กดปุ่มหมุนเพื่อเริ่ม</div>
<label for="wtInput"><strong>รายการ</strong> (หนึ่งรายการต่อบรรทัด)</label>
<textarea id="wtInput" spellcheck="false"></textarea>
<div class="wt-count" id="wtCount">0 / 100</div>
<div class="wt-row">
<button type="button" class="wt-btn" id="wtEdit">แก้ไข (E)</button>
<button type="button" class="wt-btn" id="wtShuffle">สลับลำดับ</button>
<button type="button" class="wt-btn" id="wtHide">ซ่อนรายการที่เลือก (S)</button>
<button type="button" class="wt-btn" id="wtReset">รีเซ็ต (R)</button>
<button type="button" class="wt-btn" id="wtFull">เต็มหน้าจอ (F)</button>
</div>
<label class="wt-opt"><input type="checkbox" id="wtAuto"> ซ่อนรายการที่ถูกเลือกอัตโนมัติหลังหมุน</label>
<label class="wt-opt"><input type="checkbox" id="wtSound" checked> เปิดเสียงเมื่อได้ผลลัพธ์</label>
<div class="wt-keys">ปุ่มลัด (เมื่อเมาส์อยู่บนเครื่องมือ): Space = หมุน, S = ซ่อน, R = รีเซ็ต, E = แก้ไข, F = เต็มหน้าจอ</div>
<div><strong>ประวัติผลลัพธ์</strong><ol class="wt-hist" id="wtHistory"></ol></div>
</div>
</div>
<script>
(function(){
var DEF=["ข้าวมันไก่","ก๋วยเตี๋ยว","ผัดกะเพรา","ส้มตำ","หมูกระทะ","ชาบู","พิซซ่า","ซูชิ"];
var KEY="wheelToolItemsV1";
var PAL=["#ef4444","#f97316","#eab308","#22c55e","#14b8a6","#3b82f6","#8b5cf6","#ec4899"];
var $=function(id){return document.getElementById(id);};
var root=$("wheelTool"),cv=$("wtCanvas"),ctx=cv.getContext("2d");
var input=$("wtInput"),spinBtn=$("wtSpin"),resEl=$("wtResult"),cntEl=$("wtCount"),histEl=$("wtHistory");
var soundCb=$("wtSound"),autoCb=$("wtAuto");
var items=[],rot=0,spinning=false,lastIdx=-1,history=[],timer=null,hover=false;
function parse(){
var lines=input.value.split("\n"),out=[],i,t;
for(i=0;lines.length>i;i++){t=lines[i].trim();if(t){out.push(t);}}
return out;
}
function rnd(n){
var a;
if(window.crypto&&window.crypto.getRandomValues){a=new Uint32Array(1);window.crypto.getRandomValues(a);return a[0]%n;}
return Math.floor(Math.random()*n);
}
function color(i,n){
var k=i%PAL.length;
if(i===n-1&&n>1&&k===0){k=3;}
return PAL[k];
}
function draw(){
var S=cv.width,c=S/2,n=items.length,i,a0,step,fs,label;
ctx.clearRect(0,0,S,S);
if(n===0){
ctx.fillStyle="#9ca3af";ctx.beginPath();ctx.arc(c,c,c-6,0,Math.PI*2);ctx.fill();
ctx.fillStyle="#ffffff";ctx.font="bold 30px Sarabun,'Noto Sans Thai',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";
ctx.fillText("กรุณาใส่รายการ",c,c);
return;
}
step=Math.PI*2/n;
fs=n>60?9:n>40?11:n>24?14:n>14?18:n>8?22:26;
for(i=0;n>i;i++){
a0=-Math.PI/2+i*step;
ctx.beginPath();ctx.moveTo(c,c);ctx.arc(c,c,c-6,a0,a0+step);ctx.closePath();
ctx.fillStyle=color(i,n);ctx.fill();
if(n>1){ctx.strokeStyle="rgba(255,255,255,0.85)";ctx.lineWidth=2;ctx.stroke();}
ctx.save();ctx.translate(c,c);ctx.rotate(a0+step/2);
ctx.fillStyle="#ffffff";ctx.font="bold "+fs+"px Sarabun,'Noto Sans Thai',sans-serif";ctx.textAlign="right";ctx.textBaseline="middle";
label=items[i];
if(label.length>16){label=label.slice(0,15)+"…";}
ctx.fillText(label,c-26,0);
ctx.restore();
}
}
function update(){
var all=parse();
items=all.slice(0,100);
cntEl.textContent=items.length+" / 100"+(all.length>100?" — มีรายการเกิน 100 ระบบใช้เฉพาะ 100 รายการแรก":"");
cntEl.className=all.length>100?"wt-count wt-warn":"wt-count";
draw();
try{localStorage.setItem(KEY,input.value);}catch(e){}
}
function renderHistory(){
var i,li;
while(histEl.firstChild){histEl.removeChild(histEl.firstChild);}
for(i=0;history.length>i;i++){li=document.createElement("li");li.textContent=history[i];histEl.appendChild(li);}
}
function beep(){
if(!soundCb.checked){return;}
try{
var AC=window.AudioContext||window.webkitAudioContext;
if(!AC){return;}
var ac=new AC(),o=ac.createOscillator(),g=ac.createGain();
o.type="sine";o.frequency.value=880;g.gain.value=0.12;
o.connect(g);g.connect(ac.destination);
o.onended=function(){try{ac.close();}catch(e){}};
o.start();o.stop(ac.currentTime+0.35);
}catch(e){}
}
function hideSelected(){
var all;
if(spinning||lastIdx>=0===false){return;}
all=parse();
if(all.length>lastIdx){
all.splice(lastIdx,1);
input.value=all.join("\n");
lastIdx=-1;
update();
}
}
function finish(){
var name;
if(!spinning){return;}
spinning=false;spinBtn.disabled=false;
name=items[lastIdx];
if(name===undefined){return;}
resEl.textContent="🎉 "+name;
history.unshift(name);
if(history.length>10){history.pop();}
renderHistory();beep();
if(autoCb.checked){hideSelected();}
}
function spin(){
var n,step,w,off,target,cur,delta;
if(spinning){return;}
if(items.length===0){resEl.textContent="กรุณาใส่รายการอย่างน้อย 1 รายการ";return;}
n=items.length;step=360/n;w=rnd(n);
off=(Math.random()-0.5)*step*0.8;
target=((360-((w+0.5)*step+off))%360+360)%360;
cur=((rot%360)+360)%360;
delta=((target-cur)%360+360)%360;
rot=rot+360*6+delta;
spinning=true;lastIdx=w;
spinBtn.disabled=true;
resEl.textContent="กำลังหมุน...";
cv.style.transition="transform 5s cubic-bezier(.12,.6,.1,1)";
cv.style.transform="rotate("+rot+"deg)";
clearTimeout(timer);
timer=setTimeout(finish,5100);
}
function shuffle(){
var a=parse(),i,j,t;
for(i=a.length-1;i>0;i--){j=rnd(i+1);t=a[i];a[i]=a[j];a[j]=t;}
input.value=a.join("\n");
lastIdx=-1;
update();
}
function reset(){
if(!window.confirm("ต้องการรีเซ็ตรายการและประวัติทั้งหมดหรือไม่")){return;}
clearTimeout(timer);
spinning=false;spinBtn.disabled=false;lastIdx=-1;
input.value=DEF.join("\n");
history=[];renderHistory();
resEl.textContent="กดปุ่มหมุนเพื่อเริ่ม";
rot=0;cv.style.transition="none";cv.style.transform="rotate(0deg)";
update();
}
function fullscreen(){
var d=document,f;
try{
if(d.fullscreenElement||d.webkitFullscreenElement){
(d.exitFullscreen||d.webkitExitFullscreen).call(d);
return;
}
f=root.requestFullscreen||root.webkitRequestFullscreen;
if(f){f.call(root);}
}catch(e){}
}
function isActive(){
return hover||root.contains(document.activeElement)||document.fullscreenElement===root;
}
input.addEventListener("input",function(){lastIdx=-1;update();});
spinBtn.addEventListener("click",spin);
cv.addEventListener("click",spin);
$("wtShuffle").addEventListener("click",shuffle);
$("wtHide").addEventListener("click",hideSelected);
$("wtReset").addEventListener("click",reset);
$("wtFull").addEventListener("click",fullscreen);
$("wtEdit").addEventListener("click",function(){input.focus();});
root.addEventListener("mouseenter",function(){hover=true;});
root.addEventListener("mouseleave",function(){hover=false;});
document.addEventListener("keydown",function(e){
var t=e.target&&e.target.tagName,k=e.key;
if(t==="TEXTAREA"||t==="INPUT"||e.ctrlKey||e.metaKey||e.altKey){return;}
if(!isActive()){return;}
if(k===" "||e.code==="Space"){e.preventDefault();spin();}
else if(k==="s"||k==="S"){hideSelected();}
else if(k==="r"||k==="R"){reset();}
else if(k==="e"||k==="E"){e.preventDefault();input.focus();}
else if(k==="f"||k==="F"){fullscreen();}
});
var saved=null;
try{saved=localStorage.getItem(KEY);}catch(e){}
input.value=(saved&&saved.trim())?saved:DEF.join("\n");
renderHistory();
update();
})();
</script>
</div>

## วิธีใช้งานเกมส์วงล้อ

1. **ใส่รายการ** พิมพ์ชื่อหรือตัวเลือกในช่อง "รายการ" โดยพิมพ์ 1 รายการต่อ 1 บรรทัด (กด Enter เพื่อขึ้นบรรทัดใหม่) วงล้อจะอัปเดตทันทีและรองรับสูงสุด 100 รายการ
2. **กดหมุน** คลิกที่วงล้อ หรือกดปุ่ม "หมุน" ตรงกลาง (บนคอมพิวเตอร์กด Space ได้) วงล้อจะหมุนประมาณ 5 วินาทีแล้วค่อยๆ ช้าลงจนหยุด
3. **ดูผลลัพธ์** รายการที่ลูกศร ▼ ชี้อยู่ตอนวงล้อหยุดคือผู้ถูกเลือก ผลจะแสดงในกล่องด้านบนและบันทึกในประวัติ 10 ครั้งล่าสุด
4. **หมุนต่อหรือตัดผู้ถูกเลือกออก** หากต้องการจับรางวัลหลายรอบโดยไม่ให้ซ้ำ ให้กด "ซ่อนรายการที่เลือก" หรือเปิดตัวเลือกซ่อนอัตโนมัติ แล้วหมุนใหม่
5. **เริ่มใหม่** กด "รีเซ็ต" เพื่อคืนรายการตัวอย่างและล้างประวัติ หรือกด "เต็มหน้าจอ" เมื่อต้องการฉายให้คนอื่นดูพร้อมกัน

## คำอธิบายศัพท์และปุ่มต่างๆ

- **วงล้อ (Wheel)** วงกลมที่แบ่งเป็นช่องเท่าๆ กันตามจำนวนรายการ แต่ละช่องมีสีและชื่อรายการของตัวเอง
- **รายการ (Entries)** ชื่อหรือตัวเลือกที่ใส่ในช่องข้อความ ใส่ได้สูงสุด 100 รายการ บรรทัดว่างจะถูกข้าม
- **หมุน (Spin)** สั่งให้วงล้อเริ่มหมุนเพื่อสุ่มหนึ่งรายการ ทำได้โดยคลิกวงล้อ กดปุ่มกลางวงล้อ หรือกด Space
- **ลูกศร ▼ (Pointer)** ตัวชี้ด้านบนวงล้อ ช่องที่อยู่ใต้ลูกศรตอนหยุดหมุนคือผลลัพธ์
- **ผลลัพธ์ (Result)** รายการที่ถูกสุ่มได้ในรอบนั้น แสดงในกล่องสีฟ้าด้านบนของแผงควบคุม
- **ประวัติผลลัพธ์ (History)** รายการผลลัพธ์ 10 ครั้งล่าสุด เรียงจากใหม่ไปเก่า
- **แก้ไข (Edit)** ย้ายเคอร์เซอร์ไปที่ช่องรายการเพื่อพิมพ์เพิ่มหรือแก้ชื่อ ปุ่มลัดคือ E
- **สลับลำดับ (Shuffle)** สับเปลี่ยนตำแหน่งของรายการในวงล้อแบบสุ่ม เหมาะกับการจัดลำดับใหม่ก่อนหมุน
- **ซ่อนรายการที่เลือก (Hide selected)** ลบรายการที่เพิ่งถูกเลือกออกจากวงล้อ ใช้เมื่อไม่ต้องการให้ซ้ำ ปุ่มลัดคือ S
- **ซ่อนอัตโนมัติ (Auto hide)** ตัวเลือกที่ลบรายการผู้ถูกเลือกให้เองทุกครั้งหลังหมุนจบ
- **รีเซ็ต (Reset)** คืนรายการตัวอย่าง ล้างประวัติ และตั้งวงล้อกลับตำแหน่งเริ่มต้น ปุ่มลัดคือ R
- **เต็มหน้าจอ (Fullscreen)** ขยายเครื่องมือให้เต็มจอ เหมาะกับการนำเสนอหรือจับรางวัลหน้าห้อง ปุ่มลัดคือ F
- **เปิดเสียง (Sound)** เล่นเสียงสั้นๆ เมื่อวงล้อหยุดและได้ผลลัพธ์ ปิดได้ด้วยการเอาเครื่องหมายถูกออก
- **ปุ่มลัด (Shortcuts)** คีย์ลัดบนคอมพิวเตอร์ ใช้ได้ขณะเมาส์อยู่บนเครื่องมือ ได้แก่ Space, S, R, E และ F
- **การสุ่ม (Random)** ระบบเลือกผลลัพธ์ด้วยตัวเลขสุ่มจากเบราว์เซอร์ก่อน แล้วจึงหมุนวงล้อให้ไปหยุดที่รายการนั้น ทุกรายการมีโอกาสเท่ากัน
- **การบันทึกอัตโนมัติ** รายการที่พิมพ์จะถูกเก็บไว้ในเบราว์เซอร์ของคุณเอง ไม่ถูกส่งไปที่เซิร์ฟเวอร์