import auth from '@/middleware/auth'

//Product
const IndexProduct = () => import('@/views/products/product/Index')
const CreateProduct = () => import('@/views/products/product/Create')
const EditProduct = () => import('@/views/products/product/Edit')
const ImportProduct = () => import('@/views/products/product/ImportProduct')

const productRoutes = {
  path: 'products',
  redirect: '/products/index',
  name: 'Products',
  component: {
    render(c) { return c('router-view') }
  },

  beforeEnter: auth,

  children: [
    {
      path: 'index',
      name: 'IndexProduct',
      component: IndexProduct,
    },
    {
      path: 'create',
      name: 'CreateProduct',
      component: CreateProduct,
    },
    {
      path: 'edit/:id',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: 'import',
      name: 'ImportProduct',
      component: ImportProduct
    }
  ]
};

export default productRoutes;
