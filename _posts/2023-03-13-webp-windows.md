---
layout: post
title:  "Generating WebP Images on Windows"
date:   2023-03-13 08:00:00 -0800
---
I use a Mac for work and a Windows machine at home. This means simple tasks take a few extra steps when I'm working on a personal project. The most recent simple task involved generating a WebP. 

If you don't know about WebP or don't use it, I encourage you to! We're in an age where [just over 95% of global browser users can view WebPs](https://caniuse.com/?search=webp). This is fantastic because WebPs can get *really* lightweight without quality degradation you'd typically see in JPG or PNG files. 

I'm a Web Performance engineer, so forgoing WebP on my site just feels hypocritical. Day to day, I don't generate these images myself. I usually ask a designer, or lean on a CDN. Asking a coworker to generate an image for my personal site sounds incredibly embarrassing, so I'm just going to sit down and figure it out. 

## Google's cwebp
Google built a command line tool to convert images to WebP. [Their sort of outdated looking site](https://developers.google.com/speed/webp/docs/using) (Android Jellybean vibes? Or is that just me?) has all of the instructions. The one thing they didn't include for Windows-illiterate folks like me is: How do I run this in PowerShell??

## Setting up PowerShell Commands
Once you've downloaded the file from Google's page and unzipped it, you need to put it somewhere PowerShell can see it. This can be anywhere, but I like to keep things somewhat organized. I put the `cwebp` application in a utilities directory on my C: drive. 

To point PowerShell to `cwebp`, open up System Properties > Advanced > Environment Variables. Highlight the "Path" variable in either the user or system section, click "Edit", then add the path to your folder with `cwebp`. 

And there you go! Now you can run `cwebp` from PowerShell. 

## What I Should Have Done
This was easily 10-15 minutes of poking around until I finally got to start creating WebPs. For a one-off situation like this, I should have just used [Squoosh](https://squoosh.app/). 🤦

Squoosh is a super handy tool. I use it to help designers and other stakeholders play around with compression settings. People are generally pretty amazed how far you can push the quality setting on WebP. A tool like this is perfect for helping a non-tech person visualize the power of modern image formats. 

... And I should have just dropped my new profile picture in and downloaded the optimized version.