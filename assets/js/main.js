(function () {
  'use strict';

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

  // ----- Marquee: pause on hover -----
  var marqueeWrap = document.querySelector('.marquee-wrap');
  if (marqueeWrap) {
    marqueeWrap.addEventListener('mouseenter', function () {
      marqueeWrap.classList.add('marquee-paused');
    });
    marqueeWrap.addEventListener('mouseleave', function () {
      marqueeWrap.classList.remove('marquee-paused');
    });
  }

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
