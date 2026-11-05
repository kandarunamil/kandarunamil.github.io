---
title: "สกอร์บอร์ด"
seoTitle: "สกอร์บอร์ด ออนไลน์ ฟรี"
h1: "สกอร์บอร์ด"
description: "สกอร์บอร์ดออนไลน์ฟรี นับคะแนนสองทีมบนหน้าจอใหญ่ กดบวกลบง่าย แก้ชื่อทีมได้ สลับฝั่ง เลือกธีม เปิดเต็มจอได้ ไม่ต้องติดตั้ง เหมาะกับเกม กีฬา และห้องเรียน"
icon: "🎲"
category: "random"
weight: 3
byline: true
date: 2026-11-05
lastmod: 2026-11-05
draft: false
---

<style>
.sb{--bg:#111827;--c0:#1f2937;--c1:#1f2937;--fg:#f9fafb;--ac0:#38bdf8;--ac1:#fb923c;--bd:#4b5563;--ff:system-ui,-apple-system,"Noto Sans Thai",Tahoma,sans-serif;font-family:var(--ff);background:var(--bg);color:var(--fg);border-radius:14px;padding:12px;margin:1.5rem 0;box-sizing:border-box}
.sb *{box-sizing:border-box}
.sb-board{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sb.is-swap .sb-team[data-i="0"]{order:2}
.sb-team{display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:8px;min-height:min(58vh,420px);padding:14px 8px;border-radius:12px;border-top:8px solid var(--ac0);background:var(--c0);cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:manipulation}
.sb-team[data-i="1"]{border-top-color:var(--ac1);background:var(--c1)}
.sb.is-edit .sb-team{cursor:default}
.sb.is-dec .sb-team{outline:3px dashed #f87171;outline-offset:-3px}
.sb-name{width:100%;text-align:center;font-size:clamp(1.1rem,3.5vw,2rem);font-weight:700;min-height:1.6em;overflow-wrap:anywhere}
.sb.no-names .sb-name{visibility:hidden}
.sb-ni,.sb-si{display:none;width:100%;font:inherit;color:inherit;background:rgba(255,255,255,.12);border:1px solid currentColor;border-radius:8px;text-align:center;padding:2px 4px}
.sb-si{font-size:.5em}
.sb.is-edit .sb-ni,.sb.is-edit .sb-si{display:block}
.sb.is-edit .sb-nt,.sb.is-edit .sb-st{display:none}
.sb-score{position:relative;width:100%;text-align:center;font-weight:800;line-height:1.05;font-size:clamp(4rem,20vw,11rem);font-variant-numeric:tabular-nums}
.sb.is-dec .sb-score::after{content:"-1";position:absolute;top:0;right:4px;font-size:1.3rem;color:#f87171}
.sb-st{display:inline-block}
.sb-st.bump{animation:sb-pop .25s}
@keyframes sb-pop{from{transform:scale(1.12)}to{transform:scale(1)}}
@keyframes sb-flip{from{transform:rotateX(-90deg)}to{transform:rotateX(0)}}
.sb[data-theme="flip"] .sb-st.bump,.sb[data-theme="red-blue"] .sb-st.bump{animation:sb-flip .35s}
@media (prefers-reduced-motion:reduce){.sb-st.bump{animation:none!important}}
.sb-minis{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.sb[data-mode="0"] .sb-minis{display:none}
.sb[data-mode="1"] .sb-m[data-k="1"]{display:none}
.sb-m{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,.25);border-radius:999px;padding:3px 6px}
.sb-m button{width:32px;height:32px;border:0;border-radius:50%;background:rgba(255,255,255,.18);color:inherit;font-size:1.2rem;line-height:1;cursor:pointer}
.sb-mv{min-width:1.6em;text-align:center;font-size:1.4rem;font-weight:700}
.sb-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
.sb-b{min-height:40px;padding:8px 12px;border:1px solid var(--bd);border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.sb-b[aria-pressed="true"]{background:var(--fg);color:var(--bg)}
.sb-clear{margin-left:auto;font-size:.85rem}
.sb-bar label{display:flex;align-items:center;gap:6px;font-size:.9rem}
.sb-bar select{min-height:40px;padding:6px 8px;border:1px solid var(--bd);border-radius:8px;background:var(--c0);color:inherit;font:inherit}
.sb-b:focus-visible,.sb-bar select:focus-visible,.sb-m button:focus-visible{outline:3px solid var(--ac0);outline-offset:2px}
.sb[data-theme="bright"]{--bg:#f1f5f9;--c0:#fff;--c1:#fff;--fg:#0f172a;--bd:#cbd5e1;--ac0:#0284c7;--ac1:#ea580c}
.sb[data-theme="bright"] .sb-m{background:#e2e8f0}
.sb[data-theme="bright"] .sb-m button{background:#cbd5e1}
.sb[data-theme="led"]{--bg:#000;--c0:#0a0a0a;--c1:#0a0a0a;--fg:#ff3b30;--bd:#7f1d1d;--ac0:#ff3b30;--ac1:#ff3b30;--ff:"Courier New",ui-monospace,monospace}
.sb[data-theme="led"] .sb-score{text-shadow:0 0 18px rgba(255,59,48,.7)}
.sb[data-theme="red-blue"]{--bg:#0b1020;--c0:#dc2626;--c1:#2563eb;--fg:#fff;--ac0:#fecaca;--ac1:#bfdbfe}
.sb[data-theme="flip"]{--bg:#0a0a0a;--c0:#171717;--c1:#171717;--fg:#fafafa;--ac0:#a3a3a3;--ac1:#a3a3a3;--bd:#525252}
.sb[data-theme="flip"] .sb-st{padding:0 .12em;border-radius:.1em;background:linear-gradient(#2a2a2a 49%,#000 49%,#000 51%,#333 51%)}
.sb[data-theme="chalk"]{--bg:#26332c;--c0:#2f4137;--c1:#2f4137;--fg:#f4f4ee;--ac0:#fde68a;--ac1:#bae6fd;--bd:#8aa196;--ff:"Chalkboard SE","Comic Sans MS","Noto Sans Thai",cursive}
.sb[data-theme="chalk"] .sb-team{border:3px dashed var(--bd);border-top-width:8px}
.sb:fullscreen{display:flex;flex-direction:column;height:100%;margin:0;border-radius:0}
.sb:fullscreen .sb-board{flex:1}
.sb:fullscreen .sb-team{min-height:0}
.sb:fullscreen .sb-score{font-size:clamp(5rem,32vmin,26rem)}
.sb:-webkit-full-screen{display:flex;flex-direction:column;height:100%;margin:0;border-radius:0}
.sb:-webkit-full-screen .sb-board{flex:1}
.sb:-webkit-full-screen .sb-team{min-height:0}
.sb:-webkit-full-screen .sb-score{font-size:clamp(5rem,32vmin,26rem)}
@media (max-width:480px){.sb-clear{margin-left:0}}
</style>

<div class="sb" id="sb" data-theme="default" data-mode="1">
<div class="sb-board">
<div class="sb-team" data-i="0">
<div class="sb-name"><span class="sb-nt"></span><input class="sb-ni" type="text" maxlength="24" aria-label="ชื่อทีมฝั่งแรก"></div>
<div class="sb-score"><span class="sb-st">0</span><input class="sb-si" type="number" step="1" aria-label="คะแนนทีมฝั่งแรก"></div>
<div class="sb-minis"><div class="sb-m" data-k="0"><button type="button" data-d="-1" aria-label="ลดตัวเลขเสริมตัวที่ 1">-</button><span class="sb-mv">0</span><button type="button" data-d="1" aria-label="เพิ่มตัวเลขเสริมตัวที่ 1">+</button></div><div class="sb-m" data-k="1"><button type="button" data-d="-1" aria-label="ลดตัวเลขเสริมตัวที่ 2">-</button><span class="sb-mv">0</span><button type="button" data-d="1" aria-label="เพิ่มตัวเลขเสริมตัวที่ 2">+</button></div></div>
</div>
<div class="sb-team" data-i="1">
<div class="sb-name"><span class="sb-nt"></span><input class="sb-ni" type="text" maxlength="24" aria-label="ชื่อทีมฝั่งที่สอง"></div>
<div class="sb-score"><span class="sb-st">0</span><input class="sb-si" type="number" step="1" aria-label="คะแนนทีมฝั่งที่สอง"></div>
<div class="sb-minis"><div class="sb-m" data-k="0"><button type="button" data-d="-1" aria-label="ลดตัวเลขเสริมตัวที่ 1">-</button><span class="sb-mv">0</span><button type="button" data-d="1" aria-label="เพิ่มตัวเลขเสริมตัวที่ 1">+</button></div><div class="sb-m" data-k="1"><button type="button" data-d="-1" aria-label="ลดตัวเลขเสริมตัวที่ 2">-</button><span class="sb-mv">0</span><button type="button" data-d="1" aria-label="เพิ่มตัวเลขเสริมตัวที่ 2">+</button></div></div>
</div>
</div>
<div class="sb-bar">
<button type="button" class="sb-b" id="sbDec" aria-pressed="false" title="กดค้าง 1 วินาทีเพื่อรีเซ็ตคะแนน">-1</button>
<button type="button" class="sb-b" data-act="edit" aria-pressed="false">แก้ไข</button>
<button type="button" class="sb-b" data-act="names" aria-pressed="true">ชื่อทีม</button>
<button type="button" class="sb-b" data-act="swap">สลับฝั่ง</button>
<button type="button" class="sb-b" data-act="reset">รีเซ็ต</button>
<button type="button" class="sb-b" data-act="full">เต็มหน้าจอ</button>
<label>เซต/รอบ <select id="sbMode"><option value="0">ซ่อน</option><option value="1">ตัวเลข 1 จำนวน</option><option value="2">ตัวเลข 2 จำนวน</option></select></label>
<label>ธีม <select id="sbTheme"><option value="default">ค่าเริ่มต้น</option><option value="bright">สไตล์สว่าง</option><option value="led">จอ LED</option><option value="red-blue">ทีมสีแดง / ทีมสีน้ำเงิน</option><option value="flip">นาฬิกาฟลิป</option><option value="chalk">กระดานดำ</option></select></label>
<button type="button" class="sb-b sb-clear" data-act="clear">ลบข้อมูลทั้งหมด</button>
</div>
</div>

<script>
(function () {
  'use strict';
  var KEY = 'sb-scoreboard-v1';
  var THEMES = ['default', 'bright', 'led', 'red-blue', 'flip', 'chalk'];
  var root = document.getElementById('sb');
  if (!root) { return; }
  var teams = root.querySelectorAll('.sb-team');
  var decBtn = document.getElementById('sbDec');
  var modeSel = document.getElementById('sbMode');
  var themeSel = document.getElementById('sbTheme');
  var dec = false;
  var edit = false;
  var wl = null;

  function fresh() {
    return { n: ['บ้าน', 'ผู้มาเยือน'], s: [0, 0], m: [[0, 0], [0, 0]], mode: 1, names: true, swap: false, theme: 'default' };
  }
  var st = fresh();

  function clamp(v, lo, hi) {
    v = parseInt(v, 10);
    if (isNaN(v)) { v = 0; }
    return Math.max(lo, Math.min(hi, v));
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) { return; }
      var o = JSON.parse(raw);
      if (o && Array.isArray(o.n) && Array.isArray(o.s) && Array.isArray(o.m)) {
        st = Object.assign(fresh(), o);
      }
    } catch (e) { st = fresh(); }
    if (THEMES.indexOf(st.theme) < 0) { st.theme = 'default'; }
    st.mode = clamp(st.mode, 0, 2);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ }
  }

  function render() {
    root.setAttribute('data-theme', st.theme);
    root.setAttribute('data-mode', String(st.mode));
    root.classList.toggle('is-edit', edit);
    root.classList.toggle('is-dec', dec);
    root.classList.toggle('is-swap', st.swap);
    root.classList.toggle('no-names', !st.names);
    decBtn.setAttribute('aria-pressed', String(dec));
    root.querySelector('[data-act="edit"]').setAttribute('aria-pressed', String(edit));
    root.querySelector('[data-act="names"]').setAttribute('aria-pressed', String(st.names));
    modeSel.value = String(st.mode);
    themeSel.value = st.theme;
    for (var i = 0; i < teams.length; i++) {
      var t = teams[i];
      t.querySelector('.sb-nt').textContent = st.n[i];
      t.querySelector('.sb-st').textContent = st.s[i];
      var ni = t.querySelector('.sb-ni');
      var si = t.querySelector('.sb-si');
      if (document.activeElement !== ni) { ni.value = st.n[i]; }
      if (document.activeElement !== si) { si.value = st.s[i]; }
      var ms = t.querySelectorAll('.sb-m');
      for (var k = 0; k < ms.length; k++) {
        ms[k].querySelector('.sb-mv').textContent = st.m[i][k];
      }
    }
  }

  function bump(i) {
    var el = teams[i].querySelector('.sb-st');
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }

  function add(i, d) {
    st.s[i] = clamp(st.s[i] + d, -999, 9999);
    render(); bump(i); save();
  }

  function addMini(i, k, d) {
    st.m[i][k] = clamp(st.m[i][k] + d, 0, 99);
    render(); save();
  }

  function isFull() { return document.fullscreenElement || document.webkitFullscreenElement; }

  function toggleFull() {
    if (isFull()) {
      var ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { ex.call(document); }
    } else {
      var rq = root.requestFullscreen || root.webkitRequestFullscreen;
      if (rq) {
        var p = rq.call(root);
        if (p && p.catch) { p.catch(function () {}); }
      }
    }
  }

  function onFullChange() {
    try {
      if (isFull() && navigator.wakeLock) {
        navigator.wakeLock.request('screen').then(function (l) { wl = l; }).catch(function () {});
      } else if (wl) {
        wl.release(); wl = null;
      }
    } catch (e) { /* ignore */ }
  }
  document.addEventListener('fullscreenchange', onFullChange);
  document.addEventListener('webkitfullscreenchange', onFullChange);

  root.addEventListener('click', function (e) {
    var tg = e.target;
    if (tg.closest('input, select, label')) { return; }
    var act = tg.closest('[data-act]');
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'edit') { edit = !edit; render(); }
      else if (a === 'names') { st.names = !st.names; render(); save(); }
      else if (a === 'swap') { st.swap = !st.swap; render(); save(); }
      else if (a === 'full') { toggleFull(); }
      else if (a === 'reset') {
        if (window.confirm('รีเซ็ตคะแนนทั้งหมดเป็น 0 ใช่หรือไม่?')) {
          st.s = [0, 0]; st.m = [[0, 0], [0, 0]]; render(); save();
        }
      } else if (a === 'clear') {
        if (window.confirm('ลบชื่อทีม คะแนน และการตั้งค่าที่บันทึกไว้ทั้งหมดใช่หรือไม่?')) {
          try { localStorage.removeItem(KEY); } catch (err) { /* ignore */ }
          st = fresh(); dec = false; edit = false; render();
        }
      }
      return;
    }
    if (tg.closest('#sbDec')) { return; }
    var team = tg.closest('.sb-team');
    if (!team) { return; }
    var i = parseInt(team.getAttribute('data-i'), 10);
    var mb = tg.closest('.sb-m button');
    if (mb) {
      var k = parseInt(mb.parentNode.getAttribute('data-k'), 10);
      addMini(i, k, parseInt(mb.getAttribute('data-d'), 10));
      return;
    }
    if (tg.closest('.sb-minis') || edit) { return; }
    add(i, dec ? -1 : 1);
  });

  root.addEventListener('input', function (e) {
    var tg = e.target;
    var team = tg.closest('.sb-team');
    if (!team) { return; }
    var i = parseInt(team.getAttribute('data-i'), 10);
    if (tg.classList.contains('sb-ni')) {
      st.n[i] = tg.value.slice(0, 24);
      team.querySelector('.sb-nt').textContent = st.n[i];
      save();
    } else if (tg.classList.contains('sb-si')) {
      if (tg.value === '' || tg.value === '-') { return; }
      st.s[i] = clamp(tg.value, -999, 9999);
      team.querySelector('.sb-st').textContent = st.s[i];
      save();
    }
  });

  root.addEventListener('change', function (e) {
    if (e.target.classList.contains('sb-si')) { render(); }
  });

  modeSel.addEventListener('change', function () { st.mode = clamp(modeSel.value, 0, 2); render(); save(); });
  themeSel.addEventListener('change', function () {
    st.theme = THEMES.indexOf(themeSel.value) < 0 ? 'default' : themeSel.value;
    render(); save();
  });

  var timer = null;
  var longPress = false;
  decBtn.addEventListener('pointerdown', function () {
    longPress = false;
    timer = setTimeout(function () {
      longPress = true; st.s = [0, 0]; render(); save();
    }, 1000);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
    decBtn.addEventListener(ev, function () { clearTimeout(timer); });
  });
  decBtn.addEventListener('click', function () {
    if (longPress) { longPress = false; return; }
    dec = !dec; render();
  });

  function inView() {
    var r = root.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  document.addEventListener('keydown', function (e) {
    var tg = e.target;
    if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'SELECT' || tg.tagName === 'TEXTAREA' || tg.isContentEditable)) { return; }
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    if (!isFull() && !inView()) { return; }
    var left = st.swap ? 1 : 0;
    var right = st.swap ? 0 : 1;
    var d = e.shiftKey ? -1 : 1;
    var c = e.code;
    if (c === 'ArrowLeft') { add(left, d); e.preventDefault(); }
    else if (c === 'ArrowRight') { add(right, d); e.preventDefault(); }
    else if (c === 'BracketLeft') { addMini(left, 0, d); }
    else if (c === 'BracketRight') { addMini(right, 0, d); }
    else if (c === 'KeyF' && !e.repeat) { toggleFull(); }
    else if (c === 'KeyN' && !e.repeat) { st.names = !st.names; render(); save(); }
  });

  load();
  try {
    var q = new URLSearchParams(window.location.search).get('theme');
    if (q && THEMES.indexOf(q) >= 0) { st.theme = q; }
  } catch (e) { /* ignore */ }
  render();
})();
</script>

## วิธีใช้งานสกอร์บอร์ด

1. **เพิ่มคะแนน** กดที่การ์ดของทีมเพื่อบวกครั้งละ 1 คะแนน
2. **ลดคะแนน** กดปุ่ม -1 หนึ่งครั้งเพื่อเข้าโหมดลด (มีกรอบเส้นประสีแดงและตัวเลข -1 ขึ้นบนการ์ด) แล้วกดการ์ดทีมที่ต้องการลด กดปุ่ม -1 อีกครั้งเพื่อกลับไปโหมดบวก
3. **ล้างคะแนนเร็ว** กดปุ่ม -1 ค้างไว้ 1 วินาที คะแนนของทั้งสองทีมจะกลับเป็น 0
4. **เปลี่ยนชื่อและแก้คะแนน** กดปุ่ม "แก้ไข" แล้วพิมพ์ชื่อทีมหรือตัวเลขลงบนสกอร์บอร์ดได้เลย กดปุ่มอีกครั้งเมื่อเสร็จ
5. **เซต/รอบ** เลือกจำนวนตัวเลขเสริมที่เมนู "เซต/รอบ" แล้วกดปุ่ม + หรือ - ใต้คะแนนของแต่ละทีม
6. **สลับฝั่ง** กดปุ่ม "สลับฝั่ง" เมื่อสองทีมเปลี่ยนข้างสนาม ชื่อและคะแนนจะย้ายตำแหน่งตามไป
7. **เปลี่ยนธีม** เลือกหน้าตาที่ชอบจากเมนู "ธีม" ธีมนาฬิกาฟลิปและทีมสีแดง / ทีมสีน้ำเงินมีเอฟเฟกต์ตัวเลขพลิกเมื่อคะแนนเปลี่ยน
8. **เต็มหน้าจอ** กดปุ่ม "เต็มหน้าจอ" เพื่อให้คนดูเห็นชัดจากไกล หน้าจอจะไม่ดับระหว่างใช้งานถ้าอุปกรณ์รองรับ
9. **รีเซ็ต** กดปุ่ม "รีเซ็ต" แล้วยืนยันเพื่อให้คะแนนและตัวเลขเสริมกลับเป็น 0 ส่วนชื่อทีมยังอยู่เหมือนเดิม

## แป้นพิมพ์ลัด

| ปุ่ม | หน้าที่ |
| --- | --- |
| ลูกศรซ้าย / ลูกศรขวา | เพิ่ม 1 คะแนนให้ทีมฝั่งซ้าย / ฝั่งขวาของหน้าจอ |
| Shift + ลูกศรซ้าย / ขวา | ลด 1 คะแนนให้ทีมฝั่งนั้น |
| [ และ ] | เพิ่มตัวเลขเสริมของทีมฝั่งซ้าย / ขวา |
| Shift + [ และ ] | ลดตัวเลขเสริมของทีมฝั่งซ้าย / ขวา |
| F | เปิดหรือปิดโหมดเต็มหน้าจอ |
| N | แสดงหรือซ่อนชื่อทีม |

กดปุ่มลูกศรค้างไว้เพื่อบวกหรือลบคะแนนต่อเนื่องได้ แป้นพิมพ์ลัดใช้ได้เมื่อสกอร์บอร์ดอยู่บนหน้าจอ และจะไม่ทำงานขณะกำลังพิมพ์ในช่องกรอก

## ศัพท์ที่ควรรู้

- **คะแนน** ตัวเลขใหญ่บนการ์ดของแต่ละทีม ใช้นับแต้มที่ได้ในเกมหรือการแข่งขัน
- **ชื่อทีม** ข้อความเหนือคะแนน ตั้งเป็นชื่อทีม ชื่อผู้เล่น หรือกลุ่มก็ได้ และซ่อนได้ด้วยปุ่ม "ชื่อทีม"
- **-1 (โหมดลดคะแนน)** สถานะที่ทำให้การกดการ์ดลดคะแนนแทนที่จะเพิ่ม
- **แก้ไข** โหมดที่เปลี่ยนชื่อทีมและคะแนนให้เป็นช่องกรอก เพื่อพิมพ์ค่าที่ต้องการโดยตรง
- **ตัวเลขเสริม** ตัวเลขขนาดเล็กใต้คะแนน ใช้นับเซต เกม รอบ อินนิ่ง หรือตาเล่น เลือกแสดง 1 หรือ 2 ตัว หรือซ่อนได้
- **เซต** ช่วงย่อยของการแข่งขัน เช่น วอลเลย์บอลหรือเทนนิส ผู้ชนะแต่ละเซตจะได้แต้มเซตเพิ่ม
- **สลับฝั่ง** การย้ายการ์ดสองทีมซ้าย-ขวา ใช้ตอนที่ทีมเปลี่ยนข้างสนาม
- **รีเซ็ต** การตั้งคะแนนกลับเป็น 0 เพื่อเริ่มเกมใหม่
- **ธีม** ชุดสีและรูปแบบตัวเลขของสกอร์บอร์ด เช่น สไตล์สว่าง จอ LED นาฬิกาฟลิป และกระดานดำ
- **โหมดเต็มหน้าจอ** การขยายสกอร์บอร์ดให้เต็มจอ เหมาะกับการแสดงบนโปรเจกเตอร์หรือทีวี
- **ที่เก็บข้อมูลในเครื่อง** พื้นที่ในเบราว์เซอร์ที่เก็บชื่อทีม คะแนน และการตั้งค่าไว้ในอุปกรณ์ของคุณเท่านั้น เปิดหน้าเดิมครั้งหน้าข้อมูลจะยังอยู่ และลบได้ด้วยปุ่ม "ลบข้อมูลทั้งหมด"