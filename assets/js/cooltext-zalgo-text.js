(function () {
  "use strict";
  function range(a, b) {
    var r = [];
    var i = a;
    while (b >= i) { r.push(i); i += 1; }
    return r;
  }
  var UP = [].concat(range(0x300, 0x314), [0x31a], range(0x33d, 0x344), [0x346], range(0x34a, 0x34c), range(0x350, 0x352), [0x357, 0x35b], range(0x363, 0x36f));
  var MID = [0x315, 0x31b, 0x321, 0x322, 0x327, 0x328, 0x358].concat(range(0x334, 0x338), range(0x35c, 0x362));
  var DOWN = [].concat(range(0x316, 0x319), range(0x31c, 0x320), range(0x323, 0x326), range(0x329, 0x333), range(0x339, 0x33c), [0x345], range(0x347, 0x349), [0x34d, 0x34e], range(0x353, 0x356), [0x359, 0x35a]);
  var input = document.getElementById("zg-input");
  var output = document.getElementById("zg-output");
  var level = document.getElementById("zg-level");
  var levelVal = document.getElementById("zg-level-val");
  var cbUp = document.getElementById("zg-up");
  var cbMid = document.getElementById("zg-mid");
  var cbDown = document.getElementById("zg-down");
  var status = document.getElementById("zg-status");
  if (!input || !output || !level) { return; }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(list, count) {
    var s = "";
    var i = count;
    while (i > 0) { s += String.fromCharCode(list[rnd(list.length)]); i -= 1; }
    return s;
  }
  function build(text, lv) {
    var out = "";
    Array.from(text).forEach(function (ch) {
      out += ch;
      if (/\s/.test(ch)) { return; }
      if (cbUp.checked) { out += pick(UP, 1 + rnd(lv)); }
      if (cbMid.checked) { out += pick(MID, rnd(Math.ceil(lv / 2) + 1)); }
      if (cbDown.checked) { out += pick(DOWN, 1 + rnd(lv)); }
    });
    return out;
  }
  function render() {
    var lv = parseInt(level.value, 10) || 1;
    levelVal.textContent = String(lv);
    output.value = build(input.value, lv);
  }
  function say(msg) {
    status.textContent = msg;
    window.setTimeout(function () { status.textContent = ""; }, 2500);
  }
  function copy() {
    if (!output.value) { say("ยังไม่มีข้อความให้คัดลอก"); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output.value).then(function () { say("คัดลอกแล้ว"); }, fallbackCopy);
    } else {
      fallbackCopy();
    }
  }
  function fallbackCopy() {
    output.focus();
    output.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    say(ok ? "คัดลอกแล้ว" : "คัดลอกไม่สำเร็จ กรุณาเลือกข้อความแล้วคัดลอกเอง");
  }
  function step(d) {
    var v = parseInt(level.value, 10) + d;
    if (v > 10) { v = 10; }
    if (1 > v) { v = 1; }
    level.value = String(v);
    render();
  }
  input.addEventListener("input", render);
  level.addEventListener("input", render);
  cbUp.addEventListener("change", render);
  cbMid.addEventListener("change", render);
  cbDown.addEventListener("change", render);
  document.getElementById("zg-minus").addEventListener("click", function () { step(-1); });
  document.getElementById("zg-plus").addEventListener("click", function () { step(1); });
  document.getElementById("zg-convert").addEventListener("click", render);
  document.getElementById("zg-copy").addEventListener("click", copy);
  document.getElementById("zg-clear").addEventListener("click", function () {
    input.value = "";
    render();
    input.focus();
  });
  render();
})();
