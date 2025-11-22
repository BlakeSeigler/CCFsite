/* Smooth scrolling for in-page navigation */
(function () {
  var navLinks = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + targetId);
      }
    });
  }
})();

/* Header style on scroll */
(function () {
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Footer year */
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    var year = new Date().getFullYear();
    yearEl.textContent = String(year);
  }
})();


