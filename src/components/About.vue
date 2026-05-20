<template>
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up">
      <div class="about-header text-center mb-5">
        <h2 class="display-5 fw-bold mb-3">About Me</h2>
        <div class="divider mx-auto mb-4"></div>
        <p class="lead-text mx-auto">{{ aboutDescription }}</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div class="info-grid mb-5">
            <div v-for="item in personalInfo" :key="item.label" class="info-item">
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>

          <div class="bio-content text-center">
            <h3 class="bio-title mb-4">{{ title }}</h3>
            <p class="bio-subtitle fst-italic mb-4">{{ subtitle }}</p>
            <p class="bio-text">{{ detailedDescription }}</p>
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
  { label: "Degree", value: "BS IT" },
  { label: "Phone", value: "+63 976 366 7638" },
  { label: "Freelance", value: "Available" },
]);

const detailedDescription = ref(`With over 3 years of experience in full-stack development, I have worked on diverse projects for major clients including Honda, delivering solutions using Laravel, Vue.js, GraphQL, and MySQL. I've mentored junior developers, participated in agile workflows using Jira, and contributed to AI training for developer assistance tools at Outlier. My academic background includes AI, Machine Learning, and Data Analysis, supporting my passion for innovative, technology-driven solutions.`);
</script>

<style scoped lang="scss">
.about {
  padding: 100px 0;
  background-color: #040b14;
  color: #fff;
}

.divider {
  width: 60px;
  height: 4px;
  background: #0563bb;
  border-radius: 2px;
}

.lead-text {
  font-size: 1.25rem;
  max-width: 800px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #0563bb;
  font-weight: 700;
}

.info-value {
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
}

.bio-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  color: #fff;
}

.bio-subtitle {
  color: #0563bb;
  font-size: 1.1rem;
}

.bio-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
    padding: 25px;
  }
}
</style>
