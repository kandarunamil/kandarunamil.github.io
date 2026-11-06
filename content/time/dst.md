---
title: "เวลาออมแสง (DST)"
seoTitle: "เวลาออมแสง (DST) ออนไลน์ ฟรี"
h1: "เวลาออมแสง (DST)"
description: "ตรวจสอบวันเปลี่ยนเวลาออมแสง (DST) ครั้งต่อไปในเขตเวลาของคุณ นาฬิกาเดินหน้าหรือถอยหลัง พร้อมเทียบความต่างของเวลากับเมืองทั่วโลก ใช้ฟรีบนมือถือและคอมพิวเตอร์"
icon: "🕒"
category: "time"
weight: 9
byline: true
date: 2026-11-05
lastmod: 2026-11-06
draft: false
---
<div class="dst-tool" id="dst-tool">
<div class="dst-bar">
<label for="dst-zone">เขตเวลา</label>
<select id="dst-zone"></select>
<button type="button" id="dst-me">ใช้เขตเวลาของฉัน</button>
</div>
<div class="dst-now">
<div class="dst-now-time" id="dst-now-time">--:--:--</div>
<div class="dst-now-sub" id="dst-now-sub"></div>
</div>
<div class="dst-card" id="dst-result"></div>
<h2 class="dst-h">ภาพนาฬิกาช่วงที่เปลี่ยนเวลา</h2>
<div class="dst-strip" id="dst-strip"></div>
<h2 class="dst-h">ความต่างของเวลาเปลี่ยนอย่างไร</h2>
<div class="dst-scroll"><table class="dst-table" id="dst-diff"></table></div>
<h2 class="dst-h">การเปลี่ยนเวลาครั้งต่อไปในแต่ละประเทศ</h2>
<div class="dst-scroll"><table class="dst-table" id="dst-list"></table></div>
</div>
<style>
.dst-tool{margin:1rem 0;font-size:1rem;line-height:1.6}
.dst-tool *{box-sizing:border-box}
.dst-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-bottom:1rem}
.dst-bar select{flex:1 1 220px;min-width:0;padding:.55rem .7rem;border:1px solid rgba(127,127,127,.45);border-radius:8px;background:transparent;color:inherit;font:inherit}
.dst-bar button{padding:.55rem .9rem;border:1px solid rgba(127,127,127,.45);border-radius:8px;background:rgba(127,127,127,.12);color:inherit;font:inherit;cursor:pointer}
.dst-now{text-align:center;padding:1rem;border-radius:12px;background:rgba(127,127,127,.08);margin-bottom:1rem}
.dst-now-time{font-size:2.4rem;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.02em}
.dst-now-sub{opacity:.75;font-size:.95rem}
.dst-card{padding:1rem;border:1px solid rgba(127,127,127,.35);border-radius:12px;margin-bottom:1rem}
.dst-badge{display:inline-block;padding:.1rem .6rem;border-radius:999px;font-size:.85rem;font-weight:600;background:rgba(127,127,127,.18)}
.dst-big{font-size:1.25rem;font-weight:700;margin:.4rem 0}
.dst-count{font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums;margin:.3rem 0}
.dst-muted{opacity:.75;font-size:.95rem}
.dst-h{font-size:1.2rem;margin:1.6rem 0 .6rem}
.dst-strip{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.3rem}
.dst-cell{flex:1 0 84px;text-align:center;padding:.6rem .3rem;border:1px solid rgba(127,127,127,.35);border-radius:10px}
.dst-cell b{display:block;font-size:1.2rem;font-variant-numeric:tabular-nums}
.dst-cell small{opacity:.7}
.dst-cell.hit{border-width:2px;background:rgba(127,127,127,.14)}
.dst-scroll{overflow-x:auto}
.dst-table{width:100%;border-collapse:collapse;min-width:520px}
.dst-table th,.dst-table td{padding:.5rem .6rem;text-align:left;border-bottom:1px solid rgba(127,127,127,.3);vertical-align:top}
.dst-table th{font-size:.9rem;opacity:.8}
</style>
<script>
(function () {
var DAY = 86400000, HR = 3600000, MIN = 60000;
var PLACES = [
["America/New_York", "สหรัฐอเมริกา (นิวยอร์ก)"],
["America/Chicago", "สหรัฐอเมริกา (ชิคาโก)"],
["America/Los_Angeles", "สหรัฐอเมริกา (ลอสแอนเจลิส)"],
["America/Toronto", "แคนาดา (โทรอนโต)"],
["America/Mexico_City", "เม็กซิโก"],
["America/Sao_Paulo", "บราซิล"],
["America/Santiago", "ชิลี"],
["Europe/London", "สหราชอาณาจักร"],
["Europe/Berlin", "เยอรมนี"],
["Europe/Athens", "กรีซ"],
["Africa/Cairo", "อียิปต์"],
["Asia/Bangkok", "ไทย"],
["Asia/Tokyo", "ญี่ปุ่น"],
["Australia/Sydney", "ออสเตรเลีย (ซิดนีย์)"],
["Pacific/Auckland", "นิวซีแลนด์"],
["Pacific/Honolulu", "ฮาวาย"]
];
var DIFFS = [
["America/New_York", "นิวยอร์ก"],
["Europe/London", "ลอนดอน"],
["Europe/Berlin", "เบอร์ลิน"],
["Australia/Sydney", "ซิดนีย์"]
];
var $ = function (id) { return document.getElementById(id); };
var sel = $("dst-zone");
var dtfCache = {}, dateCache = {}, nextCache = {};
var current = null;
function pad(n) { return (n > 9 ? "" : "0") + n; }
function offsetMin(tz, ms) {
if (!dtfCache[tz]) {
dtfCache[tz] = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
}
var o = {};
dtfCache[tz].formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = p.value; });
var h = +o.hour;
if (h === 24) { h = 0; }
var asUtc = Date.UTC(+o.year, +o.month - 1, +o.day, h, +o.minute, +o.second);
return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / MIN);
}
function scan(tz, startMs, days) {
var a = offsetMin(tz, startMs);
for (var i = 0; i !== days; i++) {
var t1 = startMs + (i + 1) * DAY;
var b = offsetMin(tz, t1);
if (b !== a) {
var lo = t1 - DAY, hi = t1;
while (hi - lo > 1) {
var mid = Math.floor((lo + hi) / 2);
if (offsetMin(tz, mid) === a) { lo = mid; } else { hi = mid; }
}
return { t: hi, before: a, after: offsetMin(tz, hi) };
}
}
return null;
}
function nextOf(tz) {
if (!nextCache[tz]) { nextCache[tz] = { v: scan(tz, Date.now(), 830) }; }
return nextCache[tz].v;
}
function fmtOff(m) {
var s = m >= 0 ? "+" : "-";
var a = Math.abs(m), h = Math.floor(a / 60), mm = a % 60;
return "UTC" + s + h + (mm ? ":" + pad(mm) : "");
}
function fmtDur(m) {
var a = Math.abs(m), h = Math.floor(a / 60), mm = a % 60;
return (h ? h + " ชั่วโมง" : "") + (h && mm ? " " : "") + (mm ? mm + " นาที" : "");
}
function fmtHM(ms, off) {
var d = new Date(ms + off * MIN);
return pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes());
}
function fmtDate(ms, tz) {
if (!dateCache[tz]) {
dateCache[tz] = new Intl.DateTimeFormat("th-TH-u-ca-gregory-nu-latn", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
return dateCache[tz].format(new Date(ms));
}
function fmtDiff(m) {
if (m === 0) { return "เวลาเท่ากัน"; }
return (m > 0 ? "เร็วกว่า " : "ช้ากว่า ") + fmtDur(m);
}
function changeText(r) {
var fwd = r.after > r.before;
return (fwd ? "เดินหน้า " : "ถอยหลัง ") + fmtDur(r.after - r.before) + " (" + fmtHM(r.t, r.before) + " → " + fmtHM(r.t, r.after) + ")";
}
function countdown(ms) {
var s = Math.floor(Math.abs(ms) / 1000);
var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
return d + " วัน " + pad(h) + ":" + pad(m) + ":" + pad(sec);
}
function renderNow() {
var tz = sel.value, now = Date.now();
var d = new Date(now + offsetMin(tz, now) * MIN);
$("dst-now-time").textContent = pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
$("dst-now-sub").textContent = fmtDate(now, tz) + " · " + fmtOff(offsetMin(tz, now));
if (current) {
var box = $("dst-count");
if (box) {
var left = current.t - now;
box.textContent = countdown(left);
}
}
}
function renderResult() {
var tz = sel.value, now = Date.now();
var r = scan(tz, now - 7 * DAY, 830);
current = r;
var box = $("dst-result"), strip = $("dst-strip");
if (!r) {
box.innerHTML = '<span class="dst-badge">ไม่มีการเปลี่ยนเวลา</span><div class="dst-big">เขตเวลานี้ไม่เปลี่ยนเวลาออมแสง</div><div class="dst-muted">ไม่พบการเปลี่ยนเวลาในช่วงประมาณ 2 ปีข้างหน้า นาฬิกาจะคงที่ที่ ' + fmtOff(offsetMin(tz, now)) + ' ตลอดทั้งปี</div>';
strip.innerHTML = '<div class="dst-muted">ไม่มีช่วงที่ต้องแสดง</div>';
return;
}
var past = r.t - now;
var fwd = r.after > r.before;
var title = past > 0 ? "การเปลี่ยนเวลาครั้งถัดไป" : "การเปลี่ยนเวลาครั้งล่าสุด (ภายใน 7 วัน)";
var tip = fwd ? "ตั้งนาฬิกาเดินหน้า ชั่วโมงนั้นจะหายไป คืนนั้นสั้นลง" : "ตั้งนาฬิกาถอยหลัง ชั่วโมงนั้นจะเกิดขึ้นสองครั้ง คืนนั้นยาวขึ้น";
var tipEnd = past > 0 ? "เวลาที่เหลือ" : "ผ่านมาแล้ว";
box.innerHTML = '<span class="dst-badge">' + title + '</span>' +
'<div class="dst-big">' + fmtDate(r.t, tz) + '</div>' +
'<div>' + changeText(r) + ' · ' + fmtOff(r.before) + ' → ' + fmtOff(r.after) + '</div>' +
'<div class="dst-muted">' + tip + '</div>' +
'<div class="dst-muted">' + tipEnd + '</div>' +
'<div class="dst-count" id="dst-count"></div>';
var html = "";
for (var k = -3; k !== 3; k++) {
var ms = r.t + k * HR;
var off = k >= 0 ? r.after : r.before;
var lab = k === 0 ? "หลังเปลี่ยน" : (k > 0 ? "หลังเปลี่ยน" : "ก่อนเปลี่ยน");
html += '<div class="dst-cell' + (k === 0 ? ' hit' : '') + '"><b>' + fmtHM(ms, off) + '</b><small>' + lab + '</small></div>';
}
strip.innerHTML = html;
renderNow();
}
function renderDiff() {
var tz = sel.value, now = Date.now();
var h = '<thead><tr><th>เมือง</th><th>ตอนนี้</th><th>การเปลี่ยนครั้งถัดไป</th></tr></thead><tbody>';
DIFFS.forEach(function (c) {
var d1 = offsetMin(tz, now) - offsetMin(c[0], now);
var a = nextOf(tz), b = nextOf(c[0]);
var t = null;
if (a && b) { t = a.t > b.t ? b.t : a.t; } else if (a) { t = a.t; } else if (b) { t = b.t; }
var nextTxt = c[0] === tz ? "เขตเวลาเดียวกัน" : "ไม่เปลี่ยนในช่วง 2 ปีข้างหน้า";
if (t !== null) {
var d2 = offsetMin(tz, t + 1000) - offsetMin(c[0], t + 1000);
if (d2 !== d1) { nextTxt = fmtDate(t, tz) + ' → ' + fmtDiff(d2); }
}
h += '<tr><td>' + c[1] + '</td><td>' + fmtDiff(d1) + '</td><td>' + nextTxt + '</td></tr>';
});
$("dst-diff").innerHTML = h + '</tbody>';
}
function renderList() {
var rows = [];
PLACES.forEach(function (p) { rows.push({ tz: p[0], name: p[1], r: nextOf(p[0]) }); });
rows.sort(function (x, y) {
if (x.r && y.r) { return x.r.t - y.r.t; }
if (x.r) { return -1; }
if (y.r) { return 1; }
return 0;
});
var h = '<thead><tr><th>วันที่เปลี่ยน</th><th>ประเทศ / เมือง</th><th>การเปลี่ยนแปลง</th></tr></thead><tbody>';
rows.forEach(function (x) {
if (x.r) {
h += '<tr><td>' + fmtDate(x.r.t, x.tz) + '</td><td>' + x.name + '</td><td>' + changeText(x.r) + '</td></tr>';
} else {
h += '<tr><td>-</td><td>' + x.name + '</td><td>ไม่เปลี่ยนเวลา</td></tr>';
}
});
$("dst-list").innerHTML = h + '</tbody>';
}
function renderAll() { renderResult(); renderDiff(); renderNow(); }
function init() {
var zones = [];
try { zones = Intl.supportedValuesOf("timeZone"); } catch (e) { zones = []; }
if (!zones.length) { zones = PLACES.map(function (p) { return p[0]; }).concat(["UTC"]); }
var mine = "Asia/Bangkok";
try { mine = Intl.DateTimeFormat().resolvedOptions().timeZone || mine; } catch (e2) { }
if (zones.indexOf(mine) === -1) { zones.push(mine); }
zones.sort();
var opts = "";
zones.forEach(function (z) { opts += '<option value="' + z + '">' + z.replace(/_/g, " ") + '</option>'; });
sel.innerHTML = opts;
sel.value = mine;
sel.addEventListener("change", renderAll);
$("dst-me").addEventListener("click", function () { sel.value = mine; renderAll(); });
renderAll();
renderList();
setInterval(renderNow, 1000);
}
try { init(); } catch (err) { $("dst-result").textContent = "เบราว์เซอร์ของคุณไม่รองรับเครื่องมือนี้ กรุณาอัปเดตเบราว์เซอร์"; }
})();
</script>

## วิธีใช้งานเครื่องมือเวลาออมแสง

1. เปิดหน้านี้ ระบบจะเลือกเขตเวลาของอุปกรณ์คุณให้อัตโนมัติ และแสดงนาฬิกาปัจจุบันพร้อมค่า UTC offset
2. ดูกล่องผลลัพธ์ด้านบนเพื่อรู้วันที่เปลี่ยนเวลาครั้งถัดไป ทิศทางที่นาฬิกาจะเปลี่ยน (เดินหน้าหรือถอยหลัง) และเวลานับถอยหลัง
3. หากต้องการดูที่อื่น ให้เลือกเขตเวลาจากรายการ แล้วผลลัพธ์จะอัปเดตทันที กดปุ่ม "ใช้เขตเวลาของฉัน" เพื่อกลับมาที่เขตเวลาของคุณ
4. ดูส่วน "ภาพนาฬิกาช่วงที่เปลี่ยนเวลา" เพื่อดูว่าชั่วโมงไหนหายไปหรือซ้ำกันในคืนที่เปลี่ยนเวลา
5. ดูตาราง "ความต่างของเวลาเปลี่ยนอย่างไร" เพื่อเทียบเขตเวลาที่เลือกกับนิวยอร์ก ลอนดอน เบอร์ลิน และซิดนีย์ พร้อมวันที่ความต่างจะเปลี่ยน
6. ดูตาราง "การเปลี่ยนเวลาครั้งต่อไปในแต่ละประเทศ" เพื่อเปรียบเทียบวันเปลี่ยนเวลาของหลายประเทศ เรียงจากใกล้สุดไปไกลสุด

ภายใน 7 วันหลังการเปลี่ยนเวลา เครื่องมือจะแสดงการเปลี่ยนครั้งล่าสุดแทน เพื่อให้คุณตรวจสอบได้ว่านาฬิกาเปลี่ยนจริงหรือไม่

## คำอธิบายศัพท์

- **เวลาออมแสง (DST: Daylight Saving Time)** คือการปรับนาฬิกาให้เดินหน้าหนึ่งชั่วโมงในฤดูร้อน เพื่อให้ช่วงเย็นมีแสงสว่างนานขึ้น แล้วปรับกลับในฤดูใบไม้ร่วง
- **เดินหน้า (Spring Forward)** คือการเลื่อนนาฬิกาไปข้างหน้า เช่น จาก 02:00 เป็น 03:00 ทำให้ชั่วโมงหนึ่งหายไปและคืนนั้นสั้นลง
- **ถอยหลัง (Fall Back)** คือการเลื่อนนาฬิกากลับ เช่น จาก 02:00 เป็น 01:00 ทำให้ชั่วโมงหนึ่งเกิดขึ้นสองครั้งและคืนนั้นยาวขึ้น
- **เวลามาตรฐาน (Standard Time)** คือเวลาปกติของเขตเวลานั้นในช่วงที่ไม่ได้ใช้เวลาออมแสง
- **เขตเวลา (Time Zone)** คือพื้นที่ที่ใช้เวลาท้องถิ่นเดียวกัน ระบุด้วยชื่อ IANA เช่น Asia/Bangkok หรือ America/New_York
- **UTC** คือเวลาสากลเชิงพิกัดที่ใช้เป็นเกณฑ์อ้างอิงของเวลาทั่วโลก ไม่เปลี่ยนตามฤดูกาล
- **UTC offset** คือส่วนต่างระหว่างเวลาท้องถิ่นกับ UTC เช่น ประเทศไทยคือ UTC+7 ค่านี้จะเปลี่ยนในที่ที่ใช้เวลาออมแสง
- **เวลาท้องถิ่น (Local Time)** คือเวลาที่แสดงบนนาฬิกาในสถานที่นั้น ซึ่งรวมผลของเวลาออมแสงแล้ว
- **ความต่างของเวลา (Time Difference)** คือจำนวนชั่วโมงที่เวลาของสองสถานที่ห่างกัน ค่านี้อาจเปลี่ยนเมื่อสถานที่ใดสถานที่หนึ่งเปลี่ยนเวลา
- **ซีกโลกเหนือ / ซีกโลกใต้** ฤดูกาลสลับกัน ประเทศอย่างออสเตรเลียและนิวซีแลนด์จึงเดินหน้าในช่วงเดือนกันยายนถึงตุลาคม และถอยหลังในช่วงเดือนเมษายน
- **ฐานข้อมูลเขตเวลา (IANA tz database)** คือฐานข้อมูลกฎเวลาทั่วโลกที่ระบบปฏิบัติการและเบราว์เซอร์ใช้คำนวณเวลา

## ข้อควรรู้

- สหรัฐอเมริกาและแคนาดาส่วนใหญ่เปลี่ยนเวลาในวันอาทิตย์ที่สองของเดือนมีนาคมและวันอาทิตย์แรกของเดือนพฤศจิกายน ส่วนสหภาพยุโรปและสหราชอาณาจักรเปลี่ยนในวันอาทิตย์สุดท้ายของเดือนมีนาคมและตุลาคม
- ประเทศไทยและส่วนใหญ่ของเอเชียไม่ใช้เวลาออมแสง แต่ความต่างของเวลากับประเทศที่ใช้จะเปลี่ยนไปหนึ่งชั่วโมงตามฤดูกาล
- เครื่องมือนี้คำนวณจากฐานข้อมูลเขตเวลาในเบราว์เซอร์ของคุณ หากมีประเทศเปลี่ยนกฎหมายเวลาออมแสงและเบราว์เซอร์ยังไม่อัปเดต วันที่ที่แสดงอาจคลาดเคลื่อน ควรตรวจสอบนาฬิกาอีกครั้งหลังวันเปลี่ยนเวลา