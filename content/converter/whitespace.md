---
title: "ตัวแปลงช่องว่างและการขึ้นบรรทัดใหม่"
seoTitle: "ตัวแปลงช่องว่างและการขึ้นบรรทัดใหม่ ออนไลน์ ฟรี"
h1: "ตัวแปลงช่องว่างและการขึ้นบรรทัดใหม่"
description: "ตัวแปลงช่องว่างและการขึ้นบรรทัดใหม่ฟรี เพิ่มช่องว่างหลายช่อง เว้นบรรทัดว่าง เยื้องข้อความในโพสต์ Facebook Instagram ใช้ในเบราว์เซอร์ได้ ไม่ต้องสมัครสมาชิก"
icon: "🔤"
category: "text"
weight: 26
byline: true
date: 2026-11-05
lastmod: 2026-11-10
draft: false
---

วางข้อความของคุณในช่องด้านล่าง แล้วกดปุ่มเพื่อแปลงและคัดลอกผลลัพธ์ได้ทันที เครื่องมือนี้จะแทรกอักขระที่มองไม่เห็นเข้าไประหว่างช่องว่างและบรรทัดว่าง เพื่อให้แพลตฟอร์มอย่าง Facebook, Instagram และ X ไม่ตัดช่องว่างหรือบรรทัดว่างที่คุณตั้งใจใส่ไว้ออก

<style>
.ws-tool{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:16px;margin:16px 0;font-family:inherit}
.ws-tool label{display:block;font-weight:600;margin:0 0 6px}
.ws-tool textarea{width:100%;box-sizing:border-box;min-height:140px;padding:10px;border:1px solid rgba(128,128,128,.45);border-radius:8px;background:transparent;color:inherit;font:inherit;line-height:1.5;resize:vertical}
.ws-tool select{padding:8px 10px;border:1px solid rgba(128,128,128,.45);border-radius:8px;background:transparent;color:inherit;font:inherit;max-width:100%}
.ws-opts{display:flex;flex-wrap:wrap;gap:8px 18px;margin:12px 0}
.ws-opts label{display:inline-flex;align-items:center;gap:6px;font-weight:400;margin:0;cursor:pointer}
.ws-row{margin:12px 0}
.ws-actions{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 4px}
.ws-btn{padding:10px 18px;border:0;border-radius:8px;background:#2563eb;color:#fff;font:inherit;font-weight:600;cursor:pointer}
.ws-btn:hover{background:#1d4ed8}
.ws-btn.ws-secondary{background:transparent;color:inherit;border:1px solid rgba(128,128,128,.55)}
.ws-btn.ws-secondary:hover{background:rgba(128,128,128,.15)}
.ws-status{min-height:1.5em;margin:8px 0 0;font-size:.95em;opacity:.85}
</style>
<div class="ws-tool" id="ws-tool">
<div class="ws-row"><label for="ws-input">ข้อความต้นฉบับ</label><textarea id="ws-input" placeholder="พิมพ์หรือวางข้อความที่นี่ (ใส่ช่องว่างหลายช่องหรือเว้นบรรทัดตามต้องการ)"></textarea></div>
<div class="ws-opts">
<label><input type="checkbox" id="ws-opt-spaces" checked> รักษาช่องว่างหลายช่อง</label>
<label><input type="checkbox" id="ws-opt-blank" checked> รักษาบรรทัดว่าง</label>
<label><input type="checkbox" id="ws-opt-indent" checked> รักษาการเยื้องต้นบรรทัด</label>
</div>
<div class="ws-row"><label for="ws-type">อักขระที่ใช้แทรก</label><select id="ws-type">
<option value="zwsp">Zero-Width Space (U+200B)</option>
<option value="zwnj">Zero-Width Non-Joiner (U+200C)</option>
<option value="wj">Word Joiner (U+2060)</option>
<option value="hangul">Hangul Filler (U+3164)</option>
<option value="braille">Braille Blank (U+2800)</option>
</select></div>
<div class="ws-actions">
<button type="button" class="ws-btn" id="ws-convert">แปลงและคัดลอก</button>
<button type="button" class="ws-btn ws-secondary" id="ws-clear">ล้างข้อความ</button>
</div>
<div class="ws-status" id="ws-status" role="status" aria-live="polite"></div>
<div class="ws-row"><label for="ws-output">ผลลัพธ์</label><textarea id="ws-output" readonly placeholder="ผลลัพธ์ที่แปลงแล้วจะแสดงที่นี่"></textarea></div>
</div>
<script>
(function () {
  var CHARS = { zwsp: '\u200B', zwnj: '\u200C', wj: '\u2060', hangul: '\u3164', braille: '\u2800' };
  function byId(id) { return document.getElementById(id); }
  var input = byId('ws-input');
  var output = byId('ws-output');
  var status = byId('ws-status');
  var typeEl = byId('ws-type');
  var optSpaces = byId('ws-opt-spaces');
  var optBlank = byId('ws-opt-blank');
  var optIndent = byId('ws-opt-indent');
  if (!input || !output || !status || !typeEl) { return; }
  function convert(text, opts) {
    var zw = CHARS[opts.type] || CHARS.zwsp;
    var count = 0;
    function joinWith(s) {
      count += Math.max(s.length - 1, 0);
      return s.split('').join(zw);
    }
    var lines = text.replace(/\r\n?/g, '\n').replace(/\t/g, '    ').split('\n');
    var result = lines.map(function (line) {
      if (line.trim() === '') {
        if (opts.blank) { count += 1; return zw; }
        return line;
      }
      var m = /^( *)([\s\S]*)$/.exec(line);
      var lead = m[1];
      var rest = m[2];
      if (opts.indent && lead.length > 0) {
        count += 1;
        lead = zw + joinWith(lead);
      }
      if (opts.spaces) {
        rest = rest.replace(/ {2,}/g, joinWith);
      }
      return lead + rest;
    });
    return { text: result.join('\n'), count: count };
  }
  function fallbackCopy() {
    try {
      output.focus();
      output.select();
      return document.execCommand('copy');
    } catch (e) {
      return false;
    }
  }
  function copyOutput(done) {
    var value = output.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(
        function () { done(true); },
        function () { done(fallbackCopy()); }
      );
    } else {
      done(fallbackCopy());
    }
  }
  byId('ws-convert').addEventListener('click', function () {
    if (input.value === '') {
      output.value = '';
      status.textContent = 'กรุณาป้อนข้อความก่อน';
      return;
    }
    var r = convert(input.value, {
      type: typeEl.value,
      spaces: optSpaces.checked,
      blank: optBlank.checked,
      indent: optIndent.checked
    });
    output.value = r.text;
    copyOutput(function (ok) {
      status.textContent = ok
        ? 'แปลงและคัดลอกเรียบร้อย (แทรกอักขระ ' + r.count + ' ตัว)'
        : 'แปลงเรียบร้อย (แทรกอักขระ ' + r.count + ' ตัว) กรุณาคัดลอกจากช่องผลลัพธ์ด้วยตนเอง';
    });
  });
  byId('ws-clear').addEventListener('click', function () {
    input.value = '';
    output.value = '';
    status.textContent = '';
    input.focus();
  });
})();
</script>

## วิธีใช้งาน

1. พิมพ์หรือวางข้อความต้นฉบับลงในช่อง "ข้อความต้นฉบับ" โดยใส่ช่องว่างหรือเว้นบรรทัดตามที่ต้องการ
2. เลือกตัวเลือกที่ต้องการ เช่น รักษาช่องว่างหลายช่อง รักษาบรรทัดว่าง หรือรักษาการเยื้องต้นบรรทัด (ค่าเริ่มต้นเปิดทั้งหมด)
3. หากแพลตฟอร์มปลายทางยังตัดช่องว่าง ให้ลองเปลี่ยนอักขระที่ใช้แทรก เช่น Hangul Filler หรือ Braille Blank
4. กดปุ่ม "แปลงและคัดลอก" ระบบจะแสดงผลลัพธ์และคัดลอกให้อัตโนมัติ
5. เปิด Facebook, Instagram หรือแอปที่ต้องการ แล้ววางข้อความลงไป

เคล็ดลับ: หากปุ่มคัดลอกอัตโนมัติใช้ไม่ได้ในเบราว์เซอร์ของคุณ ให้แตะที่ช่อง "ผลลัพธ์" เลือกข้อความทั้งหมด แล้วคัดลอกด้วยตนเอง

## คำอธิบายศัพท์

- **ช่องว่าง (Space):** อักขระเว้นวรรคระหว่างคำ แพลตฟอร์มหลายแห่งจะยุบช่องว่างที่ติดกันให้เหลือช่องเดียว
- **การขึ้นบรรทัดใหม่ (Line Break):** การกด Enter เพื่อขึ้นบรรทัดใหม่ ใช้แบ่งข้อความเป็นบรรทัดหรือย่อหน้า
- **บรรทัดว่าง (Blank Line):** บรรทัดที่ไม่มีข้อความ ใช้เว้นระยะระหว่างย่อหน้า แต่บางแพลตฟอร์มจะลบทิ้งโดยอัตโนมัติ
- **การเยื้อง (Indent):** การเว้นช่องว่างที่ต้นบรรทัดเพื่อให้ข้อความขยับเข้าไปด้านใน
- **อักขระความกว้างศูนย์ (Zero-Width Character):** อักขระที่ไม่แสดงให้เห็นและไม่กินพื้นที่ แต่ระบบยังนับว่าเป็นตัวอักษร จึงช่วยกันไม่ให้ช่องว่างถูกยุบ
- **Zero-Width Space (U+200B):** ช่องว่างความกว้างศูนย์ ใช้งานได้กว้างที่สุดและเป็นค่าเริ่มต้นของเครื่องมือนี้
- **Zero-Width Non-Joiner (U+200C):** อักขระความกว้างศูนย์ที่ใช้แยกตัวอักษรไม่ให้เชื่อมกัน
- **Word Joiner (U+2060):** อักขระความกว้างศูนย์ที่ห้ามไม่ให้ขึ้นบรรทัดใหม่ตรงตำแหน่งนั้น
- **Hangul Filler (U+3164):** อักขระว่างของภาษาเกาหลี มีลักษณะเป็นช่องว่างที่มองไม่เห็น แพลตฟอร์มส่วนใหญ่ไม่ตัดทิ้ง
- **Braille Blank (U+2800):** จุดอักษรเบรลล์แบบว่าง ดูเหมือนช่องว่างแต่ถูกมองเป็นอักขระปกติ
- **Unicode:** มาตรฐานรหัสอักขระสากลที่ใช้แสดงตัวอักษรและสัญลักษณ์จากทุกภาษา รวมถึงอักขระที่มองไม่เห็นเหล่านี้