<template>
  <footer id="footer" class="footer position-relative dark-background">
    <div class="footer-bar"></div>
    <div class="container">
      <div class="footer-row">
        <div class="footer-left">
          <span class="footer-mark">&lt;/&gt;</span>
          <p class="footer-copyright">© {{ new Date().getFullYear() }} Karl Louise Rito</p>
        </div>
        <div class="footer-right">
          <div class="footer-social-group">
            <span class="footer-label">Let's connect</span>
            <div class="footer-social">
              <a href="https://github.com/Karllouise-code" target="_blank" aria-label="GitHub"><i class="bi bi-github"></i></a>
              <a href="https://www.linkedin.com/in/karllouise08/" target="_blank" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
          <router-link to="/admin" class="footer-lock" aria-label="Admin">
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
  background-color: var(--background-color);
  color: rgba(255, 255, 255, 0.4);
  font-family: "Poppins", sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.footer-bar {
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
  opacity: 0.35;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-mark {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent-color);
  opacity: 0.6;
  line-height: 1;
}

.footer-copyright {
  font-size: 0.8rem;
  letter-spacing: 0.3px;
  margin: 0;
  opacity: 0.6;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-social-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.25);
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 14px;

  a {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.15rem;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: var(--accent-color);
      transform: translateY(-1px);
    }
  }
}

.footer-lock {
  color: rgba(255, 255, 255, 0.1);
  font-size: 0.65rem;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0;
}

.footer:hover .footer-lock {
  opacity: 1;
}

@media (max-width: 640px) {
  .footer-row {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .footer-left {
    flex-direction: column;
    gap: 8px;
  }

  .footer-right {
    flex-direction: column;
    gap: 12px;
  }

  .footer-social-group {
    flex-direction: column;
    gap: 10px;
  }

  .footer-lock {
    opacity: 1;
  }
}
</style>
