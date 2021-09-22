import auth from '@/middleware/auth'

//Asset
const IndexAsset = () => import('@/views/assets/Index')
const CreateAsset = () => import('@/views/assets/Create')
const EditAsset = () => import('@/views/assets/Edit')

const assetRoutes =  {
    path: 'assets',
    redirect: '/assets/index',
    name: 'Assets',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexAsset',
        component: IndexAsset
      },
      {
        path: 'create',
        name: 'CreateAsset',
        component: CreateAsset
      },
      {
        path: 'edit/:id',
        name: 'EditAsset',
        component: EditAsset
      }
    ]
};

export default assetRoutes;
