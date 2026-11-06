---
title: "นาฬิกาเข็มออนไลน์"
seoTitle: "นาฬิกาเข็มออนไลน์ ฟรี"
h1: "นาฬิกาเข็มออนไลน์"
description: "นาฬิกาเข็มออนไลน์ใช้ฟรี แสดงเวลาทันทีบนมือถือและคอมพิวเตอร์ เลือกหน้าปัดได้ 10 แบบ ดูเวลาทั่วโลก เปิดเต็มหน้าจอได้ มีโหมดมืด ไม่ต้องติดตั้งหรือสมัครสมาชิก"
icon: "🕒"
category: "time"
weight: 6
byline: true
date: 2026-11-05
lastmod: 2026-11-06
draft: false
---

<div class="ac" id="acRoot">
<div class="ac-stage" id="acStage">
<div class="ac-top"><button type="button" class="ac-city" id="acCity" hidden></button></div>
<div class="ac-clock" id="acClock"><svg id="acSvg" viewBox="0 0 200 200" role="img" aria-label="นาฬิกาเข็ม"></svg></div>
<div class="ac-date" id="acDate"></div>
<div class="ac-panel" id="acThemes" hidden><div class="ac-grid" id="acGrid"></div></div>
<div class="ac-panel" id="acZones" hidden><input type="search" id="acSearch" placeholder="ค้นหาชื่อเมืองหรือภูมิภาค" autocomplete="off" aria-label="ค้นหาเขตเวลา"><div class="ac-list" id="acList"></div></div>
<div class="ac-bar" id="acBar">
<button type="button" id="bFull" aria-pressed="false">เต็มหน้าจอ <i>F</i></button>
<button type="button" id="bTheme">ธีม</button>
<button type="button" id="bTz">เขตเวลา</button>
<button type="button" id="bDark" aria-pressed="false">โหมดมืด <i>T</i></button>
<button type="button" id="bDate" aria-pressed="true">วันที่ <i>D</i></button>
<button type="button" id="bSmooth" aria-pressed="false">ลื่นไหล <i>S</i></button>
</div>
</div>
<div class="ac-foot"><button type="button" class="ac-link" id="bClear">ลบข้อมูลทั้งหมด</button></div>
<style>
.ac{max-width:760px;margin:1.2rem auto}
.ac [hidden]{display:none!important}
.ac-stage{--bg:#fff;--face:#fff;--fg:#1f2937;--mut:#6b7280;--ring:#1f2937;--sec:#e11d48;--pn:#fff;--bd:#d1d5db;position:relative;display:flex;flex-direction:column;align-items:center;height:min(80vh,640px);min-height:420px;background:var(--bg);color:var(--fg);border:1px solid var(--bd);border-radius:16px;overflow:hidden;transition:background .3s,color .3s;box-sizing:border-box}
.ac-stage.ac-dark{--bg:#000;--face:#0c0c0d;--fg:#f3f4f6;--mut:#9ca3af;--ring:#e5e7eb;--sec:#fb7185;--pn:#141416;--bd:#2f2f33}
.ac-stage.ac-full{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;width:100%;height:100%;min-height:0;border:0;border-radius:0}
.ac-top{min-height:48px;display:flex;align-items:center;justify-content:center;padding-top:10px;transition:opacity .4s}
.ac-city{background:none;border:0;color:var(--fg);font-size:1.15rem;font-weight:600;cursor:pointer;padding:6px 14px;border-radius:8px;font-family:inherit}
.ac-clock{flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center;padding:4px 16px;box-sizing:border-box;transition:transform 1.2s ease}
.ac-clock svg{width:100%;height:100%;max-width:560px;display:block}
.ac-date{min-height:44px;padding:6px 12px 10px;text-align:center;color:var(--mut);font-size:1rem}
.ac-full .ac-date{font-size:1.2rem}
.ac-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:10px 12px 14px;width:100%;box-sizing:border-box;transition:opacity .4s}
.ac-bar button{touch-action:manipulation;cursor:pointer;font-family:inherit;font-size:.92rem;padding:8px 14px;border-radius:999px;border:1px solid var(--bd);background:var(--pn);color:var(--fg)}
.ac-bar button[aria-pressed="true"]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.ac-bar i{font-style:normal;font-size:.68rem;opacity:.65;margin-left:4px;border:1px solid currentColor;border-radius:4px;padding:0 4px}
.ac-full.ac-idle .ac-bar,.ac-full.ac-idle .ac-top{opacity:0;pointer-events:none}
.ac-full.ac-idle{cursor:none}
.ac-panel{position:absolute;top:52px;left:12px;right:12px;max-height:calc(100% - 150px);overflow:auto;background:var(--pn);border:1px solid var(--bd);border-radius:14px;padding:10px;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:5;box-sizing:border-box}
.ac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px}
.ac-th{background:transparent;border:2px solid var(--bd);border-radius:12px;padding:6px;color:var(--fg);cursor:pointer;font-size:.8rem;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:4px}
.ac-th svg{width:72px;height:72px}
.ac-th[aria-pressed="true"]{border-color:var(--sec)}
.ac-panel input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--bd);border-radius:10px;background:var(--bg);color:var(--fg);font-size:1rem;margin-bottom:8px;font-family:inherit}
.ac-row{display:flex;width:100%;justify-content:space-between;align-items:center;gap:10px;padding:9px 10px;background:none;border:0;border-bottom:1px solid var(--bd);color:var(--fg);cursor:pointer;text-align:left;font-size:.95rem;font-family:inherit}
.ac-row small{color:var(--mut);margin-left:6px}
.ac-row b{font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.ac-empty{padding:12px;color:var(--mut);text-align:center}
.ac-foot{text-align:center;margin-top:8px}
.ac-link{background:none;border:0;color:#6b7280;text-decoration:underline;cursor:pointer;font-size:.9rem;font-family:inherit}
</style>
<script>
(function () {
var NS = 'http://www.w3.org/2000/svg';
var KEY = 'analogClockSettings';
var DEF = { theme: 'a-wall', dark: false, date: true, smooth: false, tz: '' };
var THEMES = [['a-num', 'ตัวเลข'], ['a-wall', 'คลาสสิก'], ['a-quarter', '4 ตำแหน่ง'], ['a-square', 'สี่เหลี่ยม'], ['a-tick', 'ขีดชั่วโมง'], ['a-roman', 'เลขโรมัน'], ['a-dot', 'จุด'], ['a-solid', 'ทึบ'], ['a-spectrum', 'สีรุ้ง'], ['a-pop', 'สีสัน']];
var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
var THAI = { 'Asia/Bangkok': 'กรุงเทพมหานคร', 'Asia/Tokyo': 'โตเกียว', 'Asia/Seoul': 'โซล', 'Asia/Shanghai': 'เซี่ยงไฮ้', 'Asia/Hong_Kong': 'ฮ่องกง', 'Asia/Taipei': 'ไทเป', 'Asia/Singapore': 'สิงคโปร์', 'Asia/Jakarta': 'จาการ์ตา', 'Asia/Kuala_Lumpur': 'กัวลาลัมเปอร์', 'Asia/Manila': 'มะนิลา', 'Asia/Ho_Chi_Minh': 'โฮจิมินห์', 'Asia/Phnom_Penh': 'พนมเปญ', 'Asia/Vientiane': 'เวียงจันทน์', 'Asia/Yangon': 'ย่างกุ้ง', 'Asia/Kolkata': 'โกลกาตา', 'Asia/Dubai': 'ดูไบ', 'Europe/London': 'ลอนดอน', 'Europe/Paris': 'ปารีส', 'Europe/Berlin': 'เบอร์ลิน', 'America/New_York': 'นิวยอร์ก', 'America/Chicago': 'ชิคาโก', 'America/Los_Angeles': 'ลอสแอนเจลิส', 'Australia/Sydney': 'ซิดนีย์', 'Pacific/Auckland': 'โอ๊คแลนด์' };
var SANS = 'system-ui,-apple-system,sans-serif';
var SERIF = 'Georgia,serif';
var FG = 'var(--fg)';
var S = {};
var LOCAL = (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; } })();
function $(id) { return document.getElementById(id); }
var stage = $('acStage'), clock = $('acClock'), svg = $('acSvg'), cityBtn = $('acCity'), dateEl = $('acDate');
var pThemes = $('acThemes'), pZones = $('acZones'), grid = $('acGrid'), search = $('acSearch'), list = $('acList');
var bFull = $('bFull'), bTheme = $('bTheme'), bTz = $('bTz'), bDark = $('bDark'), bDate = $('bDate'), bSmooth = $('bSmooth'), bClear = $('bClear');
if (!stage || !svg) { return; }
function pad(n) { return ('0' + n).slice(-2); }
function E(tag, attrs, parent) {
  var el = document.createElementNS(NS, tag);
  for (var k in attrs) { el.setAttribute(k, attrs[k]); }
  if (parent) { parent.appendChild(el); }
  return el;
}
function H(tag, cls, text) {
  var el = document.createElement(tag);
  if (cls) { el.className = cls; }
  if (text !== undefined) { el.textContent = text; }
  return el;
}
function validTz(z) { try { new Intl.DateTimeFormat('en-GB', { timeZone: z }); return true; } catch (e) { return false; } }
function curTz() { return S.tz || LOCAL; }
function cityName(z) { return THAI[z] || z.split('/').pop().replace(/_/g, ' '); }
function period(h) {
  if (h >= 19) { return 'กลางคืน'; }
  if (h >= 16) { return 'เย็น'; }
  if (h >= 12) { return 'บ่าย'; }
  if (h >= 5) { return 'เช้า'; }
  return 'กลางคืน';
}
var fmtCache = {}, dateCache = {};
function parts(tz, ms) {
  var f = fmtCache[tz] || (fmtCache[tz] = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }));
  var r = {};
  f.formatToParts(new Date(ms)).forEach(function (p) { if (p.type !== 'literal') { r[p.type] = parseInt(p.value, 10); } });
  r.hour = r.hour % 24;
  return r;
}
function dateFmt(tz) {
  return dateCache[tz] || (dateCache[tz] = new Intl.DateTimeFormat('th-TH', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
}
function offsetMin(p, ms) { return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000) / 60000); }
function offLabel(m) {
  var sign = m >= 0 ? '+' : '-';
  m = Math.abs(m);
  var h = Math.floor(m / 60), mm = m % 60;
  return 'UTC' + sign + h + (mm ? ':' + pad(mm) : '');
}
function load() {
  var o = {};
  try { o = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { o = {}; }
  for (var k in DEF) { S[k] = (o[k] !== undefined && typeof o[k] === typeof DEF[k]) ? o[k] : DEF[k]; }
  try {
    var q = new URLSearchParams(location.search);
    var t = q.get('theme'), z = q.get('tz');
    if (t && THEMES.some(function (x) { return x[0] === t; })) { S.theme = t; }
    if (z && validTz(z)) { S.tz = z; }
  } catch (e) {}
  if (S.tz && !validTz(S.tz)) { S.tz = ''; }
  if (!THEMES.some(function (x) { return x[0] === S.theme; })) { S.theme = DEF.theme; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function syncUrl() {
  try {
    var u = new URL(location.href);
    if (S.theme !== DEF.theme) { u.searchParams.set('theme', S.theme); } else { u.searchParams.delete('theme'); }
    if (S.tz) { u.searchParams.set('tz', S.tz); } else { u.searchParams.delete('tz'); }
    history.replaceState(null, '', u.toString());
  } catch (e) {}
}
function face(g, id) {
  var hand = FG;
  function P(r, d) { var t = (d - 90) * Math.PI / 180; return [100 + r * Math.cos(t), 100 + r * Math.sin(t)]; }
  function line(r1, r2, d, w, col) {
    var a = P(r1, d), b = P(r2, d);
    E('line', { x1: a[0].toFixed(2), y1: a[1].toFixed(2), x2: b[0].toFixed(2), y2: b[1].toFixed(2), 'stroke-width': w, 'stroke-linecap': 'round', style: 'stroke:' + col }, g);
  }
  function dot(r, d, rad, col) { var a = P(r, d); E('circle', { cx: a[0].toFixed(2), cy: a[1].toFixed(2), r: rad, style: 'fill:' + col }, g); }
  function txt(s, r, d, size, col, fam, wt) {
    var a = P(r, d);
    var t = E('text', { x: a[0].toFixed(2), y: a[1].toFixed(2), 'font-size': size, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'fill:' + col + ';font-family:' + fam + ';font-weight:' + (wt || 600) }, g);
    t.textContent = s;
  }
  function disc(r, fill, stroke, sw) { E('circle', { cx: 100, cy: 100, r: r, style: 'fill:' + fill + ';stroke:' + (stroke || 'none') + ';stroke-width:' + (sw || 0) }, g); }
  function ticks(ro, lenH, lenM, wM, wH, colFn) {
    for (var i = 0; i !== 60; i++) {
      var isH = i % 5 === 0;
      line(ro, ro - (isH ? lenH : lenM), i * 6, isH ? wH : wM, colFn(i));
    }
  }
  function same() { return FG; }
  var n;
  if (id === 'a-wall') {
    disc(99, 'var(--ring)'); disc(92, 'var(--face)'); ticks(88, 9, 4, 1, 2.4, same);
    for (n = 1; n !== 13; n++) { txt(n, 66, n * 30, 17, FG, SANS, 600); }
  } else if (id === 'a-num') {
    disc(97, 'var(--face)', 'var(--bd)', 1.2);
    for (n = 1; n !== 13; n++) { txt(n, 77, n * 30, 22, FG, SANS, 600); }
  } else if (id === 'a-quarter') {
    disc(97, 'var(--face)', 'var(--bd)', 1.2);
    for (n = 1; n !== 13; n++) { if (n % 3 === 0) { txt(n, 72, n * 30, 28, FG, SANS, 700); } else { dot(86, n * 30, 2.4, FG); } }
  } else if (id === 'a-square') {
    E('rect', { x: 5, y: 5, width: 190, height: 190, rx: 38, style: 'fill:var(--face);stroke:var(--ring);stroke-width:4' }, g);
    for (n = 1; n !== 13; n++) { line(88, 80, n * 30, n % 3 === 0 ? 4 : 2.2, FG); }
    for (n = 3; n !== 15; n += 3) { txt(n, 62, n * 30, 20, FG, SANS, 700); }
  } else if (id === 'a-tick') {
    disc(97, 'var(--face)', 'var(--bd)', 1.2); ticks(93, 10, 5, 1.1, 3, same);
  } else if (id === 'a-roman') {
    disc(98, 'var(--face)', 'var(--ring)', 2.5); ticks(90, 3, 3, 0.8, 0.8, same);
    for (n = 1; n !== 13; n++) { txt(ROMAN[n - 1], 72, n * 30, 15, FG, SERIF, 700); }
  } else if (id === 'a-dot') {
    disc(97, 'var(--face)', 'var(--bd)', 1.2);
    for (n = 1; n !== 13; n++) { dot(84, n * 30, n % 3 === 0 ? 5.5 : 3.2, FG); }
  } else if (id === 'a-solid') {
    disc(99, 'var(--fg)'); hand = 'var(--face)';
    for (n = 1; n !== 13; n++) { line(90, n % 3 === 0 ? 74 : 80, n * 30, n % 3 === 0 ? 5 : 3, 'var(--face)'); }
  } else if (id === 'a-spectrum') {
    disc(97, 'var(--face)', 'var(--bd)', 1.2);
    ticks(94, 12, 6, 2.4, 4.2, function (i) { return 'hsl(' + (i * 6) + ',85%,55%)'; });
  } else {
    disc(97, 'var(--face)', 'var(--bd)', 1.2);
    for (n = 1; n !== 13; n++) { txt(n, 75, n * 30, 22, 'hsl(' + (n * 30) + ',80%,48%)', SANS, 800); }
  }
  return hand;
}
function hands(g, color) {
  var hh = E('line', { x1: 100, y1: 108, x2: 100, y2: 56, 'stroke-width': 6.5, 'stroke-linecap': 'round', style: 'stroke:' + color }, g);
  var mh = E('line', { x1: 100, y1: 112, x2: 100, y2: 28, 'stroke-width': 4, 'stroke-linecap': 'round', style: 'stroke:' + color }, g);
  var sh = E('g', {}, g);
  E('line', { x1: 100, y1: 118, x2: 100, y2: 18, 'stroke-width': 1.8, 'stroke-linecap': 'round', style: 'stroke:var(--sec)' }, sh);
  E('circle', { cx: 100, cy: 100, r: 4.5, style: 'fill:var(--sec)' }, sh);
  E('circle', { cx: 100, cy: 100, r: 2, style: 'fill:' + color }, g);
  return { h: hh, m: mh, s: sh };
}
function rot(el, d) {
  var v = 'rotate(' + d.toFixed(2) + ' 100 100)';
  if (el._v !== v) { el._v = v; el.setAttribute('transform', v); }
}
var HS = null, builtTheme = '', cur = { sec: -1, h: 0, m: 0, s: 0, key: '', min: -1 };
function build() {
  svg.textContent = '';
  HS = hands(svg, face(svg, S.theme));
  builtTheme = S.theme;
}
function shift() {
  if (stage.classList.contains('ac-full')) {
    clock.style.transform = 'translate(' + Math.round(Math.random() * 16 - 8) + 'px,' + Math.round(Math.random() * 16 - 8) + 'px)';
  } else { clock.style.transform = ''; }
}
function onSecond(p, now, tz) {
  var per = period(cur.h), key = tz + '|' + p.day + '|' + per;
  if (key !== cur.key) { cur.key = key; dateEl.textContent = dateFmt(tz).format(new Date(now)) + ' · ' + per; }
  if (cur.m !== cur.min) {
    cur.min = cur.m;
    svg.setAttribute('aria-label', 'นาฬิกาเข็ม ' + pad(cur.h) + ':' + pad(cur.m));
    shift();
  }
}
function frame() {
  var now = Date.now(), sec = Math.floor(now / 1000), tz = curTz();
  if (sec !== cur.sec) {
    cur.sec = sec;
    var p = parts(tz, now);
    cur.h = p.hour; cur.m = p.minute; cur.s = p.second;
    onSecond(p, now, tz);
  }
  var s = cur.s + (S.smooth ? (now % 1000) / 1000 : 0);
  rot(HS.h, ((cur.h % 12) * 3600 + cur.m * 60 + cur.s) / 120);
  rot(HS.m, (cur.m * 60 + cur.s) / 10);
  rot(HS.s, s * 6);
}
var loopId = 0, started = false;
function start() {
  loopId++;
  var id = loopId;
  started = true;
  (function tick() {
    if (id !== loopId) { return; }
    frame();
    if (S.smooth) { requestAnimationFrame(tick); } else { setTimeout(tick, 1005 - Date.now() % 1000); }
  })();
}
function apply() {
  stage.classList.toggle('ac-dark', S.dark);
  bDark.setAttribute('aria-pressed', String(S.dark));
  bDate.setAttribute('aria-pressed', String(S.date));
  bSmooth.setAttribute('aria-pressed', String(S.smooth));
  bTz.textContent = S.tz ? 'เขตเวลาของฉัน' : 'เขตเวลา';
  cityBtn.hidden = !S.tz;
  cityBtn.textContent = S.tz ? cityName(S.tz) : '';
  dateEl.style.visibility = S.date ? 'visible' : 'hidden';
  Array.prototype.forEach.call(grid.children, function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-id') === S.theme)); });
  if (builtTheme !== S.theme) { build(); }
  cur.sec = -1; cur.key = ''; cur.min = -1;
  if (started) { start(); }
}
function change() { save(); syncUrl(); apply(); }
function closePanels() { pThemes.hidden = true; pZones.hidden = true; }
function zoneIds() {
  var l = [];
  try { if (Intl.supportedValuesOf) { l = Intl.supportedValuesOf('timeZone'); } } catch (e) { l = []; }
  if (!l.length) { l = Object.keys(THAI); }
  return l.filter(function (z) { return z.indexOf('/') !== -1 && z.indexOf('Etc/') !== 0; });
}
var ZL = null;
function buildZones(q) {
  var now = Date.now();
  if (!ZL) {
    ZL = zoneIds().map(function (z) {
      var p = parts(z, now);
      return { id: z, name: cityName(z), region: z.split('/')[0].replace(/_/g, ' '), off: offsetMin(p, now), time: pad(p.hour) + ':' + pad(p.minute) };
    });
    ZL.sort(function (a, b) { return a.off - b.off || (a.name > b.name ? 1 : -1); });
  }
  q = (q || '').trim().toLowerCase();
  list.textContent = '';
  var n = 0;
  ZL.forEach(function (z) {
    if (q && (z.id.toLowerCase().replace(/_/g, ' ').indexOf(q) === -1) && z.name.toLowerCase().indexOf(q) === -1) { return; }
    n++;
    var row = H('button', 'ac-row');
    row.type = 'button';
    var left = H('span', '', z.name);
    left.appendChild(H('small', '', z.region));
    var right = H('b', '', z.time + '  ' + offLabel(z.off));
    row.appendChild(left); row.appendChild(right);
    row.addEventListener('click', function () { S.tz = (z.id === LOCAL) ? '' : z.id; closePanels(); change(); });
    list.appendChild(row);
  });
  if (!n) { list.appendChild(H('div', 'ac-empty', 'ไม่พบเขตเวลาที่ค้นหา')); }
}
function togglePanel(p) {
  var willOpen = p.hidden;
  closePanels();
  if (willOpen) {
    p.hidden = false;
    if (p === pZones) {
      ZL = null; search.value = ''; buildZones('');
      try { if (window.matchMedia('(pointer:fine)').matches) { search.focus(); } } catch (e) {}
    }
  }
}
var full = false, native = false, lock = null, idleT = 0;
function getLock() { try { if (navigator.wakeLock) { navigator.wakeLock.request('screen').then(function (l) { lock = l; }).catch(function () {}); } } catch (e) {} }
function dropLock() { try { if (lock) { lock.release(); lock = null; } } catch (e) {} }
function wake() {
  stage.classList.remove('ac-idle');
  clearTimeout(idleT);
  if (full) { idleT = setTimeout(function () { if (pThemes.hidden && pZones.hidden) { stage.classList.add('ac-idle'); } }, 3000); }
}
function setFull(on) {
  full = on;
  stage.classList.toggle('ac-full', on);
  document.documentElement.style.overflow = on ? 'hidden' : '';
  bFull.setAttribute('aria-pressed', String(on));
  closePanels();
  if (on) {
    native = false;
    try {
      var rq = stage.requestFullscreen || stage.webkitRequestFullscreen;
      if (rq) { native = true; var pr = rq.call(stage); if (pr && pr.catch) { pr.catch(function () { native = false; }); } }
    } catch (e) { native = false; }
    getLock();
  } else {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
    } catch (e) {}
    native = false;
    dropLock();
  }
  shift();
  wake();
}
function onFsChange() { if (full && native && !document.fullscreenElement && !document.webkitFullscreenElement) { setFull(false); } }
document.addEventListener('fullscreenchange', onFsChange);
document.addEventListener('webkitfullscreenchange', onFsChange);
document.addEventListener('visibilitychange', function () { if (full && document.visibilityState === 'visible') { getLock(); } });
['mousemove', 'touchstart', 'click'].forEach(function (ev) { stage.addEventListener(ev, wake, { passive: true }); });
document.addEventListener('click', function (e) {
  if (pThemes.hidden && pZones.hidden) { return; }
  var t = e.target;
  if (t.closest && (t.closest('.ac-panel') || t.closest('#bTheme') || t.closest('#bTz') || t.closest('#acCity'))) { return; }
  closePanels();
});
document.addEventListener('keydown', function (e) {
  var t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) { if (e.key === 'Escape') { closePanels(); } return; }
  if (e.ctrlKey || e.metaKey || e.altKey) { return; }
  var k = e.key.toLowerCase();
  if (k === 'f') { setFull(!full); }
  else if (k === 't') { S.dark = !S.dark; change(); }
  else if (k === 'd') { S.date = !S.date; change(); }
  else if (k === 's') { S.smooth = !S.smooth; change(); }
  else if (e.key === 'Escape') { if (!pThemes.hidden || !pZones.hidden) { closePanels(); } else if (full) { setFull(false); } }
  wake();
});
bFull.addEventListener('click', function () { setFull(!full); });
bTheme.addEventListener('click', function () { togglePanel(pThemes); });
bTz.addEventListener('click', function () { if (S.tz) { S.tz = ''; closePanels(); change(); } else { togglePanel(pZones); } });
cityBtn.addEventListener('click', function () { togglePanel(pZones); });
bDark.addEventListener('click', function () { S.dark = !S.dark; change(); });
bDate.addEventListener('click', function () { S.date = !S.date; change(); });
bSmooth.addEventListener('click', function () { S.smooth = !S.smooth; change(); });
bClear.addEventListener('click', function () {
  try { localStorage.removeItem(KEY); } catch (e) {}
  for (var k in DEF) { S[k] = DEF[k]; }
  closePanels(); syncUrl(); apply();
});
clock.addEventListener('dblclick', function () { setFull(!full); });
search.addEventListener('input', function () { buildZones(search.value); });
THEMES.forEach(function (t) {
  var b = H('button', 'ac-th');
  b.type = 'button';
  b.setAttribute('data-id', t[0]);
  var s = E('svg', { viewBox: '0 0 200 200', 'aria-hidden': 'true' });
  b.appendChild(s);
  var hs = hands(s, face(s, t[0]));
  rot(hs.h, 305); rot(hs.m, 60); rot(hs.s, 150);
  b.appendChild(H('span', '', t[1]));
  b.addEventListener('click', function () { S.theme = t[0]; closePanels(); change(); });
  grid.appendChild(b);
});
load();
apply();
start();
})();
</script>
</div>

นาฬิกาเข็มออนไลน์เครื่องนี้แสดงเวลาปัจจุบันบนหน้าปัดแอนะล็อกขนาดใหญ่ อ่านง่ายทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์ เปิดหน้านี้แล้วใช้งานได้ทันที ไม่ต้องติดตั้งโปรแกรมหรือสมัครสมาชิก เลือกหน้าปัดได้ 10 แบบ สลับเป็นโหมดมืด ดูเวลาของเมืองอื่นทั่วโลก และขยายเป็นเต็มหน้าจอเพื่อใช้เป็นนาฬิกาตั้งโต๊ะหรือติดผนังได้

## วิธีใช้นาฬิกาเข็มออนไลน์

1. **เปิดหน้านี้** นาฬิกาจะแสดงเวลาตามเขตเวลาของอุปกรณ์คุณโดยอัตโนมัติ
2. **เลือกหน้าปัด** กดปุ่ม **ธีม** แล้วแตะแบบที่ชอบจาก 10 แบบ หน้าปัดจะเปลี่ยนทันที
3. **ดูเวลาเมืองอื่น** กดปุ่ม **เขตเวลา** พิมพ์ชื่อเมืองหรือภูมิภาคในช่องค้นหา หรือเลื่อนหาจากรายการ แล้วแตะเมืองที่ต้องการ ชื่อเมืองจะแสดงเหนือหน้าปัด แตะชื่อนั้นเพื่อเปลี่ยนเมือง หรือกด **เขตเวลาของฉัน** เพื่อกลับมาใช้เวลาของเครื่อง
4. **เปิดหรือซ่อนวันที่** กดปุ่ม **วันที่** เพื่อแสดงหรือซ่อนวันที่และช่วงเวลาของวันใต้หน้าปัด
5. **ปรับการเดินของเข็มวินาที** กดปุ่ม **ลื่นไหล** ให้เข็มเคลื่อนต่อเนื่อง กดอีกครั้งเพื่อให้เดินทีละวินาที
6. **สลับโหมดสี** กดปุ่ม **โหมดมืด** เมื่อต้องการพื้นหลังสีดำที่สบายตาในที่แสงน้อย
7. **เปิดเต็มหน้าจอ** กดปุ่ม **เต็มหน้าจอ** กดปุ่ม F หรือแตะหน้าปัดสองครั้ง ปุ่มทั้งหมดจะจางหายไปหลังไม่กี่วินาที แตะหน้าจอหนึ่งครั้งเพื่อเรียกกลับมา และกด Esc หรือปุ่มเต็มหน้าจออีกครั้งเพื่อออก
8. **ล้างค่าที่จำไว้** กด **ลบข้อมูลทั้งหมด** ใต้นาฬิกาเพื่อคืนค่าเริ่มต้น

เบราว์เซอร์จะจำธีม โหมดมืด การแสดงวันที่ ลักษณะเข็มวินาที และเขตเวลาที่เลือกไว้ในเครื่องของคุณ จึงเปิดครั้งต่อไปได้หน้าตาเดิมทันที ข้อมูลเหล่านี้ไม่ถูกส่งไปที่ใด

## คีย์ลัด

| ปุ่ม | การทำงาน |
| --- | --- |
| F | เปิดหรือออกจากโหมดเต็มหน้าจอ |
| T | สลับโหมดมืด |
| D | แสดงหรือซ่อนวันที่ |
| S | สลับเข็มวินาทีระหว่างเดินทีละวินาทีกับลื่นไหล |
| Esc | ปิดรายการที่เปิดอยู่ หรือออกจากโหมดเต็มหน้าจอ |

## ความหมายของคำศัพท์ที่ใช้ในเครื่องมือนี้

| คำศัพท์ | ความหมายโดยย่อ |
| --- | --- |
| แอนะล็อก | นาฬิกาที่บอกเวลาด้วยเข็มบนหน้าปัด ต่างจากนาฬิกาดิจิทัลที่แสดงเป็นตัวเลข |
| หน้าปัด | แผ่นด้านหน้าของนาฬิกาที่มีตัวเลขหรือขีดบอกตำแหน่งชั่วโมงและนาที |
| เข็มชั่วโมง | เข็มสั้นและหนาที่สุด เคลื่อนครบรอบใน 12 ชั่วโมง |
| เข็มนาที | เข็มที่ยาวกว่าเข็มชั่วโมง เคลื่อนครบรอบใน 60 นาที |
| เข็มวินาที | เข็มบางสีแดงที่เคลื่อนครบรอบใน 60 วินาที |
| ธีม | รูปแบบหน้าปัดที่ให้เลือกสลับได้ เช่น ตัวเลข เลขโรมัน หรือจุด |
| โหมดมืด | พื้นหลังสีดำและตัวอักษรสีสว่าง ช่วยลดแสงจ้าเมื่อใช้ในที่มืด |
| วันที่ | วันและเดือนปัจจุบันที่แสดงใต้หน้าปัด พร้อมปีพุทธศักราช |
| ช่วงเวลาของวัน | คำบอกช่วงเช้า บ่าย เย็น หรือกลางคืน ที่แสดงต่อท้ายวันที่ |
| ลื่นไหล | การเดินของเข็มวินาทีแบบต่อเนื่องไม่สะดุด เหมือนนาฬิกาที่เข็มกวาด |
| เดินทีละวินาที | การเดินของเข็มวินาทีแบบกระโดดทีละจังหวะ เหมือนนาฬิกาควอตซ์ทั่วไป |
| เขตเวลา | พื้นที่ที่ใช้เวลามาตรฐานเดียวกัน เช่น กรุงเทพฯ ใช้ UTC+7 |
| เขตเวลาของฉัน | เวลาตามการตั้งค่าของอุปกรณ์คุณ ใช้เมื่อต้องการกลับจากเวลาของเมืองอื่น |
| UTC | เวลามาตรฐานสากลที่ใช้เป็นจุดอ้างอิงในการคำนวณเวลาของแต่ละเขตเวลา |
| เต็มหน้าจอ | โหมดที่แสดงเฉพาะนาฬิกา ไม่มีส่วนอื่นของเว็บไซต์รบกวน |
| ป้องกันจอไหม้ | หน้าปัดจะขยับตำแหน่งเล็กน้อยทุกนาทีในโหมดเต็มหน้าจอ เพื่อไม่ให้ภาพค้างที่เดิมนานเกินไป |
| ลบข้อมูลทั้งหมด | ล้างการตั้งค่าที่เบราว์เซอร์จำไว้ และคืนนาฬิกากลับเป็นค่าเริ่มต้น |

## หน้าปัดทั้ง 10 แบบ

| ธีม | ลักษณะ |
| --- | --- |
| ตัวเลข | ตัวเลข 1 ถึง 12 ขนาดใหญ่ บนพื้นเรียบ |
| คลาสสิก | นาฬิกาแขวนขอบสีเข้ม มีตัวเลขและขีดนาทีครบ |
| 4 ตำแหน่ง | แสดงเลข 12, 3, 6 และ 9 ส่วนตำแหน่งอื่นเป็นจุดเล็ก |
| สี่เหลี่ยม | กรอบหน้าปัดเป็นสี่เหลี่ยมมุมมน มีขีดชั่วโมง |
| ขีดชั่วโมง | ไม่มีตัวเลข ใช้ขีดบอกนาทีและชั่วโมงแทน |
| เลขโรมัน | ใช้เลขโรมัน I ถึง XII ให้ลุคคลาสสิกแบบนาฬิกาโบราณ |
| จุด | ใช้จุดบอกตำแหน่งชั่วโมง ดูเรียบและทันสมัย |
| ทึบ | หน้าปัดสีเข้มทึบ มีขีดบอกชั่วโมงตัดกับพื้น |
| สีรุ้ง | ขีดรอบหน้าปัดไล่สีเป็นสีรุ้ง |
| สีสัน | ตัวเลขแต่ละตัวมีสีต่างกัน สดใสและอ่านง่าย |

## คำถามที่พบบ่อย

### ใช้นาฬิกานี้ตอนไม่มีอินเทอร์เน็ตได้ไหม

ได้ เมื่อโหลดหน้านี้เสร็จแล้ว นาฬิกาจะอ่านเวลาจากอุปกรณ์ของคุณเอง จึงเดินต่อได้แม้สัญญาณหลุด แต่หากปิดหน้านี้แล้วต้องมีอินเทอร์เน็ตเพื่อเปิดใหม่

### ทำไมเวลาไม่ตรงกับที่คาดไว้

นาฬิกาใช้เวลาจากอุปกรณ์ของคุณ หากเวลาคลาดเคลื่อน ให้ตรวจสอบว่าเครื่องตั้งวันที่ เวลา และเขตเวลาเป็นแบบอัตโนมัติ

### ทำไมการตั้งค่าที่เลือกไว้หายไป

เบราว์เซอร์เก็บค่าไว้ในเครื่อง หากล้างข้อมูลเว็บไซต์ หรือเปิดหน้าด้วยโหมดไม่ระบุตัวตน ค่าที่เลือกจะถูกรีเซ็ตเมื่อปิดหน้าต่าง

### เมื่อเปิดเต็มหน้าจอ หน้าจอจะดับไหม

เบราว์เซอร์ส่วนใหญ่จะรักษาหน้าจอให้สว่างขณะเปิดโหมดเต็มหน้าจอ แต่บางรุ่นหรือบางโหมดประหยัดพลังงานอาจไม่รองรับ หากหน้าจอยังดับ ให้ปรับเวลาปิดหน้าจออัตโนมัติในการตั้งค่าเครื่อง