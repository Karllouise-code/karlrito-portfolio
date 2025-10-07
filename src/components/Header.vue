<template>
  <header id="header" class="header dark-background d-flex flex-column">
    <i class="bi bi-list header-toggle" @click="toggleMobileMenu"></i>

    <div class="profile-img">
      <img :src="profileImage" alt="" class="img-fluid rounded-circle">
    </div>

    <a href="index.html" class="logo d-flex align-items-center justify-content-center">
      <h1 class="sitename">{{ name }}</h1>
    </a>

    <div class="social-links text-center">
      <a v-for="social in socialLinks" :key="social.name" :href="social.url" :class="social.name" target="_blank" rel="noopener noreferrer">
        <i :class="social.icon"></i>
      </a>
    </div>

    <nav id="navmenu" class="navmenu">
      <ul>
        <li v-for="item in navItems" :key="item.id">
          <a :href="item.hash" :class="{ active: item.active }" @click="handleNavClick(item.hash)">
            <i :class="item.icon + ' navicon'"></i>{{ item.name }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="resume-download">
      <router-link to="/resume" class="btn-download">
        <i class="bi bi-file-earmark-pdf"></i> View Resume
      </router-link>
    </div>

  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const profileImage = ref("/images/01-KARLRITO.jpeg");

    const name = ref("Karl Louise Rito");

    const socialLinks = ref([
      { name: "linkedin", url: "https://www.linkedin.com/in/karllouise08/", icon: "bi bi-linkedin" },
      { name: "github", url: "https://github.com/Karllouise-code/", icon: "bi bi-github" },
      { name: "twitter", url: "https://x.com/karl_rito", icon: "bi bi-twitter-x" },
      { name: "facebook", url: "https://www.facebook.com/karllouise08", icon: "bi bi-facebook" },
      { name: "instagram", url: "https://www.instagram.com/kalowies_/", icon: "bi bi-instagram" },
    ]);

    const navItems = ref([
      { id: "home", name: "Home", hash: "#hero", icon: "bi bi-house", active: true },
      { id: "about", name: "About", hash: "#about", icon: "bi bi-person", active: false },
      { id: "resume", name: "Resume", hash: "#resume", icon: "bi bi-file-earmark-text", active: false },
      { id: "portfolio", name: "Portfolio", hash: "#portfolio", icon: "bi bi-images", active: false },
      { id: "services", name: "Services", hash: "#services", icon: "bi bi-hdd-stack", active: false },
      { id: "contact", name: "Contact", hash: "#contact", icon: "bi bi-envelope", active: false },
    ]);

    const toggleMobileMenu = () => {
      const header = document.querySelector('#header');
      const body = document.body;

      if (header) {
        header.classList.toggle('header-show');
        body.classList.toggle('mobile-nav-active');
      }
    };

    const closeMobileMenu = () => {
      const header = document.querySelector('#header');
      const body = document.body;

      if (header && header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        body.classList.remove('mobile-nav-active');
      }
    };

    const handleNavClick = async (hash) => {
      closeMobileMenu();

      // If we're not on the home page, navigate to home page first
      if (route.path !== '/') {
        // Navigate to home page without hash
        await router.push('/');

        // Force a reflow to ensure styles are applied
        setTimeout(() => {
          // Force DOM reflow
          document.body.offsetHeight;

          if (hash === '#hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', '/');
          } else {
            const element = document.querySelector(hash);
            if (element) {
              const yOffset = 0;
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
              window.history.replaceState(null, '', '/');
            }
          }
        }, 150);
      } else {
        // We're already on home page
        if (hash === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        } else {
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              const yOffset = 0;
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
              window.history.replaceState(null, '', '/');
            }
          }, 100);
        }
      }
    };

    // Scroll spy to update active nav item
    const updateActiveNav = () => {
      // Only run on home page
      if (route.path !== '/') return;

      const scrollPosition = window.scrollY;

      // If at the very top, set hero as active
      if (scrollPosition < 50) {
        navItems.value.forEach(item => {
          item.active = item.hash === '#hero';
        });
        return;
      }

      const adjustedScrollPosition = scrollPosition + 100;

      // Get all sections
      const sections = navItems.value.map(item => {
        const element = document.querySelector(item.hash);
        return {
          id: item.id,
          hash: item.hash,
          offsetTop: element ? element.offsetTop : 0,
          offsetBottom: element ? element.offsetTop + element.offsetHeight : 0,
        };
      });

      // Find current section
      let currentSection = sections[0];
      for (const section of sections) {
        if (adjustedScrollPosition >= section.offsetTop) {
          currentSection = section;
        }
      }

      // Update active states
      navItems.value.forEach(item => {
        item.active = item.hash === currentSection.hash;
      });
    };

    // Add scroll listener
    onMounted(() => {
      window.addEventListener('scroll', updateActiveNav);
      updateActiveNav(); // Initial check
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateActiveNav);
    });

    return {
      profileImage,
      name,
      socialLinks,
      navItems,
      toggleMobileMenu,
      closeMobileMenu,
      handleNavClick,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_header.scss';
</style>
