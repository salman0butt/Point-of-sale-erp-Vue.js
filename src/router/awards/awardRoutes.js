import auth from '@/middleware/auth'

//Award
const IndexAward = () => import('@/views/awards/Index')
const CreateAward = () => import('@/views/awards/Create')
const EditAward = () => import('@/views/awards/Edit')

const awardRoutes =  {
    path: 'awards',
    redirect: '/awards/index',
    name: 'Awards',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexAward',
        component: IndexAward
      },
      {
        path: 'create',
        name: 'CreateAward',
        component: CreateAward
      },
      {
        path: 'edit/:id',
        name: 'EditAward',
        component: EditAward
      }
    ]
};

export default awardRoutes;
