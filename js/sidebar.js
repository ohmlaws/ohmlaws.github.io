// sidebar.js
document.addEventListener("click", (event) => {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  // Open sidebar when clicking menu button
  if (event.target.closest('#menuButton')) {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    sidebar.removeAttribute('aria-hidden');
    sidebar.removeAttribute('inert');
  }

  // Close sidebar when clicking overlay
  if (event.target.closest('#overlay')) {
    closeSidebar();
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.setAttribute('inert', '');
  }
});

// Keep responsive behavior
window.addEventListener('resize', adjustSidebar);
window.addEventListener('DOMContentLoaded', adjustSidebar);

function adjustSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (!sidebar || !overlay) return;

  if (window.innerWidth >= 768) {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.add('hidden');
    sidebar.removeAttribute('aria-hidden');
    sidebar.removeAttribute('inert');
  } else {
    sidebar.classList.add('-translate-x-full');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.setAttribute('inert', '');
  }
}