import auth from '@/middleware/auth'

//Product
const IndexProduct = () => import('@/views/products/Index')
const CreateProduct = () => import('@/views/products/Create')
const EditProduct = () => import('@/views/products/Edit')

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
    }
  ]
};

export default productRoutes;
