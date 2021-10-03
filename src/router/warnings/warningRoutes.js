import auth from '@/middleware/auth'

//Warning
const IndexWarning = () => import('@/views/warnings/Index')
const CreateWarning = () => import('@/views/warnings/Create')
const EditWarning = () => import('@/views/warnings/Edit')

const warningRoutes =  {
    path: 'warnings',
    redirect: '/warnings/index',
    name: 'Warning',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexWarning',
        component: IndexWarning
      },
      {
        path: 'create',
        name: 'CreateWarning',
        component: CreateWarning
      },
      {
        path: 'edit/:id',
        name: 'EditWarning',
        component: EditWarning
      }
    ]
};

export default warningRoutes;
