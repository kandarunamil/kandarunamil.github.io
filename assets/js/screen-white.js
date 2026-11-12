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
