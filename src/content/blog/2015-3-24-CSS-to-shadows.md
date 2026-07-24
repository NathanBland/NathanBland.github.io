---
slug: 2015-3-24-CSS-to-shadows
title: CSS To Shadows
description: Toning down an early site design with more subtle shadows.
pubDate: 2015-03-24
tags: [css, design]
---

I've been working on the layout of this site quite a bit, and although I am a fan of material design, I think for the brief post listings the drop shadow was becoming a bit much.

I've toned down the drop-shadow values all over the site to make them more subtle. I think the overall look is better because of it. A lot of places in my CSS file look like this right now:

```css
article:hover {
    /* box-shadow: 0 2px 6px black; Disabled until further evaluation. */
}
```

Which isn't very clean, to say the least, but it *is* effective for now.
