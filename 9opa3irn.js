(function () {
  var acScript = document.createElement('script');
  acScript.id = 'aclib';
  acScript.type = 'text/javascript';
  acScript.src = '//acscdn.com/script/aclib.js';
  document.head.insertBefore(acScript, document.head.firstChild);

  var style = document.createElement('style');
  style.textContent =
    '#ad-banner {' +
    '  position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;' +
    '  background: #f0f0f0; border-bottom: 1px solid #ddd;' +
    '  display: flex; justify-content: center; align-items: center;' +
    '  padding: 5px 0; transform: translateY(-100%);' +
    '  transition: transform 0.3s ease;' +
    '}' +
    '#ad-banner.visible { transform: translateY(0); }' +
    '#ad-banner .ad-content { width: 728px; height: 90px; display: flex; justify-content: center; align-items: center; }' +
    '#ad-close {' +
    '  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);' +
    '  width: 20px; height: 20px; border: none; background: transparent;' +
    '  color: #999; font-size: 16px; cursor: pointer; padding: 0;' +
    '  display: flex; align-items: center; justify-content: center;' +
    '}' +
    '#ad-close:hover { color: #333; }' +
    'body.ad-active { padding-top: 100px; transition: padding-top 0.3s ease; }';
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'ad-banner';
  banner.innerHTML =
    '<div class="ad-content"><div id="ad-zone"></div></div>' +
    '<button id="ad-close" aria-label="Close">&times;</button>';

  function init() {
    document.body.insertBefore(banner, document.body.firstChild);

    var closeBtn = document.getElementById('ad-close');
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

    closeBtn.addEventListener('click', hide);

    acScript.onload = function () {
      aclib.runBanner({ zoneId: '11023130' });
      setTimeout(show, 300);
    };

    if (window.aclib) {
      aclib.runBanner({ zoneId: '11023130' });
      setTimeout(show, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
