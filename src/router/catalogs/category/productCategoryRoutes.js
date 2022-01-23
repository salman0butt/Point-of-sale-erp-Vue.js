import auth from '@/middleware/auth'

//Product Category
const IndexProductCategory = () => import('@/views/catalogs/category/Index')
const CreateProductCategory = () => import('@/views/catalogs/category/CreateOrUpdate')
const EditProductCategory = () => import('@/views/catalogs/category/CreateOrUpdate')

const productCategoryRoutes = {
  path: '/catalogs/category',
  redirect: '/catalogs/category/index',
  name: 'Category',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/catalogs/category/index',
      name: 'All Categories',
      component: IndexProductCategory,
    },
    {
      path: '/catalogs/category/create',
      name: 'Create Category',
      component: CreateProductCategory,
    },
    {
      path: '/catalogs/category/edit/:id',
      name: 'Edit Category',
      component: EditProductCategory
    }
  ]
};

export default productCategoryRoutes;
