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

app.mount("#app");
