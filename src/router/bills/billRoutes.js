import auth from '@/middleware/auth'

//Bill
const IndexBill = () => import('@/views/bills/Index')
const CreateBill = () => import('@/views/bills/Create')
const EditBill = () => import('@/views/bills/Edit')

const billRoutes =  {
    path: 'bills',
    redirect: '/bills/index',
    name: 'Bill',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexBill',
        component: IndexBill
      },
      {
        path: 'create',
        name: 'CreateBill',
        component: CreateBill
      },
      {
        path: 'edit/:id',
        name: 'EditBill',
        component: EditBill
      }
    ]
};

export default billRoutes;
