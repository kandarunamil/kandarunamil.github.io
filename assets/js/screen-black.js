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
