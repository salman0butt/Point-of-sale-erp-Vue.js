import auth from '@/middleware/auth'

//Setting
const Setting = () => import('@/views/settings/Setting')

const settingRoutes =  {
    path: 'settings',
    redirect: '/settings/index',
    name: 'Settings',
    component: {
      render (c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
      {
        path: '/settings/index',
        name: 'IndexSettings',
        component: Setting
      },
    ]
};

export default settingRoutes;
