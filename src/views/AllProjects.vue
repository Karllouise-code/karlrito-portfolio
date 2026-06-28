<template>
  <div class="all-projects-page dark-background">
    <Header />

    <main id="main" class="main">
      <div class="page-header" data-aos="fade-up">
        <div class="container text-center">
          <h1 class="display-3 fw-bold">Project Archive</h1>
          <p class="lead-text mx-auto">A detailed showcase of my professional and personal work</p>

          <div class="filter-container mt-5">
            <div class="filter-pills">
              <button
                v-for="f in filters"
                :key="f.key"
                :class="['filter-btn', { active: activeFilter === f.key }]"
                :style="{ '--pill-accent': f.color }"
                @click="setFilter(f.key)"
              >
                <i :class="f.icon"></i>
                <span>{{ f.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section class="projects-grid section">
        <div class="container">
          <div class="row g-4" data-aos="fade-up" data-aos-delay="100">
            <div
              class="col-lg-6"
              v-for="(project, index) in filteredProjects"
              :key="index"
            >
              <div class="project-card" :style="{ '--card-accent': project.type === 'company' ? '#0563bb' : '#3fb950' }">
                <span class="project-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="project-type-icon">
                  <i :class="project.type === 'company' ? 'bi bi-briefcase' : 'bi bi-code-slash'"></i>
                </div>
                <div class="project-content">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <p class="project-description">{{ project.description }}</p>
                  <div class="project-tags" v-if="project.tags">
                    <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
                  </div>
                  <div class="project-footer">
                    <a :href="project.link" class="project-link" target="_blank" rel="noopener noreferrer">
                      <span>{{ project.slug }}</span>
                      <i class="bi bi-box-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";

const activeFilter = ref('all');

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filters = computed(() => [
  { key: 'all', label: 'All', icon: 'bi bi-grid-3x3-gap', color: '#0563bb' },
  { key: 'company', label: 'Company', icon: 'bi bi-briefcase', color: '#0563bb' },
  { key: 'personal', label: 'Personal', icon: 'bi bi-code-slash', color: '#3fb950' },
]);

const companyProjects = ref([
  {
    title: "Bolted Gate Console",
    description: "Designed and developed a secure portal for Bolted Gate clients in Australia, with real-time data integration powered by Microsoft Azure APIs. The platform features Single Sign-On (SSO) for seamless user authentication via Microsoft accounts.",
    link: "https://console.boltedgate.app/",
    slug: "console.boltedgate.app",
    type: "company",
    tags: ["Azure", "SSO", "Vue"]
  },
  {
    title: "Honda Certified Pre-Owned Cars",
    description: "Built a sophisticated car marketplace platform for Honda Certified Pre-Owned Cars, featuring a full admin CMS and dynamic user portal system with AI-powered search.",
    link: "https://certifiedcars.hondaphil.com/",
    slug: "certifiedcars.hondaphil.com",
    type: "company",
    tags: ["Vue", "Laravel", "AI", "CMS"]
  },
  {
    title: "Coche.ph",
    description: "Developed Coche.ph, a comprehensive online car rental marketplace powered by a custom CMS with advanced admin dashboard for content management.",
    link: "https://coche.ph",
    slug: "coche.ph",
    type: "company",
    tags: ["PHP", "Laravel", "CMS"]
  },
  {
    title: "AI Paradigm Solutions",
    description: "Developed a robust, CMS-driven website for AI Paradigm Solutions, an early-stage tech start-up with a user-friendly admin panel.",
    link: "https://beta.aiparadigmsolutions.com/",
    slug: "beta.aiparadigmsolutions.com",
    type: "company",
    tags: ["CMS", "PHP"]
  }
]);

const personalProjects = ref([
  {
    title: "Todo Kanban Board",
    description: "A beautiful, modern Kanban board todo application built with Laravel 12, Vue.js 3, and Inertia.js. Intuitive drag-and-drop interface and powerful project management features.",
    link: "https://kanban-todo-vh75.onrender.com/",
    slug: "kanban-todo-vh75.onrender.com",
    type: "personal",
    tags: ["Laravel 12", "Vue 3", "Inertia", "Docker"]
  },
  {
    title: "Strava Activity Visualizer",
    description: "A modern web application to visualize and analyze Strava activity data. Fetches activities from Strava API, caches them in Firebase, and provides an interactive dashboard.",
    link: "https://karlritostrava.netlify.app/",
    slug: "karlritostrava.netlify.app",
    type: "personal",
    tags: ["Vue", "Firebase", "API"]
  },
  {
    title: "Karlendaryo | Sinaing Scheduler",
    description: "A Vue.js web application for scheduling names on a weekly calendar. Built with Firebase Firestore with CSV export and drag-and-drop reordering.",
    link: "https://karlendaryo.netlify.app/",
    slug: "karlendaryo.netlify.app",
    type: "personal",
    tags: ["Vue", "Firebase", "CSV Export"]
  },
  {
    title: "Personal Portfolio Website",
    description: "My personal portfolio website, built with Vue.js and styled with SCSS to create a clean, modern, and fully responsive design.",
    link: "https://karllouiserito.netlify.app/",
    slug: "karllouiserito.netlify.app",
    type: "personal",
    tags: ["Vue 3", "SCSS", "Vite"]
  },
  {
    title: "Happy Kids",
    description: "A fundraising platform for children's health and education with a CMS and PayPal Payment Gateway. Built for a non-profit organization at Trimex Colleges.",
    link: "https://github.com/Lester-Fong/Happy-Kids",
    slug: "github.com/Lester-Fong/Happy-Kids",
    type: "personal",
    tags: ["Vue", "Laravel", "GraphQL", "PayPal"]
  },
  {
    title: "Webcam Fun App",
    description: "Interactive webcam effects application built with pure JavaScript. Real-time RGB split and color manipulation effects with snapshot capabilities.",
    link: "https://klr-webcamfun.netlify.app/",
    slug: "klr-webcamfun.netlify.app",
    type: "personal",
    tags: ["JavaScript", "Canvas API"]
  },
  {
    title: "Tribute Page - Kobe Bryant",
    description: "A responsive tribute webpage dedicated to Kobe Bryant, created using purely HTML and CSS.",
    link: "https://koberibute.netlify.app/",
    slug: "koberibute.netlify.app",
    type: "personal",
    tags: ["HTML", "CSS"]
  }
]);

const allProjects = computed(() => [...companyProjects.value, ...personalProjects.value]);
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return allProjects.value;
  return activeFilter.value === 'company' ? companyProjects.value : personalProjects.value;
});

onMounted(() => {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
  });
});
</script>

<style scoped lang="scss">
.all-projects-page {
  background-color: var(--background-color);
  color: var(--default-color);
  min-height: 100vh;
}

.main {
  padding-top: 120px;
}

.page-header {
  padding: 60px 0;

  h1 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -2px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
  }

  .lead-text {
    max-width: 700px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.25rem;
    font-family: "Poppins", sans-serif;
  }
}

.filter-pills {
  display: inline-flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  padding: 7px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  i {
    font-size: 0.9rem;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  &.active {
    color: #fff;
    background: var(--pill-accent, #0563bb);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.projects-grid {
  padding: 60px 0;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  position: relative;
  display: flex;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 0;
    background: var(--card-accent, #0563bb);
    transition: height 0.35s ease;
    border-radius: 0 0 3px 3px;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(var(--card-accent, #0563bb), 0.3);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);

    &::before { height: 100%; }

    .project-title { color: var(--card-accent, #0563bb); }

    .project-link {
      color: #fff;
      background: var(--card-accent, #0563bb);
    }
  }
}

.project-index {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.1);
  font-weight: 700;
  letter-spacing: 1px;
  user-select: none;
}

.project-type-icon {
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 0.9rem;
    color: var(--card-accent, #0563bb);
  }
}

.project-content {
  padding: 2rem 2rem 2rem 4.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #e8ecf1;
  transition: color 0.3s ease;
  padding-right: 2.5rem;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.25rem;
}

.project-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-footer {
  margin-top: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  i {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translate(2px, -2px);
  }
}

@media (max-width: 768px) {
  .page-header h1 { font-size: 2.5rem; }
  .project-content { padding: 1.5rem 1.5rem 1.5rem 4rem; }
  .project-title { font-size: 1.2rem; }
}
</style>
