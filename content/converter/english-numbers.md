---
title: "แปลงตัวเลขเป็นตัวหนังสือ ออนไลน์"
seoTitle: "แปลงตัวเลขเป็นตัวหนังสือ ออนไลน์ ฟรี"
h1: "แปลงตัวเลขเป็นตัวหนังสือ ออนไลน์"
description: "แปลงตัวเลขเป็นตัวหนังสือภาษาอังกฤษออนไลน์ฟรี รองรับทศนิยม ค่าลบ และลูกน้ำ เหมาะกับการเขียนเช็ค ใบเสร็จ และเอกสาร มีปุ่มคัดลอกและเสียงอ่านในเบราว์เซอร์"
icon: "🔤"
category: "text"
weight: 27
byline: true
date: 2026-11-05
lastmod: 2026-11-10
draft: false
---

<style>
.en-num{margin:1.25rem 0;}
.en-num *{box-sizing:border-box;}
.en-num-label{display:block;font-weight:600;margin-bottom:.4rem;}
.en-num-field{display:flex;gap:.5rem;flex-wrap:wrap;}
.en-num-input{flex:1 1 12rem;min-width:0;font:inherit;font-size:1.25rem;padding:.65rem .8rem;border:1px solid rgba(128,128,128,.45);border-radius:.6rem;background:transparent;color:inherit;}
.en-num-input:focus-visible,.en-num-btn:focus-visible{outline:2px solid #3b82f6;outline-offset:2px;}
.en-num-btn{font:inherit;font-size:.95rem;padding:.5rem .85rem;border:1px solid rgba(128,128,128,.45);border-radius:.6rem;background:transparent;color:inherit;cursor:pointer;}
.en-num-btn:hover{background:rgba(128,128,128,.14);}
.en-num-msg{min-height:1.5em;margin:.6rem 0;font-size:.9rem;opacity:.75;}
.en-num-row{display:flex;gap:.75rem;justify-content:space-between;align-items:flex-start;padding:.8rem 0;border-top:1px solid rgba(128,128,128,.28);}
.en-num-row:last-child{border-bottom:1px solid rgba(128,128,128,.28);}
.en-num-info{flex:1 1 auto;min-width:0;}
.en-num-term{font-size:.85rem;opacity:.7;margin-bottom:.15rem;}
.en-num-text{font-size:1.1rem;line-height:1.5;overflow-wrap:anywhere;word-break:break-word;}
.en-num-na{font-size:.95rem;opacity:.6;}
.en-num-actions{display:flex;gap:.4rem;flex-shrink:0;}
.en-num-voice{font-size:.85rem;opacity:.65;margin:.6rem 0 0;}
@media (max-width:560px){.en-num-row{flex-direction:column;}}
</style>

<div class="en-num">
<label class="en-num-label" for="en-num-input">ตัวเลข</label>
<div class="en-num-field">
<input id="en-num-input" class="en-num-input" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="เช่น 1,234.56" value="1234.56">
<button type="button" id="en-num-sign" class="en-num-btn" title="สลับค่าบวก/ลบ" aria-label="สลับค่าบวกหรือค่าลบ">±</button>
<button type="button" id="en-num-clear" class="en-num-btn">ล้าง</button>
</div>
<p id="en-num-msg" class="en-num-msg" aria-live="polite"></p>
<div id="en-num-body"></div>
<p id="en-num-voice" class="en-num-voice"></p>
</div>

<script>
(function () {
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  var SCALES = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
  var ORD_IRREG = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
  var MAX_INT = 66;
  var MAX_DEC = 30;

  function below100(n) {
    if (n < 20) { return ONES[n]; }
    var t = TENS[Math.floor(n / 10)];
    var u = n % 10;
    return u ? t + '-' + ONES[u] : t;
  }

  function below1000(n, brit) {
    var h = Math.floor(n / 100);
    var r = n % 100;
    var out = [];
    if (h) { out.push(ONES[h] + ' hundred'); }
    if (r) {
      if (h && brit) { out.push('and'); }
      out.push(below100(r));
    }
    return out.join(' ');
  }

  function intToWords(str, brit) {
    str = str.replace(/^0+/, '');
    if (str === '') { return 'zero'; }
    var chunks = [];
    var i;
    for (i = str.length; i > 0; i -= 3) {
      chunks.push(parseInt(str.slice(Math.max(0, i - 3), i), 10));
    }
    var parts = [];
    var higher = false;
    for (i = chunks.length - 1; i >= 0; i--) {
      var c = chunks[i];
      if (!c) { continue; }
      var w = below1000(c, brit);
      if (brit && i === 0 && higher && c < 100) { w = 'and ' + w; }
      if (i > 0) { w += ' ' + SCALES[i]; }
      parts.push(w);
      higher = true;
    }
    return parts.join(' ');
  }

  function digitsToWords(s) {
    return s.split('').map(function (d) { return ONES[parseInt(d, 10)]; }).join(' ');
  }

  function toOrdinal(words) {
    var sp = words.split(' ');
    var hy = sp[sp.length - 1].split('-');
    var w = hy[hy.length - 1];
    var o;
    if (ORD_IRREG[w]) { o = ORD_IRREG[w]; }
    else if (/y$/.test(w)) { o = w.slice(0, -1) + 'ieth'; }
    else { o = w + 'th'; }
    hy[hy.length - 1] = o;
    sp[sp.length - 1] = hy.join('-');
    return sp.join(' ');
  }

  function incStr(s) {
    var a = s.split('');
    var i = a.length - 1;
    while (i >= 0) {
      if (a[i] === '9') { a[i] = '0'; i--; }
      else { a[i] = String(parseInt(a[i], 10) + 1); return a.join(''); }
    }
    return '1' + a.join('');
  }

  function toCents(int, dec) {
    var base = int + (dec + '00').slice(0, 2);
    if (dec.charAt(2) && dec.charAt(2) >= '5') { base = incStr(base); }
    while (base.length < 3) { base = '0' + base; }
    return { dollars: base.slice(0, -2).replace(/^0+(?=\d)/, ''), cents: base.slice(-2) };
  }

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function parse(raw) {
    var s = String(raw).replace(/[\s,]/g, '').replace(/[\u2212\u2013\u2014]/g, '-');
    var m = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(s);
    if (s === '' || s === '-' || s === '+' || s === '.' || s === '-.' || s === '+.') { return { state: 'empty' }; }
    if (!m) { return { state: 'invalid' }; }
    var int = (m[2] || '').replace(/^0+(?=\d)/, '');
    if (int === '') { int = '0'; }
    var dec = m[3] || '';
    if (int.length > MAX_INT || dec.length > MAX_DEC) { return { state: 'range' }; }
    var zero = /^0+$/.test(int + dec);
    return { state: 'ok', neg: m[1] === '-' && !zero, int: int, dec: dec };
  }

  function buildRows(p) {
    var us = intToWords(p.int, false);
    var uk = intToWords(p.int, true);
    if (p.dec) {
      us += ' point ' + digitsToWords(p.dec);
      uk += ' point ' + digitsToWords(p.dec);
    }
    var usFull = (p.neg ? 'negative ' : '') + us;
    var ukFull = (p.neg ? 'minus ' : '') + uk;
    var c = toCents(p.int, p.dec);
    var cZero = c.dollars === '0' && c.cents === '00';
    var check = cap((p.neg && !cZero ? 'negative ' : '') + intToWords(c.dollars, false)) + ' and ' + c.cents + '/100';
    var money = intToWords(c.dollars, false) + (c.dollars === '1' ? ' dollar' : ' dollars');
    if (c.cents !== '00') {
      var cn = parseInt(c.cents, 10);
      money += ' and ' + below100(cn) + (cn === 1 ? ' cent' : ' cents');
    }
    money = cap((p.neg && !cZero ? 'negative ' : '') + money);
    var ord = null;
    if (!p.neg && p.dec === '') { ord = toOrdinal(intToWords(p.int, false)); }
    var digits = (p.neg ? 'negative ' : '') + digitsToWords(p.int) + (p.dec ? ' point ' + digitsToWords(p.dec) : '');
    return [
      { term: 'แบบอเมริกัน (American)', text: usFull },
      { term: 'แบบอังกฤษ (British)', text: ukFull },
      { term: 'เขียนเช็ค (Check)', text: check },
      { term: 'สกุลเงินดอลลาร์ (Dollars)', text: money },
      { term: 'เลขลำดับ (Ordinal)', text: ord, na: 'ใช้ได้กับจำนวนเต็มบวกเท่านั้น' },
      { term: 'อ่านทีละหลัก (Digit by digit)', text: digits }
    ];
  }

  function stepValue(raw, dir) {
    if (typeof BigInt === 'undefined') { return raw; }
    var p = parse(raw);
    var base = p.state === 'ok' ? p : { neg: false, int: '0', dec: '' };
    var scale = BigInt(1);
    var i;
    for (i = 0; i !== base.dec.length; i++) { scale = scale * BigInt(10); }
    var v = BigInt(base.int + base.dec);
    if (base.neg) { v = -v; }
    v = dir > 0 ? v + scale : v - scale;
    var neg = v < BigInt(0);
    if (neg) { v = -v; }
    var s = v.toString();
    while (s.length <= base.dec.length) { s = '0' + s; }
    var ip = s.slice(0, s.length - base.dec.length);
    var dp = s.slice(s.length - base.dec.length);
    if (ip.length > MAX_INT) { return raw; }
    return (neg ? '-' : '') + ip + (base.dec.length ? '.' + dp : '');
  }

  /* ---- UI ---- */
  var input = document.getElementById('en-num-input');
  var body = document.getElementById('en-num-body');
  var msg = document.getElementById('en-num-msg');
  var voiceEl = document.getElementById('en-num-voice');
  var btnSign = document.getElementById('en-num-sign');
  var btnClear = document.getElementById('en-num-clear');
  if (!input || !body || !msg) { return; }
  var synth = window.speechSynthesis;
  var voice = null;

  function pickVoice() {
    if (!synth || !voiceEl) { return; }
    var vs = synth.getVoices();
    var i;
    voice = null;
    for (i = 0; i !== vs.length; i++) {
      if (/^en[-_]US/i.test(vs[i].lang)) { voice = vs[i]; break; }
    }
    if (!voice) {
      for (i = 0; i !== vs.length; i++) {
        if (/^en/i.test(vs[i].lang)) { voice = vs[i]; break; }
      }
    }
    voiceEl.textContent = voice ? 'รองรับการออกเสียงด้วย: ' + voice.name : '';
  }

  function fallbackCopy(t) {
    var ta = document.createElement('textarea');
    ta.value = t;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function copyText(t, btn) {
    var label = btn.getAttribute('data-label');
    function done() {
      btn.textContent = 'คัดลอกแล้ว';
      setTimeout(function () { btn.textContent = label; }, 1200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done, function () { fallbackCopy(t); done(); });
    } else {
      fallbackCopy(t);
      done();
    }
  }

  function speak(t) {
    if (!synth) { return; }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(t.replace(/(\d+)\/100$/, '$1 over one hundred'));
    u.lang = voice ? voice.lang : 'en-US';
    if (voice) { u.voice = voice; }
    synth.speak(u);
  }

  function makeBtn(label, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'en-num-btn';
    b.textContent = label;
    b.setAttribute('data-label', label);
    b.addEventListener('click', onClick);
    return b;
  }

  function render() {
    var p = parse(input.value);
    body.textContent = '';
    if (p.state === 'empty') { msg.textContent = 'พิมพ์ตัวเลขเพื่อเริ่มแปลง'; return; }
    if (p.state === 'invalid') { msg.textContent = 'ใส่ได้เฉพาะตัวเลข ลูกน้ำ จุดทศนิยม และเครื่องหมายลบ'; return; }
    if (p.state === 'range') { msg.textContent = 'ไม่อยู่ในขอบเขต (จำนวนเต็มไม่เกิน ' + MAX_INT + ' หลัก ทศนิยมไม่เกิน ' + MAX_DEC + ' หลัก)'; return; }
    msg.textContent = 'กดปุ่มลูกศรขึ้นหรือลงบนคีย์บอร์ดเพื่อปรับตัวเลขทีละ 1';
    buildRows(p).forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'en-num-row';
      var info = document.createElement('div');
      info.className = 'en-num-info';
      var term = document.createElement('div');
      term.className = 'en-num-term';
      term.textContent = r.term;
      var text = document.createElement('div');
      text.className = r.text === null ? 'en-num-na' : 'en-num-text';
      text.textContent = r.text === null ? r.na : r.text;
      info.appendChild(term);
      info.appendChild(text);
      row.appendChild(info);
      if (r.text !== null) {
        var actions = document.createElement('div');
        actions.className = 'en-num-actions';
        var copyBtn = makeBtn('คัดลอก', function () { copyText(r.text, copyBtn); });
        actions.appendChild(copyBtn);
        if (synth) { actions.appendChild(makeBtn('ฟังเสียง', function () { speak(r.text); })); }
        row.appendChild(actions);
      }
      body.appendChild(row);
    });
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      input.value = stepValue(input.value, e.key === 'ArrowUp' ? 1 : -1);
      render();
    }
  });
  if (btnSign) {
    btnSign.addEventListener('click', function () {
      var v = input.value.replace(/\s/g, '');
      input.value = v.charAt(0) === '-' ? v.slice(1) : '-' + v;
      render();
      input.focus();
    });
  }
  if (btnClear) {
    btnClear.addEventListener('click', function () {
      input.value = '';
      render();
      input.focus();
    });
  }
  if (synth) {
    pickVoice();
    if (typeof synth.addEventListener === 'function') { synth.addEventListener('voiceschanged', pickVoice); }
    else { synth.onvoiceschanged = pickVoice; }
  }
  render();
})();
</script>

## วิธีใช้งาน

1. พิมพ์หรือวางตัวเลขในช่องด้านบน วางตัวเลขที่มีลูกน้ำ เช่น 1,234,567 ได้ทันที
2. ผลลัพธ์จะแสดงอัตโนมัติในหลายรูปแบบ ไม่ต้องกดปุ่มแปลง
3. ใส่ทศนิยมด้วยจุด (.) เช่น 12.5 และใส่ค่าลบด้วยเครื่องหมาย - หรือกดปุ่ม ± เพื่อสลับบวกและลบ
4. กดปุ่มลูกศรขึ้นหรือลงบนคีย์บอร์ดเพื่อเพิ่มหรือลดตัวเลขทีละ 1 โดยทศนิยมจะคงเดิม
5. กดปุ่ม "คัดลอก" เพื่อคัดลอกข้อความของแถวนั้นไปยังคลิปบอร์ด
6. กดปุ่ม "ฟังเสียง" เพื่อฟังการออกเสียงภาษาอังกฤษ (ปุ่มนี้แสดงเมื่อเบราว์เซอร์รองรับ)
7. กดปุ่ม "ล้าง" เพื่อเริ่มใหม่

## ความหมายของแต่ละรูปแบบ

- **แบบอเมริกัน (American)** — อ่านตัวเลขตามแบบอเมริกัน ไม่ใส่คำว่า and เช่น one hundred twenty-three
- **แบบอังกฤษ (British)** — อ่านตัวเลขตามแบบอังกฤษ ใส่ and หลัง hundred เช่น one hundred and twenty-three
- **เขียนเช็ค (Check)** — รูปแบบที่ใช้เขียนจำนวนเงินบนเช็คภาษาอังกฤษ เศษแสดงเป็นเศษส่วนของ 100 เช่น One hundred twenty-three and 45/100
- **สกุลเงินดอลลาร์ (Dollars)** — อ่านเป็นจำนวนเงินดอลลาร์และเซนต์ เช่น one hundred twenty-three dollars and forty-five cents
- **เลขลำดับ (Ordinal)** — ตัวเลขที่บอกลำดับที่ เช่น first, second, third ใช้ได้กับจำนวนเต็มบวกเท่านั้น
- **อ่านทีละหลัก (Digit by digit)** — อ่านทีละตัว เหมาะกับรหัส เบอร์โทร หรือเลขที่บัญชี เช่น one two three

## ศัพท์ที่ควรรู้

- **Point** — จุดทศนิยม ตัวเลขหลังจุดอ่านทีละหลัก เช่น 3.14 อ่านว่า three point one four
- **Negative / Minus** — ค่าลบ แบบอเมริกันนิยมใช้ negative ส่วนแบบอังกฤษนิยมใช้ minus
- **Hundred** — ร้อย (100)
- **Thousand** — พัน (1,000)
- **Million** — ล้าน (1,000,000)
- **Billion** — พันล้าน (1,000,000,000)
- **Trillion** — ล้านล้าน (1,000,000,000,000)
- **Cent** — เซนต์ เศษของดอลลาร์ โดย 100 เซนต์เท่ากับ 1 ดอลลาร์
- **เครื่องหมายขีดกลาง (hyphen)** — ใช้เชื่อมเลข 21 ถึง 99 เช่น twenty-one, ninety-nine

## ข้อจำกัดและข้อควรรู้

- รองรับจำนวนเต็มได้สูงสุด 66 หลัก และทศนิยมไม่เกิน 30 หลัก หากเกินจะแสดงว่าไม่อยู่ในขอบเขต
- รูปแบบเขียนเช็คและสกุลเงินจะปัดทศนิยมเป็น 2 ตำแหน่ง
- เสียงอ่านขึ้นอยู่กับเสียงภาษาอังกฤษที่ติดตั้งในอุปกรณ์และเบราว์เซอร์ของคุณ
- การแปลงทำงานในเบราว์เซอร์ทั้งหมด ตัวเลขที่ใส่จะไม่ถูกส่งไปยังเซิร์ฟเวอร์