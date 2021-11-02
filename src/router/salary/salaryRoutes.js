import auth from '@/middleware/auth'

//Salary
// const IndexSalary = () => import('@/views/hr/salary/Index')
const IndexSalary = () => import('@/views/salary/Index')
const CreateSalary = () => import('@/views/salary/Create')
const EditSalary = () => import('@/views/salary/Edit')
const ShowSalary = () => import('@/views/salary/Show')


const salaryRoutes = {
    path: 'salary',
    redirect: '/salary/index',
    name: 'Salary',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'IndexSalary',
            component: IndexSalary
        },
        {
            path: 'create',
            name: 'CreateSalary',
            component: CreateSalary
        },
        {
            path: 'edit/:id',
            name: 'EditSalary',
            component: EditSalary
        },
        {
            path: 'show/:id',
            name: 'ShowSalary',
            component: ShowSalary
        }
    ]
};

export default salaryRoutes;
