import auth from '@/middleware/auth'

//Job Category
const IndexJobCategory = () => import('@/views/recruitments/jobCategory/Index');
const CreateJobCategory = () => import('@/views/recruitments/jobCategory/Create');
const EditJobCategory = () => import('@/views/recruitments/jobCategory/Edit');

//Job Post
const IndexJobPost = () => import('@/views/recruitments/jobPost/Index');
const CreateJobPost = () => import('@/views/recruitments/jobPost/Create');
const EditJobPost = () => import('@/views/recruitments/jobPost/Edit');

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
      },
      {
        path: 'jobPosts/index',
        name: 'All Job Post',
        component: IndexJobPost
      },
      {
        path: 'jobPosts/create',
        name: 'Create Job Post',
        component: CreateJobPost
      },
      {
        path: 'jobPosts/edit/:id',
        name: 'Edit Job Post',
        component: EditJobPost
      }
    ]
};

export default recruitmentRoutes;
