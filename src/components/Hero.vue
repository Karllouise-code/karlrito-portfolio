<template>
  <!-- Hero Section -->
  <section id="hero" class="hero section dark-background">
    <div class="hero-background-effects">
      <div class="glow-effect"></div>
    </div>

    <div class="container text-center" data-aos="fade-up" data-aos-delay="100">
      <div class="hero-content">
        <h2 class="hero-name">{{ name }}</h2>
        <div class="hero-typed-container">
          <span class="hero-prefix">I'm a </span>
          <span class="typed" ref="typedElement"></span>
        </div>

        <div class="hero-actions" data-aos="fade-up" data-aos-delay="200">
          <router-link to="/resume" class="btn-resume">
            <i class="bi bi-file-earmark-pdf"></i> View My Resume
          </router-link>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" data-aos="fade-up" data-aos-delay="400">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrows">
        <span></span>
        <span></span>
      </div>
    </div>
  </section><!-- /Hero Section -->
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Typed from "typed.js";

export default {
  name: "Hero",
  setup() {
    const name = ref("Karl Louise Rito");
    const typedElement = ref(null);
    let typedInstance = null;

    onMounted(() => {
      if (typedElement.value) {
        typedInstance = new Typed(typedElement.value, {
          strings: ["Web Developer", "Artisan", "Vue Enthusiast"],
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
          loop: true,
        });
      }
    });

    onUnmounted(() => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    });

    return {
      name,
      typedElement,
    };
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/components/hero' as *;

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  background-color: var(--background-color); // Solid minimalist dark background
}

.hero-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  .glow-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(5, 99, 187, 0.1) 0%, rgba(4, 11, 20, 0) 70%);
    filter: blur(50px);
    border-radius: 50%;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-name {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: "Raleway", sans-serif;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-typed-container {
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;

  .typed {
    color: #0563bb;
    font-weight: 600;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2;
  opacity: 0.6;

  .mouse {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    position: relative;

    .wheel {
      width: 4px;
      height: 8px;
      background-color: #fff;
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      animation: scroll-wheel 2s infinite;
    }
  }

  .arrows {
    display: flex;
    flex-direction: column;
    
    span {
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(255, 255, 255, 0.3);
      border-bottom: 2px solid rgba(255, 255, 255, 0.3);
      transform: rotate(45deg);
      margin-top: -5px;
      animation: arrow-down 2s infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }
    }
  }
}

@keyframes scroll-wheel {
  0% { top: 6px; opacity: 1; }
  100% { top: 25px; opacity: 0; }
}

@keyframes arrow-down {
  0% { opacity: 0; transform: rotate(45deg) translate(-10px, -10px); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: rotate(45deg) translate(10px, 10px); }
}

@media (max-width: 992px) {
  .hero-name {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .hero-name {
    font-size: 2.8rem;
  }
  .hero-typed-container {
    font-size: 1.2rem;
  }
}
</style>
