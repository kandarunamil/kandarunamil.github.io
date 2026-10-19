(function () {
  var btn = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  if (!btn || !menu) return;
  function set(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
    menu.classList.toggle('is-open', open);
  }
  btn.addEventListener('click', function () {
    set(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') set(false);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') set(false);
  });
})();
