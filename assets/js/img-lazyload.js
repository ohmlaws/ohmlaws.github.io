(function () {

  function swapToReal(img) {
    const realSrc = img.dataset.src;
    if (!realSrc) return;

    const tmp = new Image();
    tmp.src = realSrc;
    tmp.onload = () => {
      img.src = realSrc;
      img.classList.add("loaded"); // Trigger CSS transition
      img.removeAttribute("data-src");
    };
  }

  function init() {
    const imgs = document.querySelectorAll("img[data-has-lqip='true']");

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            swapToReal(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "200px 0px" });

      imgs.forEach(img => io.observe(img));
    } else {
      imgs.forEach(img => swapToReal(img));
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
