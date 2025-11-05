// /assets/js/img-lazyload.js
(function () {
  function log(...args) {
    if (window && window.console) console.log('[img-lazyload]', ...args);
  }

  function swapToReal(img, realSrc) {
    if (!realSrc) {
      log('no data-src for', img);
      return;
    }
    const pre = new Image();
    pre.src = realSrc;
    pre.onload = function () {
      // apply smooth transition
      img.style.transition = 'filter .35s ease, opacity .35s ease';
      // set full-res
      img.src = realSrc;
      // remove blur if any
      img.style.filter = 'none';
      img.style.opacity = '1';
      img.removeAttribute('data-src');
      log('swapped to real for', img, realSrc);
    };
    pre.onerror = function () {
      log('failed to load real image', realSrc, img);
    };
  }

  function handleImage(img) {
    // if LQIP mode (has base64 or lqip file)
    if (img.dataset.hasLqip === 'true') {
      // initial visual state
      img.style.filter = img.style.filter || 'blur(10px)';
      img.style.opacity = img.style.opacity || '0.9';

      const real = img.dataset.src;
      if (!real) {
        log('LQIP present but data-src missing for', img);
        return;
      }
      swapToReal(img, real);
    } else {
      // not LQIP: nothing to do (image already src=real)
    }
  }

  function init() {
    const candidates = Array.prototype.slice.call(document.querySelectorAll('img[data-has-lqip="true"]'));

    if (candidates.length === 0) {
      log('no images with data-has-lqip found on this page');
      return;
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // ensure data-src exists
            if (img.dataset && img.dataset.src) {
              swapToReal(img, img.dataset.src);
            } else {
              log('data-src missing at intersection for', img);
            }
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px 0px' });

      candidates.forEach(img => {
        io.observe(img);
      });

      log('IntersectionObserver attached for', candidates.length, 'images');
    } else {
      // fallback: load immediately
      candidates.forEach(img => {
        handleImage(img);
      });
      log('fallback loaded images immediately');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
