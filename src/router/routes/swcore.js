export default [
  {
    path: '/swcore/merchant',
    name: 'merchant',
    component: () => import('@/views/swcore/merchant/edit.vue'),
  },
  {
    path: '/swcore/hr/employees',
    name: 'employee.index',
    component: () => import('@/views/swcore/edit.vue'),
  },

]
