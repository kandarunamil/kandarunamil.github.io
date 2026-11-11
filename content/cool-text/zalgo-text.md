---
title: "ตัวแปลงข้อความ Zalgo"
seoTitle: "ตัวแปลงข้อความ Zalgo ออนไลน์ ฟรี"
h1: "ตัวแปลงข้อความ Zalgo"
description: "ตัวแปลงข้อความ Zalgo ออนไลน์ฟรี ทำข้อความให้ดูเพี้ยนหลอนด้วยเครื่องหมายซ้อนบน กลาง ล่าง ปรับระดับความเพี้ยนได้ คัดลอกไปวางใน Facebook, X, Discord ได้ทันที"
icon: "🔤"
category: "text"
weight: 35
byline: true
date: 2026-11-05
lastmod: 2026-11-11
draft: false
---

พิมพ์ข้อความลงในช่องด้านล่าง ระบบจะแปลงเป็นข้อความ Zalgo ให้ทันที ปรับระดับความเพี้ยนและเลือกทิศทางของเครื่องหมายได้ตามต้องการ แล้วกดคัดลอกไปวางที่ไหนก็ได้

<div class="zalgo-tool" id="zalgo-tool">
<label class="zg-label" for="zg-input">ข้อความต้นฉบับ</label>
<textarea class="zg-box" id="zg-input" rows="4" placeholder="พิมพ์ข้อความที่นี่...">Zalgo</textarea>
<div class="zg-row">
<span class="zg-label">ระดับความเพี้ยน</span>
<button type="button" class="zg-btn" id="zg-minus" aria-label="ลดระดับ">-</button>
<input type="range" id="zg-level" min="1" max="10" value="4" aria-label="ระดับความเพี้ยน">
<button type="button" class="zg-btn" id="zg-plus" aria-label="เพิ่มระดับ">+</button>
<strong id="zg-level-val">4</strong>
</div>
<div class="zg-row">
<label><input type="checkbox" id="zg-up" checked> เครื่องหมายบน</label>
<label><input type="checkbox" id="zg-mid" checked> เครื่องหมายกลาง</label>
<label><input type="checkbox" id="zg-down" checked> เครื่องหมายล่าง</label>
</div>
<div class="zg-row">
<button type="button" class="zg-btn zg-main" id="zg-convert">แปลงใหม่</button>
<button type="button" class="zg-btn zg-main" id="zg-copy">คัดลอก</button>
<button type="button" class="zg-btn" id="zg-clear">ล้างข้อความ</button>
</div>
<label class="zg-label" for="zg-output">ผลลัพธ์ Zalgo</label>
<textarea class="zg-box" id="zg-output" rows="5" readonly></textarea>
<p class="zg-status" id="zg-status" role="status" aria-live="polite"></p>
</div>
<style>
.zalgo-tool{max-width:760px;margin:1.5rem 0;padding:1rem;border:1px solid rgba(128,128,128,.35);border-radius:12px}
.zalgo-tool .zg-label{display:block;font-weight:600;margin:.5rem 0 .25rem}
.zalgo-tool .zg-box{width:100%;box-sizing:border-box;padding:.6rem;font-size:1.1rem;line-height:1.8;border:1px solid rgba(128,128,128,.5);border-radius:8px;background:transparent;color:inherit;resize:vertical}
.zalgo-tool .zg-row{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;margin:.75rem 0}
.zalgo-tool .zg-row .zg-label{margin:0}
.zalgo-tool .zg-btn{padding:.45rem .9rem;border:1px solid rgba(128,128,128,.6);border-radius:8px;background:transparent;color:inherit;cursor:pointer;font-size:1rem}
.zalgo-tool .zg-main{background:#6d28d9;border-color:#6d28d9;color:#fff}
.zalgo-tool .zg-btn:hover{opacity:.85}
.zalgo-tool .zg-status{min-height:1.4em;margin:.25rem 0 0;font-size:.9rem;opacity:.8}
</style>
<script>
(function () {
  "use strict";
  function range(a, b) {
    var r = [];
    var i = a;
    while (b >= i) { r.push(i); i += 1; }
    return r;
  }
  var UP = [].concat(range(0x300, 0x314), [0x31a], range(0x33d, 0x344), [0x346], range(0x34a, 0x34c), range(0x350, 0x352), [0x357, 0x35b], range(0x363, 0x36f));
  var MID = [0x315, 0x31b, 0x321, 0x322, 0x327, 0x328, 0x358].concat(range(0x334, 0x338), range(0x35c, 0x362));
  var DOWN = [].concat(range(0x316, 0x319), range(0x31c, 0x320), range(0x323, 0x326), range(0x329, 0x333), range(0x339, 0x33c), [0x345], range(0x347, 0x349), [0x34d, 0x34e], range(0x353, 0x356), [0x359, 0x35a]);
  var input = document.getElementById("zg-input");
  var output = document.getElementById("zg-output");
  var level = document.getElementById("zg-level");
  var levelVal = document.getElementById("zg-level-val");
  var cbUp = document.getElementById("zg-up");
  var cbMid = document.getElementById("zg-mid");
  var cbDown = document.getElementById("zg-down");
  var status = document.getElementById("zg-status");
  if (!input || !output || !level) { return; }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(list, count) {
    var s = "";
    var i = count;
    while (i > 0) { s += String.fromCharCode(list[rnd(list.length)]); i -= 1; }
    return s;
  }
  function build(text, lv) {
    var out = "";
    Array.from(text).forEach(function (ch) {
      out += ch;
      if (/\s/.test(ch)) { return; }
      if (cbUp.checked) { out += pick(UP, 1 + rnd(lv)); }
      if (cbMid.checked) { out += pick(MID, rnd(Math.ceil(lv / 2) + 1)); }
      if (cbDown.checked) { out += pick(DOWN, 1 + rnd(lv)); }
    });
    return out;
  }
  function render() {
    var lv = parseInt(level.value, 10) || 1;
    levelVal.textContent = String(lv);
    output.value = build(input.value, lv);
  }
  function say(msg) {
    status.textContent = msg;
    window.setTimeout(function () { status.textContent = ""; }, 2500);
  }
  function copy() {
    if (!output.value) { say("ยังไม่มีข้อความให้คัดลอก"); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output.value).then(function () { say("คัดลอกแล้ว"); }, fallbackCopy);
    } else {
      fallbackCopy();
    }
  }
  function fallbackCopy() {
    output.focus();
    output.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    say(ok ? "คัดลอกแล้ว" : "คัดลอกไม่สำเร็จ กรุณาเลือกข้อความแล้วคัดลอกเอง");
  }
  function step(d) {
    var v = parseInt(level.value, 10) + d;
    if (v > 10) { v = 10; }
    if (1 > v) { v = 1; }
    level.value = String(v);
    render();
  }
  input.addEventListener("input", render);
  level.addEventListener("input", render);
  cbUp.addEventListener("change", render);
  cbMid.addEventListener("change", render);
  cbDown.addEventListener("change", render);
  document.getElementById("zg-minus").addEventListener("click", function () { step(-1); });
  document.getElementById("zg-plus").addEventListener("click", function () { step(1); });
  document.getElementById("zg-convert").addEventListener("click", render);
  document.getElementById("zg-copy").addEventListener("click", copy);
  document.getElementById("zg-clear").addEventListener("click", function () {
    input.value = "";
    render();
    input.focus();
  });
  render();
})();
</script>

## วิธีใช้งานตัวแปลงข้อความ Zalgo

1. **พิมพ์หรือวางข้อความ** ลงในช่อง "ข้อความต้นฉบับ" ผลลัพธ์จะอัปเดตทันทีทุกครั้งที่พิมพ์
2. **ปรับระดับความเพี้ยน** ด้วยแถบเลื่อนหรือปุ่ม - และ + ยิ่งตัวเลขสูง เครื่องหมายที่ซ้อนยิ่งเยอะและข้อความยิ่งดูรก
3. **เลือกทิศทางของเครื่องหมาย** ติ๊กเลือกเครื่องหมายบน กลาง หรือล่าง จะใช้ครบทั้งสามหรือเลือกเฉพาะบางแบบก็ได้
4. **กด "แปลงใหม่"** หากอยากได้ลวดลายใหม่ เพราะเครื่องหมายแต่ละครั้งสุ่มต่างกัน
5. **กด "คัดลอก"** แล้วนำไปวางใน Facebook, X, Discord, LINE หรือแอปอื่นที่รองรับ Unicode
6. **กด "ล้างข้อความ"** เพื่อเริ่มใหม่

เคล็ดลับ: แต่ละแพลตฟอร์มแสดงผลต่างกัน บางแอปอาจตัดเครื่องหมายส่วนเกินออกหรือทำให้บรรทัดสูงผิดปกติ ถ้าข้อความรกเกินไปให้ลดระดับลง

## อธิบายคำศัพท์

**Zalgo** คือสไตล์ข้อความที่ซ้อนเครื่องหมายเล็ก ๆ จำนวนมากไว้บนตัวอักษร ทำให้ดูเพี้ยน หลอน หรือเหมือนข้อความเสีย มีที่มาจากมีมตัวละครสยองขวัญบนอินเทอร์เน็ต

**อักขระผสม (Combining characters)** คืออักขระที่ไม่ได้แสดงตัวเดี่ยว ๆ แต่ไปติดอยู่กับอักขระก่อนหน้า ข้อความ Zalgo สร้างจากการต่ออักขระผสมหลายตัวเข้ากับตัวอักษรหนึ่งตัว

**Unicode** คือมาตรฐานรหัสอักขระสากล ช่วง U+0300 ถึง U+036F ใช้เก็บเครื่องหมายผสมที่ตัวแปลงนี้นำมาใช้ จึงคัดลอกและวางข้ามแอปได้ โดยไม่ต้องใช้ฟอนต์พิเศษ

**เครื่องหมายบน (Up marks)** คือเครื่องหมายที่ลอยอยู่เหนือตัวอักษร เช่น จุด ขีดเฉียง หรือวงกลมเล็ก ๆ

**เครื่องหมายกลาง (Middle marks)** คือเครื่องหมายที่พาดทับกลางตัวอักษร เช่น เส้นขีดหรือเส้นเฉียง ทำให้ตัวอักษรดูถูกขีดทับ

**เครื่องหมายล่าง (Down marks)** คือเครื่องหมายที่อยู่ใต้ตัวอักษร เช่น จุดหรือขีดด้านล่าง

**ระดับความเพี้ยน (Intensity)** คือจำนวนเครื่องหมายสูงสุดที่ซ้อนต่อตัวอักษรหนึ่งตัว ระดับต่ำให้ผลแบบเบา ๆ ระดับสูงให้ผลแบบหลอนจัด

**Glitch text** คือชื่อเรียกอีกแบบของข้อความสไตล์นี้ เพราะดูเหมือนหน้าจอเสียหรือสัญญาณรบกวน

**Creepypasta** คือเรื่องสยองขวัญสั้นที่คัดลอกต่อ ๆ กันบนอินเทอร์เน็ต ข้อความ Zalgo มักถูกใช้เสริมบรรยากาศในเรื่องประเภทนี้