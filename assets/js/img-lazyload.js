// /assets/js/img-lazyload.js
(function () {
  function loadRealImage(img) {
    const realSrc = img.dataset.src;
    if (!realSrc) return;

    const highRes = new Image();
    highRes.src = realSrc;

    highRes.onload = function () {
      img.src = realSrc;
      img.classList.add("loaded"); // triggers CSS fade transition
      img.removeAttribute("data-src");
    };
  }

  function initLazyLoad() {
    const lazyImgs = document.querySelectorAll('img[data-has-lqip="true"]');

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadRealImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "200px 0px" });

      lazyImgs.forEach(img => io.observe(img));
    } else {
      // Fallback for old browsers
      lazyImgs.forEach(loadRealImage);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLazyLoad);
  } else {
    initLazyLoad();
  }
})();
