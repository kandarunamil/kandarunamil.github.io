---
title: "ไม้วัดมุม"
seoTitle: "ไม้วัดมุม ออนไลน์ ฟรี"
h1: "ไม้วัดมุม"
description: "ไม้วัดมุมออนไลน์ฟรี วัดมุมและความชันได้ทันทีในเบราว์เซอร์ ลากหมุดเพื่อวัดองศา ใช้กล้องมือถือหรืออัปโหลดรูป ไม่ต้องติดตั้งแอป ใช้ได้ทั้งมือถือและคอมพิวเตอร์"
icon: "📱"
category: "device"
weight: 15
byline: true
date: 2026-11-05
lastmod: 2026-11-07
draft: false
---

เครื่องมือวัดมุมและความชันของวัตถุใด ๆ ผ่านหน้าเว็บ ไม่ต้องติดตั้งแอป ลากหมุดสีแดงและสีน้ำเงินเพื่อวัดองศา หรือพิมพ์ค่ามุมที่ต้องการลงในช่องได้โดยตรง และสามารถเปิดกล้องมือถือหรืออัปโหลดรูปภาพเพื่อวัดมุมจากภาพจริงได้

<style>
#protractor-app{max-width:720px;margin:1rem auto}
#protractor-app .ptr-bar{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
#protractor-app .ptr-bar button,#protractor-app .ptr-btn{font:inherit;font-size:14px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;color:#0f172a;cursor:pointer}
#protractor-app .ptr-bar button:hover,#protractor-app .ptr-btn:hover{background:#e2e8f0}
#protractor-app canvas{display:block;width:100%;border:1px solid #cbd5e1;border-radius:10px;background:#fff;touch-action:none;cursor:grab}
#protractor-app .ptr-msg{min-height:1.4em;margin:8px 0;font-size:13px;color:#b45309}
#protractor-app .ptr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
#protractor-app .ptr-grid>*{display:flex;flex-direction:column;gap:4px;padding:10px;border:1px solid #cbd5e1;border-radius:10px;font-size:13px;background:#f8fafc;color:#475569}
#protractor-app .ptr-grid strong,#protractor-app .ptr-grid input{font-size:18px;font-weight:700;color:#0f172a}
#protractor-app .ptr-grid input{width:100%;box-sizing:border-box;padding:2px 4px;border:1px solid #94a3b8;border-radius:6px;background:#fff}
</style>

<div id="protractor-app">
<div class="ptr-bar">
<button type="button" id="ptr-cam">📷 เปิดกล้อง</button>
<button type="button" id="ptr-snap">📸 ถ่ายภาพนิ่ง</button>
<label class="ptr-btn">🖼️ อัปโหลดรูป<input type="file" id="ptr-file" accept="image/*" hidden></label>
<button type="button" id="ptr-clear">ล้างภาพพื้นหลัง</button>
<button type="button" id="ptr-reset">รีเซ็ต</button>
</div>
<canvas id="ptr-canvas" aria-label="ไม้วัดมุมออนไลน์"></canvas>
<p id="ptr-msg" class="ptr-msg" role="status"></p>
<div class="ptr-grid">
<label>มุม (องศา)<input type="number" id="ptr-deg" min="0" max="360" step="0.1" inputmode="decimal"></label>
<div>เรเดียน<strong id="ptr-rad">-</strong></div>
<div>ชนิดของมุม<strong id="ptr-kind">-</strong></div>
<div>ความชัน (tan)<strong id="ptr-slope">-</strong></div>
<div>มุมประกอบมุมฉาก<strong id="ptr-comp">-</strong></div>
<div>มุมประกอบมุมตรง<strong id="ptr-supp">-</strong></div>
</div>
</div>

<script>
(function () {
  var cv = document.getElementById('ptr-canvas');
  if (!cv) { return; }
  var ctx = cv.getContext('2d');
  var degIn = document.getElementById('ptr-deg');
  var radOut = document.getElementById('ptr-rad');
  var kindOut = document.getElementById('ptr-kind');
  var slopeOut = document.getElementById('ptr-slope');
  var compOut = document.getElementById('ptr-comp');
  var suppOut = document.getElementById('ptr-supp');
  var msg = document.getElementById('ptr-msg');
  var video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.muted = true;
  var stream = null, bg = null, drag = null, running = false;
  var W = 0, H = 0, dpr = window.devicePixelRatio || 1;
  var O = { x: 0, y: 0 }, A = { x: 0, y: 0 }, B = { x: 0, y: 0 };

  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function dist(p, q) { return Math.hypot(p.x - q.x, p.y - q.y); }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function norm(a) { a = a % 360; return a > 0 ? a : (a === 0 ? 0 : a + 360); }
  function ang(p) { return deg(Math.atan2(-(p.y - O.y), p.x - O.x)); }
  function theta() { return norm(ang(B) - ang(A)); }
  function fmt(t) { return String(Math.round(t * 10) / 10); }

  function kind(t) {
    if (t === 0 || t === 360) { return 'มุมศูนย์'; }
    if (90 > t) { return 'มุมแหลม'; }
    if (t === 90) { return 'มุมฉาก'; }
    if (180 > t) { return 'มุมป้าน'; }
    if (t === 180) { return 'มุมตรง'; }
    return 'มุมกลับ';
  }

  function line(p, q, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
  }
  function dot(p, r, color) {
    ctx.fillStyle = color; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }

  function update() {
    var t = Math.round(theta() * 10) / 10;
    if (t === 360) { t = 0; }
    if (document.activeElement !== degIn) { degIn.value = t; }
    radOut.textContent = rad(t).toFixed(3) + ' rad';
    kindOut.textContent = kind(t);
    slopeOut.textContent = Math.abs(Math.cos(rad(t))) > 0.0001 ? (Math.tan(rad(t)) * 100).toFixed(1) + ' %' : '∞';
    compOut.textContent = 90 > t ? fmt(90 - t) + '°' : '-';
    suppOut.textContent = 180 > t ? fmt(180 - t) + '°' : '-';
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    if (bg) {
      var sw = bg.videoWidth || bg.naturalWidth || bg.width;
      var sh = bg.videoHeight || bg.naturalHeight || bg.height;
      if (sw && sh) {
        var s = Math.min(W / sw, H / sh);
        ctx.drawImage(bg, (W - sw * s) / 2, (H - sh * s) / 2, sw * s, sh * s);
      }
    }
    var rr = Math.max(dist(O, A), 30);
    var aA = ang(A);
    var t = theta();

    ctx.beginPath();
    ctx.moveTo(O.x, O.y);
    ctx.arc(O.x, O.y, rr * 0.35, -rad(aA), -rad(aA + t), true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(239,68,68,0.22)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(30,41,59,0.75)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(O.x, O.y, rr, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    Array.from({ length: 72 }, function (_, i) {
      var k = i * 5;
      var a = rad(aA + k);
      var len = (k % 30 === 0) ? 12 : ((k % 10 === 0) ? 8 : 4);
      var c = Math.cos(a), sn = -Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(O.x + rr * c, O.y + rr * sn);
      ctx.lineTo(O.x + (rr - len) * c, O.y + (rr - len) * sn);
      ctx.stroke();
      if (k % 30 === 0) { ctx.fillText(String(k), O.x + (rr + 16) * c, O.y + (rr + 16) * sn); }
    });

    line(O, A, '#2563eb');
    line(O, B, '#dc2626');
    dot(O, 7, '#0f172a');
    dot(A, 9, '#2563eb');
    dot(B, 11, '#dc2626');

    var mid = rad(aA + t / 2);
    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(fmt(t) + '°', O.x + rr * 0.55 * Math.cos(mid), O.y - rr * 0.55 * Math.sin(mid));
    update();
  }

  function reset() {
    O = { x: W / 2, y: H / 2 };
    var r = Math.min(W, H) * 0.36;
    A = { x: O.x + r, y: O.y };
    B = { x: O.x + r * Math.cos(rad(45)), y: O.y - r * Math.sin(rad(45)) };
    draw();
  }

  function resize() {
    var oldW = W;
    W = cv.parentNode.clientWidth || 320;
    H = Math.round(W * 0.75);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.height = H + 'px';
    if (oldW) {
      var f = W / oldW;
      [O, A, B].forEach(function (p) { p.x *= f; p.y *= f; });
      draw();
    } else {
      reset();
    }
  }

  function pos(e) {
    var r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
  }

  cv.addEventListener('pointerdown', function (e) {
    var p = pos(e), best = null, bd = 28;
    [['B', B], ['A', A], ['O', O]].forEach(function (h) {
      var d = dist(p, h[1]);
      if (bd > d) { bd = d; best = h[0]; }
    });
    if (best) {
      drag = best;
      cv.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
  });
  cv.addEventListener('pointermove', function (e) {
    if (!drag) { return; }
    var p = pos(e);
    p.x = clamp(p.x, 0, W); p.y = clamp(p.y, 0, H);
    if (drag === 'O') {
      var dx = p.x - O.x, dy = p.y - O.y;
      O = p;
      A = { x: A.x + dx, y: A.y + dy };
      B = { x: B.x + dx, y: B.y + dy };
    } else if (drag === 'A') {
      A = p;
    } else {
      B = p;
    }
    draw();
  });
  ['pointerup', 'pointercancel'].forEach(function (n) {
    cv.addEventListener(n, function () { drag = null; });
  });

  degIn.addEventListener('input', function () {
    var v = parseFloat(degIn.value);
    if (!isFinite(v)) { return; }
    v = clamp(v, 0, 360);
    var r = dist(O, B);
    if (1 > r) { r = dist(O, A); }
    var a = rad(ang(A) + v);
    B = { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) };
    draw();
  });
  degIn.addEventListener('blur', update);

  function stopCam() {
    if (stream) {
      stream.getTracks().forEach(function (tr) { tr.stop(); });
      stream = null;
    }
    if (bg === video) { bg = null; }
  }
  function loop() {
    if (!stream) { running = false; draw(); return; }
    draw();
    requestAnimationFrame(loop);
  }
  function startCam() {
    msg.textContent = '';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      msg.textContent = 'เบราว์เซอร์นี้ไม่รองรับกล้อง (ต้องเปิดผ่าน HTTPS) ลองอัปโหลดรูปแทน';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
      .then(function (s) {
        stopCam();
        stream = s;
        video.srcObject = s;
        video.play();
        bg = video;
        if (!running) { running = true; loop(); }
      })
      .catch(function () {
        msg.textContent = 'ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตการใช้กล้องในเบราว์เซอร์ หรืออัปโหลดรูปแทน';
      });
  }
  function snap() {
    if (!stream || !video.videoWidth) {
      msg.textContent = 'กรุณาเปิดกล้องก่อนถ่ายภาพนิ่ง';
      return;
    }
    var c = document.createElement('canvas');
    c.width = video.videoWidth;
    c.height = video.videoHeight;
    c.getContext('2d').drawImage(video, 0, 0);
    stopCam();
    bg = c;
    draw();
  }

  document.getElementById('ptr-cam').addEventListener('click', startCam);
  document.getElementById('ptr-snap').addEventListener('click', snap);
  document.getElementById('ptr-clear').addEventListener('click', function () { stopCam(); bg = null; draw(); });
  document.getElementById('ptr-reset').addEventListener('click', reset);
  document.getElementById('ptr-file').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) { return; }
    var img = new Image();
    img.onload = function () { stopCam(); bg = img; draw(); };
    img.onerror = function () { msg.textContent = 'ไม่สามารถเปิดไฟล์รูปนี้ได้'; };
    img.src = URL.createObjectURL(f);
    e.target.value = '';
  });
  window.addEventListener('resize', resize);
  resize();
})();
</script>

## วิธีใช้งานไม้วัดมุมออนไลน์

1. **วางจุดยอดมุม** ลากจุดสีดำตรงกลางไปวางที่จุดยอดมุมของวัตถุที่ต้องการวัด
2. **จัดเส้นฐาน** ลากหมุดสีน้ำเงินให้เส้นสีน้ำเงินทับแขนมุมด้านแรกของวัตถุ สเกลองศาจะหมุนตามเส้นนี้โดยอัตโนมัติ
3. **วัดมุม** ลากหมุดสีแดงให้เส้นสีแดงทับแขนมุมอีกด้านหนึ่ง ค่าองศาจะแสดงที่ช่อง "มุม (องศา)" ทันที
4. **วัดจากภาพจริง** กด "เปิดกล้อง" เพื่อใช้กล้องมือถือเป็นพื้นหลัง แล้วกด "ถ่ายภาพนิ่ง" เพื่อหยุดภาพก่อนวัด หรือกด "อัปโหลดรูป" เพื่อเลือกรูปจากเครื่อง
5. **กำหนดค่าเอง** พิมพ์ค่ามุมที่ต้องการลงในช่อง "มุม (องศา)" (0-360) หมุดสีแดงจะเลื่อนไปตามค่าที่กรอก
6. **เริ่มใหม่** กด "รีเซ็ต" เพื่อคืนไม้วัดมุมกลับสู่ตำแหน่งเริ่มต้น หรือ "ล้างภาพพื้นหลัง" เพื่อปิดกล้องหรือลบรูปที่ใช้อยู่

เคล็ดลับ: ถ่ายภาพให้ตรงกับวัตถุมากที่สุด ไม่เอียงหรือถ่ายจากมุมเฉียง เพราะภาพที่เบี้ยวจะทำให้ค่ามุมที่วัดได้คลาดเคลื่อน

## ความหมายของคำศัพท์ที่ใช้ในเครื่องมือ

- **มุม (Angle):** ส่วนที่เกิดจากรังสีสองเส้นที่มีจุดปลายร่วมกัน เป็นการบอกว่าเส้นสองเส้นเปิดห่างจากกันมากเท่าไร
- **จุดยอดมุม (Vertex):** จุดที่แขนทั้งสองของมุมมาบรรจบกัน ในเครื่องมือนี้คือหมุดสีดำตรงกลาง
- **แขนของมุม (Arm):** เส้นตรงสองเส้นที่ออกจากจุดยอดมุม ในเครื่องมือนี้คือเส้นสีน้ำเงิน (เส้นฐาน) และเส้นสีแดง (เส้นวัด)
- **องศา (Degree, °):** หน่วยวัดมุมที่พบบ่อยที่สุด วงกลมหนึ่งรอบเท่ากับ 360 องศา
- **เรเดียน (Radian, rad):** หน่วยวัดมุมที่ใช้ในคณิตศาสตร์และวิทยาศาสตร์ 180 องศาเท่ากับ π เรเดียน หรือประมาณ 3.142 rad
- **มุมศูนย์:** มุมที่มีขนาด 0 องศา แขนทั้งสองซ้อนทับกันพอดี
- **มุมแหลม (Acute angle):** มุมที่มีขนาดมากกว่า 0 แต่น้อยกว่า 90 องศา
- **มุมฉาก (Right angle):** มุมที่มีขนาด 90 องศา เหมือนมุมของกระดาษ A4
- **มุมป้าน (Obtuse angle):** มุมที่มีขนาดมากกว่า 90 แต่น้อยกว่า 180 องศา
- **มุมตรง (Straight angle):** มุมที่มีขนาด 180 องศา แขนทั้งสองต่อกันเป็นเส้นตรง
- **มุมกลับ (Reflex angle):** มุมที่มีขนาดมากกว่า 180 แต่น้อยกว่า 360 องศา
- **มุมประกอบมุมฉาก (Complementary angle):** มุมที่เมื่อรวมกับมุมที่วัดได้แล้วเท่ากับ 90 องศา ใช้ได้เมื่อมุมน้อยกว่า 90 องศา
- **มุมประกอบมุมตรง (Supplementary angle):** มุมที่เมื่อรวมกับมุมที่วัดได้แล้วเท่ากับ 180 องศา ใช้ได้เมื่อมุมน้อยกว่า 180 องศา
- **ความชัน (Slope):** อัตราส่วนของความสูงต่อระยะทางในแนวราบ ในเครื่องมือนี้คำนวณจากค่า tan ของมุมที่วัดได้ แล้วแสดงเป็นเปอร์เซ็นต์ เช่น มุม 45 องศามีความชัน 100 %
- **ค่าอนันต์ (∞):** แสดงเมื่อมุมเท่ากับ 90 หรือ 270 องศา ซึ่งเป็นแนวดิ่ง จึงไม่สามารถหาค่าความชันได้

## คำถามที่พบบ่อย

**ใช้วัดมุมบนมือถือได้ไหม?**
ได้ ใช้นิ้วลากหมุดบนหน้าจอได้เลย และเปิดกล้องหลังของมือถือเพื่อวัดมุมของวัตถุจริงได้ (ต้องอนุญาตการใช้กล้องในเบราว์เซอร์)

**ทำไมเปิดกล้องไม่ได้?**
เบราว์เซอร์อนุญาตให้ใช้กล้องเฉพาะเว็บไซต์ที่เปิดผ่าน HTTPS และต้องกดอนุญาตการใช้กล้อง หากยังไม่ได้ ให้ลองอัปโหลดรูปภาพแทน

**ภาพที่อัปโหลดถูกส่งไปที่เซิร์ฟเวอร์หรือไม่?**
ไม่ รูปภาพและภาพจากกล้องถูกประมวลผลภายในเบราว์เซอร์ของคุณเท่านั้น