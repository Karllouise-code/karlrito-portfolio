---
title: How I Use AI Tools to Speed Up My Coding Workflow
date: '2026-06-27'
author: Karl Rito
slug: how-i-use-ai-tools-to-speed-up-my-coding-workflow
description: >-
  AI tools have genuinely changed how I code every day. From GitHub Copilot
  Chat to Gemini CLI to a terminal-based tool I found, and Perplexity or Comet for browser tasks,
  here is my honest breakdown of what I actually use, why I switched, and how it
  all fits together in my workflow.
category: Productivity
---
I will be honest with you: I used to spend a huge chunk of my dev time just figuring things out. Searching docs, reading Stack Overflow, re-reading the same error message five times, and wondering if I was just slow. Turns out, I was not slow. I just did not have the right tools yet.

Over the past year or so, AI tools have become a real part of how I work every day. Not in a hype-driven, "AI will replace developers" kind of way, but in a quiet, practical, "I get more done and feel less frustrated" kind of way.

Here is what my actual setup looks like.

---

## Where It Started: GitHub Copilot Chat

My first serious AI coding tool was **GitHub Copilot Chat**. Back in college, I got access through the GitHub Student Developer Pack, and it was a game changer. What made it stand out from regular LLMs was that it actually knew my codebase. I could ask it about a specific function, file, or pattern, and it would answer in context, not in vague generalities.

I used it heavily. Debugging, boilerplate, refactoring, understanding unfamiliar code — Copilot Chat handled all of it. The fact that it was integrated right in my editor and understood the project structure made it feel like pair programming with someone who actually read the code.

---

## The Gap After Graduation

When I graduated, I lost access to the premium GitHub Copilot features. That left a real gap in my workflow. I had gotten used to having an AI that understood my codebase, and going back felt like losing a tool I genuinely relied on.

That is when I found **Gemini CLI**. For those who haven't heard of it, it is Google's command-line tool that lets you talk to Gemini models directly from your terminal. No browser tab switching, no copy-pasting code into a chat window. Just you, your terminal, and an AI that can read your files and help you work.

I was able to register using Google's one-year free Pro tier, so I gave it a shot. I loved the CLI experience — I could ask it to explain a function, generate boilerplate, debug a cryptic error, or restructure a messy component. The reason I gravitated toward the CLI over a browser-based chat was simple: **I never had to leave my workflow**. Everything stayed in the terminal. I could pipe in file contents, ask questions in context, and stay focused.

---

## Why I Switched to Something Better

Here is where things got frustrating again. Gemini CLI worked great for a while, but then Google stopped supporting the login method I had been using. The CLI just stopped working for me.

So I started looking for alternatives and stumbled on an open-source, terminal-based AI coding assistant that supports multiple providers. I am not going to name it directly because I do not want it to blow up and get ruined, but if you dig around for "Gemini CLI alternative" you will probably find it.

Think of it as a spiritual successor to the Gemini CLI experience, but more flexible. You are not locked into one model or one company. You can plug in different providers depending on what you need, and the core workflow stays the same: you are in your terminal, you are in context, and the AI is right there with you.

The transition was not painful. The commands feel familiar, and honestly, having model flexibility is a nice bonus. I do not have to worry about a login policy change breaking my entire setup again.

If you relied on Gemini CLI with a Google Pro account and hit the same wall I did, you will know the feeling. Go find it.

---

## Perplexity Pro and Comet: My Browser-Side AI

Terminal tools handle my in-editor coding work well, but there is a whole other category of problems that happen *outside* the code editor. Things like:

- Reading through confusing documentation
- Figuring out why a third-party service is behaving unexpectedly
- Automating repetitive tasks on a web page
- Researching a library before committing to it

For all of that, I reach for **Perplexity Pro** or **Comet**.

### Perplexity Pro

Perplexity Pro is my go-to when I need to quickly understand something and want sourced, up-to-date answers. It is especially useful when documentation is scattered or outdated. Instead of spending 20 minutes hunting across five different pages, I ask Perplexity and usually have a clear answer with sources in under a minute.

For a developer, this is genuinely useful when you are evaluating a new npm package, trying to understand how a browser API behaves across environments, or just trying to get a plain-English explanation of something the official docs wrote in the most confusing way possible.

### Comet (Perplexity's Browser)

Comet is where things get really interesting for browser-based productivity. It is Perplexity's AI-native browser, and it lets me automate things that would otherwise be tedious.

The best way I can describe it: imagine having an AI that can actually *use* the browser with you. I can ask it to do tasks on a page, help me navigate through confusing UI flows, summarize what I'm looking at, or automate steps I'd normally do manually.

For me, it fills the gap between "I need to do something repetitive on this website" and "I don't want to write a full Puppeteer script for this." Comet sits right in that sweet spot.

---

## How It All Fits Together

Here is a rough picture of how I actually use these tools day to day:

| Situation | Tool I Reach For |
|---|---|
| Writing or debugging code in the terminal | That terminal tool I mentioned |
| Understanding a cryptic error message | That terminal tool or Perplexity |
| Researching a library or API | Perplexity Pro |
| Confusing docs or browser UI | Comet |
| Automating something on a webpage | Comet |
| Quick code generation or refactoring | That terminal tool |

There is no single tool that does everything. That's the honest answer. But having the right tool for the right context makes a real difference.

---

## What I Have Actually Noticed

Since building this setup, a few things have genuinely improved:

**Less context switching.** Before, I would break my flow to Google something, open five tabs, read through mostly irrelevant results, and forget what I was originally doing. Now, most questions get answered without leaving my terminal or browser.

**Faster debugging.** Pasting an error into that terminal tool with the relevant file in context gets me to the root cause much faster than searching manually. It doesn't always get it right on the first try, but it almost always narrows things down.

**More confidence exploring unfamiliar code.** When I land on a codebase or library I haven't seen before, having an AI I can ask questions to makes exploration less intimidating. I can move faster without worrying about breaking something I don't understand yet.

**Less decision fatigue on boilerplate.** I used to spend more time than I'd like to admit writing the same structural patterns over and over. Now I generate the skeleton, review it, and adjust. Much faster.

---

## A Note on How I Think About These Tools

I want to be clear about something: AI tools are not a shortcut to skipping understanding. I still read the code. I still review what gets generated. I still make sure I understand why something works before I ship it.

The tools speed up the *boring* parts, the lookup, the boilerplate, the repetition. The thinking, the architecture decisions, the judgment calls - those are still mine.

If you use AI tools as a replacement for understanding, you will eventually get burned. But if you use them as a layer that removes friction from the parts of the job that do not require deep thought, you will get more done and enjoy the work more.

---

## Final Thoughts

My current AI toolkit is not complicated:

- A terminal-based AI tool in the terminal for coding work (after transitioning away from Gemini CLI) — I am keeping this one unnamed on purpose
- **Perplexity Pro** for research, documentation, and quick answers
- **Comet** for browser tasks, automation, and anything where I need AI that can actually interact with a page

It is a practical setup, not a flashy one. But it has made a real difference in how much I get done and how much I enjoy the process of building things.

If you are a developer who hasn't seriously integrated AI tools into your workflow yet, I'd encourage you to start small. Pick one tool, try it for a week, and see how it changes your rhythm. You might be surprised.
