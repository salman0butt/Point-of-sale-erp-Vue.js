import auth from '@/middleware/auth'



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
            name: 'IndexQuotations',
            component: IndexQuotations
        },
        {
            path: 'create',
            name: 'CreateQuotations',
            component: CreateQuotations
        },
        {
            path: 'edit/:id',
            name: 'EditQuotations',
            component: EditQuotations
        },
        {
            path: 'show/:id',
            name: 'ShowQuotations',
            component: ShowQuotations
        }
    ],

};

export default salesRoutes;
