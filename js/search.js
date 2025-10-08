function initMobileSearch() {
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const closeMobileSearch = document.getElementById('closeMobileSearch');
  const mobileSearchResults = document.getElementById('mobileSearchResults');
  const articlesList = document.getElementById('articles-list');

  // Always grab latest articles after content load
  let allArticles = Array.from(document.querySelectorAll('#articles-list article'));

  if (!mobileSearchBtn || !mobileSearchOverlay || !mobileSearchInput || !mobileSearchResults) {
    console.warn("Mobile search elements missing.");
    return;
  }

  // Show overlay
  mobileSearchBtn.addEventListener('click', () => {
    mobileSearchOverlay.classList.remove('hidden');
    if (articlesList) articlesList.style.display = "none";
    setTimeout(() => mobileSearchInput.focus(), 80);
    showMobileResults(mobileSearchInput.value);
  });

  // Close overlay
  function closeSearchOverlay() {
    mobileSearchOverlay.classList.add('hidden');
    if (articlesList) articlesList.style.display = "";
    mobileSearchInput.value = '';
    showMobileResults('');
  }

  closeMobileSearch?.addEventListener('click', closeSearchOverlay);
  mobileSearchOverlay.addEventListener('click', e => {
    if (e.target === mobileSearchOverlay) closeSearchOverlay();
  });

  mobileSearchInput.addEventListener('keydown', e => {
    if (e.key === "Escape") closeSearchOverlay();
  });

  // Desktop search
  document.getElementById('searchInputHeader')?.addEventListener('input', e => {
    allArticles = Array.from(document.querySelectorAll('#articles-list article')); // refresh list
    filterArticles(e.target.value);
  });

  // Mobile search input
  mobileSearchInput.addEventListener('input', (e) => {
    allArticles = Array.from(document.querySelectorAll('#articles-list article')); // refresh list
    showMobileResults(e.target.value);
  });

  function showMobileResults(val) {
    const query = (val || '').toLowerCase();
    const matches = allArticles.filter(article => {
      const title = article.getAttribute('data-title')?.toLowerCase() ?? '';
      return title.includes(query);
    });

    mobileSearchResults.innerHTML = '';
    if (!query) return;

    if (matches.length === 0) {
      mobileSearchResults.innerHTML =
        '<div class="text-center text-gray-400 dark:text-gray-500 py-8">No results found.</div>';
      return;
    }

    matches.forEach(article => {
      const cloned = article.cloneNode(true);
      cloned.querySelectorAll('img').forEach(img => img.remove());
      cloned.querySelectorAll('.w-full, .md\\:w-48, .flex.items-center.justify-center')
        .forEach(div => { if (div.childElementCount === 0) div.remove(); });
      mobileSearchResults.appendChild(cloned);
    });
  }

  // Reset list on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 || mobileSearchOverlay.classList.contains('hidden')) {
      if (articlesList) articlesList.style.display = "";
    }
  });

  // Desktop filtering
  function filterArticles(val) {
    const query = (val || '').toLowerCase();
    allArticles.forEach(article => {
      const title = article.getAttribute('data-title')?.toLowerCase() ?? '';
      article.style.display = title.includes(query) ? "" : "none";
    });
  }
}

// Watch DOM for #articles-list changes (dynamic content load)
const searchObserver = new MutationObserver(() => {
  if (document.getElementById('articles-list') && document.querySelector('#articles-list article')) {
    initMobileSearch();
  }
});

searchObserver.observe(document.body, { childList: true, subtree: true });