<template>
  <div class="cursor-glow" :style="{ '--mx': mouseX + 'px', '--my': mouseY + 'px' }"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CursorGlow',
  setup() {
    const mouseX = ref(-250);
    const mouseY = ref(-250);

    const handleMouseMove = (e) => {
      mouseX.value = e.clientX;
      mouseY.value = e.clientY;
    };

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove);
    });

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove);
    });

    return { mouseX, mouseY };
  }
};
</script>

<style scoped lang="scss">
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--accent-color-rgb), 0.07) 0%, transparent 70%);
    transform: translate(calc(var(--mx) - 300px), calc(var(--my) - 300px));
    transition: transform 0.4s ease-out;
    filter: blur(60px);
  }
}
</style>
