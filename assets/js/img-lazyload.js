document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[data-lqip="true"]');

  images.forEach(img => {
    const real = img.dataset.src;
    if (!real) return;

    const temp = new Image();
    temp.src = real;

    temp.onload = () => {
      img.src = real;
      img.style.filter = "blur(0)";
      img.style.opacity = "1";
    };

    // start slightly blurred
    img.style.filter = "blur(12px)";
    img.style.opacity = "0.9";
  });
});
