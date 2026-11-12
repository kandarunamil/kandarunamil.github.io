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
