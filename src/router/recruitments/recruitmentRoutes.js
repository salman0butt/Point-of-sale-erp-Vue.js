import auth from '@/middleware/auth'

//JobCategory
const IndexJobCategory = () => import('@/views/recruitments/jobCategory/Index');
const CreateJobCategory = () => import('@/views/recruitments/jobCategory/Create');
const EditJobCategory = () => import('@/views/recruitments/jobCategory/Edit');

const recruitmentRoutes =  {
    path: 'recruitment',
    redirect: '/recruitment/jobCategories/index',
    name: 'Recruitment',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'jobCategories/index',
        name: 'All Job Category',
        component: IndexJobCategory
      },
      {
        path: 'jobCategories/create',
        name: 'Create Job Category',
        component: CreateJobCategory
      },
      {
        path: 'jobCategories/edit/:id',
        name: 'Edit Job Category',
        component: EditJobCategory
      }
    ]
};

export default recruitmentRoutes;
