---
title: "ตัวสร้างข้อความ Old English"
seoTitle: "ตัวสร้างข้อความ Old English ออนไลน์ ฟรี"
h1: "ตัวสร้างข้อความ Old English"
description: "สร้างข้อความ Old English แบบตัวอักษรโกธิก แปลงตัวอักษรอังกฤษเป็นฟอนต์ยุคกลางได้ทันที คัดลอกไปวางใน IG, Facebook, X ได้ฟรี ไม่ต้องติดตั้งฟอนต์ใดๆ เลย ง่ายๆ"
icon: "🔤"
category: "text"
weight: 41
byline: true
date: 2026-11-05
lastmod: 2026-11-11
draft: false
---

<div id="oe-tool" class="oe-tool">
<label for="oe-input" class="oe-label">พิมพ์ข้อความภาษาอังกฤษของคุณ</label>
<textarea id="oe-input" class="oe-input" rows="3" placeholder="hello">hello</textarea>
<p class="oe-arrow" aria-hidden="true">⇩ ⇩ ⇩</p>
<div id="oe-results" class="oe-results"></div>
</div>
<style>
.oe-tool{margin:1.5rem 0}
.oe-label{display:block;font-weight:600;margin-bottom:.5rem}
.oe-input{width:100%;box-sizing:border-box;padding:.75rem;font-size:1rem;border:1px solid #bbb;border-radius:8px;font-family:inherit}
.oe-arrow{text-align:center;margin:.75rem 0;opacity:.6}
.oe-row{display:flex;gap:.75rem;align-items:center;justify-content:space-between;border:1px solid #ccc;border-radius:8px;padding:.75rem 1rem;margin-bottom:.75rem}
.oe-name{font-size:.8rem;opacity:.7;margin-bottom:.25rem}
.oe-text{font-size:1.4rem;word-break:break-word}
.oe-btn{flex-shrink:0;cursor:pointer;border:0;border-radius:6px;padding:.5rem 1rem;font-size:.9rem;background:#2563eb;color:#fff}
.oe-btn.done{background:#16a34a}
</style>
<script>
(function () {
  var styles = [
    { name: "Old English (Fraktur)", upper: 0x1D504, lower: 0x1D51E, holes: { 2: 0x212D, 7: 0x210C, 8: 0x2111, 17: 0x211C, 25: 0x2128 } },
    { name: "Old English ตัวหนา (Bold Fraktur)", upper: 0x1D56C, lower: 0x1D586, holes: {} }
  ];
  function convert(text, st) {
    return Array.from(text).map(function (ch) {
      var c = ch.codePointAt(0);
      var u = c - 65;
      var l = c - 97;
      if (Math.floor(u / 26) === 0) {
        return String.fromCodePoint(st.holes[u] !== undefined ? st.holes[u] : st.upper + u);
      }
      if (Math.floor(l / 26) === 0) {
        return String.fromCodePoint(st.lower + l);
      }
      return ch;
    }).join("");
  }
  function copyText(text, btn) {
    function ok() {
      btn.textContent = "คัดลอกแล้ว ✓";
      btn.className = "oe-btn done";
      setTimeout(function () { btn.textContent = "คัดลอก"; btn.className = "oe-btn"; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(text, ok); });
    } else {
      fallback(text, ok);
    }
  }
  function fallback(text, ok) {
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); ok(); } catch (e) {}
    document.body.removeChild(ta);
  }
  var input = document.getElementById("oe-input");
  var box = document.getElementById("oe-results");
  if (!input || !box) { return; }
  var rows = styles.map(function (st) {
    var row = document.createElement("div");
    row.className = "oe-row";
    var left = document.createElement("div");
    var name = document.createElement("div");
    name.className = "oe-name";
    name.textContent = st.name;
    var out = document.createElement("div");
    out.className = "oe-text";
    left.appendChild(name);
    left.appendChild(out);
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "oe-btn";
    btn.textContent = "คัดลอก";
    btn.addEventListener("click", function () { copyText(out.textContent, btn); });
    row.appendChild(left);
    row.appendChild(btn);
    box.appendChild(row);
    return { st: st, out: out };
  });
  function render() {
    var value = input.value || "hello";
    rows.forEach(function (r) { r.out.textContent = convert(value, r.st); });
  }
  input.addEventListener("input", render);
  render();
})();
</script>

ตัวอักษร Old English หรือที่รู้จักกันในชื่อ Fraktur และ Blackletter เป็นสไตล์ตัวอักษรโกธิกที่มีรากฐานจากตัวพิมพ์ในยุคกลาง เส้นหนาและลวดลายประณีตช่วยเพิ่มความรู้สึกวินเทจและขรึมขลังให้กับข้อความ

**ตัวอย่างผลลัพธ์:** `𝖔𝖑𝖉 𝖊𝖓𝖌𝖑𝖎𝖘𝖍 𝖙𝖊𝖝𝖙`

## วิธีใช้งานตัวสร้างข้อความ Old English

1. พิมพ์หรือวางข้อความภาษาอังกฤษในช่องด้านบน
2. ดูผลลัพธ์แบบสดในแต่ละสไตล์ที่แสดงอยู่ด้านล่างช่องพิมพ์
3. กดปุ่ม **คัดลอก** ในสไตล์ที่ต้องการ
4. นำไปวางได้ทุกที่ที่รองรับ Unicode เช่น Instagram, Facebook, X (Twitter), TikTok หรือ LINE

**หมายเหตุ:** ใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ (A-Z, a-z) เท่านั้น ตัวเลข สัญลักษณ์ และตัวอักษรภาษาไทยจะคงเดิมโดยไม่ถูกแปลง

## การใช้งานสร้างสรรค์ของตัวอักษร Old English

- **โครงการประวัติศาสตร์:** เหมาะกับงานออกแบบธีมยุคกลางหรือวินเทจ
- **บัตรเชิญงาน:** เพิ่มความสง่างามให้กับการ์ดงานแต่งงานหรืองานพิธีการ
- **การสร้างแบรนด์:** ช่วยให้โลโก้และชื่อแบรนด์ดูมีเอกลักษณ์และมีศิลปะ
- **โปรไฟล์โซเชียล:** ใช้ตกแต่งชื่อ ไบโอ และแคปชันให้โดดเด่น

## คำศัพท์ที่ควรรู้

- **Old English:** ในเครื่องมือนี้หมายถึงตัวอักษรทรงโกธิกแบบยุคกลาง ไม่ใช่ภาษาอังกฤษโบราณ (Anglo-Saxon) แต่อย่างใด
- **Blackletter:** กลุ่มฟอนต์ตัวพิมพ์ยุคกลางของยุโรปที่มีเส้นหนา หักมุม และดูทึบ
- **Fraktur:** ฟอนต์ Blackletter แบบหนึ่งที่นิยมในเยอรมนี และเป็นต้นแบบของตัวอักษร Unicode ที่เครื่องมือนี้ใช้
- **Bold Fraktur:** Fraktur ตัวหนา เส้นหนากว่าและเด่นชัดกว่าแบบปกติ
- **Unicode:** มาตรฐานรหัสอักขระสากล ทำให้ข้อความแสดงผลเหมือนกันในทุกแอปและอุปกรณ์
- **Mathematical Alphanumeric Symbols:** กลุ่มอักขระ Unicode ที่ใช้ในทางคณิตศาสตร์ และเป็นแหล่งของตัวอักษรสไตล์ Fraktur ในเครื่องมือนี้
- **คัดลอกและวาง (Copy & Paste):** ผลลัพธ์เป็นข้อความจริง ไม่ใช่รูปภาพหรือฟอนต์ จึงนำไปวางได้ทันทีโดยไม่ต้องติดตั้งอะไรเพิ่ม