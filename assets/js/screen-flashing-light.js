(function () {
  var $ = function (id) { return document.getElementById(id); };
  var wrap = $('flApp'), stage = $('flStage'), hint = $('flHint'), panel = $('flPanel');
  var btnToggle = $('flToggle'), btnFull = $('flFull'), selMode = $('flMode');
  var rngSpeed = $('flSpeed'), rngBright = $('flBright'), chkAwake = $('flAwake'), pick = $('flPick');
  var outSpeed = $('flSpeedOut'), outBright = $('flBrightOut'), colorRow = $('flColorRow');
  if (!wrap || !stage || !btnToggle) { return; }
  var BLACK = '#000000';
  var RAINBOW = ['#ff1744', '#ff9100', '#ffea00', '#00e676', '#00e5ff', '#2979ff', '#d500f9'];
  var running = false, timer = null, idx = 0, color = '#ffffff', lock = null;
  function sequence() {
    var mode = selMode.value;
    var p = 1000 / parseFloat(rngSpeed.value);
    if (mode === 'strobe') {
      var on = Math.max(15, p * 0.1);
      return [[color, on], [BLACK, Math.max(15, p - on)]];
    }
    if (mode === 'rainbow') {
      return RAINBOW.map(function (c) { return [c, p]; });
    }
    if (mode === 'police') {
      var u = p / 2, r = '#ff1744', b = '#2979ff';
      return [[r, u], [BLACK, u], [r, u], [BLACK, u], [b, u], [BLACK, u], [b, u], [BLACK, u]];
    }
    if (mode === 'sos') {
      var q = p / 2;
      var dot = [color, q], dash = [color, q * 3];
      var gap = [BLACK, q], lgap = [BLACK, q * 3], wgap = [BLACK, q * 7];
      return [dot, gap, dot, gap, dot, lgap, dash, gap, dash, gap, dash, lgap, dot, gap, dot, gap, dot, wgap];
    }
    return [[color, p / 2], [BLACK, p / 2]];
  }
  function tick() {
    if (!running) { return; }
    var seq = sequence();
    var item = seq[idx % seq.length];
    stage.style.backgroundColor = item[0];
    idx += 1;
    timer = setTimeout(tick, item[1]);
  }
  function requestAwake() {
    if (lock || !chkAwake.checked || !('wakeLock' in navigator)) { return; }
    try {
      navigator.wakeLock.request('screen').then(function (l) {
        lock = l;
        l.addEventListener('release', function () { lock = null; });
      }).catch(function () {});
    } catch (e) {}
  }
  function releaseAwake() {
    if (!lock) { return; }
    try { lock.release().catch(function () {}); } catch (e) {}
    lock = null;
  }
  function start() {
    running = true;
    idx = 0;
    hint.style.display = 'none';
    btnToggle.textContent = '■ หยุด';
    btnToggle.classList.add('fl-run');
    btnToggle.setAttribute('aria-pressed', 'true');
    requestAwake();
    tick();
  }
  function stop() {
    running = false;
    clearTimeout(timer);
    stage.style.backgroundColor = '';
    hint.style.display = '';
    btnToggle.textContent = '▶ เริ่ม';
    btnToggle.classList.remove('fl-run');
    btnToggle.setAttribute('aria-pressed', 'false');
    releaseAwake();
  }
  function isFull() { return wrap.classList.contains('fl-full'); }
  function enterFull() {
    wrap.classList.add('fl-full');
    document.documentElement.classList.add('fl-lock');
    btnFull.textContent = '✕ ออก';
    var rq = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
    if (rq) {
      try {
        var res = rq.call(wrap);
        if (res && res.catch) { res.catch(function () {}); }
      } catch (e) {}
    }
  }
  function exitFull() {
    wrap.classList.remove('fl-full');
    document.documentElement.classList.remove('fl-lock');
    panel.classList.remove('fl-hide');
    btnFull.textContent = '⛶ เต็มหน้าจอ';
    var el = document.fullscreenElement || document.webkitFullscreenElement;
    var ex = document.exitFullscreen || document.webkitExitFullscreen;
    if (el && ex) {
      try {
        var res = ex.call(document);
        if (res && res.catch) { res.catch(function () {}); }
      } catch (e) {}
    }
  }
  btnToggle.addEventListener('click', function () { if (running) { stop(); } else { start(); } });
  btnFull.addEventListener('click', function () { if (isFull()) { exitFull(); } else { enterFull(); } });
  stage.addEventListener('click', function () { if (isFull()) { panel.classList.toggle('fl-hide'); } });
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (name) {
    document.addEventListener(name, function () {
      var el = document.fullscreenElement || document.webkitFullscreenElement;
      if (!el && isFull()) { exitFull(); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isFull()) { exitFull(); }
    if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); btnToggle.click(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && running) { requestAwake(); }
  });
  selMode.addEventListener('change', function () {
    idx = 0;
    var m = selMode.value;
    colorRow.classList.toggle('fl-dim', m === 'rainbow' || m === 'police');
  });
  Array.prototype.forEach.call(colorRow.querySelectorAll('.fl-sw'), function (sw) {
    sw.addEventListener('click', function () {
      color = sw.getAttribute('data-color');
      pick.value = color;
      Array.prototype.forEach.call(colorRow.querySelectorAll('.fl-sw'), function (o) { o.classList.remove('fl-on'); });
      sw.classList.add('fl-on');
    });
  });
  pick.addEventListener('input', function () {
    color = pick.value;
    Array.prototype.forEach.call(colorRow.querySelectorAll('.fl-sw'), function (o) { o.classList.remove('fl-on'); });
  });
  rngSpeed.addEventListener('input', function () { outSpeed.textContent = rngSpeed.value + ' Hz'; });
  rngBright.addEventListener('input', function () {
    outBright.textContent = rngBright.value + '%';
    stage.style.filter = 'brightness(' + (rngBright.value / 100) + ')';
  });
  chkAwake.addEventListener('change', function () {
    if (!running) { return; }
    if (chkAwake.checked) { requestAwake(); } else { releaseAwake(); }
  });
})();
