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


WIP...

