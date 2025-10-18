---
title: "How to Use LQIP (Base64) Images in Jekyll Chirpy Theme"
date: 2025-10-18 16:34:00 +0530
layout: post
categories: [tutorial]
tags: [Jekyll, Chirpy, LQIP, Base64, SEO, Performance]
description: "Learn how to use lightweight LQIP (Base64) images to improve your Jekyll Chirpy site's loading performance."
---


Website performance plays a big role in both **SEO** and **user experience**. A faster site means visitors stay longer and search engines rank it higher.  
One simple but powerful technique to speed up your site is using **LQIP (Low Quality Image Placeholders)**.  
This post will guide you through the process of creating and using **Base64 LQIP images** in your **Jekyll Chirpy** theme.

---

##  What is LQIP?

**LQIP (Low Quality Image Placeholder)** is a small, blurred, lightweight version of your original image.  
It appears instantly when a page loads, and is replaced by the full image once it’s downloaded.  
It helps in improving **perceived performance** and creating a smooth **lazy loading** effect.

---

##  Steps to Create a Base64 LQIP Image

Here’s the complete process to convert your images into **Base64 LQIP placeholders** for Jekyll Chirpy:

###  Step 1: Compress or Convert Image to WebP

Before creating an LQIP, reduce the file size by converting or compressing your original image.  
You can use any of these free online tools:

- [Cloudinary Tool Hub](https://cloudinary.com/tools)
- [Compress PNG to 10KB - Cloudinary](https://cloudinary.com/tools/compress-png-to-10kb)


Example conversion process:
1. Upload your `.jpg` or `.png` file.
2. Convert it to `.webp` format for better compression.
3. Download the compressed `.webp` image.

---

###  Step 2: Resize Image to 20x20 Pixels

After compression, resize the image to around **20x20 pixels** (small but visible enough for placeholders).  
Use [Image Resizer](https://imageresizer.com/) for quick resizing.  
This tiny version will act as your **LQIP preview**.

![Resize placeholder](https://via.placeholder.com/400x200?text=Resize+Image+Example)

---

###  Step 3: Convert Image to Base64

Now, convert your resized image to Base64 format using:

- [Base64 Image Encoder](https://www.base64-image.de/)

Steps:
1. Upload the **20x20 px** image.
2. Copy the **Base64 string** shown under "Data URI scheme".

Example output:

```
data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEALwA...
```

---

###  Step 4: Add Base64 LQIP in Chirpy Front Matter

Open your Jekyll post Markdown file (e.g., `_posts/2025-10-16-lqip-guide.md`),  
and paste the Base64 code in the `image:` field inside the front matter.

Example:

```
---
title: "My Blog Post with LQIP"
date: 2025-10-18 16:34:00 +0530
categories: [Web Development]
tags: [Jekyll, Chirpy, LQIP]
image:
  path: /assets/img/secondyear.webp
  lqip: data:image/webp;base64,UklGRkABAABXRUJQVlA4IDQBA...
description: "Using Base64 LQIP images in Jekyll Chirpy theme."
---
```

This will show the Base64 image as the thumbnail in post previews until the full-size image loads.


---

### Tips for Best Results

Use `.webp` images whenever possible.

Keep LQIP images under 1KB in size.

Use descriptive filenames for SEO.

Test loading time using PageSpeed Insights.



---

### Final Result

When done correctly, your Chirpy site will:

Load images smoothly.

Look visually polished even before full images appear.

Improve performance and user satisfaction.

---

 Useful Tools Summary



Convert PNG/JPG to WebP	[Cloudinary](https://cloudinary.com/tools/png-to-webp)

Compress Images to 10 kb	[Cloudinary](https://cloudinary.com/tools/compress-png-to-10kb)

Resize Image	[Image Resizer](https://imageresizer.com)

Convert to Base64	[Base64 Image Encoder](https://base64-image.de)

---

You can use different tool also.

---

With this simple method, your Jekyll Chirpy site will not only look faster but also feel more professional.
Try it out on one of your posts and notice the improvement!


---
