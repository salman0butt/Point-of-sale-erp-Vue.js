import auth from '@/middleware/auth'



//Payments
const IndexPayments = () => import('@/views/sales/payments/Index')
// const CreatePayments = () => import('@/views/sales/payments/CreateOrUpdate')
const ShowPayments = () => import('@/views/sales/payments/Show')
// const EditPayments = () => import('@/views/sales/payments/CreateOrUpdate')



const paymentRoutes = {
    path: '/sales/invoice/payments',
    redirect: 'sales/invoice/payments/index',
    name: 'Payments',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'IndexPayments',
            component: IndexPayments
        },
        // {
        //     path: 'create',
        //     name: 'CreatePayments',
        //     component: CreatePayments
        // },
        {
            path: 'show/:id',
            name: 'ShowPayments',
            component: ShowPayments
        },
        // {
        //     path: 'edit/:id',
        //     name: 'EditPayments',
        //     component: EditPayments
        // },
        // {
        //     path: 'reciept/show/:id',
        //     name: 'Reciept',
        //     component: Reciept
        // }
    ],

};

export default paymentRoutes;
