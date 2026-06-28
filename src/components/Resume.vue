<template>
  <section id="resume" class="resume section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Experience</h2>
      <p class="lead-text mx-auto">Full-stack web developer with 5+ years of experience delivering scalable solutions</p>
    </div>

    <div class="container">
      <div class="stats-row" data-aos="fade-up" data-aos-delay="100">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <div class="timeline-wrapper" data-aos="fade-up" data-aos-delay="150">
        <div class="timeline-header">
          <i class="bi bi-briefcase"></i>
          <h3>Professional Experience</h3>
        </div>

        <div class="timeline">
          <div
            v-for="(item, index) in experience"
            :key="index"
            class="timeline-item"
            data-aos="fade-up"
            :data-aos-delay="200 + index * 80"
          >
            <div class="timeline-dot">
              <i :class="item.icon"></i>
            </div>
            <div class="timeline-card">
              <div class="timeline-card-top">
                <span class="timeline-date">{{ item.date }}</span>
                <span v-if="item.current" class="current-badge">Current</span>
              </div>
              <h4 class="timeline-role">{{ item.role }}</h4>
              <span class="timeline-company">{{ item.company }}</span>
              <ul class="timeline-list">
                <li v-for="(point, i) in item.points" :key="i">{{ point }}</li>
              </ul>
              <div class="timeline-tags" v-if="item.tags">
                <span v-for="tag in item.tags" :key="tag" class="timeline-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-wrapper education" data-aos="fade-up" data-aos-delay="150">
        <div class="timeline-header">
          <i class="bi bi-mortarboard"></i>
          <h3>Education</h3>
        </div>

        <div class="timeline">
          <div
            v-for="(item, index) in education"
            :key="index"
            class="timeline-item"
            data-aos="fade-up"
            :data-aos-delay="200 + index * 80"
          >
            <div class="timeline-dot">
              <i :class="item.icon"></i>
            </div>
            <div class="timeline-card">
              <span class="timeline-date">{{ item.date }}</span>
              <h4 class="timeline-role">{{ item.role }}</h4>
              <span class="timeline-company">{{ item.company }}</span>
              <p class="timeline-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="250">
        <router-link to="/resume" class="btn-minimal">
          <i class="bi bi-file-text"></i>
          <span>View Full Resume</span>
          <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const experience = [
  {
    role: "Web Developer",
    company: "SVEN - The Digital 1st Agency",
    date: "Sept 2025 — Present",
    current: true,
    icon: "bi bi-code-slash",
    points: [
      "Full-stack development delivering scalable applications",
      "API integration and system architecture",
      "Building frontends with React and Vue.js",
    ],
    tags: ["Vue", "Laravel", "React", "API"]
  },
  {
    role: "AI Trainer for Developers",
    company: "Outlier",
    date: "Oct 2024 — Jan 2025",
    icon: "bi bi-robot",
    points: [
      "Trained AI models for code generation",
      "Enhanced developer productivity tools",
    ],
    tags: ["AI", "Code Gen", "Python"]
  },
  {
    role: "Full-Stack Developer",
    company: "Switch Connect, Laguna",
    date: "Sept 2023 — Sept 2025",
    icon: "bi bi-layers",
    points: [
      "Core developer for Honda and major clients",
      "Built with Laravel, Vue.js, GraphQL, MySQL stack",
      "Mentored junior developers",
    ],
    tags: ["Laravel", "Vue", "GraphQL", "MySQL"]
  },
  {
    role: "Junior Web Developer",
    company: "Switch Connect, Laguna",
    date: "Apr 2022 — Sept 2023",
    icon: "bi bi-layers",
    points: [
      "Developed coche.ph web application",
      "Built frontend with Vue.js and backend with Laravel",
    ],
    tags: ["Vue", "Laravel", "PHP"]
  },
];

const education = [
  {
    role: "BS in Information Technology",
    company: "Trimex Colleges, Biñan",
    date: "2020 — 2024",
    icon: "bi bi-book",
    description: "Scholar - Computer Programming major. Successfully balanced full-time work and academic studies. Focus includes AI, Machine Learning, and Data Analysis."
  },
  {
    role: "Senior High School - STEM",
    company: "Biñan Integrated National High School",
    date: "2018 — 2020",
    icon: "bi bi-book",
    description: "Science, Technology, Engineering, and Mathematics (STEM) strand, building a strong foundation in technical and analytical skills."
  }
];

const stats = computed(() => [
  { value: "5+", label: "Years Experience" },
  { value: experience.length, label: "Roles Held" },
  { value: new Set(experience.map(e => e.company.replace(/,.*$/, '').trim())).size, label: "Companies" },
]);
</script>

<style scoped lang="scss">
$accent: #0563bb;

.resume {
  padding: 100px 0;
  background-color: var(--background-color);
  color: var(--default-color);
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

.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 1.5rem 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  min-width: 140px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba($accent, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
}

.stat-value {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  color: $accent;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-wrapper {
  max-width: 720px;
  margin: 0 auto 3rem;

  &.education {
    .timeline-dot {
      background: rgba(#3fb950, 0.15);
      border-color: #3fb950;

      i { color: #3fb950; }
    }

    .timeline-item:hover .timeline-dot {
      background: #3fb950;
      i { color: #fff; }
    }
  }
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;

  i {
    font-size: 1.2rem;
    color: $accent;
    background: rgba($accent, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #e8ecf1;
    margin: 0;
    font-family: "Raleway", sans-serif;
  }
}

.timeline {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, $accent 0%, rgba($accent, 0.1) 100%);
  }
}

.timeline-item {
  position: relative;
  padding-left: 56px;
  padding-bottom: 2.5rem;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba($accent, 0.15);
  border: 2px solid $accent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1;

  i {
    font-size: 0.5rem;
    color: $accent;
    transition: color 0.3s ease;
  }
}

.timeline-item:hover .timeline-dot {
  background: $accent;
  box-shadow: 0 0 12px rgba($accent, 0.4);

  i { color: #fff; }
}

.timeline-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba($accent, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: translateX(4px);
  }
}

.timeline-card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.timeline-date {
  display: inline-block;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.15rem 0.6rem;
  border-radius: 4px;
}

.current-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #3fb950;
  background: rgba(#3fb950, 0.1);
  border: 1px solid rgba(#3fb950, 0.25);
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
}

.timeline-role {
  font-size: 1.15rem;
  font-weight: 700;
  color: #e8ecf1;
  margin-bottom: 0.15rem;
  font-family: "Raleway", sans-serif;
}

.timeline-company {
  display: block;
  font-size: 0.9rem;
  color: $accent;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.timeline-list {
  padding-left: 1.1rem;
  margin-bottom: 0.75rem;

  li {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    padding-bottom: 4px;

    &::marker {
      color: $accent;
    }
  }
}

.timeline-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.timeline-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  background: rgba($accent, 0.08);
  border: 1px solid rgba($accent, 0.15);
  border-radius: 3px;
  font-size: 0.65rem;
  font-weight: 600;
  color: $accent;
  text-transform: uppercase;
  letter-spacing: 0.3px;
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
    background: $accent;
    border-color: $accent;
    color: #fff;
    box-shadow: 0 10px 20px rgba($accent, 0.2);

    i:last-child {
      transform: translateX(5px);
    }
  }
}

@media (max-width: 768px) {
  .stats-row {
    gap: 1rem;
  }

  .stat-item {
    padding: 1rem 1.5rem;
    min-width: 110px;
  }

  .stat-value {
    font-size: 1.8rem;
  }

  .timeline-wrapper {
    max-width: 100%;
  }

  .timeline-item {
    padding-left: 48px;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-dot {
    left: 6px;
    width: 18px;
    height: 18px;
  }
}
</style>
