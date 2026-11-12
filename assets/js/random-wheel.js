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
