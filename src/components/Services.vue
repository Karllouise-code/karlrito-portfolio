<template>
  <section id="services" class="services section dark-background">
    <div class="container section-title text-center" data-aos="fade-up">
      <h2>Services</h2>
      <p>What I can build for you</p>
    </div>

    <div class="container">
      <div class="services-grid">
        <div v-for="(service, index) in services" :key="index" class="service-item" data-aos="fade-up" :data-aos-delay="100 * (index + 1)">
          <div class="service-icon">
            <i :class="service.icon"></i>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-tags">
            <span v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const services = ref([
  {
    title: "Full-Stack Development",
    icon: "bi bi-code-slash",
    description: "End-to-end web applications from database to deployment.",
    tags: ["Vue.js", "Laravel", "Node.js"],
  },
  {
    title: "Frontend Development",
    icon: "bi bi-palette",
    description: "Responsive interfaces with modern frameworks and tools.",
    tags: ["Vue 3", "React", "TypeScript", "SCSS"],
  },
  {
    title: "Backend Development",
    icon: "bi bi-server",
    description: "Scalable server logic, APIs, and authentication.",
    tags: ["Laravel", "Node.js", "REST", "GraphQL"],
  },
  {
    title: "API Design & Integration",
    icon: "bi bi-bezier2",
    description: "Clean, documented APIs that other devs enjoy using.",
    tags: ["RESTful", "GraphQL", "OpenAPI"],
  },
  {
    title: "Database Architecture",
    icon: "bi bi-database",
    description: "Schema design, optimization, and data modeling.",
    tags: ["MySQL", "PostgreSQL", "SQLite", "Firebase"],
  },
  {
    title: "Cloud & DevOps",
    icon: "bi bi-cloud-upload",
    description: "CI/CD pipelines, hosting, and infrastructure management.",
    tags: ["Netlify", "Render", "Docker"],
  },
]);
</script>

<style scoped lang="scss">
.services {
  padding: 100px 0;
  background-color: var(--background-color);
  color: var(--default-color);
}

.section-title {
  margin-bottom: 4rem;

  h2 {
    font-family: "Raleway", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.75rem;
  }

  p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.service-item {
  text-align: center;
  position: relative;
  padding-bottom: 3rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 2rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent);
    transition: all 0.4s ease;
  }

  &:hover::after {
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0563bb, transparent);
  }
}

.service-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.4s ease;

  i {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.25);
    transition: all 0.3s ease;
  }
}

.service-item:hover .service-icon {
  border-color: #0563bb;
  background: rgba(5, 99, 187, 0.08);
  box-shadow: 0 0 24px rgba(5, 99, 187, 0.12);

  i {
    color: #0563bb;
  }
}

.service-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.service-item:hover .service-title {
  color: #fff;
}

.service-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 1rem;
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-size: 0.65rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.service-item:hover .tag {
  color: rgba(255, 255, 255, 0.5);
  border-color: rgba(5, 99, 187, 0.25);
}
</style>
