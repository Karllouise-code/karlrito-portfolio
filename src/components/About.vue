<template>
  <section id="about" class="about">
    <div class="container">
      <div class="section-title">
        <h2>About</h2>
        <p>{{ aboutDescription }}</p>
      </div>

      <div class="row">
        <div class="col-lg-4" data-aos="fade-right">
          <img :src="profileImage" class="img-fluid" alt="Profile" />
        </div>
        <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
          <h3>{{ title }}</h3>
          <p class="fst-italic">{{ subtitle }}</p>

          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li v-for="item in personalInfo.slice(0, 3)" :key="item.label">
                  <i class="bi bi-chevron-right"></i>
                  <strong>{{ item.label }}:</strong>
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li v-for="item in personalInfo.slice(3)" :key="item.label">
                  <i class="bi bi-chevron-right"></i>
                  <strong>{{ item.label }}:</strong>
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>
          </div>

          <p>{{ detailedDescription }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "About",
  setup() {
    const profileImage = ref("/images/01-KARLRITO.jpeg");

    const aboutDescription = ref(`Full-Stack Web Developer specializing in building scalable, secure, and high-performance web applications. Currently working at SVEN - The Digital 1st Agency, balancing professional work with academic studies as a scholar at Trimex Colleges.`);

    const title = ref("Full-Stack Web Developer | AI Trainer");
    const subtitle = ref("Expertise in Laravel, Vue.js, API integration, and AI model training for developer tools.");

    const personalInfo = ref([
      // { label: "Birthday", value: "1 May 1995" },
      { label: "Website", value: "www.example.com" },
      { label: "Phone", value: "+63 976 366 7638" },
      { label: "City", value: "Biñan, Calabarzon, Philippines" },
      // { label: "Age", value: "30" },
      { label: "Degree", value: "Bachelor's in Information Technology" },
      { label: "Email", value: "karllouiserito.1@gmail.com" },
      { label: "Freelance", value: "Available" },
    ]);

    const detailedDescription = ref(`With over 3 years of experience in full-stack development, I have worked on diverse projects for major clients including Honda, delivering solutions using Laravel, Vue.js, GraphQL, and MySQL. I've mentored junior developers, participated in agile workflows using Jira, and contributed to AI training for developer assistance tools at Outlier. My academic background includes AI, Machine Learning, and Data Analysis, supporting my passion for innovative, technology-driven solutions.`);

    return {
      profileImage,
      aboutDescription,
      title,
      subtitle,
      personalInfo,
      detailedDescription,
    };
  },
};
</script>
