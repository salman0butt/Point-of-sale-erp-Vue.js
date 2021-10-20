import auth from '@/middleware/auth'

//Salary Payment
const IndexSalaryPayment = () => import('@/views/salaryPayment/Index')
const CreateSalaryPayment = () => import('@/views/salaryPayment/Create')
const EditSalaryPayment = () => import('@/views/salaryPayment/Edit')


const salaryPaymentRoutes = {
    path: 'payments',
    redirect: '/payments/index',
    name: 'SalaryPayment',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'IndexSalaryPayment',
            component: IndexSalaryPayment
        },
        {
            path: 'create',
            name: 'CreateSalaryPayment',
            component: CreateSalaryPayment
        },
        {
            path: 'edit/:id',
            name: 'EditSalaryPayment',
            component: EditSalaryPayment
        }
    ]
};

export default salaryPaymentRoutes;
