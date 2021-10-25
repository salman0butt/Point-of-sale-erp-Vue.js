<script>
import store from "@/store";

export default {
  name: "nav",
  data() {
    return {
      permissions: [],
    };
  },
  created() {
    this.permissions = store.getters.getPermissions;
  },
  computed: {
    sidebarItems() {
      return [
        {
          _name: "CSidebarNav",
          _children: [
            {
              ...(this.permissions.includes("read dashboard") && {
                _name: "CSidebarNavItem",
                name: this.$t("menu.dashboard"),
                to: "/dashboard",
                icon: "cil-speedometer",
              }),
            },

            {
              _name: "CSidebarNavItem",
              name: "Merchant",
              to: "/merchant",
              icon: "cil-institution",
            },
            {
              ...(this.permissions.includes("read branches") && {
                _name: "CSidebarNavItem",
                _attrs: { class: "hide-me" },
                name: "Branches",
                to: "/branches",
                icon: "cil-lan",
              }),
            },
            // {
            //   _name: "CSidebarNavItem",
            //   name: "Departments",
            //   to: "/departments/index",
            //   icon: "cil-lan",
            // },
            // {
            //   _name: "CSidebarNavDropdown",
            //   name: "Departments",
            //   to: "/departments/index",
            //   icon: "cil-lan",
            //   items: [
            //     {
            //       name: "All Departments",
            //       to: "/departments/index",
            //     },
            //     {
            //       name: "Create Departments",
            //       to: "/departments/create",
            //     },
            //   ],
            // },
            // {
            //   _name: "CSidebarNavItem",
            //   name: "Designations",
            //   to: "/designations/index",
            //   icon: "cil-lan",
            // },
            // {
            //   _name: "CSidebarNavDropdown",
            //   name: "Designations",
            //   route: "/designations",
            //   icon: "cil-lan",
            //   items: [
            //     {
            //       name: "All Designations",
            //       to: "/designations/index",
            //     },
            //     {
            //       name: "Create Designations",
            //       to: "/designations/create",
            //     },
            //   ],
            // },
            {
              _name: "CSidebarNavItem",
              name: "Profile",
              to: "/profile/" + localStorage.getItem("employee_id") ?? "",
              icon: "cil-lan",
            },
            {
              _name: "CSidebarNavDropdown",
              name: "HR",
              icon: "cil-lan",
              _children: [
                {
                  ...(this.permissions.includes("read departments") && {
                    _name: "CSidebarNavItem",
                    name: "Departments",
                    to: "/departments/index",
                    // icon: "cil-laptop",
                    permission: "department-read",
                  }),
                },
                {
                  ...(this.permissions.includes("read designations") && {
                    _name: "CSidebarNavItem",
                    name: "Designations",
                    to: "/designations/index",
                    // icon: "cil-moon",
                  }),
                },
                {
                  ...(this.permissions.includes("read letter-templates") && {
                    _name: "CSidebarNavItem",
                    name: "Letter Templates",
                    to: "/letterTemplates/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read employees") && {
                    _name: "CSidebarNavItem",
                    name: "Employees",
                    to: "/employees/index",
                    // icon: "cil-people",
                  }),
                },
                {
                  _name: "CSidebarNavItem",
                  name: "Attendance",
                  to: "/attendance/index",
                  // icon: "cil-bell",
                },
                {
                  ...(this.permissions.includes("read leaves") && {
                    _name: "CSidebarNavItem",
                    name: "Leaves",
                    to: "/leaves/index",
                    // icon: "cil-userFollow",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-salary-adjustments") && {
                    _name: "CSidebarNavItem",
                    name: "Salary",
                    to: "/salary/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-complains") && {
                    _name: "CSidebarNavItem",
                    name: "Complains",
                    to: "/complains/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-warnings") && {
                    _name: "CSidebarNavItem",
                    name: "Warnings",
                    to: "/warnings/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-resignations") && {
                    _name: "CSidebarNavItem",
                    name: "Resignations",
                    to: "/resignations/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read assets") && {
                    _name: "CSidebarNavItem",
                    name: "Assets",
                    to: "/assets/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read awards") && {
                    _name: "CSidebarNavItem",
                    name: "Awards",
                    to: "/awards/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-grades") && {
                    _name: "CSidebarNavItem",
                    name: "Grades",
                    to: "/grades/index",
                    // icon: "cil-basket",
                  }),
                },
                {
                  ...(this.permissions.includes("read employee-terminations") && {
                    _name: "CSidebarNavItem",
                    name: "Terminations",
                    to: "/terminations/index",
                    // icon: "cil-chartPie",
                  }),
                },
                {
                  _name: "CSidebarNavDropdown",
                  name: "Recruitment",
                  route: "/recruitment",
                  // icon: "cil-speech",
                  _children: [
                    {
                      ...(this.permissions.includes("read job-categories") && {
                        _name: "CSidebarNavItem",
                        name: "Job Category",
                        to: "/recruitment/jobCategories/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read job-posts") && {
                        _name: "CSidebarNavItem",
                        name: "Job Post",
                        to: "/recruitment/jobPosts/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read job-candidates") && {
                        _name: "CSidebarNavItem",
                        name: "Job Candidates",
                        to: "/recruitment/jobCandidates/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read job-interviewers") && {
                        _name: "CSidebarNavItem",
                        name: "Job Interviewers",
                        to: "/recruitment/jobInterviewers/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read job-interviews") && {
                        _name: "CSidebarNavItem",
                        name: "Job Interviewes",
                        to: "/recruitment/jobInterviews/index",
                        icon: "cil-lan",
                      }),
                    },
                  ],
                },
                {
                  ...(this.permissions.includes("read employee-transfers") && {
                    _name: "CSidebarNavItem",
                    name: "Transfers",
                    to: "/transfers/index",
                    // icon: "cil-lan",
                  }),
                },
                {
                  _name: "CSidebarNavDropdown",
                  name: "Trainings",
                  route: "/apps",
                  // icon: "cil-layers",
                  _children: [
                    {
                      ...(this.permissions.includes("read training-types") && {
                        _name: "CSidebarNavItem",
                        name: "Traning Type",
                        to: "/trainingTypes/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read trainers") && {
                        _name: "CSidebarNavItem",
                        name: "Trainers",
                        to: "/trainers/index",
                        icon: "cil-lan",
                      }),
                    },
                    {
                      ...(this.permissions.includes("read trainings") && {
                        _name: "CSidebarNavItem",
                        name: "Training",
                        to: "/trainings/index",
                        icon: "cil-lan",
                      }),
                    },
                  ],
                },
                {
                  ...(this.permissions.includes("read courses") && {
                    _name: "CSidebarNavItem",
                    name: "Courses",
                    to: "/courses/index",
                    // icon: "cil-lan",
                  }),
                },
              ],
            },
            {
              _name: "CSidebarNavDropdown",
              name: "Accounting",
              icon: "cil-lan",
              items: [
                {
                  ...(this.permissions.includes("read account") && {
                    _name: "CSidebarNavItem",
                    name: "Accounts",
                    to: "/accounting/accounts/index",
                    icon: "cil-lan",
                  }),
                },
                {
                  ...(this.permissions.includes("read paymentMethod") && {
                    _name: "CSidebarNavItem",
                    name: "Payment Methods",
                    to: "/accounting/paymentMethods/index",
                    icon: "cil-lan",
                  }),
                },
              ],
            },
            {
              _name: "CSidebarNavItem",
              name: "Settings",
              to: "/settings",
              icon: "cil-settings",
            },

            {
              _name: "CSidebarNavItem",
              name: "Roles & Permissions",
              to: { name: "Index Roles" },
              icon: "cil-lan",
            },
            {
              _name: "CSidebarNavItem",
              name: "Customers",
              to: { name: "Index Customers" },
              icon: "cil-lan",
            },

            // {
            //   _name: 'CSidebarNavTitle',
            //   _children: ['Components']
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Base',
            //   route: '/base',
            //   icon: 'cil-puzzle',
            //   items: [{
            //       name: 'Breadcrumbs',
            //       to: '/base/breadcrumbs'
            //     },
            //     {
            //       name: 'Cards',
            //       to: '/base/cards'
            //     },
            //     {
            //       name: 'Carousels',
            //       to: '/base/carousels'
            //     },
            //     {
            //       name: 'Collapses',
            //       to: '/base/collapses'
            //     },
            //     {
            //       name: 'Jumbotrons',
            //       to: '/base/jumbotrons'
            //     },
            //     {
            //       name: 'List Groups',
            //       to: '/base/list-groups'
            //     },
            //     {
            //       name: 'Navs',
            //       to: '/base/navs'
            //     },
            //     {
            //       name: 'Navbars',
            //       to: '/base/navbars'
            //     },
            //     {
            //       name: 'Paginations',
            //       to: '/base/paginations'
            //     },
            //     {
            //       name: 'Popovers',
            //       to: '/base/popovers'
            //     },
            //     {
            //       name: 'Progress Bars',
            //       to: '/base/progress-bars'
            //     },
            //     {
            //       name: 'Switches',
            //       to: '/base/switches'
            //     },
            //     {
            //       name: 'Tabs',
            //       to: '/base/tabs'
            //     },
            //     {
            //       name: 'Tooltips',
            //       to: '/base/tooltips'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Buttons',
            //   route: '/buttons',
            //   icon: 'cil-cursor',
            //   items: [{
            //       name: 'Buttons',
            //       to: '/buttons/standard-buttons'
            //     },
            //     {
            //       name: 'Button Dropdowns',
            //       to: '/buttons/dropdowns'
            //     },
            //     {
            //       name: 'Button Groups',
            //       to: '/buttons/button-groups'
            //     },
            //     {
            //       name: 'Brand Buttons',
            //       to: '/buttons/brand-buttons'
            //     },
            //     {
            //       name: 'Loading Buttons',
            //       to: '/buttons/loading-buttons',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Charts',
            //   to: '/charts',
            //   icon: 'cil-chart-pie'
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Editors',
            //   route: '/editors',
            //   icon: 'cil-code',
            //   items: [{
            //       name: 'Code editors',
            //       to: '/editors/code-editors',
            //       icon: 'cil-code',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     },
            //     {
            //       name: 'Text editors',
            //       to: '/editors/text-editors',
            //       icon: 'cil-justify-left'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Forms',
            //   route: '/forms',
            //   icon: 'cil-notes',
            //   items: [{
            //       name: 'Basic forms',
            //       to: '/forms/basic-forms'
            //     },
            //     {
            //       name: 'Advanced forms',
            //       to: '/forms/advanced-forms',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     },
            //     {
            //       name: 'Validation forms',
            //       to: '/forms/validation-forms',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     },
            //     {
            //       name: 'Multiselect',
            //       to: '/forms/multi-select',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Google Maps',
            //   to: '/google-maps',
            //   icon: 'cil-map',
            //   badge: {
            //     color: 'danger',
            //     text: 'PRO'
            //   }
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Icons',
            //   route: '/icons',
            //   icon: 'cil-star',
            //   items: [{
            //       name: 'CoreUI Icons',
            //       to: '/icons/coreui-icons',
            //       badge: {
            //         color: 'info',
            //         text: 'NEW'
            //       }
            //     },
            //     {
            //       name: 'Brands',
            //       to: '/icons/brands'
            //     },
            //     {
            //       name: 'Flags',
            //       to: '/icons/flags'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Notifications',
            //   route: '/notifications',
            //   icon: 'cil-bell',
            //   items: [{
            //       name: 'Alerts',
            //       to: '/notifications/alerts',
            //     },
            //     {
            //       name: 'Badges',
            //       to: '/notifications/badges'
            //     },
            //     {
            //       name: 'Modals',
            //       to: '/notifications/modals'
            //     },
            //     {
            //       name: 'Toaster',
            //       to: '/notifications/toaster',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Plugins',
            //   route: '/plugins',
            //   icon: 'cil-input-power',
            //   items: [{
            //       name: 'Draggable',
            //       to: '/plugins/draggable',
            //       icon: 'cil-cursor-move',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     },
            //     {
            //       name: 'Calendar',
            //       to: '/plugins/calendar',
            //       icon: 'cil-calendar',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     },
            //     {
            //       name: 'Spinners',
            //       to: '/plugins/spinners',
            //       icon: 'cil-circle',
            //       badge: {
            //         color: 'danger',
            //         text: 'PRO'
            //       }
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Tables',
            //   route: '/tables',
            //   icon: 'cil-list',
            //   items: [{
            //       name: 'Basic Tables',
            //       to: '/tables/tables',
            //       icon: 'cil-list',
            //     },
            //     {
            //       name: 'Advanced tables',
            //       to: '/tables/advanced-tables',
            //       icon: 'cil-list-rich'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Widgets',
            //   to: '/widgets',
            //   icon: 'cil-calculator',
            //   badge: {
            //     color: 'primary',
            //     text: 'NEW',
            //     shape: 'pill'
            //   }
            // },
            // {
            //   _name: 'CSidebarNavDivider'
            // },
            // {
            //   _name: 'CSidebarNavTitle',
            //   _children: ['Extras']
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Pages',
            //   route: '/pages',
            //   icon: 'cil-star',
            //   items: [{
            //       name: 'Login',
            //       to: '/pages/login'
            //     },
            //     {
            //       name: 'Register',
            //       to: '/pages/register'
            //     },
            //     {
            //       name: 'Error 404',
            //       to: '/pages/404'
            //     },
            //     {
            //       name: 'Error 500',
            //       to: '/pages/500'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Apps',
            //   route: '/apps',
            //   icon: 'cil-layers',
            //   _children: [{
            //       _name: 'CSidebarNavDropdown',
            //       name: 'Invoicing',
            //       route: '/apps/invoicing',
            //       icon: 'cil-spreadsheet',
            //       items: [{
            //         name: 'Invoice',
            //         to: '/apps/invoicing/invoice',
            //         badge: {
            //           color: 'danger',
            //           text: 'PRO'
            //         }
            //       }]
            //     },
            //     {
            //       _name: 'CSidebarNavDropdown',
            //       name: 'Email',
            //       route: '/apps/email',
            //       icon: 'cil-envelope-closed',
            //       items: [{
            //           name: 'Inbox',
            //           to: '/apps/email/inbox',
            //           icon: 'cil-envelope-closed',
            //           badge: {
            //             color: 'danger',
            //             text: 'PRO'
            //           }
            //         },
            //         {
            //           name: 'Message',
            //           to: '/apps/email/message',
            //           icon: 'cil-envelope-open',
            //           badge: {
            //             color: 'danger',
            //             text: 'PRO'
            //           }
            //         },
            //         {
            //           name: 'Compose',
            //           to: '/apps/email/compose',
            //           icon: 'cil-envelope-letter',
            //           badge: {
            //             color: 'danger',
            //             text: 'PRO'
            //           }
            //         }
            //       ]
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDivider',
            //   _class: 'm-2'
            // },
            // {
            //   _name: 'CSidebarNavTitle',
            //   _children: ['Labels']
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Label danger',
            //   icon: {
            //     name: 'cil-star',
            //     class: 'text-danger'
            //   },
            //   label: true
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Label info',
            //   icon: {
            //     name: 'cil-star',
            //     class: 'text-info'
            //   },
            //   label: true
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Label warning',
            //   icon: {
            //     name: 'cil-star',
            //     class: 'text-warning'
            //   },
            //   label: true
            // }
          ],
        },
      ];
    },
  },
};
</script>
