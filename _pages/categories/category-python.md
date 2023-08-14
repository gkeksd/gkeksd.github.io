---
title: "python" # 카테고리 이름
layout: archive
permalink: /categories/python # url
author_profile: true
taxonomy: python
sidebar_main: true
nav: "categories"
---

{% assign posts = site.categories.python %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}