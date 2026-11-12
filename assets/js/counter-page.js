(function () {
  var KEY = 'cnt-state-v1';
  var MIN = -99999;
  var MAX = 999999;
  var DEFAULT_NAME = 'เครื่องนับจำนวน';
  var state = { mode: 'single', wake: true, counters: [{ name: DEFAULT_NAME, value: 0 }] };
  var lock = null;
  function clamp(v) {
    if (v > MAX) { v = MAX; }
    if (MIN > v) { v = MIN; }
    return v;
  }
  function fmt(n) {
    var s = String(Math.abs(n));
    while (s.length !== 4 && 4 > s.length) { s = '0' + s; }
    return (0 > n ? '-' : '') + s;
  }
  function parse(text) {
    var n = parseInt(String(text).replace(/[^0-9-]/g, ''), 10);
    return isNaN(n) ? null : clamp(n);
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) { return; }
      var p = JSON.parse(raw);
      if (p && Array.isArray(p.counters) && p.counters.length > 0) {
        state.mode = p.mode === 'list' ? 'list' : 'single';
        state.wake = p.wake !== false;
        state.counters = p.counters.map(function (c) {
          return { name: String((c && c.name) || '').slice(0, 40), value: clamp(parseInt(c && c.value, 10) || 0) };
        });
      }
    } catch (e) {}
  }
  function keepAwake() {
    if (!state.wake || lock || !('wakeLock' in navigator)) { return; }
    try {
      navigator.wakeLock.request('screen').then(function (l) {
        lock = l;
        l.addEventListener('release', function () { lock = null; });
      }).catch(function () {});
    } catch (e) {}
  }
  function releaseAwake() {
    if (lock) { try { lock.release(); } catch (e) {} lock = null; }
  }
  var $ = function (id) { return document.getElementById(id); };
  var nameEl = $('cnt-name');
  var valEl = $('cnt-value');
  var singleBox = $('cnt-single');
  var listBox = $('cnt-list');
  var itemsBox = $('cnt-items');
  var tabSingle = $('cnt-tab-single');
  var tabList = $('cnt-tab-list');
  var wakeEl = $('cnt-wake');
  function change(i, d) {
    var c = state.counters[i];
    if (!c) { return; }
    c.value = clamp(c.value + d);
    save();
    render(false);
    keepAwake();
  }
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text) { e.textContent = text; }
    return e;
  }
  function buildList() {
    itemsBox.textContent = '';
    state.counters.forEach(function (c, i) {
      var row = mk('div', 'cnt-row');
      var nm = mk('input', 'cnt-rname');
      nm.type = 'text';
      nm.maxLength = 40;
      nm.value = c.name;
      nm.setAttribute('aria-label', 'ชื่อตัวนับ');
      nm.addEventListener('input', function () { c.name = nm.value; save(); });
      var minus = mk('button', '', '－');
      minus.type = 'button';
      minus.setAttribute('aria-label', 'ลดหนึ่ง');
      minus.addEventListener('click', function () { change(i, -1); });
      var val = mk('input', 'cnt-rval');
      val.type = 'text';
      val.setAttribute('inputmode', 'numeric');
      val.value = fmt(c.value);
      val.setAttribute('aria-label', 'ตัวเลขที่นับ');
      val.addEventListener('focus', function () { val.select(); });
      val.addEventListener('change', function () {
        var n = parse(val.value);
        if (n !== null) { c.value = n; }
        val.value = fmt(c.value);
        save();
      });
      var plus = mk('button', 'cnt-rplus', '＋');
      plus.type = 'button';
      plus.setAttribute('aria-label', 'เพิ่มหนึ่ง');
      plus.addEventListener('click', function () { change(i, 1); });
      row.appendChild(nm);
      row.appendChild(minus);
      row.appendChild(val);
      row.appendChild(plus);
      if (state.counters.length > 1) {
        var del = mk('button', '', '×');
        del.type = 'button';
        del.setAttribute('aria-label', 'ลบตัวนับนี้');
        del.addEventListener('click', function () {
          state.counters.splice(i, 1);
          save();
          render(true);
        });
        row.appendChild(del);
      }
      itemsBox.appendChild(row);
    });
  }
  function render(rebuild) {
    var isList = state.mode === 'list';
    singleBox.hidden = isList;
    listBox.hidden = !isList;
    tabSingle.className = 'cnt-tab' + (isList ? '' : ' cnt-active');
    tabList.className = 'cnt-tab' + (isList ? ' cnt-active' : '');
    tabSingle.setAttribute('aria-selected', String(!isList));
    tabList.setAttribute('aria-selected', String(isList));
    $('cnt-reset').textContent = isList ? 'รีเซ็ตทั้งหมดเป็น 0' : 'รีเซ็ตเป็น 0';
    wakeEl.checked = state.wake;
    if (isList) {
      if (rebuild) { buildList(); } else {
        var vals = itemsBox.querySelectorAll('input.cnt-rval');
        state.counters.forEach(function (c, i) { if (vals[i]) { vals[i].value = fmt(c.value); } });
      }
    } else {
      var c0 = state.counters[0];
      if (document.activeElement !== nameEl) { nameEl.value = c0.name; }
      if (document.activeElement !== valEl) { valEl.value = fmt(c0.value); }
    }
  }
  function setMode(m) {
    state.mode = m;
    save();
    render(true);
  }
  load();
  render(true);
  tabSingle.addEventListener('click', function () { setMode('single'); });
  tabList.addEventListener('click', function () { setMode('list'); });
  $('cnt-plus').addEventListener('click', function () { change(0, 1); });
  $('cnt-minus').addEventListener('click', function () { change(0, -1); });
  nameEl.addEventListener('input', function () {
    state.counters[0].name = nameEl.value;
    save();
  });
  valEl.addEventListener('focus', function () { valEl.select(); });
  valEl.addEventListener('change', function () {
    var n = parse(valEl.value);
    if (n !== null) { state.counters[0].value = n; }
    valEl.value = fmt(state.counters[0].value);
    save();
  });
  valEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { valEl.blur(); }
  });
  $('cnt-add').addEventListener('click', function () {
    state.counters.push({ name: 'ตัวนับ ' + (state.counters.length + 1), value: 0 });
    save();
    render(true);
  });
  $('cnt-reset').addEventListener('click', function () {
    if (state.mode === 'list') {
      state.counters.forEach(function (c) { c.value = 0; });
    } else {
      state.counters[0].value = 0;
    }
    save();
    render(true);
  });
  wakeEl.addEventListener('change', function () {
    state.wake = wakeEl.checked;
    save();
    if (state.wake) { keepAwake(); } else { releaseAwake(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') { keepAwake(); }
  });
  document.addEventListener('keydown', function (e) {
    if (state.mode !== 'single') { return; }
    var t = e.target;
    var tag = t && t.tagName ? t.tagName.toUpperCase() : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { return; }
    if (tag === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) { return; }
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    if (e.key === '+' || e.key === '=' || e.key === ' ' || e.key === 'ArrowUp') {
      e.preventDefault();
      change(0, 1);
    } else if (e.key === '-' || e.key === '_' || e.key === 'ArrowDown') {
      e.preventDefault();
      change(0, -1);
    }
  });
})();
