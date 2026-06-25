<template>
  <section id="portfolio" class="portfolio section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Portfolio</h2>
      <p class="lead-text mx-auto">A selection of my recent projects and work</p>
    </div>

    <div class="container">
      <div class="row g-4" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-6" v-for="(project, index) in projects" :key="index">
          <div class="project-card">
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

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/all-projects" class="btn-minimal">
          <span>View All Projects</span>
          <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const projects = ref([
  {
    title: "Honda Certified Pre-Owned Cars",
    description: "AI-powered marketplace with integrated CMS, advanced filtering, vehicle comparison, and intelligent search for Honda's pre-owned vehicles.",
    link: "https://certifiedcars.hondaphil.com/",
    slug: "certifiedcars.hondaphil.com"
  },
  {
    title: "Todo Kanban Board",
    description: "Modern task management application with drag-and-drop interface built with Laravel 12, Vue.js 3, and Inertia.js.",
    link: "https://kanban-todo-vh75.onrender.com/",
    slug: "kanban-todo-vh75.onrender.com"
  },
  {
    title: "Strava Activity Visualizer",
    description: "Interactive dashboard to analyze Strava running data with Firebase caching, weekly progress tracking, and customizable fitness goals.",
    link: "https://karlritostrava.netlify.app/",
    slug: "karlritostrava.netlify.app"
  },
  {
    title: "Karlendaryo | Sinaing Scheduler",
    description: "Vue.js scheduling app with Firebase Firestore for managing weekly tasks, featuring drag-and-drop reordering and CSV export.",
    link: "https://karlendaryo.netlify.app/",
    slug: "karlendaryo.netlify.app"
  },
  {
    title: "Happy Kids",
    description: "A fundraising platform for children's health and education with a Content Management System (CMS) and PayPal Payment Gateway. Built for a non-profit organization at Trimex Colleges to support their feeding program and donation drives.",
    link: "https://github.com/Lester-Fong/Happy-Kids",
    slug: "github.com/Lester-Fong/Happy-Kids"
  }
]);
</script>

<style scoped lang="scss">
.portfolio {
  padding: 100px 0;
  background-color: var(--background-color);
  color: var(--default-color);
}

.section-title {
  h2 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif;
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  height: 100%;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(5, 99, 187, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    .project-title {
      color: #0563bb;
    }
    
    .project-link {
      color: #fff;
      background: #0563bb;
    }
  }
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
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  flex-grow: 1;
}

.project-footer {
  margin-top: auto;
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
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  i {
    font-size: 0.8rem;
  }
}

.btn-minimal {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;

  i {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #0563bb;
    border-color: #0563bb;
    color: #fff;
    box-shadow: 0 10px 20px rgba(5, 99, 187, 0.2);

    i {
      transform: translateX(5px);
    }
  }
}

@media (max-width: 576px) {
  .project-content {
    padding: 30px;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
}
</style>