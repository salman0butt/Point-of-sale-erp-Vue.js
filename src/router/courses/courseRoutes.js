import auth from '@/middleware/auth'

//Course
const IndexCourse = () => import('@/views/courses/Index')
const CreateCourse = () => import('@/views/courses/Create')
const EditCourse = () => import('@/views/courses/Edit')

const courseRoutes =  {
    path: 'courses',
    redirect: '/courses/index',
    name: 'Course',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexCourse',
        component: IndexCourse
      },
      {
        path: 'create',
        name: 'CreateCourse',
        component: CreateCourse
      },
      {
        path: 'edit/:id',
        name: 'EditCourse',
        component: EditCourse
      }
    ]
};

export default courseRoutes;
