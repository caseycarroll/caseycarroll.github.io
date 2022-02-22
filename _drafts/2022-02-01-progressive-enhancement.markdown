---
layout: post
title:  "When a Progressive Enhancement Doesn't Enhance (WIP)"
date:   2022-02-01 19:03:12 -0800
---


Building off of static design comps is standard practice for front-end web developers. Usually a design team gives you 3 or more comps showing how an experience should look at different screen sizes. Occasionally developers discover usability or browser issues after translating a static comp to an interactive and flexible one. 

The medium of static comps is closer to print design, where things must look a specific way on a specific sized paper. Unfortunately, this is antithetical to how the web works. The web, and specifically CSS, are designed to display content and avoid data loss through a window with infinite configurations. 

A few years ago, a designer asked my team to build a card with a title and a description. In their comps they limited the size of description to three lines of text. They worried that too much content would look silly in practice. To visually truncate the text, they suggested adding an ellipsis to the end.

Here's what it looked like: 

![Rough sketch of card element](/assets/images/figure1_pe_02012022.jpeg)


Essentially, the designers asked my team to enforce data loss --- something CSS wasn't designed to do. Sure, CSS lets you hide content. i.e. `display: none`, `overflow: hidden`, etc... But applying rules that hide content usually lead to fragile designs.  

The other complication was that `line-clamp` only works in modern browsers. At the time, my organization had a requirement to support IE 11. [cainiuse.com](https://caniuse.com/css-line-clap) indicates line-clamp works in all browsers, but IE. Looks like it's time to whip up a progressive enhancement! 

```css
.description {
	overflow: hidden;
	position: relative;
	max-height: calc(1em * 1.5 * 3);
}

.description::before {
	content: '';
	background: linear-gradient( to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 75%);
	top: calc(1em * 3.5);
    position: absolute;
    bottom: 16px;
    right: 0;
    width: 55%;
    display: block;
    height: 1em;
}

@supports (line-clamp: 3) {
	.description {
		-webkit-line-clamp: 3;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		position: unset;
	}
	.description::before {
		display: none;
	}
}
```

The result: 

![IE Fallback Example](/assets/images/fallback.png)

It's... serviceable. On IE11, the text truncates and fades away on the last line. In modern browsers, the text ends with an ellipsis. The amount of browser engine prefixes is telling, however. I generally get squeamish when CSS layouts require browser prefixes. To me, it's a sign that the technique isn't fully recommended, and might get phased out. This implementation is quite fragile, too. You could use variables to make it flexible with font sizes and different fonts, but regardless, a lot of tweaking is required. It doesn't respond well to padding either. 

This technique has accessibility implications as well. Screen readers will read all of the text in the description, even the text that's hidden. While this behavior might seem favorable, it doesn't work well for partially sighted users, or users with cognitive disabilities. The screen reader's output doesn't match what's on the screen. This experience can cause confusion and frustration. 

So, it's time to take a step back. Maybe truncrating text isn't the right solution at all. 

WIP...