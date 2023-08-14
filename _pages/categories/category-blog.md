---
title: "블로그" # 카테고리 이름
layout: archive
permalink: /categories/blog # url
author_profile: true
taxonomy: 블로그
sidebar_main: true
nav: "categories"
---

{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}