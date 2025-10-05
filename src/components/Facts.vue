<template>
  <!-- Stats Section -->
  <section id="stats" class="stats section dark-background">

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row gy-4">

        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <div class="stats-item">
            <i class="bi bi-emoji-smile"></i>
            <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter">{{ stats.happyClients }}</span>
            <p>Happy Clients</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <div class="stats-item">
            <i class="bi bi-journal-richtext"></i>
            <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter">{{ stats.projects }}</span>
            <p>Projects</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <div class="stats-item">
            <i class="bi bi-headset"></i>
            <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter">{{ stats.supportHours }}</span>
            <p>Hours Of Support</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <div class="stats-item">
            <i class="bi bi-people"></i>
            <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter">{{ stats.hardWorkers }}</span>
            <p>Hard Workers</p>
          </div>
        </div><!-- End Stats Item -->

      </div>

    </div>

  </section><!-- /Stats Section -->
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Facts",
  setup() {
    const stats = ref({
      happyClients: 232,
      projects: 521,
      supportHours: 1463,
      hardWorkers: 15,
    });

    onMounted(() => {
      // Initialize counters with animation
      const counters = document.querySelectorAll('.purecounter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-purecounter-end'));
        const duration = parseInt(counter.getAttribute('data-purecounter-duration')) * 1000;
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(counter);
      });
    });

    return {
      stats,
    };
  },
};
</script>
