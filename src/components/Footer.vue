<template>
  <footer id="footer" class="footer position-relative dark-background">
    <div class="container">
      <div class="footer-content text-center py-5">
        <div class="divider-minimal mx-auto mb-4"></div>
        <div class="copyright">
          <p class="mb-0">© <span>{{ new Date().getFullYear() }}</span> <span class="fw-bold">Karl Louise Rito</span>. <span>All Rights Reserved</span></p>
        </div>
        <div class="social-links-minimal mt-3">
          <a href="https://github.com/karlrito" target="_blank" class="mx-2"><i class="bi bi-github"></i></a>
          <a href="https://linkedin.com/in/karllouiserito" target="_blank" class="mx-2"><i class="bi bi-linkedin"></i></a>
        </div>
        <div class="admin-link mt-4">
          <router-link to="/admin" class="lock-link">
            <i class="bi bi-lock"></i>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Date is handled in template
</script>

<style scoped lang="scss">
.footer {
  background-color: #040b14;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Poppins", sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.divider-minimal {
  width: 40px;
  height: 2px;
  background: #0563bb;
  opacity: 0.5;
}

.copyright {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  
  span.fw-bold {
    color: #fff;
  }
}

.social-links-minimal {
  a {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #0563bb;
    }
  }
}

.lock-link {
  color: rgba(255, 255, 255, 0.1);
  font-size: 0.7rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
