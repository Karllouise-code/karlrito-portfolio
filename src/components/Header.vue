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
      <a v-for="social in socialLinks" :key="social.name" :href="social.url" :class="social.name">
        <i :class="social.icon"></i>
      </a>
    </div>

    <nav id="navmenu" class="navmenu">
      <ul>
        <li v-for="item in navItems" :key="item.id">
          <a :href="item.hash" :class="{ active: item.active }" @click="closeMobileMenu">
            <i :class="item.icon + ' navicon'"></i>{{ item.name }}
          </a>
        </li>
      </ul>
    </nav>

  </header>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Header",
  setup() {
    // Use exact same profile image from original
    // const profileImage = ref("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format");
    const profileImage = ref("/src/assets/img/01-KARLRITO.jpeg");

    const name = ref("Karl Louise Rito");

    const socialLinks = ref([
      { name: "twitter", url: "#", icon: "bi bi-twitter-x" },
      { name: "facebook", url: "#", icon: "bi bi-facebook" },
      { name: "instagram", url: "#", icon: "bi bi-instagram" },
      { name: "google-plus", url: "#", icon: "bi bi-skype" },
      { name: "linkedin", url: "#", icon: "bi bi-linkedin" },
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

    return {
      profileImage,
      name,
      socialLinks,
      navItems,
      toggleMobileMenu,
      closeMobileMenu,
    };
  },
};
</script>
