<template>
  <div class="blog-layout">
    <Header />

    <div class="blog-page dark-background">
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

      <section class="blog-posts dark-background">
        <div class="container">
          <div v-if="loading" class="row">
            <div class="col-lg-8 mb-4">
              <div class="post-card skeleton-card featured-skeleton">
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
            <div v-for="n in 4" :key="n" class="col-lg-6 mb-4">
              <div class="post-card skeleton-card">
                <div class="post-content">
                  <div class="skeleton skeleton-meta"></div>
                  <div class="skeleton skeleton-title"></div>
                  <div class="skeleton skeleton-text"></div>
                  <div class="skeleton skeleton-link"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="posts.length > 0" class="row">
            <div class="col-lg-8 mb-4" data-aos="fade-up">
              <article class="post-card featured">
                <div class="post-content">
                  <div class="post-meta">
                    <span class="post-date"><i class="bi bi-calendar3"></i> {{ formatDate(posts[0].date) }}</span>
                    <span class="post-category" :style="{ '--cat-color': categoryColor(posts[0].category) }">{{ posts[0].category }}</span>
                  </div>
                  <h3 class="post-title">
                    <router-link v-if="!posts[0].isExternal" :to="'/blog/' + posts[0].slug">{{ posts[0].title }}</router-link>
                    <a v-else :href="posts[0].url" target="_blank">{{ posts[0].title }} <i class="bi bi-box-arrow-up-right ms-1" style="font-size: 0.8rem;"></i></a>
                  </h3>
                  <p class="post-excerpt">{{ posts[0].description }}</p>
                  <div class="post-footer">
                    <router-link v-if="!posts[0].isExternal" :to="'/blog/' + posts[0].slug" class="read-more">
                      Read Post <i class="bi bi-arrow-right"></i>
                    </router-link>
                    <a v-else :href="posts[0].url" target="_blank" class="read-more">
                      Read on Hashnode <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div class="col-lg-4 mb-4 d-flex flex-column gap-4" data-aos="fade-up" data-aos-delay="100">
              <div class="posts-sidebar-stats">
                <span class="stat-count">{{ posts.length }}</span>
                <span class="stat-label">posts published</span>
              </div>
            </div>

            <div v-for="(post, index) in posts.slice(1)" :key="post.slug || post.url"
                 class="col-lg-6 mb-4"
                 data-aos="fade-up"
                 :data-aos-delay="(index + 1) * 50">
              <article class="post-card">
                <div class="post-content">
                  <div class="post-meta">
                    <span class="post-date"><i class="bi bi-calendar3"></i> {{ formatDate(post.date) }}</span>
                    <span v-if="post.category" class="post-category" :style="{ '--cat-color': categoryColor(post.category) }">{{ post.category }}</span>
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
          </div>

          <div v-else class="row">
            <div v-if="error" class="col-12 text-center py-5">
              <p class="text-danger">Error loading blog posts. Please check back later.</p>
            </div>
            <div v-else class="col-12 text-center py-5">
              <div class="no-posts">
                <i class="bi bi-journal-x"></i>
                <p>No posts found yet. Check back soon!</p>
              </div>
            </div>
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

const categoryColor = (cat) => {
  const colors = {
    tech: '#58a6ff',
    design: '#d2a8ff',
    life: '#3fb950',
    tutorial: '#e6a817'
  };
  return colors[cat?.toLowerCase()] || '#8b949e';
};

const copyFeedUrl = async () => {
  try {
    await navigator.clipboard.writeText(feedUrl);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    // fallback
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

onMounted(async () => {
  try {
    const postModules = import.meta.glob('../posts/*.md', { as: 'raw' });
    const localPostPromises = Object.entries(postModules).map(async ([path, getRawContent]) => {
      const rawContent = await getRawContent();
      const { data } = matter(rawContent);
      const slug = path.split('/').pop().replace('.md', '');
      return {
        ...data,
        slug: data.slug || slug,
        date: new Date(data.date),
        isExternal: false
      };
    });

    const localPosts = await Promise.all(localPostPromises);
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
$blog-accent: #e6a817;
$blog-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

.blog-page {
  background-color: var(--background-color);
  min-height: 100vh;
  padding-bottom: 80px;
}

.blog-hero {
  padding: 140px 0 70px 0;
  position: relative;
  text-align: center;
  color: #fff;
  margin-bottom: 60px;
  background: linear-gradient(180deg, #0d1117 0%, #13161c 60%, var(--background-color) 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(230, 168, 23, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230, 168, 23, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 15px;
    font-family: "Raleway", sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.65);
    max-width: 600px;
    margin: 0 auto;
  }

  .rss-subscribe {
    margin-top: 1.5rem;
    display: inline-block;
    text-align: left;
  }

  .rss-subscribe-header {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: $blog-accent;
    cursor: pointer;
    font-size: 0.9rem;
    user-select: none;
    transition: color 0.3s;
    font-family: $blog-mono;

    &:hover { color: #f0c040; }

    .bi-chevron-down {
      font-size: 0.75rem;
      transition: transform 0.25s;
      &.rotated { transform: rotate(180deg); }
    }
  }

  .rss-subscribe-body {
    margin-top: 0.75rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    min-width: 400px;
  }

  .rss-explanation {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.55);
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
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    font-family: $blog-mono;
    cursor: text;

    &:focus { outline: none; border-color: $blog-accent; }
  }

  .rss-copy-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.6);
    padding: 0.4rem 0.65rem;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;

    &:hover { background: rgba($blog-accent, 0.15); color: $blog-accent; border-color: $blog-accent; }
  }

  .rss-readers {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .rss-readers-label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    margin-right: 0.25rem;
  }

  .reader-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 5px;
    padding: 0.25rem 0.6rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background: rgba($blog-accent, 0.1);
      color: $blog-accent;
      border-color: $blog-accent;
    }
  }
}

.post-card {
  background: var(--surface-color);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: $blog-accent;
    transition: height 0.35s ease;
    border-radius: 0 0 3px 3px;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba($blog-accent, 0.3);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);

    &::before {
      height: 100%;
    }

    .post-title a {
      color: $blog-accent;
    }

    .read-more i {
      transform: translateX(5px);
    }
  }

  &.featured {
    border-color: rgba($blog-accent, 0.15);

    .post-title {
      font-size: 1.8rem;
    }

    &::before {
      height: 100%;
      background: $blog-accent;
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
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  font-family: $blog-mono;
  font-size: 0.8rem;
  color: #8b949e;

  i {
    margin-right: 4px;
    font-size: 0.75rem;
  }
}

.post-date {
  color: #8b949e;
}

.post-category {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(0, 0, 0, 0.3);
  color: var(--cat-color, #8b949e);
  border: 1px solid rgba(var(--cat-color, #8b949e), 0.2);
}

.post-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.35;

  a {
    color: #e8ecf1;
    text-decoration: none;
    transition: color 0.3s;
  }
}

.post-excerpt {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.95rem;
  line-height: 1.65;
  margin-bottom: 20px;
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
  color: $blog-accent;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.3s;
  font-family: $blog-mono;

  i {
    margin-left: 8px;
    transition: transform 0.3s;
  }

  &:hover {
    color: #f0c040;
  }
}

.posts-sidebar-stats {
  background: var(--surface-color);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .stat-count {
    display: block;
    font-size: 3rem;
    font-weight: 800;
    color: $blog-accent;
    font-family: $blog-mono;
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #8b949e;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.skeleton-card {
  pointer-events: none;
}

.skeleton {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  margin-bottom: 12px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-meta { height: 14px; width: 40%; }
.skeleton-title { height: 22px; width: 85%; }
.skeleton-title.short { width: 55%; }
.skeleton-text { height: 14px; width: 100%; }
.skeleton-link { height: 14px; width: 25%; margin-top: 20px; }

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.no-posts {
  i {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.08);
    margin-bottom: 20px;
  }
  p {
    color: rgba(255, 255, 255, 0.4);
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
  .blog-hero {
    padding: 130px 0 50px 0 !important;

    h1 {
      font-size: 2.5rem;
    }
  }

  .rss-subscribe-body {
    min-width: unset;
  }

  .post-card.featured .post-title {
    font-size: 1.4rem;
  }

  .posts-sidebar-stats {
    display: none;
  }
}
</style>
