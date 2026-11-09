---
title: "คัดลอกไปยังคลิปบอร์ด"
seoTitle: "คัดลอกไปยังคลิปบอร์ด ออนไลน์ ฟรี"
h1: "คัดลอกไปยังคลิปบอร์ด"
description: "คัดลอกข้อความไปยังคลิปบอร์ดออนไลน์ฟรี วางข้อความแล้วกดคัดลอกได้ทันที พร้อมนับอักขระ คำ และบรรทัด ทำงานในเบราว์เซอร์ ข้อความไม่ถูกส่งออกไปที่ใด ใช้ง่าย"
icon: "🔤"
category: "text"
weight: 25
byline: true
date: 2026-11-05
lastmod: 2026-11-09
draft: false
---

<style>
.cp-tool{margin:1rem 0 1.5rem}
.cp-tool textarea{width:100%;min-height:180px;padding:.75rem;border:1px solid #9994;border-radius:8px;font:inherit;line-height:1.5;resize:vertical;box-sizing:border-box;background:transparent;color:inherit}
.cp-tool textarea:focus{outline:2px solid #3b82f6;outline-offset:1px}
.cp-actions{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}
.cp-btn{padding:.55rem 1.1rem;border:1px solid #9996;border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.cp-btn:hover{background:#9992}
.cp-btn-main{background:#2563eb;border-color:#2563eb;color:#fff}
.cp-btn-main:hover{background:#1d4ed8}
.cp-stats{display:flex;flex-wrap:wrap;gap:1rem;margin-top:.75rem;font-size:.9rem;opacity:.8}
.cp-status{min-height:1.5rem;margin-top:.5rem;font-size:.95rem;font-weight:600}
</style>
<div class="cp-tool" id="cp-tool">
<textarea id="cp-text" placeholder="พิมพ์หรือวางข้อความที่ต้องการคัดลอกที่นี่..." aria-label="ข้อความที่ต้องการคัดลอก"></textarea>
<div class="cp-stats"><span>อักขระ: <b id="cp-chars">0</b></span><span>คำ: <b id="cp-words">0</b></span><span>บรรทัด: <b id="cp-lines">0</b></span></div>
<div class="cp-actions">
<button type="button" class="cp-btn cp-btn-main" id="cp-copy">คัดลอก</button>
<button type="button" class="cp-btn" id="cp-paste">วางจากคลิปบอร์ด</button>
<button type="button" class="cp-btn" id="cp-clear">ล้างข้อความ</button>
</div>
<div class="cp-status" id="cp-status" role="status" aria-live="polite"></div>
</div>

<script>
(function () {
  var ta = document.getElementById('cp-text');
  var elChars = document.getElementById('cp-chars');
  var elWords = document.getElementById('cp-words');
  var elLines = document.getElementById('cp-lines');
  var status = document.getElementById('cp-status');
  var timer = null;
  if (!ta) { return; }
  function say(msg) {
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; }, 2500);
  }
  function countWords(text) {
    var t = text.trim();
    if (t.length === 0) { return 0; }
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        var seg = new Intl.Segmenter('th', { granularity: 'word' });
        var n = 0;
        var it = seg.segment(t)[Symbol.iterator]();
        var r = it.next();
        while (!r.done) {
          if (r.value.isWordLike) { n++; }
          r = it.next();
        }
        return n;
      } catch (e) { }
    }
    return t.split(/\s+/).length;
  }
  function update() {
    var v = ta.value;
    elChars.textContent = Array.from(v).length;
    elWords.textContent = countWords(v);
    elLines.textContent = v.length === 0 ? 0 : v.split('\n').length;
  }
  function fallbackCopy() {
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    return ok;
  }
  function copyNow() {
    if (ta.value.length === 0) { say('ยังไม่มีข้อความให้คัดลอก'); ta.focus(); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(function () {
        say('คัดลอกแล้ว ✓');
      }, function () {
        say(fallbackCopy() ? 'คัดลอกแล้ว ✓' : 'คัดลอกไม่สำเร็จ กรุณาลองกด Ctrl+C');
      });
    } else {
      say(fallbackCopy() ? 'คัดลอกแล้ว ✓' : 'คัดลอกไม่สำเร็จ กรุณาลองกด Ctrl+C');
    }
  }
  function pasteNow() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        ta.value = t;
        update();
        say('วางข้อความแล้ว');
      }, function () {
        say('เบราว์เซอร์ไม่อนุญาตให้อ่านคลิปบอร์ด กรุณาใช้ Ctrl+V');
        ta.focus();
      });
    } else {
      say('เบราว์เซอร์ไม่รองรับ กรุณาใช้ Ctrl+V');
      ta.focus();
    }
  }
  function clearNow() {
    ta.value = '';
    update();
    ta.focus();
    say('ล้างข้อความแล้ว');
  }
  ta.addEventListener('input', update);
  document.getElementById('cp-copy').addEventListener('click', copyNow);
  document.getElementById('cp-paste').addEventListener('click', pasteNow);
  document.getElementById('cp-clear').addEventListener('click', clearNow);
  update();
})();
</script>

## วิธีใช้งาน

1. พิมพ์หรือวางข้อความที่ต้องการลงในช่องข้อความด้านบน (กด Ctrl+V หรือปุ่ม "วางจากคลิปบอร์ด")
2. ตรวจสอบจำนวนอักขระ คำ และบรรทัดที่แสดงใต้ช่องข้อความ
3. กดปุ่ม "คัดลอก" เมื่อเห็นข้อความ "คัดลอกแล้ว ✓" แสดงว่าข้อความอยู่ในคลิปบอร์ดเรียบร้อย
4. ไปยังแอปหรือเว็บที่ต้องการ แล้วกด Ctrl+V (Mac ใช้ Cmd+V) เพื่อวางข้อความ
5. กด "ล้างข้อความ" หากต้องการเริ่มใหม่

## คำอธิบายศัพท์

- **คลิปบอร์ด (Clipboard)** – พื้นที่เก็บข้อมูลชั่วคราวของอุปกรณ์ ใช้พักข้อความที่คัดลอกไว้ก่อนนำไปวาง
- **คัดลอก (Copy)** – การทำสำเนาข้อความไปไว้ในคลิปบอร์ด โดยข้อความต้นฉบับยังอยู่เหมือนเดิม
- **วาง (Paste)** – การนำข้อความจากคลิปบอร์ดมาใส่ในตำแหน่งที่ต้องการ
- **อักขระ (Character)** – ตัวอักษร ตัวเลข สัญลักษณ์ ช่องว่าง หรืออีโมจิ แต่ละตัวนับเป็น 1 อักขระ
- **คำ (Word)** – กลุ่มตัวอักษรที่มีความหมาย เครื่องมือนี้แบ่งคำภาษาไทยอัตโนมัติตามเบราว์เซอร์ที่รองรับ
- **บรรทัด (Line)** – ข้อความที่ถูกแบ่งด้วยการกด Enter แต่ละครั้ง
- **ล้างข้อความ (Clear)** – ลบข้อความทั้งหมดในช่องเพื่อเริ่มใหม่

## หมายเหตุ

- เครื่องมือนี้ทำงานในเบราว์เซอร์ของคุณทั้งหมด ข้อความไม่ถูกส่งออกไปยังเซิร์ฟเวอร์ใด
- ปุ่ม "วางจากคลิปบอร์ด" ต้องได้รับอนุญาตจากเบราว์เซอร์ก่อน หากไม่ทำงานให้ใช้ Ctrl+V แทน
- ข้อความจะหายเมื่อรีเฟรชหรือปิดหน้านี้ จึงควรคัดลอกก่อนออกจากหน้า