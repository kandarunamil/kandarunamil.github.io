---
title: "อีโมจิสำหรับบล็อก"
seoTitle: "อีโมจิสำหรับบล็อก คัดลอกวางฟรี"
h1: "อีโมจิสำหรับบล็อก"
description: "อีโมจิสำหรับบล็อก คัดลอกรูปอีโมจิพร้อมโค้ด HTML ไปวางใน WordPress และ Blogger ได้ทันที เลือกสไตล์ Twitter หรือ Google ปรับขนาดได้ ใช้ฟรี ไม่ต้องอัปโหลดรูป"
icon: "😀"
category: "emoji"
weight: 47
byline: true
date: 2026-11-05
lastmod: 2026-11-12
draft: false
cssFile: "css/tools/emoji-in-blog.css"
jsFile: "js/tools/emoji-in-blog.js"
---

เครื่องมือออนไลน์สำหรับแทรกรูปอีโมจิลงในบทความบล็อกของคุณ เพียงคลิกที่อีโมจิ ระบบจะคัดลอกโค้ด HTML ให้ทันที แล้วนำไปวางในโปรแกรมแก้ไขบล็อกได้เลย โดยไม่ต้องอัปโหลดรูปเอง

เครื่องมือนี้ใช้สำหรับเขียนบล็อก เช่น WordPress และ Google Blogger เท่านั้น หากต้องการใช้อีโมจิใน Facebook หรือ Twitter ให้คัดลอกอีโมจิแบบตัวอักษรไปวางโดยตรง

- รองรับการวางในโหมดแก้ไขแบบภาพ (Visual)
- รองรับแพลตฟอร์มบล็อกทั้งหมด รวมถึง WordPress และ Blogger
- รูปอีโมจิโหลดผ่าน CDN ฟรี รวดเร็วและเสถียร

<div class="eib" id="emoji-in-blog">
<p class="eib-hint">คลิกที่ไอคอนเพื่อคัดลอก HTML ไปยังคลิปบอร์ด</p>
<div class="eib-controls">
<div class="eib-field"><span class="eib-label" id="eib-provider-label">สไตล์อีโมจิ</span><div class="eib-seg" role="group" aria-labelledby="eib-provider-label"><button type="button" class="eib-seg-btn" data-provider="twitter" aria-pressed="true">Twitter</button><button type="button" class="eib-seg-btn" data-provider="google" aria-pressed="false">Google</button></div></div>
<div class="eib-field"><label class="eib-label" for="eib-size">ขนาดไอคอน</label><select class="eib-select" id="eib-size"><option value="16">16</option><option value="20" selected>20</option><option value="24">24</option><option value="28">28</option><option value="32">32</option><option value="36">36</option><option value="48">48</option></select></div>
</div>
<div class="eib-tabs" id="eib-tabs" role="group" aria-label="หมวดหมู่อีโมจิ"></div>
<div class="eib-grid" id="eib-grid" aria-label="รายการอีโมจิ"></div>
<p class="eib-empty" id="eib-empty" hidden>ยังไม่มีอีโมจิที่ใช้ล่าสุด คลิกอีโมจิจากหมวดอื่นแล้วจะแสดงที่นี่โดยอัตโนมัติ</p>
<button type="button" class="eib-clear" id="eib-clear" hidden>ล้างรายการที่ใช้ล่าสุด</button>
<div class="eib-output">
<div class="eib-output-head"><span>โค้ด HTML ล่าสุด</span><span class="eib-preview" id="eib-preview"></span></div>
<textarea class="eib-code" id="eib-code" readonly rows="3" aria-label="โค้ด HTML ของอีโมจิที่เลือก" placeholder="เลือกอีโมจิแล้วโค้ดจะแสดงที่นี่"></textarea>
<button type="button" class="eib-copy" id="eib-copy">คัดลอกโค้ดอีกครั้ง</button>
</div>
<div class="eib-toast" id="eib-toast" role="status" aria-live="polite"></div>
<noscript>เครื่องมือนี้ต้องเปิดใช้งาน JavaScript จึงจะทำงานได้</noscript>
</div>

## วิธีใช้งานอีโมจิสำหรับบล็อก

1. เลือกสไตล์อีโมจิที่ต้องการ ระหว่าง Twitter หรือ Google
2. เลือกขนาดไอคอนจากช่อง "ขนาดไอคอน" ตั้งแต่ 16 ถึง 48 พิกเซล
3. เลือกหมวดหมู่อีโมจิจากแท็บด้านบน เช่น หน้ายิ้มและผู้คน สัตว์และธรรมชาติ หรือธง
4. คลิกที่อีโมจิที่ต้องการ ระบบจะคัดลอกโค้ด HTML ไปยังคลิปบอร์ดและแสดงโค้ดในช่อง "โค้ด HTML ล่าสุด"
5. เปิดหน้าเขียนบทความในบล็อก ถ้าใช้โหมดแก้ไขแบบภาพ ให้กด Ctrl+V (Mac ใช้ ⌘+V) รูปอีโมจิจะปรากฏทันที
6. ถ้าใช้โหมด HTML หรือโหมดโค้ด ให้วางตำแหน่งเคอร์เซอร์ที่ต้องการแล้ววาง โค้ดแท็ก `<img>` จะถูกแทรกลงไป
7. หากคัดลอกไม่สำเร็จ ให้เลือกข้อความในช่องโค้ดแล้วกด Ctrl+C หรือกดปุ่ม "คัดลอกโค้ดอีกครั้ง"

## คำอธิบายศัพท์

- **อีโมจิ (Emoji)** : ภาพสัญลักษณ์เล็ก ๆ ที่ใช้แสดงอารมณ์ สิ่งของ หรือสถานที่ในข้อความ
- **Twitter (Twemoji)** : ชุดอีโมจิที่ Twitter เปิดซอร์สไว้ ลักษณะเป็นภาพแบนและสีสดใส
- **Google (Noto Color Emoji)** : ชุดอีโมจิโอเพ่นซอร์สของ Google ที่ใช้บน Android มีรายละเอียดและเงามากกว่า
- **โอเพ่นซอร์ส (Open Source)** : ผลงานที่เจ้าของเปิดให้ผู้อื่นนำไปใช้ได้ตามเงื่อนไขที่กำหนด
- **ขนาดไอคอน** : ความกว้างและความสูงของรูปอีโมจิเป็นพิกเซล ค่าเริ่มต้นคือ 20
- **ที่ใช้ล่าสุด** : หมวดที่เก็บอีโมจิที่คุณคัดลอกไปล่าสุดไว้ในเบราว์เซอร์ของคุณ เพื่อหยิบใช้ซ้ำได้เร็ว
- **คัดลอก HTML** : การคัดลอกแท็ก `<img>` ที่ชี้ไปยังรูปอีโมจิ เพื่อนำไปวางในบทความ
- **คลิปบอร์ด (Clipboard)** : พื้นที่พักข้อมูลชั่วคราวของอุปกรณ์ที่ใช้เก็บสิ่งที่คัดลอกไว้ก่อนวาง
- **โหมดแก้ไขแบบภาพ (Visual)** : โหมดเขียนบทความที่เห็นหน้าตาจริงของเนื้อหา เช่น ใน WordPress และ Blogger
- **โหมด HTML** : โหมดที่แสดงและแก้ไขโค้ดของบทความโดยตรง
- **WordPress** : ระบบสร้างและจัดการเว็บไซต์หรือบล็อกที่ได้รับความนิยมทั่วโลก
- **Google Blogger** : บริการสร้างบล็อกฟรีของ Google
- **CDN** : เครือข่ายเซิร์ฟเวอร์ที่ช่วยส่งไฟล์รูปให้โหลดเร็วจากจุดที่ใกล้ผู้ชม
- **หมวดหมู่** : การจัดกลุ่มอีโมจิ ได้แก่ หน้ายิ้มและผู้คน สัตว์และธรรมชาติ อาหารและเครื่องดื่ม กิจกรรม การเดินทางและสถานที่ สิ่งของ สัญลักษณ์ และธง

## เครดิตอีโมจิ

Google เปิดซอร์สอีโมจิชุด [Noto Color Emoji](https://github.com/googlefonts/noto-emoji) และ Twitter เปิดซอร์สอีโมจิชุด [Twemoji](https://github.com/jdecked/twemoji) ซึ่งเป็นกราฟิกภายใต้สัญญาอนุญาต CC-BY 4.0
