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

<style scoped>
.skill-item {
  text-align: center;
  padding: 1.5rem 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.skill-item i {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
  display: block;
}

.skill-item h4 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--heading-color);
  margin: 0;
}

.skill-item:hover {
  transform: translateY(-5px);
}

.skill-item:hover i {
  color: color-mix(in srgb, var(--accent-color), transparent 20%);
}

.btn-view-all {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--accent-color);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-view-all:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 15%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(5, 99, 187, 0.3);
}

@media (max-width: 768px) {
  .skill-item {
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
  }

  .skill-item i {
    font-size: 2rem;
  }

  .skill-item h4 {
    font-size: 0.9rem;
  }
}
</style>