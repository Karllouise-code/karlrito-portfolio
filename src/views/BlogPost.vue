<template>
  <div class="blog-layout">
    <Header />

    <div class="blog-post-view dark-background">
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
      </div>

      <div class="container py-5">
        <router-link to="/blog" class="back-link mb-4">
          <i class="bi bi-arrow-left"></i> Back to Journal
        </router-link>

        <article v-if="post.title" class="post-article" data-aos="fade-up">
          <header class="post-header">
            <div class="post-meta mb-3">
              <span class="post-category" v-if="post.category">{{ post.category }}</span>
              <span class="divider-dot" v-if="post.category"></span>
              <span class="post-date">{{ formattedDate }}</span>
              <span class="divider-dot" v-if="readingTime"></span>
              <span class="read-time" v-if="readingTime">{{ readingTime }} min read</span>
            </div>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="title-underline"></div>
            <div class="author-info mt-4">
              <div>
                <span class="author-name">{{ post.author || 'Karl Rito' }}</span>
                <span class="author-sep">/</span>
                <span class="author-role">Software Developer</span>
              </div>
            </div>
          </header>

          <div class="post-content" v-html="post.content"></div>

          <footer class="post-footer mt-5 pt-5">
            <div class="share-section">
              <span class="share-label">Share this</span>
              <div class="share-links">
                <a href="#" @click.prevent="share('twitter')" class="share-link">
                  <i class="bi bi-twitter-x"></i>
                  <span>Twitter</span>
                </a>
                <a href="#" @click.prevent="share('linkedin')" class="share-link">
                  <i class="bi bi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="#" @click.prevent="share('facebook')" class="share-link">
                  <i class="bi bi-facebook"></i>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </footer>
        </article>

        <div v-else-if="!loading" class="not-found text-center py-5">
          <i class="bi bi-exclamation-circle display-1 text-muted"></i>
          <h2 class="mt-4">Post not found</h2>
          <p class="text-muted">The article you're looking for might have been moved or deleted.</p>
          <router-link to="/blog" class="btn btn-primary mt-3">Browse all posts</router-link>
        </div>

        <div v-else class="loading-state text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const router = useRouter();
const post = ref({});
const loading = ref(true);
const scrollProgress = ref(0);

const formattedDate = computed(() => {
  if (!post.value.date) return '';
  const d = new Date(post.value.date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
});

const readingTime = computed(() => {
  if (!post.value.rawContent) return 0;
  const wordsPerMinute = 200;
  const noOfWords = post.value.rawContent.split(/\s/g).length;
  return Math.ceil(noOfWords / wordsPerMinute);
});

const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = (winScroll / height) * 100;
};

const share = (platform) => {
  const url = window.location.href;
  const title = post.value.title;
  let shareUrl = '';

  if (platform === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  } else if (platform === 'linkedin') {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  } else if (platform === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  }

  if (shareUrl) window.open(shareUrl, '_blank');
};

onMounted(async () => {
  window.addEventListener('scroll', updateScrollProgress);
  const slug = route.params.slug;
  try {
    const rawContent = await import(`../posts/${slug}.md?raw`);
    const { data, content } = matter(rawContent.default);

    post.value = {
      ...data,
      content: marked(content),
      rawContent: content
    };

    const postTitle = `${post.value.title} — Karl Rito`;
    const postDesc = post.value.description || `Read ${post.value.title} on Karl Rito's blog.`;
    const postUrl = `https://karllouiserito.netlify.app/blog/${slug}`;
    const postImage = post.value.image
      ? `https://karllouiserito.netlify.app${post.value.image}`
      : 'https://karllouiserito.netlify.app/og-default.png';

    document.title = postTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', postDesc);
    setMeta('property', 'og:title', postTitle);
    setMeta('property', 'og:description', postDesc);
    setMeta('property', 'og:url', postUrl);
    setMeta('property', 'og:image', postImage);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:title', postTitle);
    setMeta('name', 'twitter:description', postDesc);
    setMeta('name', 'twitter:image', postImage);
  } catch (e) {
    router.replace('/404');
    return;
  } finally {
    loading.value = false;
  }

  nextTick(() => {
    document.querySelectorAll('.post-content pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  });
});

onUnmounted(() => {
  document.title = "Karl Louise Rito";
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<style lang="scss" scoped>
$blog-accent: #e6a817;
$blog-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

.blog-post-view {
  background-color: var(--background-color);
  color: var(--default-color);
  min-height: 100vh;
  padding-top: 100px;
}

.progress-container {
  width: 100%;
  height: 3px;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.progress-bar {
  height: 3px;
  background: $blog-accent;
  width: 0%;
  transition: width 0.1s linear;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #8b949e;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s;
  font-family: $blog-mono;

  i {
    margin-right: 8px;
    transition: transform 0.3s;
  }

  &:hover {
    color: $blog-accent;
    i {
      transform: translateX(-5px);
    }
  }
}

.post-article {
  max-width: 740px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 3rem;

  .post-meta {
    font-size: 0.85rem;
    color: #8b949e;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $blog-mono;

    .post-category {
      background: rgba($blog-accent, 0.1);
      color: $blog-accent;
      padding: 0.15rem 0.7rem;
      border-radius: 3px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
      border: 1px solid rgba($blog-accent, 0.2);
    }

    .divider-dot {
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }

    .read-time i {
      margin-right: 4px;
    }
  }

  .post-title {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.15;
    font-family: "Raleway", sans-serif;
    letter-spacing: -0.02em;
    color: #e8ecf1;
    margin-bottom: 0;
  }

  .title-underline {
    width: 60px;
    height: 3px;
    background: $blog-accent;
    margin-top: 1.25rem;
    border-radius: 2px;
  }
}

.author-info {
  font-size: 0.95rem;
  color: #8b949e;

  .author-name {
    font-weight: 600;
    color: #c8cfd8;
  }

  .author-sep {
    margin: 0 0.5rem;
    color: rgba(255, 255, 255, 0.15);
  }

  .author-role {
    font-size: 0.85rem;
  }
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.85);

  :deep(h2) {
    font-size: 1.8rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
    color: #e8ecf1;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  :deep(h3) {
    font-size: 1.4rem;
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
    color: #e8ecf1;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
  }

  :deep(h4) {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #e8ecf1;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(strong) {
    color: #e8ecf1;
  }

  :deep(a) {
    color: $blog-accent;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
    transition: color 0.3s;

    &:hover {
      color: #f0c040;
    }
  }

  :deep(blockquote) {
    position: relative;
    border-left: none;
    padding: 1.25rem 1.5rem 1.25rem 3rem;
    margin: 2.5rem 0;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.75);
    font-style: italic;

    &::before {
      content: '\201C';
      position: absolute;
      left: 1rem;
      top: 0.75rem;
      font-size: 2.5rem;
      line-height: 1;
      color: $blog-accent;
      font-family: Georgia, serif;
      opacity: 0.6;
    }
  }

  :deep(pre) {
    background: #0d1117;
    padding: 1.5rem;
    border-radius: 10px;
    margin: 2rem 0;
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  :deep(code) {
    font-family: $blog-mono;
    font-size: 0.9em;
    background: rgba(255, 255, 255, 0.06);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    color: #e2e8f0;
  }

  :deep(pre code) {
    background: transparent;
    padding: 0;
    color: #f0f6fc;
    font-size: 0.9rem;
  }

  :deep(ul), :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin: 2.5rem 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }

  :deep(hr) {
    border: none;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 2.5rem 0;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.95rem;

    th, td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.6rem 1rem;
      text-align: left;
    }

    th {
      background: rgba(255, 255, 255, 0.04);
      font-weight: 600;
      color: #e8ecf1;
    }

    td {
      color: rgba(255, 255, 255, 0.75);
    }
  }
}

.post-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.share-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .share-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8b949e;
    font-family: $blog-mono;
  }

  .share-links {
    display: flex;
    gap: 8px;
  }

  .share-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #8b949e;
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.25s;

    i {
      font-size: 1rem;
    }

    span {
      font-size: 0.8rem;
    }

    &:hover {
      background: rgba($blog-accent, 0.1);
      border-color: rgba($blog-accent, 0.3);
      color: $blog-accent;
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 768px) {
  .blog-post-view {
    padding-top: 80px;
  }

  .post-header {
    .post-title {
      font-size: 2rem;
    }
  }

  .post-content {
    font-size: 1rem;
  }

  .share-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
