import auth from '@/middleware/auth'

//Trainer
const IndexTrainer = () => import('@/views/trainings/trainer/Index')
const CreateTrainer = () => import('@/views/trainings/trainer/Create');
const EditTrainer = () => import('@/views/trainings/trainer/Edit')
const trainerRoutes =  {
    path: 'trainers',
    redirect: '/trainers/index',
    name: 'Trainers',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: 'index',
        name: 'IndexTrainer',
        component: IndexTrainer
      },
      {
        path: 'create',
        name: 'CreateTrainer',
        component: CreateTrainer
      },
      {
        path: 'edit/:id',
        name: 'EditTrainer',
        component: EditTrainer
      }
    ]
};

export default trainerRoutes;
