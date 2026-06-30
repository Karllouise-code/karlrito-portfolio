<template>
  <section id="portfolio" class="portfolio section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Portfolio</h2>
      <p class="lead-text mx-auto">A selection of my recent projects and work</p>
    </div>

    <div class="container">
      <div class="row g-4" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-6" v-for="(project, index) in featuredProjects" :key="index">
          <div class="project-card">
            <span class="project-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags" v-if="project.tags">
                <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
              </div>
              <div class="project-footer">
                <a :href="project.link" class="project-link" target="_blank" rel="noopener noreferrer">
                  <span>{{ project.slug }}</span>
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/all-projects" class="btn-minimal">
          <span>View All Projects</span>
          <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { projects } from "@/data/projects.js";

const featuredProjects = computed(() => projects.filter((p) => p.featured));
</script>

<style scoped lang="scss">


.portfolio {
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

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  position: relative;
  display: flex;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 0;
    background: var(--accent-color);
    transition: height 0.35s ease;
    border-radius: 0 0 3px 3px;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(var(--accent-color-rgb), 0.3);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);

    &::before {
      height: 100%;
    }

    .project-title {
      color: var(--accent-color);
    }

    .project-link {
      color: #fff;
      background: var(--accent-color);
    }
  }
}

.project-index {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.1);
  font-weight: 700;
  letter-spacing: 1px;
  user-select: none;
}

.project-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #e8ecf1;
  transition: color 0.3s ease;
  padding-right: 2.5rem;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.25rem;
}

.project-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(var(--accent-color-rgb), 0.08);
  border: 1px solid rgba(var(--accent-color-rgb), 0.15);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-footer {
  margin-top: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  i {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translate(2px, -2px);
  }
}

@media (max-width: 576px) {
  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.2rem;
  }
}
</style>
