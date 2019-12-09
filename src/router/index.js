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
      path: '/experimental',
      name: 'experimental',
      component: () => import('@/views/ExperimentalClass.vue')
    },
    {
      path: '/admins',
      component: () => import('@/views/Admins.vue'),
      children: [
        {
          path: '/',
          name: 'admin.list',
          component: () => import('@/components/adminComponents/list.vue')
        },
        {
          path: '/create',
          name: 'admin.create',
          component: () => import('@/components/adminComponents/create.vue')
        },
        {
          path: '/edit/:id',
          name: 'admin.edit',
          component: () => import('@/components/adminComponents/edit.vue')
        },
        { path: '*', redirect: '/' }
      ]
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: () => import('@/views/Teacher.vue')
    },
    {
      path: '/teachers/create',
      name: 'teacher.create',
      component: () => import('@/components/teacherComponents/create.vue')
    },
    {
      path: '/teachers/schedule',
      name: 'teacher.schedule',
      component: () => import('@/components/teacherComponents/schedule.vue')
    },
    {
      path: '/teachers/edit/:id',
      name: 'teacher.edit',
      component: () => import('@/components/teacherComponents/edit.vue')
    },
    {
      path: '/teachers/activities/:id',
      name: 'teacher.activities',
      component: () => import('@/views/Activities.vue')
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
      path: '/students/register/:id',
      name: 'student.register',
      component: () => import('@/components/studentComponents/registration.vue')
    },
    {
      path: '/evaliation/:id',
      name: 'evaliation',
      component: () => import('@/views/Evaliations.vue'),
      children: [
        {
          path: '/evaliation/anthropometric/:id',
          name: 'evaliation.anthropometric',
          component: () =>
            import(
              '@/components/evaliationComponents/includes/anthropometric.vue'
            )
        }
      ]
    },
    {
      path: '/payments/:id/:type',
      name: 'payment',
      component: () => import('@/views/Payments.vue')
    },
    {
      path: '/contas',
      name: 'expenses',
      component: () => import('@/views/Expenses.vue'),
      children: [
        {
          path: '/fixas',
          name: 'contas.fixed',
          component: () =>
            import('@/components/expensesComponents/includes/fixed.vue')
        },
        {
          path: '/extras',
          name: 'contas.extras',
          component: () =>
            import('@/components/expensesComponents/includes/extras.vue')
        },
        {
          path: '/variables',
          name: 'contas.variables',
          component: () =>
            import('@/components/expensesComponents/includes/variables.vue')
        },
        {
          path: '/show',
          name: 'contas.show',
          component: () => import('@/components/expensesComponents/list.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        let token = window.localStorage.getItem('_token');
        if (!token) {
          alert('Sem permissão');
          next('/');
        } else next();
      },
      children: [
        {
          path: '/',
          name: 'dashboard.home',
          component: () =>
            import('@/components/dashboardComponents/includes/home.vue')
        },
        {
          path: '/schedule',
          name: 'dashboard.schedule',
          component: () =>
            import('@/components/dashboardComponents/includes/schedule.vue')
        },
        {
          path: '/experimental',
          name: 'dashboard.experimental',
          component: () =>
            import('@/components/dashboardComponents/includes/experimental.vue')
        },
        {
          path: '/kaizen',
          name: 'dashboard.kaizen',
          component: () =>
            import('@/components/dashboardComponents/includes/kaizen.vue')
        },
        {
          path: '/teacher',
          name: 'dashboard.teacher',
          component: () =>
            import('@/components/dashboardComponents/includes/teachers.vue')
        },
        {
          path: '/comission',
          name: 'dashboard.comission',
          component: () =>
            import('@/components/dashboardComponents/includes/comission.vue')
        },
        {
          path: '/student',
          name: 'dashboard.student',
          component: () =>
            import('@/components/dashboardComponents/includes/students.vue')
        },
        {
          path: '/register',
          name: 'dashboard.register',
          component: () =>
            import('@/components/dashboardComponents/includes/register.vue')
        },
        {
          path: '/budgets',
          name: 'dashboard.budgets',
          component: () =>
            import('@/components/dashboardComponents/includes/budgets.vue')
        },
        {
          path: '/admims',
          name: 'dashboard.admims',
          component: () =>
            import('@/components/dashboardComponents/includes/admims.vue')
        },
        {
          path: '*',
          redirect: '/home'
        }
      ]
    },
    /*
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
