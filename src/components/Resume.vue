<template>
  <!-- Resume Section -->
  <section id="resume" class="resume section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Experience</h2>
      <p>Full-stack web developer with 3+ years of experience delivering scalable solutions</p>
    </div><!-- End Section Title -->

    <div class="container">

      <div class="row">

        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <h3 class="resume-title">Education</h3>
          <div class="resume-item">
            <h4>Bachelor of Science in Information Technology</h4>
            <h5>2020 - 2024</h5>
            <p><em>Trimex Colleges, Biñan, Calabarzon, Philippines</em></p>
            <p>Scholar - Computer Programming major. Demonstrated exceptional time management by successfully balancing full-time work and academic studies. Academic focus includes Artificial Intelligence, Machine Learning, and Data Analysis.</p>
          </div><!-- End Resume Item -->

          <div class="resume-item">
            <h4>Senior High School Diploma - STEM</h4>
            <h5>2018 - 2020</h5>
            <p><em>Biñan Integrated National High School, Philippines</em></p>
            <p>Science, Technology, Engineering, and Mathematics (STEM) strand, building a strong foundation in technical and analytical skills.</p>
          </div><!-- End Resume Item -->
        </div>

        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <h3 class="resume-title">Professional Experience</h3>
          <div class="resume-scroll-container">
            <div class="resume-item">
              <h4>Web Developer</h4>
              <h5>Sept 2024 - Present</h5>
              <p><em>SVEN - The Digital 1st Agency (Remote)</em></p>
              <ul>
                <li>Full-stack development delivering scalable applications</li>
                <li>API integration and system architecture</li>
              </ul>
            </div><!-- End Resume Item -->

            <div class="resume-item">
              <h4>Full-Stack Developer</h4>
              <h5>Sept 2023 - Oct 2024</h5>
              <p><em>Switch Connect, Laguna</em></p>
              <ul>
                <li>Core developer for Honda and major clients</li>
                <li>Laravel, Vue.js, GraphQL, MySQL</li>
                <li>Mentored junior developers</li>
              </ul>
            </div><!-- End Resume Item -->

            <div class="resume-item">
              <h4>Junior Web Developer</h4>
              <h5>Apr 2022 - Sept 2023</h5>
              <p><em>Switch Connect, Laguna</em></p>
              <ul>
                <li>Developed coche.ph web application</li>
                <li>Vue.js frontend and Laravel backend</li>
              </ul>
            </div><!-- End Resume Item -->

            <div class="resume-item">
              <h4>AI Trainer for Developers</h4>
              <h5>Oct 2024 - Jan 2025</h5>
              <p><em>Outlier (Remote)</em></p>
              <ul>
                <li>Trained AI models for code generation</li>
                <li>Enhanced developer productivity tools</li>
              </ul>
            </div><!-- End Resume Item -->
          </div>
        </div>

      </div>

    </div>

  </section><!-- /Resume Section -->
</template>

<script>
export default {
  name: "Resume",
};
</script>

<style scoped>
.resume .row {
  align-items: flex-start;
}

.resume-scroll-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 15px;
  padding-left: 10px;
  padding-top: 2px;
  margin-left: -10px;
}

.resume-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.resume-scroll-container::-webkit-scrollbar-track {
  background: color-mix(in srgb, var(--default-color), transparent 95%);
  border-radius: 3px;
}

.resume-scroll-container::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}

.resume-scroll-container::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 20%);
}

/* Fix for timeline dots being cut off */
.resume-item {
  padding: 0 0 20px 20px;
  margin-top: -2px;
  border-left: 2px solid var(--accent-color);
  position: relative;
  margin-bottom: 0;
}

.resume-item::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50px;
  left: -9px;
  top: 0;
  background: var(--background-color);
  border: 2px solid var(--accent-color);
}

.resume-item h4 {
  font-size: 17px;
  margin-bottom: 8px;
}

.resume-item h5 {
  font-size: 14px;
  margin-bottom: 8px;
}

.resume-item p {
  margin-bottom: 8px;
  font-size: 14px;
}

.resume-item ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.resume-item ul li {
  font-size: 13px;
  padding-bottom: 6px;
}

@media (max-width: 991px) {
  .resume-scroll-container {
    max-height: none;
    overflow-y: visible;
  }
}
</style>