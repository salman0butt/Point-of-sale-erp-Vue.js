import auth from '@/middleware/auth'


const IndexCustomers = () => import('@/views/contacts/customers/index')
const CreateCustomer = () => import('@/views/contacts/customers/create')
const EditCustomer = () => import('@/views/contacts/customers/edit')
// const QuickAddCustomer = () => import('@/views/contacts/customers/QuickAddCustomer')


const customersRoutes =
{
    path: 'customers',
    name: 'Customers',
    redirect: '/customers/index',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'Index Customers',
            component: IndexCustomers
        },
        {
            path: 'create',
            name: 'Create Customer',
            component: CreateCustomer
        },
        // {
        //     path: 'quick-add',
        //     name: 'Qick Add Customer',
        //     component: QuickAddCustomer
        // },
        {
            path: 'edit/:id',
            name: 'Edit Customer',
            component: EditCustomer
        }
    ]
};


export default customersRoutes;
