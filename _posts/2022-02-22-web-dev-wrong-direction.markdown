---
layout: post
title:  "Did Web Development Lose The Right Direction?"
date:   2022-02-22 17:03:12 -0800
---


<iframe width="560" height="315" src="https://www.youtube.com/embed/y0nVPmN_rhA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Stefan Judis gave a talk about the state of web development today. He began with an overview of the old tech stack: The classic MySQL, Apache and PHP combo. As time went on, more and more javascript frameworks came onto the scene, build tools, too. This added complexity, especially for beginner web developers. With these newer tools, developers could build rich experiences. Unfortunately, this direction has led to some drawbacks. 

In his talk, Stefan compares the performance of his flashy personal site built with a modern stack and an older website, built with basic html. Despite spending a lot of time building a performant experience with lazy loading, code splitting, etc, his personal site still got a lower performance score than the old site. How can this be? 

Modern web experiences naturally have a larger page weight and require more resources. Compressing JavaScript isn't enough. The browser must decompress then parse all of your JS to get something rendered. The key takeaway I got was 150kb of images != 150kb of JS.

Another important bit Stefan brought up was a metric from Ian Feather's talk about building Buzzfeed. They saw 13 million requests for JS time out a month. This meant they couldn't require JS to render something on the page--something a lot of modern web pages do today. 

Consider the client-side routed application movement, too. This paradigm allows developers to re-implement browser navigation. Unfortunately this technique, because it circumvents browser behavior, will never be full accessible. A lot of the fidelity in how the browser communicates to assistive technologies is lost. In my experience, I've yet to see client-side routing be taken full advantage of. At most, you get a silly little animation that moves from one panel to the next. Is that really worth shipping loads of javascript and breaking accessibility? 

[WEB AIMs Million annual report](https://webaim.org/projects/million/) shows the average number of errors goes up on sites that use JS frameworks. This doesn't mean JS frameworks are inherently inaccessible. To me, it means JS frameworks require the developer to spend too much time learning the framework instead of learning the platform. If you don't know how to build semantic web pages in the browser, you're going to build inaccessible experiences. I don't blame devs for not knowing this stuff. They already have to spend so much time understanding how to use React or Vue, etc... 

This is an odd time in web development. Overall, I see more and more outspoken devs in the community suggesting we take a moment to stop and consider where we've ended up. Have we strayed too far from the path? Have we reinvented the wheel? It's hard to say, but for now, we have to deeply consider what tools are right for the end user. Build with them in mind. 