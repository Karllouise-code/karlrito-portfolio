<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Hero Section -->
    <Hero />

    <!-- Main Content -->
    <main class="main">
      <!-- About Section -->
      <About />

      <!-- Facts Section -->
      <!-- <Facts /> -->

      <!-- Skills Section -->
      <Skills />

      <!-- Resume Section -->
      <Resume />

      <!-- Portfolio Section -->
      <PortfolioSection />

      <!-- Services Section -->
      <Services />

      <!-- Testimonials Section -->
      <!-- <Testimonials /> -->

      <!-- Contact Section -->
      <Contact />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Scroll Top -->
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Preloader -->
    <div id="preloader"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Header from "./Header.vue";
import Hero from "./Hero.vue";
import About from "./About.vue";
import Facts from "./Facts.vue";
import Skills from "./Skills.vue";
import Resume from "./Resume.vue";
import PortfolioSection from "./PortfolioSection.vue";
import Services from "./Services.vue";
import Testimonials from "./Testimonials.vue";
import Contact from "./Contact.vue";
import Footer from "./Footer.vue";

export default {
  name: "Portfolio",
  components: {
    Header,
    Hero,
    About,
    Facts,
    Skills,
    Resume,
    PortfolioSection,
    Services,
    Testimonials,
    Contact,
    Footer,
  },
  setup() {
    onMounted(() => {
      // Initialize AOS animations
      if (window.AOS) {
        window.AOS.init({
          duration: 600,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      }

      // Remove preloader after page loads
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 1000);
      }

      // Scroll top button functionality
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 100) {
            scrollTop.classList.add('active');
          } else {
            scrollTop.classList.remove('active');
          }
        });

        scrollTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }

      // Close mobile menu when clicking outside
      const header = document.querySelector('#header');
      const headerToggle = document.querySelector('.header-toggle');

      document.addEventListener('click', (e) => {
        if (header && headerToggle && !header.contains(e.target) && !headerToggle.contains(e.target)) {
          if (header.classList.contains('header-show')) {
            header.classList.remove('header-show');
            document.body.classList.remove('mobile-nav-active');
          }
        }
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('#navmenu a').forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              // On mobile, account for header height; on desktop, header is on the side
              const isMobile = window.innerWidth < 1200;
              const offset = isMobile ? 60 : 0;
              const targetPosition = target.offsetTop - offset;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });

              // Update active nav item
              document.querySelectorAll('#navmenu a').forEach(navLink => {
                navLink.classList.remove('active');
              });
              link.classList.add('active');

              // Close mobile menu if open
              if (header && header.classList.contains('header-show')) {
                header.classList.remove('header-show');
                document.body.classList.remove('mobile-nav-active');
              }
            }
          }
        });
      });
    });

    return {};
  },
};
</script>