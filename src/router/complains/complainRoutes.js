import auth from '@/middleware/auth'

//Complain
const IndexComplain = () => import('@/views/complains/Index')
const CreateComplain = () => import('@/views/complains/Create')
const EditComplain = () => import('@/views/complains/Edit')

const complainRoutes =  {
    path: 'complains',
    redirect: '/complains/index',
    name: 'Complain',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexComplain',
        component: IndexComplain
      },
      {
        path: 'create',
        name: 'CreateComplain',
        component: CreateComplain
      },
      {
        path: 'edit/:id',
        name: 'EditComplain',
        component: EditComplain
      }
    ]
};

export default complainRoutes;
