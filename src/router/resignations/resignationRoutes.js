import auth from '@/middleware/auth'

//Resignations
const IndexResignations = () => import('@/views/resignations/Index')
const CreateResignations = () => import('@/views/resignations/Create')
const EditResignations = () => import('@/views/resignations/Edit')

const resignationRoutes =  {
    path: 'resignations',
    redirect: '/grades/index',
    name: 'Resignations',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexResignations',
        component: IndexResignations
      },
      {
        path: 'create',
        name: 'CreateResignations',
        component: CreateResignations
      },
      {
        path: 'edit/:id',
        name: 'EditResignations',
        component: EditResignations
      }
    ]
};

export default resignationRoutes;
