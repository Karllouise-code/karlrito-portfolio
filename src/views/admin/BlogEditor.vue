<template>
  <div class="blog-editor dark-background">
    <div v-if="hasUnsavedSession" class="restore-banner">
      <span>We found an unsaved session from your last visit. Would you like to restore it?</span>
      <div class="banner-actions">
        <button @click="restoreLastSession" class="btn btn-sm btn-primary">Restore Session</button>
        <button @click="hasUnsavedSession = false" class="btn btn-sm btn-link text-white">Dismiss</button>
      </div>
    </div>
    <div class="editor-header">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <router-link to="/admin" class="back-link me-4">
            <i class="bi bi-arrow-left"></i>
          </router-link>
          <h2 class="mb-0">{{ isEditing ? 'Edit Post' : 'New Blog Post' }}</h2>
        </div>
        <div class="editor-actions">
          <button @click="saveDraft" class="btn btn-outline-light me-2">
            <i class="bi bi-save"></i> Save Draft
          </button>
          <button @click="exportMarkdown" class="btn btn-primary">
            <i class="bi bi-download"></i> Export Markdown
          </button>
        </div>
      </div>
    </div>

    <div class="editor-container">
      <!-- Form Section -->
      <div class="editor-form p-4">
        <div class="row g-3">
          <div class="col-md-8">
            <label class="form-label">Title</label>
            <input v-model="form.title" @input="updateSlug" type="text" class="form-control" placeholder="Enter post title...">
          </div>
          <div class="col-md-4">
            <label class="form-label">Slug</label>
            <input v-model="form.slug" type="text" class="form-control" placeholder="url-friendly-slug">
          </div>
          <div class="col-md-4">
            <label class="form-label">Date</label>
            <input v-model="form.date" type="date" class="form-control">
          </div>
          <div class="col-md-4">
            <label class="form-label">Category</label>
            <input v-model="form.category" type="text" class="form-control" placeholder="e.g., Tutorial, News">
          </div>
          <div class="col-md-4">
            <label class="form-label">Author</label>
            <input v-model="form.author" type="text" class="form-control" placeholder="Karl Rito">
          </div>
          <div class="col-12">
            <label class="form-label">Description (Summary)</label>
            <textarea v-model="form.description" class="form-control" rows="2" placeholder="Brief summary of the post..."></textarea>
          </div>
        </div>

        <div class="content-editor mt-4">
          <label class="form-label">Content (Markdown)</label>
          <textarea v-model="form.content" class="form-control markdown-textarea" rows="20" placeholder="Write your post content here using Markdown..."></textarea>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="editor-preview p-4 border-start">
        <div class="preview-label mb-3">
          <i class="bi bi-eye"></i> Live Preview
        </div>
        <div class="preview-content">
          <header class="post-header mb-4">
            <div class="post-meta mb-2">
              <span class="badge bg-primary me-2" v-if="form.category">{{ form.category }}</span>
              <span class="text-muted">{{ formatDate(form.date) }}</span>
            </div>
            <h1 class="preview-title">{{ form.title || 'Untitled Post' }}</h1>
          </header>
          <div class="markdown-preview" v-html="previewHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import matter from 'gray-matter';
import { marked } from 'marked';

const route = useRoute();
const router = useRouter();

const isEditing = ref(false);
const hasUnsavedSession = ref(false);

const form = ref({
  title: '',
  slug: '',
  date: new Date().toISOString().split('T')[0],
  author: 'Karl Rito',
  description: '',
  category: '',
  content: ''
});

const previewHtml = computed(() => {
  return marked(form.value.content || '*No content yet.*');
});

const updateSlug = () => {
  if (!isEditing.value) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const restoreLastSession = () => {
  const lastSession = localStorage.getItem('editor_current_draft');
  if (lastSession) {
    form.value = JSON.parse(lastSession);
    hasUnsavedSession.value = false;
    alert('Session restored!');
  }
};

const saveDraft = () => {
  form.value.lastSaved = new Date().toISOString();
  localStorage.setItem(`draft_${form.value.slug || 'new'}`, JSON.stringify(form.value));
  alert('Draft saved to local storage! You can access it from the Admin Dashboard.');
};

const exportMarkdown = () => {
  const frontmatter = {
    title: form.value.title,
    date: form.value.date,
    author: form.value.author,
    slug: form.value.slug,
    description: form.value.description,
    category: form.value.category
  };

  const mdContent = matter.stringify(form.value.content, frontmatter);
  const blob = new Blob([mdContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${form.value.slug || 'post'}.md`;
  a.click();
  URL.revokeObjectURL(url);
};

onMounted(async () => {
  const slug = route.params.slug;
  
  // Check for unsaved session if not editing an existing post
  if (!slug) {
    const lastSession = localStorage.getItem('editor_current_draft');
    if (lastSession) {
      const parsed = JSON.parse(lastSession);
      if (parsed.title || parsed.content) {
        hasUnsavedSession.value = true;
      }
    }
  }

  if (slug) {
    isEditing.value = true;
    try {
      // Try to load from posts first
      const rawContent = await import(`../../posts/${slug}.md?raw`);
      const { data, content } = matter(rawContent.default);
      form.value = {
        ...data,
        content
      };
    } catch (e) {
      // If fail, check local storage
      const draft = localStorage.getItem(`draft_${slug}`);
      if (draft) {
        form.value = JSON.parse(draft);
      }
    }
  }
});

// Auto-save draft to local storage on change
watch(form, (newVal) => {
  if (newVal.title || newVal.content) {
    localStorage.setItem('editor_current_draft', JSON.stringify(newVal));
  }
}, { deep: true });
</script>

<style lang="scss" scoped>
.restore-banner {
  background: #0563bb;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  z-index: 100;

  .banner-actions {
    display: flex;
    gap: 15px;
    align-items: center;
  }
}

.blog-editor {
  background-color: var(--background-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--default-color);
}

.editor-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;
  z-index: 10;
}

.back-link {
  color: #a8a9b4;
  font-size: 1.5rem;
  transition: 0.3s;
  &:hover {
    color: #0563bb;
  }
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-grow: 1;
  overflow: hidden;
}

.editor-form {
  overflow-y: auto;
  
  .form-label {
    color: #a8a9b4;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .form-control {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 8px;
    padding: 12px;

    &:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: #0563bb;
      box-shadow: 0 0 0 0.25rem rgba(5, 99, 187, 0.25);
    }
  }

  .markdown-textarea {
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    line-height: 1.6;
    resize: none;
  }
}

.editor-preview {
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.01);

  .preview-label {
    color: #0563bb;
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .preview-content {
    background: transparent;
    max-width: 100%;
  }

  .preview-title {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: "Raleway", sans-serif;
  }
}

.markdown-preview {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);

  :deep(h2), :deep(h3) {
    margin-top: 2rem;
    color: #fff;
  }
  :deep(p) { margin-bottom: 1.2rem; }
  :deep(pre) {
    background: #0f172a;
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
  :deep(code) {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 5px;
    border-radius: 4px;
  }
  :deep(img) {
    max-width: 100%;
    border-radius: 8px;
  }
}

@media (max-width: 992px) {
  .editor-container {
    grid-template-columns: 1fr;
  }
  .editor-preview {
    display: none; // Hide preview on mobile editor for better UX
  }
}
</style>