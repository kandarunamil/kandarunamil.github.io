---
title: "เครื่องนวดสั่นบนมือถือ"
seoTitle: "เครื่องนวดสั่นบนมือถือ ออนไลน์ ฟรี"
h1: "เครื่องนวดสั่นบนมือถือ"
description: "เครื่องนวดสั่นบนมือถือออนไลน์ ฟรี เลือกโหมดสั่นช้า ปานกลาง เร็ว จังหวะก้าวหน้า กลอง และตลอดเวลา ปรับความแรงได้ ใช้ได้บน Android ผ่าน Chrome และ Firefox"
icon: "🎬"
category: "media"
weight: 32
byline: true
date: 2026-11-05
lastmod: 2026-11-11
draft: false
jsFile: "js/vibrator.js"
---

เครื่องนวดสั่นบนมือถือเป็นเครื่องมือออนไลน์ที่ใช้ฟีเจอร์สั่นของอุปกรณ์ผ่านเบราว์เซอร์ ไม่ต้องติดตั้งแอป เลือกโหมด ปรับความแรง แล้วกดเริ่มได้ทันที

<style>
.vb-box{max-width:480px;margin:1.5rem auto;padding:1.25rem;border:1px solid rgba(128,128,128,.35);border-radius:16px;text-align:center}
.vb-warn{display:none;margin:0 0 1rem;padding:.75rem 1rem;border-radius:10px;background:rgba(255,170,0,.15);border:1px solid rgba(255,170,0,.5);font-size:.95rem}
.vb-modes{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;margin:0 0 1.25rem}
.vb-mode{padding:.7rem .5rem;border:1px solid rgba(128,128,128,.45);border-radius:10px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.vb-mode[aria-pressed="true"]{background:#4f46e5;border-color:#4f46e5;color:#fff}
.vb-row{margin:0 0 1.25rem;text-align:left}
.vb-row label{display:block;margin:0 0 .4rem;font-weight:600}
.vb-row input[type=range]{width:100%}
.vb-start{width:100%;padding:.9rem;border:0;border-radius:12px;background:#16a34a;color:#fff;font:inherit;font-size:1.1rem;font-weight:700;cursor:pointer}
.vb-start.vb-on{background:#dc2626}
.vb-start:disabled{opacity:.5;cursor:not-allowed}
.vb-status{margin:.9rem 0 0;font-size:.95rem;opacity:.85}
.vb-pulse{animation:vbpulse .35s infinite alternate}
@keyframes vbpulse{from{transform:translateX(-2px)}to{transform:translateX(2px)}}
</style>
<div class="vb-box" id="vb-box">
<p class="vb-warn" id="vb-warn">อุปกรณ์หรือเบราว์เซอร์นี้ไม่รองรับการสั่น กรุณาเปิดหน้านี้ด้วย Chrome หรือ Firefox บนมือถือ Android</p>
<div class="vb-modes" id="vb-modes">
<button type="button" class="vb-mode" data-mode="slow" aria-pressed="true">สั่นช้า</button>
<button type="button" class="vb-mode" data-mode="medium" aria-pressed="false">สั่นปานกลาง</button>
<button type="button" class="vb-mode" data-mode="fast" aria-pressed="false">สั่นเร็ว</button>
<button type="button" class="vb-mode" data-mode="progressive" aria-pressed="false">จังหวะก้าวหน้า</button>
<button type="button" class="vb-mode" data-mode="drum" aria-pressed="false">กลอง</button>
<button type="button" class="vb-mode" data-mode="constant" aria-pressed="false">ตลอดเวลา</button>
</div>
<div class="vb-row">
<label for="vb-level">ความแรง: <span id="vb-level-text">5</span> / 10</label>
<input type="range" id="vb-level" min="1" max="10" step="1" value="5">
</div>
<button type="button" class="vb-start" id="vb-start">เริ่มสั่น</button>
<p class="vb-status" id="vb-status" aria-live="polite">เลือกโหมดและความแรง แล้วกดเริ่มสั่น</p>
</div>


## วิธีใช้เครื่องนวดสั่นบนมือถือ

1. เปิดหน้านี้ด้วย Chrome หรือ Firefox บนมือถือ Android (ไม่รองรับ iPhone และเดสก์ท็อป)
2. เลือกโหมดการสั่นที่ต้องการจากปุ่มด้านบน
3. เลื่อนแถบ "ความแรง" เพื่อปรับระดับตั้งแต่ 1 (เบา) ถึง 10 (แรงสุด)
4. กดปุ่ม "เริ่มสั่น" เพื่อเริ่มทำงาน
5. กดปุ่ม "หยุดสั่น" เมื่อต้องการหยุด ระบบจะหยุดให้อัตโนมัติเมื่อคุณสลับแอปหรือปิดหน้าเว็บ
6. หากมือถือไม่สั่น ให้ตรวจสอบว่าไม่ได้เปิดโหมดเงียบหรือโหมดประหยัดแบตเตอรี่ และเปิดการสั่นของระบบไว้

## คำอธิบายศัพท์ในเครื่องมือ

- **สั่นช้า**: สั่นเป็นจังหวะยาว รอบละประมาณ 1 วินาที ให้ความรู้สึกนุ่มและผ่อนคลาย
- **สั่นปานกลาง**: สั่นรอบละประมาณ 0.5 วินาที เหมาะกับการใช้งานทั่วไป
- **สั่นเร็ว**: สั่นถี่ รอบละประมาณ 0.2 วินาที ให้ความรู้สึกกระตุ้นมากกว่าโหมดอื่น
- **จังหวะก้าวหน้า**: การสั่นค่อย ๆ ยาวขึ้นทีละขั้นภายในหนึ่งรอบ แล้ววนกลับมาเริ่มใหม่
- **กลอง**: สั่นเป็นลำดับสั้น สั้น ยาว คล้ายจังหวะตีกลอง
- **ตลอดเวลา**: สั่นต่อเนื่องไม่มีช่วงหยุด
- **ความแรง**: ระดับ 1 ถึง 10 ที่ปรับสัดส่วนเวลาที่เครื่องสั่นต่อเวลาหยุดในแต่ละรอบ ยิ่งค่าสูงยิ่งสั่นนานและรู้สึกแรงขึ้น
- **Vibration API**: ฟีเจอร์ของเบราว์เซอร์ที่ให้เว็บไซต์สั่งให้อุปกรณ์สั่นได้ เครื่องมือนี้ใช้ฟีเจอร์นี้ จึงไม่ต้องติดตั้งซอฟต์แวร์เพิ่ม

## ข้อควรรู้และคำเตือน

- เครื่องมือนี้ใช้ได้เฉพาะอุปกรณ์ที่รองรับการสั่นของเบราว์เซอร์ ส่วนใหญ่คือมือถือ Android ที่ใช้ Chrome หรือ Firefox
- iPhone และคอมพิวเตอร์เดสก์ท็อปส่วนใหญ่ไม่รองรับ จึงอาจไม่มีการสั่นเกิดขึ้น
- ไม่ควรใช้ต่อเนื่องเป็นเวลานาน การสั่นนานเกินไปอาจทำให้มือถือร้อนหรือกินแบตเตอรี่ และอาจเกิดความเสียหายกับตัวเครื่อง
- ใช้เพื่อความผ่อนคลายหรือทดสอบการสั่นของอุปกรณ์เท่านั้น หากรู้สึกไม่สบายให้หยุดใช้ทันที