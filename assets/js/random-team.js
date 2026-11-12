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
