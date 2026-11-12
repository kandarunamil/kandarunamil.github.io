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
