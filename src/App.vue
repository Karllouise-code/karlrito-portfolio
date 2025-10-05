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

/* Import the exact iPortfolio CSS */
@import '@/assets/css/iportfolio.css';

/* Global app styles */
#app {
  font-family: var(--default-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Override for main wrapper */
.main {
  margin-left: 300px;
  min-height: 100vh;
}

/* Mobile responsive adjustments */
@media (max-width: 1199px) {
  .main {
    margin-left: 0;
  }
}
</style>
