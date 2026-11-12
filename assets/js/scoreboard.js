(function () {
  'use strict';
  var KEY = 'sb-scoreboard-v1';
  var THEMES = ['default', 'bright', 'led', 'red-blue', 'flip', 'chalk'];
  var root = document.getElementById('sb');
  if (!root) { return; }
  var teams = root.querySelectorAll('.sb-team');
  var decBtn = document.getElementById('sbDec');
  var modeSel = document.getElementById('sbMode');
  var themeSel = document.getElementById('sbTheme');
  var dec = false;
  var edit = false;
  var wl = null;

  function fresh() {
    return { n: ['บ้าน', 'ผู้มาเยือน'], s: [0, 0], m: [[0, 0], [0, 0]], mode: 1, names: true, swap: false, theme: 'default' };
  }
  var st = fresh();

  function clamp(v, lo, hi) {
    v = parseInt(v, 10);
    if (isNaN(v)) { v = 0; }
    return Math.max(lo, Math.min(hi, v));
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) { return; }
      var o = JSON.parse(raw);
      if (o && Array.isArray(o.n) && Array.isArray(o.s) && Array.isArray(o.m)) {
        st = Object.assign(fresh(), o);
      }
    } catch (e) { st = fresh(); }
    if (THEMES.indexOf(st.theme) < 0) { st.theme = 'default'; }
    st.mode = clamp(st.mode, 0, 2);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ }
  }

  function render() {
    root.setAttribute('data-theme', st.theme);
    root.setAttribute('data-mode', String(st.mode));
    root.classList.toggle('is-edit', edit);
    root.classList.toggle('is-dec', dec);
    root.classList.toggle('is-swap', st.swap);
    root.classList.toggle('no-names', !st.names);
    decBtn.setAttribute('aria-pressed', String(dec));
    root.querySelector('[data-act="edit"]').setAttribute('aria-pressed', String(edit));
    root.querySelector('[data-act="names"]').setAttribute('aria-pressed', String(st.names));
    modeSel.value = String(st.mode);
    themeSel.value = st.theme;
    for (var i = 0; i < teams.length; i++) {
      var t = teams[i];
      t.querySelector('.sb-nt').textContent = st.n[i];
      t.querySelector('.sb-st').textContent = st.s[i];
      var ni = t.querySelector('.sb-ni');
      var si = t.querySelector('.sb-si');
      if (document.activeElement !== ni) { ni.value = st.n[i]; }
      if (document.activeElement !== si) { si.value = st.s[i]; }
      var ms = t.querySelectorAll('.sb-m');
      for (var k = 0; k < ms.length; k++) {
        ms[k].querySelector('.sb-mv').textContent = st.m[i][k];
      }
    }
  }

  function bump(i) {
    var el = teams[i].querySelector('.sb-st');
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }

  function add(i, d) {
    st.s[i] = clamp(st.s[i] + d, -999, 9999);
    render(); bump(i); save();
  }

  function addMini(i, k, d) {
    st.m[i][k] = clamp(st.m[i][k] + d, 0, 99);
    render(); save();
  }

  function isFull() { return document.fullscreenElement || document.webkitFullscreenElement; }

  function toggleFull() {
    if (isFull()) {
      var ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { ex.call(document); }
    } else {
      var rq = root.requestFullscreen || root.webkitRequestFullscreen;
      if (rq) {
        var p = rq.call(root);
        if (p && p.catch) { p.catch(function () {}); }
      }
    }
  }

  function onFullChange() {
    try {
      if (isFull() && navigator.wakeLock) {
        navigator.wakeLock.request('screen').then(function (l) { wl = l; }).catch(function () {});
      } else if (wl) {
        wl.release(); wl = null;
      }
    } catch (e) { /* ignore */ }
  }
  document.addEventListener('fullscreenchange', onFullChange);
  document.addEventListener('webkitfullscreenchange', onFullChange);

  root.addEventListener('click', function (e) {
    var tg = e.target;
    if (tg.closest('input, select, label')) { return; }
    var act = tg.closest('[data-act]');
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'edit') { edit = !edit; render(); }
      else if (a === 'names') { st.names = !st.names; render(); save(); }
      else if (a === 'swap') { st.swap = !st.swap; render(); save(); }
      else if (a === 'full') { toggleFull(); }
      else if (a === 'reset') {
        if (window.confirm('รีเซ็ตคะแนนทั้งหมดเป็น 0 ใช่หรือไม่?')) {
          st.s = [0, 0]; st.m = [[0, 0], [0, 0]]; render(); save();
        }
      } else if (a === 'clear') {
        if (window.confirm('ลบชื่อทีม คะแนน และการตั้งค่าที่บันทึกไว้ทั้งหมดใช่หรือไม่?')) {
          try { localStorage.removeItem(KEY); } catch (err) { /* ignore */ }
          st = fresh(); dec = false; edit = false; render();
        }
      }
      return;
    }
    if (tg.closest('#sbDec')) { return; }
    var team = tg.closest('.sb-team');
    if (!team) { return; }
    var i = parseInt(team.getAttribute('data-i'), 10);
    var mb = tg.closest('.sb-m button');
    if (mb) {
      var k = parseInt(mb.parentNode.getAttribute('data-k'), 10);
      addMini(i, k, parseInt(mb.getAttribute('data-d'), 10));
      return;
    }
    if (tg.closest('.sb-minis') || edit) { return; }
    add(i, dec ? -1 : 1);
  });

  root.addEventListener('input', function (e) {
    var tg = e.target;
    var team = tg.closest('.sb-team');
    if (!team) { return; }
    var i = parseInt(team.getAttribute('data-i'), 10);
    if (tg.classList.contains('sb-ni')) {
      st.n[i] = tg.value.slice(0, 24);
      team.querySelector('.sb-nt').textContent = st.n[i];
      save();
    } else if (tg.classList.contains('sb-si')) {
      if (tg.value === '' || tg.value === '-') { return; }
      st.s[i] = clamp(tg.value, -999, 9999);
      team.querySelector('.sb-st').textContent = st.s[i];
      save();
    }
  });

  root.addEventListener('change', function (e) {
    if (e.target.classList.contains('sb-si')) { render(); }
  });

  modeSel.addEventListener('change', function () { st.mode = clamp(modeSel.value, 0, 2); render(); save(); });
  themeSel.addEventListener('change', function () {
    st.theme = THEMES.indexOf(themeSel.value) < 0 ? 'default' : themeSel.value;
    render(); save();
  });

  var timer = null;
  var longPress = false;
  decBtn.addEventListener('pointerdown', function () {
    longPress = false;
    timer = setTimeout(function () {
      longPress = true; st.s = [0, 0]; render(); save();
    }, 1000);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
    decBtn.addEventListener(ev, function () { clearTimeout(timer); });
  });
  decBtn.addEventListener('click', function () {
    if (longPress) { longPress = false; return; }
    dec = !dec; render();
  });

  function inView() {
    var r = root.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  document.addEventListener('keydown', function (e) {
    var tg = e.target;
    if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'SELECT' || tg.tagName === 'TEXTAREA' || tg.isContentEditable)) { return; }
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    if (!isFull() && !inView()) { return; }
    var left = st.swap ? 1 : 0;
    var right = st.swap ? 0 : 1;
    var d = e.shiftKey ? -1 : 1;
    var c = e.code;
    if (c === 'ArrowLeft') { add(left, d); e.preventDefault(); }
    else if (c === 'ArrowRight') { add(right, d); e.preventDefault(); }
    else if (c === 'BracketLeft') { addMini(left, 0, d); }
    else if (c === 'BracketRight') { addMini(right, 0, d); }
    else if (c === 'KeyF' && !e.repeat) { toggleFull(); }
    else if (c === 'KeyN' && !e.repeat) { st.names = !st.names; render(); save(); }
  });

  load();
  try {
    var q = new URLSearchParams(window.location.search).get('theme');
    if (q && THEMES.indexOf(q) >= 0) { st.theme = q; }
  } catch (e) { /* ignore */ }
  render();
})();
