import auth from '@/middleware/auth'

//Leave
const IndexLeave = () => import('@/views/leaves/Index')
const CreateLeave = () => import('@/views/leaves/Create')
const EditLeave = () => import('@/views/leaves/Edit')

const leaveRoutes =  {
    path: 'leaves',
    redirect: '/leaves/index',
    name: 'Leave',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexLeave',
        component: IndexLeave
      },
      {
        path: 'create',
        name: 'CreateLeave',
        component: CreateLeave
      },
      {
        path: 'edit/:id',
        name: 'EditLeave',
        component: EditLeave
      }
    ]
};

export default leaveRoutes;
