<template>
  <!-- Portfolio Section -->
  <section id="portfolio" class="portfolio section light-background">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>A selection of my recent projects and work</p>
    </div><!-- End Section Title -->

    <div class="container">
      <div class="row gy-4" data-aos="zoom-in" data-aos-delay="100">

        <div class="col-lg-6 col-md-6" v-for="(project, index) in projects" :key="index">
          <div class="project-card">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <a :href="project.link" class="project-link" target="_blank" rel="noopener noreferrer">
              {{ project.slug }}
            </a>
          </div>
        </div>

      </div><!-- End Portfolio Items -->

      <div class="text-center mt-5" data-aos="zoom-in" data-aos-delay="200">
        <router-link to="/all-projects" class="btn-view-all">View All Projects →</router-link>
      </div>

    </div>

  </section><!-- /Portfolio Section -->
</template>

<script>
import { ref } from "vue";

export default {
  name: "PortfolioSection",
  setup() {
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
      }
    ]);

    return {
      projects
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_portfolio.scss';
</style>