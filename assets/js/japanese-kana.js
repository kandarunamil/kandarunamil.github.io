(function () {
  'use strict';
  var root = document.getElementById('kt');
  if (!root) { return; }
  var KEY = 'kanaCardV1';
  var GROUPS = ['basic', 'dakuon', 'combo'];
  var MODES = { 1: 'ฝึกความจำ', 2: 'ฝึกการอ่าน', 3: 'ฝึกการเขียน' };
  var H = {
    basic: 'あ a い i う u え e お o か ka き ki く ku け ke こ ko さ sa し shi す su せ se そ so た ta ち chi つ tsu て te と to な na に ni ぬ nu ね ne の no は ha ひ hi ふ fu へ he ほ ho ま ma み mi む mu め me も mo や ya ゆ yu よ yo ら ra り ri る ru れ re ろ ro わ wa を wo ん n',
    dakuon: 'が ga ぎ gi ぐ gu げ ge ご go ざ za じ ji ず zu ぜ ze ぞ zo だ da ぢ ji づ zu で de ど do ば ba び bi ぶ bu べ be ぼ bo ぱ pa ぴ pi ぷ pu ぺ pe ぽ po',
    combo: 'きゃ kya きゅ kyu きょ kyo しゃ sha しゅ shu しょ sho ちゃ cha ちゅ chu ちょ cho にゃ nya にゅ nyu にょ nyo ひゃ hya ひゅ hyu ひょ hyo みゃ mya みゅ myu みょ myo りゃ rya りゅ ryu りょ ryo ぎゃ gya ぎゅ gyu ぎょ gyo じゃ ja じゅ ju じょ jo びゃ bya びゅ byu びょ byo ぴゃ pya ぴゅ pyu ぴょ pyo'
  };

  function toKata(s) {
    var o = '';
    for (var i = 0; i < s.length; i++) {
      var n = s.charCodeAt(i);
      o += (n >= 0x3041 && n <= 0x3096) ? String.fromCharCode(n + 0x60) : s.charAt(i);
    }
    return o;
  }

  var DATA = {}, ALL = {};
  GROUPS.forEach(function (g) {
    var p = H[g].split(' '), a = [];
    for (var i = 0; i + 1 < p.length; i += 2) {
      var e = { h: p[i], k: toKata(p[i]), r: p[i + 1] };
      a.push(e);
      ALL[e.h] = e.r;
      ALL[e.k] = e.r;
    }
    DATA[g] = a;
  });

  var S = { charset: 'hira', sound: ['basic'], shuffle: false, speak: true, dark: false, onlyStar: false, chartSet: 'hira', chartSound: 'basic', stars: [] };
  var DEFAULTS = JSON.stringify(S);
  var SETS = ['hira', 'kata', 'both'];

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (txt !== undefined && txt !== null) { n.textContent = txt; }
    return n;
  }

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) { return; }
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') { return; }
      if (SETS.indexOf(o.charset) > -1) { S.charset = o.charset; }
      if (Array.isArray(o.sound)) {
        var s = o.sound.filter(function (x) { return GROUPS.indexOf(x) > -1; });
        if (s.length) { S.sound = s; }
      }
      ['shuffle', 'speak', 'dark', 'onlyStar'].forEach(function (k) {
        if (typeof o[k] === 'boolean') { S[k] = o[k]; }
      });
      if (SETS.indexOf(o.chartSet) > -1) { S.chartSet = o.chartSet; }
      if (GROUPS.indexOf(o.chartSound) > -1) { S.chartSound = o.chartSound; }
      if (Array.isArray(o.stars)) {
        S.stars = o.stars.filter(function (c) { return typeof c === 'string' && ALL[c] !== undefined; });
      }
    } catch (e) { /* storage unavailable or corrupted: use defaults */ }
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }

  function say(t) {
    try {
      if (!('speechSynthesis' in window)) { return; }
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(t);
      u.lang = 'ja-JP';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  function stopSay() {
    try { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); } } catch (e) { /* ignore */ }
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function isStar(c) { return S.stars.indexOf(c) > -1; }
  function note(msg) { $('kt-note').textContent = msg || ''; }

  function setsOf(v) { return v === 'both' ? ['hira', 'kata'] : [v]; }
  function getItems(charset, sounds) {
    var out = [];
    setsOf(charset).forEach(function (s) {
      GROUPS.forEach(function (g) {
        if (sounds.indexOf(g) < 0) { return; }
        DATA[g].forEach(function (e) {
          out.push({ c: s === 'hira' ? e.h : e.k, r: e.r });
        });
      });
    });
    return out;
  }

  /* ---------- UI sync ---------- */
  function syncSegs() {
    var btns = root.querySelectorAll('.kt-seg button');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i], g = b.parentNode.getAttribute('data-group'), v = b.getAttribute('data-v'), on = false;
      if (g === 'charset') { on = S.charset === v; }
      else if (g === 'sound') { on = S.sound.indexOf(v) > -1; }
      else if (g === 'cset') { on = S.chartSet === v; }
      else if (g === 'csound') { on = S.chartSound === v; }
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }
  function syncOpts() {
    $('kt-shuffle').checked = S.shuffle;
    $('kt-sound').checked = S.speak;
    $('kt-dark').checked = S.dark;
    var has = S.stars.length > 0;
    $('kt-onlystar').disabled = !has;
    $('kt-onlystar').checked = has && S.onlyStar;
    $('kt-clear').disabled = !has;
    root.classList.toggle('kt-dark', S.dark);
  }
  function renderStars() {
    var box = $('kt-stars');
    box.textContent = '';
    if (!S.stars.length) {
      box.textContent = 'ยังไม่มีตัวอักษรที่ติดดาว กด ★ บนการ์ดหรือในตารางอ้างอิงเพื่อเพิ่ม';
      return;
    }
    S.stars.forEach(function (c) {
      var b = el('button', null, c + ' (' + ALL[c] + ')');
      b.type = 'button';
      b.setAttribute('data-star', c);
      b.setAttribute('aria-label', 'เอาดาวออกจาก ' + c);
      box.appendChild(b);
    });
  }
  function visChars() {
    var out = [];
    setsOf(S.chartSet).forEach(function (s) {
      DATA[S.chartSound].forEach(function (e) { out.push(s === 'hira' ? e.h : e.k); });
    });
    return out;
  }
  function renderChart() {
    var g = $('kt-grid');
    g.textContent = '';
    var sets = setsOf(S.chartSet);
    sets.forEach(function (s) {
      if (sets.length > 1) { g.appendChild(el('p', 'kt-sub', s === 'hira' ? 'ฮิรางานะ' : 'คาตากานะ')); }
      var wrap = el('div', 'kt-cells');
      DATA[S.chartSound].forEach(function (e) {
        var c = s === 'hira' ? e.h : e.k;
        var cell = el('div', 'kt-cell' + (isStar(c) ? ' on' : ''));
        var say1 = el('button');
        say1.type = 'button';
        say1.className = 'kt-say';
        say1.setAttribute('data-say', c);
        say1.appendChild(el('span', 'kt-c', c));
        say1.appendChild(el('span', 'kt-r', e.r));
        var st = el('button', 'kt-st', '★');
        st.type = 'button';
        st.setAttribute('data-star', c);
        st.setAttribute('aria-label', (isStar(c) ? 'เอาดาวออกจาก ' : 'ติดดาว ') + c);
        cell.appendChild(say1);
        cell.appendChild(st);
        wrap.appendChild(cell);
      });
      g.appendChild(wrap);
    });
    var v = visChars();
    var all = v.length > 0 && v.every(isStar);
    $('kt-starall').textContent = all ? 'ยกเลิกติดดาวทั้งหมด' : 'ติดดาวทั้งหมด';
  }

  /* ---------- stars ---------- */
  function afterStars(focusKey) {
    renderStars();
    renderChart();
    syncOpts();
    if (P.on) { syncStarBtn(); }
    if (focusKey) {
      var nb = $('kt-grid').querySelector('.kt-st[data-star="' + focusKey + '"]');
      if (nb) { try { nb.focus(); } catch (e) { /* ignore */ } }
    }
  }
  function toggleStar(c) {
    var fa = document.activeElement, key = null;
    if (fa && fa.classList && fa.classList.contains('kt-st')) { key = fa.getAttribute('data-star'); }
    var i = S.stars.indexOf(c);
    if (i > -1) { S.stars.splice(i, 1); } else { S.stars.push(c); }
    save();
    afterStars(key);
  }
  function starAll() {
    var v = visChars();
    if (v.length && v.every(isStar)) {
      S.stars = S.stars.filter(function (c) { return v.indexOf(c) < 0; });
    } else {
      v.forEach(function (c) { if (!isStar(c)) { S.stars.push(c); } });
    }
    save();
    afterStars(null);
  }

  /* ---------- practice ---------- */
  var P = { on: false, mode: 1, deck: [], i: 0, shown: true };
  var menu = $('kt-menu'), play = $('kt-play');

  function syncStarBtn() {
    var it = P.deck[P.i];
    if (!it) { return; }
    var on = isStar(it.c), b = $('kt-star');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.setAttribute('aria-label', on ? 'ยกเลิกติดดาว' : 'ติดดาว');
  }
  function renderCard() {
    var it = P.deck[P.i];
    var q = P.mode === 3 ? it.r : it.c;
    var a = P.mode === 3 ? it.c : it.r;
    $('kt-ch').textContent = q;
    $('kt-ch').className = 'kt-ch' + (P.mode === 3 ? ' kt-rom' : '');
    $('kt-an').textContent = a;
    $('kt-an').className = 'kt-an' + (P.mode === 3 ? ' kt-big' : '') + (P.shown ? '' : ' kt-hide');
    $('kt-mt').textContent = MODES[P.mode];
    $('kt-pos').textContent = (P.i + 1) + ' / ' + P.deck.length;
    $('kt-pbar').style.width = ((P.i + 1) / P.deck.length * 100) + '%';
    $('kt-prev').disabled = P.i === 0;
    $('kt-next').textContent = P.i === P.deck.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป';
    $('kt-reveal').hidden = P.shown;
    var hint = '';
    if (!P.shown && P.mode === 2) { hint = 'ลองอ่านออกเสียงในใจ แล้วกดแสดงคำตอบ'; }
    if (!P.shown && P.mode === 3) { hint = 'เขียนตัวอักษรลงกระดาษหรือจินตนาการลำดับขีด แล้วกดแสดงคำตอบ'; }
    $('kt-hint').textContent = hint;
    syncStarBtn();
  }
  function start(mode) {
    var d = getItems(S.charset, S.sound);
    if (S.onlyStar && S.stars.length) {
      d = d.filter(function (x) { return isStar(x.c); });
    }
    if (!d.length) {
      note('ไม่มีตัวอักษรตามเงื่อนไขที่เลือก ลองเปลี่ยนชุดตัวอักษรหรือกลุ่มเสียง');
      return;
    }
    if (S.shuffle) { shuffle(d); }
    note('');
    P.on = true; P.mode = mode; P.deck = d; P.i = 0; P.shown = (mode === 1);
    menu.hidden = true;
    play.hidden = false;
    renderCard();
    if (P.shown && S.speak) { say(d[0].c); }
  }
  function exitPlay() {
    P.on = false;
    stopSay();
    play.hidden = true;
    menu.hidden = false;
  }
  function finish() {
    var n = P.deck.length;
    exitPlay();
    note('ฝึกครบ ' + n + ' ใบแล้ว เลือกโหมดเพื่อฝึกต่อได้เลย');
  }
  function nav(d) {
    if (!P.on) { return; }
    if (d > 0 && P.i === P.deck.length - 1) { finish(); return; }
    var n = P.i + d;
    if (n < 0 || n >= P.deck.length) { return; }
    P.i = n;
    P.shown = (P.mode === 1);
    renderCard();
    if (P.shown && S.speak) { say(P.deck[P.i].c); }
  }
  function reveal() {
    if (!P.on || P.shown) { return; }
    P.shown = true;
    renderCard();
    if (S.speak) { say(P.deck[P.i].c); }
  }

  /* ---------- events ---------- */
  function onSeg(g, v) {
    if (g === 'charset') { S.charset = v; }
    else if (g === 'sound') {
      var i = S.sound.indexOf(v);
      if (i > -1) { if (S.sound.length > 1) { S.sound.splice(i, 1); } }
      else { S.sound.push(v); }
    }
    else if (g === 'cset') { S.chartSet = v; }
    else if (g === 'csound') { S.chartSound = v; }
    save();
    syncSegs();
    if (g === 'cset' || g === 'csound') { renderChart(); }
  }

  root.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('button') : null;
    if (!b || !root.contains(b)) { return; }
    var par = b.parentNode;
    if (par && par.classList && par.classList.contains('kt-seg')) {
      onSeg(par.getAttribute('data-group'), b.getAttribute('data-v'));
    } else if (b.hasAttribute('data-mode')) {
      start(parseInt(b.getAttribute('data-mode'), 10));
    } else if (b.hasAttribute('data-star')) {
      toggleStar(b.getAttribute('data-star'));
    } else if (b.hasAttribute('data-say')) {
      say(b.getAttribute('data-say'));
    } else {
      switch (b.id) {
        case 'kt-prev': nav(-1); break;
        case 'kt-next': nav(1); break;
        case 'kt-reveal': reveal(); break;
        case 'kt-exit': exitPlay(); break;
        case 'kt-star': if (P.on) { toggleStar(P.deck[P.i].c); } break;
        case 'kt-spk': if (P.on) { say(P.deck[P.i].c); } break;
        case 'kt-starall': starAll(); break;
        case 'kt-clear':
          S.stars = [];
          save();
          afterStars(null);
          break;
        case 'kt-reset':
          if (window.confirm('รีเซ็ตการตั้งค่าและตัวอักษรที่ติดดาวทั้งหมด?')) {
            try { window.localStorage.removeItem(KEY); } catch (err) { /* ignore */ }
            S = JSON.parse(DEFAULTS);
            note('');
            syncSegs(); syncOpts(); renderStars(); renderChart();
          }
          break;
      }
    }
    if (e.detail > 0 && P.on) { try { b.blur(); } catch (err) { /* ignore */ } }
  });

  $('kt-card').addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('button')) { return; }
    if (!P.on) { return; }
    if (!P.shown) { reveal(); } else { say(P.deck[P.i].c); }
  });

  root.addEventListener('change', function (e) {
    var t = e.target;
    if (!t || !t.id) { return; }
    if (t.id === 'kt-shuffle') { S.shuffle = t.checked; }
    else if (t.id === 'kt-sound') { S.speak = t.checked; }
    else if (t.id === 'kt-dark') { S.dark = t.checked; }
    else if (t.id === 'kt-onlystar') { S.onlyStar = t.checked; }
    else { return; }
    save();
    syncOpts();
  });

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { return; }
    var k = e.key;
    if ((k === ' ' || k === 'Enter') && tag === 'BUTTON') { return; }
    if (k === 't' || k === 'T') {
      S.dark = !S.dark; save(); syncOpts();
      return;
    }
    if (P.on) {
      if (k === 'ArrowLeft') { e.preventDefault(); nav(-1); }
      else if (k === 'ArrowRight' || k === ' ') { e.preventDefault(); nav(1); }
      else if (k === 'Enter') { e.preventDefault(); say(P.deck[P.i].c); }
      else if (k === 's' || k === 'S') { toggleStar(P.deck[P.i].c); }
      else if (k === 'r' || k === 'R') { reveal(); }
      else if (k === 'Escape') { exitPlay(); }
    } else if (k === '1' || k === '2' || k === '3') {
      start(parseInt(k, 10));
    }
  });

  /* ---------- init ---------- */
  load();
  syncSegs();
  syncOpts();
  renderStars();
  renderChart();
  root.setAttribute('data-ready', '1');
})();
