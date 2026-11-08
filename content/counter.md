---
title: "เครื่องนับจำนวน"
seoTitle: "เครื่องนับจำนวน ออนไลน์ ฟรี"
h1: "เครื่องนับจำนวน"
description: "เครื่องนับจำนวนออนไลน์ ใช้ฟรี กดบวกลบหรือใช้คีย์บอร์ดนับคน คะแนน สิ่งของได้ทันที ตั้งชื่อได้ บันทึกอัตโนมัติ ใช้ได้ทั้งมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้ง"
icon: "🎲"
category: "random"
weight: 18
byline: true
date: 2026-11-05
lastmod: 2026-11-08
draft: false
---
<div class="cnt-wrap" id="cnt-app">
<div class="cnt-modebar" role="tablist">
<button type="button" id="cnt-tab-single" class="cnt-tab" role="tab">นับเดี่ยว</button>
<button type="button" id="cnt-tab-list" class="cnt-tab" role="tab">แบบรายการ</button>
</div>
<div id="cnt-single">
<input type="text" id="cnt-name" class="cnt-name" maxlength="40" aria-label="ชื่อตัวนับ">
<input type="text" id="cnt-value" class="cnt-display" inputmode="numeric" autocomplete="off" aria-label="ตัวเลขที่นับ">
<div class="cnt-buttons">
<button type="button" id="cnt-minus" class="cnt-btn" aria-label="ลดหนึ่ง">－</button>
<button type="button" id="cnt-plus" class="cnt-btn cnt-btn-main" aria-label="เพิ่มหนึ่ง">＋</button>
</div>
</div>
<div id="cnt-list" hidden>
<div id="cnt-items"></div>
<button type="button" id="cnt-add" class="cnt-small">＋ เพิ่มตัวนับ</button>
</div>
<div class="cnt-foot">
<button type="button" id="cnt-reset" class="cnt-small">รีเซ็ตเป็น 0</button>
<label class="cnt-check"><input type="checkbox" id="cnt-wake"> เปิดหน้าจอต่อเนื่อง</label>
</div>
</div>
<style>
.cnt-wrap{max-width:560px;margin:1.5rem auto;padding:1.25rem;border:1px solid rgba(128,128,128,.35);border-radius:16px;text-align:center}
.cnt-wrap [hidden]{display:none !important}
.cnt-wrap button,.cnt-wrap input{font-family:inherit;color:inherit}
.cnt-modebar{display:flex;gap:.5rem;justify-content:center;margin-bottom:1rem}
.cnt-tab{padding:.4rem 1rem;border:1px solid rgba(128,128,128,.4);border-radius:999px;background:transparent;cursor:pointer;font-size:.95rem}
.cnt-tab.cnt-active{background:#2563eb;border-color:#2563eb;color:#fff}
.cnt-name{width:100%;box-sizing:border-box;text-align:center;font-size:1.2rem;padding:.4rem;border:1px dashed rgba(128,128,128,.4);border-radius:8px;background:transparent}
.cnt-display{width:100%;box-sizing:border-box;text-align:center;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;font-size:clamp(3rem,16vw,5.5rem);letter-spacing:.05em;padding:.4rem 0;margin:.5rem 0;border:0;border-radius:8px;background:rgba(128,128,128,.1)}
.cnt-buttons{display:flex;gap:1rem;justify-content:center;margin:.5rem 0 1rem}
.cnt-btn{width:96px;height:96px;border-radius:50%;border:2px solid rgba(128,128,128,.45);background:rgba(128,128,128,.12);font-size:2.4rem;line-height:1;cursor:pointer;touch-action:manipulation;user-select:none}
.cnt-btn:active{transform:scale(.94)}
.cnt-btn-main{width:132px;height:132px;background:#2563eb;border-color:#2563eb;color:#fff;font-size:3rem}
.cnt-small{padding:.4rem .9rem;border:1px solid rgba(128,128,128,.4);border-radius:8px;background:transparent;cursor:pointer;font-size:.95rem}
.cnt-foot{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;align-items:center;margin-top:1rem}
.cnt-check{display:flex;align-items:center;gap:.4rem;font-size:.95rem;cursor:pointer}
.cnt-row{display:flex;align-items:center;gap:.4rem;margin-bottom:.6rem}
.cnt-row input.cnt-rname{flex:1;min-width:0;padding:.4rem;border:1px solid rgba(128,128,128,.35);border-radius:8px;background:transparent;font-size:1rem}
.cnt-row input.cnt-rval{width:5.5rem;text-align:center;padding:.4rem;border:1px solid rgba(128,128,128,.35);border-radius:8px;background:transparent;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:1.1rem;font-weight:700}
.cnt-row button{width:2.4rem;height:2.4rem;border:1px solid rgba(128,128,128,.4);border-radius:8px;background:rgba(128,128,128,.12);cursor:pointer;font-size:1.2rem;line-height:1}
.cnt-row button.cnt-rplus{background:#2563eb;border-color:#2563eb;color:#fff}
</style>
<script>
(function () {
  var KEY = 'cnt-state-v1';
  var MIN = -99999;
  var MAX = 999999;
  var DEFAULT_NAME = 'เครื่องนับจำนวน';
  var state = { mode: 'single', wake: true, counters: [{ name: DEFAULT_NAME, value: 0 }] };
  var lock = null;
  function clamp(v) {
    if (v > MAX) { v = MAX; }
    if (MIN > v) { v = MIN; }
    return v;
  }
  function fmt(n) {
    var s = String(Math.abs(n));
    while (s.length !== 4 && 4 > s.length) { s = '0' + s; }
    return (0 > n ? '-' : '') + s;
  }
  function parse(text) {
    var n = parseInt(String(text).replace(/[^0-9-]/g, ''), 10);
    return isNaN(n) ? null : clamp(n);
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) { return; }
      var p = JSON.parse(raw);
      if (p && Array.isArray(p.counters) && p.counters.length > 0) {
        state.mode = p.mode === 'list' ? 'list' : 'single';
        state.wake = p.wake !== false;
        state.counters = p.counters.map(function (c) {
          return { name: String((c && c.name) || '').slice(0, 40), value: clamp(parseInt(c && c.value, 10) || 0) };
        });
      }
    } catch (e) {}
  }
  function keepAwake() {
    if (!state.wake || lock || !('wakeLock' in navigator)) { return; }
    try {
      navigator.wakeLock.request('screen').then(function (l) {
        lock = l;
        l.addEventListener('release', function () { lock = null; });
      }).catch(function () {});
    } catch (e) {}
  }
  function releaseAwake() {
    if (lock) { try { lock.release(); } catch (e) {} lock = null; }
  }
  var $ = function (id) { return document.getElementById(id); };
  var nameEl = $('cnt-name');
  var valEl = $('cnt-value');
  var singleBox = $('cnt-single');
  var listBox = $('cnt-list');
  var itemsBox = $('cnt-items');
  var tabSingle = $('cnt-tab-single');
  var tabList = $('cnt-tab-list');
  var wakeEl = $('cnt-wake');
  function change(i, d) {
    var c = state.counters[i];
    if (!c) { return; }
    c.value = clamp(c.value + d);
    save();
    render(false);
    keepAwake();
  }
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text) { e.textContent = text; }
    return e;
  }
  function buildList() {
    itemsBox.textContent = '';
    state.counters.forEach(function (c, i) {
      var row = mk('div', 'cnt-row');
      var nm = mk('input', 'cnt-rname');
      nm.type = 'text';
      nm.maxLength = 40;
      nm.value = c.name;
      nm.setAttribute('aria-label', 'ชื่อตัวนับ');
      nm.addEventListener('input', function () { c.name = nm.value; save(); });
      var minus = mk('button', '', '－');
      minus.type = 'button';
      minus.setAttribute('aria-label', 'ลดหนึ่ง');
      minus.addEventListener('click', function () { change(i, -1); });
      var val = mk('input', 'cnt-rval');
      val.type = 'text';
      val.setAttribute('inputmode', 'numeric');
      val.value = fmt(c.value);
      val.setAttribute('aria-label', 'ตัวเลขที่นับ');
      val.addEventListener('focus', function () { val.select(); });
      val.addEventListener('change', function () {
        var n = parse(val.value);
        if (n !== null) { c.value = n; }
        val.value = fmt(c.value);
        save();
      });
      var plus = mk('button', 'cnt-rplus', '＋');
      plus.type = 'button';
      plus.setAttribute('aria-label', 'เพิ่มหนึ่ง');
      plus.addEventListener('click', function () { change(i, 1); });
      row.appendChild(nm);
      row.appendChild(minus);
      row.appendChild(val);
      row.appendChild(plus);
      if (state.counters.length > 1) {
        var del = mk('button', '', '×');
        del.type = 'button';
        del.setAttribute('aria-label', 'ลบตัวนับนี้');
        del.addEventListener('click', function () {
          state.counters.splice(i, 1);
          save();
          render(true);
        });
        row.appendChild(del);
      }
      itemsBox.appendChild(row);
    });
  }
  function render(rebuild) {
    var isList = state.mode === 'list';
    singleBox.hidden = isList;
    listBox.hidden = !isList;
    tabSingle.className = 'cnt-tab' + (isList ? '' : ' cnt-active');
    tabList.className = 'cnt-tab' + (isList ? ' cnt-active' : '');
    tabSingle.setAttribute('aria-selected', String(!isList));
    tabList.setAttribute('aria-selected', String(isList));
    $('cnt-reset').textContent = isList ? 'รีเซ็ตทั้งหมดเป็น 0' : 'รีเซ็ตเป็น 0';
    wakeEl.checked = state.wake;
    if (isList) {
      if (rebuild) { buildList(); } else {
        var vals = itemsBox.querySelectorAll('input.cnt-rval');
        state.counters.forEach(function (c, i) { if (vals[i]) { vals[i].value = fmt(c.value); } });
      }
    } else {
      var c0 = state.counters[0];
      if (document.activeElement !== nameEl) { nameEl.value = c0.name; }
      if (document.activeElement !== valEl) { valEl.value = fmt(c0.value); }
    }
  }
  function setMode(m) {
    state.mode = m;
    save();
    render(true);
  }
  load();
  render(true);
  tabSingle.addEventListener('click', function () { setMode('single'); });
  tabList.addEventListener('click', function () { setMode('list'); });
  $('cnt-plus').addEventListener('click', function () { change(0, 1); });
  $('cnt-minus').addEventListener('click', function () { change(0, -1); });
  nameEl.addEventListener('input', function () {
    state.counters[0].name = nameEl.value;
    save();
  });
  valEl.addEventListener('focus', function () { valEl.select(); });
  valEl.addEventListener('change', function () {
    var n = parse(valEl.value);
    if (n !== null) { state.counters[0].value = n; }
    valEl.value = fmt(state.counters[0].value);
    save();
  });
  valEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { valEl.blur(); }
  });
  $('cnt-add').addEventListener('click', function () {
    state.counters.push({ name: 'ตัวนับ ' + (state.counters.length + 1), value: 0 });
    save();
    render(true);
  });
  $('cnt-reset').addEventListener('click', function () {
    if (state.mode === 'list') {
      state.counters.forEach(function (c) { c.value = 0; });
    } else {
      state.counters[0].value = 0;
    }
    save();
    render(true);
  });
  wakeEl.addEventListener('change', function () {
    state.wake = wakeEl.checked;
    save();
    if (state.wake) { keepAwake(); } else { releaseAwake(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') { keepAwake(); }
  });
  document.addEventListener('keydown', function (e) {
    if (state.mode !== 'single') { return; }
    var t = e.target;
    var tag = t && t.tagName ? t.tagName.toUpperCase() : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { return; }
    if (tag === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) { return; }
    if (e.ctrlKey || e.metaKey || e.altKey) { return; }
    if (e.key === '+' || e.key === '=' || e.key === ' ' || e.key === 'ArrowUp') {
      e.preventDefault();
      change(0, 1);
    } else if (e.key === '-' || e.key === '_' || e.key === 'ArrowDown') {
      e.preventDefault();
      change(0, -1);
    }
  });
})();
</script>

## วิธีใช้งานเครื่องนับจำนวน

1. **เริ่มนับ** กดปุ่ม **＋** สีน้ำเงินเพื่อเพิ่มทีละ 1 ตัวเลขบนหน้าจอจะเปลี่ยนทันที
2. **นับลด** กดปุ่ม **－** หากกดเกินหรือต้องการลดจำนวนลงทีละ 1
3. **ใช้คีย์บอร์ด** บนคอมพิวเตอร์ กด **＋** หรือ **Space** เพื่อเพิ่ม และกด **－** เพื่อลด โดยไม่ต้องใช้เมาส์
4. **ตั้งชื่อ** คลิกที่ช่องชื่อด้านบนตัวเลขแล้วพิมพ์ เช่น "จำนวนผู้เข้าร่วม" หรือ "คะแนนทีมแดง"
5. **ตั้งค่าตัวเลขเอง** คลิกที่ตัวเลขใหญ่ พิมพ์ค่าที่ต้องการ แล้วกด Enter หรือคลิกที่อื่น
6. **นับหลายรายการ** เลือกแท็บ **แบบรายการ** แล้วกด **＋ เพิ่มตัวนับ** เพื่อสร้างตัวนับแยกกันได้หลายตัวในหน้าเดียว
7. **เริ่มใหม่** กด **รีเซ็ตเป็น 0** เพื่อล้างตัวเลขกลับไปเริ่มต้น
8. **ปิดหน้าต่างได้เลย** ข้อมูลถูกบันทึกในเบราว์เซอร์อัตโนมัติ เมื่อกลับมาเปิดอีกครั้งตัวเลขและชื่อจะยังอยู่

## คำอธิบายศัพท์และปุ่มต่าง ๆ

- **ปุ่ม ＋ (เพิ่ม)** เพิ่มค่าตัวนับขึ้นครั้งละ 1
- **ปุ่ม － (ลด)** ลดค่าตัวนับลงครั้งละ 1 ค่าติดลบได้
- **ชื่อตัวนับ** ป้ายกำกับที่ตั้งเองได้ ช่วยให้จำได้ว่ากำลังนับอะไรอยู่
- **ช่องตัวเลข** แสดงค่าปัจจุบันอย่างน้อย 4 หลัก เช่น 0007 และขยายเป็น 5-6 หลักเมื่อค่าเกิน 9999 แก้ไขโดยพิมพ์ได้โดยตรง
- **ช่วงตัวเลข** ใช้ได้ตั้งแต่ -99,999 ถึง 999,999 หากเกินจากนี้ระบบจะหยุดที่ค่าสูงสุดหรือต่ำสุด
- **นับเดี่ยว** โหมดตัวนับตัวเดียว หน้าจอใหญ่ อ่านง่ายจากระยะไกล เหมาะกับการนับคนหรือกดนับต่อเนื่อง
- **แบบรายการ** โหมดตัวนับหลายตัว แต่ละตัวมีชื่อและปุ่มบวกลบของตัวเอง เหมาะกับการเก็บคะแนนหลายทีมหรือนับหลายหมวด
- **เพิ่มตัวนับ / ปุ่ม ×** เพิ่มตัวนับใหม่ในโหมดรายการ หรือลบตัวนับที่ไม่ต้องการออก
- **รีเซ็ต** ตั้งค่าตัวเลขกลับเป็น 0 โดยไม่ลบชื่อตัวนับ
- **เปิดหน้าจอต่อเนื่อง** ขอให้หน้าจออุปกรณ์ไม่ดับระหว่างนับ ทำงานเมื่อเบราว์เซอร์รองรับฟีเจอร์นี้
- **ปุ่มลัดคีย์บอร์ด** ปุ่ม ＋ และ Space เพิ่มค่า ปุ่ม － ลดค่า ใช้ได้ในโหมดนับเดี่ยว
- **บันทึกอัตโนมัติ** ข้อมูลเก็บไว้ในเบราว์เซอร์ของเครื่องคุณเท่านั้น (localStorage) ไม่ถูกส่งไปที่เซิร์ฟเวอร์ และอาจหายหากล้างข้อมูลเบราว์เซอร์

## ใช้เครื่องนับจำนวนทำอะไรได้บ้าง

- นับจำนวนคนเข้างาน ห้องเรียน หรือร้านค้า
- เก็บคะแนนเกม การแข่งขัน หรือกิจกรรมกลุ่ม
- นับรอบการออกกำลังกาย เช่น ซิทอัพ วิดพื้น หรือรอบวิ่ง
- นับสต็อกสินค้า ของที่นับทีละชิ้น หรือจำนวนครั้งที่ทำสิ่งหนึ่งซ้ำ

## คำถามที่พบบ่อย

**ใช้ฟรีไหม ต้องสมัครสมาชิกหรือเปล่า?**
ใช้ฟรีทั้งหมด ไม่ต้องติดตั้งแอปและไม่ต้องสมัครสมาชิก เปิดในเบราว์เซอร์แล้วใช้ได้ทันที

**รีเฟรชหน้าแล้วตัวเลขหายไหม?**
ไม่หาย ตัวเลขและชื่อถูกบันทึกในเบราว์เซอร์ จะหายก็ต่อเมื่อคุณล้างข้อมูลเว็บไซต์หรือใช้โหมดส่วนตัวแล้วปิดหน้าต่าง

**ใช้บนมือถือได้ไหม?**
ได้ ปุ่มมีขนาดใหญ่กดง่าย และเปิดใช้ "เปิดหน้าจอต่อเนื่อง" ได้ เพื่อไม่ให้หน้าจอดับระหว่างนับ