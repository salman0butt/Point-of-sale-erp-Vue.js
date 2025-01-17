import auth from '@/middleware/auth'

//Damage
const IndexDamage = () => import('@/views/catalogs/damages/Index')
const CreateDamage = () => import('@/views/catalogs/damages/CreateOrUpdate')
const EditDamage = () => import('@/views/catalogs/damages/CreateOrUpdate')
const ShowDamage = () => import('@/views/catalogs/damages/Show')

const damageRoutes =  {
    path: '/catalogs/damages',
    redirect: '/catalogs/damages/index',
    name: 'Damage',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: '/catalogs/damages/index',
        name: 'All Damage',
        component: IndexDamage
      },
      {
        path: '/catalogs/damages/create',
        name: 'Create Damage',
        component: CreateDamage
      },
      {
        path: '/catalogs/damages/edit/:id',
        name: 'Edit Damage',
        component: EditDamage
      },
      {
        path: '/catalogs/damages/show/:id',
        name: 'Show Damage',
        component: ShowDamage
      }
    ]
};

export default damageRoutes;
