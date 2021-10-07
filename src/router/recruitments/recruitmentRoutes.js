import auth from '@/middleware/auth'

//Job Category
const IndexJobCategory = () => import('@/views/recruitments/jobCategory/Index');
const CreateJobCategory = () => import('@/views/recruitments/jobCategory/Create');
const EditJobCategory = () => import('@/views/recruitments/jobCategory/Edit');

//Job Post
const IndexJobPost = () => import('@/views/recruitments/jobPost/Index');
const CreateJobPost = () => import('@/views/recruitments/jobPost/Create');
const EditJobPost = () => import('@/views/recruitments/jobPost/Edit');

//Job Post
const IndexjobCandidate = () => import('@/views/recruitments/jobCandidates/Index');
const CreatejobCandidate = () => import('@/views/recruitments/jobCandidates/Create');
const EditjobCandidate = () => import('@/views/recruitments/jobCandidates/Edit');

//Job Interviewer
const IndexJobInterviewer = () => import('@/views/recruitments/jobInterviewer/Index');
const CreateJobInterviewer = () => import('@/views/recruitments/jobInterviewer/Create');
const EditjobInterviewer = () => import('@/views/recruitments/jobInterviewer/Edit');

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
      },
      {
        path: 'jobCandidates/index',
        name: 'All Job Candidates',
        component: IndexjobCandidate
      },
      {
        path: 'jobCandidates/create',
        name: 'Create Job Candidates',
        component: CreatejobCandidate
      },
      {
        path: 'jobCandidates/edit/:id',
        name: 'Edit Job Candidates',
        component: EditjobCandidate
      },
      {
        path: 'jobInterviewers/index',
        name: 'All Job Interviewer',
        component: IndexJobInterviewer
      },
      {
        path: 'jobInterviewers/create',
        name: 'Create Job Interviewer',
        component: CreateJobInterviewer
      },
      {
        path: 'jobInterviewers/edit/:id',
        name: 'Edit Job Interviewer',
        component: EditjobInterviewer
      },
    ]
};

export default recruitmentRoutes;
