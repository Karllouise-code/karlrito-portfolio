const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue');
const BlogEditor = () => import('@/views/admin/BlogEditor.vue');

const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/editor/:slug?',
    name: 'BlogEditor',
    component: BlogEditor,
    props: true,
  }
];

export default adminRoutes;
