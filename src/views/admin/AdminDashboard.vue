<template>
  <div class="admin-dashboard dark-background">
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 class="admin-title">Blog Management</h1>
          <p class="text-muted">Manage your portfolio blog posts and drafts.</p>
        </div>
        <div class="d-flex gap-2">
          <button @click="handleLogout" class="btn btn-outline-danger">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
          <router-link to="/admin/editor" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i> Create New Post
          </router-link>
        </div>
      </div>

      <div class="admin-stats row mb-4">
        <div class="col-md-4">
          <div class="stat-card">
            <span class="stat-value">{{ posts.length }}</span>
            <span class="stat-label">Published Posts</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <span class="stat-value">{{ drafts.length }}</span>
            <span class="stat-label">Local Drafts</span>
          </div>
        </div>
      </div>

      <!-- Local Drafts Section -->
      <div v-if="drafts.length > 0" class="mb-5">
        <h3 class="mb-3 section-subtitle"><i class="bi bi-pencil-square"></i> Local Drafts</h3>
        <div class="posts-table-container">
          <table class="table admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="draft in drafts" :key="draft.slug">
                <td>
                  <span class="post-table-title">{{ draft.title || 'Untitled Draft' }}</span>
                  <small class="d-block text-muted">{{ draft.slug || 'no-slug' }}</small>
                </td>
                <td>{{ formatDate(draft.lastSaved) }}</td>
                <td>
                  <div class="btn-group">
                    <button @click="resumeDraft(draft.slug)" class="btn btn-sm btn-primary" title="Resume">
                      <i class="bi bi-play-fill"></i> Resume
                    </button>
                    <button @click="deleteDraft(draft.slug)" class="btn btn-sm btn-outline-danger" title="Delete">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Published Posts Section -->
      <div>
        <h3 class="mb-3 section-subtitle"><i class="bi bi-journal-check"></i> Published Posts</h3>
        <div class="posts-table-container">
          <table class="table admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.slug">
                <td>
                  <span class="post-table-title">{{ post.title }}</span>
                  <small class="d-block text-muted">/blog/{{ post.slug }}</small>
                </td>
                <td>{{ formatDate(post.date) }}</td>
                <td>
                  <span class="badge bg-success">Published</span>
                </td>
                <td>
                  <div class="btn-group">
                    <button @click="editPost(post.slug)" class="btn btn-sm btn-outline-light" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <router-link :to="'/blog/' + post.slug" class="btn btn-sm btn-outline-light" target="_blank" title="View">
                      <i class="bi bi-eye"></i>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr v-if="posts.length === 0">
                <td colspan="4" class="text-center py-5">
                  <p class="text-muted">No published posts found. Export a draft and add it to your project to see it here.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import matter from 'gray-matter';

const router = useRouter();
const posts = ref([]);
const drafts = ref([]);

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const editPost = (slug) => {
  router.push(`/admin/editor/${slug}`);
};

const handleLogout = () => {
  sessionStorage.removeItem('admin_auth');
  router.push('/admin/login');
};

const resumeDraft = (slug) => {
  router.push(`/admin/editor/${slug}`);
};

const deleteDraft = (slug) => {
  if (confirm(`Are you sure you want to delete the draft: ${slug}?`)) {
    localStorage.removeItem(`draft_${slug}`);
    loadDrafts();
  }
};

const loadDrafts = () => {
  const localDrafts = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('draft_')) {
      try {
        const draftData = JSON.parse(localStorage.getItem(key));
        localDrafts.push({
          ...draftData,
          lastSaved: new Date() // Ideally store timestamp in saveDraft
        });
      } catch (e) {
        console.error("Error parsing draft:", key);
      }
    }
  }
  drafts.value = localDrafts;
};

onMounted(async () => {
  loadDrafts();
  
  try {
    const postModules = import.meta.glob('../../posts/*.md', { as: 'raw' });

    const postPromises = Object.entries(postModules).map(async ([path, getRawContent]) => {
      const rawContent = await getRawContent();
      const { data } = matter(rawContent);
      return {
        ...data,
        date: new Date(data.date),
      };
    });

    let loadedPosts = await Promise.all(postPromises);
    loadedPosts.sort((a, b) => b.date - a.date);
    posts.value = loadedPosts;
  } catch (e) {
    console.error("Error loading blog posts for admin:", e);
  }
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  background-color: var(--background-color);
  min-height: 100vh;
  color: var(--default-color);
  padding-top: 50px;
}

.admin-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
}

.section-subtitle {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  color: #0563bb;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0563bb;
  }
  .stat-label {
    color: #a8a9b4;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
}

.posts-table-container {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.admin-table {
  margin-bottom: 0;
  color: #fff;

  thead th {
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 15px 20px;
    color: #a8a9b4;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  tbody td {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
  }

  .post-table-title {
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.btn-primary {
  background: #0563bb;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 8px;
  &:hover {
    background: #0678e3;
  }
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.2);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
  }
}

.btn-outline-danger {
  color: #dc3545;
  border-color: rgba(220, 53, 69, 0.3);
  &:hover {
    background: #dc3545;
    color: #fff;
  }
}
</style>