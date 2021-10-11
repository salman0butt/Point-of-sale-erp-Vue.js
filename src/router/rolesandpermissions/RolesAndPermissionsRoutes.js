import auth from '@/middleware/auth'

//Accounts
const IndexRoles = () => import('@/views/rolesandpermissions/Index')
const CreateRole = () => import('@/views/rolesandpermissions/Role')
const EditRole = () => import('@/views/rolesandpermissions/Role')

// Payment Methods
// const IndexPaymentMethods = () => import('@/views/accounting/paymentMethods/index')
// const CreatePaymentMethods = () => import('@/views/accounting/paymentMethods/create')
// const EditpaymentMethod = () => import('@/views/accounting/paymentMethods/edit')




const rolesAndPermissionsRoutes =
{
    path: 'rolesandpermissions/',
    redirect: 'rolesandpermissions/roles/index',
    name: 'rolesandpermissions',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'roles/index',
            name: 'Index Roles',
            component: IndexRoles,
        },
        {
            path: 'roles/create',
            name: 'Create Role',
            component: CreateRole,
        },
        {
            path: 'roles/:id',
            name: 'Edit Role',
            component: EditRole,
        },
        // {
        //     path: 'paymentMethods/index',
        //     name: 'Index PaymentMethods',
        //     component: IndexPaymentMethods,
        // },
        // {
        //     path: 'paymentMethods/create',
        //     name: 'Create PaymentMethods',
        //     component: CreatePaymentMethods,
        // },
        // {
        //     path: 'paymentMethods/:id',
        //     name: 'Edit paymentMethod',
        //     component: EditpaymentMethod,
        // },


    ]
};

export default rolesAndPermissionsRoutes;
