function loadComponent(url, selector, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = html;
        if (typeof callback === 'function') callback(element); // Call if provided
      }
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar, header, footer, overlays, right sidebar
  loadComponent("/components/sidebar.html", "#sidebar-container");
  loadComponent("/components/header.html", "#header-container");
  loadComponent("/components/footer.html", "#footer-container");
  loadComponent("/components/mobileSearchOverlay.html", "#mobileSearchOverlay-container");
  loadComponent("/components/rightsidebar.html", "#rightsidebar-container");
  
  // Post meta/date/author
  loadComponent("/components/postMeta.html", "#postMeta-container");
  // Post content block
  loadComponent("/posts/firstyear.html", "#mainPost-container");
  // Post tags/categories
  loadComponent("/components/tags.html", "#tags-container");
  // Pagination (prev/next links)
  loadComponent("/components/pagination.html", "#pagination-container");

  // Share + back-to-top bar (actions container) -- INIT scripts only after loaded!
  loadComponent("/components/post-actions.html", "#post-actions-container", function() {
    if (window.setupShareLinks) {
      window.setupShareLinks('.share-twitter, .share-facebook, .share-telegram, .share-copy', {
        url: window.location.href,
        text: document.title,
      });
    }
    // Back to top button logic (works only after element present!)
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) scrollTopBtn.classList.remove('hidden');
        else scrollTopBtn.classList.add('hidden');
      });
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
    }
  });

  // Homepage (don't remove)
  if (document.querySelector("#home-container")) {
    loadComponent("/posts/home.html", "#home-container");
  }
  // First year landing page (don't remove)
  if (document.querySelector("#firstyear-container")) {
    loadComponent("/posts/firstyear.html", "#firstyear-container");
  }
  // Add more per-page or per-section logic as needed
});
