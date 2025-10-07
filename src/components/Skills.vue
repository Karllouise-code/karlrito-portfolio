<template>
  <!-- Skills Section -->
  <section id="skills" class="skills section light-background">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Skills</h2>
      <p>Technologies and tools I work with</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="zoom-in" data-aos-delay="100">
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="(skill, index) in skills" :key="index">
          <div class="skill-item">
            <i :class="skill.icon"></i>
            <h4>{{ skill.name }}</h4>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="zoom-in" data-aos-delay="200">
        <router-link to="/all-skills" class="btn-view-all">View All Skills →</router-link>
      </div>
    </div>

  </section><!-- /Skills Section -->
</template>

<script>
import { ref } from "vue";

export default {
  name: "Skills",
  setup() {
    const skills = ref([
      { name: 'Vue.js', icon: 'bi bi-code-square' },
      { name: 'React', icon: 'bi bi-code-slash' },
      { name: 'JavaScript', icon: 'bi bi-filetype-js' },
      { name: 'TypeScript', icon: 'bi bi-code' },
      { name: 'PHP', icon: 'bi bi-filetype-php' },
      { name: 'Laravel', icon: 'bi bi-diagram-3' },
      { name: 'Node.js', icon: 'bi bi-server' },
      { name: 'MySQL', icon: 'bi bi-database' },
      { name: 'Firebase', icon: 'bi bi-cloud' },
    ]);

    return {
      skills
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_skills.scss';
</style>