(function () {
  var box = document.getElementById('vb-box');
  var warn = document.getElementById('vb-warn');
  var startBtn = document.getElementById('vb-start');
  var status = document.getElementById('vb-status');
  var slider = document.getElementById('vb-level');
  var levelText = document.getElementById('vb-level-text');
  var modeBtns = document.querySelectorAll('.vb-mode');
  var names = {
    slow: 'สั่นช้า',
    medium: 'สั่นปานกลาง',
    fast: 'สั่นเร็ว',
    progressive: 'จังหวะก้าวหน้า',
    drum: 'กลอง',
    constant: 'ตลอดเวลา'
  };
  var mode = 'slow';
  var timer = null;
  var running = false;
  var supported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

  function scale(ms) {
    var v = Math.round(ms * Number(slider.value) / 10);
    return v > 10 ? v : 10;
  }

  function duty(cycle) {
    var on = scale(cycle);
    return [on, cycle - on];
  }

  function buildPattern() {
    if (mode === 'slow') { return duty(1000); }
    if (mode === 'medium') { return duty(500); }
    if (mode === 'fast') { return duty(200); }
    if (mode === 'progressive') {
      var arr = [];
      [1, 2, 3, 4, 5].forEach(function (i) {
        arr.push(scale(i * 80));
        arr.push(100);
      });
      return arr;
    }
    if (mode === 'drum') {
      return [120, 80, 120, 80, 300, 200].map(function (v, idx) {
        return idx % 2 === 0 ? scale(v) : v;
      });
    }
    return [1000];
  }

  function total(pattern) {
    return pattern.reduce(function (a, b) { return a + b; }, 0);
  }

  function tick() {
    try { navigator.vibrate(buildPattern()); } catch (e) {}
  }

  function stop() {
    running = false;
    if (timer) { clearInterval(timer); timer = null; }
    if (supported) { try { navigator.vibrate(0); } catch (e) {} }
    startBtn.textContent = 'เริ่มสั่น';
    startBtn.classList.remove('vb-on');
    box.classList.remove('vb-pulse');
    status.textContent = 'หยุดแล้ว';
  }

  function start() {
    if (!supported) { return; }
    if (timer) { clearInterval(timer); timer = null; }
    running = true;
    var pattern = buildPattern();
    tick();
    timer = setInterval(tick, Math.max(total(pattern), 100));
    startBtn.textContent = 'หยุดสั่น';
    startBtn.classList.add('vb-on');
    status.textContent = 'กำลังสั่น: ' + names[mode] + ' (ความแรง ' + slider.value + ')';
  }

  if (!supported) {
    warn.style.display = 'block';
    startBtn.disabled = true;
  }

  modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      mode = btn.getAttribute('data-mode');
      modeBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      if (running) { start(); } else { status.textContent = 'เลือกโหมด: ' + names[mode]; }
    });
  });

  slider.addEventListener('input', function () {
    levelText.textContent = slider.value;
    if (running) { start(); }
  });

  startBtn.addEventListener('click', function () {
    if (running) { stop(); } else { start(); }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && running) { stop(); }
  });

  window.addEventListener('pagehide', function () {
    if (running) { stop(); }
  });
})();

