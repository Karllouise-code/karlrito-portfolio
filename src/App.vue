<template>
  <div id="app">
    <CursorGlow />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
    <ChatBot />
  </div>
</template>

<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import ChatBot from '@/components/ChatBot.vue';
import CursorGlow from '@/components/CursorGlow.vue';

export default {
  name: "App",
  components: { ChatBot, CursorGlow },
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
/* Import custom SCSS modules */
@use '@/assets/scss/main' as *;

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* Import custom portfolio CSS */
@import '@/assets/css/main-styles.css';

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
