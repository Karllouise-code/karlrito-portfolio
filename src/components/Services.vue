<template>
  <!-- Services Section -->
  <section id="services" class="services section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>Professional development services tailored to your business needs</p>
    </div><!-- End Section Title -->

    <div class="container">

      <div class="row gy-4">

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="100">
          <div class="icon flex-shrink-0"><i class="bi bi-code-slash"></i></div>
          <div>
            <h4 class="title">Full-Stack Development</h4>
            <p class="description">End-to-end web application development using Vue.js, React, Laravel, and Node.js with modern best practices</p>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon flex-shrink-0"><i class="bi bi-palette"></i></div>
          <div>
            <h4 class="title">Frontend Development</h4>
            <p class="description">Responsive and performant user interfaces with Vue.js, React, TypeScript, and modern CSS frameworks</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="300">
          <div class="icon flex-shrink-0"><i class="bi bi-server"></i></div>
          <div>
            <h4 class="title">Backend Development</h4>
            <p class="description">Scalable server-side solutions with Laravel, Node.js, and RESTful/GraphQL APIs backed by robust databases</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="400">
          <div class="icon flex-shrink-0"><i class="bi bi-bezier2"></i></div>
          <div>
            <h4 class="title">API Development</h4>
            <p class="description">Design and implementation of RESTful and GraphQL APIs with comprehensive documentation and testing</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="500">
          <div class="icon flex-shrink-0"><i class="bi bi-database"></i></div>
          <div>
            <h4 class="title">Database Design</h4>
            <p class="description">Efficient database architecture and optimization using MySQL, PostgreSQL, SQLite, and Firebase</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="zoom-in" data-aos-delay="600">
          <div class="icon flex-shrink-0"><i class="bi bi-cloud-upload"></i></div>
          <div>
            <h4 class="title">Cloud Deployment</h4>
            <p class="description">Application deployment and management on Netlify and Render with CI/CD pipeline setup</p>
          </div>
        </div><!-- End Service Item -->

      </div>

    </div>

  </section><!-- /Services Section -->
</template>

<script>
export default {
  name: "Services",
};
</script>

<style scoped>
.services .service-item {
  position: relative;
}

.services .service-item .icon {
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  transition: 0.5s;
  border: 1px solid var(--accent-color);
  margin-right: 20px;
}

.services .service-item .icon i {
  color: var(--contrast-color);
  font-size: 24px;
  line-height: 0;
}

.services .service-item:hover .icon {
  background: transparent;
}

.services .service-item:hover .icon i {
  color: var(--accent-color);
}

.services .service-item .title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
  color: var(--heading-color);
}

.services .service-item .description {
  line-height: 24px;
  font-size: 14px;
}
</style>