---
title: "ตัวสุ่มตัวเลข"
seoTitle: "ตัวสุ่มตัวเลข ออนไลน์ ฟรี"
h1: "ตัวสุ่มตัวเลข"
description: "ตัวสุ่มตัวเลขออนไลน์ฟรี กำหนดช่วงตัวเลขและจำนวนผลลัพธ์ได้เอง เลือกไม่ซ้ำกันได้ สุ่มแบบเข้ารหัส ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งหรือสมัครสมาชิก"
icon: "🔢"
category: "random"
weight: 29
byline: true
date: 2026-11-05
lastmod: 2026-11-10
draft: false
---

<style>
.rn-tool{--rn-b:rgba(128,128,128,.4);margin:1rem 0 2rem}
.rn-row{display:flex;flex-wrap:wrap;align-items:flex-end;gap:.5rem}
.rn-field{display:flex;flex-direction:column;gap:.25rem;font-size:.9rem;flex:1 1 7rem}
.rn-field input{font:inherit;padding:.6rem .7rem;border:1px solid var(--rn-b);border-radius:.5rem;background:transparent;color:inherit;width:100%;box-sizing:border-box}
.rn-sep{padding-bottom:.7rem;opacity:.7}
.rn-check{display:inline-flex;gap:.5rem;align-items:center;margin:.75rem 0;cursor:pointer}
.rn-btn{display:block;width:100%;font:inherit;font-weight:600;padding:.8rem 1rem;border:0;border-radius:.6rem;background:#2563eb;color:#fff;cursor:pointer}
.rn-btn:hover{background:#1d4ed8}
.rn-ghost{font:inherit;padding:.4rem .8rem;border:1px solid var(--rn-b);border-radius:.5rem;background:transparent;color:inherit;cursor:pointer}
.rn-ghost:disabled{opacity:.5;cursor:default}
.rn-error{color:#dc2626;margin:.5rem 0 0}
.rn-error[hidden]{display:none}
.rn-result{margin-top:1rem;padding:1rem;border:1px solid var(--rn-b);border-radius:.75rem}
.rn-out{min-height:3rem;display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;max-height:16rem;overflow:auto}
.rn-big{font-size:3.5rem;font-weight:700;justify-content:center;line-height:1.2;word-break:break-all}
.rn-chip{padding:.25rem .6rem;border:1px solid var(--rn-b);border-radius:999px;font-variant-numeric:tabular-nums}
.rn-actions{margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap}
.rn-history{margin:.5rem 0 0;padding-left:1.25rem;font-size:.9rem;word-break:break-word}
.rn-history li{margin:.25rem 0}
</style>
<div class="rn-tool" id="rn-tool">
<div class="rn-row">
<label class="rn-field"><span>ค่าต่ำสุด (Min)</span><input type="number" id="rn-min" value="1" min="0" max="999999" step="1" inputmode="numeric"></label>
<span class="rn-sep">~</span>
<label class="rn-field"><span>ค่าสูงสุด (Max)</span><input type="number" id="rn-max" value="100" min="0" max="999999" step="1" inputmode="numeric"></label>
<span class="rn-sep">x</span>
<label class="rn-field"><span>จำนวนผลลัพธ์</span><input type="number" id="rn-count" value="1" min="1" max="1000" step="1" inputmode="numeric"></label>
</div>
<label class="rn-check"><input type="checkbox" id="rn-unique"><span>ไม่ซ้ำกัน</span></label>
<button type="button" id="rn-go" class="rn-btn">สุ่มตัวเลข</button>
<p id="rn-error" class="rn-error" role="alert" hidden></p>
<div class="rn-result">
<h3>ผลลัพธ์</h3>
<div id="rn-out" class="rn-out" aria-live="polite">—</div>
<div class="rn-actions"><button type="button" id="rn-copy" class="rn-ghost" disabled>คัดลอกผลลัพธ์</button></div>
</div>
<h3>ประวัติการสุ่ม</h3>
<div class="rn-actions"><button type="button" id="rn-clear" class="rn-ghost" disabled>ล้างประวัติ</button></div>
<ol id="rn-history" class="rn-history"></ol>
<script>
(function () {
'use strict';
var MAX_RANGE = 999999;
var MAX_COUNT = 1000;
var minEl = document.getElementById('rn-min');
var maxEl = document.getElementById('rn-max');
var countEl = document.getElementById('rn-count');
var uniqueEl = document.getElementById('rn-unique');
var goEl = document.getElementById('rn-go');
var errEl = document.getElementById('rn-error');
var outEl = document.getElementById('rn-out');
var copyEl = document.getElementById('rn-copy');
var clearEl = document.getElementById('rn-clear');
var histEl = document.getElementById('rn-history');
var history = [];
var lastText = '';
function hasCrypto() {
return !!(window.crypto && window.crypto.getRandomValues);
}
function randBelow(n) {
var buf = new Uint32Array(1);
var limit = Math.floor(4294967296 / n) * n;
do {
window.crypto.getRandomValues(buf);
} while (buf[0] >= limit);
return buf[0] % n;
}
function readInt(el) {
var v = String(el.value).trim();
if (!/^-?[0-9]+$/.test(v)) { return NaN; }
return parseInt(v, 10);
}
function showError(msg) {
errEl.textContent = msg;
errEl.hidden = false;
}
function clearError() {
errEl.textContent = '';
errEl.hidden = true;
}
function renderResult(res) {
outEl.textContent = '';
if (res.length === 1) {
outEl.className = 'rn-out rn-big';
outEl.textContent = String(res[0]);
return;
}
outEl.className = 'rn-out';
var frag = document.createDocumentFragment();
for (var i = 0; res.length > i; i++) {
var chip = document.createElement('span');
chip.className = 'rn-chip';
chip.textContent = String(res[i]);
frag.appendChild(chip);
}
outEl.appendChild(frag);
}
function renderHistory() {
histEl.textContent = '';
for (var i = 0; history.length > i; i++) {
var h = history[i];
var li = document.createElement('li');
var shown = h.res.slice(0, 30).join(', ');
if (h.res.length > 30) { shown += ' … (+' + (h.res.length - 30) + ')'; }
li.textContent = h.time + ' · ' + h.min + ' ~ ' + h.max + (h.unique ? ' · ไม่ซ้ำ' : '') + ' → ' + shown;
histEl.appendChild(li);
}
clearEl.disabled = history.length === 0;
}
function generate() {
clearError();
if (!hasCrypto()) {
showError('เบราว์เซอร์นี้ไม่รองรับการสุ่มแบบเข้ารหัส กรุณาอัปเดตหรือเปลี่ยนเบราว์เซอร์');
return;
}
var min = readInt(minEl);
var max = readInt(maxEl);
var count = readInt(countEl);
var unique = uniqueEl.checked;
if (isNaN(min) || isNaN(max) || isNaN(count)) {
showError('กรุณากรอกตัวเลขจำนวนเต็มให้ครบทุกช่อง');
return;
}
if (0 > min || 0 > max || min > MAX_RANGE || max > MAX_RANGE) {
showError('ช่วงตัวเลขที่รองรับคือ 0 ~ 999999');
return;
}
if (min > max) {
showError('ค่าต่ำสุดต้องไม่มากกว่าค่าสูงสุด');
return;
}
if (1 > count || count > MAX_COUNT) {
showError('จำนวนผลลัพธ์ต้องอยู่ระหว่าง 1 ~ 1,000');
return;
}
var n = max - min + 1;
if (unique && count > n) {
showError('ช่วงนี้มีตัวเลขเพียง ' + n + ' ตัว จึงสุ่มแบบไม่ซ้ำ ' + count + ' ตัวไม่ได้');
return;
}
var res = [];
if (unique) {
var map = new Map();
for (var i = 0; count > i; i++) {
var j = i + randBelow(n - i);
var vi = map.has(i) ? map.get(i) : i;
var vj = map.has(j) ? map.get(j) : j;
map.set(j, vi);
res.push(min + vj);
}
} else {
for (var k = 0; count > k; k++) {
res.push(min + randBelow(n));
}
}
renderResult(res);
lastText = res.join(', ');
copyEl.disabled = false;
history.unshift({
time: new Date().toLocaleTimeString('th-TH'),
min: min,
max: max,
unique: unique,
res: res
});
if (history.length > 10) { history.pop(); }
renderHistory();
}
function fallbackCopy(text) {
var ta = document.createElement('textarea');
ta.value = text;
ta.setAttribute('readonly', '');
ta.style.position = 'fixed';
ta.style.top = '-1000px';
document.body.appendChild(ta);
ta.select();
try { document.execCommand('copy'); } catch (e) { /* ignore */ }
document.body.removeChild(ta);
}
function flashCopied() {
var old = copyEl.textContent;
copyEl.textContent = 'คัดลอกแล้ว ✓';
setTimeout(function () { copyEl.textContent = old; }, 1500);
}
function copyResult() {
if (!lastText) { return; }
if (navigator.clipboard) {
navigator.clipboard.writeText(lastText).then(flashCopied, function () {
fallbackCopy(lastText);
flashCopied();
});
} else {
fallbackCopy(lastText);
flashCopied();
}
}
goEl.addEventListener('click', generate);
copyEl.addEventListener('click', copyResult);
clearEl.addEventListener('click', function () {
history = [];
renderHistory();
});
[minEl, maxEl, countEl].forEach(function (el) {
el.addEventListener('keydown', function (e) {
if (e.key === 'Enter') { generate(); }
});
});
})();
</script>
</div>

## วิธีใช้งานตัวสุ่มตัวเลข

1. กรอก **ค่าต่ำสุด (Min)** และ **ค่าสูงสุด (Max)** เพื่อกำหนดช่วงที่ต้องการสุ่ม เช่น 1 ถึง 100
2. กรอก **จำนวนผลลัพธ์** ว่าต้องการสุ่มกี่ตัว (สูงสุด 1,000 ตัว)
3. หากไม่ต้องการให้มีเลขซ้ำกัน ให้ติ๊กช่อง **ไม่ซ้ำกัน**
4. กดปุ่ม **สุ่มตัวเลข** (หรือกด Enter) ผลลัพธ์จะแสดงในช่อง "ผลลัพธ์" ทันที
5. กด **คัดลอกผลลัพธ์** เพื่อนำตัวเลขไปวางที่อื่น ผลลัพธ์หลายตัวจะคั่นด้วยเครื่องหมายจุลภาค
6. ดูการสุ่มย้อนหลังได้ที่ **ประวัติการสุ่ม** (เก็บล่าสุด 10 ครั้ง) และกด **ล้างประวัติ** เมื่อไม่ต้องการ

ช่วงตัวเลขที่รองรับคือ 0 ~ 999999 ประวัติการสุ่มจะหายเมื่อรีเฟรชหน้า เพราะข้อมูลทั้งหมดประมวลผลในเบราว์เซอร์ของคุณเท่านั้น

## คำอธิบายศัพท์

- **ค่าต่ำสุด (Min)** คือตัวเลขที่น้อยที่สุดที่อาจถูกสุ่มได้ และรวมค่านี้ไว้ในช่วงด้วย
- **ค่าสูงสุด (Max)** คือตัวเลขที่มากที่สุดที่อาจถูกสุ่มได้ และรวมค่านี้ไว้ในช่วงด้วย
- **จำนวนผลลัพธ์** คือจำนวนตัวเลขที่ต้องการให้สุ่มออกมาในการกดหนึ่งครั้ง
- **ไม่ซ้ำกัน (Unique)** คือโหมดที่ตัวเลขแต่ละตัวจะออกมาได้เพียงครั้งเดียว เหมาะกับการจับสลากหรือสุ่มลำดับ แต่จำนวนผลลัพธ์ต้องไม่มากกว่าจำนวนเลขในช่วง
- **Random Number Generator (RNG)** คือเครื่องมือหรืออัลกอริทึมที่สร้างตัวเลขโดยไม่มีรูปแบบให้คาดเดาได้
- **การสุ่มแบบเข้ารหัส (Cryptographically secure)** คือการสุ่มที่ใช้ฟังก์ชัน `crypto.getRandomValues` ของเบราว์เซอร์ ซึ่งคาดเดาได้ยากกว่าวิธีสุ่มทั่วไป
- **Math.random** คือฟังก์ชันสุ่มพื้นฐานของ JavaScript ซึ่งเร็วแต่ไม่ได้ออกแบบมาสำหรับงานที่ต้องการความปลอดภัย เครื่องมือนี้จึงไม่ใช้
- **Mersenne-Twister (MT)** คืออัลกอริทึมสุ่มที่นิยมในหลายภาษาโปรแกรม แต่ไม่ปลอดภัยพอสำหรับงานเข้ารหัสลับ
- **ประวัติการสุ่ม** คือรายการผลลัพธ์ล่าสุดที่เก็บไว้ชั่วคราวในหน้าเว็บ เพื่อให้เปิดดูย้อนหลังได้