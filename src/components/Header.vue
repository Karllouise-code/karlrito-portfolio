<template>
  <header id="header" class="header fixed-top d-flex align-items-center" :class="{ 'header-scrolled': isScrolled }">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <router-link to="/" class="logo d-flex align-items-center">
        <h1 class="sitename">{{ name }}</h1>
      </router-link>

      <nav id="navmenu" class="navmenu" :class="{ 'mobile-nav-active': isMobileShow }">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a v-if="item.hash" :href="item.hash" :class="{ active: item.active }" @click="handleNavClick(item.hash)">
              {{ item.name }}
            </a>
            <router-link v-else :to="item.path" :class="{ active: item.active }" @click="closeMobileMenu">
              {{ item.name }}
            </router-link>
          </li>
          <li>
            <router-link to="/resume" class="btn-get-started">Resume</router-link>
          </li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi" :class="isMobileShow ? 'bi-x' : 'bi-list'" @click="toggleMobileMenu"></i>
      </nav>

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
    };

    const closeMobileMenu = () => {
      isMobileShow.value = false;
      document.body.classList.remove('mobile-nav-active');
    };

    const handleNavClick = async (hash) => {
      closeMobileMenu();
      if (route.path !== '/') {
        await router.push('/');
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
          const yOffset = -80; // Account for top header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
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

      const scrollPosition = window.scrollY + 100;
      let activeHash = '#hero';
      const sections = navItems.value.map(item => {
        if (!item.hash) return null;
        const el = document.querySelector(item.hash);
        return el ? { id: item.id, top: el.offsetTop - 100 } : null;
      }).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          activeHash = sections[i].id;
          break;
        }
      }
      navItems.value.forEach(item => { item.active = item.id === (activeHash === '#hero' ? 'home' : activeHash); });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { name, isScrolled, isMobileShow, navItems, toggleMobileMenu, closeMobileMenu, handleNavClick };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_header.scss';
</style>
