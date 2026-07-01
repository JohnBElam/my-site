/**
 * GDPR-compliant analytics consent for Google Analytics 4.
 *
 * - No GA scripts load until the visitor explicitly opts in.
 * - Consent is stored in localStorage (12-month expiry, then re-prompt).
 * - Visitors can change their choice via footer links or the privacy page.
 * - A floating "Cookie preferences" button appears only after declining (not after accept).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'site_analytics_consent';
  var CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  var PRIVACY_PATH = '/privacy/';

  function getMeasurementId() {
    var meta = document.querySelector('meta[name="ga-measurement-id"]');
    return meta ? meta.getAttribute('content') : '';
  }

  function readStoredConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.analytics || !data.timestamp) return null;
      if (Date.now() - data.timestamp > CONSENT_MAX_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.analytics;
    } catch (e) {
      return null;
    }
  }

  function storeConsent(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics: analytics,
        timestamp: Date.now()
      }));
    } catch (e) {
      /* storage unavailable — consent still applies for this session */
    }
  }

  function loadGoogleAnalytics(measurementId) {
    if (!measurementId || window.__gaLoaded) return;
    window.__gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function removeBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.remove();
    document.body.classList.remove('cookie-consent-open');
  }

  function showSettingsButton() {
    if (document.getElementById('cookie-consent-settings')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'cookie-consent-settings';
    btn.className = 'cookie-consent-settings';
    btn.textContent = 'Cookie preferences';
    btn.setAttribute('aria-label', 'Change cookie preferences');
    btn.addEventListener('click', openPreferences);
    document.body.appendChild(btn);
  }

  function hideSettingsButton() {
    var btn = document.getElementById('cookie-consent-settings');
    if (btn) btn.remove();
  }

  function showBanner() {
    removeBanner();
    hideSettingsButton();

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-desc');
    banner.setAttribute('aria-modal', 'false');

    banner.innerHTML =
      '<div class="cookie-consent-inner">' +
        '<div class="cookie-consent-content">' +
          '<p class="cookie-consent-kicker">Your privacy</p>' +
          '<h2 id="cookie-consent-title" class="cookie-consent-title">Help me improve this site</h2>' +
          '<p id="cookie-consent-desc" class="cookie-consent-desc">' +
            'I use a single analytics cookie to understand how people read and navigate the site — ' +
            'purely for research and performance. It helps me see what works and what doesn\u2019t. ' +
            '<strong>Your data is never sold, rented, or used for advertising.</strong> ' +
            'It\u2019s just me, trying to make the site better.' +
          '</p>' +
          '<p class="cookie-consent-meta">' +
            '<a href="' + PRIVACY_PATH + '">Privacy &amp; cookies</a>' +
          '</p>' +
        '</div>' +
        '<div class="cookie-consent-actions">' +
          '<button type="button" class="cookie-consent-btn cookie-consent-btn--decline" data-consent="denied">' +
            'Decline' +
          '</button>' +
          '<button type="button" class="cookie-consent-btn cookie-consent-btn--accept" data-consent="granted">' +
            'Accept analytics' +
          '</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (event) {
      var target = event.target;
      if (!target || !target.getAttribute) return;
      var choice = target.getAttribute('data-consent');
      if (!choice) return;
      applyConsent(choice);
    });

    document.body.appendChild(banner);
    document.body.classList.add('cookie-consent-open');

    var acceptBtn = banner.querySelector('.cookie-consent-btn--accept');
    if (acceptBtn) acceptBtn.focus();
  }

  function applyConsent(analytics) {
    storeConsent(analytics);
    removeBanner();

    if (analytics === 'granted') {
      loadGoogleAnalytics(getMeasurementId());
      hideSettingsButton();
      return;
    }

    showSettingsButton();
  }

  function openPreferences() {
    showBanner();
  }

  function init() {
    var measurementId = getMeasurementId();
    if (!measurementId) return;

    var consent = readStoredConsent();

    if (consent === 'granted') {
      loadGoogleAnalytics(measurementId);
      return;
    }

    if (consent === 'denied') {
      showSettingsButton();
      return;
    }

    showBanner();
  }

  window.SiteCookieConsent = {
    openPreferences: openPreferences,
    getConsent: readStoredConsent,
    revoke: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      window.__gaLoaded = false;
      showBanner();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
