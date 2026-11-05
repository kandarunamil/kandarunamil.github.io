---
title: "ตรวจสอบ IP ของฉัน"
seoTitle: "ตรวจสอบ IP ของฉัน ออนไลน์ ฟรี"
h1: "ตรวจสอบ IP ของฉัน"
description: "ตรวจสอบ IP ของฉัน ดูที่อยู่ IPv4 และ IPv6 ผู้ให้บริการอินเทอร์เน็ต ASN ประเทศ เมือง เขตเวลา ตำแหน่งโดยประมาณได้ทันที ฟรี ใช้ได้ทุกอุปกรณ์ ไม่ต้องลงทะเบียน"
icon: "📱"
category: "device"
weight: 1
byline: true
date: 2026-11-05
lastmod: 2026-11-05
draft: false
---

<style>
.ipx{margin:1.25rem 0;max-width:720px}
.ipx *{box-sizing:border-box}
.ipx-cards{display:grid;gap:.75rem;grid-template-columns:1fr}
@media (min-width:600px){.ipx-cards{grid-template-columns:1fr 1fr}}
.ipx-card{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:.9rem 1rem}
.ipx-card h3{margin:0 0 .4rem;font-size:.95rem}
.ipx-val{display:block;font-size:1.1rem;font-weight:700;word-break:break-all;min-height:1.6em}
.ipx-btn{margin-top:.6rem;padding:.45rem .9rem;border:1px solid rgba(128,128,128,.5);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:.9rem;cursor:pointer}
.ipx-btn:disabled{opacity:.45;cursor:not-allowed}
.ipx-bar{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin:.9rem 0}
.ipx-status{font-size:.9rem;opacity:.8}
.ipx-info{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:.4rem 1rem}
.ipx-info h3{margin:.6rem 0 .2rem;font-size:1rem}
.ipx-row{display:flex;justify-content:space-between;gap:1rem;padding:.5rem 0;border-bottom:1px solid rgba(128,128,128,.2)}
.ipx-row:last-child{border-bottom:0}
.ipx-row dt{margin:0;opacity:.75;flex:0 0 42%}
.ipx-row dd{margin:0;text-align:right;word-break:break-word;flex:1}
</style>

<div class="ipx" id="ipx-tool">
<div class="ipx-cards">
<div class="ipx-card"><h3>IPv4 เครือข่ายปัจจุบัน</h3><span class="ipx-val" id="ipx-v4">กำลังตรวจสอบ...</span><button type="button" class="ipx-btn" id="ipx-copy-v4" disabled>คัดลอก</button></div>
<div class="ipx-card"><h3>IPv6 เครือข่ายปัจจุบัน</h3><span class="ipx-val" id="ipx-v6">กำลังตรวจสอบ...</span><button type="button" class="ipx-btn" id="ipx-copy-v6" disabled>คัดลอก</button></div>
</div>
<div class="ipx-bar"><button type="button" class="ipx-btn" id="ipx-refresh">ตรวจสอบอีกครั้ง</button><span class="ipx-status" id="ipx-status" role="status" aria-live="polite"></span></div>
<div class="ipx-info"><h3>ข้อมูลเครือข่าย</h3>
<dl>
<div class="ipx-row"><dt>IPv4</dt><dd id="ipx-i-v4">-</dd></div>
<div class="ipx-row"><dt>IPv6</dt><dd id="ipx-i-v6">-</dd></div>
<div class="ipx-row"><dt>ผู้ให้บริการอินเทอร์เน็ต (ISP)</dt><dd id="ipx-i-isp">-</dd></div>
<div class="ipx-row"><dt>ASN</dt><dd id="ipx-i-asn">-</dd></div>
<div class="ipx-row"><dt>ประเทศ</dt><dd id="ipx-i-country">-</dd></div>
<div class="ipx-row"><dt>ภูมิภาค</dt><dd id="ipx-i-region">-</dd></div>
<div class="ipx-row"><dt>รหัสภูมิภาค</dt><dd id="ipx-i-regioncode">-</dd></div>
<div class="ipx-row"><dt>เมือง</dt><dd id="ipx-i-city">-</dd></div>
<div class="ipx-row"><dt>เขตเวลา</dt><dd id="ipx-i-tz">-</dd></div>
<div class="ipx-row"><dt>เวลาท้องถิ่น</dt><dd id="ipx-i-time">-</dd></div>
<div class="ipx-row"><dt>รหัสไปรษณีย์</dt><dd id="ipx-i-postal">-</dd></div>
<div class="ipx-row"><dt>ตำแหน่งทางภูมิศาสตร์</dt><dd id="ipx-i-geo">-</dd></div>
</dl>
</div>
</div>

<script>
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
</script>

## วิธีใช้งานเครื่องมือตรวจสอบ IP

1. เปิดหน้านี้ ระบบจะตรวจสอบที่อยู่ IPv4 และ IPv6 ของเครือข่ายที่คุณใช้อยู่ให้อัตโนมัติ ไม่ต้องกรอกข้อมูลใดๆ
2. รอสักครู่ ผลลัพธ์จะแสดงในการ์ด IPv4 และ IPv6 พร้อมรายละเอียดในตาราง "ข้อมูลเครือข่าย" ด้านล่าง
3. กดปุ่ม "คัดลอก" ใต้ที่อยู่ IP ที่ต้องการ แล้วนำไปวางในแชต อีเมล หรือหน้าตั้งค่าเราเตอร์
4. หากสลับเครือข่าย เช่น จาก Wi-Fi เป็นอินเทอร์เน็ตมือถือ หรือเปิด/ปิด VPN ให้กด "ตรวจสอบอีกครั้ง" เพื่อดูผลล่าสุด
5. หากช่องใดแสดง "ไม่สามารถใช้ได้" แสดงว่าเครือข่ายนั้นไม่มีที่อยู่ IP ประเภทดังกล่าว ซึ่งเป็นเรื่องปกติ

## ความหมายของข้อมูลแต่ละรายการ

| ข้อมูล | ความหมายโดยย่อ |
|---|---|
| IPv4 | ที่อยู่ IP รุ่นที่ 4 เป็นตัวเลข 4 ชุดคั่นด้วยจุด เช่น 192.0.2.1 |
| IPv6 | ที่อยู่ IP รุ่นใหม่ ใช้เลขฐานสิบหกคั่นด้วยเครื่องหมายโคลอน เช่น 2001:db8::1 |
| ผู้ให้บริการอินเทอร์เน็ต (ISP) | บริษัทที่ให้บริการอินเทอร์เน็ตแก่คุณ เช่น AIS, True, NT |
| ASN | Autonomous System Number คือหมายเลขประจำเครือข่ายขนาดใหญ่ของผู้ให้บริการ ใช้ระบุว่า IP นี้อยู่ในเครือข่ายใด |
| ประเทศ | ประเทศที่ฐานข้อมูลระบุว่า IP นี้ลงทะเบียนหรือใช้งานอยู่ |
| ภูมิภาค | จังหวัด รัฐ หรือเขตการปกครองระดับแรกของพื้นที่ที่ตรวจพบ |
| รหัสภูมิภาค | รหัสย่อของภูมิภาคข้างต้น ใช้อ้างอิงในระบบและฐานข้อมูล |
| เมือง | เมืองโดยประมาณที่ IP นี้ผูกอยู่ มักเป็นที่ตั้งของศูนย์ข้อมูลหรือชุมสายของผู้ให้บริการ |
| เขตเวลา | ชื่อโซนเวลามาตรฐานของพื้นที่นั้น เช่น Asia/Bangkok |
| เวลาท้องถิ่น | วันและเวลาปัจจุบันตามเขตเวลาของตำแหน่งที่ตรวจพบ |
| รหัสไปรษณีย์ | รหัสไปรษณีย์ของพื้นที่โดยประมาณ อาจไม่ตรงกับที่อยู่จริงของคุณ |
| ตำแหน่งทางภูมิศาสตร์ | พิกัดละติจูดและลองจิจูดโดยประมาณ ไม่ใช่ตำแหน่งตัวอุปกรณ์แบบเป๊ะๆ |

## IP Address คืออะไร

IP Address คือหมายเลขที่ใช้ระบุอุปกรณ์หรือเครือข่ายบนอินเทอร์เน็ต เพื่อให้เว็บไซต์และบริการต่างๆ รู้ว่าต้องส่งข้อมูลกลับไปที่ใด ทุกครั้งที่คุณเปิดเว็บ ดูวิดีโอ หรือส่งข้อความ ระบบจะใช้ IP ในการจับคู่ต้นทางและปลายทางของข้อมูล

## IPv4 กับ IPv6 ต่างกันอย่างไร

IPv4 เป็นมาตรฐานเดิมที่ใช้กันแพร่หลาย แต่จำนวนที่อยู่มีจำกัด จึงเกิด IPv6 ซึ่งมีที่อยู่ได้มากกว่าหลายเท่า ปัจจุบันหลายเครือข่ายใช้ทั้งสองแบบควบคู่กัน ขึ้นอยู่กับผู้ให้บริการ เราเตอร์ และอุปกรณ์ของคุณ

## ทำไมจึงแสดง "ไม่สามารถใช้ได้"

ช่อง IPv4 หรือ IPv6 อาจแสดง "ไม่สามารถใช้ได้" เมื่อผู้ให้บริการไม่รองรับ IP ประเภทนั้น เราเตอร์ไม่ได้เปิดใช้งาน หรืออุปกรณ์ไม่ได้ตั้งค่าไว้ นอกจากนี้ตัวบล็อกโฆษณาหรือส่วนขยายความเป็นส่วนตัวบางตัวอาจบล็อกการตรวจสอบได้เช่นกัน

## ข้อมูลตำแหน่งแม่นยำแค่ไหน

ตำแหน่งที่ได้จาก IP เป็นการประมาณจากฐานข้อมูลของผู้ให้บริการข้อมูล IP ระดับประเทศมักแม่นยำ แต่ระดับเมืองและรหัสไปรษณีย์อาจคลาดเคลื่อน โดยเฉพาะเมื่อใช้อินเทอร์เน็ตมือถือหรือ VPN ซึ่ง IP ที่เห็นอาจเป็นของเซิร์ฟเวอร์หรือผู้ให้บริการ ไม่ใช่ตำแหน่งจริงของคุณ

## ความเป็นส่วนตัว

เว็บไซต์นี้ไม่บันทึกที่อยู่ IP หรือผลการตรวจสอบของคุณ การตรวจสอบทำในเบราว์เซอร์โดยเรียกใช้บริการค้นหา IP ภายนอก (ipify, ipwho.is และ ipapi.co) เพื่อระบุที่อยู่และข้อมูลตำแหน่ง