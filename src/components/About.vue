<template>
  <section id="about" class="about section dark-background">
    <div class="container" data-aos="fade-up">
      <div class="about-narrow">
        <div class="bio-block" data-aos="fade-up" data-aos-delay="100">
          <span class="bio-badge">Full-Stack Developer</span>
          <h3 class="bio-title">{{ title }}</h3>
          <p class="bio-subtitle">{{ subtitle }}</p>
          <p class="bio-text">{{ detailedDescription }}</p>
        </div>

        <div class="milestones" data-aos="fade-up" data-aos-delay="150">
          <div class="milestone-track">
            <div
              v-for="(m, index) in milestones"
              :key="index"
              class="milestone"
            >
              <div class="milestone-dot">
                <i :class="m.icon"></i>
              </div>
              <div class="milestone-content">
                <span class="milestone-year">{{ m.year }}</span>
                <span class="milestone-label">{{ m.label }}</span>
              </div>
              <div v-if="index < milestones.length - 1" class="milestone-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const title = ref("Karl Louise Rito");
const subtitle = ref("Building scalable web solutions with Laravel & Vue.js");

const detailedDescription = ref(`With over 5 years of experience in full-stack development, I have worked on diverse projects for major clients including Honda, delivering solutions using Laravel, Vue.js, GraphQL, and MySQL. I've mentored junior developers, participated in agile workflows using Jira, and contributed to AI training for developer assistance tools at Outlier. My academic background includes AI, Machine Learning, and Data Analysis, supporting my passion for innovative, technology-driven solutions.`);

const milestones = ref([
  { year: "2022", label: "Junior Web Developer", icon: "bi bi-code" },
  { year: "2023", label: "Full-Stack Developer", icon: "bi bi-layers" },
  { year: "2024", label: "BS IT Graduate", icon: "bi bi-mortarboard" },
  { year: "2025", label: "Remote Full-Stack Developer", icon: "bi bi-wifi" },
]);
</script>

<style scoped lang="scss">
$accent: #0563bb;

.about {
  padding: 120px 0;
  background-color: var(--background-color);
  color: var(--default-color);
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

.about-narrow {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.bio-block {
  text-align: center;
  margin-bottom: 3.5rem;
}

.bio-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: $accent;
  background: rgba($accent, 0.08);
  border: 1px solid rgba($accent, 0.15);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.bio-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 2.2rem;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 0 0 0.5rem;
}

.bio-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 1.5rem;
}

.bio-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
  max-width: 640px;
  margin: 0 auto;
}

.milestones {
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}

.milestone-track {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.milestone-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--background-color);
  border: 2px solid $accent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.6rem;
  transition: all 0.3s ease;
  z-index: 1;

  i {
    font-size: 0.75rem;
    color: $accent;
    transition: color 0.3s ease;
  }
}

.milestone:hover .milestone-dot {
  background: $accent;
  box-shadow: 0 0 12px rgba($accent, 0.4);

  i { color: #fff; }
}

.milestone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.milestone-year {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
}

.milestone-label {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  white-space: nowrap;
}

.milestone-line {
  position: absolute;
  top: 18px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, $accent 0%, rgba($accent, 0.15) 100%);
  z-index: 0;
}

@media (max-width: 768px) {
  .milestone-track {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding-left: 0;
    position: relative;
  }

  .milestone-track::before {
    content: '';
    position: absolute;
    left: 17px;
    top: 18px;
    bottom: 18px;
    width: 2px;
    background: linear-gradient(180deg, $accent 0%, rgba($accent, 0.1) 100%);
    z-index: 0;
  }

  .milestone {
    flex-direction: row;
    gap: 16px;
    width: 100%;
    padding: 0 0 1.5rem 0;
    align-items: flex-start;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .milestone-dot {
    margin-bottom: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .milestone-content {
    align-items: flex-start;
    padding-top: 6px;
  }

  .milestone-label {
    white-space: normal;
    text-align: left;
  }

  .milestone-line {
    display: none;
  }
}
</style>
