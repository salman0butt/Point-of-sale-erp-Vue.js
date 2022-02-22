import auth from '@/middleware/auth'



//Invoices
const IndexInvoices = () => import('@/views/sales/invoices/Index')
const CreateInvoices = () => import('@/views/sales/invoices/CreateOrUpdate')
const ShowInvoices = () => import('@/views/sales/invoices/Show')
const EditInvoices = () => import('@/views/sales/invoices/CreateOrUpdate')
const Reciept = () => import('@/views/sales/invoices/Reciept')



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
            path: 'show/:id',
            name: 'ShowInvoices',
            component: ShowInvoices
        },
        {
            path: 'edit/:id',
            name: 'EditInvoices',
            component: EditInvoices
        },
        {
            path: 'reciept/show/:id',
            name: 'Reciept',
            component: Reciept
        }
    ],

};

export default invoiceRoutes;
