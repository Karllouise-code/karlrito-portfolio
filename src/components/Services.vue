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

<style scoped lang="scss">
@import '@/assets/scss/components/_services.scss';
</style>