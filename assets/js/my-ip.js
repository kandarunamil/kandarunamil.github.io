(function () {
  'use strict';
  if (!document.getElementById('ipx-tool')) { return; }

  var NA = 'ไม่สามารถใช้ได้';
  var EMPTY = '-';
  var LOADING = 'กำลังตรวจสอบ...';
  var state = { v4: null, v6: null };
  var timeTimer = null;

  function el(id) { return document.getElementById(id); }

  function put(id, value) {
    var node = el(id);
    if (!node) { return; }
    node.textContent = (value === undefined || value === null || value === '') ? EMPTY : String(value);
  }

  function fetchJSON(url, timeout) {
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, timeout || 8000) : null;
    var opts = { cache: 'no-store' };
    if (ctrl) { opts.signal = ctrl.signal; }
    return fetch(url, opts).then(function (res) {
      if (timer) { clearTimeout(timer); }
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      return res.json();
    }, function (err) {
      if (timer) { clearTimeout(timer); }
      throw err;
    });
  }

  function isV4(s) { return typeof s === 'string' && /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
  function isV6(s) { return typeof s === 'string' && s.indexOf(':') > -1; }

  function getIP(url, test) {
    return fetchJSON(url, 6000).then(function (d) {
      return (d && test(d.ip)) ? d.ip : null;
    }).catch(function () { return null; });
  }

  function fromIpwho(d) {
    if (!d || d.success === false) { return null; }
    var c = d.connection || {};
    var t = d.timezone || {};
    return {
      isp: c.isp || c.org,
      asn: c.asn ? 'AS' + c.asn : '',
      country: d.country,
      region: d.region,
      regionCode: d.region_code,
      city: d.city,
      tz: t.id,
      postal: d.postal,
      lat: d.latitude,
      lon: d.longitude
    };
  }

  function fromIpapi(d) {
    if (!d || d.error) { return null; }
    return {
      isp: d.org,
      asn: d.asn,
      country: d.country_name,
      region: d.region,
      regionCode: d.region_code,
      city: d.city,
      tz: d.timezone,
      postal: d.postal,
      lat: d.latitude,
      lon: d.longitude
    };
  }

  function lookup(ip) {
    var q = encodeURIComponent(ip);
    return fetchJSON('https://ipwho.is/' + q, 8000)
      .then(fromIpwho)
      .catch(function () { return null; })
      .then(function (r) {
        if (r) { return r; }
        return fetchJSON('https://ipapi.co/' + q + '/json/', 8000)
          .then(fromIpapi)
          .catch(function () { return null; });
      });
  }

  function formatTime(tz) {
    if (!tz) { return ''; }
    try {
      return new Intl.DateTimeFormat('th-TH', { timeZone: tz, dateStyle: 'medium', timeStyle: 'medium' }).format(new Date());
    } catch (e) {
      return '';
    }
  }

  function startClock(tz) {
    if (timeTimer) { clearInterval(timeTimer); timeTimer = null; }
    if (!tz) { put('ipx-i-time', ''); return; }
    put('ipx-i-time', formatTime(tz));
    timeTimer = setInterval(function () { put('ipx-i-time', formatTime(tz)); }, 1000);
  }

  function setStatus(msg) { var n = el('ipx-status'); if (n) { n.textContent = msg || ''; } }

  function showIPs(v4, v6) {
    state.v4 = v4;
    state.v6 = v6;
    put('ipx-v4', v4 || NA);
    put('ipx-v6', v6 || NA);
    put('ipx-i-v4', v4 || NA);
    put('ipx-i-v6', v6 || NA);
    el('ipx-copy-v4').disabled = !v4;
    el('ipx-copy-v6').disabled = !v6;
  }

  function showInfo(info) {
    var i = info || {};
    put('ipx-i-isp', i.isp);
    put('ipx-i-asn', i.asn);
    put('ipx-i-country', i.country);
    put('ipx-i-region', i.region);
    put('ipx-i-regioncode', i.regionCode);
    put('ipx-i-city', i.city);
    put('ipx-i-tz', i.tz);
    put('ipx-i-postal', i.postal);
    var hasGeo = (i.lat !== undefined && i.lat !== null && i.lon !== undefined && i.lon !== null);
    put('ipx-i-geo', hasGeo ? (i.lat + ', ' + i.lon) : '');
    startClock(i.tz);
  }

  function clearInfo() {
    showInfo(null);
  }

  function legacyCopy(text) {
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
    return ok;
  }

  function copyText(text, btn) {
    var original = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', original);
    function done(ok) {
      btn.textContent = ok ? 'คัดลอกแล้ว' : 'คัดลอกไม่สำเร็จ';
      setTimeout(function () { btn.textContent = original; }, 1500);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(legacyCopy(text)); });
    } else {
      done(legacyCopy(text));
    }
  }

  function run() {
    var refresh = el('ipx-refresh');
    refresh.disabled = true;
    setStatus(LOADING);
    put('ipx-v4', LOADING);
    put('ipx-v6', LOADING);
    el('ipx-copy-v4').disabled = true;
    el('ipx-copy-v6').disabled = true;
    clearInfo();

    Promise.all([
      getIP('https://api.ipify.org?format=json', isV4),
      getIP('https://api6.ipify.org?format=json', isV6)
    ]).then(function (r) {
      var v4 = r[0];
      var v6 = r[1];
      showIPs(v4, v6);
      var target = v4 || v6;
      if (!target) {
        setStatus('ตรวจสอบไม่สำเร็จ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต ปิดตัวบล็อกโฆษณา แล้วลองใหม่');
        return null;
      }
      return lookup(target).then(function (info) {
        showInfo(info);
        setStatus(info ? '' : 'แสดงที่อยู่ IP ได้ แต่ไม่พบข้อมูลตำแหน่งและผู้ให้บริการ');
      });
    }).catch(function () {
      setStatus('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง');
    }).then(function () {
      refresh.disabled = false;
    });
  }

  el('ipx-copy-v4').addEventListener('click', function () { if (state.v4) { copyText(state.v4, this); } });
  el('ipx-copy-v6').addEventListener('click', function () { if (state.v6) { copyText(state.v6, this); } });
  el('ipx-refresh').addEventListener('click', run);

  run();
})();
