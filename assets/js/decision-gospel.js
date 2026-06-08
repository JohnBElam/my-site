(function () {
  'use strict';

  var nav = document.querySelector('[data-gospel-nav]');
  if (!nav) return;

  var mobileQuery = window.matchMedia('(max-width: 768px)');
  var lastScrollY = window.scrollY || window.pageYOffset || 0;

  function showNav() {
    nav.classList.remove('is-hidden');
  }

  function updateNav() {
    var currentScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);

    if (!mobileQuery.matches) {
      showNav();
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= 0 || currentScrollY < lastScrollY) {
      showNav();
    } else if (currentScrollY > lastScrollY && currentScrollY > nav.offsetHeight) {
      nav.classList.add('is-hidden');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', updateNav);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(updateNav);
  }
})();
