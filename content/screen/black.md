---
title: "เต็มหน้าจอสีดำ"
seoTitle: "เต็มหน้าจอสีดำ ออนไลน์ ฟรี"
h1: "เต็มหน้าจอสีดำ"
description: "เต็มหน้าจอสีดำออนไลน์ฟรี แตะครั้งเดียวก็เปิดหน้าจอดำเต็มจอ พร้อมเปิดหน้าจอค้างไว้ได้ ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งแอป ตรวจจอได้ง่ายมาก"
icon: "📱"
category: "device"
weight: 20
byline: true
date: 2026-11-05
lastmod: 2026-11-08
draft: false
---
<div class="bs-tool" id="bsTool">
<div class="bs-screen" id="bsScreen" role="button" tabindex="0" aria-label="แตะเพื่อเปิดเต็มหน้าจอสีดำ">
<span class="bs-hint" id="bsHint">แตะที่นี่เพื่อเปิดเต็มหน้าจอสีดำ</span>
</div>
<div class="bs-actions">
<button type="button" class="bs-btn" id="bsFull">เต็มหน้าจอ</button>
<label class="bs-check"><input type="checkbox" id="bsAwake"> เปิดหน้าจอค้างไว้</label>
</div>
<p class="bs-status" id="bsStatus" aria-live="polite"></p>
</div>
<style>
.bs-tool{max-width:720px;margin:1.5rem auto}
.bs-screen{position:relative;background:#000;color:#9a9a9a;border:1px solid rgba(128,128,128,.5);border-radius:12px;height:260px;display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}
.bs-screen:focus-visible{outline:3px solid #4d90fe;outline-offset:2px}
.bs-hint{padding:0 1rem;font-size:1rem}
.bs-actions{display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;justify-content:center;margin-top:1rem}
.bs-btn{padding:.6rem 1.25rem;border:0;border-radius:8px;background:#111;color:#fff;font-size:1rem;cursor:pointer}
.bs-btn:hover{background:#333}
.bs-check{display:flex;align-items:center;gap:.4rem;cursor:pointer}
.bs-status{min-height:1.5em;margin:.75rem 0 0;text-align:center;font-size:.9rem;opacity:.8}
.bs-screen.bs-fake{position:fixed;top:0;left:0;right:0;bottom:0;width:100vw;height:100vh;height:100dvh;border:0;border-radius:0;z-index:2147483647}
.bs-screen:fullscreen{width:100%;height:100%;border:0;border-radius:0;cursor:none}
.bs-screen:-webkit-full-screen{width:100%;height:100%;border:0;border-radius:0;cursor:none}
.bs-screen.bs-fake .bs-hint,.bs-screen:fullscreen .bs-hint{opacity:0}
.bs-screen:-webkit-full-screen .bs-hint{opacity:0}
@media (prefers-color-scheme:dark){.bs-btn{background:#eee;color:#111}.bs-btn:hover{background:#fff}}
</style>
<script>
(function () {
  var screenEl = document.getElementById('bsScreen');
  var fullBtn = document.getElementById('bsFull');
  var awake = document.getElementById('bsAwake');
  var statusEl = document.getElementById('bsStatus');
  var hint = document.getElementById('bsHint');
  if (!screenEl || !fullBtn || !awake || !statusEl) { return; }
  var fake = false;
  var lock = null;
  function say(t) { statusEl.textContent = t || ''; }
  function fsElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }
  function isOn() { return !!fsElement() || fake; }
  function sync() {
    var on = isOn();
    fullBtn.textContent = on ? 'ออกจากเต็มหน้าจอ' : 'เต็มหน้าจอ';
    if (hint) { hint.textContent = 'แตะที่นี่เพื่อเปิดเต็มหน้าจอสีดำ'; }
  }
  function enter() {
    var req = screenEl.requestFullscreen || screenEl.webkitRequestFullscreen;
    if (req) {
      try {
        var p = req.call(screenEl);
        if (p && p.catch) {
          p.catch(function () { fake = true; screenEl.classList.add('bs-fake'); sync(); });
        }
        return;
      } catch (e) { /* fall through to fallback */ }
    }
    fake = true;
    screenEl.classList.add('bs-fake');
    sync();
  }
  function leave() {
    if (fsElement()) {
      var ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { try { ex.call(document); } catch (e) { /* ignore */ } }
    }
    fake = false;
    screenEl.classList.remove('bs-fake');
    sync();
  }
  function toggle() { if (isOn()) { leave(); } else { enter(); } }
  screenEl.addEventListener('click', toggle);
  screenEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    if (e.key === 'Escape' && fake) { leave(); }
  });
  fullBtn.addEventListener('click', toggle);
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('webkitfullscreenchange', sync);
  function requestLock() {
    if (!('wakeLock' in navigator)) {
      awake.checked = false;
      say('เบราว์เซอร์นี้ยังไม่รองรับการเปิดหน้าจอค้างไว้');
      return;
    }
    navigator.wakeLock.request('screen').then(function (l) {
      lock = l;
      say('เปิดหน้าจอค้างไว้แล้ว');
      l.addEventListener('release', function () { lock = null; });
    }).catch(function () {
      awake.checked = false;
      say('ไม่สามารถเปิดหน้าจอค้างไว้ได้ในขณะนี้');
    });
  }
  function releaseLock() {
    if (lock) { lock.release(); lock = null; }
    say('ปิดการเปิดหน้าจอค้างไว้แล้ว');
  }
  awake.addEventListener('change', function () {
    if (awake.checked) { requestLock(); } else { releaseLock(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && awake.checked && !lock) { requestLock(); }
  });
  sync();
})();
</script>

## วิธีใช้งานเต็มหน้าจอสีดำ

1. แตะหรือคลิกที่กรอบสีดำด้านบน หรือกดปุ่ม **เต็มหน้าจอ** เพื่อเปิดหน้าจอสีดำทั้งจอ
2. หากต้องการให้จอไม่ดับระหว่างใช้งาน ให้ติ๊กช่อง **เปิดหน้าจอค้างไว้** ก่อนหรือหลังเข้าโหมดเต็มหน้าจอ
3. หากต้องการออก ให้แตะที่หน้าจออีกครั้ง หรือกดปุ่ม `Esc` บนคอมพิวเตอร์
4. บน iPhone หรือเบราว์เซอร์ที่ไม่รองรับโหมดเต็มหน้าจอ เครื่องมือจะแสดงสีดำคลุมทั้งหน้าเว็บแทน

## ความหมายของคำที่เกี่ยวข้อง

- **เต็มหน้าจอ (Fullscreen)** : โหมดแสดงผลที่ซ่อนแถบเมนูและแถบที่อยู่ของเบราว์เซอร์ ให้เหลือเฉพาะสีดำเต็มพื้นที่
- **เปิดหน้าจอค้างไว้ (Screen Wake Lock)** : ฟีเจอร์ที่ขอให้อุปกรณ์ไม่ปิดหน้าจออัตโนมัติ ตราบเท่าที่หน้าเว็บยังเปิดอยู่
- **Dead Pixel (พิกเซลเสีย)** : จุดบนหน้าจอที่ไม่แสดงสีตามปกติ มักเห็นเป็นจุดสว่างหรือจุดสีแปลกบนพื้นดำ
- **Backlight Bleed (แสงรั่ว)** : แสงไฟหลังจอที่ลอดออกมาตามขอบ จะเห็นชัดเมื่อเปิดภาพสีดำในที่มืด
- **จอ OLED / AMOLED** : จอที่พิกเซลปิดไฟได้เองเมื่อแสดงสีดำ จึงให้สีดำสนิทและช่วยประหยัดแบตเตอรี่
- **Burn-in (ภาพค้างจอ)** : เงาภาพที่ติดบนจอถาวรจากการแสดงภาพนิ่งนาน ๆ พบได้บ่อยในจอ OLED