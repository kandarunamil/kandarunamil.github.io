(function () {
  var LOWER = 'abcdefghijklmnopqrstuvwxyz';
  var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var DIGITS = '0123456789';
  var SYMBOLS = '!@#$%^&*-_+=?';
  var SIMILAR = '0oO1iIlL';
  var current = '';
  var toastTimer = null;
  function $(id) { return document.getElementById(id); }
  function rnd(n) {
    var buf = new Uint32Array(1);
    var max = Math.floor(4294967296 / n) * n;
    do { window.crypto.getRandomValues(buf); } while (buf[0] >= max);
    return buf[0] % n;
  }
  function clean(s) {
    if (!$('pw-similar').checked) { return s; }
    var o = '';
    for (var i = 0; s.length > i; i++) {
      if (SIMILAR.indexOf(s.charAt(i)) === -1) { o += s.charAt(i); }
    }
    return o;
  }
  function getLen() {
    var v = parseInt($('pw-length').value, 10);
    if (isNaN(v)) { v = 16; }
    if (4 > v) { v = 4; }
    if (v > 64) { v = 64; }
    return v;
  }
  function strengthLabel(bits) {
    if (bits >= 100) { return 'แข็งแรงมาก'; }
    if (bits >= 70) { return 'แข็งแรง'; }
    if (bits >= 50) { return 'ปานกลาง'; }
    return 'อ่อน';
  }
  function generate() {
    var sets = [];
    if ($('pw-lower').checked) { sets.push(clean(LOWER)); }
    if ($('pw-upper').checked) { sets.push(clean(UPPER)); }
    if ($('pw-digit').checked) { sets.push(clean(DIGITS)); }
    if ($('pw-symbol').checked) { sets.push(clean(SYMBOLS)); }
    var out = $('pw-output');
    var meta = $('pw-meta');
    if (sets.length === 0) {
      current = '';
      out.textContent = 'กรุณาเลือกอย่างน้อย 1 ประเภท';
      meta.textContent = '';
      return;
    }
    var len = getLen();
    var all = sets.join('');
    var chars = [];
    var i;
    if ($('pw-all').checked) {
      for (i = 0; sets.length > i; i++) { chars.push(sets[i].charAt(rnd(sets[i].length))); }
    }
    while (len > chars.length) { chars.push(all.charAt(rnd(all.length))); }
    for (i = chars.length - 1; i > 0; i--) {
      var j = rnd(i + 1);
      var t = chars[i]; chars[i] = chars[j]; chars[j] = t;
    }
    current = chars.join('');
    out.textContent = current;
    var bits = Math.round(len * Math.log(all.length) / Math.log(2));
    meta.textContent = 'ความยาว ' + len + ' ตัวอักษร · ความแข็งแรง: ' + strengthLabel(bits) + ' (ประมาณ ' + bits + ' บิต)';
  }
  function showToast() {
    var el = $('pw-toast');
    el.classList.add('show');
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1500);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    try { if (document.execCommand('copy')) { showToast(); } } catch (e) {}
    document.body.removeChild(ta);
  }
  function copy() {
    if (!current) { return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(current).then(showToast, function () { fallbackCopy(current); });
    } else {
      fallbackCopy(current);
    }
  }
  function syncFromNumber() {
    $('pw-range').value = getLen();
    generate();
  }
  $('pw-gen').addEventListener('click', function () { generate(); copy(); });
  $('pw-copy').addEventListener('click', copy);
  $('pw-length').addEventListener('input', syncFromNumber);
  $('pw-range').addEventListener('input', function () { $('pw-length').value = this.value; generate(); });
  var ids = ['pw-lower', 'pw-upper', 'pw-digit', 'pw-symbol', 'pw-all', 'pw-similar'];
  for (var k = 0; ids.length > k; k++) { $(ids[k]).addEventListener('change', generate); }
  generate();
})();
