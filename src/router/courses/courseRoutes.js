import auth from '@/middleware/auth'

//Courses
const IndexCourses = () => import('@/views/courses/Index')
const CreateCourses = () => import('@/views/courses/Create')
const EditCourses = () => import('@/views/courses/Edit')

const courseRoutes =  {
    path: 'courses',
    redirect: '/grades/index',
    name: 'Courses',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexCourses',
        component: IndexCourses
      },
      {
        path: 'create',
        name: 'CreateCourses',
        component: CreateCourses
      },
      {
        path: 'edit/:id',
        name: 'EditCourses',
        component: EditCourses
      }
    ]
};

export default courseRoutes;
