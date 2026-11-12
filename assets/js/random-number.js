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
