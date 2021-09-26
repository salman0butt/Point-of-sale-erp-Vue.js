import auth from '@/middleware/auth'

//Grade
const IndexGrade = () => import('@/views/grades/Index')
const CreateGrade = () => import('@/views/grades/Create')
const EditGrade = () => import('@/views/grades/Edit')

const gradeRoutes =  {
    path: 'grades',
    redirect: '/grades/index',
    name: 'Grades',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexGrade',
        component: IndexGrade
      },
      {
        path: 'create',
        name: 'CreateGrade',
        component: CreateGrade
      },
      {
        path: 'edit/:id',
        name: 'EditGrade',
        component: EditGrade
      }
    ]
};

export default gradeRoutes;
