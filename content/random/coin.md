---
title: "โยนหัวก้อย"
seoTitle: "โยนหัวก้อย ออนไลน์ ฟรี"
h1: "โยนหัวก้อย"
description: "โยนหัวก้อยออนไลน์ฟรี สุ่มผลหัวหรือก้อยด้วยเหรียญ 3 มิติ โยนได้หลายเหรียญพร้อมกัน ดูสถิติและประวัติผล ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องสมัครสมาชิก"
icon: "🎲"
category: "random"
weight: 12
byline: true
date: 2026-11-05
lastmod: 2026-11-07
draft: false
---

**โยนหัวก้อย** เป็นวิธีง่ายๆ ในการตัดสินใจเมื่อมีสองทางเลือก เหรียญด้านหัวแทนคำว่า "ใช่" ส่วนด้านก้อยแทนคำว่า "ไม่ใช่" โอกาสออกของแต่ละด้านคือ 50% เท่ากัน กดปุ่มด้านล่างเพื่อโยนเหรียญได้ทันที

<style>
.ct-wrap{max-width:560px;margin:1.5rem auto;padding:1.25rem;border:1px solid rgba(128,128,128,.35);border-radius:16px;text-align:center}
.ct-counts{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;align-items:center;margin-bottom:1rem}
.ct-counts button{min-width:2.5rem;padding:.4rem .7rem;border:1px solid rgba(128,128,128,.5);border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.ct-counts button.ct-on{background:#f5b301;border-color:#f5b301;color:#222;font-weight:700}
.ct-coins{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;min-height:120px;margin:1rem 0}
.ct-coin{width:100px;height:100px;perspective:600px}
.ct-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.ct-face{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;color:#5a3d00;border:5px double #b8860b;box-sizing:border-box;background:radial-gradient(circle at 30% 30%,#ffe27a,#f5b301 60%,#c98f00)}
.ct-tail{transform:rotateY(180deg);background:radial-gradient(circle at 30% 30%,#e9edf2,#b9c2cc 60%,#8d98a5);border-color:#6b7683;color:#2f3640}
.ct-go{padding:.7rem 2rem;border:0;border-radius:999px;background:#f5b301;color:#222;font:inherit;font-weight:700;font-size:1.1rem;cursor:pointer}
.ct-go:disabled{opacity:.6;cursor:wait}
.ct-result{min-height:1.8rem;margin:1rem 0 .5rem;font-size:1.25rem;font-weight:700}
.ct-stats{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin:1rem 0}
.ct-stat{flex:1;min-width:110px;padding:.6rem;border:1px solid rgba(128,128,128,.35);border-radius:10px}
.ct-stat b{display:block;font-size:1.4rem}
.ct-stat span{font-size:.85rem;opacity:.75}
.ct-hist{list-style:none;margin:.5rem 0 0;padding:0;max-height:160px;overflow:auto;font-size:.95rem;text-align:left}
.ct-hist li{padding:.25rem .5rem;border-bottom:1px solid rgba(128,128,128,.2)}
.ct-reset{margin-top:.75rem;padding:.35rem .9rem;border:1px solid rgba(128,128,128,.5);border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
</style>
<div class="ct-wrap" id="ct-app">
  <div class="ct-counts" id="ct-counts">
    <span>จำนวนเหรียญ:</span>
    <button type="button" data-n="1" class="ct-on">1</button>
    <button type="button" data-n="2">2</button>
    <button type="button" data-n="3">3</button>
    <button type="button" data-n="5">5</button>
    <button type="button" data-n="10">10</button>
  </div>
  <div class="ct-coins" id="ct-coins"></div>
  <button type="button" class="ct-go" id="ct-go">โยนเหรียญ</button>
  <div class="ct-result" id="ct-result" aria-live="polite"></div>
  <div class="ct-stats">
    <div class="ct-stat"><b id="ct-h">0</b><span>หัว <i id="ct-hp">0%</i></span></div>
    <div class="ct-stat"><b id="ct-t">0</b><span>ก้อย <i id="ct-tp">0%</i></span></div>
    <div class="ct-stat"><b id="ct-all">0</b><span>ทั้งหมด</span></div>
  </div>
  <ul class="ct-hist" id="ct-hist"></ul>
  <button type="button" class="ct-reset" id="ct-reset">รีเซ็ตสถิติ</button>
</div>
<script>
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
</script>

## วิธีใช้งานโยนหัวก้อย

1. เลือก **จำนวนเหรียญ** ที่ต้องการโยน (1, 2, 3, 5 หรือ 10 เหรียญ)
2. กดปุ่ม **โยนเหรียญ** แล้วรอให้เหรียญหมุนจนหยุด
3. ดูผลลัพธ์ที่แสดงใต้ปุ่ม ถ้าโยนหลายเหรียญ จะสรุปจำนวนหัวและก้อยให้
4. ดู **สถิติ** และ **ประวัติ** ด้านล่างเพื่อเทียบผลแต่ละครั้ง
5. กด **รีเซ็ตสถิติ** เมื่อต้องการเริ่มนับใหม่

## คำศัพท์ที่ควรรู้

- **หัว (Heads)**: ด้านที่มีรูปศีรษะบนเหรียญ ในการตัดสินใจมักแทนคำตอบ "ใช่"
- **ก้อย (Tails)**: ด้านหลังของเหรียญ มักแทนคำตอบ "ไม่ใช่"
- **โยนเหรียญ (Coin flip)**: การสุ่มผลลัพธ์สองแบบเพื่อใช้ตัดสินใจอย่างยุติธรรม
- **ความน่าจะเป็น 50%**: โอกาสที่เหรียญจะออกหัวหรือก้อยเท่ากันในแต่ละครั้ง และไม่ขึ้นกับผลครั้งก่อน
- **จำนวนเหรียญ**: จำนวนเหรียญที่โยนพร้อมกันในหนึ่งครั้ง แต่ละเหรียญสุ่มผลแยกกัน
- **สถิติ**: จำนวนครั้งที่ออกหัว ออกก้อย และจำนวนเหรียญที่โยนทั้งหมดนับจากการรีเซ็ตล่าสุด
- **เปอร์เซ็นต์**: สัดส่วนของหัวและก้อยเทียบกับจำนวนทั้งหมด ยิ่งโยนมาก ค่ายิ่งใกล้ 50%
- **ประวัติ**: รายการผลการโยน 20 ครั้งล่าสุด เรียงจากใหม่ไปเก่า
- **การสุ่มแบบเข้ารหัส (crypto.getRandomValues)**: ฟังก์ชันสุ่มของเบราว์เซอร์ที่คาดเดายากกว่า Math.random จึงให้ผลที่ยุติธรรมกว่า
- **แอนิเมชัน 3 มิติ**: ภาพเหรียญหมุนเหมือนการโยนจริง เปิดโหมดลดการเคลื่อนไหวในระบบ แอนิเมชันจะถูกปิดให้อัตโนมัติ
- **รีเซ็ต**: ล้างสถิติและประวัติทั้งหมดกลับเป็นศูนย์