(function () {
  var root = document.getElementById('pc-tool');
  if (!root) { return; }
  function fmt(n) {
    return Number(n).toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
  var calcs = {
    a: function (x, y) {
      var r = x * y / 100;
      return { text: fmt(r), formula: fmt(x) + ' ÷ 100 × ' + fmt(y) + ' = ' + fmt(r), val: r };
    },
    b: function (x, y) {
      var r = x / y * 100;
      return { text: fmt(r) + ' %', formula: fmt(x) + ' ÷ ' + fmt(y) + ' × 100 = ' + fmt(r) + ' %', val: r };
    },
    c: function (x, y) {
      var r = x / (y / 100);
      return { text: fmt(r), formula: fmt(x) + ' ÷ (' + fmt(y) + ' ÷ 100) = ' + fmt(r), val: r };
    },
    d: function (x, y) {
      var r = (y / x - 1) * 100;
      var sign = r > 0 ? '+' : '';
      return { text: sign + fmt(r) + ' %', formula: '(' + fmt(y) + ' ÷ ' + fmt(x) + ' − 1) × 100 = ' + sign + fmt(r) + ' %', val: r };
    },
    e: function (x, y) {
      var r = x * (1 + y / 100);
      return { text: fmt(r) + ' บาท', formula: fmt(x) + ' × (1 + ' + fmt(y) + ' ÷ 100) = ' + fmt(r) + ' (เพิ่มขึ้น ' + fmt(r - x) + ' บาท)', val: r };
    },
    f: function (x, y) {
      var r = x * (1 - y / 100);
      return { text: fmt(r) + ' บาท', formula: fmt(x) + ' × (1 − ' + fmt(y) + ' ÷ 100) = ' + fmt(r) + ' (ประหยัด ' + fmt(x - r) + ' บาท)', val: r };
    }
  };
  function update(card) {
    var inputs = card.querySelectorAll('input');
    var x = parseFloat(inputs[0].value);
    var y = parseFloat(inputs[1].value);
    var out = card.querySelector('.pc-r');
    var formula = card.querySelector('.pc-formula');
    if (isNaN(x) || isNaN(y)) {
      out.textContent = '–';
      formula.textContent = '';
      return;
    }
    var res = calcs[card.getAttribute('data-calc')](x, y);
    if (!isFinite(res.val)) {
      out.textContent = 'คำนวณไม่ได้ (หารด้วยศูนย์)';
      formula.textContent = '';
      return;
    }
    out.textContent = res.text;
    formula.textContent = res.formula;
  }
  root.addEventListener('input', function (e) {
    var card = e.target.closest('.pc-card');
    if (card) { update(card); }
  });
  document.getElementById('pc-clear').addEventListener('click', function () {
    var cards = root.querySelectorAll('.pc-card');
    for (var i = 0; i !== cards.length; i++) {
      var inputs = cards[i].querySelectorAll('input');
      inputs[0].value = '';
      inputs[1].value = '';
      update(cards[i]);
    }
  });
})();
