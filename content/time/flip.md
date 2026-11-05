---
title: "นาฬิกาพลิกออนไลน์"
seoTitle: "นาฬิกาพลิกออนไลน์ ฟรี"
h1: "นาฬิกาพลิกออนไลน์"
description: "นาฬิกาพลิกออนไลน์ฟรี การ์ดพลิกสมจริง แสดงวินาที เต็มหน้าจอ โหมดมืด วันที่ และเวลา 12/24 ชั่วโมง ซิงค์เวลากับเซิร์ฟเวอร์ ใช้ได้ทั้งมือถือและคอมพิวเตอร์"
icon: "🕒"
category: "time"
weight: 5
byline: true
date: 2026-11-05
lastmod: 2026-11-05
draft: false
---

<style>
.fc-wrap{--fc-bg:#f3f4f6;--fc-card:#fff;--fc-ink:#111827;--fc-bd:#d1d5db;--fc-mute:#6b7280;container-type:inline-size;box-sizing:border-box;width:100%;margin:1rem 0 1.5rem;padding:1.5rem .8rem 1rem;border-radius:.9rem;background:var(--fc-bg);color:var(--fc-ink);text-align:center}
.fc-wrap.fc-dark{--fc-bg:#000;--fc-card:#1f2125;--fc-ink:#f3f4f6;--fc-bd:#3a3d44;--fc-mute:#9ca3af}
.fc-wrap *{box-sizing:border-box}
.fc-wrap .fc-clock{display:flex;align-items:center;justify-content:center;gap:.12em;font-size:clamp(2.4rem,14vw,8rem);line-height:1;user-select:none}
@supports (width:1cqw){.fc-wrap .fc-clock{font-size:min(17cqw,9rem)}.fc-wrap.fc-nosec .fc-clock{font-size:min(26cqw,13rem)}}
.fc-wrap .fc-card{position:relative;width:1.5em;height:1.4em;perspective:8em;font-weight:700;font-variant-numeric:tabular-nums;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.fc-wrap .fc-half{position:absolute;left:0;right:0;height:50%;overflow:hidden;background:var(--fc-card);color:var(--fc-ink);box-shadow:0 0 0 1px var(--fc-bd)}
.fc-wrap .fc-half span{display:block;height:1.4em;line-height:1.4em;text-align:center}
.fc-wrap .fc-top,.fc-wrap .fc-fold{top:0;border-radius:.12em .12em 0 0}
.fc-wrap .fc-bottom,.fc-wrap .fc-unfold{top:50%;border-radius:0 0 .12em .12em}
.fc-wrap .fc-bottom span,.fc-wrap .fc-unfold span{margin-top:-.7em}
.fc-wrap .fc-fold,.fc-wrap .fc-unfold{display:none;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.fc-wrap .fc-fold{transform-origin:50% 100%}
.fc-wrap .fc-unfold{transform-origin:50% 0;transform:rotateX(90deg)}
.fc-wrap .fc-card::after{content:"";position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;background:var(--fc-bg);z-index:5}
.fc-wrap .fc-go .fc-fold{display:block;z-index:3;animation:fc-fold .3s ease-in forwards}
.fc-wrap .fc-go .fc-unfold{display:block;z-index:4;animation:fc-unfold .3s ease-out .3s both}
@keyframes fc-fold{from{transform:rotateX(0)}to{transform:rotateX(-90deg)}}
@keyframes fc-unfold{from{transform:rotateX(90deg)}to{transform:rotateX(0)}}
.fc-wrap .fc-sep{width:.2em;font-size:.8em;font-weight:700;color:var(--fc-mute);text-align:center}
.fc-wrap.fc-nosec .fc-card-s,.fc-wrap.fc-nosec .fc-sep-2{display:none}
.fc-wrap .fc-ampm,.fc-wrap .fc-date{min-height:1.4em;margin:.2rem 0;font-size:1rem;color:var(--fc-mute)}
.fc-wrap .fc-ampm{margin-bottom:.6rem}
.fc-wrap .fc-date{margin-top:1rem;color:var(--fc-ink)}
.fc-wrap .fc-prog{display:none;width:min(60%,22rem);height:4px;margin:1rem auto 0;border-radius:4px;background:var(--fc-bd);overflow:hidden}
.fc-wrap.fc-nosec .fc-prog{display:block}
.fc-wrap .fc-prog i{display:block;width:0;height:100%;background:var(--fc-ink);transition:width 1s linear}
.fc-wrap .fc-ctrl{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:1.2rem}
.fc-wrap .fc-btn{font:inherit;font-size:.9rem;line-height:1.2;margin:0;padding:.45rem .85rem;border:1px solid var(--fc-bd);border-radius:999px;background:transparent;color:var(--fc-ink);cursor:pointer}
.fc-wrap .fc-btn:hover{border-color:var(--fc-ink)}
.fc-wrap .fc-btn[aria-pressed="true"]{background:var(--fc-ink);border-color:var(--fc-ink);color:var(--fc-bg)}
.fc-wrap .fc-exit{display:none;position:absolute;top:.8rem;right:.8rem;z-index:10;width:2.4rem;height:2.4rem;padding:0;border-radius:50%;font-size:1.1rem}
.fc-wrap.fc-full{position:fixed;inset:0;z-index:9999;width:100vw;height:100vh;height:100dvh;margin:0;border-radius:0;display:flex;flex-direction:column;justify-content:center;align-items:center;container-type:normal}
.fc-wrap.fc-full .fc-clock{font-size:min(17vw,40vh)}
.fc-wrap.fc-full.fc-nosec .fc-clock{font-size:min(26vw,55vh)}
.fc-wrap.fc-full .fc-ctrl{display:none}
.fc-wrap.fc-full .fc-exit{display:block;opacity:.45}
.fc-wrap.fc-full .fc-exit:hover{opacity:1}
.fc-wrap.fc-full .fc-date{font-size:min(4vw,4vh)}
@media (prefers-reduced-motion:reduce){.fc-wrap .fc-fold,.fc-wrap .fc-unfold{display:none!important}.fc-wrap .fc-prog i{transition:none}}
</style>

<div class="fc-wrap" id="fc-root">
<div class="fc-ampm" id="fc-ampm"></div>
<div class="fc-clock" id="fc-clock" role="timer" aria-label="นาฬิกาพลิก"></div>
<div class="fc-prog" id="fc-prog"><i id="fc-progbar"></i></div>
<div class="fc-date" id="fc-date"></div>
<div class="fc-ctrl">
<button type="button" class="fc-btn" id="fc-b-sec" aria-pressed="true">วินาที (S)</button>
<button type="button" class="fc-btn" id="fc-b-full" aria-pressed="false">เต็มหน้าจอ (F)</button>
<button type="button" class="fc-btn" id="fc-b-dark" aria-pressed="false">โหมดมืด (T)</button>
<button type="button" class="fc-btn" id="fc-b-date" aria-pressed="false">วันที่ (D)</button>
<button type="button" class="fc-btn" id="fc-b-h24" aria-pressed="true">24 ชม. (H)</button>
</div>
<button type="button" class="fc-btn fc-exit" id="fc-exit" aria-label="ออกจากโหมดเต็มหน้าจอ">✕</button>
</div>

<script>
(function () {
  'use strict';
  var wrap = document.getElementById('fc-root');
  if (!wrap) { return; }
  var KEY = 'fc_flip_settings';
  var S = { sec: true, dark: false, date: false, h24: true };

  try {
    var hr = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions();
    S.h24 = !hr.hour12;
  } catch (e) {}
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') {
      ['sec', 'dark', 'date', 'h24'].forEach(function (k) {
        if (typeof saved[k] === 'boolean') { S[k] = saved[k]; }
      });
    }
  } catch (e) {}
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---- cards ---- */
  var clock = document.getElementById('fc-clock');
  function cardHtml(cls) {
    return '<div class="fc-card ' + cls + '">' +
      '<div class="fc-half fc-top"><span></span></div>' +
      '<div class="fc-half fc-bottom"><span></span></div>' +
      '<div class="fc-half fc-fold"><span></span></div>' +
      '<div class="fc-half fc-unfold"><span></span></div></div>';
  }
  clock.innerHTML = cardHtml('fc-card-h') + '<div class="fc-sep">:</div>' +
    cardHtml('fc-card-m') + '<div class="fc-sep fc-sep-2">:</div>' + cardHtml('fc-card-s');

  function makeCard(el) {
    var c = { el: el, val: null, timer: null };
    c.top = el.querySelector('.fc-top span');
    c.bottom = el.querySelector('.fc-bottom span');
    c.fold = el.querySelector('.fc-fold span');
    c.unfold = el.querySelector('.fc-unfold span');
    return c;
  }
  var cards = {
    h: makeCard(clock.querySelector('.fc-card-h')),
    m: makeCard(clock.querySelector('.fc-card-m')),
    s: makeCard(clock.querySelector('.fc-card-s'))
  };
  function setCard(c, v, animate) {
    if (c.val === v) { return; }
    var old = c.val;
    c.val = v;
    clearTimeout(c.timer);
    c.el.classList.remove('fc-go');
    if (!animate || old === null || reduce) {
      c.top.textContent = v; c.bottom.textContent = v;
      c.fold.textContent = v; c.unfold.textContent = v;
      return;
    }
    c.top.textContent = v;
    c.unfold.textContent = v;
    c.fold.textContent = old;
    c.bottom.textContent = old;
    void c.el.offsetWidth;
    c.el.classList.add('fc-go');
    c.timer = setTimeout(function () {
      c.bottom.textContent = v;
      c.el.classList.remove('fc-go');
    }, 600);
  }

  /* ---- time sync (reads the Date header of this site's own server) ---- */
  var offset = 0;
  function nowMs() { return Date.now() + offset; }
  function sync() {
    if (!window.fetch) { return; }
    var t0 = Date.now();
    fetch(location.pathname + '?fc=' + t0, { method: 'HEAD', cache: 'no-store' })
      .then(function (r) {
        var t1 = Date.now();
        var d = r.headers.get('Date');
        if (!d) { return; }
        var srv = new Date(d).getTime();
        if (isNaN(srv)) { return; }
        var est = srv + 500 + (t1 - t0) / 2;
        var off = est - t1;
        if (Math.abs(off) < 86400000) { offset = off; }
      })
      .catch(function () {});
  }

  /* ---- render ---- */
  var elAmpm = document.getElementById('fc-ampm');
  var elDate = document.getElementById('fc-date');
  var bar = document.getElementById('fc-progbar');
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var lastRender = 0;
  function render(forceNoAnim) {
    var n = nowMs();
    var d = new Date(n);
    var animate = !forceNoAnim && !document.hidden && (n - lastRender) < 2500;
    lastRender = n;
    var h = d.getHours();
    var label = '';
    if (!S.h24) {
      label = h < 12 ? 'ก่อนเที่ยง' : 'หลังเที่ยง';
      h = h % 12 || 12;
    }
    var s = d.getSeconds();
    setCard(cards.h, pad(h), animate);
    setCard(cards.m, pad(d.getMinutes()), animate);
    if (S.sec) { setCard(cards.s, pad(s), animate); }
    elAmpm.textContent = label;
    if (S.date) {
      try {
        elDate.textContent = d.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) {
        elDate.textContent = d.toDateString();
      }
    } else {
      elDate.textContent = '';
    }
    if (!S.sec) {
      if (s === 0) {
        bar.style.transition = 'none';
        bar.style.width = '0%';
        void bar.offsetWidth;
        bar.style.transition = '';
      }
      bar.style.width = ((s + 1) * 100 / 60) + '%';
    }
  }
  var tickTimer = null;
  function tick() {
    render(false);
    var ms = nowMs() % 1000;
    tickTimer = setTimeout(tick, 1000 - ms + 5);
  }

  /* ---- controls ---- */
  var bSec = document.getElementById('fc-b-sec');
  var bFull = document.getElementById('fc-b-full');
  var bDark = document.getElementById('fc-b-dark');
  var bDate = document.getElementById('fc-b-date');
  var bH24 = document.getElementById('fc-b-h24');
  function applyUi() {
    wrap.classList.toggle('fc-dark', S.dark);
    wrap.classList.toggle('fc-nosec', !S.sec);
    bSec.setAttribute('aria-pressed', String(S.sec));
    bDark.setAttribute('aria-pressed', String(S.dark));
    bDate.setAttribute('aria-pressed', String(S.date));
    bH24.setAttribute('aria-pressed', String(S.h24));
    bH24.textContent = S.h24 ? '24 ชม. (H)' : '12 ชม. (H)';
  }
  function toggle(k) {
    S[k] = !S[k];
    if (k === 'sec' && S.sec) { cards.s.val = null; }
    applyUi();
    save();
    render(true);
  }

  var lock = null;
  function wake(on) {
    try {
      if (on && navigator.wakeLock) {
        navigator.wakeLock.request('screen').then(function (l) {
          lock = l;
          l.addEventListener('release', function () { lock = null; });
        }).catch(function () {});
      } else if (!on && lock) {
        lock.release();
        lock = null;
      }
    } catch (e) {}
  }
  function setFull(on) {
    wrap.classList.toggle('fc-full', on);
    document.documentElement.style.overflow = on ? 'hidden' : '';
    bFull.setAttribute('aria-pressed', String(on));
    wake(on);
    render(true);
  }
  function fsElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }
  function toggleFull() {
    if (wrap.classList.contains('fc-full')) {
      if (fsElement()) {
        var ex = document.exitFullscreen || document.webkitExitFullscreen;
        if (ex) { ex.call(document); }
      } else {
        setFull(false);
      }
      return;
    }
    var rq = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
    if (rq) {
      var p;
      try { p = rq.call(wrap); } catch (e) { setFull(true); return; }
      if (p && p.catch) { p.catch(function () { setFull(true); }); }
    } else {
      setFull(true);
    }
  }
  function onFsChange() { setFull(!!fsElement()); }
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);

  bSec.addEventListener('click', function () { toggle('sec'); });
  bDark.addEventListener('click', function () { toggle('dark'); });
  bDate.addEventListener('click', function () { toggle('date'); });
  bH24.addEventListener('click', function () { toggle('h24'); });
  bFull.addEventListener('click', toggleFull);
  document.getElementById('fc-exit').addEventListener('click', toggleFull);

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) { return; }
    var k = (e.key || '').toLowerCase();
    if (k === 's') { toggle('sec'); }
    else if (k === 'f') { toggleFull(); }
    else if (k === 't') { toggle('dark'); }
    else if (k === 'd') { toggle('date'); }
    else if (k === 'h') { toggle('h24'); }
    else if (k === 'escape' && wrap.classList.contains('fc-full') && !fsElement()) { setFull(false); }
  });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      sync();
      if (wrap.classList.contains('fc-full')) { wake(true); }
      render(true);
    }
  });

  applyUi();
  render(true);
  sync();
  setInterval(sync, 120000);
  tick();
})();
</script>

## วิธีใช้งานนาฬิกาพลิกออนไลน์

1. **เปิดหน้านี้แล้วดูเวลาได้ทันที** นาฬิกาจะเริ่มเดินเองโดยไม่ต้องกดปุ่มใด ๆ การ์ดซ้าย กลาง ขวา คือ ชั่วโมง นาที และวินาที ตามลำดับ
2. **แสดงหรือซ่อนวินาที** กดปุ่ม "วินาที" หรือกดแป้น `S` เมื่อซ่อนวินาที การ์ดชั่วโมงและนาทีจะขยายใหญ่ขึ้น และมีแถบบาง ๆ ใต้นาฬิกาค่อย ๆ เต็มจนครบ 1 นาที
3. **เปิดโหมดเต็มหน้าจอ** กดปุ่ม "เต็มหน้าจอ" หรือกดแป้น `F` จะเห็นเฉพาะนาฬิกา ระหว่างนี้หน้าจอจะไม่ดับเอง (ในเบราว์เซอร์ที่รองรับ) กดแป้น `Esc` หรือปุ่ม ✕ มุมขวาบนเพื่อออก
4. **สลับโหมดมืด** กดปุ่ม "โหมดมืด" หรือกดแป้น `T` การ์ดจะเป็นสีเทาเข้มบนพื้นดำ ถนอมสายตาเวลาใช้ในห้องที่แสงน้อย
5. **แสดงวันที่** กดปุ่ม "วันที่" หรือกดแป้น `D` จะแสดงวันในสัปดาห์และวันที่ใต้นาฬิกา
6. **เลือกรูปแบบ 12 หรือ 24 ชั่วโมง** กดปุ่มด้านขวาสุดหรือกดแป้น `H` เมื่อใช้แบบ 12 ชั่วโมง จะมีคำว่า "ก่อนเที่ยง" หรือ "หลังเที่ยง" แสดงเหนือนาฬิกา
7. **ตั้งค่าครั้งเดียวใช้ได้ต่อ** ระบบจำค่าที่คุณเลือกไว้ในเบราว์เซอร์ของคุณเอง เมื่อเปิดหน้านี้อีกครั้งจะได้การตั้งค่าเดิม

**เคล็ดลับ:** บนมือถือให้หมุนเครื่องเป็นแนวนอนและเปิดเต็มหน้าจอ จะได้การ์ดขนาดใหญ่ที่สุด เหมาะวางบนโต๊ะทำงานหรือข้างเตียง

## คำอธิบายศัพท์ที่ควรรู้

- **นาฬิกาพลิก (Flip Clock)** นาฬิกาที่แสดงเวลาบนการ์ดตัวเลข เมื่อเวลาเปลี่ยน การ์ดจะพลิกลงมาเผยตัวเลขใหม่ คล้ายนาฬิกาพลิกแบบกลไกในอดีต
- **การ์ด** แผ่นแสดงตัวเลขหนึ่งชุด นาฬิกานี้มี 3 การ์ด สำหรับชั่วโมง นาที และวินาที
- **วินาที** ตัวเลขที่เปลี่ยนทุก 1 วินาที เมื่อเปิดไว้ การ์ดวินาทีจะพลิกทุกวินาที ปิดได้หากต้องการหน้าจอที่นิ่งและเรียบง่ายกว่า
- **แถบความคืบหน้า** เส้นบาง ๆ ใต้นาฬิกาที่ปรากฏเมื่อซ่อนวินาที แถบจะเต็มพร้อมกับที่การ์ดนาทีพลิก
- **เต็มหน้าจอ (Fullscreen)** โหมดที่ขยายนาฬิกาให้เต็มจอและซ่อนส่วนอื่นของหน้าเว็บ
- **ไม่ให้หน้าจอดับ (Wake Lock)** ความสามารถของเบราว์เซอร์ที่ขอให้อุปกรณ์เปิดหน้าจอค้างไว้ ใช้ในโหมดเต็มหน้าจอ หากเบราว์เซอร์ไม่รองรับ หน้าจออาจดับตามการตั้งค่าของเครื่อง
- **โหมดมืด (Dark Mode)** ชุดสีเข้มที่ลดแสงจ้า เหมาะกับการใช้งานตอนกลางคืน
- **รูปแบบ 24 ชั่วโมง** นับชั่วโมงตั้งแต่ 00 ถึง 23 เช่น 15:30
- **รูปแบบ 12 ชั่วโมง** นับชั่วโมงตั้งแต่ 1 ถึง 12 พร้อมระบุช่วงเวลา เช่น 3:30 หลังเที่ยง
- **ก่อนเที่ยง / หลังเที่ยง (AM / PM)** ตัวบอกช่วงเวลาในรูปแบบ 12 ชั่วโมง ก่อนเที่ยงคือเที่ยงคืนถึงก่อนเที่ยงวัน หลังเที่ยงคือเที่ยงวันถึงก่อนเที่ยงคืน
- **ซิงค์เวลา** นาฬิกาอ่านเวลาจากเซิร์ฟเวอร์ของเว็บนี้ แล้วปรับให้ตรงกัน จึงไม่เพี้ยนตามนาฬิกาของเครื่องที่อาจเดินเร็วหรือช้า ความคลาดเคลื่อนอยู่ในระดับประมาณ 1 วินาที และจะตรวจสอบซ้ำทุก 2 นาที หากเชื่อมต่อไม่ได้จะใช้เวลาของเครื่องแทน
- **ทางลัดแป้นพิมพ์** แป้นที่กดแทนการคลิกปุ่ม ได้แก่ `S` วินาที, `F` เต็มหน้าจอ, `T` โหมดมืด, `D` วันที่ และ `H` สลับ 12/24 ชั่วโมง