---
title: "ข้อความหมึกล่องหน"
seoTitle: "ข้อความหมึกล่องหน ออนไลน์ ฟรี"
h1: "ข้อความหมึกล่องหน"
description: "สร้างข้อความหมึกล่องหนออนไลน์ฟรี เพิ่มอักขระพิเศษให้อ่านยากแต่ยังมองเห็นได้ คัดลอกไปใช้ในแชตและโซเชียลได้ทันที บางแอปแสดงผลต่างกัน ควรทดสอบก่อนใช้งานจริง"
icon: "🔤"
category: "text"
weight: 36
byline: true
date: 2026-11-05
lastmod: 2026-11-11
draft: false
---

ข้อความหมึกล่องหนคือข้อความที่ถูกแทรกอักขระ ҉ (เครื่องหมายล้านในภาษาซีริลลิก) ทำให้ตัวอักษรทับซ้อนกันจนอ่านยาก แต่ยังมองเห็นได้ ลักษณะคล้ายเอฟเฟกต์หมึกล่องหนบน iPhone ผลลัพธ์เป็นข้อความธรรมดา จึงคัดลอกไปวางบน Facebook, X (Twitter), Instagram หรือแอปแชตได้

<style>
.ink-tool{max-width:640px;margin:1.5rem 0;display:flex;flex-direction:column;gap:.75rem}
.ink-tool label{font-weight:600;font-size:.95rem}
.ink-tool textarea{width:100%;min-height:110px;padding:.75rem;border:1px solid #9994;border-radius:8px;font:inherit;font-size:1.05rem;box-sizing:border-box;resize:vertical;background:transparent;color:inherit}
.ink-tool .ink-row{display:flex;flex-wrap:wrap;gap:.75rem;align-items:center}
.ink-tool select{padding:.45rem .6rem;border:1px solid #9994;border-radius:8px;font:inherit;background:transparent;color:inherit}
.ink-tool button{padding:.55rem 1.1rem;border:0;border-radius:8px;font:inherit;font-weight:600;cursor:pointer;background:#2563eb;color:#fff}
.ink-tool button.ink-secondary{background:transparent;color:inherit;border:1px solid #9994}
.ink-tool button:hover{opacity:.9}
.ink-status{min-height:1.2em;font-size:.9rem;opacity:.8}
</style>
<div class="ink-tool" id="ink-tool">
<label for="ink-input">ใส่ข้อความ</label>
<textarea id="ink-input" placeholder="พิมพ์ข้อความที่ต้องการ เช่น สวัสดีครับ" autocomplete="off"></textarea>
<div class="ink-row">
<label for="ink-mode">รูปแบบ</label>
<select id="ink-mode">
<option value="each">แทรกหลังทุกตัวอักษร</option>
<option value="wrap">ครอบหัวท้ายข้อความ</option>
</select>
<label for="ink-count">จำนวน ҉</label>
<select id="ink-count">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>
</div>
<label for="ink-output">ผลลัพธ์</label>
<textarea id="ink-output" readonly placeholder="ผลลัพธ์จะแสดงที่นี่"></textarea>
<div class="ink-row">
<button type="button" id="ink-copy">คัดลอก</button>
<button type="button" id="ink-clear" class="ink-secondary">ล้างข้อความ</button>
<span class="ink-status" id="ink-status" aria-live="polite"></span>
</div>
</div>

<script>
(function () {
  var MARK = "\u0489";
  var input = document.getElementById("ink-input");
  var output = document.getElementById("ink-output");
  var mode = document.getElementById("ink-mode");
  var count = document.getElementById("ink-count");
  var copyBtn = document.getElementById("ink-copy");
  var clearBtn = document.getElementById("ink-clear");
  var status = document.getElementById("ink-status");
  if (!input || !output || !mode || !count || !copyBtn || !clearBtn || !status) { return; }

  function splitChars(text) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      var seg = new Intl.Segmenter("th", { granularity: "grapheme" });
      var out = [];
      var it = seg.segment(text)[Symbol.iterator]();
      var step = it.next();
      while (!step.done) { out.push(step.value.segment); step = it.next(); }
      return out;
    }
    return Array.from(text);
  }

  function render() {
    var text = input.value;
    var n = parseInt(count.value, 10) || 1;
    var marks = new Array(n + 1).join(MARK);
    var result = "";
    if (text) {
      if (mode.value === "wrap") {
        result = marks + text + " " + marks;
      } else {
        var chars = splitChars(text);
        for (var i = 0; i < chars.length; i++) {
          var c = chars[i];
          result += /^\s+$/.test(c) ? c : c + marks;
        }
      }
    }
    output.value = result;
  }

  function setStatus(msg) {
    status.textContent = msg;
    window.setTimeout(function () { status.textContent = ""; }, 2000);
  }

  function copyText() {
    if (!output.value) { setStatus("ยังไม่มีข้อความให้คัดลอก"); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output.value).then(
        function () { setStatus("คัดลอกแล้ว"); },
        function () { fallbackCopy(); }
      );
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    output.focus();
    output.select();
    try {
      setStatus(document.execCommand("copy") ? "คัดลอกแล้ว" : "กรุณาคัดลอกด้วยตนเอง");
    } catch (e) {
      setStatus("กรุณาคัดลอกด้วยตนเอง");
    }
  }

  input.addEventListener("input", render);
  mode.addEventListener("change", render);
  count.addEventListener("change", render);
  copyBtn.addEventListener("click", copyText);
  clearBtn.addEventListener("click", function () {
    input.value = "";
    render();
    input.focus();
  });
  render();
})();
</script>

## วิธีใช้งาน

1. พิมพ์หรือวางข้อความที่ต้องการในช่อง "ใส่ข้อความ"
2. เลือก "รูปแบบ" ว่าจะแทรกอักขระหลังทุกตัวอักษร หรือครอบเฉพาะหัวและท้ายข้อความ
3. เลือก "จำนวน ҉" เพื่อกำหนดว่าจะใส่กี่ตัว ยิ่งมากข้อความยิ่งอ่านยาก
4. ดูผลลัพธ์ในช่อง "ผลลัพธ์" ซึ่งอัปเดตอัตโนมัติทุกครั้งที่พิมพ์
5. กดปุ่ม "คัดลอก" แล้วนำไปวางในแชตหรือโซเชียลมีเดียที่ต้องการ
6. กด "ล้างข้อความ" เมื่อต้องการเริ่มใหม่

> หมายเหตุ: แต่ละแอปแสดงอักขระพิเศษไม่เหมือนกัน บางแอปอาจตัดหรือแสดงเป็นกรอบสี่เหลี่ยม ควรทดสอบส่งให้ตัวเองก่อนใช้งานจริง

## คำอธิบายศัพท์

- **ข้อความหมึกล่องหน**: ข้อความที่ใส่อักขระตกแต่งทับตัวอักษร ทำให้อ่านยากแต่ไม่ได้หายไปจริง
- **҉ (U+0489)**: อักขระ Combining Cyrillic Millions Sign หรือเครื่องหมายล้านในภาษาซีริลลิก มีลักษณะเป็นวงกลมล้อมตัวอักษรก่อนหน้า
- **Combining character**: อักขระที่แสดงซ้อนบนตัวอักษรก่อนหน้า ไม่ใช้พื้นที่เพิ่ม จึงเกิดเอฟเฟกต์ทับซ้อน
- **Unicode**: มาตรฐานรหัสอักขระสากลที่ทำให้ตัวอักษรและสัญลักษณ์แสดงผลตรงกันบนหลายอุปกรณ์
- **ข้อความธรรมดา (Plain text)**: ข้อความที่ไม่มีการจัดรูปแบบ จึงคัดลอกและวางข้ามแอปได้ง่าย
- **แทรกหลังทุกตัวอักษร**: ใส่ ҉ ต่อท้ายตัวอักษรทุกตัว ให้เอฟเฟกต์หนาแน่นที่สุด
- **ครอบหัวท้ายข้อความ**: ใส่ ҉ เฉพาะหน้าและหลังข้อความ ข้อความตรงกลางยังอ่านง่าย
- **จำนวน ҉**: จำนวนอักขระที่ใส่ในแต่ละตำแหน่ง ยิ่งมากยิ่งอ่านยาก
- **iPhone Invisible Ink**: เอฟเฟกต์ใน iMessage ที่ซ่อนข้อความด้วยอนุภาคจนกว่าผู้รับจะแตะ เครื่องมือนี้ให้ลักษณะคล้ายกันแต่เป็นเพียงข้อความตกแต่ง