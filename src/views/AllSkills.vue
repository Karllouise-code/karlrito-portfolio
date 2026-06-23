<template>
  <div class="all-skills-page dark-background">
    <Header />

    <main id="main" class="main">
      <!-- Page Title -->
      <div class="page-header" data-aos="fade-up">
        <div class="container text-center">
          <h1 class="display-3 fw-bold">Full Stack Toolbox</h1>
          <p class="lead-text mx-auto">A comprehensive list of technologies I've mastered over the years</p>
        </div>
      </div>

      <!-- Categories -->
      <section v-for="(category, catIndex) in skillCategories" :key="catIndex" class="skill-category section">
        <div class="container">
          <div class="category-header mb-5" data-aos="fade-up">
            <h2 class="category-title">{{ category.title }}</h2>
            <div class="category-divider"></div>
          </div>

          <div class="row g-4" data-aos="fade-up" :data-aos-delay="100">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="(skill, index) in category.skills" :key="index">
              <div class="skill-card">
                <div class="skill-icon">
                  <i :class="skill.icon"></i>
                </div>
                <h4 class="skill-name">{{ skill.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";

const skillCategories = ref([
  {
    title: "Frontend Development",
    skills: [
      { name: 'Vue.js', icon: 'bi bi-code-square' },
      { name: 'React', icon: 'bi bi-code-slash' },
      { name: 'JavaScript', icon: 'bi bi-filetype-js' },
      { name: 'TypeScript', icon: 'bi bi-code' },
      { name: 'HTML5', icon: 'bi bi-filetype-html' },
      { name: 'CSS3', icon: 'bi bi-filetype-css' },
      { name: 'SCSS', icon: 'bi bi-filetype-scss' },
      { name: 'Tailwind CSS', icon: 'bi bi-palette' },
      { name: 'Bootstrap', icon: 'bi bi-bootstrap' },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: 'PHP', icon: 'bi bi-filetype-php' },
      { name: 'Laravel', icon: 'bi bi-diagram-3' },
      { name: 'Node.js', icon: 'bi bi-server' },
      { name: 'MySQL', icon: 'bi bi-database' },
      { name: 'PostgreSQL', icon: 'bi bi-database-fill' },
      { name: 'Firebase', icon: 'bi bi-cloud' },
      { name: 'GraphQL', icon: 'bi bi-graph-up' },
      { name: 'REST APIs', icon: 'bi bi-bezier2' },
      { name: 'Inertia.js', icon: 'bi bi-lightning' },
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: 'Git', icon: 'bi bi-git' },
      { name: 'GitHub', icon: 'bi bi-github' },
      { name: 'Docker', icon: 'bi bi-box-seam' },
      { name: 'Netlify', icon: 'bi bi-cloud-upload' },
      { name: 'Render', icon: 'bi bi-globe' },
      { name: 'Azure', icon: 'bi bi-microsoft' },
      { name: 'VS Code', icon: 'bi bi-code-slash' },
      { name: 'Postman', icon: 'bi bi-send' },
      { name: 'Figma', icon: 'bi bi-palette2' },
    ]
  }
]);

onMounted(() => {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});
</script>

<style scoped lang="scss">
.all-skills-page {
  background-color: var(--background-color);
  color: var(--default-color);
  min-height: 100vh;
}

.main {
  padding-top: 120px;
}

.page-header {
  padding: 60px 0;
  
  h1 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -2px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
  }
  
  .lead-text {
    max-width: 700px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.25rem;
    font-family: "Poppins", sans-serif;
  }
}

.skill-category {
  padding: 40px 0;
}

.category-header {
  .category-title {
    font-family: "Raleway", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: #fff;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  .category-divider {
    width: 60px;
    height: 3px;
    background: #0563bb;
    border-radius: 2px;
  }
}

.skill-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(5, 99, 187, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    .skill-icon i {
      color: #0563bb;
      transform: scale(1.1);
    }
    
    .skill-name {
      color: #fff;
    }
  }
}

.skill-icon {
  margin-bottom: 15px;
  
  i {
    font-size: 2.2rem;
    color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
}

.skill-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
}
</style>
