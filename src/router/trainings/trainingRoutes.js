import auth from '@/middleware/auth'

//Training
const IndexTraining = () => import('@/views/trainings/training/Index')
const CreateTraining = () => import('@/views/trainings/training/Create');
const EditTraining = () => import('@/views/trainings/training/Edit')
const trainingRoutes =  {
    path: 'trainings',
    redirect: '/trainings/index',
    name: 'Trainings',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexTraining',
        component: IndexTraining
      },
      {
        path: 'create',
        name: 'CreateTraining',
        component: CreateTraining
      },
      {
        path: 'edit/:id',
        name: 'EditTraining',
        component: EditTraining
      }
    ]
};

export default trainingRoutes;
