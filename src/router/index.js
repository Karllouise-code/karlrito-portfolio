import { createRouter, createWebHistory } from "vue-router";

// Lazy load components to handle missing files better
const Portfolio = () => import("@/components/Portfolio.vue");
const PortfolioDetails = () => import("@/components/PortfolioDetails.vue").catch(() => import("@/components/Portfolio.vue"));
const ServiceDetails = () => import("@/components/ServiceDetails.vue").catch(() => import("@/components/Portfolio.vue"));
const ResumePage = () => import("@/views/ResumePage.vue");

const routes = [
  {
    path: "/",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/portfolio-details/:id?",
    name: "PortfolioDetails",
    component: PortfolioDetails,
    props: true,
  },
  {
    path: "/service-details/:id?",
    name: "ServiceDetails",
    component: ServiceDetails,
    props: true,
  },
  {
    path: "/resume",
    name: "ResumePage",
    component: ResumePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

export default router;
