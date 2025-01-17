import auth from '@/middleware/auth'

//Purchase
const IndexPurchase = () => import('@/views/accounting/purchaseOrder/Index')
const CreatePurchase = () => import('@/views/accounting/purchaseOrder/CreateOrUpdate')
const ShowPurchase = () => import('@/views/accounting/purchaseOrder/Show')

const purchaseOrderRoutes =  {
    path: 'purchases',
    redirect: '/purchases/index',
    name: 'Purchases',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'All Purchase',
        component: IndexPurchase
      },
      {
        path: 'create',
        name: 'Create Purchase',
        component: CreatePurchase
      },
      {
        path: 'edit/:id',
        name: 'Edit Purchase',
        component: CreatePurchase
      },
      {
        path: 'show/:id',
        name: 'Show Purchase',
        component: ShowPurchase
      }
    ]
};

export default purchaseOrderRoutes;
