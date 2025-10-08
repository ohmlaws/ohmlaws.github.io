document.addEventListener("DOMContentLoaded", async () => {
const container = document.getElementById("articles-list");
if (!container) return;

try {
const res = await fetch("/data/firstyear.json");
const articles = await res.json();
container.innerHTML = articles.map(a => `
  <article data-title="${a.title}" class="p-4 border rounded-lg shadow hover:shadow-lg transition">
    <div class="flex gap-4">
      ${a.image ? `
        <img src="${a.image}" alt="${a.imageAlt ?? a.title}" class="w-28 h-28 object-cover rounded-md flex-none" loading="lazy">
      ` : ``}
      <div class="min-w-0">
        <h2 class="text-xl font-semibold mb-1">
          <a href="${a.link}" class="text-blue-500 hover:underline">${a.title}</a>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">${a.summary}</p>
      </div>
    </div>
  </article>
`).join("");

if (typeof initMobileSearch === "function") initMobileSearch();
} catch (e) {
container.innerHTML = <p class="text-red-500">Failed to load First Year articles.</p>;
console.error(e);
}
});