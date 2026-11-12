(function () {
  var root = document.getElementById('dice-tool');
  if (!root) { return; }
  var stage = document.getElementById('dt-stage');
  var rollBtn = document.getElementById('dt-roll');
  var resultEl = document.getElementById('dt-result');
  var histWrap = document.getElementById('dt-hist-wrap');
  var histEl = document.getElementById('dt-history');
  var clearBtn = document.getElementById('dt-clear');
  var countBtns = root.querySelectorAll('.dt-count button');
  var PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  var FACES = [1, 6, 3, 4, 2, 5];
  var ANGLE = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 2: [-90, 0], 5: [90, 0] };
  var count = 1;
  var rolls = 0;
  var busy = false;
  var history = [];
  var cubes = [];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rnd(max) {
    var c = window.crypto || window.msCrypto;
    if (c && c.getRandomValues) {
      var a = new Uint32Array(1);
      var limit = Math.floor(4294967296 / max) * max;
      do { c.getRandomValues(a); } while (a[0] >= limit);
      return a[0] % max;
    }
    return Math.floor(Math.random() * max);
  }
  function makeFace(v) {
    var f = document.createElement('div');
    f.className = 'dt-face dt-f' + v;
    PIPS[v].forEach(function (cell) {
      var p = document.createElement('span');
      p.className = 'dt-pip';
      p.style.gridRow = String(Math.ceil(cell / 3));
      p.style.gridColumn = String(((cell - 1) % 3) + 1);
      f.appendChild(p);
    });
    return f;
  }
  function build() {
    stage.textContent = '';
    cubes = [];
    for (var i = 0; i !== count; i++) {
      var cube = document.createElement('div');
      cube.className = 'dt-cube';
      FACES.forEach(function (v) { cube.appendChild(makeFace(v)); });
      stage.appendChild(cube);
      cubes.push(cube);
    }
  }
  function setAngle(cube, value, spin) {
    var a = ANGLE[value];
    var x = a[0] + 1080 * spin + 360 * rnd(2);
    var y = a[1] + 1080 * spin + 360 * rnd(2);
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
  }
  function symbol(v) { return String.fromCharCode(0x2680 + v - 1); }
  function showResult(vals) {
    var sum = vals.reduce(function (s, v) { return s + v; }, 0);
    var dbl = vals.length !== 1 && new Set(vals).size !== vals.length;
    resultEl.textContent = '';
    var line1 = document.createElement('div');
    line1.textContent = vals.map(function (v) { return symbol(v) + ' ' + v; }).join('   ');
    resultEl.appendChild(line1);
    if (vals.length !== 1) {
      var line2 = document.createElement('div');
      line2.appendChild(document.createTextNode('ผลรวม '));
      var s = document.createElement('span');
      s.className = 'dt-sum';
      s.textContent = String(sum);
      line2.appendChild(s);
      if (dbl) {
        var b = document.createElement('span');
        b.className = 'dt-dbl';
        b.textContent = 'แต้มซ้ำ';
        line2.appendChild(b);
      }
      resultEl.appendChild(line2);
    }
    history.unshift({ vals: vals, sum: sum });
    history = history.slice(0, 10);
    renderHistory();
  }
  function renderHistory() {
    histEl.textContent = '';
    history.forEach(function (h) {
      var li = document.createElement('li');
      var t = h.vals.join(', ');
      if (h.vals.length !== 1) { t += '  (รวม ' + h.sum + ')'; }
      li.textContent = t;
      histEl.appendChild(li);
    });
    histWrap.hidden = history.length === 0;
  }
  function roll() {
    if (busy) { return; }
    busy = true;
    rolls++;
    rollBtn.disabled = true;
    var vals = [];
    for (var i = 0; i !== count; i++) { vals.push(rnd(6) + 1); }
    cubes.forEach(function (cube, idx) { setAngle(cube, vals[idx], rolls); });
    window.setTimeout(function () {
      showResult(vals);
      busy = false;
      rollBtn.disabled = false;
    }, reduceMotion ? 0 : 1150);
  }
  function setCount(n) {
    if (busy) { return; }
    count = n;
    countBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', Number(b.getAttribute('data-n')) === n ? 'true' : 'false');
    });
    build();
    resultEl.textContent = 'กดปุ่มทอยลูกเต๋าเพื่อเริ่มต้น';
  }
  countBtns.forEach(function (b) {
    b.addEventListener('click', function () { setCount(Number(b.getAttribute('data-n'))); });
  });
  rollBtn.addEventListener('click', roll);
  stage.addEventListener('click', roll);
  clearBtn.addEventListener('click', function () { history = []; renderHistory(); });
  build();
})();
