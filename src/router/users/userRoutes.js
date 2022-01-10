import auth from '@/middleware/auth'

//Users
const IndexUser = () => import('@/views/users/Index')
const CreateUser = () => import('@/views/users/Create')
const EditUser = () => import('@/views/users/Edit')

const userRoutes = {
  path: '/users',
  redirect: '/users/index',
  name: 'Users',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/users/index',
      name: 'All Users',
      component: IndexUser,
    },
    {
      path: '/users/create',
      name: 'Create User',
      component: CreateUser,
    },
    {
      path: '/users/edit/:id',
      name: 'Edit User',
      component: EditUser
    }
  ]
};

export default userRoutes;
