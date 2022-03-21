import auth from '@/middleware/auth'
import addProductMiddleware from '@/middleware/sales/addProductMiddleware'





//Quotations
const IndexQuotations = () => import('@/views/sales/quotations/Index')
const CreateQuotations = () => import('@/views/sales/quotations/CreateOrUpdate')
const EditQuotations = () => import('@/views/sales/quotations/CreateOrUpdate')
const ShowQuotations = () => import('@/views/sales/quotations/Show')



const salesRoutes = {
    path: '/sales/quotations',
    redirect: 'sales/quotations/index',
    name: 'Quotations',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'Index Quotations',
            component: IndexQuotations
        },
        {
            path: 'create',
            name: 'Create Quotations',
            component: CreateQuotations,
            beforeEnter: addProductMiddleware

        },
        {
            path: 'edit/:id',
            name: 'EditQuotations',
            component: EditQuotations
        },
        {
            path: 'show/:id',
            name: 'Show Quotations',
            component: ShowQuotations
        }
    ],

};

export default salesRoutes;
