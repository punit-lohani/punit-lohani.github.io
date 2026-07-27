---
layout: default
title: Articles
---

<section class="wrap page-header"><p class="eyebrow">Writing</p><h1>Articles</h1><p class="lede">Practical thinking on experimentation, product metrics, payments, SQL, and dashboards.</p></section>
<section class="wrap articles-list">{% for post in site.posts %}<article class="article-row"><p class="eyebrow">{{ post.category | default: "Analytics" }} · {{ post.date | date: "%b %-d, %Y" }}</p><h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2><p>{{ post.summary }}</p><a class="text-link" href="{{ post.url | relative_url }}">Read article →</a></article>{% endfor %}</section>
