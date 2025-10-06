<template>
  <!-- Hero Section -->
  <section id="hero" class="hero section dark-background">

    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&auto=format" alt="" data-aos="fade-in" class="">

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <h2>{{ name }}</h2>
      <p>I'm <span class="typed" ref="typedElement"></span></p>

      <div class="hero-actions" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/resume" class="btn-resume">
          <i class="bi bi-file-earmark-pdf"></i> View My Resume
        </router-link>
      </div>
    </div>

  </section><!-- /Hero Section -->
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Typed from "typed.js";

export default {
  name: "Hero",
  setup() {
    const name = ref("Karl Louise Rito");
    const typedElement = ref(null);
    let typedInstance = null;

    onMounted(() => {
      if (typedElement.value) {
        typedInstance = new Typed(typedElement.value, {
          strings: ["Web Developer", "Artisan", "Vue Enthusiast"],
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
          loop: true,
        });
      }
    });

    onUnmounted(() => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    });

    return {
      name,
      typedElement,
    };
  },
};
</script>

<style scoped>
.hero-actions {
  margin-top: 30px;
}

.btn-resume {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent-color);
  color: var(--contrast-color);
  padding: 14px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  border: 2px solid var(--accent-color);
  box-shadow: 0 4px 15px rgba(20, 157, 221, 0.3);
}

.btn-resume:hover {
  background: transparent;
  color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(20, 157, 221, 0.4);
}

.btn-resume i {
  font-size: 18px;
}

@media (max-width: 768px) {
  .btn-resume {
    padding: 12px 28px;
    font-size: 15px;
  }
}
</style>
