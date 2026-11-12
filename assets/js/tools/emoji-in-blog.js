/* emoji-in-blog.js : blog emoji copy tool. Pure JavaScript, no HTML or markdown inside. */
(function () {
  'use strict';

  var TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/';
  var NOTO_BASE = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/png/128/';
  var SIZES = [16, 20, 24, 28, 32, 36, 48];
  var MAX_RECENTS = 40;
  var KEYS = { provider: 'eib-provider', size: 'eib-size', recents: 'eib-recents' };

  var FLAG_CODES = (
    'AC AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ ' +
    'CA CC CD CF CG CH CI CK CL CM CN CO CP CQ CR CU CV CW CX CY CZ DE DG DJ DK DM DO DZ EA EC EE EG EH ER ES ET EU ' +
    'FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU IC ID IE IL IM IN IO ' +
    'IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ' +
    'ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR ' +
    'PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TA TC TD TF TG TH TJ ' +
    'TK TL TM TN TO TR TT TV TW TZ UA UG UM UN US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW'
  ).split(' ');

  var SUBDIVISION_FLAGS = ['gbeng', 'gbsct', 'gbwls'];

  var DATA = {
    smileys_people: '😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇🥰😍🤩😘😗☺️😚😙🥲😋😛😜🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶🫥😶‍🌫️😏😒🙄😬😮‍💨🤥🫨🙂‍↔️🙂‍↕️😌😔😪🤤😴🫩😷🤒🤕🤢🤮🤧🥵🥶🥴😵😵‍💫🤯🤠🥳🥸😎🤓🧐😕🫤😟🙁☹️😮😯😲😳🫪🥺🥹😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊💋💯💢🫯💥💫💦💨🕳️💤👋🤚🖐️✋🖖🫱🫲🫳🫴🫷🫸👌🤌🤏✌️🤞🫰🤟🤘🤙👈👉👆🖕👇☝️🫵👍👎✊👊🤛🤜👏🙌🫶👐🤲🤝🙏✍️💅🤳💪🦾🦿🦵🦶👂🦻👃🧠🫀🫁🦷🦴👀👁️👅👄🫦👶🧒👦👧🧑👱👨🧔👨‍🦰👨‍🦱👨‍🦳👨‍🦲👩👩‍🦰🧑‍🦰👩‍🦱🧑‍🦱👩‍🦳🧑‍🦳👩‍🦲🧑‍🦲👱‍♀️👱‍♂️🧓👴👵🙍🙍‍♂️🙍‍♀️🙎🙎‍♂️🙎‍♀️🙅🙅‍♂️🙅‍♀️🙆🙆‍♂️🙆‍♀️💁💁‍♂️💁‍♀️🙋🙋‍♂️🙋‍♀️🧏🧏‍♂️🧏‍♀️🙇🙇‍♂️🙇‍♀️🤦🤦‍♂️🤦‍♀️🤷🤷‍♂️🤷‍♀️🫅🤴👸👳👲🧕🤵👰🤰🤱👩‍🍼👨‍🍼🧑‍🍼🧑‍🩰💃🕺🛀🛌🧑‍🤝‍🧑👭👫👬💏👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩💌💘💝💖💗💓💞💕💟❣️💔❤️‍🔥❤️‍🩹❤️🩷🧡💛💚💙🩵💜🤎🖤🩶🤍',

    animals_nature: '🐵🐒🦍🦧🐶🐕🦮🐕‍🦺🐩🐺🦊🦝🐱🐈🐈‍⬛🦁🐯🐅🐆🐴🫎🫏🐎🦄🦓🦌🦬🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦣🦏🦛🐭🐁🐀🐹🐰🐇🐿️🦫🦔🦇🐻🐻‍❄️🐨🐼🦥🦦🦨🦘🦡🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊️🦅🦆🦢🦉🦤🪶🦩🦚🦜🪽🐦‍⬛🪿🐦‍🔥🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🫍🦭🐟🐠🐡🦈🐙🐚🪸🪼🦀🦞🦐🦑🦪🐌🦋🐛🐜🐝🪲🐞🦗🪳🕷️🕸️🦂🦟🪰🪱🦠💐🌸💮🪷🏵️🌹🥀🌺🌻🌼🌷🪻🌱🪴🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🪹🪺🍄🪾',

    food_drink: '🍇🍈🍉🍊🍋🍋‍🟩🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🥑🍆🥔🥕🌽🌶️🫑🥒🥬🥦🧄🧅🥜🫘🌰🫚🫛🍄‍🟫🫜🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛☕🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🫗🥤🧋🧃🧉🧊🥢🍽️🍴🥄🔪🫙🏺',

    activities: '🎃🎄🎆🎇🧨✨🎈🎉🎊🎋🎍🎎🎏🎐🎑🧧🎀🎁🎗️🎟️🎫🎖️🏆🏅🥇🥈🥉⚽⚾🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅⛳⛸️🎣🤿🎽🎿🛷🥌🎯🪀🪁🔫🎱🔮🪄🎮🕹️🎰🎲🧩🧸🪅🪩🪆♠️♥️♦️♣️♟️🃏🀄🎴🎭🖼️🎨🧵🪡🧶🪢🧑‍⚕️👨‍⚕️👩‍⚕️🧑‍🎓👨‍🎓👩‍🎓🧑‍🏫👨‍🏫👩‍🏫🧑‍⚖️👨‍⚖️👩‍⚖️🧑‍🌾👨‍🌾👩‍🌾🧑‍🍳👨‍🍳👩‍🍳🧑‍🔧👨‍🔧👩‍🔧🧑‍🏭👨‍🏭👩‍🏭🧑‍💼👨‍💼👩‍💼🧑‍🔬👨‍🔬👩‍🔬🧑‍💻👨‍💻👩‍💻🧑‍🎤👨‍🎤👩‍🎤🧑‍🎨👨‍🎨👩‍🎨🧑‍✈️👨‍✈️👩‍✈️🧑‍🚀👨‍🚀👩‍🚀🧑‍🚒👨‍🚒👩‍🚒👮👮‍♂️👮‍♀️🕵️🕵️‍♂️🕵️‍♀️💂💂‍♂️💂‍♀️🥷👷👷‍♂️👷‍♀️👼🎅🤶🧑‍🎄🦸🦸‍♂️🦸‍♀️🦹🦹‍♂️🦹‍♀️🧙🧙‍♂️🧙‍♀️🧚🧚‍♂️🧚‍♀️🧛🧛‍♂️🧛‍♀️🧜🧜‍♂️🧜‍♀️🧝🧝‍♂️🧝‍♀️🧞🧞‍♂️🧞‍♀️🧟🧟‍♂️🧟‍♀️🧌🫈🧔🧔‍♂️🧔‍♀️👳👳‍♂️👳‍♀️🤵🤵‍♂️🤵‍♀️👰👰‍♂️👰‍♀️🤰🫃🫄💆💆‍♂️💆‍♀️🚶🚶‍♂️🚶‍♀️🚶‍➡️🚶‍♀️‍➡️🚶‍♂️‍➡️🧍🧍‍♂️🧍‍♀️🧎🧎‍♂️🧎‍♀️🧎‍➡️🧎‍♀️‍➡️🧎‍♂️‍➡️🧑‍🦯🧑‍🦯‍➡️👨‍🦯👨‍🦯‍➡️👩‍🦯👩‍🦯‍➡️🧑‍🦼🧑‍🦼‍➡️👨‍🦼👨‍🦼‍➡️👩‍🦼👩‍🦼‍➡️🧑‍🦽🧑‍🦽‍➡️👨‍🦽👨‍🦽‍➡️👩‍🦽👩‍🦽‍➡️🏃🏃‍♂️🏃‍♀️🏃‍➡️🏃‍♀️‍➡️🏃‍♂️‍➡️💇💇‍♂️💇‍♀️🕴️👯👯‍♂️👯‍♀️🧖🧖‍♂️🧖‍♀️🧗🧗‍♂️🧗‍♀️🤺🏇⛷️🏂🏌️🏌️‍♂️🏌️‍♀️🏄🏄‍♂️🏄‍♀️🚣🚣‍♂️🚣‍♀️🏊🏊‍♂️🏊‍♀️⛹️⛹️‍♂️⛹️‍♀️🏋️🏋️‍♂️🏋️‍♀️🚴🚴‍♂️🚴‍♀️🚵🚵‍♂️🚵‍♀️🤸🤸‍♂️🤸‍♀️🤼🤼‍♂️🤼‍♀️🤽🤽‍♂️🤽‍♀️🤾🤾‍♂️🤾‍♀️🤹🤹‍♂️🤹‍♀️🧘🧘‍♂️🧘‍♀️',

    travel_places: '🌍🌎🌏🌐🗺️🗾🧭🏔️⛰️🛘🌋🗻🏕️🏖️🏜️🏝️🏞️🏟️🏛️🏗️🧱🪨🪵🛖🏘️🏚️🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪🕌🛕🕍⛩️🕋⛲⛺🌁🌃🏙️🌄🌅🌆🌇🌉♨️🎠🛝🎡🎢💈🎪🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🛻🚚🚛🚜🏎️🏍️🛵🦽🦼🛺🚲🛴🛹🛼🚏🛣️🛤️🛢️⛽🛞🚨🚥🚦🛑🚧⚓🛟⛵🛶🚤🛳️⛴️🛥️🚢✈️🛩️🛫🛬🪂💺🚁🚟🚠🚡🛰️🚀🛸🛎️🧳⌛⏳⌚⏰⏱️⏲️🕰️🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌡️☀️🌝🌞🪐⭐🌟🌠🌌☁️⛅⛈️🌤️🌥️🌦️🌧️🌨️🌩️🌪️🌫️🌬️🌀🌈🌂☂️☔⛱️⚡❄️☃️⛄☄️🔥💧🌊',

    objects: '👓🕶️🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚🪭👛👜👝🛍️🎒🩴👞👟🥾🥿👠👡🩰👢🪮👑👒🎩🎓🧢🪖⛑️📿💄💍💎🔇🔈🔉🔊📢📣📯🔔🔕🎼🎵🎶🎙️🎚️🎛️🎤🎧📻🎷🎺🪊🪗🎸🎹🎻🪕🥁🪘🪇🪈🪉📱📲☎️📞📟📠🔋🪫🔌💻🖥️🖨️⌨️🖱️🖲️💽💾💿📀🧮🎥🎞️📽️🎬📺📷📸📹📼🔍🔎🕯️💡🔦🏮🪔📔📕📖📗📘📙📚📓📒📃📜📄📰🗞️📑🔖🏷️🪙💰🪎💴💵💶💷💸💳🧾💹✉️📧📨📩📤📥📦📫📪📬📭📮🗳️✏️✒️🖋️🖊️🖌️🖍️📝💼📁📂🗂️📅📆🗒️🗓️📇📈📉📊📋📌📍📎🖇️📏📐✂️🗃️🗄️🗑️🔒🔓🔏🔐🔑🗝️🔨🪓⛏️⚒️🛠️🗡️⚔️💣🪃🏹🛡️🪚🔧🪛🔩⚙️🗜️⚖️🦯🔗⛓️‍💥⛓️🪝🧰🧲🪜🪏⚗️🧪🧫🧬🔬🔭📡💉🩸💊🩹🩼🩺🩻🚪🛗🪞🪟🛏️🛋️🪑🚽🪠🚿🛁🪤🪒🧴🧷🧹🧺🧻🪣🧼🫧🪥🧽🧯🛒🚬⚰️🪦⚱️🧿🪬🗿🪧🪪',

    symbols: '🏧🚮🚰♿🚹🚺🚻🚼🚾🛂🛃🛄🛅🗣️👤👥🫂👣🫆⚠️🚸⛔🚫🚳🚭🚯🚱🚷📵🔞☢️☣️⬆️↗️➡️↘️⬇️↙️⬅️↖️↕️↔️↩️↪️⤴️⤵️🔃🔄🔙🔚🔛🔜🔝🛐⚛️🕉️✡️☸️☯️✝️☦️☪️☮️🕎🔯🪯♈♉♊♋♌♍♎♏♐♑♒♓⛎🔀🔁🔂▶️⏩⏭️⏯️◀️⏪⏮️🔼⏫🔽⏬⏸️⏹️⏺️⏏️🎦🔅🔆📶🛜📳📴♀️♂️⚧️✖️➕➖➗🟰♾️‼️⁉️❓❔❕❗〰️💱💲⚕️♻️⚜️🔱📛🔰⭕✅☑️✔️❌❎➰➿〽️✳️✴️❇️©️®️™️🫟#️⃣*️⃣0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔠🔡🔢🔣🔤🅰️🆎🅱️🆑🆒🆓ℹ️🆔Ⓜ️🆕🆖🅾️🆗🅿️🆘🆙🆚🈁🈂️🈷️🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳㊗️㊙️🈺🈵🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜◼️◻️◾◽▪️▫️🔶🔷🔸🔹🔺🔻💠🔘🔳🔲💬👁️‍🗨️🗨️🗯️💭👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧👪🧑‍🧑‍🧒🧑‍🧑‍🧒‍🧒🧑‍🧒🧑‍🧒‍🧒',

    flags_head: '🏁🚩🎌🏴🏳️🏳️‍🌈🏳️‍⚧️🏴‍☠️'
  };

  var CATEGORIES = [
    { id: 'recents', name: 'ที่ใช้ล่าสุด', icon: '🕘' },
    { id: 'smileys_people', name: 'หน้ายิ้มและผู้คน', icon: '😀' },
    { id: 'animals_nature', name: 'สัตว์และธรรมชาติ', icon: '🐶' },
    { id: 'food_drink', name: 'อาหารและเครื่องดื่ม', icon: '🍔' },
    { id: 'activities', name: 'กิจกรรม', icon: '⚽' },
    { id: 'travel_places', name: 'การเดินทางและสถานที่', icon: '🚗' },
    { id: 'objects', name: 'สิ่งของ', icon: '💡' },
    { id: 'symbols', name: 'สัญลักษณ์', icon: '❤️' },
    { id: 'flags', name: 'ธง', icon: '🏁' }
  ];

  /* ---------- helpers ---------- */

  function storageGet(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (err) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* storage unavailable: ignore */
    }
  }

  function segment(str) {
    var out;
    if (window.Intl && typeof Intl.Segmenter === 'function') {
      try {
        var seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        out = Array.from(seg.segment(str), function (item) {
          return item.segment;
        });
      } catch (err) {
        out = null;
      }
    }
    if (out) {
      return out;
    }
    try {
      var re = new RegExp(
        '\\u{1F3F4}[\\u{E0020}-\\u{E007F}]+' +
          '|[#*0-9]\\uFE0F?\\u20E3' +
          '|\\p{Extended_Pictographic}[\\uFE0F\\u{1F3FB}-\\u{1F3FF}]*' +
          '(?:\\u200D\\p{Extended_Pictographic}[\\uFE0F\\u{1F3FB}-\\u{1F3FF}]*)*',
        'gu'
      );
      return str.match(re) || [];
    } catch (err) {
      return Array.from(str);
    }
  }

  function unique(list) {
    var seen = {};
    return list.filter(function (item) {
      if (seen[item]) {
        return false;
      }
      seen[item] = true;
      return true;
    });
  }

  function buildFlags() {
    var list = segment(DATA.flags_head);
    FLAG_CODES.forEach(function (code) {
      list.push(
        String.fromCodePoint(0x1f1e6 + code.charCodeAt(0) - 65, 0x1f1e6 + code.charCodeAt(1) - 65)
      );
    });
    SUBDIVISION_FLAGS.forEach(function (tag) {
      var chars = tag.split('').map(function (c) {
        return String.fromCodePoint(0xe0000 + c.charCodeAt(0));
      });
      list.push(String.fromCodePoint(0x1f3f4) + chars.join('') + String.fromCodePoint(0xe007f));
    });
    return list;
  }

  function buildEmojiLists() {
    var lists = {};
    Object.keys(DATA).forEach(function (key) {
      if (key !== 'flags_head') {
        lists[key] = unique(segment(DATA[key]));
      }
    });
    lists.flags = unique(buildFlags());
    return lists;
  }

  function codePoints(str) {
    return Array.from(str).map(function (ch) {
      return ch.codePointAt(0).toString(16);
    });
  }

  function imageUrls(emoji, provider) {
    var urls = [];
    if (provider === 'google') {
      urls.push(NOTO_BASE + 'emoji_u' + codePoints(emoji).join('_') + '.png');
      var stripped = emoji.replace(/\uFE0F/g, '');
      if (stripped !== emoji) {
        urls.push(NOTO_BASE + 'emoji_u' + codePoints(stripped).join('_') + '.png');
      }
    } else {
      var name = emoji.indexOf('\u200D') < 0 ? emoji.replace(/\uFE0F/g, '') : emoji;
      urls.push(TWEMOJI_BASE + codePoints(name).join('-') + '.png');
    }
    return urls;
  }

  function legacyCopy(html, plain) {
    var done = false;
    function onCopy(event) {
      if (event.clipboardData) {
        event.clipboardData.setData('text/html', html);
        event.clipboardData.setData('text/plain', plain);
        event.preventDefault();
        done = true;
      }
    }
    var area = document.createElement('textarea');
    area.value = plain;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(area);
    document.addEventListener('copy', onCopy);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.removeEventListener('copy', onCopy);
    document.body.removeChild(area);
    return done || ok;
  }

  function copyRich(html, plain) {
    if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
      try {
        var item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        });
        return navigator.clipboard.write([item]).then(
          function () {
            return true;
          },
          function () {
            return legacyCopy(html, plain);
          }
        );
      } catch (err) {
        return Promise.resolve(legacyCopy(html, plain));
      }
    }
    return Promise.resolve(legacyCopy(html, plain));
  }

  /* ---------- app ---------- */

  function init() {
    var root = document.getElementById('emoji-in-blog');
    if (!root) {
      return;
    }

    var tabsEl = document.getElementById('eib-tabs');
    var gridEl = document.getElementById('eib-grid');
    var emptyEl = document.getElementById('eib-empty');
    var clearBtn = document.getElementById('eib-clear');
    var sizeEl = document.getElementById('eib-size');
    var codeEl = document.getElementById('eib-code');
    var previewEl = document.getElementById('eib-preview');
    var copyBtn = document.getElementById('eib-copy');
    var toastEl = document.getElementById('eib-toast');
    var providerBtns = root.querySelectorAll('[data-provider]');

    if (!tabsEl || !gridEl) {
      return;
    }

    var lists = buildEmojiLists();
    var provider = storageGet(KEYS.provider, 'twitter') === 'google' ? 'google' : 'twitter';
    var size = parseInt(storageGet(KEYS.size, '20'), 10);
    if (SIZES.indexOf(size) < 0) {
      size = 20;
    }
    var recents = [];
    try {
      var parsed = JSON.parse(storageGet(KEYS.recents, '[]'));
      if (Array.isArray(parsed)) {
        recents = parsed
          .filter(function (item) {
            return typeof item === 'string';
          })
          .slice(0, MAX_RECENTS);
      }
    } catch (err) {
      recents = [];
    }
    var current = recents.length ? 'recents' : 'smileys_people';
    var toastTimer = null;
    var lastHtml = '';

    function showToast(message) {
      if (!toastEl) {
        return;
      }
      toastEl.textContent = message;
      toastEl.classList.add('is-on');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toastEl.classList.remove('is-on');
      }, 1800);
    }

    function applySize() {
      root.style.setProperty('--eib-size', size + 'px');
      if (sizeEl) {
        sizeEl.value = String(size);
      }
    }

    function applyProviderButtons() {
      Array.prototype.forEach.call(providerBtns, function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-provider') === provider ? 'true' : 'false');
      });
    }

    function buildTabs() {
      tabsEl.textContent = '';
      CATEGORIES.forEach(function (cat) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'eib-tab';
        btn.setAttribute('data-cat', cat.id);
        btn.textContent = cat.icon + ' ' + cat.name;
        tabsEl.appendChild(btn);
      });
    }

    function markTabs() {
      Array.prototype.forEach.call(tabsEl.children, function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-cat') === current ? 'true' : 'false');
      });
    }

    function makeItem(emoji) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'eib-item';
      btn.setAttribute('data-e', emoji);
      btn.setAttribute('aria-label', 'คัดลอกอีโมจิ ' + emoji);
      btn.title = emoji;
      var img = document.createElement('img');
      img.alt = '';
      img.width = 72;
      img.height = 72;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.setAttribute('data-n', '0');
      img.src = imageUrls(emoji, provider)[0];
      btn.appendChild(img);
      return btn;
    }

    function render() {
      var list = current === 'recents' ? recents : lists[current] || [];
      gridEl.textContent = '';
      var frag = document.createDocumentFragment();
      list.forEach(function (emoji) {
        frag.appendChild(makeItem(emoji));
      });
      gridEl.appendChild(frag);
      gridEl.scrollTop = 0;
      var isRecents = current === 'recents';
      if (emptyEl) {
        emptyEl.hidden = !(isRecents && list.length === 0);
      }
      if (clearBtn) {
        clearBtn.hidden = !(isRecents && list.length > 0);
      }
      markTabs();
    }

    function pushRecent(emoji) {
      recents = recents.filter(function (item) {
        return item !== emoji;
      });
      recents.unshift(emoji);
      recents = recents.slice(0, MAX_RECENTS);
      storageSet(KEYS.recents, JSON.stringify(recents));
    }

    function setOutput(html, imgSrc, emoji) {
      lastHtml = html;
      if (codeEl) {
        codeEl.value = html;
      }
      if (previewEl) {
        previewEl.textContent = '';
        if (imgSrc) {
          var pimg = document.createElement('img');
          pimg.src = imgSrc;
          pimg.alt = emoji;
          previewEl.appendChild(pimg);
        } else {
          previewEl.textContent = emoji;
        }
      }
    }

    function handlePick(btn) {
      var emoji = btn.getAttribute('data-e');
      var img = btn.querySelector('img');
      var src = img ? img.getAttribute('src') : '';
      var html;
      var plain;
      if (src) {
        plain = '<img src="' + src + '" alt="' + emoji + '" width="' + size + '" height="' + size + '" />';
        html = plain;
      } else {
        plain = emoji;
        html = emoji;
      }
      setOutput(plain, src, emoji);
      pushRecent(emoji);
      copyRich(html, plain).then(function (ok) {
        showToast(ok ? 'คัดลอกแล้ว ' + emoji : 'คัดลอกไม่สำเร็จ กรุณาคัดลอกจากช่องโค้ดด้านล่าง');
      });
    }

    /* image fallback: error events do not bubble, so listen in the capture phase */
    gridEl.addEventListener(
      'error',
      function (event) {
        var img = event.target;
        if (!img || img.tagName !== 'IMG') {
          return;
        }
        var btn = img.parentNode;
        var emoji = btn && btn.getAttribute ? btn.getAttribute('data-e') : null;
        if (!emoji) {
          return;
        }
        var urls = imageUrls(emoji, provider);
        var next = parseInt(img.getAttribute('data-n') || '0', 10) + 1;
        if (urls[next]) {
          img.setAttribute('data-n', String(next));
          img.src = urls[next];
          return;
        }
        var span = document.createElement('span');
        span.className = 'eib-native';
        span.textContent = emoji;
        btn.replaceChild(span, img);
      },
      true
    );

    gridEl.addEventListener('click', function (event) {
      var node = event.target;
      while (node && node !== gridEl && !(node.classList && node.classList.contains('eib-item'))) {
        node = node.parentNode;
      }
      if (node && node !== gridEl) {
        handlePick(node);
      }
    });

    tabsEl.addEventListener('click', function (event) {
      var btn = event.target;
      while (btn && btn !== tabsEl && !(btn.getAttribute && btn.getAttribute('data-cat'))) {
        btn = btn.parentNode;
      }
      if (btn && btn !== tabsEl) {
        current = btn.getAttribute('data-cat');
        render();
      }
    });

    Array.prototype.forEach.call(providerBtns, function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-provider') === 'google' ? 'google' : 'twitter';
        if (next === provider) {
          return;
        }
        provider = next;
        storageSet(KEYS.provider, provider);
        applyProviderButtons();
        render();
      });
    });

    if (sizeEl) {
      sizeEl.addEventListener('change', function () {
        var value = parseInt(sizeEl.value, 10);
        if (SIZES.indexOf(value) >= 0) {
          size = value;
          storageSet(KEYS.size, String(size));
          applySize();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        recents = [];
        storageSet(KEYS.recents, '[]');
        render();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (!lastHtml) {
          showToast('เลือกอีโมจิก่อน แล้วโค้ดจะแสดงในช่องนี้');
          return;
        }
        copyRich(lastHtml, lastHtml).then(function (ok) {
          showToast(ok ? 'คัดลอกโค้ดแล้ว' : 'คัดลอกไม่สำเร็จ ลองเลือกข้อความในช่องแล้วกด Ctrl+C');
        });
      });
    }

    applySize();
    applyProviderButtons();
    buildTabs();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
