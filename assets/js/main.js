/**
 * Site-wide JS for pages built on _layouts/default.html.
 *
 * Modules (run top-to-bottom, guarded by their own selectors):
 *   1. Scroll reset        — force the page to load at the top, regardless of
 *                            browser scroll restoration or form-field autofocus.
 *   2. Mobile nav toggle   — morph the three-bar button into an "X" and open
 *                            the full-screen menu (see .nav-toggle in style.css).
 *   3. Marquee             — continuous horizontal loop for featured appearances.
 *                            Expects .marquee-wrap > .marquee, with .marquee's
 *                            child list duplicated twice so the halves scroll
 *                            seamlessly. Hover slows the scroll.
 *   4. Scroll reveal       — add .is-visible to .reveal elements as they enter
 *                            the viewport; falls back to immediate reveal when
 *                            IntersectionObserver is unavailable.
 *   5. Testimonials carousel — auto-advances [data-slide] children of a
 *                              [data-carousel] host, with [data-dot] controls.
 *                              Resets to slide 0 when the section scrolls into
 *                              view so the first quote is always seen first.
 *   6. Hero typing effect  — type out .typed-tagline[data-typed], then fade the
 *                            blinking cursor.
 *
 * No framework. Everything is wrapped in a single IIFE so nothing leaks onto
 * window.
 */
(function () {
  'use strict';

  // Scroll reset — preserves "top of page" UX when the browser or a focused
  // form field would otherwise restore the previous scroll position.
  if (typeof history !== 'undefined' && history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('DOMContentLoaded', function () { window.scrollTo(0, 0); });
  window.addEventListener('load', function () { window.scrollTo(0, 0); });

  // Mobile nav toggle — keeps aria-expanded and aria-label in sync with the
  // visual hamburger-to-X morph (see .nav-toggle[aria-expanded="true"] in CSS).
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      var nextOpen = !expanded;
      toggle.setAttribute('aria-expanded', nextOpen);
      toggle.setAttribute('aria-label', nextOpen ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', nextOpen);
    });
  }

  // Marquee — JS-driven so hover only changes speed (CSS animation would
  // restart on pause). Requires .marquee's contents to be duplicated so that
  // wrapping back by halfWidth produces a seamless loop.
  (function () {
    var wrap = document.querySelector('.marquee-wrap');
    var track = document.querySelector('.marquee');
    if (!wrap || !track) return;

    var speed = 0.6;
    var slowSpeed = 0.15;
    var offset = 0;
    var halfWidth = 0;
    var isHover = false;

    function measure() {
      halfWidth = track.offsetWidth / 2;
    }

    function tick() {
      offset -= isHover ? slowSpeed : speed;
      if (offset <= -halfWidth) offset += halfWidth;
      track.style.transform = 'translateX(' + offset + 'px)';
      requestAnimationFrame(tick);
    }

    wrap.addEventListener('mouseenter', function () { isHover = true; });
    wrap.addEventListener('mouseleave', function () { isHover = false; });

    window.addEventListener('resize', measure);
    measure();
    requestAnimationFrame(tick);
  })();

  // Scroll reveal — one-shot; elements stay visible after first intersection.
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

  // Testimonials carousel — auto-advance on a timer, reset to slide 0 when the
  // section enters view, click-to-jump via [data-dot]. Bail out if no slides
  // were rendered so we don't start a no-op timer.
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var slides = carousel.querySelectorAll('[data-slide]');
    var dots = carousel.querySelectorAll('[data-dot]');
    var total = slides.length;

    if (total > 0) {
      var current = 0;
      var section = carousel.closest('section');

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

      if (section && 'IntersectionObserver' in window) {
        var testimonialObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              goTo(0);
            }
          });
        }, { threshold: 0.2 });
        testimonialObserver.observe(section);
      }

      setInterval(function () {
        goTo(current + 1);
      }, 5500);
    }
  }

  // Hero typing effect — destructive: the source text is read from
  // data-typed (falling back to existing textContent), the element is cleared,
  // then characters are re-inserted one by one in front of the blinking cursor.
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
