import auth from '@/middleware/auth'

//Damage
const IndexDamage = () => import('@/views/damages/Index')
const CreateDamage = () => import('@/views/damages/Create')
const EditDamage = () => import('@/views/damages/Edit')

const damageRoutes =  {
    path: 'damages',
    redirect: '/damages/index',
    name: 'Damage',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexDamage',
        component: IndexDamage
      },
      {
        path: 'create',
        name: 'CreateDamage',
        component: CreateDamage
      },
      {
        path: 'edit/:id',
        name: 'EditDamage',
        component: EditDamage
      }
    ]
};

export default damageRoutes;
