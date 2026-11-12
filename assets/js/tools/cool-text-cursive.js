/* cool-text-cursive.js */
(function () {
  'use strict';

  var SAMPLE = 'hello';

  // Unicode Mathematical Alphanumeric Symbols.
  // Some code points are "holes" and live in the Letterlike Symbols block.
  var SCRIPT_UP = { B: 0x212C, E: 0x2130, F: 0x2131, H: 0x210B, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211B };
  var SCRIPT_LOW = { e: 0x212F, g: 0x210A, o: 0x2134 };
  var FRAKTUR_UP = { C: 0x212D, H: 0x210C, I: 0x2111, R: 0x211C, Z: 0x2128 };
  var ITALIC_LOW = { h: 0x210E };

  var STYLES = [
    { name: 'Bold Script', upper: 0x1D4D0, lower: 0x1D4EA },
    { name: 'Script', upper: 0x1D49C, lower: 0x1D4B6, upEx: SCRIPT_UP, lowEx: SCRIPT_LOW },
    { name: 'Bold Fraktur', upper: 0x1D56C, lower: 0x1D586 },
    { name: 'Fraktur', upper: 0x1D504, lower: 0x1D51E, upEx: FRAKTUR_UP },
    { name: 'Italic', upper: 0x1D434, lower: 0x1D44E, lowEx: ITALIC_LOW },
    { name: 'Bold Italic', upper: 0x1D468, lower: 0x1D482 },
    { name: 'Sans Italic', upper: 0x1D608, lower: 0x1D622 },
    { name: 'Sans Bold Italic', upper: 0x1D63C, lower: 0x1D656 },
    { name: 'Bold Script + ♡', upper: 0x1D4D0, lower: 0x1D4EA, pre: '♡ ', post: ' ♡' },
    { name: 'Script + ✿', upper: 0x1D49C, lower: 0x1D4B6, upEx: SCRIPT_UP, lowEx: SCRIPT_LOW, pre: '✿ ', post: ' ✿' }
  ];

  function convertChar(ch, style) {
    var code = ch.charCodeAt(0);
    if (ch.length !== 1) { return ch; }
    if (code >= 65 && code <= 90) {
      if (style.upEx && style.upEx[ch]) { return String.fromCodePoint(style.upEx[ch]); }
      return String.fromCodePoint(style.upper + (code - 65));
    }
    if (code >= 97 && code <= 122) {
      if (style.lowEx && style.lowEx[ch]) { return String.fromCodePoint(style.lowEx[ch]); }
      return String.fromCodePoint(style.lower + (code - 97));
    }
    return ch;
  }

  function convert(text, style) {
    var out = Array.from(text).map(function (ch) { return convertChar(ch, style); }).join('');
    return (style.pre || '') + out + (style.post || '');
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) { resolve(); } else { reject(new Error('copy failed')); }
    });
  }

  function init() {
    var input = document.getElementById('ctc-input');
    var list = document.getElementById('ctc-results');
    var clearBtn = document.getElementById('ctc-clear');
    var counter = document.getElementById('ctc-count');
    if (!input || !list) { return; }

    var items = STYLES.map(function (style) {
      var li = document.createElement('li');
      li.className = 'ctc-item';

      var body = document.createElement('div');
      body.className = 'ctc-body';

      var name = document.createElement('span');
      name.className = 'ctc-name';
      name.textContent = style.name;

      var out = document.createElement('span');
      out.className = 'ctc-out';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ctc-btn';
      btn.textContent = 'คัดลอก';

      body.appendChild(name);
      body.appendChild(out);
      li.appendChild(body);
      li.appendChild(btn);
      list.appendChild(li);

      return { style: style, out: out, btn: btn, value: '', timer: null };
    });

    function render() {
      var text = input.value;
      var empty = text.trim() === '';
      var source = empty ? SAMPLE : text;
      items.forEach(function (item) {
        item.value = convert(source, item.style);
        item.out.textContent = item.value;
        item.out.classList.toggle('is-sample', empty);
        item.btn.disabled = empty;
      });
      if (counter) { counter.textContent = Array.from(text).length + ' / ' + (input.maxLength > 0 ? input.maxLength : 500); }
    }

    list.addEventListener('click', function (e) {
      var target = e.target;
      while (target && target !== list && !(target.classList && target.classList.contains('ctc-btn'))) {
        target = target.parentNode;
      }
      if (!target || target === list || target.disabled) { return; }
      var item = items.filter(function (it) { return it.btn === target; })[0];
      if (!item) { return; }
      copyText(item.value).then(function () {
        item.btn.textContent = 'คัดลอกแล้ว ✓';
        item.btn.classList.add('is-done');
        clearTimeout(item.timer);
        item.timer = setTimeout(function () {
          item.btn.textContent = 'คัดลอก';
          item.btn.classList.remove('is-done');
        }, 1500);
      }).catch(function () {
        item.btn.textContent = 'คัดลอกไม่สำเร็จ';
        clearTimeout(item.timer);
        item.timer = setTimeout(function () { item.btn.textContent = 'คัดลอก'; }, 1500);
      });
    });

    input.addEventListener('input', render);

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        render();
        input.focus();
      });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
