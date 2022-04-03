import auth from '@/middleware/auth'

//Receiving
const IndexReceiving = () => import('@/views/receivings/Index')
const CreateReceiving = () => import('@/views/receivings/Create')
const EditReceiving = () => import('@/views/receivings/Edit')
const ShowReceiving = () => import('@/views/receivings/Show')

const receivingRoutes =  {
    path: 'receivings',
    redirect: '/receivings/index',
    name: 'Receiving',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexReceiving',
        component: IndexReceiving
      },
      {
        path: 'create',
        name: 'CreateReceiving',
        component: CreateReceiving
      },
      {
        path: 'edit/:id',
        name: 'EditReceiving',
        component: EditReceiving
      },
      {
        path: 'show/:id',
        name: 'ShowReceiving',
        component: ShowReceiving
      }
    ]
};

export default receivingRoutes;
