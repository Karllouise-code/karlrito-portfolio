<template>
  <section id="resume" class="resume section dark-background">
    <div class="container section-title text-center mb-5" data-aos="fade-up">
      <h2 class="display-4 fw-bold">Experience</h2>
      <p class="lead-text mx-auto">Full-stack web developer with 5+ years of experience delivering scalable solutions</p>
    </div>

    <div class="container">
      <div class="row g-5">
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <h3 class="resume-title">Education</h3>
          <div class="resume-timeline">
            <div class="resume-item">
              <h4>Bachelor of Science in Information Technology</h4>
              <div class="resume-date">2020 - 2024</div>
              <p class="resume-location"><em>Trimex Colleges, Biñan, Calabarzon, PH</em></p>
              <p class="resume-desc">Scholar - Computer Programming major. Successfully balanced full-time work and academic studies. Focus includes AI, Machine Learning, and Data Analysis.</p>
            </div>

            <div class="resume-item">
              <h4>Senior High School Diploma - STEM</h4>
              <div class="resume-date">2018 - 2020</div>
              <p class="resume-location"><em>Biñan Integrated National High School, PH</em></p>
              <p class="resume-desc">Science, Technology, Engineering, and Mathematics (STEM) strand, building a strong foundation in technical and analytical skills.</p>
            </div>
          </div>
        </div>

        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <h3 class="resume-title">Professional Experience</h3>
          <div class="resume-timeline">
            <div class="resume-item">
              <h4>Web Developer</h4>
              <div class="resume-date">Sept 2025 - Present</div>
              <p class="resume-location"><em>SVEN - The Digital 1st Agency (Remote)</em></p>
              <ul class="resume-list">
                <li>Full-stack development delivering scalable applications</li>
                <li>API integration and system architecture</li>
              </ul>
            </div>

            <div class="resume-item">
              <h4>Full-Stack Developer</h4>
              <div class="resume-date">Sept 2023 - Sept 2025</div>
              <p class="resume-location"><em>Switch Connect, Laguna</em></p>
              <ul class="resume-list">
                <li>Core developer for Honda and major clients</li>
                <li>Laravel, Vue.js, GraphQL, MySQL stack</li>
                <li>Mentored junior developers</li>
              </ul>
            </div>

            <div class="resume-item">
              <h4>Junior Web Developer</h4>
              <div class="resume-date">Apr 2022 - Sept 2023</div>
              <p class="resume-location"><em>Switch Connect, Laguna</em></p>
              <ul class="resume-list">
                <li>Developed coche.ph web application</li>
                <li>Vue.js frontend and Laravel backend</li>
              </ul>
            </div>

            <div class="resume-item">
              <h4>AI Trainer for Developers</h4>
              <div class="resume-date">Oct 2024 - Jan 2025</div>
              <p class="resume-location"><em>Outlier (Remote)</em></p>
              <ul class="resume-list">
                <li>Trained AI models for code generation</li>
                <li>Enhanced developer productivity tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed for static data
</script>

<style scoped lang="scss">
.resume {
  padding: 100px 0;
  background-color: #040b14;
  color: #fff;
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

.resume-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 30px;
  color: #fff;
  font-family: "Raleway", sans-serif;
}

.resume-timeline {
  border-left: 2px solid rgba(255, 255, 255, 0.05);
  padding-left: 20px;
  position: relative;
}

.resume-item {
  padding-bottom: 40px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50px;
    left: -29px;
    top: 0;
    background: #040b14;
    border: 2px solid #0563bb;
    transition: all 0.3s ease;
  }

  &:hover::before {
    background: #0563bb;
    box-shadow: 0 0 10px rgba(5, 99, 187, 0.5);
  }

  h4 {
    line-height: 18px;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    color: #0563bb;
    margin-bottom: 10px;
  }
}

.resume-date {
  display: inline-block;
  background: rgba(255, 255, 255, 0.05);
  padding: 5px 15px;
  font-weight: 600;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.resume-location {
  font-size: 1rem;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.resume-desc {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
}

.resume-list {
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.6);
  
  li {
    padding-bottom: 10px;
  }
}

@media (max-width: 992px) {
  .resume-timeline {
    padding-left: 15px;
  }
  .resume-item::before {
    left: -24px;
  }
}
</style>