<template>
  <!-- Hero Section -->
  <section id="hero" class="hero section dark-background">

    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&auto=format" alt="" data-aos="fade-in" class="">

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <h2>{{ name }}</h2>
      <p>I'm <span class="typed" ref="typedElement"></span></p>
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
