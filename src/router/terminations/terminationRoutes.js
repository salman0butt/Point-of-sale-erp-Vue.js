import auth from '@/middleware/auth'

//Termination
const IndexTermination = () => import('@/views/terminations/Index')
const CreateTermination = () => import('@/views/terminations/Create')
const EditTermination = () => import('@/views/terminations/Edit')

const terminationRoutes =  {
    path: 'terminations',
    redirect: '/grades/index',
    name: 'Terminations',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: IndexTermination
      },
      {
        path: 'create',
        name: 'Create',
        component: CreateTermination
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: EditTermination
      }
    ]
};

export default terminationRoutes;
