---
layout: default
title: "Blog"
---

<div class="blog-header">
    <h1 class="blog-title">Blog</h1>
    <a href="/" class="back-link">← Back to Home</a>
</div>

<ul class="posts-list">
  {% for post in site.posts %}
    <li class="post-item">
      <h2 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>
