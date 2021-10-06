import auth from '@/middleware/auth'


const IndexCustomers = () => import('@/views/customers/index')
const CreateCustomer = () => import('@/views/customers/create')
const EditCustomer = () => import('@/views/customers/edit')


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
        {
            path: 'edit/:id',
            name: 'Edit Customer',
            component: EditCustomer
        }
    ]
};


export default customersRoutes;