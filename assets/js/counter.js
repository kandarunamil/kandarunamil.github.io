(function (root) {
  'use strict';

  var seg = (typeof Intl !== 'undefined' && Intl.Segmenter) ? new Intl.Segmenter('th', { granularity: 'word' }) : null;

  function analyze(text) {
    var chars = Array.from(text).length;
    var nospace = Array.from(text.replace(/\s/g, '')).length;
    var words = 0;
    if (text.trim()) {
      if (seg) {
        for (var s of seg.segment(text)) if (s.isWordLike) words++;
      } else {
        words = text.trim().split(/\s+/).length;
      }
    }
    var lines = text ? text.split(/\r?\n/).length : 0;
    var paras = text.split(/\n\s*\n/).filter(function (p) { return p.trim(); }).length;
    var bytes = typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(text).length : text.length;
    return { chars: chars, nospace: nospace, words: words, lines: lines, paras: paras, bytes: bytes };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { analyze: analyze };
  if (typeof document === 'undefined') return;

  function init() {
    var input = document.getElementById('cc-input');
    if (!input) return;
    var els = {};
    ['chars', 'nospace', 'words', 'lines', 'paras', 'bytes'].forEach(function (k) { els[k] = document.getElementById('cc-' + k); });
    var limits = Array.prototype.slice.call(document.querySelectorAll('.limit'));

    function update() {
      var r = analyze(input.value);
      Object.keys(els).forEach(function (k) { if (els[k]) els[k].textContent = r[k].toLocaleString('en-US'); });
      limits.forEach(function (li) {
        var max = parseInt(li.getAttribute('data-max'), 10);
        var left = max - r.chars;
        li.querySelector('.limit-num').textContent = r.chars.toLocaleString('en-US') + ' / ' + max.toLocaleString('en-US') + (left < 0 ? ' (เกิน ' + (-left).toLocaleString('en-US') + ')' : '');
        li.querySelector('.bar span').style.width = Math.min(100, (r.chars / max) * 100) + '%';
        li.classList.toggle('is-over', left < 0);
      });
    }
    input.addEventListener('input', update);
    document.getElementById('cc-clear').addEventListener('click', function () { input.value = ''; update(); input.focus(); });
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(typeof window !== 'undefined' ? window : globalThis);
