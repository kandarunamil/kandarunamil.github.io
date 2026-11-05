# Rencana pengembangan kandarunamil.github.io

Dasar: `kandarunamil.zip` (Hugo, layout + `main.css` + 4 file JS) dan `process_h1_hasil.xlsx`. Semua temuan di bagian 1 dibaca langsung dari kode. Angka Lighthouse belum diukur karena saya tidak bisa menjalankan browser di sini, jadi semua target di bawah adalah target, bukan hasil.

## 0. Keputusan yang perlu Anda konfirmasi

| # | Keputusan | Yang saya pakai | Alternatif |
|---|---|---|---|
| 1 | Struktur URL tools baru | Slug xlsx apa adanya (`/pdf/merge/`, `/emoji/list/cat/`). 12 tools lama tetap di `/tools/...` supaya tidak perlu redirect | Pindah semua ke `/tools/...`. Lebih rapi tapi perlu 301 dan Search Console sudah punya masalah redirect |
| 2 | Status 314 file `.md` baru | `draft: true`. Hugo tidak membangunnya, jadi tidak ada halaman kosong di sitemap atau indeks Google | Hapus baris `draft: true` per halaman saat tool + isinya siap. Satu perintah: `sed -i '/^draft: true$/d' content/pdf/merge.md` |
| 3 | 17 duplikat | Dibuang (Tabel C di `laporan.md`) | `twitter-symbols` dan `facebook-symbols` bisa dihidupkan lagi sebagai halaman kata kunci |
| 4 | Tools yang tidak bisa jalan di situs statis | Tetap dibuatkan `.md` (draft), tapi diberi label di bagian 4.3 | Hapus filenya |

## 1. Kondisi sekarang (temuan audit)

| Temuan | Dampak | Perbaikan |
|---|---|---|
| `head.html` mem-preload `/fonts/InterVariable.woff2`, filenya tidak ada (hanya `README.txt`) | Request 404 di setiap halaman, `@font-face` mati | Tidak memakai webfont sama sekali (lihat 2.1). Hapus preload dan `@font-face` |
| `static/img/og-default.png` tidak ada, tapi dirujuk di OG/Twitter dan schema | Gambar share kosong, validator schema mengeluh | Buat gambar 1200×630 |
| Hasil tool di-render JS ke `<ul id="ct-results">` yang awalnya kosong | Risiko CLS saat daftar muncul | Beri `min-height` sesuai jumlah baris, atau render awal di server |
| Seluruh `main.css` (8 KB) di-inline di setiap halaman | Bagus untuk LCP, tapi tidak ter-cache dan akan membengkak setelah redesain | Tetapkan batas CSS kritis ≤ 10 KB, sisanya per-halaman (2.1) |
| "Tools terkait" = 4 halaman pertama dari seluruh situs, sama untuk semua tool | Link internal tidak relevan, 4 halaman itu mendapat semua link | Bagian 6 |
| `/tools/` = daftar datar 12 kartu + 1 kartu beranda | Tidak akan muat untuk 300+ tools | Bagian 3 |
| Footer menampilkan `first 5` tools | Sama, tidak relevan | Bagian 6 |
| Tidak ada field `category` di front matter | Tidak bisa dikelompokkan | Tambah `category` (sudah ada di 314 file baru; 12 file lama perlu ditambah) |

Batasan GitHub Pages yang memengaruhi rencana: tidak bisa mengatur header HTTP (cache panjang, Brotli, COOP/COEP), jadi `ffmpeg.wasm` multi-thread tidak bisa dipakai. Bila nanti perlu, pindah ke Cloudflare Pages atau pasang Cloudflare di depan. Itu bukan syarat untuk rencana ini.

## 2. Percantik tampilan, pengunjung lebih betah, Core Web Vitals tetap 100

"100" di sini saya artikan Lighthouse Performance 100 (mobile, throttling bawaan) dan LCP/INP/CLS lulus. Itu ukuran lab. Data lapangan (CrUX) baru muncul bila trafik cukup, dan INP hanya bisa diukur saat orang benar-benar memakai tool.

### 2.1 Anggaran performa (aturan keras)

| Metrik | Batas |
|---|---|
| Webfont | 0. Pakai `system-ui` + font Thai bawaan OS (stack yang sekarang sudah benar tanpa Inter) |
| HTML + CSS kritis per halaman (gzip) | ≤ 14 KB, supaya muat di round-trip pertama |
| JS halaman tool | ≤ 20 KB min, `defer`, tanpa pustaka UI |
| JS di beranda dan hub | ≤ 3 KB |
| Pihak ketiga | 0 di render awal (tanpa analytics yang memblokir, tanpa SDK Facebook) |
| LCP | elemen teks (`h1` atau input). Tanpa gambar di atas lipatan |
| CLS | 0. Semua area yang diisi JS punya tinggi cadangan |
| Animasi | hanya `transform` dan `opacity` di CSS, hormati `prefers-reduced-motion` |

Aturan pemuatan:

- CSS dipecah: `base` + `components` di-inline; `assets/css/tools/<slug>.css` dimuat hanya bila file itu ada (`{{ with resources.Get ... }}`), jadi nama file yang dicadangkan di laporan tidak menambah byte.
- Pustaka berat (pdf-lib, pdf.js, ffmpeg, parser) dimuat dengan `import()` **setelah** pengguna memilih file atau menekan tombol. Skor Lighthouse hanya mengukur muat awal, tapi INP lapangan akan rusak bila pemrosesan berat berjalan di main thread. Pemrosesan berat harus di Web Worker.
- Bagian di bawah lipatan memakai `content-visibility:auto` + `contain-intrinsic-size` agar render awal ringan tanpa lonjakan layout.

### 2.2 Perubahan visual (semua CSS, tanpa gambar)

1. **Token desain.** Satu aksen, skala radius (8/12/16), bayangan lembut, 8 warna kategori untuk chip ikon. Dark mode otomatis lewat `prefers-color-scheme` (tanpa tombol pengalih, jadi tidak ada skrip anti-kedip).
2. **Tool-first.** Di layar 360×640, `h1` + kolom input sudah terlihat tanpa scroll. Breadcrumb dan byline diperkecil; `lead` maksimal dua baris.
3. **Baris hasil lebih nyaman.** Tombol Salin besar (≥ 44 px), umpan balik "✓ คัดลอกแล้ว" di tempat, baris hasil lebih rapat, tombol ⭐ untuk menyimpan gaya favorit (localStorage, ditulis saat klik saja).
4. **Header.** Tinggi 56 px, menu mobile tetap, tambahkan tautan pencarian ke `/tools/`.
5. **Halaman artikel.** Daftar isi otomatis untuk halaman dengan ≥ 4 `h2`, FAQ memakai `<details>` (tanpa JS; schema FAQ tetap dari front matter).
6. **Mikro-interaksi.** Hover/focus kartu (transform), transisi 150 ms. Opsional dan perlu diuji dulu: `@view-transition { navigation: auto }` untuk perpindahan halaman yang terasa seperti aplikasi, dibuang kalau LCP naik.
7. **Navigasi terasa cepat.** `<script type="speculationrules">` dengan prefetch `moderate` (prefetch saat hover). Bukan JS aplikasi, hanya JSON.

### 2.3 Fitur yang membuat orang betah (ringan)

- Setelah menyalin, tampilkan satu baris "Lanjut: …" berisi 1–2 tool yang biasa dipakai berikutnya (data dari `data/workflows.yaml`, lihat 6.4).
- "Terakhir dipakai" di beranda `/tools/` (localStorage). Wadahnya selalu ada dan terisi populer dari server; JS hanya menukar isinya di tempat, supaya tidak menggeser layout.
- Tombol "bagikan" memakai `navigator.share` bila ada, tanpa SDK media sosial.

### 2.4 Pengukuran (supaya "100" tidak sekadar klaim)

- Tambah Lighthouse CI di `.github/workflows/hugo.yml`: 7 URL templat (beranda, tool gaya, palette, counter, `/tools/`, hub kategori, satu tool berat) dengan preset mobile. Build gagal jika Performance < 0.99 atau CLS > 0.
- Bandingkan sebelum dan sesudah redesain pada URL yang sama, tiga kali jalan, ambil median.
- Setelah deploy: Search Console → Core Web Vitals dan PageSpeed Insights API per templat.

## 3. Hub `/tools/` lebih compact dan modern

**Tata letak (mobile dulu):**

```
[ h1 pendek ]            [ 🔎 cari tool… ]
[ chip kategori: 📄 PDF · 🖼 Gambar · 🎬 Media · 💻 Dev · ... ]   ← geser horizontal
Populer          [ 8 ubin 2×4, ikon + nama ]
Terakhir dipakai [ 1 baris, isi menggantikan Populer ]
────────────────────────────────────────────
📄 PDF (22)        ›    ← kartu per kategori
  Gabung PDF · Pisah PDF · Kompres PDF · PDF→JPG · +18 lagi
🖼 Gambar (24)     ›
  ...
```

Prinsip:

- **Kartu per kategori, bukan daftar 300 link.** Tiap kartu: ikon, nama, jumlah, 5 tool teratas (berdasar `weight`), tautan "ดูทั้งหมด N" ke hub kategori (`/pdf/`, `/image/`, …). Hub dalam (`/emoji/list/` 96 halaman, `/time/trading/` 44 halaman) tidak diurai di `/tools/`.
- **Baris padat.** Satu baris = ikon 20 px + judul + chevron, tinggi 44 px; deskripsi hanya di desktop, dipotong satu baris.
- **Data-driven.** Template mengelompokkan dengan `site.RegularPages.GroupByParam "category"`. Tools lama ditambah `category: "text"`.
- **Pencarian progresif.** Input tersembunyi tanpa JS (`.js` class sudah ada). Dengan JS, ±1 KB menyaring teks yang sudah ada di DOM (tanpa file indeks, tanpa fetch). Teks Thai tidak punya spasi, jadi pencocokan substring pada string yang dinormalkan.
- **CWV.** HTML hub ≈ 300 link ≈ beberapa puluh KB mentah, kecil setelah gzip. Tanpa gambar. `content-visibility:auto` untuk kartu di bawah lipatan.
- **JSON-LD `ItemList`** pada hub kategori (bukan pada `/tools/`, supaya tidak ada 300 item).
- **Hub kategori** (33 halaman `_index.md` yang sudah dibuat) memakai template yang sama dengan `/tools/` tapi dengan satu kategori dan deskripsi satu baris per tool.

Berkas yang berubah: `layouts/tools/list.html`, `layouts/_default/list.html` (hub kategori), partial baru `tool-row.html` dan `category-card.html`, `assets/js/hub.js` (pencarian + terakhir dipakai), bagian komponen di `main.css`.

## 4. Tools baru dari `process_h1_hasil.xlsx`

### 4.1 Hasil

| | Jumlah |
|---|---|
| Baris xlsx | 320 |
| Dibuang (sama dengan tool yang ada) | 17 |
| Tools baru | **281** |
| Hub dari xlsx yang dipertahankan | 22 |
| Hub struktural tambahan | 11 (folder yang punya anak tapi tidak ada `_index` di xlsx) |

Rincian lengkap, termasuk alasan tiap duplikat dan nama `.css`/`.js` setiap tool, ada di **`laporan.md`**. Alasan hub struktural: tanpa `_index.md`, Hugo membuat halaman daftar otomatis yang tipis dan terindeks (contoh: `/random/`, `/emoji/`).

### 4.2 Penamaan `.css` dan `.js`

`assets/css/tools/<slug-datar>.css` dan `assets/js/tools/<slug-datar>.js` (contoh `pdf-merge`). Nama dicadangkan untuk 281 tool, tapi file fisik dibuat hanya bila ada kode yang unik. Tool berbasis data memakai mesin bersama sehingga file per-tool cukup berisi konfigurasi beberapa baris:

| Kelompok | Jumlah | Mesin bersama | Catatan |
|---|---|---|---|
| Bursa saham `/time/trading/*` | 44 | `engines/trading.js` + `data/exchanges.yaml` | Jam reguler saja; hari libur cepat basi, tampilkan catatan "cek situs bursa" |
| Daftar emoji `/emoji/list/*` | 96 | `palette.js` yang sudah ada + data emoji dari dataset Unicode (dibangun saat build) | Risiko konten tipis, lihat 4.4 |
| Gaya teks (cursive, old-english, zalgo, invisible-ink) | 4 | `cooltext.js` yang sudah ada | Cukup parameter `ids`/`groups`; nol JS baru. Zalgo dan invisible-ink butuh 2 fungsi kecil |
| QR Code `/generator/qr-code/*` | 7 (halaman induknya juga tool) | `engines/qr.js` (±10–20 KB) | Skema URL aplikasi (Facebook/YouTube/X/Instagram) harus diverifikasi sebelum dipakai |
| Hash `/hash/*` | 7 | `crypto.subtle` (SHA) + MD5/CRC32 kecil, `bcryptjs`, `hash-wasm` (Argon2) | bcrypt dan Argon2 di-lazy-load |
| PDF `/pdf/*`, `/file/*` | 22 | `pdf-lib` (±300 KB), `pdf.js` (±1 MB) | Dimuat setelah pilih file |
| Gambar | 24 | Canvas API; `exifr`; HEIC lewat wasm (berat) | Lazy |
| Audio/video | 19 | WebAudio, MediaRecorder; `ffmpeg.wasm` hanya single-thread | Lihat 4.3 |
| Dev (JSON, formatter, regex, validator, minify) | 19 | Native; `js-beautify`, `acorn`, `terser` | Lazy |
| Perangkat dan uji | 16 | API browser | Lihat 4.3 |

### 4.3 Kelayakan (yang perlu keputusan)

| Slug | Masalah | Saran |
|---|---|---|
| `/speed-test/`, `/speed-test/ping/` | Perlu server pengukur. GitHub Pages tidak bisa | Tunda, atau pakai endpoint pihak ketiga dengan kebijakan CORS yang jelas |
| `/my-ip/` | Perlu API luar | Panggil setelah muat awal, jangan di render awal. Cantumkan di kebijakan privasi |
| `/facebook/friends-list/`, `/facebook/favorite-friends/`, `/facebook/id/` | Bergantung pada data/API Facebook yang sudah dibatasi | Tidak disarankan; biarkan draft atau hapus |
| `/pilipress/float-fb/` | SDK Facebook = pihak ketiga berat, merusak CWV | Hanya generator kode, jangan memuat SDK |
| `/transit-maps/` | Butuh data peta dan lisensi | Lewati |
| `/file/rar/` | Ekstrak RAR di browser butuh wasm besar | Tunda |
| `/minify/yui-compressor/`, `/minify/closure-compiler/` | Itu alat Java, tidak jalan di browser | Ganti nama jadi "Terser" dan "CSSO/Lightning CSS" |
| `/pdf/unlock/` | `pdf-lib` tidak bisa mendekripsi | Butuh qpdf-wasm; hanya untuk PDF tanpa password buka |
| `/pdf/compress/`, `/pdf/grayscale/`, `/pdf/deskew/` | Hanya mungkin dengan rasterisasi (kualitas turun, teks tidak bisa dipilih) | Jelaskan di halaman |
| `/id-photo/remove-background/` | Butuh model ML puluhan MB | Fase terakhir |
| `/video/*`, `/audio/convert/*` | `ffmpeg.wasm` ±25 MB, single-thread = lambat | Audio: WebAudio + `lamejs`. Video: fase terakhir |
| `/vibrator/` | Vibration API tidak ada di iOS Safari | Tulis batasan di halaman |
| `/screen/flashing-light/` | Cahaya berkedip berisiko bagi penderita fotosensitif | Peringatan + tombol berhenti jelas |
| `/converter/english-numbers/` | Untuk pengguna Thai, angka-ke-teks Baht (บาทถ้วน) kemungkinan lebih dicari | Pertimbangkan versi Thai |

### 4.4 Gelombang rilis

Jangan membuka 281 halaman sekaligus (draft membantu di sini):

1. **Gelombang 1 (murah, nol pustaka baru):** gaya teks (4), waktu non-bursa (6), acak (dadu, koin, angka, kata sandi, tim, roda, daftar), perangkat (keyboard, mouse, mic, webcam, speaker, dead pixel, layar), JSON/regex/formatter.
2. **Gelombang 2:** hash, QR, gambar (Canvas), PDF (pdf-lib).
3. **Gelombang 3:** bursa saham (44), emoji (96).
4. **Gelombang 4:** semua yang butuh wasm besar.

Halaman data-driven massal (bursa, emoji) rawan dianggap konten tipis. Syarat sebelum `draft` dilepas: tiap halaman punya ≥ 150 kata unik (cara pakai, kasus pakai, FAQ), bukan hanya daftar. Bila belum, rilis dengan `noindex: true` (didukung `head.html`) dan keluarkan dari sitemap sampai isinya siap.

## 5. Isi file `.md` baru

`content-baru.zip` berisi 314 file di jalur `content/...` persis seperti kolom `content_file` di xlsx. Ekstrak ke akar repo.

Isi tiap file hanya front matter, tanpa isi: `title`, `seoTitle`, `h1`, `description`, `icon`, `category`, `weight`, `byline` (hanya halaman tool), `date`, `lastmod`, `draft: true`. Tanpa `tool`, `faq`, atau `groups`, karena itu mengaktifkan layout lama dan schema WebApplication/FAQ palsu.

Perlu Anda tinjau: `description` dan `seoTitle` dibuat dari templat per kategori (PDF, gambar, bursa, emoji, dev…) dan 16 halaman khusus ditulis manual. Isinya benar secara umum, tetapi kalimat seperti "ไฟล์ไม่ถูกอัปโหลด" hanya boleh tetap bila tool-nya memang berjalan lokal di browser (lihat 4.3). Semua `h1` mengikuti `h1_final` dari xlsx.

Yang belum ada: `category` di 12 file lama (`content/tools/*.md`). Tambahkan `category: "text"` (kaomoji dan symbols: `"emoji"`).

## 6. Internal linking yang lebih baik

### 6.1 Masalah sekarang
Tools terkait dan footer memakai "N halaman pertama" (sama di semua tool); tidak ada hub kategori; beranda hanya menaut ke tool lewat isi artikel; tidak ada jalur "langkah berikutnya".

### 6.2 Arsitektur hub dan spoke

```
Beranda ─► /tools/ ─► hub kategori (/pdf/, /image/ …) ─► tool
   │                         ▲                              │
   └── 8 tool populer        └── breadcrumb ◄───────────────┘
                                  + 3 saudara + 1–2 langkah berikutnya
```

Aturan:
- Setiap tool terjangkau dalam ≤ 3 klik dari beranda.
- Setiap tool menerima tautan dari: hub kategori, breadcrumb, ≥ 3 tool sekategori, dan (bila ada) 1–2 tool di alur kerja yang sama.
- Beranda menaut ke 8–12 tool populer dan semua kategori, bukan semua tool.
- Link footer: kategori + 6 tool populer (dari `data/popular.yaml`), bukan `first 5`.

### 6.3 "Tools terkait" otomatis, relevan
1. Konfigurasi `related` di `hugo.toml`:
   ```toml
   [related]
     includeNewer = true
     threshold = 40
     toLower = true
     [[related.indices]]
       name = "category"
       weight = 100
     [[related.indices]]
       name = "cluster"
       weight = 60
   ```
2. Template memakai `.Site.RegularPages.Related .` (4 item), dengan fallback saudara sekategori berdasarkan kedekatan `weight`.
3. `cluster` (opsional, di front matter) mengelompokkan halaman massal: emoji (perasaan, warna, hewan, hari raya…), bursa (Asia-Pasifik, Eropa, Amerika, Timur Tengah/Afrika), audio, video.

### 6.4 Langkah berikutnya lintas kategori
`data/workflows.yaml`, misalnya:
```yaml
pdf/merge:        [pdf/compress, pdf/page-numbers]
image/heic:       [image/compress, image/resize]
webp/from-png:    [image/compress]
generator/qr-code: [image/crop-circle]
```
Dirender sebagai satu baris "Lanjut: …" di bawah hasil (lihat 2.3) dan di akhir halaman.

### 6.5 Link di dalam isi
Saat isi ditulis nanti: 2–4 link kontekstual per halaman ke tool saudara atau panduan. Anchor memakai nama tool atau frasa deskriptif yang bervariasi, bukan "คลิกที่นี่", dan jangan memakai satu anchor yang sama untuk semua halaman.

### 6.6 Kluster besar
- **Emoji (96):** hub `/emoji/list/` mengelompokkan per tema; tiap halaman menaut ke 4–6 tema terdekat dan ke tool bergaya (kaomoji, symbols).
- **Bursa (44):** hub `/time/trading/` per wilayah; tiap halaman menaut ke 3–4 bursa sewilayah dan ke `/time-now/`.

### 6.7 Kebersihan teknis
- Semua link internal berakhiran `/` dan dibuat dari `.RelPermalink`. Ini relevan dengan "Redirect error" di Search Console untuk URL tanpa garis miring; sitemap hanya berisi URL ber-slash.
- Skrip CI setelah `hugo`: crawl `public/` untuk (a) halaman tanpa tautan masuk (orphan), (b) link rusak, (c) link tanpa trailing slash. Build gagal bila ada.
- Batas ±60 link internal per halaman tool; hub boleh lebih.
- Sitemap hanya memuat halaman yang terindeks; `lastmod` dari tanggal nyata.
- Ukur di Search Console → Links (internal) dan kedalaman klik.

## 7. Urutan kerja

| Fase | Isi | Selesai bila |
|---|---|---|
| 0 | Perbaiki font 404, buat `og-default.png`, tambah `category` ke 12 file lama, pasang Lighthouse CI dan catat baseline | CI hijau di templat lama |
| 1 | Token desain, CSS dasar, header, halaman tool | Skor tidak turun dari baseline |
| 2 | Hub `/tools/` + hub kategori + pencarian | Semua kategori terbuka, CWV lulus |
| 3 | Internal linking (related, workflows, footer, CI orphan) | Tidak ada orphan |
| 4 | Gelombang tool 1 lalu 2, 3, 4 | Per gelombang: isi ≥ 150 kata, lepas `draft` |

## 8. Risiko

- **Dua target saling tarik.** Tampilan lebih kaya dan skor 100 saling membatasi. Jalan keluarnya: semua dekorasi dengan CSS, nol webfont, nol gambar di atas lipatan.
- **Konten tipis.** 140 halaman data-driven dengan teks hampir sama bisa menurunkan penilaian situs. Mitigasi di 4.4.
- **Beberapa tool tidak layak.** Lihat 4.3. Lebih baik dibuang daripada rilis yang tidak berfungsi.
- **Sumber xlsx.** Judul dan struktur berasal dari situs lain (`th.piliapp.com`). `h1_final` sudah diubah di xlsx, tetapi isi, teks bantuan, dan kode harus ditulis sendiri.
