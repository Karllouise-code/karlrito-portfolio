<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: "App",
  setup() {
    const route = useRoute();

    const updateMeta = (to) => {
      const meta = to.meta || {};
      document.title = meta.title || "Karl Louise Rito";

      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement('meta');
        description.setAttribute('name', 'description');
        document.head.appendChild(description);
      }
      description.setAttribute('content', meta.description || "Portfolio of Karl Louise Rito, a full-stack web developer.");

      let keywords = document.querySelector('meta[name="keywords"]');
      if (!keywords) {
        keywords = document.createElement('meta');
        keywords.setAttribute('name', 'keywords');
        document.head.appendChild(keywords);
      }
      keywords.setAttribute('content', meta.keywords || "Karl Rito, web developer, portfolio, Vue, Laravel, full-stack");
    };

    // Update meta on route change and initial load
    watch(() => route.path, () => updateMeta(route), { immediate: true });

    // Clean up body classes on route change
    watch(() => route.path, () => {
      document.body.classList.remove('mobile-nav-active');
      const header = document.querySelector('#header');
      if (header) {
        header.classList.remove('header-show');
      }
    });

    return {};
  }
};
</script>

<style lang="scss">
/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* Import vendor CSS */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css");

/* Import custom portfolio CSS */
@import '@/assets/css/main-styles.css';

/* Import custom SCSS modules */
@import '@/assets/scss/main.scss';

/* Route transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
