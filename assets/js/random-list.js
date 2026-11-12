(function () {
  var $ = function (id) { return document.getElementById(id); };
  var ta = $("rl-text"), btnShuffle = $("rl-shuffle"), btnUndo = $("rl-undo");
  var btnCopy = $("rl-copy"), btnClear = $("rl-clear"), dedupe = $("rl-dedupe"), info = $("rl-info");
  if (!ta || !btnShuffle) { return; }
  var history = [];
  function getItems() {
    return ta.value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  }
  function randInt(max) {
    var cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj || !cryptoObj.getRandomValues) { return Math.floor(Math.random() * max); }
    var arr = new Uint32Array(1);
    var limit = Math.floor(4294967296 / max) * max;
    do { cryptoObj.getRandomValues(arr); } while (arr[0] >= limit);
    return arr[0] % max;
  }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randInt(i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function say(msg) { info.textContent = msg; }
  function updateCount() {
    var n = getItems().length;
    say(n > 0 ? "จำนวน " + n + " รายการ" : "");
  }
  function doShuffle() {
    var items = getItems();
    if (items.length === 0) { say("กรุณาใส่รายการอย่างน้อย 1 รายการ"); ta.focus(); return; }
    var removed = 0;
    if (dedupe.checked) {
      var seen = {}, uniq = [];
      items.forEach(function (it) { if (!seen.hasOwnProperty("k" + it)) { seen["k" + it] = 1; uniq.push(it); } });
      removed = items.length - uniq.length;
      items = uniq;
    }
    history.push(ta.value);
    if (history.length > 50) { history.shift(); }
    ta.value = shuffle(items).join("\n");
    btnUndo.disabled = false;
    say("สุ่มแล้ว " + items.length + " รายการ" + (removed > 0 ? " (ลบที่ซ้ำ " + removed + " รายการ)" : ""));
  }
  function doUndo() {
    if (history.length === 0) { return; }
    ta.value = history.pop();
    btnUndo.disabled = history.length === 0;
    updateCount();
  }
  function doCopy() {
    var text = ta.value;
    if (!text) { say("ไม่มีข้อความให้คัดลอก"); return; }
    function fallback() {
      ta.focus(); ta.select();
      try { document.execCommand("copy"); say("คัดลอกแล้ว"); } catch (e) { say("คัดลอกไม่สำเร็จ"); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say("คัดลอกแล้ว"); }, fallback);
    } else { fallback(); }
  }
  function doClear() {
    if (ta.value) { history.push(ta.value); btnUndo.disabled = false; }
    ta.value = "";
    say("");
    ta.focus();
  }
  btnShuffle.addEventListener("click", doShuffle);
  btnUndo.addEventListener("click", doUndo);
  btnCopy.addEventListener("click", doCopy);
  btnClear.addEventListener("click", doClear);
  ta.addEventListener("input", updateCount);
})();
