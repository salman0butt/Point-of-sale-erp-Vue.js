import auth from '@/middleware/auth'

// Profile
const Profile = () => import('@/views/profile/Profile')

const profileRoutes =  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    beforeEnter: auth,
};

export default profileRoutes;
