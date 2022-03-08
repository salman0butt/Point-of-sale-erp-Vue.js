import auth from '@/middleware/auth'

const Return = () => import('@/views/returns/Return')
const Exchange = () => import('@/views/returns/Exchange')
// const CreateBrand = () => import('@/views/catalogs/brands/CreateOrUpdate')
// const EditBrand = () => import('@/views/catalogs/brands/CreateOrUpdate')

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
      name: 'Return',
      component: Return,
    },
    {
      path: '/returns/add/:id',
      name: 'New Return',
      component: Exchange,
    },
    // {
    //   path: '/catalogs/brands/edit/:id',
    //   name: 'Edit Brand',
    //   component: EditBrand
    // }
  ]
};

export default returnRoutes;
