---
title: "How to Hide Preview Image Inside Post But Show on Home Page"
date: 2025-11-05 15:30:42 +0530
image:
  path: /assets/img/hide-img.webp
  lqip: data:image/webp;base64,UklGRt4AAABXRUJQVlA4INIAAACwBQCdASomABQAPok6l0elI6IhNVgIAKARCWQAzEuiecpMA6VUBo8ThY/CWhDjLsmKlh0IAAAA+dd4I6CAEEAf+5en4o6VFkN2FsPLG4u1tEHL2LCK3a/f/xDfZeetfwU30izr/4rXNI5tRyu5egARMER77zTCtuBTvIRRSr5oNjS1NYA6B2VEhSz38MnWExQHx0LYrED1ySm/nAAPr2giir7J+84F2rKe3HOG/Z4/UCkVATem3BkagNhp9A0yPO6mx6GHdiWGCzA9uMd4wAAAAAA=
---


By default, **Chirpy theme** displays the preview (featured) image at:

  * **Home page (post list)**
  * **Inside individual post**

But in some cases, you may want:

  * **Show image on homepage (preview)**
  * **Hide image inside the post**

This guide explains how to do that with a simple conditional flag in **Front Matter**.

-----

### Step 1: Edit `_layouts/post.html`

> If your repository **lacks** `_layouts/post.html`, **create it** and **copy the contents** from the [Chirpy repository](https://github.com/cotes2020/jekyll-theme-chirpy/tree/master/).
> 
or
Go to your theme folder and open:
`/_layouts/post.html`

Find the block where the image is rendered. Wrap it inside this condition:
{% raw %}
```liquid
{% if page.image.show_image_in_post != false %}
```
{% endraw %}

What you need to do is find this code section 

{% raw %}

```liquid
        <div class="mt-3 mb-3">
          <img {{ src }} {{ class }} {{ alt }} w="1200" h="630" {{ lqip }}>
          {%- if page.image.alt -%}
            <figcaption class="text-center pt-2 pb-2">{{ page.image.alt }}</figcaption>
          {%- endif -%}
        </div>
      {% endif %}
```
{% endraw %}
`and replace with this`
{% raw %}
```liquid      
      {% if page.image.show_image_in_post != false %}
        <div class="mt-3 mb-3">
          <img {{ src }} {{ class }} {{ alt }} w="1200" h="630" {{ lqip }}>
          {%- if page.image.alt -%}
            <figcaption class="text-center pt-2 pb-2">{{ page.image.alt }}</figcaption>
          {%- endif -%}
        </div>
      {% endif %}
      
      {% endif %}
```
{% endraw %}

This means:

  * If `show_image_in_post: false` → **Don't show image inside post**
  * Otherwise → **Show normally**

-----

### Step 2: Add Front Matter in Your Post

Inside any post where you **don’t want the preview image visible** in the post, add this line:

`show_image_in_post: false`

Example full Front Matter:

```yaml
---
layout: post
title: "Sample Blog Post"
date: 2025-01-01
image:
  path: /assets/img/sample.jpg
  show_image_in_post: false
---
```

  * **Image still shows on homepage**
  * **Image hidden inside the blog post**

-----

### Result

| Location | Image Behavior |
| :--- | :--- |
| Home page post list | Visible |
| Individual post page | Hidden |

-----
