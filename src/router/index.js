import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "./admin/admin_routes";

// Lazy load components to handle missing files better
const Portfolio = () => import("@/components/Portfolio.vue");
const PortfolioDetails = () => import("@/components/PortfolioDetails.vue").catch(() => import("@/components/Portfolio.vue"));
const ServiceDetails = () => import("@/components/ServiceDetails.vue").catch(() => import("@/components/Portfolio.vue"));
const ResumePage = () => import("@/views/ResumePage.vue");
const AllProjects = () => import("@/views/AllProjects.vue");
const AllSkills = () => import("@/views/AllSkills.vue");
const BlogPage = () => import("@/views/BlogPage.vue");
const BlogPost = () => import("@/views/BlogPost.vue");

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
  {
    path: "/all-projects",
    name: "AllProjects",
    component: AllProjects,
  },
  {
    path: "/all-skills",
    name: "AllSkills",
    component: AllSkills,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogPage,
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: BlogPost,
    props: true,
  },
  ...adminRoutes,
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('admin_auth') === 'true';
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/admin/login');
  } else {
    next();
  }
});

export default router;
