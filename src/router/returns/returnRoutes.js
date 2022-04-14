import auth from '@/middleware/auth'

const Return = () => import('@/views/returns/Return')
const Exchange = () => import('@/views/returns/Exchange')
const CreateOrUpdateExchange = () => import('@/views/exchanges/CreateOrUpdate')
const IndexReturn = () => import('@/views/returns/Index')
const IndexExchange = () => import('@/views/exchanges/Index')


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
      path: '/exchanges/index',
      name: 'IndexExchange',
      component: IndexExchange,
    },
    {
      path: '/returns/add/:id',
      name: 'Invoice Return',
      component: Exchange,
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
  ]
};

export default returnRoutes;
