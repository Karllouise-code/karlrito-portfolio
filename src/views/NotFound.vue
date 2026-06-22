<template>
  <div class="not-found-page">
    <div class="container text-center">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-description">The page you're looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="btn-home">
        <i class="bi bi-house-door me-2"></i>Back to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped lang="scss">
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #040b14;
  color: #fff;
  padding: 40px 20px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  font-family: "Raleway", sans-serif;
  background: linear-gradient(135deg, #0563bb, #149ddd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: "Raleway", sans-serif;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  margin: 0 auto 2rem;
}

.btn-home {
  display: inline-flex;
  align-items: center;
  background: #0563bb;
  color: #fff;
  padding: 14px 35px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #0678e3;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(5, 99, 187, 0.3);
    color: #fff;
  }
}

@media (max-width: 576px) {
  .error-code {
    font-size: 5rem;
  }
  .error-title {
    font-size: 1.8rem;
  }
}
</style>
