import auth from '@/middleware/auth'

//Accounts
const IndexAccounts = () => import('@/views/accounting/accounts/index')
const CreateAccount = () => import('@/views/accounting/accounts/create')
const EditAccount = () => import('@/views/accounting/accounts/edit')

// Payment Methods
const IndexPaymentMethods = () => import('@/views/accounting/paymentMethods/index')
const CreatePaymentMethods = () => import('@/views/accounting/paymentMethods/create')
const EditpaymentMethod = () => import('@/views/accounting/paymentMethods/edit')




const accountingRoutes =
{
    path: 'accounting/',
    redirect: 'accounting/accounts/index',
    name: 'Accounting',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'accounts/index',
            name: 'Accounts',
            component: IndexAccounts,
        },
        {
            path: 'accounts/create',
            name: 'Create Account',
            component: CreateAccount,
        },
        {
            path: 'accounts/:id',
            name: 'Edit Account',
            component: EditAccount,
        },
        {
            path: 'paymentMethods/index',
            name: 'Index PaymentMethods',
            component: IndexPaymentMethods,
        },
        {
            path: 'paymentMethods/create',
            name: 'Create PaymentMethods',
            component: CreatePaymentMethods,
        },
        {
            path: 'paymentMethods/:id',
            name: 'Edit paymentMethod',
            component: EditpaymentMethod,
        },


    ]
};

export default accountingRoutes;
