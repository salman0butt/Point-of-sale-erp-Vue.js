import auth from '@/middleware/auth'

//Grade
const IndexSalary = () => import('@/views/hr/salary/Index')
// const CreateGrade = () => import('@/views/grades/Create')
// const EditGrade = () => import('@/views/grades/Edit')

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
        // {
        //     path: 'create',
        //     name: 'CreateGrade',
        //     component: CreateGrade
        // },
        // {
        //     path: 'edit/:id',
        //     name: 'EditGrade',
        //     component: EditGrade
        // }
    ]
};

export default salaryRoutes;
