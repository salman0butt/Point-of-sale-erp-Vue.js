import auth from '@/middleware/auth'


const IndexSupplierGroups = () => import('@/views/contacts/supplierGroups/index')

const CreateSupplierGroups = () => import('@/views/contacts/supplierGroups/create')
const EditSupplierGroups = () => import('@/views/contacts/supplierGroups/edit')

const supplierGroupsRoutes =
{
    path: 'supplierGroups',
    name: 'Index Supplier Groups',
    beforeEnter: auth,
    redirect: '/supplierGroups/index',
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: 'index',
            name: 'IndexSupplierGroups',
            component: IndexSupplierGroups
        },
        {
            path: 'create/:type?',
            name: 'Create Supplier Groups',
            component: CreateSupplierGroups
        },
        {
            path: 'edit/:id',
            name: 'Edit Supplier Groups',
            component: EditSupplierGroups
        },

    ]
};


export default supplierGroupsRoutes;
