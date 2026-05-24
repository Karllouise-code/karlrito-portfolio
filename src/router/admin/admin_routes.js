const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue');
const BlogEditor = () => import('@/views/admin/BlogEditor.vue');
const AdminLogin = () => import('@/views/admin/Login.vue');

const adminRoutes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/editor/:slug?',
    name: 'BlogEditor',
    component: BlogEditor,
    props: true,
    meta: { requiresAuth: true }
  }
];

export default adminRoutes;
