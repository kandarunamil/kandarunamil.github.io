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
