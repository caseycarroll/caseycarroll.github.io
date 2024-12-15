---
layout: post
title:  "A Lightweight Scroll to Top Component"
date:   2023-04-16 08:00:00 -0800
---
*Spoiler: It's zero lines long*

Scroll to top features are ubiquitous across the web. They're intended to help users jump back to the top of the page. In theory, this could make your site easier to browse. Most of these features are implemented with JavaScript. This post shows you one way to implement it in JavaScript, as well as alternative approaches. 

## Defining Requirements for a Scroll to Top Component
- Component displays when user scrolls defined distance down the page
- Component doesn't display at all if the page height is short
- Component scrolls to the top of the page when the user clicks it

We can knock out these requirements with some JavaScript. We'll query the height of the page with `clientHeight` and leverage a `"scroll"` event listener to check how far down the user has scrolled. Lastly, when the user clicks on the button, use `scrollTo` to bring the user to the top of the page. 

## Implementation
Our team builds with Vue, so let's create a `ScrollToTop` SFC. 

```html
<script setup></script>
<template>
    <button class="scroll-btn">
        Scroll to Top
    </button>
</template>

<style>
.scroll-btn {
    position: fixed;
    bottom: 24px;
    right: 48px;
}
</style>
```

After it mounts, let's capture the total distance available to scroll.
```javascript
const scrollDistance = ref();

onMounted(() => {
    totalScrollDistance.value = 
        document.documentElement.scrollHeight 
        - document.documentElement.clientHeight
})
```
.. and add an event listener to the document. 
```javascript
onMounted(() => {
    //...
    document.addEventListener("scroll", handleScroll)
})
```

Now that we know the remaining distance to the bottom of the page, we can leverage that to see if it's time to show the button. Let's display the button when the user has scrolled down 70% of the page.

```javascript
const shouldShowButton = ref(false);

function handleScroll() {
    // get current scroll position
    scrollTop.value = document.documentElement.scrollTop;
    //show the button when we've scrolled down 70% of the page
    if((scrollTop.value / totalScrollDistance.value) > 0.70) {
        shouldShowButton.value = true;
    } else {
        shouldShowButton.value = false;
    }
}
```

Sweet, now let's use our `shouldShowButton` ref to toggle a class on the button. 

```html
<template>
    <button class="scroll-btn" :class="{visible: shouldShowButton}">
        Scroll to Top
    </button>
</template>

<style>
.scroll-btn {
    position: fixed;
    bottom: 24px;
    right: 48px;
    display: none;
}

.scroll-btn.visible {
    display: block;
}
</style>
```
Before we forget, let's make sure the button never shows up when the page is "short". Let's say 600px is short. 

```javascript
onMounted(() => {
	//...
	 if(totalScrollDistance.value > 600) {
        document.addEventListener("scroll", handleScroll)
    }
})
```

Finally, the button needs to scroll to the top. Let's use native `scrollTo`. 
```html
<button
	class="scroll-btn"
	:class="{visible: shouldShowButton}"
	@click="handleClick">
	Scroll to Top
</button>
```
We'll make things pretty and add `behavior: smooth`, too. 
```javascript
function handleClick() {
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
```

## Can we cut down on JavaScript? 
If we spin up `rollup-plugin-bundle-analyzer` we'll see we've written about 1.5kb of JavaScript. In the grand scheme of things, that's not much of an issue. However, we know poor performing sites are usually a result of many incremental additions of JS over time. Let's try to get ahead of it and cut some JS stuff out. 
![rollup bundle analyzer output](/assets/images/bundle-size.png)

Running code on every scroll event doesn't seem so great either. We could fix this with a debounce or an IntersectionObserver. Regardless of the direction we go next, we're starting to require a lot of engineering for something pretty simple. Let's look for ways to simplify our implementation.

### Use a link instead of a button
We can remove the button element and it's click handler in favor of an empty hash link. 
```html
<a href="#">Scroll to top</a>

...
<style>
    body {
        scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
        body {
            scroll-behavior: auto;
        }
    }
</style>
```
In addition to removing some JS, we can leverage the powers of CSS to make sure people who prefer reduced motion won't see the smooth scrolling effect. Nice! 

### Use CSS to show the link
Stephanie Eckles wrote a great guide on achieving this behavior with only CSS. ["Pure CSS Smooth-Scroll "Back to Top ↗️"](https://moderncss.dev/pure-css-smooth-scroll-back-to-top/) I won't waste my time and yours rewriting her solution here. The idea is we can use CSS to conditionally display a scroll to top link depending on how far down the page the user scrolls. Neat!

#### One Caveat
While this guide is fantastic, it ends with one caveat. The scroll button will show even on short pages. Unfortunately this doesn't satisfy our original requirements. We can cut out almost all of the JS, but will have to leave a small bit in to check the total scroll distance on the page. 

```js
if(totalScrollDistance.value > 600) {
    document.querySelector('a.scroll-to-top')
        .classList.remove('visible')
}
```

## Let's take a step back
Wow, so we spent a lot of time tinkering with different solutions. Eventually we found one that uses almost zero JS and leverages the strengths of CSS. It "works", but the feature isn't very accessible. The scroll to top link's dom order makes it hard for screen reader users to find. Maybe this is okay because a screen reader user can use their keyboard to scroll back to the top. 

Wait...🤦

### Scrolling to the top of a web page is baked into every browser!
Do we even need this feature? Let's see if there are scroll to top shortcuts on different operating systems.

|         | Scroll to Top Shortcut                |
|---------|---------------------------------------|
| Windows | Home key                              |
| Mac     | Cmd + Arrow Up keys                   |
| iOS     | Tap on the menu bar                   |
| Android | Varies, but generally the same as iOS. * |

> Android has very different scroll physics compared to iOS. A hard "flick" travels much farther on Android than iOS. iOS usually enforces a threshold amount of distance to scroll no matter how "hard" you flick. This means a scroll to top mechanism is pretty irrelevant for Android users.

Wow. We just wasted a lot of time iterating through solutions to a problem that has already been solved. We don't need JavaScript or CSS. We don't need any code at all!

## What did we learn?
One of my guiding principles as an engineer is to favor simpler solutions. In some cases, the solution is to do nothing or pass the responsibility to something else. In our busy world of JS frameworks and fancy design mockups, it's easy to lose sight of what he browser provides us out of the box.

Before building a feature, step back and ask if the browser already gives it to you. Don't be afraid to reveal this to your product manager or designers. They may learn something new that changes their perspective. This could influence how they come up with features in the future. Ideally you'll end up with less work for everyone.

Leverage the browser and do less!