import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('@/views/Admins.vue')
    },
    {
      path: '/admins/create',
      name: 'admin.create',
      component: () => import('@/components/adminComponents/create.vue')
    },    
    {
      path: '/admins/edit/:id',
      name: 'admin.edit',
      component: () => import('@/components/adminComponents/edit.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('@/views/Students.vue')
    },
    {
      path: '/students/create',
      name: 'student.create',
      component: () => import('@/components/studentComponents/create.vue')
    },
    {
      path: '/students/edit/:id',
      name: 'student.edit',
      component: () => import('@/components/studentComponents/edit.vue')
    },
    {
      path: '/payments/:id/:type',
      name: 'payment',
      component: () => import('@/views/Payments.vue')
    },
    /*
  
    {
      path: '/contas',
      component: () => import('@/views/Expenses.vue'),
      children: [
        {
          path: 'fixed',
          name: 'expenses.fixed',
          component: () => import('@/components/expensesComponents/fixed.vue')
        },
        {
          path: 'variable',
          name: 'expenses.variable',
          component: () =>
            import('@/components/expensesComponents/variable.vue')
        },
        {
          path: 'extra',
          name: 'expenses.extra',
          component: () => import('@/components/expensesComponents/extra.vue')
        },
        {
          path: '/',
          redirect: 'fixed'
        }
      ]
    },
    {
      path: '/payments/:id/:type',
      name: 'payment',
      component: () => import('@/views/Payments.vue')
    },
    {
      path: '/relatorios',
      name: 'summary',
      component: () => import('@/views/Summary.vue')
    },
    {
      path: '/contabil',
      name: 'contabil',
      component: () => import('@/views/Contabil.vue')
    },*/
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;
