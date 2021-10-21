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


//Job Interview
const IndexJobInterview = () => import('@/views/recruitments/jobInterview/Index');
const CreateJobInterview = () => import('@/views/recruitments/jobInterview/Create');
const EditjobInterview = () => import('@/views/recruitments/jobInterview/Edit');

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
        name: 'IndexJobCategory',
        component: IndexJobCategory
      },
      {
        path: 'jobCategories/create',
        name: 'CreateJobCategory',
        component: CreateJobCategory
      },
      {
        path: 'jobCategories/edit/:id',
        name: 'EditJobCategory',
        component: EditJobCategory
      },
      {
        path: 'jobPosts/index',
        name: 'IndexJobPost',
        component: IndexJobPost
      },
      {
        path: 'jobPosts/create',
        name: 'CreateJobPost',
        component: CreateJobPost
      },
      {
        path: 'jobPosts/edit/:id',
        name: 'EditJobPost',
        component: EditJobPost
      },
      {
        path: 'jobCandidates/index',
        name: 'IndexjobCandidate',
        component: IndexjobCandidate
      },
      {
        path: 'jobCandidates/create',
        name: 'CreatejobCandidate',
        component: CreatejobCandidate
      },
      {
        path: 'jobCandidates/edit/:id',
        name: 'EditjobCandidate',
        component: EditjobCandidate
      },
      {
        path: 'jobInterviewers/index',
        name: 'IndexJobInterviewer',
        component: IndexJobInterviewer
      },
      {
        path: 'jobInterviewers/create',
        name: 'CreateJobInterviewer',
        component: CreateJobInterviewer
      },
      {
        path: 'jobInterviewers/edit/:id',
        name: 'EditjobInterviewer',
        component: EditjobInterviewer
      },
      {
        path: 'jobInterviews/index',
        name: 'IndexJobInterview',
        component: IndexJobInterview
      },
      {
        path: 'jobInterviews/create',
        name: 'CreateJobInterview',
        component: CreateJobInterview
      },
      {
        path: 'jobInterviews/edit/:id',
        name: 'EditjobInterview',
        component: EditjobInterview
      },
    ]
};

export default recruitmentRoutes;
