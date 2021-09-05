import auth from '@/middleware/auth'

//Designation
const IndexDesignation = () => import('@/views/designations/Index')
const CreateDesignation = () => import('@/views/designations/Create')
const EditDesignation = () => import('@/views/designations/Edit')

const designationRoutes =  {
    path: 'designations',
    redirect: '/designations/index',
    name: 'Designations',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexDesignation',
        component: IndexDesignation
      },
      {
        path: 'create',
        name: 'CreateDesignation',
        component: CreateDesignation
      },
      {
        path: 'edit/:id',
        name: 'EditDesignation',
        component: EditDesignation
      }
    ]
};

export default designationRoutes;
