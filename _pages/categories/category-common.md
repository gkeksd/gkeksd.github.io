---
title: "일반" # 카테고리 이름
layout: archive
permalink: /categories/common # url
author_profile: true
taxonomy: 일반
sidebar_main: true
nav: "categories"
---

{% assign posts = site.categories.Cpp %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}