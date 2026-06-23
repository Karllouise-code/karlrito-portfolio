<template>
  <header id="header" class="header fixed-top d-flex align-items-center" :class="{ 'header-scrolled': isScrolled }">
    <div class="container-fluid d-flex align-items-center justify-content-between">

      <router-link to="/" class="logo d-flex align-items-center">
        <h1 class="sitename">{{ name }}</h1>
      </router-link>

      <nav id="navmenu" class="navmenu" :class="{ 'mobile-nav-active': isMobileShow }">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a v-if="item.hash" :href="item.hash" :class="{ active: item.active }" @click.prevent="handleNavClick(item.hash)">
              {{ item.name }}
            </a>
            <router-link v-else :to="item.path" :class="{ active: item.active }" @click="closeMobileMenu">
              {{ item.name }}
            </router-link>
          </li>
          <li>
            <router-link to="/resume" class="btn-get-started">Resume</router-link>
          </li>
          <li class="theme-toggle-li">
            <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
              <i :class="isDark ? 'bi-cup-hot-fill' : 'bi-moon-fill'"></i>
            </button>
          </li>
        </ul>
        <i class="mobile-nav-toggle d-lg-none bi" :class="isMobileShow ? 'bi-x' : 'bi-list'" @click="toggleMobileMenu"></i>
      </nav>

    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTheme } from "@/composables/useTheme";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { isDark, toggleTheme } = useTheme();
    const name = ref("Karl Rito");
    const isScrolled = ref(false);
    const isMobileShow = ref(false);

    const navItems = ref([
      { id: "home", name: "Home", hash: "#hero", active: true },
      { id: "about", name: "About", hash: "#about", active: false },
      { id: "resume", name: "Resume", hash: "#resume", active: false },
      { id: "portfolio", name: "Portfolio", hash: "#portfolio", active: false },
      { id: "blog", name: "Blog", path: "/blog", active: false },
      { id: "contact", name: "Contact", hash: "#contact", active: false },
    ]);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
      updateActiveNav();
    };

    const toggleMobileMenu = () => {
      isMobileShow.value = !isMobileShow.value;
      document.body.classList.toggle('mobile-nav-active', isMobileShow.value);
      const header = document.querySelector('#header');
      if (header) {
        header.classList.toggle('mobile-menu-active', isMobileShow.value);
      }
    };

    const closeMobileMenu = () => {
      isMobileShow.value = false;
      document.body.classList.remove('mobile-nav-active');
      const header = document.querySelector('#header');
      if (header) {
        header.classList.remove('mobile-menu-active');
      }
    };

    const handleNavClick = async (hash) => {
      closeMobileMenu();
      if (route.path !== '/') {
        await router.push('/');
        // Give time for the page to load if we're navigating from another route
        setTimeout(() => scrollToHash(hash), 300);
      } else {
        scrollToHash(hash);
      }
    };

    const scrollToHash = (hash) => {
      if (hash === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(hash);
        if (element) {
          const header = document.querySelector('#header');
          const headerHeight = header ? header.offsetHeight : 80;
          const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    const updateActiveNav = () => {
      if (route.path.startsWith('/blog')) {
        navItems.value.forEach(item => { item.active = item.id === 'blog'; });
        return;
      }
      if (route.path !== '/') {
        navItems.value.forEach(item => item.active = false);
        return;
      }

      const header = document.querySelector('#header');
      const headerHeight = header ? header.offsetHeight : 80;
      const buffer = headerHeight + 60;

      let activeHash = 'home';

      const sections = navItems.value
        .map(item => {
          if (!item.hash) return null;
          const el = document.querySelector(item.hash);
          if (el) {
            const rect = el.getBoundingClientRect();
            return { id: item.id, top: rect.top };
          }
          return null;
        })
        .filter(Boolean);

      for (const section of sections) {
        if (section.top <= buffer) {
          activeHash = section.id;
        }
      }

      navItems.value.forEach(item => {
        item.active = item.id === activeHash;
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      // Slight delay to ensure elements are rendered and images loaded
      setTimeout(() => {
        handleScroll();
      }, 100);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { name, isScrolled, isDark, isMobileShow, navItems, toggleMobileMenu, closeMobileMenu, handleNavClick, toggleTheme };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_header.scss';
</style>
