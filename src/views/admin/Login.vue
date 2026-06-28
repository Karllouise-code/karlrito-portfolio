<template>
  <div class="login-container dark-background">
    <div class="login-card">
      <div class="text-center mb-4">
        <div class="lock-icon mb-3">
          <i class="bi bi-shield-lock"></i>
        </div>
        <h2 class="login-title">Admin Access</h2>
        <p class="text-muted">Enter password to continue</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="Password"
            required
            :class="{ 'is-invalid': error }"
          >
          <div v-if="error" class="invalid-feedback">
            {{ error }}
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary w-100 py-2">
          Unlock Dashboard
        </button>
      </form>
      
      <div class="mt-4 text-center">
        <router-link to="/" class="back-link">
          <i class="bi bi-arrow-left"></i> Back to Portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    const res = await fetch('/.netlify/functions/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value }),
    });

    const data = await res.json();

    if (data.authenticated) {
      sessionStorage.setItem('admin_auth', 'true');
      router.push('/admin');
    } else {
      error.value = 'Incorrect password. Access denied.';
      password.value = '';
    }
  } catch {
    error.value = 'Network error. Could not reach authentication server.';
    password.value = '';
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  color: var(--default-color);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.lock-icon {
  font-size: 3rem;
  color: #0563bb;
}

.login-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
}

.form-control {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: #0563bb;
    box-shadow: none;
    color: #fff;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}

.btn-primary {
  background: #0563bb;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0678e3;
    transform: translateY(-2px);
  }
}

.back-link {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0563bb;
  }
}
</style>
