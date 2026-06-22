const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue');
const BlogEditor = () => import('@/views/admin/BlogEditor.vue');
const AdminLogin = () => import('@/views/admin/Login.vue');

const adminRoutes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { title: 'Admin Login — Karl Rito', description: 'Admin panel login.' },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Admin Dashboard — Karl Rito', description: 'Blog management dashboard.', requiresAuth: true }
  },
  {
    path: '/admin/editor/:slug?',
    name: 'BlogEditor',
    component: BlogEditor,
    props: true,
    meta: { title: 'Blog Editor — Karl Rito', description: 'Write and edit blog posts.', requiresAuth: true }
  }
];

export default adminRoutes;
