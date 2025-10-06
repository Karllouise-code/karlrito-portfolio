<template>
  <!-- Services Section -->
  <section id="services" class="services section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div><!-- End Section Title -->

    <div class="container">

      <div class="row gy-4">

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">
          <div class="icon flex-shrink-0"><i class="bi bi-briefcase"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Lorem Ipsum</a></h4>
            <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="200">
          <div class="icon flex-shrink-0"><i class="bi bi-card-checklist"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Dolor Sitema</a></h4>
            <p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="300">
          <div class="icon flex-shrink-0"><i class="bi bi-bar-chart"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Sed ut perspiciatis</a></h4>
            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="400">
          <div class="icon flex-shrink-0"><i class="bi bi-binoculars"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Magni Dolores</a></h4>
            <p class="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="500">
          <div class="icon flex-shrink-0"><i class="bi bi-brightness-high"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Nemo Enim</a></h4>
            <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
          </div>
        </div><!-- End Service Item -->

        <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="600">
          <div class="icon flex-shrink-0"><i class="bi bi-calendar4-week"></i></div>
          <div>
            <h4 class="title"><a href="service-details.html" class="stretched-link">Eiusmod Tempor</a></h4>
            <p class="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
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
}

.services .service-item .title a {
  color: var(--heading-color);
  text-decoration: none;
}

.services .service-item .title a:hover {
  color: var(--accent-color);
}

.services .service-item .description {
  line-height: 24px;
  font-size: 14px;
}
</style>