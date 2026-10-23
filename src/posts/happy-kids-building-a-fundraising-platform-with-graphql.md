---
title: 'Happy Kids: Building a Fundraising Platform with GraphQL'
date: '2026-08-08'
author: Karl Rito
slug: happy-kids-building-a-fundraising-platform-with-graphql
description: >-
  A thesis project that became more than just a requirement. How two developers
  built a fundraising CMS for a children's health and education non-profit using
  Laravel, Vue.js, and GraphQL - and won Best Presentation.
category: Vue.js
---
Some projects are just school requirements. Happy Kids was not one of them.

It started as our thesis project at Trimex Colleges. Two of us were the only developers on the team, tasked with building a fundraising platform for a non-profit organization that helps children with their health and education. What began as a grade became something we were genuinely proud of — enough to win **Best Presentation** for our batch.

Looking back, this project taught me more about real-world architecture than any tutorial could. And it was also the first time I got to put the Laravel + Vue stack I was using at work into a full, production-style CMS.

---

## The Goal

The Happy Kids organization needed a way to raise funds online. More than just a simple donation form, they needed a content management system where they could manage their entire website without touching code. 

That meant we needed to build:

- A **public website** where people could read about the cause, see events, read blog posts, and donate
- An **admin CMS** where the organization could create, update, and delete all of that content
- A **PayPal payment gateway** to actually process donations
- A system flexible enough to grow as their needs changed

---

## Why GraphQL

At the time, this was during my early career learning Laravel + Vue at work. Our company stack was already using [rebing/graphql-laravel](https://github.com/rebing/graphql-laravel), so we decided to carry that over to our thesis.

Instead of building a traditional REST API with tons of controller endpoints, we went with GraphQL. The appeal was simple: the frontend could request exactly what it needed in a single query, and our admin and public site could share the same data layer without over-fetching or under-fetching.

Another big win — **everything went through `POST` requests**. Whether we were querying for blog posts or creating a new event, it all hit the same GraphQL endpoint. That consistency made it much easier to work with on the Vue.js frontend using Axios.

---

## The Architecture: Queries, Mutations, Types, and Inputs

The structure we ended up with was very intentional. With `rebing/graphql-laravel`, we split everything into four main pieces: `Queries`, `Mutations`, `Types`, and `Inputs`. This kept our codebase organized and easy to scale.

### Types - Defining the Shape

Types tell GraphQL what our data looks like. For example, our `BlogType` mapped the database columns (prefixed with `fldBlog*` in our schema) to clean, usable fields on the frontend. We even added custom serialization for things like encrypted IDs and auto-generating `.webp` image paths.

```php
// app/GraphQL/Types/BlogType.php (excerpt)
'blogs_id' => [
    'type' => new CustomScalarType([
        'name' => 'blog_encrypted_id',
        'serialize' => function ($value) {
            return Crypt::encryptString($value);
        }
    ]),
    'alias' => 'fldBlogID',
],
'author' => [
    'type' => GraphQL::type('admin_type'),
],
'blog_category' => [
    'type' => GraphQL::type('blog_category_type'),
],
```

Notice the `author` and `blog_category` relationships. Through Eloquent relationships, we could resolve these directly in our types. A blog post didn't just return its data — it returned the full admin record of whoever wrote it, and the category it belonged to.

### Queries - Fetching Data

All of our read operations lived in `Queries`. Instead of creating separate endpoints for every use case, we used an `action_type` argument to route to different methods on our models.

```php
// app/GraphQL/Queries/BlogQuery.php (excerpt)
public function args(): array {
    return [
        'action_type' => [ 'type' => Type::string()],
        'blog_id' => [ 'type' => Type::string()],
    ];
}

public function resolve($root, $args) {
    $blog_model = new Blog();

    if($args['action_type'] == "display_all") {
        $blog = $blog_model->displayAll();
    }

    if($args['action_type'] == "display_by_id") {
        $blog = $blog_model->displayBlogByID($args['blog_id']);
    }

    if($args['action_type'] == "take_2_blogs") {
        $blog = $blog_model->take(2)->get();
    }

    return $blog;
}
```

The same pattern applied to events, pages, FAQs, testimonials, and more. The public site would call `blogs` with `display_all` to render blog cards. A single post page would call it with `display_by_id`. Simple, reusable, and easy to reason about.

### Mutations and Inputs - Writing Data

For creating, updating, and deleting, we used `Mutations`. Each mutation accepted a typed `Input` object that defined exactly what fields were allowed. We also handled file uploads directly through GraphQL (for blog images, thumbnails, etc.) using the `Upload` scalar type.

```php
// app/GraphQL/Mutations/BlogMutation.php (excerpt)
public function args(): array {
    return [
        'blogs' => ['type' => GraphQL::type('blog_input')],
        'file' => ['type' => GraphQL::type('Upload')],
        'file1' => ['type' => GraphQL::type('Upload')],
        'thumbnail' => ['type' => GraphQL::type('Upload')],
    ];
}

public function resolve($root, $args) {
    $blogs = $args['blogs'];

    if ($blogs['action_type'] == "add") { /* create blog + upload images */ }
    if ($blogs['action_type'] == "update") { /* decrypt ID, update + upload */ }
    if ($blogs['action_type'] == "delete_record") { /* delete */ }
    if ($blogs['action_type'] == "add_blog_views") { /* increment views */ }
    if ($blogs['action_type'] == "upload_image_to_editor") { /* for WYSIWYG */ }
}
```

The input object kept validation tight and made it clear what data was expected per action. We also used Laravel's validation rules on mutations to ensure required fields like blog titles weren't submitted empty.

---

## The CMS That Powered Everything

What made Happy Kids special was how dynamic it was. The **admin panel** was where everything came to life. An admin could create blog posts and assign themselves as the author. They could create events with start/end dates and locations. They could manage pages, FAQs, testimonials, the team, and more.

All of those relationships were tied together with Eloquent. A `Blog` belonged to a `BlogCategory` and an `Administrator` (author). An `Event` belonged to an admin. When the frontend queried these, our GraphQL types resolved those relationships and pulled in the full related data automatically.

The public website was fully driven by this content. Want to add a new blog post? Create it in the admin, publish it, and it would show up on the site. Need to update an event? Change it in the CMS and it's reflected instantly. No code changes needed after deployment.

We also integrated **PayPal** for donations, allowing supporters to contribute directly through the platform. It was our first time working with a real payment gateway, which was both nerve-wracking and rewarding.

---

## Winning Best Presentation

With just two developers, we had to cover everything — backend architecture, GraphQL schema design, Vue.js frontend, admin CMS, file uploads, image optimization, relationships, authentication, and PayPal integration. It was a lot, but building with a stack we were already comfortable with gave us the confidence to push further.

On presentation day, we walked through the problem, our solution, the architecture, and a live demo of both the admin panel and the public site. Winning **Best Presentation** validated all of those late nights. It wasn't just that our project worked — it was that we could clearly explain *why* we built it the way we did.

---

## Lessons I Still Carry With Me

Happy Kids stuck with me for a few reasons:

- **GraphQL is powerful when used intentionally.** Splitting into Queries, Mutations, Types, and Inputs might feel verbose at first, but it scales incredibly well. Coming from a work stack that used this pattern made it feel natural.
- **Admin-driven content is a game-changer.** Building a CMS taught me to think beyond "pages" and think in terms of content types and relationships. It's a mindset I still use today.
- **Eloquent relationships are underrated.** Being able to resolve `author`, `blog_category`, and other relations through GraphQL types felt like magic at the time, and it's still one of my favorite patterns.
- **Real projects teach the most.** Thesis projects can feel forced, but treating this like a real product for a real organization made all the difference. We weren't just trying to pass — we were trying to solve an actual problem.
- **Two people can build a lot.** With clear communication and a shared stack, my teammate and I were able to build something far beyond what either of us could've done alone.

---

## Final Thoughts

You can see the live site [here](http://happykids.byethost16.com/). It's not perfect — it's a college thesis hosted on free hosting — but it represents a pivotal moment in my growth as a developer.

It was the bridge between "learning from tutorials" and "building something real". It was where Laravel, Vue, and GraphQL all clicked together for me. And it's proof that with the right stack and the right teammate, two students can build a full fundraising platform from scratch.

If you're ever on the fence about using GraphQL in a Laravel + Vue project, I'd say give it a shot. It's not always necessary, but for a content-heavy CMS like this, it was the perfect fit.

Happy coding!
