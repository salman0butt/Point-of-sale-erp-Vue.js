import auth from '@/middleware/auth'

//Modifiers
const IndexModifier = () => import('@/views/modifiers/Index')
const CreateModifier = () => import('@/views/modifiers/Create')
const EditModifier = () => import('@/views/modifiers/Edit')

const modifierRoutes = {
  path: '/modifiers',
  redirect: '/modifiers/index',
  name: 'Modifier',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/modifiers/index',
      name: 'All Modifier',
      component: IndexModifier,
    },
    {
      path: '/modifiers/create',
      name: 'Create Modifier',
      component: CreateModifier,
    },
    {
      path: '/modifiers/edit/:id',
      name: 'Edit Modifier',
      component: EditModifier
    }
  ]
};

export default modifierRoutes;
