export default [
  {
    header: 'swcore',
  },
  {
    title: 'Merchant',
    route: 'merchant',
    icon: 'ShieldIcon',
    // acl: {
    action: 'read',
    resource: 'ACL',
    // },
  },

  {
    title: 'HR',
    icon: 'MenuIcon',
    children: [
      {
        title: 'Employees',
        route: 'employee.index',
      },
      {
        title: 'Menu Level 2.2',
        children: [
          {
            title: 'Menu Level 3.1',
            route: null,
          },
          {
            title: 'Menu Level 3.2',
          },
        ],
      },
    ],
  },

]
