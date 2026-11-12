/*!
 * Emoji Download Tool
 * Simpan di: js/tools/emoji-download.js
 * Mount point: <div id="emojiDownloadApp"></div>
 * Tidak memerlukan library eksternal.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Konfigurasi                                                         */
  /* ------------------------------------------------------------------ */

  var STORAGE_KEY = 'emojiDownloadSettings';

  var STYLES = {
    twemoji: {
      label: 'Twitter',
      sep: '-',
      prefix: '',
      png: function (code) {
        return 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/' + code + '.png';
      },
      svg: function (code) {
        return 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/' + code + '.svg';
      }
    },
    noto: {
      label: 'Google',
      sep: '_',
      prefix: 'emoji_u',
      png: function (code) {
        return 'https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/png/128/' + code + '.png';
      },
      svg: function (code) {
        return 'https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/' + code + '.svg';
      }
    }
  };

  var CATEGORIES = [
    {
      id: 'smileys_people',
      label: 'หน้ายิ้มและผู้คน',
      emojis: '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 🤯 🤠 🥳 😎 🤓 🧐 😕 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💟 ❣️ 💔 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💯 💢 💥 💫 💦 💨 🕳️ 💬 💭 💤 👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦶 👂 👃 🧠 👀 👁️ 👅 👄 👶 🧒 👦 👧 🧑 👨 👩 🧓 👴 👵 🙍 🙎 🙅 🙆 💁 🙋 🙇 🤦 🤷 👮 💂 👷 🤴 👸 👳 🧙 🧚 🧛 🧜 🧝 🧞 🧟 💆 💇 🚶 🏃 💃 🕺 👯 🧘 🛀 🛌 👪 👨‍💻 👩‍💻 👨‍⚕️ 👩‍⚕️ 👨‍🍳 👩‍🍳 👨‍🚀 👩‍🚀'
    },
    {
      id: 'animals_nature',
      label: 'สัตว์และธรรมชาติ',
      emojis: '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🦟 🦗 🕷️ 🕸️ 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🐈 🐓 🦃 🦚 🦜 🦢 🕊️ 🐇 🦝 🦨 🦡 🦦 🦥 🐁 🐀 🐿️ 🦔 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🐚 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 🪐 ⭐ 🌟 ✨ ⚡ ☄️ 🔥 🌪️ 🌈 ☀️ 🌤️ ⛅ 🌥️ ☁️ 🌦️ 🌧️ ⛈️ 🌩️ 🌨️ ❄️ ☃️ ⛄ 🌬️ 💧 ☔ ☂️ 🌊 🌫️'
    },
    {
      id: 'food_drink',
      label: 'อาหารและเครื่องดื่ม',
      emojis: '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🌽 🥕 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 ☕ 🍵 🧃 🥤 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🍾 🧊 🥄 🍴 🍽️ 🥣 🥡 🥢'
    },
    {
      id: 'activities',
      label: 'กิจกรรม',
      emojis: '⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛷 ⛸️ 🥌 🎿 ⛷️ 🏂 🏋️ 🤼 🤸 ⛹️ 🤺 🤾 🏌️ 🏇 🧘 🏄 🏊 🤽 🚣 🧗 🚴 🚵 🎪 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🪕 🎻 🎲 ♟️ 🎯 🎳 🎮 🎰 🧩 🏆 🥇 🥈 🥉 🏅 🎖️ 🎗️ 🎫 🎟️ 🎃 🎆 🎇 🧨 🎈 🎉 🎊 🎎 🎏 🎐 🎑 🧧 🎀 🎁'
    },
    {
      id: 'travel_places',
      label: 'การเดินทางและสถานที่',
      emojis: '🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🛵 🏍️ 🚲 🛴 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩️ 💺 🛰️ 🚀 🛸 🚁 🛶 ⛵ 🚤 🛥️ 🛳️ ⛴️ 🚢 ⚓ ⛽ 🚧 🚦 🚥 🚏 🗺️ 🗿 🗽 🗼 🏰 🏯 🏟️ 🎡 🎢 🎠 ⛲ ⛱️ 🏖️ 🏝️ 🏜️ 🌋 ⛰️ 🏔️ 🗻 🏕️ ⛺ 🏠 🏡 🏘️ 🏚️ 🏗️ 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛️ ⛪ 🕌 🛕 🕍 ⛩️ 🕋 🌁 🌃 🏙️ 🌄 🌅 🌆 🌇 🌉 ♨️ 🌌'
    },
    {
      id: 'objects',
      label: 'สิ่งของ',
      emojis: '⌚ 📱 📲 💻 ⌨️ 🖥️ 🖨️ 🖱️ 🖲️ 🕹️ 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽️ 🎞️ 📞 ☎️ 📟 📠 📺 📻 🎙️ 🎚️ 🎛️ ⏱️ ⏲️ ⏰ 🕰️ ⌛ ⏳ 📡 🔋 🔌 💡 🔦 🕯️ 🧯 🛢️ 💸 💵 💴 💶 💷 💰 💳 💎 ⚖️ 🧰 🔧 🔨 ⚒️ 🛠️ ⛏️ 🔩 ⚙️ 🧱 ⛓️ 🧲 🔫 💣 🔪 🗡️ ⚔️ 🛡️ 🚬 ⚰️ ⚱️ 🏺 🔮 📿 🧿 💈 ⚗️ 🔭 🔬 💊 💉 🧬 🦠 🧫 🧪 🌡️ 🧹 🧺 🧻 🚽 🚰 🚿 🛁 🧼 🧽 🧴 🔑 🗝️ 🚪 🛋️ 🛏️ 🧸 🖼️ 🛍️ 🛒 ✉️ 📩 📨 📧 📦 📮 📜 📃 📄 📑 🧾 📊 📈 📉 🗒️ 🗓️ 📆 📅 🗑️ 📇 🗃️ 🗳️ 🗄️ 📋 📁 📂 📰 📓 📔 📒 📕 📗 📘 📙 📚 📖 🔖 🧷 🔗 📎 📐 📏 🧮 📌 📍 ✂️ 🖊️ 🖋️ ✒️ 🖌️ 🖍️ 📝 ✏️ 🔍 🔎 🔏 🔐 🔒 🔓'
    },
    {
      id: 'symbols',
      label: 'สัญลักษณ์',
      emojis: '🛑 ⛔ 📛 🚫 ❌ ⭕ ✅ ☑️ ✔️ ➕ ➖ ➗ ✖️ ♾️ ‼️ ⁉️ ❓ ❔ ❕ ❗ 〰️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔠 🔡 🔢 🔣 🔤 🅰️ 🆎 🅱️ 🆑 🆒 🆓 ℹ️ 🆔 Ⓜ️ 🆕 🆖 🅾️ 🆗 🅿️ 🆘 🆙 🆚 🈁 🈂️ 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼️ ◻️ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔘 🔳 🔲 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 ⚛️ ☮️ ☯️ ☸️ ✡️ ☪️ ✝️ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎ ▶️ ⏸️ ⏯️ ⏹️ ⏺️ ⏭️ ⏮️ ⏩ ⏪ ⏫ ⏬ 🔼 🔽 ♻️ ⚜️ 🔱 ✳️ ❇️ ❎ 🔅 🔆 📶 📳 📴 ♀️ ♂️ ⚕️ 💲'
    },
    {
      id: 'flags',
      label: 'ธง',
      emojis: '🏁 🚩 🎌 🏴 🏳️ 🏳️‍🌈 🏴‍☠️ 🇮🇩 🇹🇭 🇲🇾 🇸🇬 🇻🇳 🇵🇭 🇯🇵 🇰🇷 🇨🇳 🇹🇼 🇭🇰 🇮🇳 🇦🇺 🇳🇿 🇬🇧 🇺🇸 🇨🇦 🇲🇽 🇧🇷 🇦🇷 🇫🇷 🇩🇪 🇮🇹 🇪🇸 🇵🇹 🇳🇱 🇧🇪 🇨🇭 🇦🇹 🇸🇪 🇳🇴 🇩🇰 🇫🇮 🇮🇪 🇵🇱 🇹🇷 🇷🇺 🇺🇦 🇸🇦 🇦🇪 🇪🇬 🇿🇦 🇳🇬 🇰🇪 🇮🇱 🇵🇰 🇧🇩 🇱🇰 🇳🇵 🇰🇭 🇱🇦 🇲🇲 🇧🇳 🇹🇱 🇬🇷 🇨🇿 🇭🇺 🇨🇱 🇨🇴 🇵🇪 🇨🇺'
    }
  ];

  var TEXT = {
    styleLabel: 'สไตล์อิโมจิ',
    actionLabel: 'เมื่อคลิก',
    actionPopup: 'ป๊อปอัพรายการ',
    actionDownload: 'ดาวน์โหลด',
    actionCopy: 'คัดลอก',
    hint: 'โปรดคลิกไอคอนอิโมจิเพื่อดาวน์โหลดภาพ',
    dialogTitle: 'ดาวน์โหลด',
    close: 'ปิด',
    copyEmoji: 'คัดลอกอิโมจิ',
    copied: 'คัดลอกแล้ว',
    copyFailed: 'คัดลอกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง',
    downloading: 'กำลังดาวน์โหลด...',
    downloaded: 'ดาวน์โหลดแล้ว',
    downloadFailed: 'ดาวน์โหลดไม่สำเร็จ เปิดไฟล์ในแท็บใหม่แทน',
    categories: 'หมวดหมู่อิโมจิ'
  };

  /* ------------------------------------------------------------------ */
  /* Utilitas                                                            */
  /* ------------------------------------------------------------------ */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var key;
    if (attrs) {
      for (key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) {
          if (key === 'className') {
            node.className = attrs[key];
          } else if (key === 'text') {
            node.textContent = attrs[key];
          } else {
            node.setAttribute(key, attrs[key]);
          }
        }
      }
    }
    if (children) {
      children.forEach(function (child) {
        if (child) {
          node.appendChild(child);
        }
      });
    }
    return node;
  }

  function loadSettings() {
    var defaults = { style: 'twemoji', action: 'popup' };
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return defaults;
      }
      var data = JSON.parse(raw);
      return {
        style: STYLES[data.style] ? data.style : defaults.style,
        action: ['popup', 'download', 'copy'].indexOf(data.action) > -1 ? data.action : defaults.action
      };
    } catch (e) {
      return defaults;
    }
  }

  function saveSettings(settings) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      /* abaikan: localStorage bisa dinonaktifkan */
    }
  }

  function codePoints(emoji) {
    return Array.from(emoji).map(function (ch) {
      return ch.codePointAt(0).toString(16);
    });
  }

  /* Daftar URL kandidat (urut prioritas) karena nama file tiap set berbeda
     dalam hal penulisan variation selector (fe0f). */
  function candidates(emoji, styleKey, ext) {
    var style = STYLES[styleKey];
    var full = codePoints(emoji);
    var stripped = full.filter(function (cp) {
      return cp !== 'fe0f';
    });
    var hasZwj = full.indexOf('200d') > -1;
    var order;

    if (styleKey === 'twemoji') {
      order = hasZwj ? [full, stripped] : [stripped, full];
    } else {
      order = [full, stripped];
    }

    var urls = [];
    order.forEach(function (parts) {
      var code = style.prefix + parts.join(style.sep);
      var url = style[ext](code);
      if (urls.indexOf(url) === -1) {
        urls.push(url);
      }
    });
    return urls;
  }

  function fileName(emoji, styleKey, ext) {
    return 'emoji-' + styleKey + '-' + codePoints(emoji).join('-') + '.' + ext;
  }

  function fetchFirst(urls, index) {
    if (index >= urls.length) {
      return Promise.reject(new Error('not-found'));
    }
    return fetch(urls[index], { mode: 'cors' })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('http-' + res.status);
        }
        return res.blob();
      })
      .catch(function () {
        return fetchFirst(urls, index + 1);
      });
  }

  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        var ok = document.execCommand('copy');
        document.body.removeChild(area);
        if (ok) {
          resolve();
        } else {
          reject(new Error('copy-failed'));
        }
      } catch (err) {
        document.body.removeChild(area);
        reject(err);
      }
    });
  }

  /* Pasang gambar dengan fallback otomatis ke URL kandidat berikutnya,
     dan terakhir ke karakter emoji asli jika semua gagal. */
  function bindImage(img, emoji, styleKey) {
    var list = candidates(emoji, styleKey, 'png');
    var index = 0;

    img.onerror = function () {
      index += 1;
      if (index < list.length) {
        img.src = list[index];
      } else {
        img.onerror = null;
        var fallback = el('span', { className: 'ed-fallback', text: emoji, 'aria-hidden': 'true' });
        if (img.parentNode) {
          img.parentNode.replaceChild(fallback, img);
        }
      }
    };
    img.src = list[0];
  }

  /* ------------------------------------------------------------------ */
  /* Aplikasi                                                            */
  /* ------------------------------------------------------------------ */

  function init() {
    var root = document.getElementById('emojiDownloadApp');
    if (!root || root.getAttribute('data-ready') === '1') {
      return;
    }
    root.setAttribute('data-ready', '1');
    root.className = (root.className ? root.className + ' ' : '') + 'emoji-download';
    root.textContent = '';

    var settings = loadSettings();
    var gridButtons = [];
    var lastFocus = null;
    var toastTimer = null;

    /* ---- Kontrol pengaturan ---- */
    function radioGroup(name, legend, options, current, onChange) {
      var group = el('fieldset', { className: 'ed-group' }, [el('legend', { text: legend })]);
      options.forEach(function (opt) {
        var input = el('input', { type: 'radio', name: name, value: opt.value });
        if (opt.value === current) {
          input.checked = true;
        }
        input.addEventListener('change', function () {
          if (input.checked) {
            onChange(opt.value);
          }
        });
        group.appendChild(el('label', { className: 'ed-radio' }, [input, el('span', { text: opt.label })]));
      });
      return group;
    }

    var controls = el('div', { className: 'ed-controls' }, [
      radioGroup(
        'ed-style',
        TEXT.styleLabel,
        [
          { value: 'twemoji', label: 'Twitter Emoji (Twemoji)' },
          { value: 'noto', label: 'Google Emoji (Noto)' }
        ],
        settings.style,
        function (value) {
          settings.style = value;
          saveSettings(settings);
          refreshGrid();
        }
      ),
      radioGroup(
        'ed-action',
        TEXT.actionLabel,
        [
          { value: 'popup', label: TEXT.actionPopup },
          { value: 'download', label: TEXT.actionDownload + ' .PNG' },
          { value: 'copy', label: TEXT.actionCopy }
        ],
        settings.action,
        function (value) {
          settings.action = value;
          saveSettings(settings);
        }
      )
    ]);

    /* ---- Navigasi kategori ---- */
    var nav = el('nav', { className: 'ed-nav', 'aria-label': TEXT.categories });
    CATEGORIES.forEach(function (cat) {
      var first = Array.from(cat.emojis.split(' ')[0]).join('');
      nav.appendChild(el('a', { href: '#ed-' + cat.id, text: first + ' ' + cat.label }));
    });

    var hint = el('p', { className: 'ed-hint', text: TEXT.hint });

    /* ---- Grid emoji ---- */
    var gridWrap = el('div', { className: 'ed-categories' });

    CATEGORIES.forEach(function (cat) {
      var heading = el('h3', { className: 'ed-cat-title', id: 'ed-' + cat.id, text: cat.label });
      var grid = el('div', { className: 'ed-grid', role: 'list' });

      cat.emojis.split(' ').forEach(function (emoji) {
        if (!emoji) {
          return;
        }
        var img = el('img', {
          className: 'ed-img',
          alt: '',
          width: '36',
          height: '36',
          loading: 'lazy',
          decoding: 'async'
        });
        var btn = el('button', {
          type: 'button',
          className: 'ed-emoji',
          role: 'listitem',
          'aria-label': emoji
        }, [img]);
        btn._emoji = emoji;
        btn._img = img;
        bindImage(img, emoji, settings.style);
        gridButtons.push(btn);
        grid.appendChild(btn);
      });

      gridWrap.appendChild(heading);
      gridWrap.appendChild(grid);
    });

    function refreshGrid() {
      gridButtons.forEach(function (btn) {
        var current = btn.querySelector('.ed-fallback');
        var img = btn._img;
        if (current) {
          current.parentNode.replaceChild(img, current);
        }
        bindImage(img, btn._emoji, settings.style);
      });
    }

    /* ---- Toast ---- */
    var toast = el('div', { className: 'ed-toast', role: 'status', 'aria-live': 'polite' });

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2200);
    }

    /* ---- Aksi: copy & download ---- */
    function doCopy(emoji) {
      copyText(emoji).then(
        function () {
          showToast(TEXT.copied + ' ' + emoji);
        },
        function () {
          showToast(TEXT.copyFailed);
        }
      );
    }

    function doDownload(emoji, styleKey, ext) {
      var urls = candidates(emoji, styleKey, ext);
      showToast(TEXT.downloading);
      fetchFirst(urls, 0).then(
        function (blob) {
          saveBlob(blob, fileName(emoji, styleKey, ext));
          showToast(TEXT.downloaded);
        },
        function () {
          showToast(TEXT.downloadFailed);
          window.open(urls[0], '_blank', 'noopener');
        }
      );
    }

    /* ---- Popup ---- */
    var overlay = el('div', { className: 'ed-overlay', hidden: '' });
    var dialog = el('div', {
      className: 'ed-dialog',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'ed-dialog-title'
    });
    overlay.appendChild(dialog);

    function closeDialog() {
      overlay.hidden = true;
      document.body.classList.remove('ed-no-scroll');
      dialog.textContent = '';
      if (lastFocus && lastFocus.focus) {
        lastFocus.focus();
      }
    }

    function openDialog(emoji) {
      dialog.textContent = '';

      var closeBtn = el('button', {
        type: 'button',
        className: 'ed-close',
        'aria-label': TEXT.close,
        text: '×'
      });
      closeBtn.addEventListener('click', closeDialog);

      var title = el('h4', { className: 'ed-dialog-title', id: 'ed-dialog-title', text: TEXT.dialogTitle });

      var previewImg = el('img', { className: 'ed-preview-img', alt: emoji, width: '72', height: '72' });
      bindImage(previewImg, emoji, settings.style);

      var copyBtn = el('button', { type: 'button', className: 'ed-btn', text: TEXT.copyEmoji + ' ' + emoji });
      copyBtn.addEventListener('click', function () {
        doCopy(emoji);
      });

      var preview = el('div', { className: 'ed-preview' }, [previewImg, copyBtn]);

      var table = el('table', { className: 'ed-table' });
      var thead = el('thead', null, [
        el('tr', null, [
          el('th', { scope: 'col', text: '' }),
          el('th', { scope: 'col', text: STYLES.twemoji.label }),
          el('th', { scope: 'col', text: STYLES.noto.label })
        ])
      ]);
      var tbody = el('tbody');

      ['png', 'svg'].forEach(function (ext) {
        var row = el('tr', null, [el('th', { scope: 'row', text: '.' + ext.toUpperCase() })]);
        ['twemoji', 'noto'].forEach(function (styleKey) {
          var btn = el('button', {
            type: 'button',
            className: 'ed-btn ed-btn-dl',
            'aria-label': TEXT.actionDownload + ' .' + ext.toUpperCase() + ' ' + STYLES[styleKey].label,
            text: '↓'
          });
          btn.addEventListener('click', function () {
            doDownload(emoji, styleKey, ext);
          });
          row.appendChild(el('td', null, [btn]));
        });
        tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      dialog.appendChild(closeBtn);
      dialog.appendChild(title);
      dialog.appendChild(preview);
      dialog.appendChild(table);

      overlay.hidden = false;
      document.body.classList.add('ed-no-scroll');
      closeBtn.focus();
    }

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeDialog();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !overlay.hidden) {
        closeDialog();
      }
    });

    /* ---- Klik pada emoji (event delegation) ---- */
    gridWrap.addEventListener('click', function (event) {
      var target = event.target;
      while (target && target !== gridWrap && !target._emoji) {
        target = target.parentNode;
      }
      if (!target || !target._emoji) {
        return;
      }
      var emoji = target._emoji;
      lastFocus = target;

      if (settings.action === 'download') {
        doDownload(emoji, settings.style, 'png');
      } else if (settings.action === 'copy') {
        doCopy(emoji);
      } else {
        openDialog(emoji);
      }
    });

    /* ---- Susun ke halaman ---- */
    root.appendChild(controls);
    root.appendChild(hint);
    root.appendChild(nav);
    root.appendChild(gridWrap);
    root.appendChild(overlay);
    root.appendChild(toast);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
