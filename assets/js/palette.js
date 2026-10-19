(function () {
  var root = document.getElementById('pal');
  if (!root) return;
  var out = document.getElementById('pal-out');
  var status = document.getElementById('pal-status');
  var joiner = root.getAttribute('data-joiner') || '';
  var timer;

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function say(msg) {
    if (!status) return;
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; }, 1800);
  }

  function copyAll() {
    if (!out.value) { say('ยังไม่มีข้อความให้คัดลอก'); return; }
    copyText(out.value).then(function () { say('คัดลอกแล้ว'); }, function () { say('คัดลอกไม่สำเร็จ กรุณาเลือกข้อความแล้วคัดลอกเอง'); });
  }

  root.addEventListener('click', function (e) {
    var chip = e.target.closest ? e.target.closest('.chip') : null;
    if (!chip) return;
    out.value += (out.value && joiner ? joiner : '') + chip.getAttribute('data-v');
    copyAll();
  });
  document.getElementById('pal-copy').addEventListener('click', copyAll);
  document.getElementById('pal-clear').addEventListener('click', function () { out.value = ''; out.focus(); });
})();
