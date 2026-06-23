<template>
  <div class="blog-layout">
    <Header />

    <div class="blog-post-view dark-background">
      <!-- Reading Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
      </div>

      <div class="container py-5">
        <!-- Back Button -->
        <router-link to="/blog" class="back-link mb-4">
          <i class="bi bi-arrow-left"></i> Back to Blog
        </router-link>

        <article v-if="post.title" class="post-article" data-aos="fade-up">
          <header class="post-header">
            <div class="post-meta mb-3">
              <span class="category" v-if="post.category">{{ post.category }}</span>
              <span class="date">{{ formattedDate }}</span>
              <span class="read-time" v-if="readingTime"><i class="bi bi-clock"></i> {{ readingTime }} min read</span>
            </div>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="author-info d-flex align-items-center mt-4">
              <div>
                <span class="author-name d-block">Written by {{ post.author || 'Karl Rito' }}</span>
                <span class="author-role text-muted">Software Developer</span>
              </div>
            </div>
          </header>

          <hr class="header-divider">

          <div class="post-content" v-html="post.content"></div>

          <footer class="post-footer mt-5 pt-5 border-top">
            <div class="share-section">
              <h5>Share this post</h5>
              <div class="social-links mt-3">
                <a href="#" @click.prevent="share('twitter')"><i class="bi bi-twitter-x"></i></a>
                <a href="#" @click.prevent="share('linkedin')"><i class="bi bi-linkedin"></i></a>
                <a href="#" @click.prevent="share('facebook')"><i class="bi bi-facebook"></i></a>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import matter from 'gray-matter';
import { marked } from 'marked';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const post = ref({});
const loading = ref(true);
const scrollProgress = ref(0);

const formattedDate = computed(() => {
  if (!post.value.date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(post.value.date).toLocaleDateString(undefined, options);
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
  } catch (e) {
    console.error('Could not load post:', e);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<style lang="scss" scoped>
.blog-post-view {
  background-color: var(--background-color);
  color: var(--default-color);
  min-height: 100vh;
  padding-top: 100px;
}

.progress-container {
  width: 100%;
  height: 4px;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.progress-bar {
  height: 4px;
  background: #0563bb;
  width: 0%;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #a8a9b4;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;

  i {
    margin-right: 8px;
    transition: 0.3s;
  }

  &:hover {
    color: #0563bb;
    i {
      transform: translateX(-5px);
    }
  }
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 2rem;

  .post-meta {
    font-size: 0.9rem;
    color: #a8a9b4;
    display: flex;
    align-items: center;
    gap: 15px;

    .category {
      background: rgba(5, 99, 187, 0.2);
      color: #0563bb;
      padding: 2px 10px;
      border-radius: 20px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
  }

  .post-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    font-family: "Raleway", sans-serif;
  }
}

.author-info {
  .author-avatar img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 2px solid #0563bb;
  }
  .author-name {
    font-weight: 600;
    font-size: 1.1rem;
  }
  .author-role {
    font-size: 0.85rem;
  }
}

.header-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2.5rem 0;
}

.post-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);

  :deep(h2), :deep(h3), :deep(h4) {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: #fff;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(strong) {
    color: #fff;
  }

  :deep(a) {
    color: #0563bb;
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: 0.3s;
    &:hover {
      color: #149ddd;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid #0563bb;
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    background: rgba(255, 255, 255, 0.03);
    font-style: italic;
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(pre) {
    background: #0f172a;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  :deep(code) {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.95em;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    color: #e2e8f0;
  }

  :deep(pre code) {
    background: transparent;
    padding: 0;
    color: #f8fafc;
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
    border-radius: 12px;
    margin: 2.5rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
}

.share-section {
  h5 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    color: #a8a9b4;
  }
  .social-links {
    display: flex;
    gap: 15px;
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-decoration: none;
      transition: 0.3s;
      &:hover {
        background: #0563bb;
        transform: translateY(-3px);
      }
    }
  }
}

@media (max-width: 768px) {
  .post-header .post-title {
    font-size: 2.2rem;
  }
  .blog-post-view {
    padding-top: 80px;
  }
}
</style>
