---
title: "รายการสุ่ม"
seoTitle: "รายการสุ่ม ออนไลน์ ฟรี"
h1: "รายการสุ่ม"
description: "สุ่มเรียงลำดับรายการออนไลน์ฟรี วางรายชื่อหรือตัวเลขทีละบรรทัดแล้วกดสุ่มได้เลย ใช้ crypto.getRandomValues ทำงานในเบราว์เซอร์ ใช้ได้ทั้งมือถือและคอมพิวเตอร์"
icon: "🎲"
category: "random"
weight: 13
byline: true
date: 2026-11-05
lastmod: 2026-11-07
draft: false
---

เครื่องมือสุ่มเรียงลำดับรายการที่ทำงานในเบราว์เซอร์ทั้งหมด รายการอาจเป็นชื่อคน รายชื่อผู้เข้าร่วมจับฉลาก ราฟเฟิล ID หรือตัวเลขก็ได้ พิมพ์หรือวางข้อมูลหนึ่งรายการต่อหนึ่งบรรทัด แล้วกดปุ่ม "สุ่ม" เพื่อสับเปลี่ยนลำดับ ผลลัพธ์แก้ไขต่อได้ทันที

<style>
.rl-box{max-width:640px;margin:1.25rem 0;font-family:inherit}
.rl-box *{box-sizing:border-box}
.rl-box textarea{width:100%;min-height:260px;padding:.75rem;font-size:1rem;line-height:1.5;font-family:inherit;color:inherit;background:transparent;border:1px solid rgba(128,128,128,.5);border-radius:8px;resize:vertical}
.rl-box textarea:focus{outline:2px solid #3b82f6;outline-offset:1px}
.rl-bar{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem;align-items:center}
.rl-btn{padding:.55rem 1.1rem;font-size:1rem;font-family:inherit;color:inherit;background:transparent;border:1px solid rgba(128,128,128,.6);border-radius:8px;cursor:pointer}
.rl-btn:hover:not(:disabled){background:rgba(128,128,128,.15)}
.rl-btn:disabled{opacity:.45;cursor:not-allowed}
.rl-btn.rl-main{background:#2563eb;border-color:#2563eb;color:#fff;font-weight:600}
.rl-btn.rl-main:hover:not(:disabled){background:#1d4ed8}
.rl-opt{display:flex;align-items:center;gap:.4rem;margin-top:.6rem;font-size:.95rem;cursor:pointer}
.rl-info{margin-top:.6rem;font-size:.9rem;opacity:.75;min-height:1.3em}
</style>
<div class="rl-box" id="rl-box">
<textarea id="rl-text" placeholder="หนึ่งรายการต่อหนึ่งบรรทัด&#10;สมชาย&#10;สมหญิง&#10;มานะ&#10;ชูใจ" aria-label="รายการที่ต้องการสุ่ม" spellcheck="false"></textarea>
<div class="rl-bar">
<button type="button" class="rl-btn rl-main" id="rl-shuffle">สุ่ม</button>
<button type="button" class="rl-btn" id="rl-undo" disabled>เลิกทำ</button>
<button type="button" class="rl-btn" id="rl-copy">คัดลอก</button>
<button type="button" class="rl-btn" id="rl-clear">ล้าง</button>
</div>
<label class="rl-opt"><input type="checkbox" id="rl-dedupe"> ลบรายการที่ซ้ำกันก่อนสุ่ม</label>
<div class="rl-info" id="rl-info" role="status" aria-live="polite"></div>
</div>
<script>
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var ta = $("rl-text"), btnShuffle = $("rl-shuffle"), btnUndo = $("rl-undo");
  var btnCopy = $("rl-copy"), btnClear = $("rl-clear"), dedupe = $("rl-dedupe"), info = $("rl-info");
  if (!ta || !btnShuffle) { return; }
  var history = [];
  function getItems() {
    return ta.value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  }
  function randInt(max) {
    var cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj || !cryptoObj.getRandomValues) { return Math.floor(Math.random() * max); }
    var arr = new Uint32Array(1);
    var limit = Math.floor(4294967296 / max) * max;
    do { cryptoObj.getRandomValues(arr); } while (arr[0] >= limit);
    return arr[0] % max;
  }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randInt(i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function say(msg) { info.textContent = msg; }
  function updateCount() {
    var n = getItems().length;
    say(n > 0 ? "จำนวน " + n + " รายการ" : "");
  }
  function doShuffle() {
    var items = getItems();
    if (items.length === 0) { say("กรุณาใส่รายการอย่างน้อย 1 รายการ"); ta.focus(); return; }
    var removed = 0;
    if (dedupe.checked) {
      var seen = {}, uniq = [];
      items.forEach(function (it) { if (!seen.hasOwnProperty("k" + it)) { seen["k" + it] = 1; uniq.push(it); } });
      removed = items.length - uniq.length;
      items = uniq;
    }
    history.push(ta.value);
    if (history.length > 50) { history.shift(); }
    ta.value = shuffle(items).join("\n");
    btnUndo.disabled = false;
    say("สุ่มแล้ว " + items.length + " รายการ" + (removed > 0 ? " (ลบที่ซ้ำ " + removed + " รายการ)" : ""));
  }
  function doUndo() {
    if (history.length === 0) { return; }
    ta.value = history.pop();
    btnUndo.disabled = history.length === 0;
    updateCount();
  }
  function doCopy() {
    var text = ta.value;
    if (!text) { say("ไม่มีข้อความให้คัดลอก"); return; }
    function fallback() {
      ta.focus(); ta.select();
      try { document.execCommand("copy"); say("คัดลอกแล้ว"); } catch (e) { say("คัดลอกไม่สำเร็จ"); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say("คัดลอกแล้ว"); }, fallback);
    } else { fallback(); }
  }
  function doClear() {
    if (ta.value) { history.push(ta.value); btnUndo.disabled = false; }
    ta.value = "";
    say("");
    ta.focus();
  }
  btnShuffle.addEventListener("click", doShuffle);
  btnUndo.addEventListener("click", doUndo);
  btnCopy.addEventListener("click", doCopy);
  btnClear.addEventListener("click", doClear);
  ta.addEventListener("input", updateCount);
})();
</script>

## วิธีใช้งาน

1. **ใส่รายการ** พิมพ์หรือวางข้อมูลลงในช่องข้อความ โดยใส่หนึ่งรายการต่อหนึ่งบรรทัด (กด Enter เพื่อขึ้นบรรทัดใหม่) คัดลอกคอลัมน์จาก Excel หรือ Google Sheets มาวางได้เลย
2. **เลือกตัวเลือก (ถ้าต้องการ)** ติ๊ก "ลบรายการที่ซ้ำกันก่อนสุ่ม" หากในรายการมีข้อมูลซ้ำและต้องการให้เหลือเพียงรายการเดียว
3. **กดปุ่ม "สุ่ม"** ระบบจะสับเปลี่ยนลำดับทั้งหมดและแสดงผลในช่องเดียวกัน กดซ้ำได้ไม่จำกัดจนกว่าจะพอใจ
4. **ตรวจสอบหรือแก้ไขผลลัพธ์** ผลที่ได้แก้ไขได้โดยตรง เช่น เพิ่มหรือลบรายการ แล้วสุ่มต่อได้ทันที
5. **เลิกทำหรือคัดลอก** กด "เลิกทำ" เพื่อย้อนกลับไปยังลำดับก่อนหน้า กด "คัดลอก" เพื่อนำผลไปวางในแอปอื่น และกด "ล้าง" เพื่อเริ่มใหม่

ข้อมูลทั้งหมดถูกประมวลผลในเบราว์เซอร์ของคุณเท่านั้น ไม่มีการส่งรายการไปยังเซิร์ฟเวอร์

## ความหมายของคำศัพท์

- **รายการสุ่ม (Random List)** การนำรายการหลายรายการมาจัดเรียงลำดับใหม่แบบไม่มีรูปแบบที่คาดเดาได้ เหมาะกับการจัดลำดับผู้พูด แบ่งทีม หรือเรียงคิว
- **สับเปลี่ยน (Shuffle)** การสลับตำแหน่งของรายการทั้งหมด เหมือนการสับไพ่ โดยทุกรายการยังอยู่ครบ เพียงเปลี่ยนลำดับ
- **หนึ่งรายการต่อบรรทัด** รูปแบบการป้อนข้อมูลที่ระบบใช้แยกรายการ โดยนับข้อความแต่ละบรรทัดเป็นหนึ่งรายการ บรรทัดว่างจะถูกข้ามไป
- **ราฟเฟิล (Raffle)** การจับฉลากชิงรางวัลที่ผู้ร่วมกิจกรรมมีโอกาสถูกเลือกเท่าเทียมกัน ใช้ได้โดยสุ่มรายชื่อแล้วดูลำดับแรก
- **ID** รหัสประจำตัวของแต่ละรายการ เช่น รหัสพนักงาน เลขที่ใบสมัคร หรือหมายเลขตั๋ว ใช้สุ่มลำดับได้เช่นเดียวกับชื่อ
- **เลิกทำ (Undo)** การย้อนกลับไปยังลำดับหรือข้อความก่อนการสุ่มหรือล้างครั้งล่าสุด
- **ลบรายการที่ซ้ำกัน (Remove Duplicates)** การตัดรายการที่มีข้อความเหมือนกันทุกตัวอักษรออก ให้เหลือเพียงหนึ่งรายการก่อนสุ่ม
- **crypto.getRandomValues** ฟังก์ชันสร้างตัวเลขสุ่มระดับการเข้ารหัสลับที่เบราว์เซอร์จัดเตรียมไว้ ให้ผลที่คาดเดาได้ยากกว่า Math.random
- **Math.random** ฟังก์ชันสุ่มทั่วไปของ JavaScript ที่เร็วแต่ไม่เหมาะกับงานที่ต้องการความไม่แน่นอนสูง เครื่องมือนี้ใช้เป็นตัวสำรองเฉพาะเมื่อเบราว์เซอร์ไม่รองรับ crypto
- **อัลกอริทึม Fisher-Yates** วิธีสับเปลี่ยนมาตรฐานที่ให้ทุกลำดับเกิดขึ้นได้ด้วยความน่าจะเป็นเท่ากัน จึงยุติธรรมกว่าการเรียงด้วยการสุ่มค่าเปรียบเทียบ
- **ทำงานฝั่งเบราว์เซอร์ (Client-side)** การประมวลผลบนอุปกรณ์ของคุณเอง ข้อมูลไม่ถูกอัปโหลดหรือเก็บไว้ที่ใด

## คำถามที่พบบ่อย

**ใช้สุ่มใน Excel ยากหรือไม่?** การสุ่มเรียงลำดับใน Excel ต้องใช้สูตรและคอลัมน์ช่วยหลายขั้นตอน ลองคัดลอกข้อมูลมาวางที่นี่แล้วกดสุ่มจะสะดวกกว่า จากนั้นคัดลอกผลกลับไปวางได้

**ผลลัพธ์ยุติธรรมหรือไม่?** ใช้การสุ่มด้วย crypto.getRandomValues ร่วมกับอัลกอริทึม Fisher-Yates ทุกลำดับมีโอกาสเกิดเท่ากัน

**ใช้ได้กี่รายการ?** ไม่มีขีดจำกัดตายตัว แต่หากมีหลายหมื่นรายการ ความเร็วอาจขึ้นกับอุปกรณ์ของคุณ

**ควรทราบก่อนใช้งาน** โปรดปฏิบัติตามกฎหมายท้องถิ่นเมื่อใช้ในกิจกรรมชิงรางวัล ผู้ใช้เป็นผู้รับผิดชอบการใช้งานของตนเอง และเครื่องมือนี้ให้บริการตามสภาพที่เป็นอยู่ โดยไม่มีการรับประกันใด ๆ