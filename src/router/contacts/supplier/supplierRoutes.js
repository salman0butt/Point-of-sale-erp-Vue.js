import auth from '@/middleware/auth'


const IndexSupplier = () => import('@/views/contacts/supplier/index')
const CreateSupplier = () => import('@/views/contacts/supplier/create')
const EditSupplier = () => import('@/views/contacts/supplier/edit')


const supplierRoutes =
{
    path: 'supplier',
    name: 'Supplier',
    redirect: '/supplier/index',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'Index Supplier',
            component: IndexSupplier
        },
        {
            path: 'create',
            name: 'Create Supplier',
            component: CreateSupplier
        },
        {
            path: 'edit/:id',
            name: 'Edit Supplier',
            component: EditSupplier
        }
    ]
};


export default supplierRoutes;
