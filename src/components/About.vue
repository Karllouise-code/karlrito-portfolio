<template>
  <section id="about" class="about section dark-background">
    <div class="container" data-aos="fade-up">
      <div class="section-header text-center mb-5">
        <h2 class="display-4 fw-bold mb-3">About Me</h2>
        <p class="lead-text mx-auto">{{ aboutDescription }}</p>
      </div>

      <div class="row justify-content-center align-items-center">
        <div class="col-lg-10">
          <div class="about-content">
            <div class="info-grid-container mb-5">
              <div class="info-grid">
                <div v-for="item in personalInfo" :key="item.label" class="info-item">
                  <span class="info-label">{{ item.label }}</span>
                  <span class="info-value">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="bio-content text-center">
              <h3 class="bio-title mb-4">{{ title }}</h3>
              <p class="bio-subtitle mb-4">{{ subtitle }}</p>
              <p class="bio-text">{{ detailedDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const aboutDescription = ref(`Full-Stack Web Developer specializing in building scalable, secure, and high-performance web applications. Currently working at SVEN - The Digital 1st Agency, balancing professional work with academic studies as a scholar at Trimex Colleges.`);

const title = ref("Full-Stack Web Developer | AI Trainer");
const subtitle = ref("Expertise in Laravel, Vue.js, API integration, and AI model training for developer tools.");

const personalInfo = ref([
  { label: "Website", value: "karllouiserito.netlify.app" },
  { label: "Email", value: "karllouiserito.1@gmail.com" },
  { label: "City", value: "Calabarzon, PH" },
  // { label: "Degree", value: "BS IT" },
  { label: "Degree", value: "BS Information Technology" },
  { label: "Phone", value: "+63 976 366 7638" },
  { label: "Freelance", value: "Available" },
]);

const detailedDescription = ref(`With over 5 years of experience in full-stack development, I have worked on diverse projects for major clients including Honda, delivering solutions using Laravel, Vue.js, GraphQL, and MySQL. I've mentored junior developers, participated in agile workflows using Jira, and contributed to AI training for developer assistance tools at Outlier. My academic background includes AI, Machine Learning, and Data Analysis, supporting my passion for innovative, technology-driven solutions.`);
</script>

<style scoped lang="scss">
.about {
  padding: 120px 0;
  background-color: #040b14;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(5, 99, 187, 0.05) 0%, rgba(4, 11, 20, 0) 70%);
    filter: blur(50px);
    border-radius: 50%;
    z-index: 1;
  }
}

.section-header {
  position: relative;
  z-index: 2;
  
  h2 {
    font-family: "Raleway", sans-serif;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.lead-text {
  font-size: 1.2rem;
  max-width: 800px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  font-family: "Poppins", sans-serif;
}

.about-content {
  position: relative;
  z-index: 2;
}

.info-grid-container {
  padding: 2px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 40px;
  background: #040b14;
  border-radius: 22px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: #fff;
  font-weight: 400;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0563bb;
  }
}

.bio-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.5px;
  color: #fff;
}

.bio-subtitle {
  color: #0563bb;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.bio-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  max-width: 850px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 576px) {
  .info-grid {
    grid-template-columns: 1fr;
    padding: 30px;
  }
  
  .bio-title {
    font-size: 1.5rem;
  }
}
</style>
