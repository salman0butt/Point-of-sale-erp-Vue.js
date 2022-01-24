import auth from '@/middleware/auth'

//Reports
const ShowReport = () => import('@/views/reports/Show')

const reportRoutes =  {
    path: 'reports',
    redirect: '/reports/index',
    name: 'Reports',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: '/reports/index',
        name: 'All',
        component: ShowReport
      }
    ]
};

export default reportRoutes;
