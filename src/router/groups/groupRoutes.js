import auth from '@/middleware/auth'


const IndexGroups = () => import('@/views/groups/index')
const CreateGroups = () => import('@/views/groups/create')
const EditGroups = () => import('@/views/groups/edit')

const groupRoutes =
{
    path: 'groups',
    name: 'Index Groups',
    beforeEnter: auth,
    redirect: '/groups/index',
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: 'index',
            name: 'IndexGroups',
            component: IndexGroups
        },
        {
            path: 'create',
            name: 'Create Groups',
            component: CreateGroups
        },
        {
            path: 'edit/:id',
            name: 'Edit Groups',
            component: EditGroups
        },

    ]
};


export default groupRoutes;
