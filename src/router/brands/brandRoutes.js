import auth from '@/middleware/auth'

//Brands
const IndexBrand = () => import('@/views/brands/Index')
const CreateBrand = () => import('@/views/brands/Create')
const EditBrand = () => import('@/views/brands/Edit')

const brandRoutes = {
  path: '/brands',
  redirect: '/brands/index',
  name: 'Brand',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/brands/index',
      name: 'IndexBrand',
      component: IndexBrand,
    },
    {
      path: '/brands/create',
      name: 'CreateBrand',
      component: CreateBrand,
    },
    {
      path: '/brands/edit/:id',
      name: 'EditBrand',
      component: EditBrand
    }
  ]
};

export default brandRoutes;
