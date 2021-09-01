import auth from '@/middleware/auth'

//Employee
const IndexEmployee = () => import('@/views/employees/Index')
const CreateEmployee = () => import('@/views/employees/Create')
const EditEmployee = () => import('@/views/employees/Edit')

const employeeRoutes =  {
    path: 'employees',
    redirect: '/employees/index',
    name: 'Employee',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: IndexEmployee
      },
      {
        path: 'create',
        name: 'Create',
        component: CreateEmployee
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: EditEmployee
      }
    ]
};

export default employeeRoutes;
