import auth from '@/middleware/auth'

//Department
const IndexDepartment = () => import('@/views/departments/Index')
const CreateDepartment = () => import('@/views/departments/Create')
const EditDepartment = () => import('@/views/departments/Edit')

const departmentRoutes =  {
    path: 'departments',
    redirect: '/departments/index',
    name: 'Departments',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexDepartment',
        component: IndexDepartment
      },
      {
        path: 'create',
        name: 'CreateDepartment',
        component: CreateDepartment
      },
      {
        path: 'edit/:id',
        name: 'EditDepartment',
        component: EditDepartment
      }
    ]
};

export default departmentRoutes;
