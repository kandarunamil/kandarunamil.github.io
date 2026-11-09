---
title: "ปลั๊กอินเพจ Facebook แบบลอย"
seoTitle: "ปลั๊กอินเพจ Facebook แบบลอย ออนไลน์ ฟรี"
h1: "ปลั๊กอินเพจ Facebook แบบลอย"
description: "สร้างโค้ดปลั๊กอินเพจ Facebook แบบลอยติดขอบจอ เลือกขนาด สี และตำแหน่งแท็บ ดูตัวอย่างทันที แล้วคัดลอกโค้ดไปวางบน Blogger, WordPress หรือเว็บไซต์ของคุณได้ฟรี"
icon: "👥"
category: "social"
weight: 24
byline: true
date: 2026-11-05
lastmod: 2026-11-09
draft: false
---
วางที่อยู่เพจ Facebook เลือกหน้าตาของแท็บ แล้วคัดลอกโค้ดไปวางในเว็บไซต์ของคุณ แท็บจะลอยอยู่ที่ขอบจอ เมื่อผู้เข้าชมคลิกหรือเลื่อนเมาส์ไปชี้ จะเปิดการ์ดของเพจพร้อมปุ่มติดตาม

<style>
#pili-tool{border:1px solid rgba(127,127,127,.35);border-radius:12px;padding:16px;margin:1.5rem 0;box-sizing:border-box}
#pili-tool .pili-row{margin:0 0 16px}
#pili-tool .pili-lb{display:block;font-weight:700;margin:0 0 6px}
#pili-tool input[type=text],#pili-tool textarea{display:block;width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid rgba(127,127,127,.5);border-radius:8px;background:transparent;color:inherit;font:inherit}
#pili-tool textarea{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.5;resize:vertical}
#pili-tool .pili-opts{display:flex;flex-wrap:wrap;gap:8px 16px}
#pili-tool .pili-opts label{cursor:pointer}
#pili-tool .pili-msg{margin:6px 0 0;min-height:1.2em;font-size:14px}
#pili-tool .pili-msg.ok{color:#0a7d36}
#pili-tool .pili-msg.err{color:#d92d20}
#pili-tool button{margin-top:8px;padding:9px 18px;border:0;border-radius:8px;background:#1877f2;color:#fff;font:inherit;font-weight:600;cursor:pointer}
#pili-tool button:disabled{opacity:.45;cursor:not-allowed}
#pili-tool .pili-hint{margin:0;font-size:14px;opacity:.8}
@media (prefers-color-scheme:dark){#pili-tool .pili-msg.ok{color:#4ade80}#pili-tool .pili-msg.err{color:#f87171}}
</style>
<div id="pili-tool">
  <div class="pili-row">
    <label class="pili-lb" for="pili-url">ที่อยู่เพจ Facebook ของคุณ</label>
    <input id="pili-url" type="text" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://www.facebook.com/yourpage">
    <p id="pili-msg" class="pili-msg" role="status" aria-live="polite"></p>
  </div>
  <div class="pili-row">
    <span class="pili-lb">ขนาด</span>
    <div class="pili-opts">
      <label><input type="radio" name="pili-size" value="standard" checked> มาตรฐาน</label>
      <label><input type="radio" name="pili-size" value="compact"> กะทัดรัด</label>
    </div>
  </div>
  <div class="pili-row">
    <span class="pili-lb">สีแท็บ</span>
    <div class="pili-opts">
      <label><input type="radio" name="pili-color" value="blue" checked> น้ำเงิน</label>
      <label><input type="radio" name="pili-color" value="dark"> เข้ม</label>
    </div>
  </div>
  <div class="pili-row">
    <label class="pili-lb" for="pili-label">ข้อความแท็บ</label>
    <input id="pili-label" type="text" maxlength="20" autocomplete="off" value="Facebook">
  </div>
  <div class="pili-row">
    <span class="pili-lb">ด้านของหน้าจอ</span>
    <div class="pili-opts">
      <label><input type="radio" name="pili-side" value="right" checked> ขวา</label>
      <label><input type="radio" name="pili-side" value="left"> ซ้าย</label>
    </div>
  </div>
  <div class="pili-row">
    <span class="pili-lb">ความสูงของแท็บ</span>
    <div class="pili-opts">
      <label><input type="radio" name="pili-top" value="25"> บน</label>
      <label><input type="radio" name="pili-top" value="50" checked> กลาง</label>
      <label><input type="radio" name="pili-top" value="75"> ล่าง</label>
    </div>
  </div>
  <div class="pili-row">
    <label class="pili-lb" for="pili-code">โค้ดสำหรับเว็บไซต์ของคุณ</label>
    <textarea id="pili-code" readonly rows="8" spellcheck="false"></textarea>
    <button id="pili-copy" type="button" disabled>คัดลอก</button>
  </div>
  <p class="pili-hint">เมื่อวางที่อยู่เพจที่ถูกต้อง แท็บตัวอย่างจะปรากฏที่ขอบหน้านี้ ลองคลิกหรือเลื่อนเมาส์ไปชี้ดูได้เลย</p>
</div>

<script>
(function () {
  'use strict';

  function mount(c) {
    var ID = 'pili-ffb', d = document, S = c.size === 'compact', L = c.side === 'left';
    var bg = c.color === 'dark' ? '#2b2f36' : '#1877f2', w = S ? 280 : 340, h = S ? 70 : 214, o, x;
    x = d.__piliFfb;
    if (x) { d.removeEventListener('click', x.c); d.removeEventListener('keydown', x.k); d.__piliFfb = null; }
    o = d.getElementById(ID); if (o) o.parentNode.removeChild(o);
    o = d.getElementById(ID + '-css'); if (o) o.parentNode.removeChild(o);
    var q = '#' + ID;
    var css = q + '{position:fixed;' + (L ? 'left' : 'right') + ':0;top:' + c.top + '%;transform:translateY(-50%);z-index:2147483000;display:flex;flex-direction:' + (L ? 'row-reverse' : 'row') + ';align-items:center;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}'
      + q + ' .pf-t{display:flex;align-items:center;gap:8px;margin:0;padding:14px 8px;border:0;cursor:pointer;background:' + bg + ';color:#fff;font-family:inherit;font-size:' + (S ? 13 : 14) + 'px;font-weight:600;line-height:1;writing-mode:vertical-rl;border-radius:' + (L ? '0 8px 8px 0' : '8px 0 0 8px') + ';box-shadow:0 2px 8px rgba(0,0,0,.3)}'
      + q + ' .pf-i{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#fff;color:' + bg + ';font-weight:800;font-size:13px;writing-mode:horizontal-tb}'
      + q + ' .pf-c{display:none;box-sizing:border-box;width:' + w + 'px;max-width:calc(100vw - 52px);height:' + h + 'px;background:#fff;box-shadow:0 4px 18px rgba(0,0,0,.3);overflow:hidden}'
      + q + '.pf-o .pf-c{display:block}'
      + q + ' .pf-c iframe{display:block;width:100%;height:100%;border:0}'
      + '@media print{' + q + '{display:none}}';
    var s = d.createElement('style'); s.id = ID + '-css'; s.appendChild(d.createTextNode(css)); d.head.appendChild(s);
    var r = d.createElement('div'); r.id = ID;
    var card = d.createElement('div'); card.className = 'pf-c';
    var b = d.createElement('button'); b.type = 'button'; b.className = 'pf-t'; b.setAttribute('aria-expanded', 'false');
    var i = d.createElement('span'); i.className = 'pf-i'; i.textContent = 'f';
    var t = d.createElement('span'); t.textContent = String(c.label || 'Facebook').slice(0, 20);
    b.appendChild(i); b.appendChild(t); r.appendChild(card); r.appendChild(b);
    (d.body || d.documentElement).appendChild(r);
    var f = null, tm, hov = window.matchMedia ? window.matchMedia('(hover:hover)').matches : false;
    function show(v) {
      if (v) {
        if (!f) {
          f = d.createElement('iframe'); f.title = 'Facebook'; f.setAttribute('scrolling', 'no'); f.setAttribute('allow', 'encrypted-media');
          f.src = 'https://www.facebook.com/plugins/page.php?' + new URLSearchParams({ href: c.href, tabs: '', width: String(w), height: String(h), small_header: S ? 'true' : 'false', adapt_container_width: 'true', hide_cover: S ? 'true' : 'false', show_facepile: 'false' }).toString();
          card.appendChild(f);
        }
      }
      r.className = v ? 'pf-o' : '';
      b.setAttribute('aria-expanded', v ? 'true' : 'false');
    }
    b.onclick = function () { show(hov ? true : r.className !== 'pf-o'); };
    if (hov) {
      r.onmouseenter = function () { clearTimeout(tm); show(true); };
      r.onmouseleave = function () { tm = setTimeout(function () { show(false); }, 300); };
    }
    var oc = function (e) { if (!r.contains(e.target)) show(false); };
    var ok = function (e) { if (e.key === 'Escape') show(false); };
    d.addEventListener('click', oc); d.addEventListener('keydown', ok);
    d.__piliFfb = { c: oc, k: ok };
  }

  function build(c) {
    var json = JSON.stringify(c).replace(/</g, '\\u003c');
    var src = mount.toString().replace(/\s*\n\s*/g, ' ');
    return '<' + 'script>(' + src + ')(' + json + ');</' + 'script>';
  }

  var MSG = {
    ok: 'เรียบร้อย: แท็บที่ขอบหน้าจอจะเปิดเพจของคุณแล้ว',
    invalid: 'ที่อยู่ไม่ถูกต้อง ตรวจสอบอีกครั้ง',
    notfb: 'นี่ไม่ใช่ที่อยู่ของ Facebook ใส่ในรูปแบบ facebook.com/ชื่อเพจ',
    nopage: 'ยังไม่มีชื่อเพจ เพิ่มชื่อเพจต่อท้าย facebook.com/ เช่น facebook.com/yourpage',
    group: 'นี่คือกลุ่ม แสดงได้เฉพาะเพจเท่านั้น',
    share: 'นี่คือลิงก์แชร์ ให้เปิดลิงก์ก่อน แล้วคัดลอกที่อยู่ของเพจ',
    post: 'นี่คือลิงก์โพสต์ ให้เปิดหน้าเพจเอง แล้วคัดลอกที่อยู่ของเพจ'
  };
  var POST_SEG = ['posts', 'photos', 'videos', 'reel', 'reels', 'permalink', 'story'];
  var POST_FIRST = ['photo', 'photo.php', 'watch', 'permalink.php', 'story.php', 'reel', 'reels', 'video.php', 'stories'];
  var SHARE_FIRST = ['share', 'sharer', 'sharer.php', 'l.php'];

  function parse(v) {
    v = v.trim();
    if (!v) return { k: 'empty' };
    var u;
    try { u = new URL(/^[a-z][a-z0-9+.\-]*:\/\//i.test(v) ? v : 'https://' + v); } catch (e) { return { k: 'invalid' }; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return { k: 'invalid' };
    var h = u.hostname.toLowerCase().replace(/^(www|m|web|mbasic|touch)\./, '');
    if (h === 'fb.watch') return { k: 'post' };
    if (h === 'l.facebook.com' || h === 'lm.facebook.com') return { k: 'share' };
    if (h !== 'facebook.com' && h !== 'fb.com' && h !== 'fb.me') return { k: 'notfb' };
    var p = u.pathname.split('/').filter(Boolean);
    if (!p.length) return { k: 'nopage' };
    var first = p[0].toLowerCase();
    if (first === 'groups') return { k: 'group' };
    if (SHARE_FIRST.indexOf(first) > -1) return { k: 'share' };
    if (POST_FIRST.indexOf(first) > -1) return { k: 'post' };
    for (var n = 1; n < p.length; n++) { if (POST_SEG.indexOf(p[n].toLowerCase()) > -1) return { k: 'post' }; }
    if (first === 'profile.php') {
      var id = u.searchParams.get('id');
      if (!id) return { k: 'nopage' };
      return { k: 'ok', href: 'https://www.facebook.com/profile.php?id=' + encodeURIComponent(id) };
    }
    var keep = (first === 'people' || first === 'pages') ? p.slice(0, 3) : p.slice(0, 1);
    return { k: 'ok', href: 'https://www.facebook.com/' + keep.join('/') };
  }

  function $(id) { return document.getElementById(id); }
  function val(name) { return document.querySelector('input[name="' + name + '"]:checked').value; }

  var root = $('pili-tool');
  if (!root) return;
  var url = $('pili-url'), msg = $('pili-msg'), code = $('pili-code'), btn = $('pili-copy'), label = $('pili-label');

  function update() {
    var r = parse(url.value);
    var c = {
      href: r.href || 'https://www.facebook.com/yourpage',
      size: val('pili-size'),
      color: val('pili-color'),
      side: val('pili-side'),
      top: Number(val('pili-top')),
      label: label.value.trim() || 'Facebook'
    };
    var okState = r.k === 'ok';
    msg.textContent = r.k === 'empty' ? '' : MSG[r.k];
    msg.className = 'pili-msg' + (r.k === 'empty' ? '' : (okState ? ' ok' : ' err'));
    if (okState) {
      mount(c);
    } else {
      var old = $('pili-ffb');
      if (old) old.parentNode.removeChild(old);
    }
    code.value = build(c);
    btn.disabled = !okState;
  }

  function fallbackCopy(done) {
    code.focus(); code.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
  }

  btn.onclick = function () {
    var done = function () {
      btn.textContent = 'คัดลอกแล้ว';
      setTimeout(function () { btn.textContent = 'คัดลอก'; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code.value).then(done, function () { fallbackCopy(done); });
    } else {
      fallbackCopy(done);
    }
  };

  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update();
})();
</script>

## วิธีใช้งาน

1. **วางที่อยู่เพจ** เปิดเพจ Facebook ของคุณในเบราว์เซอร์ คัดลอกที่อยู่จากแถบที่อยู่ (เช่น `facebook.com/yourpage`) แล้ววางในช่อง "ที่อยู่เพจ Facebook ของคุณ"
2. **ดูข้อความแจ้งสถานะ** ถ้าที่อยู่ถูกต้องจะขึ้นว่า "เรียบร้อย" ถ้าเป็นลิงก์กลุ่ม ลิงก์แชร์ หรือลิงก์โพสต์ เครื่องมือจะบอกว่าต้องแก้อย่างไร
3. **เลือกหน้าตา** ปรับขนาด สีแท็บ ข้อความบนแท็บ ด้านของหน้าจอ และความสูงของแท็บตามต้องการ
4. **ลองแท็บตัวอย่าง** แท็บจริงจะปรากฏที่ขอบหน้านี้ทันที คลิกหรือเลื่อนเมาส์ไปชี้เพื่อดูการ์ดเพจ
5. **คัดลอกโค้ด** กดปุ่ม "คัดลอก" ใต้ช่อง "โค้ดสำหรับเว็บไซต์ของคุณ"
6. **วางโค้ดในเว็บไซต์** ตามขั้นตอนในหัวข้อ "วางโค้ดที่ไหน" ด้านล่าง แล้วบันทึกหรือเผยแพร่
7. **ทดสอบ** เปิดเว็บไซต์ของคุณแบบรีเฟรชใหม่ (Ctrl+F5 หรือ Cmd+Shift+R) แล้วตรวจว่าแท็บแสดงที่ขอบจอ

## วางโค้ดที่ไหน

### Blogger

1. เปิด [Blogger](https://www.blogger.com/) แล้วเลือกบล็อกของคุณ
2. คลิก **เค้าโครง**
3. ที่แถบด้านข้างหรือส่วนท้าย คลิก **เพิ่มแกดเจ็ต** แล้วเลือก **HTML/JavaScript**
4. วางโค้ดลงในช่อง **เนื้อหา** เว้นช่อง **ชื่อ** ไว้ว่าง แล้วคลิก **บันทึก**

### WordPress

1. ในแดชบอร์ด เปิด **ลักษณะที่ปรากฏ → วิดเจ็ต** ถ้าไม่มีวิดเจ็ต ให้เปิด **ลักษณะที่ปรากฏ → Editor → Patterns → Template Parts → Footer**
2. เพิ่มบล็อก **Custom HTML** แล้ววางโค้ดลงไป
3. คลิก **อัปเดต** หรือ **บันทึก** บน WordPress.com โค้ดนี้ใช้ได้เฉพาะแพ็กเกจที่อนุญาตให้ใช้ปลั๊กอิน แพ็กเกจอื่นอาจลบโค้ดออก

### เว็บไซต์อื่น

1. วางโค้ดลงใน HTML ของเว็บไซต์ ตรงไหนก็ได้ภายในแท็ก `<body>`
2. วางไว้ในส่วนที่ทุกหน้ามีร่วมกัน เช่น ส่วนท้ายเว็บ (footer) แท็บจะแสดงในทุกหน้า
3. ถ้าใช้ Hugo ให้วางในไฟล์ธีม เช่น `layouts/partials/footer.html` ก่อนแท็กปิด `</body>`

## คำอธิบายคำศัพท์

- **ปลั๊กอินเพจ (Page Plugin)** ส่วนเสริมจาก Facebook ที่แสดงข้อมูลเพจบนเว็บไซต์อื่น เช่น ชื่อเพจ จำนวนผู้ติดตาม และปุ่มติดตาม
- **ที่อยู่เพจ Facebook (Page URL)** ลิงก์หน้าเพจของคุณ รูปแบบ `facebook.com/ชื่อเพจ` ใช้ได้เฉพาะเพจสาธารณะ ไม่รองรับโปรไฟล์ส่วนตัว
- **แท็บลอย** ป้ายเล็ก ๆ ที่ติดอยู่กับขอบหน้าจอและเลื่อนตามเมื่อผู้เข้าชมเลื่อนหน้า ไม่บังเนื้อหาเมื่อยังไม่เปิด
- **การ์ดเพจ** กล่องข้อมูลของเพจที่เปิดออกมาจากแท็บ เมื่อคลิก แตะ หรือเลื่อนเมาส์ไปชี้
- **ขนาดมาตรฐาน** การ์ดกว้าง 340 พิกเซล แสดงภาพปกและชื่อเพจครบ
- **ขนาดกะทัดรัด** การ์ดกว้าง 280 พิกเซล ไม่มีภาพปก เหมาะกับเว็บที่มีพื้นที่น้อย
- **สีแท็บ** สีพื้นหลังของแท็บ เลือกได้ระหว่างน้ำเงิน (สีของ Facebook) และเข้ม (เทาเข้ม) ให้เข้ากับธีมเว็บของคุณ
- **ข้อความแท็บ** คำที่แสดงบนแท็บ ใส่ได้ไม่เกิน 20 ตัวอักษร ค่าเริ่มต้นคือ Facebook
- **ด้านของหน้าจอ** เลือกว่าจะให้แท็บติดขอบขวาหรือขอบซ้าย
- **ความสูงของแท็บ** ตำแหน่งบนลงล่างของแท็บ แบ่งเป็นบน (25%) กลาง (50%) และล่าง (75%) ของความสูงหน้าจอ
- **ปุ่มติดตาม (Follow)** ปุ่มบนการ์ดที่ให้ผู้เข้าชมติดตามเพจของคุณได้ทันที
- **โค้ดสำหรับเว็บไซต์** ชุดคำสั่ง JavaScript ที่สร้างจากตัวเลือกด้านบน ใช้งานได้ในตัวเอง ไม่ต้องโหลดไฟล์เพิ่มจากเซิร์ฟเวอร์อื่น
- **Custom HTML / HTML/JavaScript** ช่องหรือบล็อกในระบบเว็บ (WordPress, Blogger) ที่ให้วางโค้ด HTML และ JavaScript ได้โดยตรง
- **ตัวบล็อกโฆษณา (Ad blocker)** ส่วนขยายในเบราว์เซอร์ของผู้เข้าชมที่อาจบล็อกการ์ด Facebook ทำให้การ์ดว่างเปล่า

## ข้อควรรู้

- แท็บจะอยู่ที่ขอบจอของทุกหน้า คลิกหรือแตะเพื่อเปิดการ์ด ถ้าใช้เมาส์ แค่เลื่อนเมาส์ไปชี้ที่แท็บก็เปิดได้
- ไม่มีอะไรโหลดจาก Facebook จนกว่าผู้เข้าชมจะเปิดแท็บ จึงไม่ทำให้หน้าเว็บช้าลง และบนมือถือการ์ดจะย่อให้พอดีกับหน้าจอ
- Facebook ยกเลิกปุ่มถูกใจบนเว็บไซต์อื่นในเดือนกุมภาพันธ์ 2026 สิ่งที่ยังใช้ได้บนการ์ดคือปุ่มติดตาม
- ตัวบล็อกโฆษณาของผู้เข้าชมบางคนอาจบล็อกการ์ดของ Facebook ทำให้แท็บเปิดมาว่างเปล่า ส่วนแพลตฟอร์มที่ไม่อนุญาตให้วางโค้ดเอง เช่น Pixnet จะแสดงแท็บไม่ได้

หน้านี้ไม่มีส่วนเกี่ยวข้องกับ Facebook Facebook เป็นเครื่องหมายการค้าจดทะเบียนของ Meta Platforms, Inc.