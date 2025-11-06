/**
 * Lazy load & smooth LQIP transition (custom Chirpy adaptation)
 */

const ATTR_DATA_SRC = 'data-src';
const ATTR_DATA_LQIP = 'data-lqip';

const cover = {
  SHIMMER: 'shimmer',
  BLUR: 'blur'
};

function removeCover(cls) {
  const wrapper = this.closest('.preview-img');
  if (wrapper) wrapper.classList.remove(cls);
}

function handleImage() {
  if (!this.complete) return;

  if (this.hasAttribute(ATTR_DATA_LQIP)) {
    removeCover.call(this, cover.BLUR);
  } else {
    removeCover.call(this, cover.SHIMMER);
  }
}

/**
 * Switches the LQIP (low-res) image with the real image URL.
 */
function switchLQIP() {
  const src = this.getAttribute(ATTR_DATA_SRC);
  if (src) {
    this.setAttribute('src', encodeURI(src));
    this.removeAttribute(ATTR_DATA_SRC);
  }
}

/**
 * Initialize lazy loading for tutorial preview images
 */
function loadImg() {
  const images = document.querySelectorAll('.preview-img img');

  if (images.length === 0) return;

  images.forEach((img) => {
    img.addEventListener('load', handleImage);
  });

  // Handle cached images
  document.querySelectorAll('.preview-img img[loading="lazy"]').forEach((img) => {
    if (img.complete) {
      if (img.hasAttribute(ATTR_DATA_LQIP)) {
        removeCover.call(img, cover.BLUR);
      } else {
        removeCover.call(img, cover.SHIMMER);
      }
    }
  });

  // Process all LQIP images and swap in high-res
  const lqips = document.querySelectorAll(`.preview-img img[${ATTR_DATA_LQIP}="true"]`);

  if (lqips.length) {
    lqips.forEach((img) => {
      // Add slight delay for smooth visual load
      setTimeout(() => {
        switchLQIP.call(img);
      }, 250); // adjust for slower fade
    });
  }
}

document.addEventListener('DOMContentLoaded', loadImg);
