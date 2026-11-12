(function () {
  var ta = document.getElementById('cp-text');
  var elChars = document.getElementById('cp-chars');
  var elWords = document.getElementById('cp-words');
  var elLines = document.getElementById('cp-lines');
  var status = document.getElementById('cp-status');
  var timer = null;
  if (!ta) { return; }
  function say(msg) {
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; }, 2500);
  }
  function countWords(text) {
    var t = text.trim();
    if (t.length === 0) { return 0; }
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        var seg = new Intl.Segmenter('th', { granularity: 'word' });
        var n = 0;
        var it = seg.segment(t)[Symbol.iterator]();
        var r = it.next();
        while (!r.done) {
          if (r.value.isWordLike) { n++; }
          r = it.next();
        }
        return n;
      } catch (e) { }
    }
    return t.split(/\s+/).length;
  }
  function update() {
    var v = ta.value;
    elChars.textContent = Array.from(v).length;
    elWords.textContent = countWords(v);
    elLines.textContent = v.length === 0 ? 0 : v.split('\n').length;
  }
  function fallbackCopy() {
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    return ok;
  }
  function copyNow() {
    if (ta.value.length === 0) { say('ยังไม่มีข้อความให้คัดลอก'); ta.focus(); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(function () {
        say('คัดลอกแล้ว ✓');
      }, function () {
        say(fallbackCopy() ? 'คัดลอกแล้ว ✓' : 'คัดลอกไม่สำเร็จ กรุณาลองกด Ctrl+C');
      });
    } else {
      say(fallbackCopy() ? 'คัดลอกแล้ว ✓' : 'คัดลอกไม่สำเร็จ กรุณาลองกด Ctrl+C');
    }
  }
  function pasteNow() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function (t) {
        ta.value = t;
        update();
        say('วางข้อความแล้ว');
      }, function () {
        say('เบราว์เซอร์ไม่อนุญาตให้อ่านคลิปบอร์ด กรุณาใช้ Ctrl+V');
        ta.focus();
      });
    } else {
      say('เบราว์เซอร์ไม่รองรับ กรุณาใช้ Ctrl+V');
      ta.focus();
    }
  }
  function clearNow() {
    ta.value = '';
    update();
    ta.focus();
    say('ล้างข้อความแล้ว');
  }
  ta.addEventListener('input', update);
  document.getElementById('cp-copy').addEventListener('click', copyNow);
  document.getElementById('cp-paste').addEventListener('click', pasteNow);
  document.getElementById('cp-clear').addEventListener('click', clearNow);
  update();
})();
