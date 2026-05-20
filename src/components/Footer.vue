<template>
  <footer id="footer" class="footer position-relative light-background">

    <div class="container">
      <div class="copyright text-center">
        <p class="mb-0">© <span>Copyright</span> <span>All Rights Reserved</span></p>
        <div class="admin-link mt-2">
          <router-link to="/admin" class="text-muted text-decoration-none" style="font-size: 0.7rem; opacity: 0.5;">
            <i class="bi bi-lock"></i>
          </router-link>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
