<template>
  <div class="blog-layout">
    <Header />
    
    <div class="blog-page dark-background">
      <!-- Blog Hero Section -->
      <section class="blog-hero dark-background">
        <div class="container" data-aos="fade-up">
          <div class="hero-content">
            <h1>My Technical Journal</h1>
            <p>Thoughts, tutorials, and insights on web development and design.</p>
            <div class="rss-subscribe">
              <div class="rss-subscribe-header" @click="showRssHelp = !showRssHelp">
                <i class="bi bi-rss"></i>
                <span>Subscribe via RSS</span>
                <i class="bi bi-chevron-down" :class="{ rotated: showRssHelp }"></i>
              </div>
              <Transition name="rss-panel">
                <div v-if="showRssHelp" class="rss-subscribe-body">
                  <p class="rss-explanation">Get notified in your feed reader when new posts are published — no email needed.</p>
                  <div class="rss-url-row">
                    <input type="text" :value="feedUrl" readonly class="rss-url-input" @click="$event.target.select()" />
                    <button class="rss-copy-btn" @click="copyFeedUrl" :title="copied ? 'Copied!' : 'Copy URL'">
                      <i :class="copied ? 'bi bi-check-lg' : 'bi bi-clipboard'"></i>
                    </button>
                  </div>
                  <div class="rss-readers">
                    <span class="rss-readers-label">Subscribe with:</span>
                    <a :href="`https://feedly.com/i/subscription/feed/${encodeURIComponent(feedUrl)}`" target="_blank" class="reader-link" title="Feedly">
                      <img src="https://www.google.com/s2/favicons?domain=feedly.com&sz=16" alt="" /> Feedly
                    </a>
                    <a :href="`https://www.inoreader.com/?add_feed=${encodeURIComponent(feedUrl)}`" target="_blank" class="reader-link" title="Inoreader">
                      <img src="https://www.google.com/s2/favicons?domain=inoreader.com&sz=16" alt="" /> Inoreader
                    </a>
                    <a :href="`https://newsblur.com/?url=${encodeURIComponent(feedUrl)}`" target="_blank" class="reader-link" title="NewsBlur">
                      <img src="https://www.google.com/s2/favicons?domain=newsblur.com&sz=16" alt="" /> NewsBlur
                    </a>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Posts Section -->
      <section class="blog-posts dark-background">
        <div class="container">
          <div class="row">
            <!-- Loading Skeleton -->
            <template v-if="loading">
              <div v-for="n in 6" :key="n" class="col-lg-4 col-md-6 mb-4">
                <div class="post-card skeleton-card">
                  <div class="post-content">
                    <div class="skeleton skeleton-meta"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-title short"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-link"></div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div v-for="(post, index) in posts" :key="post.slug || post.url" 
                   class="col-lg-4 col-md-6 mb-4" 
                   data-aos="fade-up" 
                   :data-aos-delay="index * 100">
                <article class="post-card">
                  <div class="post-content">
                    <div class="post-meta">
                      <span class="post-date"><i class="bi bi-calendar3"></i> {{ formatDate(post.date) }}</span>
                      <span class="post-author"><i class="bi bi-person"></i> {{ post.author || 'Karl Rito' }}</span>
                    </div>
                    <h3 class="post-title">
                      <router-link v-if="!post.isExternal" :to="'/blog/' + post.slug">{{ post.title }}</router-link>
                      <a v-else :href="post.url" target="_blank">{{ post.title }} <i class="bi bi-box-arrow-up-right ms-1" style="font-size: 0.8rem;"></i></a>
                    </h3>
                    <p class="post-excerpt">{{ post.description }}</p>
                    <div class="post-footer">
                      <router-link v-if="!post.isExternal" :to="'/blog/' + post.slug" class="read-more">
                        Read Post <i class="bi bi-arrow-right"></i>
                      </router-link>
                      <a v-else :href="post.url" target="_blank" class="read-more">
                        Read on Hashnode <i class="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
              
              <div v-if="posts.length === 0 && !error" class="col-12 text-center py-5">
                <div class="no-posts">
                  <i class="bi bi-journal-x"></i>
                  <p>No posts found yet. Check back soon!</p>
                </div>
              </div>

              <div v-if="error" class="col-12 text-center py-5">
                <p class="text-danger">Error loading blog posts. Please check back later.</p>
              </div>
            </template>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import matter from 'gray-matter';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const showRssHelp = ref(false);
const copied = ref(false);
const feedUrl = window.location.origin + '/feed.xml';

const copyFeedUrl = async () => {
  try {
    await navigator.clipboard.writeText(feedUrl);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    // fallback: select the input
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(async () => {
  try {
    // Fetch Local Posts
    const postModules = import.meta.glob('../posts/*.md', { as: 'raw' });
    const localPostPromises = Object.entries(postModules).map(async ([path, getRawContent]) => {
      const rawContent = await getRawContent();
      const { data } = matter(rawContent);
      // Extract slug from filename (e.g., '../posts/my-post.md' -> 'my-post')
      const slug = path.split('/').pop().replace('.md', '');
      return {
        ...data,
        slug: data.slug || slug,
        date: new Date(data.date),
        isExternal: false
      };
    });

    const localPosts = await Promise.all(localPostPromises);
    
    // Sort posts by date descending
    localPosts.sort((a, b) => b.date - a.date);
    
    posts.value = localPosts;
  } catch (e) {
    console.error("Error loading blog posts:", e);
    error.value = e;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.blog-page {
  background-color: var(--background-color);
  min-height: 100vh;
  padding-bottom: 60px;
}

.blog-hero {
  padding: 120px 0 60px 0;
  background: linear-gradient(rgba(4, 11, 20, 0.8), rgba(4, 11, 20, 0.8)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #fff;
  margin-bottom: 50px;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    font-family: "Raleway", sans-serif;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 700px;
    margin: 0 auto;
  }

  .rss-subscribe {
    margin-top: 1.25rem;
    display: inline-block;
    text-align: left;
  }

  .rss-subscribe-header {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #f39c12;
    cursor: pointer;
    font-size: 0.95rem;
    user-select: none;
    transition: color 0.3s;

    &:hover { color: #f1c40f; }

    .bi-chevron-down {
      font-size: 0.75rem;
      transition: transform 0.25s;
      &.rotated { transform: rotate(180deg); }
    }
  }

  .rss-subscribe-body {
    margin-top: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    min-width: 360px;
  }

  .rss-explanation {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 0.75rem;
  }

  .rss-url-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .rss-url-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8rem;
    font-family: monospace;
    cursor: text;

    &:focus { outline: none; border-color: #f39c12; }
  }

  .rss-copy-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    padding: 0.4rem 0.65rem;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;

    &:hover { background: rgba(255, 255, 255, 0.15); color: #f39c12; }
  }

  .rss-readers {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .rss-readers-label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    margin-right: 0.25rem;
  }

  .reader-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 5px;
    padding: 0.25rem 0.6rem;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.8rem;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #f39c12;
      border-color: #f39c12;
    }
  }
}

.post-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.05);
    border-color: #0563bb;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    .post-title a {
      color: #0563bb;
    }

    .read-more i {
      transform: translateX(5px);
    }
  }
}

.post-content {
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.post-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: #a8a9b4;

  i {
    margin-right: 5px;
    color: #0563bb;
  }
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.4;

  a {
    color: #fff;
    text-decoration: none;
    transition: 0.3s;
  }
}

.post-excerpt {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  margin-top: auto;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #0563bb;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: 0.3s;

  i {
    margin-left: 8px;
    transition: 0.3s;
  }

  &:hover {
    color: #149ddd;
  }
}

.skeleton-card {
  pointer-events: none;
}

.skeleton {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  margin-bottom: 12px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-meta {
  height: 14px;
  width: 60%;
}

.skeleton-title {
  height: 22px;
  width: 90%;
}

.skeleton-title.short {
  width: 65%;
}

.skeleton-text {
  height: 14px;
  width: 100%;
}

.skeleton-link {
  height: 14px;
  width: 30%;
  margin-top: 20px;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

.no-posts {
  i {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }
  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
  }
}

.rss-panel-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.rss-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.rss-panel-enter-from,
.rss-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .blog-hero h1 {
    font-size: 2.5rem;
  }

  .rss-subscribe-body {
    min-width: unset;
  }
}
</style>