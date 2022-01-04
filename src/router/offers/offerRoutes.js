import auth from '@/middleware/auth'

//Offers
const IndexOffer = () => import('@/views/offers/Index')
const CreateOffer = () => import('@/views/offers/Create')
const EditOffer = () => import('@/views/offers/Edit')

const offerRoutes = {
  path: '/offers',
  redirect: '/offers/index',
  name: 'Offer',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/offers/index',
      name: 'IndexOffer',
      component: IndexOffer,
    },
    {
      path: '/offers/create',
      name: 'CreateOffer',
      component: CreateOffer,
    },
    {
      path: '/offers/edit/:id',
      name: 'EditOffer',
      component: EditOffer
    }
  ]
};

export default offerRoutes;
