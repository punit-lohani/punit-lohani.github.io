---
layout: default
title: Product Analytics
---

<section class="hero"><div class="wrap">
  <p class="eyebrow">Product Analytics · Experimentation · Data Visualization</p>
  <h1> Data-Informed Product Building </h1>
  <p class="lede">I write practical frameworks for product teams on experimentation, product analytics, anddecision-ready dashboards.</p>
  <div class="actions"><a class="button" href="{{ '/articles' | relative_url }}">Read the articles</a><a class="text-link" href="{{ '/about' | relative_url }}">About me →</a></div>
</div></section>

<section class="wrap section">
  <div class="section-heading"><div><p class="eyebrow">Latest</p><h2>Articles</h2></div><a class="text-link" href="{{ '/articles' | relative_url }}">View all →</a></div>
  <div class="article-grid">{% for post in site.posts limit:3 %}<article class="card"><p class="eyebrow">{{ post.category | default: "Analytics" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.summary }}</p><a class="text-link" href="{{ post.url | relative_url }}">Read article →</a></article>{% endfor %}</div>
</section>

<section class="wrap section focus"><p class="eyebrow">What I cover</p><div class="pillars">
  <div><h3>Product Analytics</h3><p>Enrollment, activation, retention, payment volume, and customer behavior.</p></div>
  <div><h3>Experimentation</h3><p>Hypotheses, metric design, guardrails, and decisions that go beyond p-values.</p></div>
  <div><h3>Data Visualization</h3><p>SQL, dashboards, KPI design, and communication that helps teams act.</p></div>
</div></section>
