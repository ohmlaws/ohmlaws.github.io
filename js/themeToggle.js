function initThemeSidebar() {
  function setThemeSidebar(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.getElementById('sunIconSidebar').classList.add('hidden');
      document.getElementById('moonIconSidebar').classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      document.getElementById('sunIconSidebar').classList.remove('hidden');
      document.getElementById('moonIconSidebar').classList.add('hidden');
    }
  }

  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setThemeSidebar(savedTheme);

  document.getElementById('themeToggleSidebar')?.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setThemeSidebar(next);
    localStorage.setItem('theme', next);
  });
}

const observer = new MutationObserver(() => {
  if (document.getElementById('themeToggleSidebar')) {
    observer.disconnect();
    initThemeSidebar();
  }
});

observer.observe(document.body, { childList: true, subtree: true });