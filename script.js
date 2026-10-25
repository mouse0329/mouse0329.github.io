document.addEventListener('DOMContentLoaded', function () {
  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});
