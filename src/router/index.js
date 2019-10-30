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
      path: '/students/avaliation/:id',
      name: 'student.avaliation',
      component: () => import('@/components/studentComponents/avaliation.vue')
    },
    {
      path: '/students/avaliation/params',
      name: 'student.avaliation.params',
      component: () =>
        import('@/components/studentComponents/avaliationResult.vue')
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
      path: '/config',
      name: 'config',
      component: () => import('@/views/SystemConfig.vue'),
      children: [
        {
          path: '/home',
          name: 'config.home',
          component: () =>
            import('@/components/configComponents/includes/home.vue')
        },
        {
          path: '/schedule',
          name: 'config.schedule',
          component: () =>
            import('@/components/configComponents/includes/schedule.vue')
        },
        {
          path: '/experimental',
          name: 'config.experimental',
          component: () =>
            import('@/components/configComponents/includes/experimental.vue')
        },
        {
          path: '/kaizen',
          name: 'config.kaizen',
          component: () =>
            import('@/components/configComponents/includes/kaizen.vue')
        },
        {
          path: '/teacher',
          name: 'config.teacher',
          component: () =>
            import('@/components/configComponents/includes/teachers.vue')
        },
        {
          path: '/comission',
          name: 'config.comission',
          component: () =>
            import('@/components/configComponents/includes/comission.vue')
        },
        {
          path: '/student',
          name: 'config.student',
          component: () =>
            import('@/components/configComponents/includes/students.vue')
        },
        {
          path: '/admims',
          name: 'config.admims',
          component: () =>
            import('@/components/configComponents/includes/admims.vue')
        },
        {
          path: '',
          redirect: '/home'
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
