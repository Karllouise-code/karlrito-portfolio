<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Import Google Fonts exactly as in the original */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* Import vendor CSS */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css");

/* Import custom portfolio CSS */
@import '@/assets/css/main-styles.css';

/* Global app styles */
html, body {
  overflow-x: hidden !important;
  width: 100%;
  max-width: 100vw;
  position: relative;
}

#app {
  font-family: var(--default-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden !important;
  width: 100%;
  position: relative;
}

/* Override for main wrapper */
.main {
  margin-left: 300px;
  min-height: 100vh;
  overflow-x: hidden !important;
  width: calc(100% - 300px);
  max-width: calc(100vw - 300px);
}

/* Mobile responsive adjustments */
@media (max-width: 1199px) {
  .main {
    margin-left: 0;
    width: 100%;
    max-width: 100vw;
  }
}

/* Minimalist active state for sidebar navigation */
.navmenu a,
.navmenu a:hover,
.navmenu .active,
.navmenu .active:hover {
  background: transparent !important;
}

.navmenu .active {
  position: relative;
}

.navmenu .active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background-color: var(--accent-color);
  border-radius: 0 2px 2px 0;
}
</style>
