---
title: "เครื่องคิดเลขเปอร์เซ็นต์"
seoTitle: "เครื่องคิดเลขเปอร์เซ็นต์ ออนไลน์ ฟรี"
h1: "เครื่องคิดเลขเปอร์เซ็นต์"
description: "เครื่องคิดเลขเปอร์เซ็นต์ออนไลน์ฟรี คำนวณส่วนลด เงินเดือนเพิ่ม และเปอร์เซ็นต์การเปลี่ยนแปลงได้ทันที ใช้งานได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องสมัครสมาชิก"
icon: "🎲"
category: "random"
weight: 10
byline: true
date: 2026-11-05
lastmod: 2026-11-06
draft: false
---

กรอกตัวเลขในช่องของโจทย์ที่ต้องการ แล้วระบบจะแสดงคำตอบและวิธีคิดให้ทันที ไม่ต้องกดปุ่มคำนวณ

<style>
#pc-tool{max-width:720px;margin:1.5rem 0}
#pc-tool .pc-card{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:14px 16px;margin-bottom:12px}
#pc-tool .pc-q{display:flex;flex-wrap:wrap;align-items:center;gap:8px;line-height:2}
#pc-tool input{width:110px;max-width:100%;padding:6px 10px;font-size:1rem;color:inherit;background:transparent;border:1px solid rgba(128,128,128,.5);border-radius:8px;box-sizing:border-box}
#pc-tool input:focus{outline:2px solid #3b82f6;outline-offset:1px}
#pc-tool .pc-ans{margin-top:8px;font-weight:700;font-size:1.15rem}
#pc-tool .pc-formula{margin-top:2px;font-size:.9rem;opacity:.7;word-break:break-word}
#pc-tool .pc-clear{padding:8px 18px;font-size:1rem;color:inherit;background:transparent;border:1px solid rgba(128,128,128,.5);border-radius:8px;cursor:pointer}
#pc-tool .pc-clear:hover{background:rgba(128,128,128,.15)}
</style>
<div id="pc-tool">
<div class="pc-card" data-calc="a"><div class="pc-q"><input type="number" inputmode="decimal" step="any" data-i="0" aria-label="เปอร์เซ็นต์"> % ของ <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="จำนวน"> คืออะไร?</div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<div class="pc-card" data-calc="b"><div class="pc-q"><input type="number" inputmode="decimal" step="any" data-i="0" aria-label="ค่าที่ต้องการเทียบ"> คิดเป็นกี่เปอร์เซ็นต์ของ <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="ค่าทั้งหมด"></div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<div class="pc-card" data-calc="c"><div class="pc-q"><input type="number" inputmode="decimal" step="any" data-i="0" aria-label="ค่าที่ทราบ"> คือ <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="เปอร์เซ็นต์"> % ของอะไร?</div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<div class="pc-card" data-calc="d"><div class="pc-q">เปอร์เซ็นต์การเปลี่ยนแปลงจาก <input type="number" inputmode="decimal" step="any" data-i="0" aria-label="ค่าเดิม"> เป็น <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="ค่าใหม่"> คืออะไร?</div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<div class="pc-card" data-calc="e"><div class="pc-q">เงินเดือนเพิ่มขึ้น: เดิมได้เงินเดือน <input type="number" inputmode="decimal" step="any" data-i="0" aria-label="เงินเดือนเดิม"> บาท หากเงินเดือนเพิ่มขึ้น <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="เปอร์เซ็นต์ที่เพิ่ม"> %</div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<div class="pc-card" data-calc="f"><div class="pc-q">ส่วนลดราคา: สินค้าราคา <input type="number" inputmode="decimal" step="any" data-i="0" aria-label="ราคาสินค้า"> บาท ให้ส่วนลด <input type="number" inputmode="decimal" step="any" data-i="1" aria-label="เปอร์เซ็นต์ส่วนลด"> % ราคาที่ต้องจ่าย</div><div class="pc-ans">ตอบ: <span class="pc-r">–</span></div><div class="pc-formula"></div></div>
<button type="button" class="pc-clear" id="pc-clear">ลบข้อมูลทั้งหมด</button>
</div>
<script>
(function () {
  var root = document.getElementById('pc-tool');
  if (!root) { return; }
  function fmt(n) {
    return Number(n).toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
  var calcs = {
    a: function (x, y) {
      var r = x * y / 100;
      return { text: fmt(r), formula: fmt(x) + ' ÷ 100 × ' + fmt(y) + ' = ' + fmt(r), val: r };
    },
    b: function (x, y) {
      var r = x / y * 100;
      return { text: fmt(r) + ' %', formula: fmt(x) + ' ÷ ' + fmt(y) + ' × 100 = ' + fmt(r) + ' %', val: r };
    },
    c: function (x, y) {
      var r = x / (y / 100);
      return { text: fmt(r), formula: fmt(x) + ' ÷ (' + fmt(y) + ' ÷ 100) = ' + fmt(r), val: r };
    },
    d: function (x, y) {
      var r = (y / x - 1) * 100;
      var sign = r > 0 ? '+' : '';
      return { text: sign + fmt(r) + ' %', formula: '(' + fmt(y) + ' ÷ ' + fmt(x) + ' − 1) × 100 = ' + sign + fmt(r) + ' %', val: r };
    },
    e: function (x, y) {
      var r = x * (1 + y / 100);
      return { text: fmt(r) + ' บาท', formula: fmt(x) + ' × (1 + ' + fmt(y) + ' ÷ 100) = ' + fmt(r) + ' (เพิ่มขึ้น ' + fmt(r - x) + ' บาท)', val: r };
    },
    f: function (x, y) {
      var r = x * (1 - y / 100);
      return { text: fmt(r) + ' บาท', formula: fmt(x) + ' × (1 − ' + fmt(y) + ' ÷ 100) = ' + fmt(r) + ' (ประหยัด ' + fmt(x - r) + ' บาท)', val: r };
    }
  };
  function update(card) {
    var inputs = card.querySelectorAll('input');
    var x = parseFloat(inputs[0].value);
    var y = parseFloat(inputs[1].value);
    var out = card.querySelector('.pc-r');
    var formula = card.querySelector('.pc-formula');
    if (isNaN(x) || isNaN(y)) {
      out.textContent = '–';
      formula.textContent = '';
      return;
    }
    var res = calcs[card.getAttribute('data-calc')](x, y);
    if (!isFinite(res.val)) {
      out.textContent = 'คำนวณไม่ได้ (หารด้วยศูนย์)';
      formula.textContent = '';
      return;
    }
    out.textContent = res.text;
    formula.textContent = res.formula;
  }
  root.addEventListener('input', function (e) {
    var card = e.target.closest('.pc-card');
    if (card) { update(card); }
  });
  document.getElementById('pc-clear').addEventListener('click', function () {
    var cards = root.querySelectorAll('.pc-card');
    for (var i = 0; i !== cards.length; i++) {
      var inputs = cards[i].querySelectorAll('input');
      inputs[0].value = '';
      inputs[1].value = '';
      update(cards[i]);
    }
  });
})();
</script>

## วิธีใช้งานเครื่องคิดเลขเปอร์เซ็นต์

1. เลือกโจทย์ที่ตรงกับสิ่งที่ต้องการคำนวณ เช่น หาเปอร์เซ็นต์ของตัวเลข คำนวณส่วนลด หรือหาเงินเดือนหลังขึ้น
2. กรอกตัวเลขลงในช่องว่างทั้งสองช่องของโจทย์นั้น (ไม่ต้องใส่เครื่องหมาย % หรือหน่วยบาท)
3. ดูคำตอบที่ปรากฏทันทีใต้โจทย์ พร้อมสูตรและตัวเลขที่ใช้คำนวณ
4. หากต้องการเริ่มใหม่ ให้กดปุ่ม "ลบข้อมูลทั้งหมด"

เครื่องมือนี้ประมวลผลในเบราว์เซอร์ของคุณเอง ตัวเลขที่กรอกจะไม่ถูกส่งไปที่ไหน

### ตัวอย่างการใช้งาน

- **ส่วนลด:** สินค้าราคา 1,200 บาท ลด 15% กรอก 1200 และ 15 ในโจทย์ส่วนลดราคา จะได้ราคาที่ต้องจ่าย 1,020 บาท
- **เงินเดือนขึ้น:** เงินเดือน 20,000 บาท ขึ้น 5% กรอก 20000 และ 5 จะได้เงินเดือนใหม่ 21,000 บาท
- **ผลการเรียน:** ได้ 42 คะแนนจาก 50 คะแนน กรอก 42 และ 50 ในโจทย์ "คิดเป็นกี่เปอร์เซ็นต์ของ" จะได้ 84%

## คำอธิบายศัพท์ที่เกี่ยวข้อง

- **เปอร์เซ็นต์ (%):** สัดส่วนที่เทียบกับ 100 ส่วน เช่น 25% หมายถึง 25 ใน 100 หรือเท่ากับ 0.25
- **ค่าเดิม:** ตัวเลขเริ่มต้นก่อนมีการเปลี่ยนแปลง เช่น ราคาก่อนลด หรือเงินเดือนก่อนปรับขึ้น
- **ค่าใหม่:** ตัวเลขหลังมีการเปลี่ยนแปลง ใช้เทียบกับค่าเดิมเพื่อหาเปอร์เซ็นต์การเปลี่ยนแปลง
- **เปอร์เซ็นต์การเปลี่ยนแปลง:** อัตราที่ค่าเพิ่มขึ้นหรือลดลงเมื่อเทียบกับค่าเดิม ผลเป็นบวกคือเพิ่มขึ้น ผลเป็นลบคือลดลง
- **ส่วนลด:** จำนวนเงินหรือเปอร์เซ็นต์ที่หักออกจากราคาเต็ม ราคาที่ต้องจ่ายจริงคือราคาเต็มหักส่วนลดแล้ว
- **เงินเดือนเพิ่มขึ้น:** การปรับเงินเดือนตามเปอร์เซ็นต์ที่กำหนด เงินเดือนใหม่คือเงินเดือนเดิมบวกส่วนที่เพิ่ม
- **ค่าทั้งหมด (ฐาน):** ตัวเลขที่ใช้เป็นฐานเปรียบเทียบ ซึ่งเท่ากับ 100% เช่น คะแนนเต็ม หรือราคาเต็ม

## สูตรที่ใช้ในเครื่องมือ

- **X% ของ Y:** X ÷ 100 × Y
- **X คิดเป็นกี่ % ของ Y:** X ÷ Y × 100
- **X คือ Y% ของอะไร:** X ÷ (Y ÷ 100)
- **เปลี่ยนแปลงจาก X เป็น Y:** (Y ÷ X − 1) × 100
- **เพิ่ม P%:** ค่าเดิม × (1 + P ÷ 100)
- **ลด P%:** ค่าเดิม × (1 − P ÷ 100)