---
title: "เต็มหน้าจอสีขาว"
seoTitle: "เต็มหน้าจอสีขาว ออนไลน์ ฟรี"
h1: "เต็มหน้าจอสีขาว"
description: "เต็มหน้าจอสีขาวออนไลน์ฟรี กดปุ่มเดียวเปิดสีขาวเต็มจอทันที ใช้ตรวจ Dead Pixel เป็นไฟส่องสว่าง หรือพื้นหลังถ่ายภาพ ใช้ได้ทั้งมือถือและคอม ไม่ต้องติดตั้งแอป"
icon: "📱"
category: "device"
weight: 21
byline: true
date: 2026-11-05
lastmod: 2026-11-08
draft: false
---

<div id="wfs-tool" class="wfs-tool">
<style>
.wfs-tool{margin:1.5rem 0;padding:1rem;border:1px solid rgba(128,128,128,.4);border-radius:12px;text-align:center}
.wfs-preview{height:160px;background:#ffffff;border:1px solid rgba(128,128,128,.5);border-radius:8px;margin-bottom:1rem}
.wfs-actions{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center}
.wfs-btn{padding:.7rem 1.4rem;font-size:1rem;line-height:1.2;border:1px solid rgba(128,128,128,.7);border-radius:8px;background:transparent;color:inherit;cursor:pointer}
.wfs-btn:hover{background:rgba(128,128,128,.15)}
.wfs-btn[aria-pressed="true"]{background:#2e7d32;border-color:#2e7d32;color:#ffffff}
.wfs-status{min-height:1.4em;margin:.8rem 0 0;font-size:.9rem;opacity:.8}
.wfs-overlay{display:none;position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;background:#ffffff;z-index:2147483647;cursor:pointer}
.wfs-hint{position:absolute;left:0;right:0;bottom:1.5rem;text-align:center;font-size:.9rem;color:#9e9e9e;opacity:0;animation:wfsHint 3s ease}
@keyframes wfsHint{0%{opacity:0}15%{opacity:1}75%{opacity:1}100%{opacity:0}}
</style>
<div class="wfs-preview" aria-hidden="true"></div>
<div class="wfs-actions">
<button type="button" id="wfs-fullscreen" class="wfs-btn">⛶ เต็มหน้าจอ</button>
<button type="button" id="wfs-awake" class="wfs-btn" aria-pressed="false">💡 เปิดหน้าจอไว้</button>
</div>
<p id="wfs-status" class="wfs-status" role="status" aria-live="polite"></p>
<div id="wfs-overlay" class="wfs-overlay" role="button" tabindex="0" aria-label="แตะเพื่อปิดหน้าจอสีขาว"><span id="wfs-hint" class="wfs-hint">แตะที่ใดก็ได้เพื่อปิด</span></div>
<script>
(function () {
  var overlay = document.getElementById('wfs-overlay');
  var hint = document.getElementById('wfs-hint');
  var btnFull = document.getElementById('wfs-fullscreen');
  var btnAwake = document.getElementById('wfs-awake');
  var statusEl = document.getElementById('wfs-status');
  if (!overlay || !btnFull || !btnAwake || !statusEl) { return; }
  var wakeLock = null;
  var wantAwake = false;
  function say(text) { statusEl.textContent = text; }
  function inFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }
  function openWhite() {
    overlay.style.display = 'block';
    hint.style.animation = 'none';
    void hint.offsetWidth;
    hint.style.animation = '';
    var req = overlay.requestFullscreen || overlay.webkitRequestFullscreen;
    if (req) {
      try {
        var result = req.call(overlay);
        if (result && result.catch) { result.catch(function () {}); }
      } catch (err) {}
    }
  }
  function closeWhite() {
    overlay.style.display = 'none';
    var exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (inFullscreen() && exit) {
      try {
        var result = exit.call(document);
        if (result && result.catch) { result.catch(function () {}); }
      } catch (err) {}
    }
  }
  function onFullscreenChange() {
    if (!inFullscreen() && overlay.style.display === 'block') {
      overlay.style.display = 'none';
    }
  }
  function requestWake() {
    if (!('wakeLock' in navigator)) {
      wantAwake = false;
      btnAwake.setAttribute('aria-pressed', 'false');
      say('เบราว์เซอร์นี้ยังไม่รองรับการเปิดหน้าจอไว้');
      return;
    }
    navigator.wakeLock.request('screen').then(function (lock) {
      wakeLock = lock;
      lock.addEventListener('release', function () { wakeLock = null; });
      btnAwake.setAttribute('aria-pressed', 'true');
      say('เปิดหน้าจอไว้แล้ว หน้าจอจะไม่ดับเอง');
    }).catch(function () {
      wantAwake = false;
      btnAwake.setAttribute('aria-pressed', 'false');
      say('ไม่สามารถเปิดหน้าจอไว้ได้ในขณะนี้');
    });
  }
  function releaseWake() {
    if (wakeLock) {
      try { wakeLock.release(); } catch (err) {}
      wakeLock = null;
    }
    btnAwake.setAttribute('aria-pressed', 'false');
    say('ปิดการเปิดหน้าจอไว้แล้ว');
  }
  btnFull.addEventListener('click', openWhite);
  overlay.addEventListener('click', closeWhite);
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { closeWhite(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.style.display === 'block') { closeWhite(); }
  });
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
  btnAwake.addEventListener('click', function () {
    wantAwake = !wantAwake;
    if (wantAwake) { requestWake(); } else { releaseWake(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && wantAwake && !wakeLock) { requestWake(); }
  });
})();
</script>
</div>

## วิธีใช้งานเครื่องมือเต็มหน้าจอสีขาว

1. กดปุ่ม **⛶ เต็มหน้าจอ** หน้าจอจะเปลี่ยนเป็นสีขาวล้วนเต็มพื้นที่ทันที
2. หากต้องการให้หน้าจอไม่ดับระหว่างใช้งาน ให้กดปุ่ม **💡 เปิดหน้าจอไว้** ก่อนหรือหลังเข้าโหมดเต็มหน้าจอ ปุ่มจะเป็นสีเขียวเมื่อเปิดใช้งานอยู่
3. ปรับความสว่างของหน้าจอตามที่ต้องการ เช่น เพิ่มความสว่างสูงสุดเมื่อใช้เป็นไฟส่องสว่าง
4. แตะหรือคลิกที่ใดก็ได้บนหน้าจอสีขาว หรือกดปุ่ม Esc บนคอมพิวเตอร์ เพื่อออกจากโหมดเต็มหน้าจอ
5. กดปุ่ม **💡 เปิดหน้าจอไว้** อีกครั้งเมื่อไม่ต้องการให้หน้าจอค้างแล้ว เพื่อประหยัดแบตเตอรี่

หมายเหตุ: บน iPhone และ iPad เบราว์เซอร์อาจไม่รองรับโหมดเต็มหน้าจอจริง เครื่องมือจะแสดงสีขาวคลุมทั้งหน้าจอแทน ซึ่งใช้งานได้เหมือนกัน

## คำอธิบายศัพท์ที่เกี่ยวข้อง

- **เต็มหน้าจอ (Fullscreen)** โหมดที่เว็บแสดงเนื้อหาเต็มพื้นที่หน้าจอ ซ่อนแถบที่อยู่และแถบเครื่องมือของเบราว์เซอร์
- **เปิดหน้าจอไว้ (Screen Wake Lock)** ฟีเจอร์ของเบราว์เซอร์ที่ขอให้อุปกรณ์ไม่ดับหน้าจออัตโนมัติ ตราบใดที่หน้าเว็บยังเปิดอยู่
- **สีขาว (#FFFFFF)** สีที่หน้าจอแสดงค่าแสงสูงสุดของทุกพิกเซล ใช้เป็นพื้นหลังหรือแหล่งกำเนิดแสงสว่างเรียบ ๆ
- **พิกเซล (Pixel)** จุดเล็ก ๆ ที่ประกอบกันเป็นภาพบนหน้าจอ แต่ละจุดแสดงสีได้ด้วยแสงสีแดง เขียว และน้ำเงิน
- **Dead Pixel** พิกเซลที่เสียและไม่ติด มักเห็นเป็นจุดดำบนพื้นสีขาว จึงใช้หน้าจอสีขาวตรวจหาได้ง่าย
- **Stuck Pixel** พิกเซลที่ค้างเป็นสีใดสีหนึ่ง เช่น แดง เขียว หรือน้ำเงิน ตลอดเวลา มองเห็นชัดบนพื้นสีขาวหรือสีดำ
- **Backlight Bleed** อาการแสงไฟหลังจอรั่วออกตามขอบ ทำให้ขอบจอสว่างไม่เท่ากัน ตรวจได้ง่ายกว่าบนหน้าจอสีดำในห้องมืด
- **ความสว่างหน้าจอ (Brightness)** ระดับความเข้มของแสงจากหน้าจอ ยิ่งสูงยิ่งสว่าง แต่ก็กินแบตเตอรี่มากขึ้น
- **จอ OLED และ LCD** OLED ให้แต่ละพิกเซลเปล่งแสงเอง ส่วน LCD ใช้ไฟส่องหลังจอ ทั้งสองชนิดใช้ตรวจคุณภาพจอด้วยสีพื้นได้

## ใช้เต็มหน้าจอสีขาวทำอะไรได้บ้าง

- ตรวจหา Dead Pixel และรอยจุดบนหน้าจอใหม่หรือมือสอง
- ใช้เป็นไฟส่องสว่างชั่วคราวในที่มืด
- ใช้เป็นพื้นหลังสีขาวเรียบสำหรับถ่ายภาพสินค้าหรือเอกสาร
- ทำความสะอาดหน้าจอ เพราะคราบฝุ่นและรอยนิ้วมือเห็นชัดบนพื้นสีขาว
- เปิดค้างไว้เป็นแสงพื้นหลังระหว่างทำกิจกรรมหรือถ่ายวิดีโอ