document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[data-lqip="true"]');

  images.forEach(img => {
    const realSrc = img.dataset.src;
    if (!realSrc) return;

    // Preload real image
    const fullImg = new Image();
    fullImg.src = realSrc;

    fullImg.onload = () => {
      // Apply small fade transition
      img.style.transition = "filter .3s ease-out, opacity .3s ease-out";

      // Replace LQIP with full image
      img.src = realSrc;

      // Remove blur after small delay to avoid flashing
      setTimeout(() => {
        img.style.filter = "blur(0)";
        img.style.opacity = "1";
      }, 50);
    };

    // Blur placeholder
    img.style.filter = "blur(12px)";
    img.style.opacity = "0.85";
  });
});
