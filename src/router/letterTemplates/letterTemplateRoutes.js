import auth from '@/middleware/auth'

//LetterTemplate
const IndexLetterTemplate = () => import('@/views/letterTemplates/Index')
const CreateLetterTemplate = () => import('@/views/letterTemplates/Create')
const EditLetterTemplate = () => import('@/views/letterTemplates/Edit')

const letterTemplateRoutes =  {
    path: 'letterTemplates',
    redirect: '/letterTemplates/index',
    name: 'LetterTemplate',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexLetterTemplate',
        component: IndexLetterTemplate
      },
      {
        path: 'create',
        name: 'CreateLetterTemplate',
        component: CreateLetterTemplate
      },
      {
        path: 'edit/:id',
        name: 'EditLetterTemplate',
        component: EditLetterTemplate
      }
    ]
};

export default letterTemplateRoutes;
