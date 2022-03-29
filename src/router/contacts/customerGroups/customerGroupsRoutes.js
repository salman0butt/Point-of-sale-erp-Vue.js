import auth from '@/middleware/auth'


const IndexCustomerGroups = () => import('@/views/contacts/customerGroups/index')
const CreateCustomerGroups = () => import('@/views/contacts/customerGroups/create')
const EditCustomerGroups = () => import('@/views/contacts/customerGroups/edit')

const customerGroupsRoutes =
{
    path: 'customerGroups',
    name: 'Index Groups',
    beforeEnter: auth,
    redirect: '/customerGroups/index',
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: 'index',
            name: 'IndexCustomerGroups',
            component: IndexCustomerGroups
        },
        {
            path: 'create/:type?',
            name: 'Create Groups',
            component: CreateCustomerGroups
        },
        {
            path: 'edit/:id',
            name: 'Edit Groups',
            component: EditCustomerGroups
        },

    ]
};


export default customerGroupsRoutes;
