(function () {
  'use strict';

  // ----- Prevent scroll-to-bottom on load (restoration or form focus) -----
  if (typeof history !== 'undefined' && history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('DOMContentLoaded', function () { window.scrollTo(0, 0); });
  window.addEventListener('load', function () { window.scrollTo(0, 0); });

  // ----- Mobile nav toggle -----
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('is-open', !expanded);
    });
  }

  // ----- Marquee: JS-driven so hover only changes speed (no restart) -----
  (function () {
    var wrap = document.querySelector('.marquee-wrap');
    var track = document.querySelector('.marquee');
    if (!wrap || !track) return;

    var speed = 0.9;
    var slowSpeed = 0.15;
    var offset = 0;
    var halfWidth = 0;
    var rafId = null;
    var isHover = false;

    function measure() {
      halfWidth = track.offsetWidth / 2;
    }

    function tick() {
      offset -= isHover ? slowSpeed : speed;
      if (offset <= -halfWidth) offset += halfWidth;
      track.style.transform = 'translateX(' + offset + 'px)';
      rafId = requestAnimationFrame(tick);
    }

    wrap.addEventListener('mouseenter', function () { isHover = true; });
    wrap.addEventListener('mouseleave', function () { isHover = false; });

    window.addEventListener('resize', measure);
    measure();
    rafId = requestAnimationFrame(tick);
  })();

  // ----- Scroll reveal: add .is-visible when element enters view -----
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.01 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ----- Testimonials carousel: auto-scroll + dots -----
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var slides = carousel.querySelectorAll('[data-slide]');
    var dots = carousel.querySelectorAll('[data-dot]');
    var current = 0;
    var total = slides.length;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
      });
    });

    setInterval(function () {
      goTo(current + 1);
    }, 5500);
  }

  // ----- Typing effect on hero tagline -----
  var taglineEl = document.querySelector('.typed-tagline');
  if (taglineEl) {
    var fullText = taglineEl.getAttribute('data-typed') || taglineEl.textContent;
    if (fullText) {
      taglineEl.textContent = '';
      var cursor = document.createElement('span');
      cursor.className = 'typed-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      taglineEl.appendChild(cursor);

      var index = 0;
      var speed = 50;

      function typeChar() {
        if (index < fullText.length) {
          var span = document.createTextNode(fullText.charAt(index));
          taglineEl.insertBefore(span, cursor);
          index++;
          setTimeout(typeChar, speed);
        } else {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
        }
      }

      setTimeout(typeChar, 400);
    }
  }
})();
