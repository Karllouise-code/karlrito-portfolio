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
          </div>
        </div>
      </section>

      <!-- Blog Posts Section -->
      <section class="blog-posts dark-background">
        <div class="container">
          <div class="row">
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
const error = ref(null);

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

@media (max-width: 768px) {
  .blog-hero h1 {
    font-size: 2.5rem;
  }
}
</style>