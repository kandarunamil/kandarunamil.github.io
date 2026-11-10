---
title: "สร้างรหัสผ่าน"
seoTitle: "สร้างรหัสผ่าน ออนไลน์ ฟรี"
h1: "สร้างรหัสผ่าน"
description: "สร้างรหัสผ่านออนไลน์ฟรี สุ่มรหัสผ่านปลอดภัยคาดเดายาก เลือกความยาวและประเภทอักขระได้ ทำงานในเบราว์เซอร์ ไม่ต้องสมัครสมาชิก ใช้ได้ทั้งมือถือและคอมพิวเตอร์"
icon: "🎲"
category: "random"
weight: 30
byline: true
date: 2026-11-05
lastmod: 2026-11-10
draft: false
---

<style>
.pw-tool{max-width:640px;margin:0 auto 1.5rem;padding:1rem;border:1px solid rgba(128,128,128,.35);border-radius:12px;box-sizing:border-box}
.pw-tool *{box-sizing:border-box}
.pw-out{position:relative;min-height:64px;padding:14px 16px;border:1px solid rgba(128,128,128,.45);border-radius:10px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:1.25rem;line-height:1.5;word-break:break-all;display:flex;align-items:center;justify-content:space-between;gap:12px}
.pw-text{flex:1;min-width:0}
.pw-toast{position:absolute;top:-12px;right:12px;padding:2px 10px;border-radius:999px;background:#16a34a;color:#fff;font-size:.8rem;font-family:inherit;opacity:0;transition:opacity .2s;pointer-events:none}
.pw-toast.show{opacity:1}
.pw-meta{margin:8px 2px 14px;font-size:.9rem;opacity:.8}
.pw-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:12px 0}
.pw-row label{cursor:pointer}
.pw-row input[type=range]{flex:1;min-width:140px}
.pw-row input[type=number]{width:72px;padding:6px 8px;border:1px solid rgba(128,128,128,.45);border-radius:8px;background:transparent;color:inherit;font-size:1rem}
.pw-checks{display:flex;flex-wrap:wrap;gap:8px 18px}
.pw-checks label{display:inline-flex;align-items:center;gap:6px}
.pw-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.pw-btn{padding:10px 20px;border:0;border-radius:10px;font-size:1rem;cursor:pointer;background:#2563eb;color:#fff}
.pw-btn.alt{background:transparent;color:inherit;border:1px solid rgba(128,128,128,.55)}
.pw-btn:hover{opacity:.9}
.pw-note{margin:12px 2px 0;font-size:.85rem;opacity:.75}
</style>
<div class="pw-tool" id="pw-tool">
<div class="pw-out"><span class="pw-toast" id="pw-toast">คัดลอกแล้ว</span><span class="pw-text" id="pw-output"></span></div>
<div class="pw-meta" id="pw-meta"></div>
<div class="pw-row"><label for="pw-length">ความยาว:</label><input type="number" id="pw-length" min="4" max="64" value="16"><input type="range" id="pw-range" min="4" max="64" value="16" aria-label="ความยาวรหัสผ่าน"></div>
<div class="pw-row pw-checks">
<label><input type="checkbox" id="pw-lower" checked> a - z</label>
<label><input type="checkbox" id="pw-upper" checked> A - Z</label>
<label><input type="checkbox" id="pw-digit" checked> 0 - 9</label>
<label><input type="checkbox" id="pw-symbol"> !@#$%</label>
</div>
<div class="pw-row pw-checks">
<label><input type="checkbox" id="pw-all" checked> ตรงกับตัวอักษรที่เลือกทั้งหมด</label>
<label><input type="checkbox" id="pw-similar" checked> ไม่รวมตัวอักษรที่คล้ายกัน: <strong>0 o O 1 i I l L</strong></label>
</div>
<div class="pw-btns"><button type="button" class="pw-btn" id="pw-gen">สร้างรหัสผ่าน</button><button type="button" class="pw-btn alt" id="pw-copy">คัดลอก</button></div>
<ul class="pw-note">
<li>รหัสผ่านถูกสร้างในเบราว์เซอร์ของคุณโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ตหรือส่งข้อมูลไปที่ใด</li>
<li>คลิกเพียงครั้งเดียวเพื่อสร้างรหัสผ่านและคัดลอกไปยังคลิปบอร์ดอัตโนมัติ</li>
</ul>
<script>
(function () {
  var LOWER = 'abcdefghijklmnopqrstuvwxyz';
  var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var DIGITS = '0123456789';
  var SYMBOLS = '!@#$%^&*-_+=?';
  var SIMILAR = '0oO1iIlL';
  var current = '';
  var toastTimer = null;
  function $(id) { return document.getElementById(id); }
  function rnd(n) {
    var buf = new Uint32Array(1);
    var max = Math.floor(4294967296 / n) * n;
    do { window.crypto.getRandomValues(buf); } while (buf[0] >= max);
    return buf[0] % n;
  }
  function clean(s) {
    if (!$('pw-similar').checked) { return s; }
    var o = '';
    for (var i = 0; s.length > i; i++) {
      if (SIMILAR.indexOf(s.charAt(i)) === -1) { o += s.charAt(i); }
    }
    return o;
  }
  function getLen() {
    var v = parseInt($('pw-length').value, 10);
    if (isNaN(v)) { v = 16; }
    if (4 > v) { v = 4; }
    if (v > 64) { v = 64; }
    return v;
  }
  function strengthLabel(bits) {
    if (bits >= 100) { return 'แข็งแรงมาก'; }
    if (bits >= 70) { return 'แข็งแรง'; }
    if (bits >= 50) { return 'ปานกลาง'; }
    return 'อ่อน';
  }
  function generate() {
    var sets = [];
    if ($('pw-lower').checked) { sets.push(clean(LOWER)); }
    if ($('pw-upper').checked) { sets.push(clean(UPPER)); }
    if ($('pw-digit').checked) { sets.push(clean(DIGITS)); }
    if ($('pw-symbol').checked) { sets.push(clean(SYMBOLS)); }
    var out = $('pw-output');
    var meta = $('pw-meta');
    if (sets.length === 0) {
      current = '';
      out.textContent = 'กรุณาเลือกอย่างน้อย 1 ประเภท';
      meta.textContent = '';
      return;
    }
    var len = getLen();
    var all = sets.join('');
    var chars = [];
    var i;
    if ($('pw-all').checked) {
      for (i = 0; sets.length > i; i++) { chars.push(sets[i].charAt(rnd(sets[i].length))); }
    }
    while (len > chars.length) { chars.push(all.charAt(rnd(all.length))); }
    for (i = chars.length - 1; i > 0; i--) {
      var j = rnd(i + 1);
      var t = chars[i]; chars[i] = chars[j]; chars[j] = t;
    }
    current = chars.join('');
    out.textContent = current;
    var bits = Math.round(len * Math.log(all.length) / Math.log(2));
    meta.textContent = 'ความยาว ' + len + ' ตัวอักษร · ความแข็งแรง: ' + strengthLabel(bits) + ' (ประมาณ ' + bits + ' บิต)';
  }
  function showToast() {
    var el = $('pw-toast');
    el.classList.add('show');
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1500);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    try { if (document.execCommand('copy')) { showToast(); } } catch (e) {}
    document.body.removeChild(ta);
  }
  function copy() {
    if (!current) { return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(current).then(showToast, function () { fallbackCopy(current); });
    } else {
      fallbackCopy(current);
    }
  }
  function syncFromNumber() {
    $('pw-range').value = getLen();
    generate();
  }
  $('pw-gen').addEventListener('click', function () { generate(); copy(); });
  $('pw-copy').addEventListener('click', copy);
  $('pw-length').addEventListener('input', syncFromNumber);
  $('pw-range').addEventListener('input', function () { $('pw-length').value = this.value; generate(); });
  var ids = ['pw-lower', 'pw-upper', 'pw-digit', 'pw-symbol', 'pw-all', 'pw-similar'];
  for (var k = 0; ids.length > k; k++) { $(ids[k]).addEventListener('change', generate); }
  generate();
})();
</script>
</div>

## วิธีใช้งานเครื่องมือสร้างรหัสผ่าน

1. **กำหนดความยาว** พิมพ์ตัวเลขในช่อง "ความยาว" หรือเลื่อนแถบสไลเดอร์ (4–64 ตัวอักษร) แนะนำอย่างน้อย 12–16 ตัวอักษรสำหรับบัญชีทั่วไป
2. **เลือกประเภทตัวอักษร** ติ๊กเลือก a - z, A - Z, 0 - 9 และสัญลักษณ์ ตามที่เว็บไซต์หรือแอปปลายทางกำหนด
3. **ตั้งค่าเพิ่มเติม** เลือก "ตรงกับตัวอักษรที่เลือกทั้งหมด" หากต้องการให้มีครบทุกประเภท และเลือก "ไม่รวมตัวอักษรที่คล้ายกัน" หากต้องพิมพ์หรืออ่านรหัสด้วยตา
4. **กดปุ่มสร้างรหัสผ่าน** ระบบจะสุ่มรหัสผ่านใหม่และคัดลอกไปยังคลิปบอร์ดให้อัตโนมัติ (ขึ้นข้อความ "คัดลอกแล้ว")
5. **นำไปวาง** กด Ctrl+V (หรือกดค้างแล้วเลือกวางบนมือถือ) ในช่องรหัสผ่าน และเก็บไว้ในโปรแกรมจัดการรหัสผ่านที่เชื่อถือได้

เมื่อปรับตัวเลือกใดก็ตาม รหัสผ่านจะถูกสร้างใหม่ทันที หากต้องการคัดลอกซ้ำให้กดปุ่ม "คัดลอก"

## คำอธิบายศัพท์ในเครื่องมือ

- **ความยาว** จำนวนตัวอักษรของรหัสผ่าน ยิ่งยาวยิ่งเดาและแฮ็กได้ยากขึ้น
- **a - z** ตัวอักษรภาษาอังกฤษพิมพ์เล็ก 26 ตัว เช่น a, b, c
- **A - Z** ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ 26 ตัว เช่น A, B, C
- **0 - 9** ตัวเลข 10 หลัก ใช้เพิ่มความหลากหลายให้รหัสผ่าน
- **สัญลักษณ์** อักขระพิเศษ เช่น ! @ # $ % ^ & * - _ + = ? ช่วยให้รหัสผ่านแข็งแรงขึ้น แต่บางเว็บไซต์อาจไม่รองรับ
- **ตรงกับตัวอักษรที่เลือกทั้งหมด** รหัสผ่านจะมีอย่างน้อย 1 ตัวจากทุกประเภทที่ติ๊กเลือก เหมาะกับเว็บไซต์ที่บังคับให้มีตัวพิมพ์ใหญ่ ตัวเลข และสัญลักษณ์
- **ไม่รวมตัวอักษรที่คล้ายกัน** ตัดตัวอักษรที่มองสับสนง่ายออก ได้แก่ 0 (ศูนย์), o, O (โอ), 1 (หนึ่ง), i, I (ไอใหญ่), l (แอลเล็ก), L เพื่อลดความผิดพลาดตอนพิมพ์ตาม
- **บิต (ความแข็งแรง)** ค่าประมาณความสุ่มของรหัสผ่าน ยิ่งมากยิ่งปลอดภัย ตั้งแต่ 70 บิตขึ้นไปถือว่าแข็งแรง
- **คัดลอกอัตโนมัติ** เมื่อกดสร้างรหัสผ่าน ระบบจะคัดลอกไปยังคลิปบอร์ดทันที ไม่ต้องลากคลุมเอง
- **ประมวลผลในเบราว์เซอร์** รหัสผ่านถูกสุ่มบนเครื่องของคุณด้วยตัวสุ่มที่ปลอดภัยของเบราว์เซอร์ ไม่มีการส่งไปยังเซิร์ฟเวอร์

## เคล็ดลับการตั้งรหัสผ่านให้ปลอดภัย

- ใช้รหัสผ่านที่แตกต่างกันในแต่ละบัญชี
- หลีกเลี่ยงชื่อ วันเกิด หรือเบอร์โทรศัพท์
- เปิดการยืนยันตัวตนสองขั้นตอน (2FA) เมื่อมีให้ใช้
- เก็บรหัสผ่านในโปรแกรมจัดการรหัสผ่าน แทนการจดหรือบันทึกในแชต