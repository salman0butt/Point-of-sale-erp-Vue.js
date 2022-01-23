import auth from '@/middleware/auth'

//Offers
const IndexOffer = () => import('@/views/catalogs/offers/Index')
const CreateOffer = () => import('@/views/catalogs/offers/CreateOrUpdate')
const EditOffer = () => import('@/views/catalogs/offers/CreateOrUpdate')

const offerRoutes = {
  path: '/catalogs/offers',
  redirect: '/catalogs/offers/index',
  name: 'Offer',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: '/catalogs/offers/index',
      name: 'All Offers',
      component: IndexOffer,
    },
    {
      path: '/catalogs/offers/create',
      name: 'Create Offer',
      component: CreateOffer,
    },
    {
      path: '/catalogs/offers/edit/:id',
      name: 'Edit Offer',
      component: EditOffer
    }
  ]
};

export default offerRoutes;
