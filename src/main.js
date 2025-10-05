import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import AOS from npm
import AOS from "aos";
import "aos/dist/aos.css";

// Import Bootstrap from npm
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import Typed.js from npm
import Typed from "typed.js";

// Make libraries globally available
window.AOS = AOS;
window.Typed = Typed;

// Try to import vendor files that exist, skip those that don't
const importVendorFile = async (path) => {
  try {
    await import(path);
    console.log(`Successfully loaded: ${path}`);
  } catch (error) {
    console.warn(`Vendor file not found: ${path}`);
  }
};

// Import available vendor files
const loadVendorFiles = async () => {
  const vendorFiles = ["@/assets/vendor/purecounter/purecounter_vanilla.js", "@/assets/vendor/glightbox/js/glightbox.min.js", "@/assets/vendor/isotope-layout/isotope.pkgd.min.js", "@/assets/vendor/swiper/swiper-bundle.min.js", "@/assets/vendor/waypoints/noframework.waypoints.js", "@/assets/js/main.js"];

  await Promise.all(vendorFiles.map((file) => importVendorFile(file)));
};

// Create Vue app
const app = createApp(App);
app.use(router);

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Load vendor files and mount app
loadVendorFiles()
  .then(() => {
    app.mount("#app");
  })
  .catch((error) => {
    console.warn("Some vendor files failed to load:", error);
    app.mount("#app"); // Mount anyway
  });
