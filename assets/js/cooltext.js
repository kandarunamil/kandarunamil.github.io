/*
 * Special-text engine. Pure functions + a small DOM layer.
 * Only ASCII letters/digits are restyled; Thai and other characters pass through unchanged.
 * Add a style: push one object into STYLES (id, name, group, fn).
 */
(function (root) {
  'use strict';

  var cp = String.fromCodePoint;

  // Build a mapper from code point offsets: upper A-Z, lower a-z, digit 0-9.
  // ex = exceptions { char: codePoint } for the holes in Unicode's math alphabets.
  function offsets(upper, lower, digit, ex) {
    ex = ex || {};
    return function (ch) {
      if (Object.prototype.hasOwnProperty.call(ex, ch)) return cp(ex[ch]);
      var c = ch.codePointAt(0);
      if (upper != null && c >= 65 && c <= 90) return cp(upper + c - 65);
      if (lower != null && c >= 97 && c <= 122) return cp(lower + c - 97);
      if (digit != null && c >= 48 && c <= 57) return cp(digit + c - 48);
      return ch;
    };
  }

  // Mapper from a 26-char table (a-z); uppercase uses the same glyphs.
  function table(glyphs, extra) {
    var g = Array.from(glyphs);
    extra = extra || {};
    return function (ch) {
      if (Object.prototype.hasOwnProperty.call(extra, ch)) return extra[ch];
      var c = ch.toLowerCase().codePointAt(0);
      return c >= 97 && c <= 122 ? g[c - 97] : ch;
    };
  }

  function mapText(text, fn) {
    return Array.from(text).map(fn).join('');
  }

  // Split into user-perceived characters so Thai vowels and tone marks stay attached to their base letter.
  var segmenter = (typeof Intl !== 'undefined' && Intl.Segmenter) ? new Intl.Segmenter('th', { granularity: 'grapheme' }) : null;
  function graphemes(text) {
    if (!segmenter) return Array.from(text);
    return Array.from(segmenter.segment(text), function (x) { return x.segment; });
  }

  function combine(mark) {
    return function (text) {
      return graphemes(text).map(function (ch) {
        return /\s/.test(ch) ? ch : ch + mark;
      }).join('');
    };
  }

  function wrap(pre, post) {
    return function (text) { return pre + text + post; };
  }

  // digit exception tables
  var circledDigits = { '0': 0x24EA }, negCircledDigits = { '0': 0x24FF }, i;
  for (i = 1; i <= 9; i++) {
    circledDigits[String(i)] = 0x2460 + i - 1;
    negCircledDigits[String(i)] = 0x2776 + i - 1;
  }

  var script = { B: 0x212C, E: 0x2130, F: 0x2131, H: 0x210B, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211B, e: 0x212F, g: 0x210A, o: 0x2134 };
  var fraktur = { C: 0x212D, H: 0x210C, I: 0x2111, R: 0x211C, Z: 0x2128 };
  var dbl = { C: 0x2102, H: 0x210D, N: 0x2115, P: 0x2119, Q: 0x211A, R: 0x211D, Z: 0x2124 };

  var flipMap = table('ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz', {
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
    '?': '¿', '!': '¡', '.': '˙', ',': "'", "'": ',', '(': ')', ')': '(', '[': ']', ']': '[', '&': '⅋', '_': '‾'
  });

  var supDigits = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾' };
  var superscript = table('ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ', supDigits);
  var subTable = { a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎' };
  function subscript(ch) {
    var l = ch.toLowerCase();
    return Object.prototype.hasOwnProperty.call(subTable, l) ? subTable[l] : ch;
  }

  function words(t) { return t.split(/[^\p{L}\p{N}\p{M}]+/u).filter(Boolean); }
  function capFirst(w) { return w.charAt(0).toUpperCase() + w.slice(1); }
  function titleCase(t) {
    return t.toLowerCase().replace(/(^|[\s\-_(\["'“])(\p{L})/gu, function (m, a, b) { return a + b.toUpperCase(); });
  }
  function sentenceCase(t) {
    return t.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, function (m, a, b) { return a + b.toUpperCase(); });
  }
  function alternate(t) {
    var n = 0;
    return mapText(t, function (ch) {
      if (!/\p{L}/u.test(ch)) return ch;
      return (n++ % 2) ? ch.toUpperCase() : ch.toLowerCase();
    });
  }
  function invertCase(t) {
    return mapText(t, function (ch) { var u = ch.toUpperCase(); return ch === u ? ch.toLowerCase() : u; });
  }
  function camel(t) {
    return words(t.toLowerCase()).map(function (w, i) { return i ? capFirst(w) : w; }).join('');
  }

  var STYLES = [
    // basic
    { id: 'bold', name: 'ตัวหนา (Bold)', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D400, 0x1D41A, 0x1D7CE)); } },
    { id: 'italic', name: 'ตัวเอียง (Italic)', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D434, 0x1D44E, null, { h: 0x210E })); } },
    { id: 'bold-italic', name: 'ตัวหนาเอียง', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D468, 0x1D482, 0x1D7CE)); } },
    { id: 'sans', name: 'Sans-serif', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D5A0, 0x1D5BA, 0x1D7E2)); } },
    { id: 'sans-bold', name: 'Sans-serif ตัวหนา', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D5D4, 0x1D5EE, 0x1D7EC)); } },
    { id: 'sans-italic', name: 'Sans-serif ตัวเอียง', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D608, 0x1D622, 0x1D7E2)); } },
    { id: 'sans-bold-italic', name: 'Sans-serif หนาเอียง', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D63C, 0x1D656, 0x1D7EC)); } },
    { id: 'mono', name: 'Monospace', group: 'basic', fn: function (t) { return mapText(t, offsets(0x1D670, 0x1D68A, 0x1D7F6)); } },
    // fancy
    { id: 'script', name: 'ลายมือ (Script)', group: 'fancy', fn: function (t) { return mapText(t, offsets(0x1D49C, 0x1D4B6, null, script)); } },
    { id: 'script-bold', name: 'ลายมือตัวหนา', group: 'fancy', fn: function (t) { return mapText(t, offsets(0x1D4D0, 0x1D4EA, 0x1D7CE)); } },
    { id: 'fraktur', name: 'อักษรเยอรมัน (Fraktur)', group: 'fancy', fn: function (t) { return mapText(t, offsets(0x1D504, 0x1D51E, null, fraktur)); } },
    { id: 'fraktur-bold', name: 'Fraktur ตัวหนา', group: 'fancy', fn: function (t) { return mapText(t, offsets(0x1D56C, 0x1D586, 0x1D7CE)); } },
    { id: 'double', name: 'เส้นคู่ (Double-struck)', group: 'fancy', fn: function (t) { return mapText(t, offsets(0x1D538, 0x1D552, 0x1D7D8, dbl)); } },
    // bubble
    { id: 'circled', name: 'วงกลม', group: 'bubble', fn: function (t) { return mapText(t, offsets(0x24B6, 0x24D0, null, circledDigits)); } },
    { id: 'circled-neg', name: 'วงกลมทึบ', group: 'bubble', fn: function (t) { return mapText(t, offsets(0x1F150, 0x1F150, null, negCircledDigits)); } },
    { id: 'paren', name: 'วงเล็บ', group: 'bubble', fn: function (t) { return mapText(t, offsets(0x1F110, 0x249C)); } },
    // box
    { id: 'squared', name: 'สี่เหลี่ยม', group: 'box', fn: function (t) { return mapText(t, offsets(0x1F130, 0x1F130)); } },
    { id: 'squared-neg', name: 'สี่เหลี่ยมทึบ', group: 'box', fn: function (t) { return mapText(t, offsets(0x1F170, 0x1F170)); } },
    // wide / small / flip
    { id: 'wide', name: 'ตัวกว้าง (Fullwidth)', group: 'wide', fn: function (t) { return mapText(t, offsets(0xFF21, 0xFF41, 0xFF10, { ' ': 0x3000 })); } },
    { id: 'spaced', name: 'เว้นระยะ', group: 'wide', fn: function (t) { return graphemes(t).join(' '); } },
    { id: 'small-caps', name: 'ตัวเล็กจิ๋ว (Small caps)', group: 'small', fn: function (t) { return mapText(t, table('ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ')); } },
    { id: 'flip', name: 'กลับหัว', group: 'flip', fn: function (t) { return graphemes(t).reverse().map(flipMap).join(''); } },
    // lines
    { id: 'strike', name: 'ขีดฆ่า', group: 'line', fn: combine('\u0336') },
    { id: 'underline', name: 'ขีดเส้นใต้', group: 'line', fn: combine('\u0332') },
    { id: 'double-underline', name: 'ขีดเส้นใต้สองชั้น', group: 'line', fn: combine('\u0333') },
    { id: 'slash', name: 'ขีดเฉียง', group: 'line', fn: combine('\u0338') },
    // decorations
    { id: 'stars', name: 'ล้อมดาว', group: 'decor', fn: wrap('★ ', ' ★') },
    { id: 'flower', name: 'ล้อมดอกไม้', group: 'decor', fn: wrap('✿ ', ' ✿') },
    { id: 'bracket', name: 'วงเล็บเหลี่ยมหนา', group: 'decor', fn: wrap('【', '】') },
    { id: 'quote', name: 'เครื่องหมายคำพูดญี่ปุ่น', group: 'decor', fn: wrap('『', '』') },
    { id: 'wing', name: 'ปีกสองข้าง', group: 'decor', fn: wrap('꧁ ', ' ꧂') },
    { id: 'sparkle', name: 'ประกายระยิบ', group: 'decor', fn: wrap('✧･ﾟ: *✧･ﾟ:* ', ' *:･ﾟ✧*:･ﾟ✧') },
    { id: 'heart', name: 'ล้อมหัวใจ', group: 'decor', fn: wrap('♡ ', ' ♡') },
    { id: 'star-trail', name: 'ดาวพุ่ง', group: 'decor', fn: wrap('☆彡 ', ' 彡☆') },
    { id: 'bars', name: 'เส้นคู่สองข้าง', group: 'decor', fn: wrap('═══ ', ' ═══') },
    { id: 'dots', name: 'จุดประกาย', group: 'decor', fn: wrap('•·.·•·.·• ', ' •·.·•·.·•') },
    { id: 'arrow', name: 'ลูกศรนำหน้า', group: 'decor', fn: wrap('➤ ', '') },
    { id: 'moon', name: 'พระจันทร์', group: 'decor', fn: wrap('☾ ', ' ☽') },
    { id: 'music', name: 'โน้ตดนตรี', group: 'decor', fn: wrap('♪♫ ', ' ♫♪') },
    { id: 'diamond', name: 'ล้อมข้าวหลามตัด', group: 'decor', fn: wrap('◆◇ ', ' ◇◆') },
    { id: 'cross', name: 'ประกายสี่แฉก', group: 'decor', fn: wrap('✦ ', ' ✦') },
    // more line styles
    { id: 'strike-short', name: 'ขีดทับสั้น', group: 'line', fn: combine('\u0335') },
    { id: 'tilde', name: 'ขีดทับหยัก', group: 'line', fn: combine('\u0334') },
    { id: 'underline-wavy', name: 'ขีดใต้หยัก', group: 'line', fn: combine('\u0330') },
    { id: 'overline', name: 'ขีดบน', group: 'line', fn: combine('\u0305') },
    // more small / flip
    { id: 'superscript', name: 'ตัวยก (Superscript)', group: 'small', fn: function (t) { return mapText(t, superscript); } },
    { id: 'subscript', name: 'ตัวห้อย (Subscript)', group: 'small', fn: function (t) { return mapText(t, subscript); } },
    { id: 'reverse', name: 'กลับด้านซ้ายขวา', group: 'flip', fn: function (t) { return graphemes(t).reverse().join(''); } },
    { id: 'reverse-words', name: 'กลับลำดับคำ', group: 'flip', fn: function (t) { return t.split(/(\s+)/).reverse().join(''); } },
    // case
    { id: 'upper', name: 'ตัวพิมพ์ใหญ่ทั้งหมด (UPPERCASE)', group: 'case', fn: function (t) { return t.toUpperCase(); } },
    { id: 'lower', name: 'ตัวพิมพ์เล็กทั้งหมด (lowercase)', group: 'case', fn: function (t) { return t.toLowerCase(); } },
    { id: 'title', name: 'ขึ้นต้นทุกคำด้วยตัวใหญ่ (Title Case)', group: 'case', fn: titleCase },
    { id: 'sentence', name: 'ขึ้นต้นประโยคด้วยตัวใหญ่ (Sentence case)', group: 'case', fn: sentenceCase },
    { id: 'alternate', name: 'สลับเล็กใหญ่ (aLtErNaTe)', group: 'case', fn: alternate },
    { id: 'invert', name: 'สลับตัวพิมพ์ (iNVERT)', group: 'case', fn: invertCase },
    { id: 'camel', name: 'camelCase', group: 'case', fn: camel },
    { id: 'snake', name: 'snake_case', group: 'case', fn: function (t) { return words(t.toLowerCase()).join('_'); } },
    { id: 'kebab', name: 'kebab-case / slug', group: 'case', fn: function (t) { return words(t.toLowerCase()).join('-'); } },
    { id: 'trim-spaces', name: 'ลบช่องว่างที่เกิน', group: 'case', fn: function (t) { return t.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim(); } },
    { id: 'one-line', name: 'ลบการขึ้นบรรทัดใหม่', group: 'case', fn: function (t) { return t.replace(/\s*\n+\s*/g, ' ').trim(); } }
  ];

  var api = { STYLES: STYLES, mapText: mapText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CoolText = api;

  // ---------- DOM layer ----------
  if (typeof document === 'undefined') return;

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function init() {
    var input = document.getElementById('ct-input');
    var list = document.getElementById('ct-results');
    var status = document.getElementById('ct-status');
    var clear = document.getElementById('ct-clear');
    if (!input || !list) return;

    var groups = (list.getAttribute('data-groups') || 'all').split(',').map(function (s) { return s.trim(); });
    var sample = input.getAttribute('data-sample') || 'Hello World';
    var all = groups.indexOf('all') > -1;
    var rows = [];
    var timer;

    var ids = (list.getAttribute('data-ids') || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    var chosen = ids.length
      ? ids.map(function (id) { return STYLES.filter(function (s) { return s.id === id; })[0]; }).filter(Boolean)
      : STYLES.filter(function (s) { return all || groups.indexOf(s.group) > -1; });
    var limit = parseInt(input.getAttribute('data-limit'), 10) || 0;
    var count = document.getElementById('ct-count');

    chosen.forEach(function (style) {
      var li = document.createElement('li');
      var label = document.createElement('span');
      var out = document.createElement('span');
      var btn = document.createElement('button');
      label.className = 'r-label';
      label.textContent = style.name;
      out.className = 'r-text';
      btn.type = 'button';
      btn.className = 'btn';
      btn.textContent = 'คัดลอก';
      btn.setAttribute('aria-label', 'คัดลอก ' + style.name);
      btn.addEventListener('click', function () {
        copyText(out.textContent).then(function () {
          btn.textContent = 'คัดลอกแล้ว';
          btn.classList.add('is-copied');
          if (status) status.textContent = 'คัดลอก “' + style.name + '” แล้ว';
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.textContent = 'คัดลอก';
            btn.classList.remove('is-copied');
            if (status) status.textContent = '';
          }, 1600);
        }, function () {
          if (status) status.textContent = 'คัดลอกไม่สำเร็จ กรุณาเลือกข้อความแล้วคัดลอกเอง';
        });
      });
      li.appendChild(label);
      li.appendChild(out);
      li.appendChild(btn);
      list.appendChild(li);
      rows.push({ style: style, out: out });
    });

    function update() {
      var text = input.value || sample;
      rows.forEach(function (r) { r.out.textContent = r.style.fn(text); });
      if (count && limit) {
        var n = Array.from(input.value).length;
        count.textContent = n + ' / ' + limit;
        count.classList.toggle('is-over', n > limit);
      }
    }

    input.addEventListener('input', update);
    if (clear) clear.addEventListener('click', function () { input.value = ''; update(); input.focus(); });
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(typeof window !== 'undefined' ? window : globalThis);
