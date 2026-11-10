---
title: "ทอยลูกเต๋า"
seoTitle: "ทอยลูกเต๋า ออนไลน์ ฟรี"
h1: "ทอยลูกเต๋า"
description: "ทอยลูกเต๋าออนไลน์ฟรี เลือกทอยได้ 1-6 ลูก พร้อมแอนิเมชัน 3 มิติ สุ่มแต้มและรวมผลให้ทันที ใช้งานได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งหรือสมัครสมาชิก"
icon: "🎲"
category: "random"
weight: 28
byline: true
date: 2026-11-05
lastmod: 2026-11-10
draft: false
---

<div id="dice-tool">
  <div class="dt-row dt-count" role="group" aria-label="จำนวนลูกเต๋า">
    <span class="dt-label">จำนวนลูกเต๋า</span>
    <button type="button" data-n="1" aria-pressed="true">1</button>
    <button type="button" data-n="2" aria-pressed="false">2</button>
    <button type="button" data-n="3" aria-pressed="false">3</button>
    <button type="button" data-n="4" aria-pressed="false">4</button>
    <button type="button" data-n="5" aria-pressed="false">5</button>
    <button type="button" data-n="6" aria-pressed="false">6</button>
  </div>
  <div class="dt-stage" id="dt-stage" title="แตะเพื่อทอย"></div>
  <div class="dt-row">
    <button type="button" class="dt-roll" id="dt-roll">🎲 ทอยลูกเต๋า</button>
  </div>
  <div class="dt-result" id="dt-result" aria-live="polite">กดปุ่มทอยลูกเต๋าเพื่อเริ่มต้น</div>
  <div class="dt-hist-wrap" id="dt-hist-wrap" hidden>
    <div class="dt-hist-head">
      <strong>ประวัติการทอย (10 ครั้งล่าสุด)</strong>
      <button type="button" class="dt-clear" id="dt-clear">ล้างประวัติ</button>
    </div>
    <ol class="dt-history" id="dt-history"></ol>
  </div>
</div>
<style>
#dice-tool{max-width:720px;margin:0 auto 24px;text-align:center}
#dice-tool .dt-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;margin:12px 0}
#dice-tool .dt-label{font-weight:600;margin-right:4px}
#dice-tool button{font:inherit;cursor:pointer;border:1px solid rgba(128,128,128,.55);background:transparent;color:inherit;border-radius:8px;padding:6px 14px;min-width:40px}
#dice-tool .dt-count button[aria-pressed="true"]{background:#2563eb;border-color:#2563eb;color:#fff}
#dice-tool button:disabled{opacity:.55;cursor:not-allowed}
#dice-tool .dt-roll{background:#2563eb;border-color:#2563eb;color:#fff;font-size:1.1rem;font-weight:600;padding:10px 28px;border-radius:999px}
#dice-tool .dt-stage{--s:64px;display:flex;flex-wrap:wrap;gap:34px;justify-content:center;align-items:center;min-height:150px;padding:28px 8px;perspective:900px;cursor:pointer;user-select:none;-webkit-user-select:none}
#dice-tool .dt-cube{width:var(--s);height:var(--s);position:relative;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
#dice-tool .dt-face{position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;padding:9px;background:#fff;border:1px solid #cbd5e1;border-radius:12px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr)}
#dice-tool .dt-pip{width:11px;height:11px;border-radius:50%;background:#111827;justify-self:center;align-self:center}
#dice-tool .dt-f1{transform:translateZ(calc(var(--s) / 2))}
#dice-tool .dt-f6{transform:rotateY(180deg) translateZ(calc(var(--s) / 2))}
#dice-tool .dt-f3{transform:rotateY(90deg) translateZ(calc(var(--s) / 2))}
#dice-tool .dt-f4{transform:rotateY(-90deg) translateZ(calc(var(--s) / 2))}
#dice-tool .dt-f2{transform:rotateX(90deg) translateZ(calc(var(--s) / 2))}
#dice-tool .dt-f5{transform:rotateX(-90deg) translateZ(calc(var(--s) / 2))}
#dice-tool .dt-result{font-size:1.15rem;min-height:3.2em;margin:4px 0 8px}
#dice-tool .dt-result .dt-sum{font-weight:700;font-size:1.4rem}
#dice-tool .dt-result .dt-dbl{display:inline-block;margin-left:6px;padding:1px 10px;border-radius:999px;background:#f59e0b;color:#fff;font-size:.85rem;font-weight:600}
#dice-tool .dt-hist-wrap{max-width:420px;margin:12px auto 0;text-align:left}
#dice-tool .dt-hist-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px}
#dice-tool .dt-clear{font-size:.85rem;padding:3px 10px}
#dice-tool .dt-history{margin:0;padding-left:1.6em}
#dice-tool .dt-history li{padding:2px 0}
@media (max-width:480px){#dice-tool .dt-stage{gap:24px;--s:56px}}
@media (prefers-reduced-motion:reduce){#dice-tool .dt-cube{transition:none}}
</style>
<script>
(function () {
  var root = document.getElementById('dice-tool');
  if (!root) { return; }
  var stage = document.getElementById('dt-stage');
  var rollBtn = document.getElementById('dt-roll');
  var resultEl = document.getElementById('dt-result');
  var histWrap = document.getElementById('dt-hist-wrap');
  var histEl = document.getElementById('dt-history');
  var clearBtn = document.getElementById('dt-clear');
  var countBtns = root.querySelectorAll('.dt-count button');
  var PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  var FACES = [1, 6, 3, 4, 2, 5];
  var ANGLE = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 2: [-90, 0], 5: [90, 0] };
  var count = 1;
  var rolls = 0;
  var busy = false;
  var history = [];
  var cubes = [];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rnd(max) {
    var c = window.crypto || window.msCrypto;
    if (c && c.getRandomValues) {
      var a = new Uint32Array(1);
      var limit = Math.floor(4294967296 / max) * max;
      do { c.getRandomValues(a); } while (a[0] >= limit);
      return a[0] % max;
    }
    return Math.floor(Math.random() * max);
  }
  function makeFace(v) {
    var f = document.createElement('div');
    f.className = 'dt-face dt-f' + v;
    PIPS[v].forEach(function (cell) {
      var p = document.createElement('span');
      p.className = 'dt-pip';
      p.style.gridRow = String(Math.ceil(cell / 3));
      p.style.gridColumn = String(((cell - 1) % 3) + 1);
      f.appendChild(p);
    });
    return f;
  }
  function build() {
    stage.textContent = '';
    cubes = [];
    for (var i = 0; i !== count; i++) {
      var cube = document.createElement('div');
      cube.className = 'dt-cube';
      FACES.forEach(function (v) { cube.appendChild(makeFace(v)); });
      stage.appendChild(cube);
      cubes.push(cube);
    }
  }
  function setAngle(cube, value, spin) {
    var a = ANGLE[value];
    var x = a[0] + 1080 * spin + 360 * rnd(2);
    var y = a[1] + 1080 * spin + 360 * rnd(2);
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
  }
  function symbol(v) { return String.fromCharCode(0x2680 + v - 1); }
  function showResult(vals) {
    var sum = vals.reduce(function (s, v) { return s + v; }, 0);
    var dbl = vals.length !== 1 && new Set(vals).size !== vals.length;
    resultEl.textContent = '';
    var line1 = document.createElement('div');
    line1.textContent = vals.map(function (v) { return symbol(v) + ' ' + v; }).join('   ');
    resultEl.appendChild(line1);
    if (vals.length !== 1) {
      var line2 = document.createElement('div');
      line2.appendChild(document.createTextNode('ผลรวม '));
      var s = document.createElement('span');
      s.className = 'dt-sum';
      s.textContent = String(sum);
      line2.appendChild(s);
      if (dbl) {
        var b = document.createElement('span');
        b.className = 'dt-dbl';
        b.textContent = 'แต้มซ้ำ';
        line2.appendChild(b);
      }
      resultEl.appendChild(line2);
    }
    history.unshift({ vals: vals, sum: sum });
    history = history.slice(0, 10);
    renderHistory();
  }
  function renderHistory() {
    histEl.textContent = '';
    history.forEach(function (h) {
      var li = document.createElement('li');
      var t = h.vals.join(', ');
      if (h.vals.length !== 1) { t += '  (รวม ' + h.sum + ')'; }
      li.textContent = t;
      histEl.appendChild(li);
    });
    histWrap.hidden = history.length === 0;
  }
  function roll() {
    if (busy) { return; }
    busy = true;
    rolls++;
    rollBtn.disabled = true;
    var vals = [];
    for (var i = 0; i !== count; i++) { vals.push(rnd(6) + 1); }
    cubes.forEach(function (cube, idx) { setAngle(cube, vals[idx], rolls); });
    window.setTimeout(function () {
      showResult(vals);
      busy = false;
      rollBtn.disabled = false;
    }, reduceMotion ? 0 : 1150);
  }
  function setCount(n) {
    if (busy) { return; }
    count = n;
    countBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', Number(b.getAttribute('data-n')) === n ? 'true' : 'false');
    });
    build();
    resultEl.textContent = 'กดปุ่มทอยลูกเต๋าเพื่อเริ่มต้น';
  }
  countBtns.forEach(function (b) {
    b.addEventListener('click', function () { setCount(Number(b.getAttribute('data-n'))); });
  });
  rollBtn.addEventListener('click', roll);
  stage.addEventListener('click', roll);
  clearBtn.addEventListener('click', function () { history = []; renderHistory(); });
  build();
})();
</script>

เครื่องมือทอยลูกเต๋าออนไลน์นี้ให้คุณทอยลูกเต๋าได้ตั้งแต่ 1 ถึง 6 ลูกพร้อมกัน พร้อมภาพเคลื่อนไหวลูกเต๋า 3 มิติ ระบบจะสุ่มแต้มก่อน แล้วจึงหมุนลูกเต๋าไปยังหน้าที่ตรงกับผลลัพธ์ ภาพเคลื่อนไหวจึงเป็นเพียงเอฟเฟกต์ ไม่ส่งผลต่อแต้มที่ออก เหมาะสำหรับเล่นเกมกระดาน ตัดสินใจเรื่องเล็ก ๆ หรือใช้แทนลูกเต๋าจริงเมื่อลืมพกติดตัว

## วิธีใช้งานเครื่องมือทอยลูกเต๋า

1. **เลือกจำนวนลูกเต๋า** กดปุ่มตัวเลข 1 ถึง 6 ด้านบน ค่าเริ่มต้นคือ 1 ลูก
2. **กดทอย** กดปุ่ม "ทอยลูกเต๋า" หรือแตะที่ลูกเต๋าโดยตรง
3. **รอให้ลูกเต๋าหยุดหมุน** ประมาณ 1 วินาที แล้วดูแต้มของแต่ละลูกและผลรวมที่แสดงด้านล่าง
4. **ทอยซ้ำได้ไม่จำกัด** ผลการทอย 10 ครั้งล่าสุดจะถูกบันทึกไว้ในรายการประวัติ
5. **ล้างประวัติ** กดปุ่ม "ล้างประวัติ" เมื่อต้องการเริ่มนับใหม่

## คำอธิบายศัพท์ที่เกี่ยวข้อง

| คำศัพท์ | ความหมายโดยย่อ |
| --- | --- |
| ลูกเต๋า (Dice) | ลูกบาศก์ 6 หน้า แต่ละหน้ามีจุด 1 ถึง 6 จุด โดยหน้าตรงข้ามรวมกันได้ 7 เสมอ |
| แต้ม | จำนวนจุดบนหน้าที่หงายขึ้นของลูกเต๋าแต่ละลูก |
| ผลรวม | ผลบวกของแต้มจากลูกเต๋าทุกลูกที่ทอยในครั้งนั้น |
| ทอย (Roll) | การสุ่มแต้มใหม่ให้ลูกเต๋าทุกลูกในคราวเดียว |
| เลขสุ่ม (Random) | ตัวเลขที่ไม่มีรูปแบบตายตัว เครื่องมือนี้ใช้ฟังก์ชันสุ่มของเบราว์เซอร์ (crypto.getRandomValues) ทำให้ทุกแต้มมีโอกาสออกเท่ากัน |
| ความน่าจะเป็น | โอกาสที่แต้มหนึ่ง ๆ จะออกคือ 1 ใน 6 หรือประมาณ 16.67% และการทอยแต่ละครั้งไม่เกี่ยวข้องกับครั้งก่อนหน้า |
| แต้มซ้ำ | ลูกเต๋าตั้งแต่สองลูกขึ้นไปออกแต้มเท่ากัน ทอย 2 ลูกมีโอกาส 16.67% ทอย 3 ลูกมีโอกาส 44.44% |
| ภาพเคลื่อนไหว 3 มิติ | ลูกเต๋าที่หมุนด้วย CSS3 เพื่อความสวยงามเท่านั้น หากเปิดโหมดลดการเคลื่อนไหวในอุปกรณ์ ลูกเต๋าจะแสดงผลทันที |
| ประวัติการทอย | รายการผลลัพธ์ 10 ครั้งล่าสุดในหน้านี้ ข้อมูลจะหายเมื่อรีเฟรชหรือปิดหน้า |
| สัญลักษณ์ลูกเต๋า | อักขระ Unicode ⚀ ⚁ ⚂ ⚃ ⚄ ⚅ แทนแต้ม 1 ถึง 6 และอีโมจิ 🎲 ที่นำไปวางในข้อความได้ |

เครื่องมือนี้ให้บริการตามสภาพเพื่อความบันเทิง ผลลัพธ์เป็นการสุ่มจริงทุกครั้ง โปรดปฏิบัติตามกฎหมายท้องถิ่นหากนำไปใช้ในกิจกรรมที่เกี่ยวข้องกับการพนัน