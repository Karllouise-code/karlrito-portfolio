import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "./admin/admin_routes";

// Lazy load components to handle missing files better
const Portfolio = () => import("@/components/Portfolio.vue");
const ResumePage = () => import("@/views/ResumePage.vue");
const AllProjects = () => import("@/views/AllProjects.vue");
const AllSkills = () => import("@/views/AllSkills.vue");
const BlogPage = () => import("@/views/BlogPage.vue");
const BlogPost = () => import("@/views/BlogPost.vue");

const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Portfolio",
    component: Portfolio,
    meta: { title: "Karl Louise Rito — Full-Stack Web Developer", description: "Portfolio of Karl Louise Rito, a full-stack web developer specializing in Vue, Laravel, and modern web technologies." },
  },
  {
    path: "/resume",
    name: "ResumePage",
    component: ResumePage,
    meta: { title: "Resume — Karl Louise Rito", description: "Professional resume and experience of Karl Louise Rito, full-stack web developer." },
  },
  {
    path: "/all-projects",
    name: "AllProjects",
    component: AllProjects,
    meta: { title: "All Projects — Karl Rito", description: "Browse all portfolio projects by Karl Louise Rito." },
  },
  {
    path: "/all-skills",
    name: "AllSkills",
    component: AllSkills,
    meta: { title: "All Skills — Karl Rito", description: "Technical skills and competencies of Karl Louise Rito." },
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogPage,
    meta: { title: "Blog — Karl Rito", description: "Technical articles and tutorials by Karl Louise Rito." },
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: BlogPost,
    props: true,
    meta: { title: "Blog Post — Karl Rito", description: "Read technical articles and tutorials." },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "Page Not Found — Karl Rito", description: "The page you're looking for doesn't exist." },
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
