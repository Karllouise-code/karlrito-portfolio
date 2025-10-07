<template>
  <div class="all-projects-page">
    <!-- Header placeholder for navigation -->
    <Header />

    <main id="main" class="main">
      <!-- Page Title -->
      <div class="page-title" data-aos="fade">
        <div class="container px-5">
          <div class="title-row">
            <h1>All Projects</h1>
            <div class="filter-pills">
              <button
                :class="['pill', { active: activeFilter === 'all' }]"
                @click="setFilter('all')"
              >
                All
              </button>
              <button
                :class="['pill', { active: activeFilter === 'company' }]"
                @click="setFilter('company')"
              >
                Company
              </button>
              <button
                :class="['pill', { active: activeFilter === 'personal' }]"
                @click="setFilter('personal')"
              >
                Personal
              </button>
            </div>
          </div>
        </div>
      </div><!-- End Page Title -->

      <!-- Projects Section -->
      <section class="projects-section section px-5">
        <div class="container">
          <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">
            <div
              class="col-lg-6 col-md-6"
              v-for="(project, index) in filteredProjects"
              :key="index"
            >
              <div class="project-card">
                <span :class="['project-badge', project.type]">
                  {{ project.type.toUpperCase() }}
                </span>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <a :href="project.link" class="project-link" target="_blank" rel="noopener noreferrer">
                  {{ project.slug }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section><!-- End Projects Section -->
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";

export default {
  name: "AllProjects",
  components: {
    Header,
    Footer,
  },
  setup() {
    const activeFilter = ref('all');

    const setFilter = (filter) => {
      activeFilter.value = filter;
      console.log('Filter changed to:', filter);
    };

    const companyProjects = ref([
      {
        title: "Bolted Gate Console",
        description: "Designed and developed a secure portal for Bolted Gate clients in Australia, with real-time data integration powered by Microsoft Azure APIs. The platform features Single Sign-On (SSO) for seamless user authentication via Microsoft accounts. It supports a multi-account system with distinct portals for admins, distributors, partners, customers, and customer users, each role controlled by both Azure Active Directory and the portal's own robust role management. Admins have advanced capabilities, including viewing applications installed on client devices, and can define API endpoints and implementation flows.",
        link: "https://console.boltedgate.app/",
        slug: "console.boltedgate.app",
        type: "company"
      },
      {
        title: "Honda Certified Pre-Owned Cars",
        description: "Built a sophisticated car marketplace platform for Honda Certified Pre-Owned Cars, featuring a full admin CMS and dynamic user portal system. Users can register as buyers or sellers, easily listing their cars or browsing available vehicles with advanced filtering and comparison options. The website integrates with Honda's official API to fetch and display the latest blogs and insights. A highlight is the AI-powered search bar, which intelligently helps users find vehicles tailored to their needs.",
        link: "https://certifiedcars.hondaphil.com/",
        slug: "certifiedcars.hondaphil.com",
        type: "company"
      },
      {
        title: "Coche.ph",
        description: "Developed Coche.ph, a comprehensive online car rental marketplace powered by a custom CMS. The platform features an advanced admin dashboard for content and blog management, supporting seamless updates by site administrators. It includes dedicated account portals for vehicle owners and sellers—owners can list and manage their cars for rent or sale, while sellers can browse, purchase, and transact online. Users benefit from intuitive search capabilities to find vehicles by location, explore vehicle types, and read location-based blog stories.",
        link: "https://coche.ph",
        slug: "coche.ph",
        type: "company"
      },
      {
        title: "AI Paradigm Solutions",
        description: "Developed a robust, CMS-driven website for AI Paradigm Solutions, an early-stage tech start-up. The site features a user-friendly admin panel that allows authorized users to easily update blog posts, manage page content, and edit prominent hero section texts and buttons across all pages—without coding. Designed for flexibility, the platform supports dynamic content management for publishing insights, company updates, and service changes.",
        link: "https://beta.aiparadigmsolutions.com/",
        slug: "beta.aiparadigmsolutions.com",
        type: "company"
      }
    ]);

    const personalProjects = ref([
      {
        title: "Todo Kanban Board",
        description: "A beautiful, modern Kanban board todo application built with Laravel 12, Vue.js 3, and Inertia.js. Stay organized and productive with an intuitive drag-and-drop interface and powerful project management features. Built with SQLite and deployed on Render using Docker.",
        link: "https://kanban-todo-vh75.onrender.com/",
        slug: "kanban-todo-vh75.onrender.com",
        type: "personal"
      },
      {
        title: "Strava Activity Visualizer",
        description: "A modern web application to visualize and analyze Strava activity data, built with Vue 3, Vite, and Tailwind CSS. This project fetches running and walking activities from the Strava API, caches them in Firebase Firestore, and provides an interactive dashboard to explore recent activities, stats, weekly progress, and customizable goals.",
        link: "https://karlritostrava.netlify.app/",
        slug: "karlritostrava.netlify.app",
        type: "personal"
      },
      {
        title: "Karlendaryo | Sinaing Scheduler",
        description: "A Vue.js web application for scheduling names on a weekly calendar, designed for managing tasks or assignments on workdays (Monday–Friday). Built with Firebase Firestore for real-time data persistence, it allows users to add, edit, remove, and reorder names via a user-friendly interface, export schedules as CSV, and view events in a customizable calendar.",
        link: "https://karlendaryo.netlify.app/",
        slug: "karlendaryo.netlify.app",
        type: "personal"
      },
      {
        title: "Personal Portfolio Website",
        description: "This is my personal portfolio website, built with Vue.js and styled with SCSS to create a clean, modern, and fully responsive design. The portfolio showcases my skills, projects, and professional experience in web development. The site features smooth navigation, project galleries with detailed descriptions, and contact information.",
        link: "https://karllouiserito.netlify.app/",
        slug: "karllouiserito.netlify.app",
        type: "personal"
      },
      {
        title: "Webcam Fun App",
        description: "This is an interactive webcam effects application built with pure JavaScript. The app enables users to capture live webcam video, apply real-time RGB split and color manipulation effects, and take creative snapshots directly from their browser. No frameworks or libraries are used—every feature is crafted in vanilla JS, showcasing direct manipulation of HTML5 video and canvas APIs.",
        link: "https://klr-webcamfun.netlify.app/",
        slug: "klr-webcamfun.netlify.app",
        type: "personal"
      },
      {
        title: "Tribute Page - Kobe Bryant",
        description: "This project is a responsive tribute webpage dedicated to the legendary basketball player Kobe Bryant, created as part of a Side Hustle Front End Internship. The page is built purely with HTML and CSS, showcasing fundamental web development skills through a carefully structured and styled layout.",
        link: "https://koberibute.netlify.app/",
        slug: "koberibute.netlify.app",
        type: "personal"
      }
    ]);

    const allProjects = computed(() => {
      return [...companyProjects.value, ...personalProjects.value];
    });

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') {
        return allProjects.value;
      }
      return activeFilter.value === 'company' ? companyProjects.value : personalProjects.value;
    });

    onMounted(() => {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    });

    return {
      activeFilter,
      filteredProjects,
      setFilter,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/pages/_all-projects.scss';
</style>
