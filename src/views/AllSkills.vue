<template>
  <div class="all-skills-page">
    <Header />

    <main id="main" class="main">
      <!-- Page Title -->
      <div class="page-title" data-aos="fade">
        <div class="container px-5">
          <h1>All Skills</h1>
        </div>
      </div>

      <!-- Skills Section -->
      <section class="skills-section section px-5">
        <div class="container">
          <div class="row gy-4" data-aos="zoom-in" data-aos-delay="100">
            <div class="col-lg-4 col-md-6" v-for="(skill, index) in allSkills" :key="index">
              <div class="skill-item">
                <i :class="skill.icon"></i>
                <h4>{{ skill.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";

export default {
  name: "AllSkills",
  components: {
    Header,
    Footer,
  },
  setup() {
    const allSkills = ref([
      { name: 'Vue.js', icon: 'bi bi-code-square' },
      { name: 'React', icon: 'bi bi-code-slash' },
      { name: 'JavaScript', icon: 'bi bi-filetype-js' },
      { name: 'TypeScript', icon: 'bi bi-code' },
      { name: 'PHP', icon: 'bi bi-filetype-php' },
      { name: 'Laravel', icon: 'bi bi-diagram-3' },
      { name: 'Node.js', icon: 'bi bi-server' },
      { name: 'MySQL', icon: 'bi bi-database' },
      { name: 'PostgreSQL', icon: 'bi bi-database-fill' },
      { name: 'Firebase', icon: 'bi bi-cloud' },
      { name: 'GraphQL', icon: 'bi bi-graph-up' },
      { name: 'REST APIs', icon: 'bi bi-bezier2' },
      { name: 'HTML5', icon: 'bi bi-filetype-html' },
      { name: 'CSS3', icon: 'bi bi-filetype-css' },
      { name: 'SCSS', icon: 'bi bi-filetype-scss' },
      { name: 'Tailwind CSS', icon: 'bi bi-palette' },
      { name: 'Bootstrap', icon: 'bi bi-bootstrap' },
      { name: 'Inertia.js', icon: 'bi bi-lightning' },
      { name: 'Git', icon: 'bi bi-git' },
      { name: 'GitHub', icon: 'bi bi-github' },
      { name: 'Docker', icon: 'bi bi-box-seam' },
      { name: 'SQLite', icon: 'bi bi-database-lock' },
      { name: 'Netlify', icon: 'bi bi-cloud-upload' },
      { name: 'Render', icon: 'bi bi-globe' },
      { name: 'Azure', icon: 'bi bi-microsoft' },
      { name: 'VS Code', icon: 'bi bi-code-slash' },
      { name: 'Postman', icon: 'bi bi-send' },
      { name: 'Figma', icon: 'bi bi-palette2' },
    ]);

    onMounted(() => {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    });

    return {
      allSkills,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/pages/_all-projects.scss';
@import '@/assets/scss/components/_skills.scss';

.all-skills-page {
  background-color: #f8f9fa;
  overflow-x: hidden;
  width: 100%;
}

.skills-section {
  padding: 60px 0;
}
</style>
