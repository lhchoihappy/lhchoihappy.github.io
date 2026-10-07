---
layout: default
title: "Blog"
---

<a class="back-link" href="/">← Back to home</a>

<header class="page-header">
  <p class="eyebrow">Writing</p>
  <h1 class="page-title">Blog</h1>
  <p class="page-subtitle">Notes, experiments and things I learn along the way.</p>
</header>

<ul class="posts-list">
  {% for post in site.posts %}
    <li>
      <a class="post-card card" href="{{ post.url | relative_url }}">
        <div class="post-card__meta">
          <time class="post-card__date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% for cat in post.categories %}
            <span class="tag">{{ cat }}</span>
          {% endfor %}
        </div>
        <h2 class="post-card__title">{{ post.title }}</h2>
        {% if post.excerpt and post.excerpt != empty %}
          <p class="post-card__excerpt">{{ post.excerpt | strip_html | truncatewords: 42 }}</p>
        {% endif %}
        <span class="post-card__more">Read article →</span>
      </a>
    </li>
  {% endfor %}
</ul>
