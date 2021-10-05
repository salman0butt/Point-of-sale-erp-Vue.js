import auth from '@/middleware/auth'

//TrainingType
const IndexTrainingType = () => import('@/views/trainings/trainingType/Index')
const CreateTrainingType = () => import('@/views/trainings/trainingType/Create');
const EditTrainingType = () => import('@/views/trainings/trainingType/Edit')
const traningTypeRoutes =  {
    path: 'trainingTypes',
    redirect: '/trainingTypes/index',
    name: 'TrainingTypes',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexTrainingType',
        component: IndexTrainingType
      },
      {
        path: 'create',
        name: 'CreateTrainingType',
        component: CreateTrainingType
      },
      {
        path: 'edit/:id',
        name: 'EditTrainingType',
        component: EditTrainingType
      }
    ]
};

export default traningTypeRoutes;
