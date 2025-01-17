import auth from '@/middleware/auth'
import addEmployeeMiddleware from '@/middleware/hr/employees/addEmployeeMiddleware';

//Employee
const IndexEmployee = () => import('@/views/employees/Index')
const CreateEmployee = () => import('@/views/employees/Create')
const EditEmployee = () => import('@/views/employees/Edit')

const employeeRoutes = {
  path: 'employees',

  redirect: '/employees/index',
  name: 'Employees',
  component: {
    render(c) { return c('router-view') }
  },

  beforeEnter: auth,

  children: [
    {
      path: 'index',
      name: 'IndexEmployee',
      component: IndexEmployee,
    },
    {
      path: 'create',
      name: 'CreateEmployee',
      component: CreateEmployee,
      beforeEnter: addEmployeeMiddleware,

    },
    {
      path: 'edit/:id',
      name: 'EditEmployee',
      component: EditEmployee
    }
  ]
};

export default employeeRoutes;
