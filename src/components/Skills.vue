<template>
  <section id="skills" class="skills section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Skills</h2>
      <p class="lead-text mx-auto">Technologies and tools I work with</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row g-4 justify-content-center">
        <div class="col-lg-3 col-md-4 col-sm-6" v-for="(skill, index) in skills" :key="index">
          <div class="skill-card">
            <div class="skill-icon">
              <i :class="skill.icon"></i>
            </div>
            <h4 class="skill-name">{{ skill.name }}</h4>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/all-skills" class="btn-minimal">
          <span>View All Skills</span>
          <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const skills = ref([
  { name: 'Vue.js', icon: 'bi bi-code-square' },
  { name: 'React', icon: 'bi bi-code-slash' },
  { name: 'JavaScript', icon: 'bi bi-filetype-js' },
  { name: 'TypeScript', icon: 'bi bi-code' },
  { name: 'PHP', icon: 'bi bi-filetype-php' },
  { name: 'Laravel', icon: 'bi bi-diagram-3' },
  { name: 'Node.js', icon: 'bi bi-server' },
  { name: 'MySQL', icon: 'bi bi-database' },
]);
</script>

<style scoped lang="scss">
.skills {
  padding: 100px 0;
  background-color: #040b14;
  color: #fff;
}

.section-title {
  h2 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif;
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
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
  }
}

.skill-name {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

.btn-minimal {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;

  i {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #0563bb;
    border-color: #0563bb;
    color: #fff;
    box-shadow: 0 10px 20px rgba(5, 99, 187, 0.2);

    i {
      transform: translateX(5px);
    }
  }
}

@media (max-width: 768px) {
  .skill-card {
    padding: 20px 15px;
  }
  
  .skill-icon i {
    font-size: 2rem;
  }
}
</style>