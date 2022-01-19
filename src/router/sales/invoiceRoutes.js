import auth from '@/middleware/auth'



//Invoices
const IndexInvoices = () => import('@/views/sales/invoices/Index')
const CreateInvoices = () => import('@/views/sales/invoices/CreateOrUpdate')
const EditInvoices = () => import('@/views/sales/invoices/CreateOrUpdate')



const invoiceRoutes = {
    path: '/sales/invoices',
    redirect: 'sales/invoices/index',
    name: 'Invoices',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'IndexInvoices',
            component: IndexInvoices
        },
        {
            path: 'create',
            name: 'CreateInvoices',
            component: CreateInvoices
        },
        {
            path: 'edit/:id',
            name: 'EditInvoices',
            component: EditInvoices
        }
    ],

};

export default invoiceRoutes;
