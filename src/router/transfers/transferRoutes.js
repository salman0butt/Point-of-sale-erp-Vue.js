import auth from '@/middleware/auth'

//Transfers
const IndexTransfers = () => import('@/views/transfers/Index')
const CreateTransfers = () => import('@/views/transfers/Create')
const EditTransfers = () => import('@/views/transfers/Edit')

const transferRoutes =  {
    path: 'transfers',
    redirect: '/grades/index',
    name: 'Transfers',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexTransfers',
        component: IndexTransfers
      },
      {
        path: 'create',
        name: 'CreateTransfers',
        component: CreateTransfers
      },
      {
        path: 'edit/:id',
        name: 'EditTransfers',
        component: EditTransfers
      }
    ]
};

export default transferRoutes;
