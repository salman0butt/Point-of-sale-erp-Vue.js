import auth from '@/middleware/auth'

const Return = () => import('@/views/returns/Return')
const Exchange = () => import('@/views/returns/Exchange')
const ShowReturn = () => import('@/views/returns/Show')
const ReceiptReturn = () => import('@/views/returns/Receipt')
const CreateOrUpdateExchange = () => import('@/views/exchanges/CreateOrUpdate')
const IndexReturn = () => import('@/views/returns/Index')
const IndexExchange = () => import('@/views/exchanges/Index')
const ShowExchange = () => import('@/views/exchanges/Show')
const ReceiptExchange = () => import('@/views/exchanges/Receipt')


const returnRoutes = {
  path: '/returns',
  redirect: '/returns/index',
  name: 'Returns',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/returns/index',
      name: 'IndexReturn',
      component: IndexReturn,
    },
    {
      path: '/returns/create',
      name: 'Return',
      component: Return,
    },
    {
      path: '/returns/add/:id',
      name: 'Invoice Return',
      component: Exchange,
    },
    {
      path: '/returns/show/:id',
      name: 'Show Return',
      component: ShowReturn,
    },
    {
      path: '/returns/payment/reciept/show/:id',
      name: 'Receipt Return',
      component: ReceiptReturn,
    },
    {
      path: '/exchanges/index',
      name: 'IndexExchange',
      component: IndexExchange,
    },
    {
      path: '/exchange/new/:id/:invoice_id?',
      name: 'New Exchange',
      component: CreateOrUpdateExchange,
    },
    {
      path: '/exchange/edit/:editId',
      name: 'Edit Exchange',
      component: CreateOrUpdateExchange,
    },
    {
      path: '/exchange/show/:id',
      name: 'Show Exchange',
      component: ShowExchange,
    },
    {
      path: '/exchange/payment/reciept/show/:id',
      name: 'Receipt Exchange',
      component: ReceiptExchange,
    },
  ]
};

export default returnRoutes;
