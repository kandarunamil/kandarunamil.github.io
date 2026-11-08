---
title: "กระจกเงา"
seoTitle: "กระจกเงา ออนไลน์ ฟรี"
h1: "กระจกเงา"
description: "กระจกเงาออนไลน์ฟรี เปิดกล้องส่องหน้าได้ทันทีในเบราว์เซอร์ ไม่ต้องติดตั้งแอป ไม่บันทึกวิดีโอหรือภาพ เลือกขนาดได้ 3 ระดับ ใช้ได้ทั้งมือถือและคอมพิวเตอร์"
icon: "📱"
category: "device"
weight: 22
byline: true
date: 2026-11-05
lastmod: 2026-11-08
draft: false
---

<div class="mr-tool" id="mr-tool">
<style>
.mr-tool { max-width: 1280px; margin: 0 auto 2rem; color: inherit; font: inherit; }
.mr-tool * { box-sizing: border-box; }
.mr-title { display: block; width: 100%; max-width: 420px; margin: 0 auto .75rem; padding: .35rem .5rem; border: 0; border-bottom: 1px dashed color-mix(in srgb, currentColor 40%, transparent); background: transparent; color: inherit; font: inherit; font-size: 1.25rem; font-weight: 600; text-align: center; }
.mr-title:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
.mr-stage { position: relative; width: 100%; margin: 0 auto; aspect-ratio: 16 / 9; background: #14181b; border-radius: 12px; overflow: hidden; cursor: pointer; transition: max-width .2s ease; }
.mr-stage:focus-visible { outline: 3px solid #0f766e; outline-offset: 3px; }
.mr-video { display: block; width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); background: #14181b; }
.mr-msg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1.5rem; color: #e8eceb; font-size: 1rem; line-height: 1.6; text-align: center; pointer-events: none; }
.mr-msg[hidden] { display: none; }
.mr-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .5rem; margin-top: .9rem; }
.mr-btn { padding: .55rem 1rem; border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 8px; background: transparent; color: inherit; font: inherit; font-size: .95rem; line-height: 1.3; cursor: pointer; }
.mr-btn:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.mr-btn:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
.mr-btn.mr-primary { border-color: #0f766e; background: #0f766e; color: #fff; font-weight: 600; }
.mr-btn.mr-primary:hover { background: #0b5f58; }
.mr-btn.mr-primary.mr-on { border-color: #b42318; background: #b42318; }
.mr-btn[aria-pressed="true"] { border-color: #0f766e; box-shadow: inset 0 0 0 1px #0f766e; font-weight: 600; }
.mr-sep { width: 1px; height: 1.6rem; background: color-mix(in srgb, currentColor 25%, transparent); }
.mr-pop { position: fixed; z-index: 99999; display: flex; flex-direction: column; width: 320px; height: 230px; min-width: 200px; min-height: 140px; max-width: 96vw; max-height: 96vh; background: #14181b; border: 1px solid #3a4348; border-radius: 10px; box-shadow: 0 8px 28px rgba(0, 0, 0, .35); overflow: hidden; resize: both; }
.mr-pop-head { display: flex; align-items: center; justify-content: space-between; gap: .5rem; padding: .3rem .4rem .3rem .7rem; background: #232a2e; color: #e8eceb; font-size: .85rem; cursor: move; touch-action: none; user-select: none; }
.mr-pop-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mr-pop-close { padding: .15rem .55rem; border: 0; border-radius: 6px; background: transparent; color: #e8eceb; font-size: 1.1rem; line-height: 1.2; cursor: pointer; }
.mr-pop-close:hover { background: #3a4348; }
.mr-pop-body { position: relative; flex: 1 1 auto; min-height: 0; cursor: pointer; }
@media (max-width: 520px) { .mr-sep { display: none; } .mr-btn { flex: 1 1 auto; } }
</style>
<input class="mr-title" id="mr-title" type="text" value="กระจกเงา" maxlength="40" aria-label="ชื่อกระจก">
<div class="mr-stage" id="mr-stage" tabindex="0" role="button" aria-label="เริ่มหรือหยุดกล้อง">
<video class="mr-video" id="mr-video" autoplay muted playsinline></video>
<div class="mr-msg" id="mr-msg">กดปุ่มเริ่มเพื่อเปิดกล้อง</div>
</div>
<div class="mr-bar">
<button type="button" class="mr-btn mr-primary" id="mr-toggle">▶ เริ่ม</button>
<span class="mr-sep" aria-hidden="true"></span>
<button type="button" class="mr-btn mr-size" data-w="640" data-h="360" aria-pressed="false">640x360</button>
<button type="button" class="mr-btn mr-size" data-w="960" data-h="540" aria-pressed="true">960x540</button>
<button type="button" class="mr-btn mr-size" data-w="1280" data-h="720" aria-pressed="false">1280x720</button>
<span class="mr-sep" aria-hidden="true"></span>
<button type="button" class="mr-btn" id="mr-pop-btn">หน้าต่างใหม่</button>
</div>
<script>
(function () {
  var titleEl = document.getElementById('mr-title');
  var stage = document.getElementById('mr-stage');
  var video = document.getElementById('mr-video');
  var msg = document.getElementById('mr-msg');
  var toggleBtn = document.getElementById('mr-toggle');
  var popBtn = document.getElementById('mr-pop-btn');
  var sizeBtns = Array.prototype.slice.call(document.querySelectorAll('#mr-tool .mr-size'));
  var stream = null;
  var running = false;
  var starting = false;
  var errText = '';
  var pop = null;
  var popName = null;
  var curW = 960;
  var curH = 540;
  function render() {
    toggleBtn.textContent = running ? '⏹ หยุด' : '▶ เริ่ม';
    if (running) { toggleBtn.classList.add('mr-on'); } else { toggleBtn.classList.remove('mr-on'); }
    var text = '';
    if (errText) { text = errText; }
    else if (pop) { text = 'กระจกกำลังแสดงในหน้าต่างใหม่'; }
    else if (!running) { text = 'กดปุ่มเริ่มเพื่อเปิดกล้อง'; }
    msg.textContent = text;
    msg.hidden = !text;
  }
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(function (t) { t.stop(); });
    }
    stream = null;
    video.srcObject = null;
    running = false;
    render();
  }
  function startCamera() {
    if (running || starting) { return; }
    errText = '';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      errText = 'เบราว์เซอร์นี้ไม่รองรับการเปิดกล้อง ลองใช้ Chrome, Safari, Edge หรือ Firefox เวอร์ชันล่าสุด';
      render();
      return;
    }
    if (window.isSecureContext === false) {
      errText = 'ต้องเปิดหน้านี้ผ่าน HTTPS เบราว์เซอร์จึงจะอนุญาตให้ใช้กล้อง';
      render();
      return;
    }
    starting = true;
    navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: curW }, height: { ideal: curH }, facingMode: 'user' },
      audio: false
    }).then(function (st) {
      stream = st;
      video.srcObject = st;
      var p = video.play();
      if (p && p.catch) { p.catch(function () {}); }
      var track = st.getVideoTracks()[0];
      if (track) { track.addEventListener('ended', stopCamera); }
      running = true;
      starting = false;
      render();
    }).catch(function (e) {
      starting = false;
      var n = e && e.name ? e.name : '';
      if (n === 'NotAllowedError' || n === 'SecurityError') {
        errText = 'ไม่ได้รับอนุญาตให้ใช้กล้อง กรุณากดอนุญาตในเบราว์เซอร์แล้วลองใหม่';
      } else if (n === 'NotFoundError' || n === 'OverconstrainedError') {
        errText = 'ไม่พบกล้องในอุปกรณ์นี้';
      } else if (n === 'NotReadableError') {
        errText = 'กล้องกำลังถูกใช้งานโดยแอปอื่น ปิดแอปนั้นแล้วลองใหม่';
      } else {
        errText = 'เปิดกล้องไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
      }
      render();
    });
  }
  function toggleCamera() {
    if (running) { stopCamera(); } else { startCamera(); }
  }
  function setSize(w, h) {
    curW = w;
    curH = h;
    stage.style.maxWidth = w + 'px';
    sizeBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-w')) === w));
    });
    if (running) {
      stopCamera();
      startCamera();
    }
  }
  function closePop() {
    if (!pop) { return; }
    stage.insertBefore(video, stage.firstChild);
    pop.parentNode.removeChild(pop);
    pop = null;
    popName = null;
    render();
  }
  function openPop() {
    if (pop) { return; }
    pop = document.createElement('div');
    pop.className = 'mr-pop';
    var head = document.createElement('div');
    head.className = 'mr-pop-head';
    popName = document.createElement('span');
    popName.className = 'mr-pop-name';
    popName.textContent = titleEl.value || 'กระจกเงา';
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mr-pop-close';
    closeBtn.setAttribute('aria-label', 'ปิดหน้าต่าง');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', closePop);
    head.appendChild(popName);
    head.appendChild(closeBtn);
    var body = document.createElement('div');
    body.className = 'mr-pop-body';
    body.addEventListener('click', toggleCamera);
    body.appendChild(video);
    pop.appendChild(head);
    pop.appendChild(body);
    document.body.appendChild(pop);
    pop.style.left = Math.max(8, window.innerWidth - 336) + 'px';
    pop.style.top = '80px';
    var dx = 0;
    var dy = 0;
    var dragging = false;
    head.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button')) { return; }
      dragging = true;
      var r = pop.getBoundingClientRect();
      dx = e.clientX - r.left;
      dy = e.clientY - r.top;
      head.setPointerCapture(e.pointerId);
    });
    head.addEventListener('pointermove', function (e) {
      if (!dragging) { return; }
      var maxX = window.innerWidth - 80;
      var maxY = window.innerHeight - 40;
      pop.style.left = Math.min(Math.max(0, e.clientX - dx), maxX) + 'px';
      pop.style.top = Math.min(Math.max(0, e.clientY - dy), maxY) + 'px';
    });
    function endDrag(e) {
      dragging = false;
      try { head.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    head.addEventListener('pointerup', endDrag);
    head.addEventListener('pointercancel', endDrag);
    render();
  }
  toggleBtn.addEventListener('click', toggleCamera);
  stage.addEventListener('click', toggleCamera);
  popBtn.addEventListener('click', function () { if (pop) { closePop(); } else { openPop(); } });
  sizeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      setSize(Number(b.getAttribute('data-w')), Number(b.getAttribute('data-h')));
    });
  });
  titleEl.addEventListener('input', function () {
    if (popName) { popName.textContent = titleEl.value || 'กระจกเงา'; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.code !== 'Space' && e.key !== ' ') { return; }
    var t = e.target;
    var tag = t && t.tagName ? t.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || (t && t.isContentEditable)) { return; }
    e.preventDefault();
    toggleCamera();
  });
  window.addEventListener('pagehide', stopCamera);
  setSize(curW, curH);
  render();
})();
</script>
</div>

## วิธีใช้งานกระจกเงาออนไลน์

1. กดปุ่ม **เริ่ม** (หรือคลิกที่ภาพ หรือกดปุ่มเว้นวรรค) แล้วเลือก "อนุญาต" เมื่อเบราว์เซอร์ขอสิทธิ์ใช้กล้อง
2. ภาพจากกล้องจะแสดงเป็นภาพสะท้อนเหมือนส่องกระจกจริง ใช้เช็กใบหน้า ผม หรือเสื้อผ้าได้ทันที
3. เลือกขนาดภาพที่ต้องการ 640x360, 960x540 หรือ 1280x720 ตามขนาดหน้าจอของคุณ
4. พิมพ์แก้ชื่อกระจกที่ช่องด้านบนได้ตามต้องการ เช่น "กระจกของฉัน"
5. กดปุ่ม **หน้าต่างใหม่** หากต้องการให้กระจกลอยอยู่บนหน้าจอ ลากที่แถบด้านบนเพื่อย้ายตำแหน่ง และลากมุมขวาล่างเพื่อปรับขนาด
6. กดปุ่ม **หยุด** (หรือกดปุ่มเว้นวรรคอีกครั้ง) เมื่อใช้งานเสร็จ กล้องจะปิดทันที

กระจกเงานี้เป็นเพียงภาพสดจากกล้อง ไม่มีการบันทึกวิดีโอ ไม่มีการถ่ายภาพ ไม่มีการบันทึกเสียง และไม่ส่งข้อมูลใดไปยังเซิร์ฟเวอร์

## คำอธิบายศัพท์ที่ควรรู้

- **เริ่ม / หยุด**: ปุ่มเปิดและปิดกล้อง เมื่อหยุด เบราว์เซอร์จะหยุดใช้กล้องทันที
- **ชื่อกระจก**: ข้อความที่แสดงเหนือกระจกและบนแถบของหน้าต่างใหม่ แก้ไขได้ตามต้องการ
- **ขนาด 640x360 / 960x540 / 1280x720**: ความละเอียดของภาพ (กว้าง x สูง เป็นพิกเซล) ตัวเลขมากภาพยิ่งคมชัดและกินทรัพยากรเครื่องมากขึ้น
- **หน้าต่างใหม่**: หน้าต่างกระจกขนาดเล็กที่ลอยอยู่บนหน้าเว็บ ลากย้ายและปรับขนาดได้ คลิกที่ภาพเพื่อเริ่มหรือหยุด
- **ปุ่มเว้นวรรค (Space)**: ทางลัดบนคีย์บอร์ดสำหรับเริ่มและหยุดกล้อง ใช้ไม่ได้ขณะพิมพ์ในช่องชื่อ
- **ภาพสะท้อน**: ภาพที่กลับซ้ายขวาเหมือนมองกระจกจริง ช่วยให้ขยับหน้าหรือจัดทรงผมได้ง่ายขึ้น
- **สิทธิ์เข้าถึงกล้อง**: การอนุญาตจากเบราว์เซอร์ให้เว็บไซต์ใช้กล้อง หากกดปฏิเสธไว้ ต้องเปิดอนุญาตอีกครั้งในการตั้งค่าเว็บไซต์
- **HTTPS**: การเชื่อมต่อแบบเข้ารหัส เบราว์เซอร์อนุญาตให้ใช้กล้องเฉพาะหน้าเว็บที่เปิดผ่าน HTTPS เท่านั้น
- **เลนส์กล้อง**: ส่วนหน้าของกล้อง ถ้าภาพดูเบลอหรือมัว ให้เช็ดเลนส์ให้สะอาดก่อนใช้งาน