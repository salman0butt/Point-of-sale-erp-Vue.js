import auth from '@/middleware/auth'

//Product Category
const IndexProductCategory = () => import('@/views/products/category/Index')
const CreateProductCategory = () => import('@/views/products/category/Create')
const EditProductCategory = () => import('@/views/products/category/Edit')

const productCategoryRoutes = {
  path: '/product',
  redirect: '/product/category/index',
  name: 'ProductsCategory',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/product/category/index',
      name: 'IndexProductCategory',
      component: IndexProductCategory,
    },
    {
      path: '/product/category/create',
      name: 'CreateProductCategory',
      component: CreateProductCategory,
    },
    {
      path: '/product/category/edit/:id',
      name: 'EditProductCategory',
      component: EditProductCategory
    }
  ]
};

export default productCategoryRoutes;
