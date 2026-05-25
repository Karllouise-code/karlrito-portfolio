---
title: How I'm Writing This Blog With Comet Browser (And What I've Learned Using It)
date: '2026-05-25'
author: Karl Rito
slug: how-im-writing-this-blog-with-comet-browser-and-what-ive-learned-using-it
description: >-
  A meta look at how I used Comet Browser — Perplexity AI's agentic browser — to
  write this very blog post, covering its standout features, real-world benefits
  for research and writing, and the privacy and security trade-offs you should
  know about.
category: Technology
---
Today I’m doing something a bit meta: I’m writing this blog post *inside* Comet Browser, while using Comet to research and organize the very post you’re reading. It’s a good chance to talk about how this AI-first browser actually feels in real use, what it helps me with, and where it still falls short.

## What Is Comet Browser?

Comet is an AI-powered web browser built by Perplexity AI on top of Chromium, so it looks and behaves a lot like Chrome at first glance. The big difference is that it bakes an AI assistant directly into the browser, letting it read your tabs, summarize content, compare pages, and even act on your behalf across the web.

It runs on desktop (Windows and macOS) and mobile (Android and iOS), so you can carry the same “assistant in your browser” idea across devices. Instead of just being a search bar, Comet tries to become a kind of personal browsing co-pilot that understands context and can follow multi-step instructions.

## How Comet Is Helping Me Write This Post

As I’m drafting this article, Comet is quietly doing a lot of the heavy lifting in the background. From quickly pulling together research to keeping all my sources straight, it changes the writing flow compared to a traditional browser.

Here are a few concrete ways it’s helping with this exact blog:

- I can ask Comet to summarize long reviews of the browser and turn them into key bullet points, which I then rewrite in my own words.
- When I have several tabs open (official site, reviews, security write-ups), Comet can compare them and highlight where people agree or disagree about features, performance, and privacy.
- If I forget where I saw a specific detail (like a release date or a security concern), I can just ask the assistant to “find where I read about X in my open tabs” instead of manually hunting.

The result is that I spend less time tab-hopping and more time actually writing and thinking about what I want to say.

## Agentic Browsing: Letting Comet “Do” Things

The most unique part of Comet is what’s often called “agentic browsing.” Instead of you manually clicking through each step, you can give Comet higher-level commands like “summarize this video,” “compare prices across these tabs,” or “book a flight for this date range,” and it will navigate, click, and extract data for you.

In practice, this feels like having an assistant sitting next to you who can operate the browser directly: it can visit sites, fill in forms in some cases, and synthesize information from multiple pages at once. For tasks like research, shopping, or planning, that shift from “I click everything” to “I describe the goal and supervise” is a big change compared to traditional browsers.

## Features That Stand Out In Everyday Use

A few features make Comet feel different from just “Chrome with an AI sidebar.”

- **Built‑in assistant with web awareness**: The assistant is integrated directly into the browser, can see the pages you’re on, and can reference multiple tabs at once when answering questions or summarizing.
- **Cross‑tab summarization**: Comet can summarize not just one page, but content across many open tabs—especially on mobile—turning scattered research into a cohesive overview.
- **Smart tab and workflow support**: Reviews highlight that Comet is particularly strong for research workflows, helping with tasks like comparing products, synthesizing sources, and cutting down on tab clutter.
- **Built‑in ad blocker**: Comet uses an integrated ad-blocking engine, drawing on Brave’s open-source adblock-rust and filter lists to reduce spam and pop-up ads by default.

On mobile, this turns into a kind of “AI browser in your pocket,” where you can chat with the assistant, use voice mode, and have it dig through all open tabs to find or summarize information.

## Why Comet Is Great For Writing And Research

For writing this blog and doing similar knowledge-heavy tasks, Comet has some real strengths.

- **Faster research loops**: Because the assistant can read my tabs and summarize or compare them, I can move from “open 10 sources” to “get the core ideas” much faster.
- **Better context in answers**: Compared to generic chatbots, Comet is deeply connected to what I’m actually browsing, which makes its suggestions and summaries more grounded in the specific pages I’m using.
- **Strong for shopping and decisions**: Some reviewers point out that it’s especially good at tasks like online shopping, where it can compare options, hunt for promo codes, and synthesize product info.

If you spend a lot of time researching topics, comparing tools, or drafting content based on online sources, this combination of “browser + agent” feels like a genuine upgrade.

## Performance And User Experience

Day to day, Comet generally works as a normal Chromium-based browser; you can browse, stream, and work like you would in Chrome. Several reviewers describe it as fast and responsive, with pages loading as quickly or faster than mainstream browsers in many cases.

However, using the AI heavily does have a cost. Because much of the reasoning and context handling happens locally, people have observed CPU usage spikes (around 20%) and memory going above 4 GB when multiple AI tasks are running across tabs. For light browsing this is fine, but if you’re on an older or low-RAM machine, the AI features can make things feel heavier under load.

## Privacy, Security, And The Trade‑Offs

This is where things get more complicated, and it’s important to go in with open eyes.

On the positive side, Comet does provide useful privacy features like an ad blocker, some local data processing, and tools to minimize traditional tracking compared to standard Chrome. But because it’s an AI-driven browser that personalizes your experience and lets the assistant “see” your browsing activity, there are serious concerns about how much data it collects and where it goes.

Some key points critics and security researchers have raised:

- **Extensive activity tracking**: Analyses describe Comet tracking browsing history, purchases, bookings, and sometimes location to power hyper-personalized content and ads.
- **URL and history leakage**: Independent digging has shown that Comet may send every URL you visit to Perplexity’s servers, even with all local privacy toggles switched off, raising major concerns about true private browsing.
- **Prompt‑injection and agent risks**: Security reports warn that agentic browsers like Comet can be vulnerable to prompt-injection attacks, where a malicious page tricks the assistant into exposing sensitive data it can access.
- **Documented vulnerabilities**: Researchers have described potential exploits (like “CometJacking”) that could, in theory, exfiltrate sensitive user data, and there has been debate about how seriously those issues were treated.

In short, Comet is powerful precisely because it sees a lot of what you do—so you should treat it as a high-trust tool and decide carefully what accounts, workspaces, and data you’re comfortable exposing to an AI-layered browser.

## Pros Of Using Comet Browser

Putting it all together, here are the main advantages that stand out for me and from the reviews:

- AI-native browsing experience that feels genuinely helpful for research, comparison, and planning tasks.
- Deep tab awareness and cross-tab summarization that save time when working with multiple sources at once.
- Strong fit for workflows like shopping, travel planning, and content research, including the ability to search, summarize, and act across sites.
- Built‑in ad blocker and some local processing that, in certain ways, can be more private than a vanilla Chrome setup.
- Familiar Chromium base, so compatibility with most sites feels similar to what you’d expect in mainstream browsers.

For writing a blog post like this, that translates into smoother research, less context-switching, and fewer manual copy‑paste steps.

## Cons And Things To Watch Out For

Comet is powerful, but not perfect, and it definitely isn’t the right choice for everyone or every situation.

Some notable drawbacks:

- **Privacy and data collection concerns**: The combination of URL logging, extensive activity tracking, and reliance on cloud-based AI raises serious questions about how truly private your browsing is.
- **Security risks unique to agentic browsers**: Because the assistant can act on pages, prompt-injection and exploit vectors like those documented by researchers pose new kinds of security risks if not carefully mitigated.
- **Resource usage and performance spikes**: Heavy AI use can drive CPU and RAM usage up significantly, which may be noticeable on machines with limited hardware.
- **Still maturing as a product**: Reviews note occasional bugs, a smaller extension ecosystem than Chrome/Firefox, some compatibility issues with legacy web apps, and a learning curve for people new to AI-assisted browsing.

Because of all this, I wouldn’t necessarily use Comet for everything—especially for highly sensitive work, private accounts, or data that must not leave your machine.

## Should You Use Comet For Writing And Daily Browsing?

If your work involves a lot of online research, comparison, and decision-making, Comet can feel like a real productivity boost. Writing this blog with it has made it easier to pull in multiple perspectives, keep track of sources, and turn scattered tabs into a coherent narrative.

The trade-off is that you’re giving an AI-aware browser deep insight into your browsing life, with privacy and security implications you shouldn’t ignore. For some people, the time saved and features gained will outweigh those concerns; for others, it will be a deal-breaker and tools like Firefox or Brave will still feel safer.

If you’re curious, the best way to decide is probably what I’m doing right now: pick one project—like this blog post—and try doing the whole thing inside Comet, then ask yourself whether the benefits justify the risks for your personal use.
