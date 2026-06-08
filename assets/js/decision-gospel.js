(function () {
  'use strict';

  var nav = document.querySelector('[data-gospel-nav]');
  if (!nav) return;

  var mobileQuery = window.matchMedia('(max-width: 768px)');
  var lastScrollY = window.scrollY || window.pageYOffset || 0;
  var lastTouchY = null;

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

  function hideNavIfScrolled() {
    if (!mobileQuery.matches) return;
    if (Math.max(window.scrollY || window.pageYOffset || 0, 0) > nav.offsetHeight) {
      nav.classList.add('is-hidden');
    }
  }

  function handleWheel(event) {
    if (event.deltaY < 0) {
      showNav();
    } else if (event.deltaY > 0) {
      hideNavIfScrolled();
    }
  }

  function handleTouchStart(event) {
    if (!event.touches || event.touches.length === 0) return;
    lastTouchY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    if (!event.touches || event.touches.length === 0 || lastTouchY === null) return;

    var currentTouchY = event.touches[0].clientY;
    var deltaY = currentTouchY - lastTouchY;

    if (deltaY > 2) {
      showNav();
    } else if (deltaY < -2) {
      hideNavIfScrolled();
    }

    lastTouchY = currentTouchY;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('resize', updateNav);
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', updateNav);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(updateNav);
  }
})();
