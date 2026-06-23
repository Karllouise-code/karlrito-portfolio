<template>
  <section id="services" class="services section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Services</h2>
      <p class="lead-text mx-auto">Professional development services tailored to your business needs</p>
    </div>

    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6" v-for="(service, index) in services" :key="index" data-aos="fade-up" :data-aos-delay="100 * (index + 1)">
          <div class="service-card">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h4 class="service-title">{{ service.title }}</h4>
            <p class="service-description">{{ service.description }}</p>
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
    description: "End-to-end web application development using Vue.js, React, Laravel, and Node.js with modern best practices."
  },
  {
    title: "Frontend Development",
    icon: "bi bi-palette",
    description: "Responsive and performant user interfaces with Vue.js, React, TypeScript, and modern CSS frameworks."
  },
  {
    title: "Backend Development",
    icon: "bi bi-server",
    description: "Scalable server-side solutions with Laravel, Node.js, and RESTful/GraphQL APIs backed by robust databases."
  },
  {
    title: "API Development",
    icon: "bi bi-bezier2",
    description: "Design and implementation of RESTful and GraphQL APIs with comprehensive documentation and testing."
  },
  {
    title: "Database Design",
    icon: "bi bi-database",
    description: "Efficient database architecture and optimization using MySQL, PostgreSQL, SQLite, and Firebase."
  },
  {
    title: "Cloud Deployment",
    icon: "bi bi-cloud-upload",
    description: "Application deployment and management on Netlify and Render with CI/CD pipeline setup."
  }
]);
</script>

<style scoped lang="scss">
.services {
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

.service-card {
  padding: 50px 30px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  height: 100%;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    background: linear-gradient(225deg, rgba(5, 99, 187, 0.1) 0%, transparent 50%);
    transition: all 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(5, 99, 187, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    &::after {
      width: 100px;
      height: 100px;
    }

    .service-icon i {
      color: #0563bb;
      transform: scale(1.1);
    }

    .service-title {
      color: #fff;
    }
  }
}

.service-icon {
  margin-bottom: 25px;
  
  i {
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    display: inline-block;
  }
}

.service-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.service-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0;
}

@media (max-width: 576px) {
  .service-card {
    padding: 40px 25px;
  }
}
</style>