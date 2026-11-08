---
title: "ไฟกระพริบ"
seoTitle: "ไฟกระพริบ ออนไลน์ ฟรี"
h1: "ไฟกระพริบ"
description: "ไฟกระพริบออนไลน์ฟรี ปรับสี ความเร็ว และโหมดกะพริบได้ตามต้องการ เปิดเต็มหน้าจอและกันจอดับได้ ใช้ทันทีในเบราว์เซอร์ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งแอป"
icon: "📱"
category: "device"
weight: 23
byline: true
date: 2026-11-05
lastmod: 2026-11-08
draft: false
---

<div class="fl-app" id="flApp">
  <div class="fl-stage" id="flStage" role="img" aria-label="หน้าจอไฟกระพริบ">
    <div class="fl-hint" id="flHint">กดปุ่ม “เริ่ม” เพื่อให้ไฟกระพริบ</div>
  </div>
  <div class="fl-panel" id="flPanel">
    <div class="fl-warn">⚠️ คำเตือน: แสงกะพริบเร็วอาจกระตุ้นอาการชักในผู้ที่ไวต่อแสง ควรเริ่มจากความเร็วต่ำ และหยุดทันทีหากรู้สึกไม่สบาย</div>
    <div class="fl-row">
      <button type="button" class="fl-btn fl-main" id="flToggle" aria-pressed="false">▶ เริ่ม</button>
      <button type="button" class="fl-btn" id="flFull">⛶ เต็มหน้าจอ</button>
    </div>
    <div class="fl-row">
      <label for="flMode">โหมด</label>
      <select id="flMode">
        <option value="blink">กะพริบ (Blink)</option>
        <option value="strobe">สโตรบ (Strobe)</option>
        <option value="rainbow">สลับสีรุ้ง (Rainbow)</option>
        <option value="police">ไซเรนตำรวจ (Police)</option>
        <option value="sos">สัญญาณ SOS</option>
      </select>
    </div>
    <div class="fl-row" id="flColorRow">
      <label>สี</label>
      <button type="button" class="fl-sw fl-on" data-color="#ffffff" style="background:#ffffff" aria-label="สีขาว"></button>
      <button type="button" class="fl-sw" data-color="#ff1744" style="background:#ff1744" aria-label="สีแดง"></button>
      <button type="button" class="fl-sw" data-color="#ff9100" style="background:#ff9100" aria-label="สีส้ม"></button>
      <button type="button" class="fl-sw" data-color="#ffea00" style="background:#ffea00" aria-label="สีเหลือง"></button>
      <button type="button" class="fl-sw" data-color="#00e676" style="background:#00e676" aria-label="สีเขียว"></button>
      <button type="button" class="fl-sw" data-color="#00e5ff" style="background:#00e5ff" aria-label="สีฟ้า"></button>
      <button type="button" class="fl-sw" data-color="#2979ff" style="background:#2979ff" aria-label="สีน้ำเงิน"></button>
      <button type="button" class="fl-sw" data-color="#d500f9" style="background:#d500f9" aria-label="สีม่วง"></button>
      <button type="button" class="fl-sw" data-color="#ff4081" style="background:#ff4081" aria-label="สีชมพู"></button>
      <input type="color" id="flPick" value="#ffffff" aria-label="เลือกสีเอง">
    </div>
    <div class="fl-row">
      <label for="flSpeed">ความเร็ว</label>
      <input type="range" id="flSpeed" min="1" max="20" step="0.5" value="2">
      <output id="flSpeedOut">2 Hz</output>
    </div>
    <div class="fl-row">
      <label for="flBright">ความสว่าง</label>
      <input type="range" id="flBright" min="10" max="100" step="5" value="100">
      <output id="flBrightOut">100%</output>
    </div>
    <div class="fl-row">
      <label class="fl-check"><input type="checkbox" id="flAwake" checked> เปิดหน้าจอไว้ (ไม่ให้จอดับ)</label>
    </div>
    <div class="fl-note">แตะที่หน้าจอสีเพื่อซ่อนหรือแสดงแผงควบคุม กด Esc หรือปุ่ม “ออก” เพื่อออกจากโหมดเต็มหน้าจอ</div>
  </div>
</div>
<style>
.fl-app{--fl-bd:rgba(128,128,128,.4);margin:1rem 0 2rem;border:1px solid var(--fl-bd);border-radius:14px;overflow:hidden;font:inherit}
.fl-stage{position:relative;height:300px;background:#111;display:flex;align-items:center;justify-content:center;cursor:pointer}
.fl-hint{color:#fff;opacity:.8;text-align:center;padding:1rem;pointer-events:none}
.fl-panel{padding:14px;display:grid;gap:12px}
.fl-warn{padding:10px 12px;border-radius:10px;background:rgba(255,193,7,.18);border:1px solid rgba(255,193,7,.55);font-size:.9rem;line-height:1.5}
.fl-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.fl-row>label{min-width:78px;font-weight:600}
.fl-row>label.fl-check{font-weight:400;min-width:0;display:flex;align-items:center;gap:8px;cursor:pointer}
.fl-row input[type=range]{flex:1;min-width:140px}
.fl-row output{min-width:48px;text-align:right;font-variant-numeric:tabular-nums}
.fl-btn{font:inherit;padding:10px 18px;border-radius:10px;border:1px solid var(--fl-bd);background:transparent;color:inherit;cursor:pointer}
.fl-btn.fl-main{background:#2979ff;border-color:#2979ff;color:#fff;font-weight:700;min-width:120px}
.fl-btn.fl-main.fl-run{background:#d32f2f;border-color:#d32f2f}
#flMode{font:inherit;padding:8px 10px;border-radius:8px;border:1px solid var(--fl-bd);background:#fff;color:#111}
.fl-sw{width:30px;height:30px;border-radius:50%;border:2px solid var(--fl-bd);padding:0;cursor:pointer}
.fl-sw.fl-on{outline:3px solid #2979ff;outline-offset:2px}
#flPick{width:38px;height:32px;padding:0;border:none;background:none;cursor:pointer}
#flColorRow.fl-dim{opacity:.4;pointer-events:none}
.fl-note{display:none;font-size:.85rem;opacity:.8}
.fl-app.fl-full{position:fixed;inset:0;z-index:99999;border:0;border-radius:0;background:#000;margin:0}
.fl-full .fl-stage{position:absolute;inset:0;height:auto}
.fl-full .fl-panel{position:absolute;left:0;right:0;bottom:0;max-height:70%;overflow:auto;background:rgba(0,0,0,.78);color:#fff;z-index:2}
.fl-full .fl-panel.fl-hide{display:none}
.fl-full .fl-note{display:block}
html.fl-lock,html.fl-lock body{overflow:hidden}
</style>
<script>
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
</script>

## วิธีใช้งานไฟกระพริบ

1. กดปุ่ม **“▶ เริ่ม”** เพื่อให้หน้าจอเริ่มกะพริบ และกด **“■ หยุด”** เมื่อต้องการหยุด (หรือกดปุ่ม Space บนคีย์บอร์ด)
2. เลือก **โหมด** ที่ต้องการ เช่น กะพริบ สโตรบ สลับสีรุ้ง ไซเรนตำรวจ หรือ SOS
3. เลือก **สี** จากสีสำเร็จรูป หรือกดช่องเลือกสีเพื่อกำหนดสีเอง (ใช้ได้กับโหมดกะพริบ สโตรบ และ SOS)
4. เลื่อนแถบ **ความเร็ว** เพื่อปรับจำนวนครั้งที่กะพริบต่อวินาที ควรเริ่มจากค่าต่ำก่อน
5. เลื่อนแถบ **ความสว่าง** เพื่อลดความสว่างของแสงบนหน้าจอ หากต้องการให้สว่างที่สุด ให้เพิ่มความสว่างของอุปกรณ์ด้วย
6. กด **“⛶ เต็มหน้าจอ”** เพื่อให้สีกะพริบเต็มจอ แตะที่หน้าจอสีเพื่อซ่อนหรือแสดงแผงควบคุม และกด Esc หรือปุ่ม **“✕ ออก”** เพื่อกลับสู่หน้าปกติ
7. เปิดตัวเลือก **“เปิดหน้าจอไว้”** หากไม่ต้องการให้จอดับระหว่างใช้งาน

## คำอธิบายศัพท์ที่ใช้ในเครื่องมือ

| ศัพท์ | ความหมายโดยสังเขป |
| --- | --- |
| เริ่ม / หยุด | ปุ่มเปิดหรือปิดการกะพริบของหน้าจอ |
| โหมด | รูปแบบการกะพริบของแสง เลือกได้ 5 แบบ |
| กะพริบ (Blink) | สีที่เลือกติดและดับสลับกันในจังหวะสม่ำเสมอ |
| สโตรบ (Strobe) | แสงวาบสั้น ๆ ตามด้วยช่วงดับที่ยาวกว่า ให้ความรู้สึกคล้ายแฟลช |
| สลับสีรุ้ง (Rainbow) | หน้าจอเปลี่ยนสีวนไปเรื่อย ๆ ตามลำดับสีรุ้ง โดยไม่ใช้สีที่เลือก |
| ไซเรนตำรวจ (Police) | แสงสีแดงและสีน้ำเงินกะพริบสลับกันคล้ายไฟรถตำรวจ |
| SOS | จังหวะแสงตามรหัสมอร์สของคำว่า SOS คือสั้น 3 ยาว 3 สั้น 3 |
| สี | สีของแสงที่ใช้กะพริบ เลือกได้จากสีสำเร็จรูปหรือเลือกเอง |
| ความเร็ว (Hz) | จำนวนรอบการกะพริบต่อวินาที เช่น 2 Hz คือกะพริบ 2 รอบใน 1 วินาที |
| ความสว่าง | ระดับความสว่างของสีบนหน้าจอ ไม่ได้ปรับความสว่างของเครื่องโดยตรง |
| เต็มหน้าจอ (Fullscreen) | ขยายพื้นที่แสดงสีให้เต็มจอ ไม่มีส่วนอื่นของเว็บมาบัง |
| เปิดหน้าจอไว้ (Wake Lock) | ขอให้อุปกรณ์ไม่ปิดหน้าจออัตโนมัติ รองรับในเบราว์เซอร์รุ่นใหม่ส่วนใหญ่ |
| แผงควบคุม | ส่วนที่รวมปุ่มและตัวเลื่อนปรับค่าต่าง ๆ แตะหน้าจอสีเพื่อซ่อนในโหมดเต็มหน้าจอ |

## ข้อควรระวังในการใช้งาน

- แสงที่กะพริบเร็วอาจกระตุ้นอาการชักจากความไวต่อแสง (Photosensitive Epilepsy) ผู้ที่มีประวัติควรหลีกเลี่ยง
- ไม่ควรจ้องหน้าจอในระยะใกล้เป็นเวลานาน และควรหยุดทันทีหากมีอาการเวียนศีรษะหรือปวดตา
- ห้ามใช้ขณะขับขี่ยานพาหนะ
- โหมด SOS และไซเรนตำรวจใช้เพื่อความบันเทิงหรือสาธิตเท่านั้น ไม่สามารถแทนการขอความช่วยเหลือหรือสัญญาณฉุกเฉินจริงได้