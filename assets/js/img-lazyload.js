document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazyload");

  if ("IntersectionObserver" in window) {
    let imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let img = entry.target;
          let lqip = img.getAttribute("data-lqip");
          let src = img.getAttribute("src");

          // Load LQIP first if exists
          if (lqip) {
            img.style.filter = "blur(8px)";
            img.src = lqip;
          }

          // Preload full image
          const fullImg = new Image();
          fullImg.src = src;
          fullImg.onload = () => {
            img.src = src;
            img.style.transition = "filter 0.4s ease";
            img.style.filter = "blur(0px)";
          };

          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });

  } else {
    // Fallback for old browsers: just switch the src
    lazyImages.forEach((img) => {
      let lqip = img.getAttribute("data-lqip");
      let src = img.getAttribute("src");

      if (lqip) img.src = lqip;

      const fullImg = new Image();
      fullImg.src = src;
      fullImg.onload = () => (img.src = src);
    });
  }
});
