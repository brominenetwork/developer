(function () {
  var acScript = document.createElement('script');
  acScript.id = 'aclib';
  acScript.type = 'text/javascript';
  acScript.src = '//acscdn.com/script/aclib.js';
  document.head.insertBefore(acScript, document.head.firstChild);

  var style = document.createElement('style');
  style.textContent =
    '#ad-banner {' +
    '  --bg: #1a1a2e; --dot-color: rgba(255,255,255,0.08);' +
    '  position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;' +
    '  background-color: var(--bg);' +
    '  background-image: radial-gradient(var(--dot-color) 1px, transparent 3px), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.0));' +
    '  background-size: 30px 30px, 100% 100%;' +
    '  border-bottom: 1px solid rgba(255,255,255,0.08);' +
    '  display: flex; justify-content: center; align-items: center;' +
    '  padding: 5px 0; transform: translateY(-100%);' +
    '  transition: transform 0.3s ease;' +
    '}' +
    '#ad-banner.visible { transform: translateY(0); }' +
    '#ad-banner .ad-content { width: 728px; height: 90px; display: flex; justify-content: center; align-items: center; position: relative; }' +
    '#ad-blocker-msg {' +
    '  display: none; color: #ccc; font-family: -apple-system, sans-serif;' +
    '  font-size: 14px; text-align: center; line-height: 1.4;' +
    '}' +
    '#ad-blocker-msg span { display: block; font-size: 12px; color: #888; margin-top: 2px; }' +
    '#ad-close {' +
    '  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);' +
    '  width: 20px; height: 20px; border: none; background: transparent;' +
    '  color: rgba(255,255,255,0.4); font-size: 16px; cursor: pointer; padding: 0;' +
    '  display: flex; align-items: center; justify-content: center;' +
    '}' +
    '#ad-close:hover { color: rgba(255,255,255,0.7); }' +
    'body.ad-active { padding-top: 100px; transition: padding-top 0.3s ease; }';
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'ad-banner';
  banner.innerHTML =
    '<div class="ad-content">' +
    '  <div id="ad-zone"></div>' +
    '  <div id="ad-blocker-msg">ad\'s keep solo central free! please disable your ad blocker :(<span></span></div>' +
    '</div>' +
    '<button id="ad-close" aria-label="Close">&times;</button>';

  function init() {
    document.body.insertBefore(banner, document.body.firstChild);

    var closeBtn = document.getElementById('ad-close');
    var adZone = document.getElementById('ad-zone');
    var blockerMsg = document.getElementById('ad-blocker-msg');
    var reopenTimer = null;

    function show() {
      banner.classList.add('visible');
      document.body.classList.add('ad-active');
    }

    function hide() {
      banner.classList.remove('visible');
      document.body.classList.remove('ad-active');
      clearTimeout(reopenTimer);
      reopenTimer = setTimeout(show, 60000);
    }

    function checkAdBlocked() {
      setTimeout(function () {
        var adContent = adZone.querySelector('iframe, ins, img, div');
        if (!adContent || adZone.offsetHeight === 0 || adZone.clientHeight === 0) {
          adZone.style.display = 'none';
          blockerMsg.style.display = 'block';
        }
      }, 3000);
    }

    closeBtn.addEventListener('click', hide);

    acScript.onload = function () {
      aclib.runBanner({ zoneId: '11023130' });
      setTimeout(show, 300);
      checkAdBlocked();
    };

    acScript.onerror = function () {
      adZone.style.display = 'none';
      blockerMsg.style.display = 'block';
      setTimeout(show, 300);
    };

    if (window.aclib) {
      aclib.runBanner({ zoneId: '11023130' });
      setTimeout(show, 300);
      checkAdBlocked();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
