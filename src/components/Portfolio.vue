<template>
  <div>
    <Header />

    <main class="main">
      <Hero />
      <Resume />
      <PortfolioSection />
      <Contact />
    </main>

    <Footer />

    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <div id="preloader"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Header from "./Header.vue";
import Hero from "./Hero.vue";
import Resume from "./Resume.vue";
import PortfolioSection from "./PortfolioSection.vue";
import Contact from "./Contact.vue";
import Footer from "./Footer.vue";

export default {
  name: "Portfolio",
  components: {
    Header,
    Hero,
    Resume,
    PortfolioSection,
    Contact,
    Footer,
  },
  setup() {
    onMounted(() => {
      if (window.AOS) {
        window.AOS.init({
          duration: 600,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      }

      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 1000);
      }

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
    });

    return {};
  },
};
</script>
