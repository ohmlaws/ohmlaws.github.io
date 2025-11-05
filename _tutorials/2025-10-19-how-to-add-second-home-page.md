---
layout: post
title: "How to Add a Second Blog Home Page Collection in Jekyll Chirpy"
date: 2025-10-19
categories: [Guide]
pin: true
image:
  path: /assets/img/jekyll-collection.png
---

If you want to display posts from a separate folder on a **different home page** (apart from the main `index.html`), this guide will walk you through the process step-by-step using the Jekyll Chirpy theme.

---

## Step 1: Create a New Layout File

In your `_layouts` folder, create a new layout file for your new collection posts. If your repository not having any `_layout` folder , create one at root.

**Example:**  
`_layouts/tutorials.html`

Add the following code inside it:
{% raw %}
```liquid
---
layout: page
---

{% include lang.html %}

{% assign tutorials_sorted = site.tutorials | sort: "date" | reverse %}
{% assign pinned = tutorials_sorted | where: "pin", true %}
{% assign normal = tutorials_sorted | where_exp: "item", "item.pin != true and item.hidden != true" %}
{% assign posts = pinned | concat: normal %}

<div id="post-list" class="flex-grow-1 px-xl-1">
  {% for post in posts %}
  {% assign lqip_url = nil %}
  <article class="card-wrapper card">
    <a href="{{ post.url | relative_url }}" class="post-preview row g-0 flex-md-row-reverse">

      {% assign card_body_col = '12' %}

      {% if post.image %}
        {% assign src = post.image.path | default: post.image %}
        {% capture src %}{% include media-url.html src=src subpath=post.media_subpath %}{% endcapture %}
        {% assign alt = post.image.alt | xml_escape | default: 'Preview Image' %}

        {% if post.image.lqip %}
          {% capture lqip_url %}{% include media-url.html src=post.image.lqip subpath=post.media_subpath %}{% endcapture %}
        {% endif %}

        <div class="col-md-5">
          <div class="preview-img">
            {% if lqip_url %}
              <!-- LQIP present: src = lqip, data-src = real -->
              <img
                class="tutorial-lqip"
                alt="{{ alt }}"
                src="{{ lqip_url }}"
                data-src="{{ src }}"
                data-has-lqip="true"
              >
            {% else %}
              <!-- No LQIP: show real image directly -->
              <img
                class="tutorial-no-lqip"
                alt="{{ alt }}"
                src="{{ src }}"
                loading="lazy"
              >
            {% endif %}
          </div>
        </div>

        {% assign card_body_col = '7' %}
      {% endif %}

      <div class="col-md-{{ card_body_col }}">
        <div class="card-body d-flex flex-column">

          <h1 class="card-title my-2 mt-md-0">{{ post.title }}</h1>

          <div class="card-text content mt-0 mb-3">
            <p>{% include post-summary.html %}</p>
          </div>

          <div class="post-meta flex-grow-1 d-flex align-items-end">
            <div class="me-auto">
              <i class="far fa-calendar fa-fw me-1"></i>
              <time>{% include datetime.html date=post.date %}</time>

              {% if post.categories %}
              <i class="far fa-folder-open fa-fw me-1"></i>
              <span class="categories">
                {% for c in post.categories %}
                  {{ c }}{% unless forloop.last %}, {% endunless %}
                {% endfor %}
              </span>
              {% endif %}
            </div>
          </div>

        </div>
      </div>

    </a>
  </article>
  {% endfor %}
</div>

<!-- include the lazyloader script (unconditional here for reliability) -->
<script defer src="{{ '/assets/js/img-lazyload.js' | relative_url }}"></script>
```
{% endraw %}

---

## Step 2: Create a file in `assets/js` with following code snippet
`img-lazyload.js`

{% raw %}
```liquid
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

```
{% endraw %}

---

## Step 3: Add following css in `assets/css/jekyll-theme-chirpy.scss`

```css
/* Default: no blur for normal images */
.preview-img img {
  display: block;
  width: 100%;
  height: 100%;
  transition: filter .35s ease, opacity .35s ease;
  will-change: filter, opacity;
}

/* Apply blur ONLY if LQIP exists */
.preview-img img[data-has-lqip="true"]:not(.loaded) {
  filter: blur(10px);
  opacity: .7;
}

/* Once loaded (JS adds .loaded) */
.preview-img img.loaded {
  filter: blur(0);
  opacity: 1;
}
```

---

## Step 4: Create a Folder for Your New Collection

In your project root, create a folder that starts with an underscore (_).

Example:
`_tutorials`

All posts in this folder will appear on your new blog-home page.

Each post in this folder should have front matter like:
```
---
layout: post
title: Your Post Title
date: 2025-10-19
---
```
And then the content of the post below it.


---

## Step 5: Create a Home Page File for the New Collection

In your project root, create a Markdown file with the same name as your folder, but without the underscore.

Example:
`tutorials.md`

Add this front matter inside:
```
---
layout: tutorials  # your layout file name
title: Tutorials # your new home page title 
---
```

This file will serve as the new `home page` for your collection.


---

## Step 6: Update `_config.yml`

Now open `_config.yml` and scroll to the bottom of the file.

(a) Define the new collection

Look for something like:
```
 tabs:
  output: true
  sort_by: order 
  ```

`Then add your new collection just after`

```
tutorials:
  output: true
  permalink: /tutorials/:title/
```

(b) Add a new scope for your collection

Scroll further down to find the section:
```
values:
  layout: page
  permalink: /:title/ 
```

`After that, add:`

```
- scope:
    path: ""
    type: tutorials
  values:
    layout: post
    comments: true
    toc: true
```

> Make sure you are only adding, not removing existing code. Save `_config.yml`.
{: .prompt-warning }

---

## Step 7: Add a Post to Your New Collection

Now go to your `_tutorials` folder and create your first post. For example:

`_tutorials/how-to-add-lqip.md`

Add the front matter:

```
---
layout: post
title: How to Add LQIP Images in Jekyll
date: 2025-10-19
---

Then write your content below it.

```
---

## Step 8: Test Your New Collection

Build and Serve Your Jekyll Site.
You should see your new collection posts displayed, styled similarly to your main home page.


---

> Final Notes
> 
> You can repeat this process to create multiple collections (e.g.` _projects, _news, _case-studies`, etc.).
> 
> Make sure your layout file, collection folder, and collection name all match exactly.
> 
> Each collection may have its own layout, allowing you to customize appearance, metadata or ordering separately.
{: .prompt-info }


---
