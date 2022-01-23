import auth from '@/middleware/auth'

//catalogs/brands
const IndexBrand = () => import('@/views/catalogs/brands/Index')
const CreateBrand = () => import('@/views/catalogs/brands/CreateOrUpdate')
const EditBrand = () => import('@/views/catalogs/brands/CreateOrUpdate')

const brandRoutes = {
  path: '/catalogs/brands',
  redirect: '/catalogs/brands/index',
  name: 'Brand',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/catalogs/brands/index',
      name: 'All Brands',
      component: IndexBrand,
    },
    {
      path: '/catalogs/brands/create',
      name: 'Create Brand',
      component: CreateBrand,
    },
    {
      path: '/catalogs/brands/edit/:id',
      name: 'Edit Brand',
      component: EditBrand
    }
  ]
};

export default brandRoutes;
