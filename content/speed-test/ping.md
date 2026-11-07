---
title: "ทดสอบ ping"
seoTitle: "ทดสอบ ping ออนไลน์ ฟรี"
h1: "ทดสอบ ping"
description: "ทดสอบ ping ฟรี วัดความหน่วงเครือข่ายจากเบราว์เซอร์ ดูค่า ping ต่ำสุด สูงสุด เฉลี่ย และความเสถียรของเน็ต ก่อนเล่นเกมหรือประชุมออนไลน์ ไม่ต้องติดตั้งโปรแกรม"
icon: "📱"
category: "device"
weight: 17
byline: true
date: 2026-11-05
lastmod: 2026-11-07
draft: false
---

<style>
.pg{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:16px;margin:16px 0}
.pg [hidden]{display:none!important}
.pg-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
.pg-bar select,.pg-btn{font:inherit;padding:8px 14px;border-radius:8px;border:1px solid rgba(128,128,128,.5);background:transparent;color:inherit;cursor:pointer}
.pg-main{background:#2563eb!important;border-color:#2563eb!important;color:#fff!important}
.pg-stop{background:#dc2626!important;border-color:#dc2626!important;color:#fff!important}
.pg-tabs{margin-left:auto;display:flex;gap:6px}
.pg-tab.on{background:rgba(128,128,128,.22);font-weight:600}
.pg-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin-bottom:12px}
.pg-stats div{border:1px solid rgba(128,128,128,.3);border-radius:8px;padding:8px;text-align:center}
.pg-stats small{display:block;opacity:.7;font-size:.8em}
.pg-stats b{font-size:1.1em}
#pg-cv{width:100%;height:220px;display:block}
#pg-term{height:220px;overflow:auto;margin:0;padding:10px;background:#0f172a;color:#4ade80;border-radius:8px;font:13px/1.5 monospace;white-space:pre-wrap}
.pg-legend{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:10px;font-size:.85em}
.pg-legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px}
.pg-legend button{margin-left:auto;font:inherit;padding:4px 12px;border-radius:6px;border:1px solid rgba(128,128,128,.5);background:transparent;color:inherit;cursor:pointer}
.pg-note{margin:10px 0 0;font-size:.85em;opacity:.75}
</style>

<div class="pg">
<div class="pg-bar">
<select id="pg-dur" aria-label="ระยะเวลาทดสอบ">
<option value="0">ไม่จำกัดเวลา</option>
<option value="5">5 วินาที</option>
<option value="10" selected>10 วินาที</option>
<option value="60">1 นาที</option>
<option value="600">10 นาที</option>
</select>
<button type="button" id="pg-go" class="pg-btn pg-main">เริ่มทดสอบ</button>
<div class="pg-tabs">
<button type="button" id="pg-v1" class="pg-btn pg-tab on">แผนภูมิ</button>
<button type="button" id="pg-v2" class="pg-btn pg-tab">เทอร์มินัล</button>
</div>
</div>
<div class="pg-stats">
<div><small>มัธยฐาน</small><b id="pg-med">--</b></div>
<div><small>ต่ำสุด / สูงสุด</small><b id="pg-mm">-- / --</b></div>
<div><small>ค่าเฉลี่ย</small><b id="pg-avg">--</b></div>
<div><small>ส่วนเบี่ยงเบนมาตรฐาน</small><b id="pg-sd">--</b></div>
<div><small>จำนวนครั้ง</small><b id="pg-n">--</b></div>
<div><small>อัตราความสำเร็จ</small><b id="pg-ok">--</b></div>
</div>
<canvas id="pg-cv"></canvas>
<pre id="pg-term" hidden></pre>
<div class="pg-legend">
<span><i style="background:#16a34a"></i>&lt;50</span>
<span><i style="background:#ca8a04"></i>&lt;100</span>
<span><i style="background:#ea580c"></i>&lt;300</span>
<span><i style="background:#dc2626"></i>&ge;300</span>
<span><i style="background:#6b7280"></i>หมดเวลา</span>
<button type="button" id="pg-copy">คัดลอก</button>
</div>
<p class="pg-note">เปิดแท็บนี้ไว้ขณะทดสอบ การสลับแอปหรือล็อกหน้าจออาจทำให้การทดสอบหยุดชั่วคราว</p>
</div>

<script>
(function () {
var $ = function (i) { return document.getElementById(i); };
var ENDPOINT = 'https://www.cloudflare.com/cdn-cgi/trace';
var TIMEOUT = 3000, GAP = 1000, MAXLOG = 300, SHOW = 60;
var running = false, timer = null, samples = [], logs = [], t0run = 0, limit = 0;
var COL = { ok: '#16a34a', fair: '#ca8a04', slow: '#ea580c', bad: '#dc2626', off: '#6b7280' };
function color(v) {
if (v === null) return COL.off;
if (50 > v) return COL.ok;
if (100 > v) return COL.fair;
if (300 > v) return COL.slow;
return COL.bad;
}
function fmt(n) { return (n === null || n === undefined) ? '--' : (Math.round(n * 10) / 10).toFixed(1); }
function ms(n) { return (n === null || n === undefined) ? '--' : fmt(n) + ' ms'; }
function g(s, k) { return s[k] === undefined ? null : s[k]; }
function once() {
var c = new AbortController();
var to = setTimeout(function () { c.abort(); }, TIMEOUT);
var s = performance.now();
var url = ENDPOINT + '?_=' + Date.now() + '.' + Math.floor(Math.random() * 1000000);
return fetch(url, { mode: 'no-cors', cache: 'no-store', credentials: 'omit', signal: c.signal })
.then(function () { clearTimeout(to); return performance.now() - s; })
.catch(function () { clearTimeout(to); return null; });
}
function stats() {
var ok = samples.filter(function (v) { return v !== null; });
var n = ok.length;
var r = { count: samples.length, rate: samples.length === 0 ? null : n * 100 / samples.length };
if (n === 0) return r;
var sorted = ok.slice().sort(function (a, b) { return a - b; });
var mid = Math.floor(n / 2);
r.med = (n % 2) ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
r.min = sorted[0];
r.max = sorted[n - 1];
r.avg = ok.reduce(function (a, b) { return a + b; }, 0) / n;
r.sd = Math.sqrt(ok.reduce(function (a, b) { return a + (b - r.avg) * (b - r.avg); }, 0) / n);
return r;
}
function paint() {
var s = stats();
$('pg-med').textContent = ms(g(s, 'med'));
$('pg-mm').textContent = s.min === undefined ? '-- / --' : fmt(s.min) + ' / ' + fmt(s.max) + ' ms';
$('pg-avg').textContent = ms(g(s, 'avg'));
$('pg-sd').textContent = ms(g(s, 'sd'));
$('pg-n').textContent = s.count === 0 ? '--' : s.count;
$('pg-ok').textContent = s.rate === null ? '--' : fmt(s.rate) + '%';
}
function draw() {
var cv = $('pg-cv');
if (cv.hidden) return;
var dpr = window.devicePixelRatio || 1;
var w = cv.clientWidth, h = cv.clientHeight;
if (!w || !h) return;
cv.width = w * dpr;
cv.height = h * dpr;
var ctx = cv.getContext('2d');
ctx.scale(dpr, dpr);
ctx.clearRect(0, 0, w, h);
var txt = getComputedStyle(cv).color;
var data = samples.slice(-SHOW);
var mx = 100;
data.forEach(function (v) { if (v !== null && v > mx) mx = v; });
mx = Math.ceil(mx * 1.15 / 50) * 50;
var L = 40, R = 8, T = 10, B = 18, pw = w - L - R, ph = h - T - B;
ctx.font = '11px sans-serif';
ctx.textAlign = 'right';
ctx.fillStyle = txt;
ctx.strokeStyle = 'rgba(128,128,128,.3)';
ctx.lineWidth = 1;
for (var i = 0; i !== 5; i++) {
var yy = T + ph * i / 4;
ctx.beginPath();
ctx.moveTo(L, yy);
ctx.lineTo(w - R, yy);
ctx.stroke();
ctx.fillText(String(Math.round(mx * (4 - i) / 4)), L - 4, yy + 4);
}
function px(i) { return L + i * pw / (SHOW - 1); }
function py(v) { return T + ph * (1 - Math.min(v, mx) / mx); }
ctx.lineWidth = 2;
ctx.strokeStyle = 'rgba(128,128,128,.6)';
ctx.beginPath();
var pen = false;
data.forEach(function (v, i) {
if (v === null) { pen = false; return; }
if (pen) { ctx.lineTo(px(i), py(v)); } else { ctx.moveTo(px(i), py(v)); pen = true; }
});
ctx.stroke();
data.forEach(function (v, i) {
ctx.fillStyle = color(v);
ctx.beginPath();
ctx.arc(px(i), v === null ? T + ph : py(v), 3.5, 0, Math.PI * 2);
ctx.fill();
});
}
function addLog(v) {
logs.push('#' + samples.length + '  ' + (v === null ? 'timeout' : 'time=' + fmt(v) + ' ms'));
if (logs.length > MAXLOG) logs.shift();
var t = $('pg-term');
t.textContent = logs.join('\n');
t.scrollTop = t.scrollHeight;
}
function loop() {
if (!running) return;
var s = performance.now();
once().then(function (v) {
if (!running) return;
samples.push(v);
addLog(v);
paint();
draw();
if (limit !== 0 && performance.now() - t0run >= limit * 1000) { stop(); return; }
timer = setTimeout(loop, Math.max(0, GAP - (performance.now() - s)));
});
}
function start() {
samples = [];
logs = [];
$('pg-term').textContent = '';
limit = parseInt($('pg-dur').value, 10) || 0;
running = true;
t0run = performance.now();
$('pg-go').textContent = 'หยุด';
$('pg-go').className = 'pg-btn pg-stop';
$('pg-dur').disabled = true;
paint();
draw();
loop();
}
function stop() {
running = false;
clearTimeout(timer);
$('pg-go').textContent = 'เริ่มทดสอบ';
$('pg-go').className = 'pg-btn pg-main';
$('pg-dur').disabled = false;
}
function setView(v) {
$('pg-cv').hidden = v !== 'chart';
$('pg-term').hidden = v !== 'term';
$('pg-v1').className = 'pg-btn pg-tab' + (v === 'chart' ? ' on' : '');
$('pg-v2').className = 'pg-btn pg-tab' + (v === 'term' ? ' on' : '');
draw();
}
function copy() {
if (logs.length === 0) return;
var s = stats();
var t = logs.join('\n') + '\n---\nmedian ' + fmt(g(s, 'med')) + ' ms | min ' + fmt(g(s, 'min')) + ' | max ' + fmt(g(s, 'max')) + ' | avg ' + fmt(g(s, 'avg')) + ' | sd ' + fmt(g(s, 'sd')) + ' | success ' + (s.rate === null ? '--' : fmt(s.rate) + '%');
function done() {
var b = $('pg-copy');
b.textContent = 'คัดลอกแล้ว ✓';
setTimeout(function () { b.textContent = 'คัดลอก'; }, 1500);
}
function fallback() {
var a = document.createElement('textarea');
a.value = t;
document.body.appendChild(a);
a.select();
try { document.execCommand('copy'); done(); } catch (e) {}
document.body.removeChild(a);
}
if (navigator.clipboard && navigator.clipboard.writeText) {
navigator.clipboard.writeText(t).then(done, fallback);
} else {
fallback();
}
}
$('pg-go').addEventListener('click', function () { if (running) { stop(); } else { start(); } });
$('pg-v1').addEventListener('click', function () { setView('chart'); });
$('pg-v2').addEventListener('click', function () { setView('term'); });
$('pg-copy').addEventListener('click', copy);
window.addEventListener('resize', draw);
draw();
})();
</script>

## วิธีใช้งานเครื่องมือทดสอบ ping

1. **เลือกระยะเวลาทดสอบ** จากเมนูด้านซ้ายบน มีให้เลือกตั้งแต่ 5 วินาที, 10 วินาที, 1 นาที, 10 นาที หรือไม่จำกัดเวลา
2. **กดปุ่ม "เริ่มทดสอบ"** เครื่องมือจะส่งคำขอไปยังเซิร์ฟเวอร์ปลายทางทุก 1 วินาที แล้ววัดเวลาที่ใช้ไปกลับ
3. **ดูผลแบบเรียลไทม์** สลับดูได้ 2 มุมมอง คือ "แผนภูมิ" ที่แสดงกราฟเส้นและจุดสีตามระดับความหน่วง และ "เทอร์มินัล" ที่แสดงผลทีละบรรทัดคล้ายคำสั่ง ping
4. **อ่านค่าสถิติ** ด้านบนของกราฟ เช่น มัธยฐาน ค่าเฉลี่ย ต่ำสุด/สูงสุด และอัตราความสำเร็จ
5. **กดปุ่ม "หยุด"** เมื่อต้องการจบการทดสอบก่อนเวลา หรือรอให้ครบตามระยะเวลาที่เลือก
6. **กด "คัดลอก"** เพื่อเก็บผลการทดสอบไปแปะในแชตหรือส่งให้ผู้ให้บริการอินเทอร์เน็ต

เคล็ดลับ: ควรเปิดแท็บนี้ค้างไว้ตลอดการทดสอบ และปิดแอปที่กำลังดาวน์โหลดหรืออัปโหลดไฟล์ เพื่อให้ผลตรงกับสภาพเครือข่ายจริง

## วิธีอ่านผลค่า ping

| ค่า ping | ระดับ | ความหมาย |
| --- | --- | --- |
| น้อยกว่า 50 ms | ดีมาก | เหมาะกับเกมออนไลน์และการประชุมวิดีโอ |
| 50 - 99 ms | ดี | ใช้งานทั่วไปและเล่นเกมได้ลื่น |
| 100 - 299 ms | พอใช้ | อาจรู้สึกหน่วงในเกมที่ต้องตอบสนองเร็ว |
| 300 ms ขึ้นไป | แย่ | หน่วงชัดเจน ภาพและเสียงอาจกระตุก |
| หมดเวลา | ไม่ตอบสนอง | เครือข่ายหลุดหรือไม่เสถียร |

ถ้าเส้นในแผนภูมิค่อนข้างเรียบ แสดงว่าเครือข่ายเสถียร แต่ถ้าเส้นขึ้นลงแรงหรือมีจุดหมดเวลาบ่อย แสดงว่าการเชื่อมต่อมีปัญหา

## อธิบายศัพท์ที่ใช้ในเครื่องมือ

- **Ping**: การส่งสัญญาณไปยังเซิร์ฟเวอร์แล้ววัดเวลาที่ใช้จนได้รับการตอบกลับ ยิ่งค่าน้อยยิ่งตอบสนองเร็ว
- **Latency (ความหน่วง)**: เวลาที่ข้อมูลเดินทางไปกลับระหว่างอุปกรณ์ของคุณกับเซิร์ฟเวอร์ ในที่นี้มีความหมายใกล้เคียงกับค่า ping
- **ms (มิลลิวินาที)**: หน่วยวัดเวลา 1,000 ms เท่ากับ 1 วินาที
- **มัธยฐาน (Median)**: ค่ากลางเมื่อเรียงผลการทดสอบจากน้อยไปมาก ไม่ถูกค่าที่สูงผิดปกติเพียงครั้งเดียวดึงไปมาก จึงสะท้อนความหน่วงปกติได้ดี
- **ต่ำสุด / สูงสุด (Min / Max)**: ค่า ping ที่เร็วที่สุดและช้าที่สุดตลอดการทดสอบ
- **ค่าเฉลี่ย (Average)**: ผลรวมของค่า ping ทั้งหมดหารด้วยจำนวนครั้งที่ได้รับการตอบกลับ
- **ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)**: ตัวเลขที่บอกว่าค่า ping แกว่งจากค่าเฉลี่ยมากแค่ไหน ยิ่งน้อยยิ่งเสถียร
- **Jitter**: ความแปรปรวนของค่า ping ระหว่างแต่ละครั้ง ถ้าสูงจะทำให้เกมสะดุดและเสียงในการประชุมขาดหาย
- **จำนวนครั้ง (Count)**: จำนวนคำขอ ping ที่ส่งออกไปทั้งหมดในรอบการทดสอบนี้
- **อัตราความสำเร็จ (Success rate)**: เปอร์เซ็นต์ของคำขอที่ได้รับการตอบกลับภายในเวลาที่กำหนด ถ้าต่ำกว่า 100% แสดงว่ามีข้อมูลสูญหาย
- **หมดเวลา (Timeout)**: คำขอที่ไม่ได้รับการตอบกลับภายใน 3 วินาที นับเป็นการทดสอบที่ล้มเหลว
- **Packet loss**: การที่ข้อมูลสูญหายระหว่างทาง ในเครื่องมือนี้ดูได้จากอัตราความสำเร็จที่ลดลง
- **แผนภูมิ**: กราฟแสดงค่า ping ล่าสุด 60 ครั้ง จุดสีเขียว เหลือง ส้ม แดง แสดงระดับความหน่วง และจุดสีเทาที่ฐานกราฟคือหมดเวลา
- **เทอร์มินัล**: มุมมองแบบข้อความที่แสดงผลแต่ละครั้งเรียงเป็นบรรทัด คล้ายการรันคำสั่ง ping ในคอมพิวเตอร์

## ข้อควรรู้

เครื่องมือนี้ทำงานบนเบราว์เซอร์ จึงวัดเวลาตอบกลับของคำขอ HTTPS ไปยังเซิร์ฟเวอร์ของ Cloudflare ซึ่งอาจสูงกว่าผลจากคำสั่ง ping (ICMP) ในคอมพิวเตอร์เล็กน้อย แต่ใช้เปรียบเทียบคุณภาพเครือข่ายก่อนและหลังแก้ปัญหาได้ดี เช่น ลองทดสอบผ่าน Wi-Fi เทียบกับสายแลน หรือเทียบช่วงเวลาที่คนใช้เน็ตมากกับน้อย