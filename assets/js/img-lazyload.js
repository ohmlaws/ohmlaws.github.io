// /assets/js/img-lazyload.js
(function () {
  function loadRealImage(img) {
    const realSrc = img.dataset.src;
    if (!realSrc) return;

    const highRes = new Image();
    highRes.src = realSrc;

    // Ensure transition works even for cached images
    highRes.onload = function () {
      // Small delay so LQIP stays visible briefly
      setTimeout(() => {
        img.src = realSrc;
        img.classList.add("loaded"); // trigger CSS fade
        img.removeAttribute("data-src");
      }, 500); // adjust this (300–700ms) for desired delay
    };

    if (highRes.complete) highRes.onload();
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
      }, { rootMargin: "50px 0px" }); // load just before visible

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
