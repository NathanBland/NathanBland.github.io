---
slug: 2017-1-24-Rebuilding-my-github-page
title: Rebuilding My GitHub Page
description: Rebuilding this site around Vue, Vue Router, Markdown, and hand-written CSS.
pubDate: 2017-01-24
tags: [vue, meta]
---

My GitHub `gh-pages` site had been out of date for a considerable amount of time, and I thought it was time it saw an update. I considered sticking with something like `Jekyll`, like my last iteration had been. However, I've been playing with Vue.js too much not to use it here.

## No CSS libraries
One of my primary goals with this, and the previous iteration of the site, was to completely roll my own style instead of using something heavier.

I also wanted to design the site to be easy to read, using `flex` for arranging items.

The end result is a site built on top of Vue.js and `vue-router` for the primary functions, along with `marked.js` and `highlight.js` for composing and highlighting Markdown posts.
