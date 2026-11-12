(function () {
  var coinsEl = document.getElementById('ct-coins');
  var goBtn = document.getElementById('ct-go');
  var resultEl = document.getElementById('ct-result');
  var histEl = document.getElementById('ct-hist');
  var countsEl = document.getElementById('ct-counts');
  var count = 1, heads = 0, tails = 0, flipping = false, history = [], rots = [], inners = [];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rnd() {
    var a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0] % 2;
  }
  function build() {
    coinsEl.innerHTML = '';
    rots = [];
    inners = [];
    for (var i = 0; i !== count; i++) {
      var coin = document.createElement('div');
      coin.className = 'ct-coin';
      var inner = document.createElement('div');
      inner.className = 'ct-inner';
      if (reduce) { inner.style.transition = 'none'; }
      var h = document.createElement('div');
      h.className = 'ct-face ct-head';
      h.textContent = 'หัว';
      var t = document.createElement('div');
      t.className = 'ct-face ct-tail';
      t.textContent = 'ก้อย';
      inner.appendChild(h);
      inner.appendChild(t);
      coin.appendChild(inner);
      coinsEl.appendChild(coin);
      rots.push(0);
      inners.push(inner);
    }
  }
  function render() {
    var total = heads + tails;
    document.getElementById('ct-h').textContent = heads;
    document.getElementById('ct-t').textContent = tails;
    document.getElementById('ct-all').textContent = total;
    document.getElementById('ct-hp').textContent = (total ? Math.round(heads * 100 / total) : 0) + '%';
    document.getElementById('ct-tp').textContent = (total ? Math.round(tails * 100 / total) : 0) + '%';
    histEl.innerHTML = '';
    history.forEach(function (item, idx) {
      var li = document.createElement('li');
      li.textContent = '#' + (total === 0 ? 0 : item.no) + ' ' + item.text;
      histEl.appendChild(li);
    });
  }
  var rounds = 0;
  function flip() {
    if (flipping) { return; }
    flipping = true;
    goBtn.disabled = true;
    resultEl.textContent = '';
    var h = 0, t = 0;
    inners.forEach(function (inner, i) {
      var r = rnd();
      if (r === 0) { h++; } else { t++; }
      var base = Math.ceil(rots[i] / 360) * 360;
      var target = base + 1800 + (r === 0 ? 0 : 180);
      rots[i] = target;
      inner.style.transform = 'rotateY(' + target + 'deg)';
    });
    setTimeout(function () {
      heads += h;
      tails += t;
      rounds += 1;
      var text = count === 1 ? (h === 1 ? 'หัว' : 'ก้อย') : 'หัว ' + h + ' / ก้อย ' + t;
      resultEl.textContent = 'ผลลัพธ์: ' + text;
      history.unshift({ no: rounds, text: text });
      if (history.length > 20) { history.length = 20; }
      render();
      flipping = false;
      goBtn.disabled = false;
    }, reduce ? 0 : 1250);
  }
  countsEl.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b || flipping) { return; }
    count = parseInt(b.getAttribute('data-n'), 10);
    Array.prototype.forEach.call(countsEl.querySelectorAll('button'), function (x) {
      x.className = x === b ? 'ct-on' : '';
    });
    resultEl.textContent = '';
    build();
  });
  goBtn.addEventListener('click', flip);
  document.getElementById('ct-reset').addEventListener('click', function () {
    if (flipping) { return; }
    heads = 0; tails = 0; rounds = 0; history = [];
    resultEl.textContent = '';
    render();
  });
  build();
  render();
})();
