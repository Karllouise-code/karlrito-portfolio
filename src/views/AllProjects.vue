<template>
  <div class="all-projects-page dark-background">
    <Header />

    <main id="main" class="main">
      <!-- Page Header -->
      <div class="page-header" data-aos="fade-up">
        <div class="container text-center">
          <h1 class="display-3 fw-bold">Project Archive</h1>
          <p class="lead-text mx-auto">A detailed showcase of my professional and personal work</p>
          
          <div class="filter-container mt-5">
            <div class="filter-pills">
              <button
                v-for="filter in ['all', 'company', 'personal']"
                :key="filter"
                :class="['filter-btn', { active: activeFilter === filter }]"
                @click="setFilter(filter)"
              >
                {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <section class="projects-grid section">
        <div class="container">
          <div class="row g-4" data-aos="fade-up" data-aos-delay="100">
            <div
              class="col-lg-6"
              v-for="(project, index) in filteredProjects"
              :key="index"
            >
              <div class="project-card">
                <div class="project-badge">{{ project.type.toUpperCase() }}</div>
                <div class="project-content">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <p class="project-description">{{ project.description }}</p>
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

const companyProjects = ref([
  {
    title: "Bolted Gate Console",
    description: "Designed and developed a secure portal for Bolted Gate clients in Australia, with real-time data integration powered by Microsoft Azure APIs. The platform features Single Sign-On (SSO) for seamless user authentication via Microsoft accounts. It supports a multi-account system with distinct portals for admins, distributors, partners, customers, and customer users.",
    link: "https://console.boltedgate.app/",
    slug: "console.boltedgate.app",
    type: "company"
  },
  {
    title: "Honda Certified Pre-Owned Cars",
    description: "Built a sophisticated car marketplace platform for Honda Certified Pre-Owned Cars, featuring a full admin CMS and dynamic user portal system. Users can register as buyers or sellers, browsing available vehicles with advanced filtering and comparison options. Includes an AI-powered search bar.",
    link: "https://certifiedcars.hondaphil.com/",
    slug: "certifiedcars.hondaphil.com",
    type: "company"
  },
  {
    title: "Coche.ph",
    description: "Developed Coche.ph, a comprehensive online car rental marketplace powered by a custom CMS. The platform features an advanced admin dashboard for content management and dedicated account portals for vehicle owners and sellers.",
    link: "https://coche.ph",
    slug: "coche.ph",
    type: "company"
  },
  {
    title: "AI Paradigm Solutions",
    description: "Developed a robust, CMS-driven website for AI Paradigm Solutions, an early-stage tech start-up. Features a user-friendly admin panel for content management without coding.",
    link: "https://beta.aiparadigmsolutions.com/",
    slug: "beta.aiparadigmsolutions.com",
    type: "company"
  }
]);

const personalProjects = ref([
  {
    title: "Todo Kanban Board",
    description: "A beautiful, modern Kanban board todo application built with Laravel 12, Vue.js 3, and Inertia.js. Intuitive drag-and-drop interface and powerful project management features. Deployed on Render using Docker.",
    link: "https://kanban-todo-vh75.onrender.com/",
    slug: "kanban-todo-vh75.onrender.com",
    type: "personal"
  },
  {
    title: "Strava Activity Visualizer",
    description: "A modern web application to visualize and analyze Strava activity data. Fetches activities from Strava API, caches them in Firebase, and provides an interactive dashboard with customizable goals.",
    link: "https://karlritostrava.netlify.app/",
    slug: "karlritostrava.netlify.app",
    type: "personal"
  },
  {
    title: "Karlendaryo | Sinaing Scheduler",
    description: "A Vue.js web application for scheduling names on a weekly calendar. Built with Firebase Firestore for real-time data persistence, featuring CSV export and drag-and-drop reordering.",
    link: "https://karlendaryo.netlify.app/",
    slug: "karlendaryo.netlify.app",
    type: "personal"
  },
  {
    title: "Personal Portfolio Website",
    description: "My personal portfolio website, built with Vue.js and styled with SCSS to create a clean, modern, and fully responsive design showcasing my professional journey.",
    link: "https://karllouiserito.netlify.app/",
    slug: "karllouiserito.netlify.app",
    type: "personal"
  },
  {
    title: "Happy Kids",
    description: "A fundraising platform for children's health and education with a Content Management System (CMS) and PayPal Payment Gateway. Built with Vue.js, Laravel, GraphQL, MySQL, and Bootstrap for a non-profit organization at Trimex Colleges to support their feeding program and donation drives.",
    link: "https://github.com/Lester-Fong/Happy-Kids",
    slug: "github.com/Lester-Fong/Happy-Kids",
    type: "personal"
  },
  {
    title: "Webcam Fun App",
    description: "Interactive webcam effects application built with pure JavaScript. Real-time RGB split and color manipulation effects with snapshot capabilities.",
    link: "https://klr-webcamfun.netlify.app/",
    slug: "klr-webcamfun.netlify.app",
    type: "personal"
  },
  {
    title: "Tribute Page - Kobe Bryant",
    description: "A responsive tribute webpage dedicated to Kobe Bryant, created as part of a Front End Internship using purely HTML and CSS.",
    link: "https://koberibute.netlify.app/",
    slug: "koberibute.netlify.app",
    type: "personal"
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
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
  }
  
  &.active {
    background: #0563bb;
    color: #fff;
    box-shadow: 0 4px 12px rgba(5, 99, 187, 0.3);
  }
}

.projects-grid {
  padding: 60px 0;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  height: 100%;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(5, 99, 187, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    .project-title { color: #0563bb; }
    .project-link { color: #fff; background: #0563bb; }
  }
}

.project-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(5, 99, 187, 0.1);
  color: #0563bb;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.project-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
  transition: color 0.3s ease;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2rem;
  flex-grow: 1;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: fit-content;

  i { font-size: 0.8rem; }
}

@media (max-width: 768px) {
  .page-header h1 { font-size: 2.5rem; }
  .project-content { padding: 30px; }
}
</style>
