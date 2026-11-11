---
title: "สร้างทีมสุ่ม"
seoTitle: "สร้างทีมสุ่ม ออนไลน์ ฟรี"
h1: "สร้างทีมสุ่ม"
description: "สร้างทีมสุ่มออนไลน์ฟรี ใส่รายชื่อ เลือกจำนวนทีม แล้วกดสุ่มแบ่งกลุ่มได้ทันที ยุติธรรม คัดลอกผลลัพธ์ได้ ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องสมัครสมาชิก"
icon: "🎲"
category: "random"
weight: 31
byline: true
date: 2026-11-05
lastmod: 2026-11-11
draft: false
---

<style>
.rt-tool{max-width:760px;margin:0 auto 1.5rem}
.rt-card{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:1rem;margin:0 0 1rem}
.rt-card[hidden]{display:none}
.rt-head{display:flex;justify-content:space-between;align-items:baseline;gap:.5rem;margin-bottom:.5rem}
.rt-title{font-weight:700;font-size:1.1rem}
.rt-tool textarea{width:100%;box-sizing:border-box;min-height:160px;padding:.6rem;border:1px solid rgba(128,128,128,.45);border-radius:8px;font:inherit;background:transparent;color:inherit;resize:vertical}
.rt-row{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-top:.75rem}
.rt-row label{display:flex;align-items:center;gap:.4rem}
.rt-tool input[type=number]{width:5rem;padding:.4rem;border:1px solid rgba(128,128,128,.45);border-radius:8px;font:inherit;background:transparent;color:inherit}
.rt-tool button{padding:.5rem 1rem;border:1px solid rgba(128,128,128,.55);border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.rt-tool button:hover{background:rgba(128,128,128,.15)}
.rt-tool button.rt-primary{background:#2563eb;border-color:#2563eb;color:#fff}
.rt-tool button.rt-primary:hover{background:#1d4ed8}
.rt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem;margin-top:.75rem}
.rt-team{border:1px solid rgba(128,128,128,.35);border-radius:10px;padding:.75rem}
.rt-team .rt-tn{font-weight:700;margin-bottom:.25rem}
.rt-team input.rt-tname{width:100%;box-sizing:border-box;padding:.3rem;border:1px solid rgba(128,128,128,.45);border-radius:6px;font:inherit;font-weight:700;background:transparent;color:inherit}
.rt-team ul{margin:.4rem 0;padding-left:1.2rem}
.rt-team small{opacity:.7}
.rt-msg{min-height:1.4em;margin:0 0 .75rem;font-size:.95rem}
</style>
<div class="rt-tool" id="rt-tool">
<div class="rt-card">
<div class="rt-head"><span class="rt-title">รายชื่อ</span><span><b id="rt-count">0</b> ชื่อ</span></div>
<textarea id="rt-names" placeholder="พิมพ์ชื่อ หนึ่งชื่อต่อบรรทัด" aria-label="รายชื่อ"></textarea>
<div class="rt-row">
<label for="rt-teams">จำนวนทีม:</label>
<input type="number" id="rt-teams" min="2" max="50" value="2">
<button type="button" id="rt-sample">ใช้ตัวอย่างชื่อ</button>
</div>
<div class="rt-row">
<button type="button" class="rt-primary" id="rt-shuffle">สุ่มทีม</button>
<button type="button" id="rt-clear">ล้างทั้งหมด</button>
</div>
</div>
<p class="rt-msg" id="rt-msg" role="status" aria-live="polite"></p>
<div class="rt-card" id="rt-result-card" hidden>
<div class="rt-head"><span class="rt-title">สุ่มกลุ่ม <b id="rt-tcount">0</b> กลุ่ม</span></div>
<div class="rt-row">
<button type="button" class="rt-primary" id="rt-reshuffle">สุ่มทีม</button>
<button type="button" id="rt-edit">แก้ไขชื่อทีม</button>
<button type="button" id="rt-copy">คัดลอกทั้งหมด</button>
</div>
<div class="rt-grid" id="rt-result"></div>
</div>
</div>

<script>
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var namesEl = $('rt-names');
  var teamsEl = $('rt-teams');
  var countEl = $('rt-count');
  var msgEl = $('rt-msg');
  var cardEl = $('rt-result-card');
  var resultEl = $('rt-result');
  var tcountEl = $('rt-tcount');
  var editBtn = $('rt-edit');
  var KEY = 'rt-team-v1';
  var SAMPLE = ['สมชาย', 'สมหญิง', 'วิชัย', 'มาลี', 'ประเสริฐ', 'สุดา', 'อนันต์', 'นภา', 'ธีรพงษ์', 'กมลา'];
  var teams = [];
  var teamNames = [];
  var editing = false;
  function getNames() {
    return namesEl.value.split(/[\n\t]+/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  }
  function rand(n) {
    if (window.crypto && window.crypto.getRandomValues) {
      var a = new Uint32Array(1);
      var lim = Math.floor(4294967296 / n) * n;
      do { window.crypto.getRandomValues(a); } while (a[0] >= lim);
      return a[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function shuffleArr(arr) {
    var i, j, t;
    for (i = arr.length - 1; i > 0; i--) {
      j = rand(i + 1);
      t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function say(text) { msgEl.textContent = text || ''; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ n: namesEl.value, t: teamsEl.value })); } catch (e) { }
  }
  function updateCount() { countEl.textContent = String(getNames().length); }
  function render() {
    while (resultEl.firstChild) { resultEl.removeChild(resultEl.firstChild); }
    tcountEl.textContent = String(teams.length);
    teams.forEach(function (members, i) {
      var card = document.createElement('div');
      card.className = 'rt-team';
      var head;
      if (editing) {
        head = document.createElement('input');
        head.type = 'text';
        head.className = 'rt-tname';
        head.value = teamNames[i];
        head.setAttribute('aria-label', 'ชื่อทีม ' + (i + 1));
        head.addEventListener('input', function () { teamNames[i] = head.value; });
      } else {
        head = document.createElement('div');
        head.className = 'rt-tn';
        head.textContent = teamNames[i];
      }
      var ul = document.createElement('ul');
      members.forEach(function (m) {
        var li = document.createElement('li');
        li.textContent = m;
        ul.appendChild(li);
      });
      var meta = document.createElement('small');
      meta.textContent = members.length + ' คน';
      card.appendChild(head);
      card.appendChild(ul);
      card.appendChild(meta);
      resultEl.appendChild(card);
    });
    editBtn.textContent = editing ? 'บันทึกชื่อทีม' : 'แก้ไขชื่อทีม';
  }
  function doShuffle() {
    var names = getNames();
    var n = parseInt(teamsEl.value, 10);
    if (names.length === 0) { say('กรุณาใส่รายชื่ออย่างน้อย 1 ชื่อ'); return; }
    if (!(n >= 2)) { say('จำนวนทีมต้องเป็นตัวเลขตั้งแต่ 2 ขึ้นไป'); return; }
    if (n > 50) { n = 50; teamsEl.value = '50'; }
    if (n > names.length) { say('จำนวนทีมมากกว่าจำนวนชื่อ กรุณาลดจำนวนทีมหรือเพิ่มรายชื่อ'); return; }
    say('');
    shuffleArr(names);
    var result = [];
    var i;
    for (i = 0; i !== n; i++) { result.push([]); }
    names.forEach(function (name, k) { result[k % n].push(name); });
    teams = result;
    if (teamNames.length !== n) {
      teamNames = [];
      for (i = 0; i !== n; i++) { teamNames.push('ทีม ' + (i + 1)); }
    }
    editing = false;
    cardEl.hidden = false;
    render();
    save();
  }
  function toText() {
    return teams.map(function (members, i) {
      return teamNames[i] + '\n' + members.join('\n');
    }).join('\n\n');
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  function doCopy() {
    if (teams.length === 0) { return; }
    var text = toText();
    var done = function (ok) { say(ok ? 'คัดลอกผลลัพธ์แล้ว' : 'คัดลอกไม่สำเร็จ กรุณาคัดลอกด้วยตนเอง'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }
  function doClear() {
    namesEl.value = '';
    teamsEl.value = '2';
    teams = [];
    teamNames = [];
    editing = false;
    cardEl.hidden = true;
    say('');
    updateCount();
    save();
  }
  namesEl.addEventListener('input', function () { updateCount(); save(); });
  teamsEl.addEventListener('input', save);
  $('rt-sample').addEventListener('click', function () {
    namesEl.value = SAMPLE.join('\n');
    updateCount();
    save();
  });
  $('rt-shuffle').addEventListener('click', doShuffle);
  $('rt-reshuffle').addEventListener('click', doShuffle);
  $('rt-clear').addEventListener('click', doClear);
  $('rt-copy').addEventListener('click', doCopy);
  editBtn.addEventListener('click', function () {
    if (teams.length === 0) { return; }
    editing = !editing;
    render();
  });
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved.n === 'string') {
      namesEl.value = saved.n;
      if (saved.t) { teamsEl.value = saved.t; }
    }
  } catch (e) { }
  updateCount();
})();
</script>

## วิธีใช้งานสร้างทีมสุ่ม

1. **ใส่รายชื่อ** พิมพ์หรือวางชื่อผู้เล่นลงในช่องรายชื่อ หนึ่งชื่อต่อบรรทัด (คัดลอกจากแถวใน Excel หรือ Google Sheets มาวางได้เลย) หรือกด "ใช้ตัวอย่างชื่อ" เพื่อลองใช้งาน
2. **กำหนดจำนวนทีม** ใส่จำนวนทีมที่ต้องการแบ่ง ตั้งแต่ 2 ทีมขึ้นไป โดยจำนวนทีมต้องไม่มากกว่าจำนวนรายชื่อ
3. **กดสุ่มทีม** ระบบจะสับลำดับรายชื่อแบบสุ่มแล้วแบ่งเข้าแต่ละทีมให้มีจำนวนคนใกล้เคียงกันที่สุด ผลลัพธ์จะแสดงด้านล่าง
4. **สุ่มใหม่** หากยังไม่พอใจผลลัพธ์ กด "สุ่มทีม" อีกครั้งได้ไม่จำกัด ชื่อทีมที่ตั้งไว้จะยังอยู่
5. **ตั้งชื่อทีม** กด "แก้ไขชื่อทีม" เพื่อเปลี่ยนชื่อ เช่น ทีมแดง ทีมน้ำเงิน แล้วกด "บันทึกชื่อทีม"
6. **คัดลอกผลลัพธ์** กด "คัดลอกทั้งหมด" เพื่อนำรายชื่อทีมไปวางในแชตหรือเอกสาร
7. **เริ่มใหม่** กด "ล้างทั้งหมด" เพื่อลบรายชื่อและผลลัพธ์ทั้งหมด

รายชื่อและจำนวนทีมที่ใส่ไว้จะถูกจำไว้ในเบราว์เซอร์ของคุณเอง ข้อมูลไม่ถูกส่งไปที่ใด

## คำอธิบายศัพท์

- **รายชื่อ**: ชื่อของผู้เข้าร่วมทั้งหมดที่ต้องการแบ่งทีม ใส่หนึ่งชื่อต่อบรรทัด บรรทัดว่างจะถูกข้าม
- **จำนวนทีม**: จำนวนกลุ่มที่ต้องการแบ่ง เช่น มี 12 คนและตั้งไว้ 3 ทีม จะได้ทีมละ 4 คน
- **สุ่มทีม**: การสับลำดับรายชื่อแบบสุ่ม แล้วแจกเข้าแต่ละทีมทีละคนสลับกันไป
- **สุ่มใหม่**: การสุ่มซ้ำด้วยรายชื่อและจำนวนทีมเดิม ได้ผลลัพธ์ใหม่ทุกครั้ง
- **แก้ไขชื่อทีม**: โหมดที่ให้เปลี่ยนชื่อทีมจากค่าเริ่มต้น "ทีม 1, ทีม 2" เป็นชื่ออื่นได้
- **คัดลอกทั้งหมด**: คัดลอกชื่อทีมและรายชื่อสมาชิกทุกทีมเป็นข้อความ เพื่อนำไปวางที่อื่น
- **ล้างทั้งหมด**: ลบรายชื่อ ผลลัพธ์ และคืนจำนวนทีมเป็นค่าเริ่มต้น
- **ใช้ตัวอย่างชื่อ**: ใส่รายชื่อตัวอย่าง 10 ชื่อให้ เพื่อทดลองใช้งานโดยไม่ต้องพิมพ์เอง
- **การแบ่งแบบสมดุล**: วิธีแจกสมาชิกเข้าทีมทีละคนวนไป ทำให้ทุกทีมมีจำนวนคนต่างกันไม่เกิน 1 คน เช่น 10 คน 3 ทีม จะได้ 4, 3 และ 3 คน