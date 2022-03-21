import auth from '@/middleware/auth'

//Reports
const ShowReport = () => import('@/views/reports/Show')
const ShowOpening = () => import('@/components/reports/opening/ShowOpening')

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
      },
      {
        path: '/reports/opening/:id',
        name: 'Show Opening Report',
        component: ShowOpening
      }
    ]

};

export default reportRoutes;
