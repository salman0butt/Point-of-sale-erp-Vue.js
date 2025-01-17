import Vue from 'vue'
import Router from 'vue-router'
import auth from '../middleware/auth'
import employeeRoutes from '@/router/employees/employeeRoutes';
import departmentRoutes from '@/router/departments/departmentRoutes';
import designationRoutes from '@/router/designations/designationRoutes';
import settingRoutes from '@/router/settings/settingRoutes';
import assetRoutes from '@/router/assets/assetRoutes';
import awardRoutes from '@/router/awards/awardRoutes';
import gradeRoutes from '@/router/grades/gradeRoutes';
import terminationRoutes from '@/router/terminations/terminationRoutes';
import resignationRoutes from '@/router/resignations/resignationRoutes';
import letterTemplateRoutes from '@/router/letterTemplates/letterTemplateRoutes';
import courseRoutes from '@/router/courses/courseRoutes';
import transferRoutes from '@/router/transfers/transferRoutes';
import traningTypeRoutes from '@/router/trainings/traningTypeRoutes';
import trainerRoutes from '@/router/trainings/trainerRoutes';
import trainingRoutes from '@/router/trainings/trainingRoutes';
import complainRoutes from '@/router/complains/complainRoutes';
import warningRoutes from '@/router/warnings/warningRoutes';
import recruitmentRoutes from '@/router/recruitments/recruitmentRoutes';
import salaryRoutes from '@/router/salary/salaryRoutes';
import salaryPaymentRoutes from '@/router/salaryPayment/salaryPaymentRoutes';
import profileRoutes from '@/router/profile/profileRoutes';
import leaveRoutes from '@/router/leaves/leaveRoutes';
import store from '@/store'
import attendanceRoutes from '@/router/attendance/attendanceRoutes';
import accountingRoutes from '@/router/accounting/accountingRoutes';
import rolesandpermissions from '@/router/rolesandpermissions/RolesAndPermissionsRoutes';
import customersRoutes from '@/router/contacts/customers/customersRoutes';
import supplierRoutes from '@/router/contacts/supplier/supplierRoutes';
import customerGroupsRoutes from '@/router/contacts/customerGroups/customerGroupsRoutes';
import supplierGroupsRoutes from '@/router/contacts/supplierGroups/supplierGroupsRoutes';
import productRoutes from '@/router/products/productRoutes';
import productCategoryRoutes from '@/router/catalogs/category/productCategoryRoutes';
import brandRoutes from '@/router/catalogs/brands/brandRoutes';
import receivingRoutes from '@/router/receivings/receivingRoutes';
import damageRoutes from '@/router/catalogs/damages/damageRoutes';
import offerRoutes from '@/router/catalogs/offers/offerRoutes';
import userRoutes from '@/router/users/userRoutes';
import modifierRoutes from '@/router/modifiers/modifierRoutes';
import salesRoutes from '@/router/sales/salesRoutes';
import invoiceRoutes from '@/router/sales/invoiceRoutes';
import paymentRoutes from '@/router/sales/paymentRoutes';
import reportRoutes from '@/router/reports/reportRoutes';
import purchaseOrderRoutes from '@/router/accounting/purchaseOrder/purchaseOrderRoutes';
import journalRoutes from '@/router/accounting/journal/journalRoutes';
import returnRoutes from '@/router/returns/returnRoutes';

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const ForgetPassword = () => import('@/views/pages/ForgetPassword')
const ResetPassword = () => import('@/views/pages/ResetPassword')
const Login = () => import('@/views/pages/Login')


// const Colors = () => import('@/views/theme/Colors')
// const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/charts/Charts')
// const Widgets = () => import('@/views/widgets/Widgets')

// // Views - Components
// const Cards = () => import('@/views/base/Cards')
// const Switches = () => import('@/views/base/Switches')
// const Tabs = () => import('@/views/base/Tabs')
// const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
// const Carousels = () => import('@/views/base/Carousels')
// const Collapses = () => import('@/views/base/Collapses')
// const Jumbotrons = () => import('@/views/base/Jumbotrons')
// const ListGroups = () => import('@/views/base/ListGroups')
// const Navs = () => import('@/views/base/Navs')
// const Navbars = () => import('@/views/base/Navbars')
// const Paginations = () => import('@/views/base/Paginations')
// const Popovers = () => import('@/views/base/Popovers')
// const ProgressBars = () => import('@/views/base/ProgressBars')
const Tables = () => import('@/views/tables/Tables')
const AdvancedTables = () => import('@/views/tables/AdvancedTables')
// const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
// const StandardButtons = () => import('@/views/buttons/StandardButtons')
// const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
// const Dropdowns = () => import('@/views/buttons/Dropdowns')
// const BrandButtons = () => import('@/views/buttons/BrandButtons')
// const LoadingButtons = () => import('@/views/buttons/LoadingButtons')

// Views - Editors
// const TextEditors = () => import('@/views/editors/TextEditors')
// const CodeEditors = () => import('@/views/editors/CodeEditors')

// views - Merchant
const Merchant = () => import('@/views/merchant/merchant')

// Views - Branches
const CreateBranch = () => import('@/views/branches/create')
const Branches = () => import('@/views/branches/index')
const EditBranch = () => import('@/views/branches/edit')

// Views - Forms
// const BasicForms = () => import('@/views/forms/Forms')
// const AdvancedForms = () => import('@/views/forms/AdvancedForms')
// const ValidationForms = () => import('@/views/forms/ValidationForms')
// const MultiSelect = () => import('@/views/forms/MultiSelect')

// Views GoogleMaps
// const GoogleMaps = () => import('@/views/GoogleMaps')

// Views - Icons
// const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
// const Brands = () => import('@/views/icons/brands')
// const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
// const Alerts = () => import('@/views/notifications/Alerts')
// const Badges = () => import('@/views/notifications/Badges')
// const Modals = () => import('@/views/notifications/Modals')
// const Toaster = () => import('@/views/notifications/Toaster')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
// const Register = () => import('@/views/pages/Register')

// Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

// Plugins
// const Draggable = () => import('@/views/plugins/Draggable')
// const Calendar = () => import('@/views/plugins/Calendar')
// const Spinners = () => import('@/views/plugins/Spinners')

// Apps -> Invoice
// const Invoice = () => import('@/views/apps/invoicing/Invoice')

// Apps -> Email
// const EmailApp = () => import('@/views/apps/email/EmailApp')
// const Compose = () => import('@/views/apps/email/Compose')
// const Inbox = () => import('@/views/apps/email/Inbox')
// const Message = () => import('@/views/apps/email/Message')
const test = () => import('@/views/Testing')
const ShowQuotation = () => import('@/views/sales/quotations/ShowQuotation')
const ShowInvoice = () => import('@/views/sales/invoices/ShowInvoice')
const ShowPayment = () => import('@/views/sales/payments/ShowPayment')

Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/show-quotation/:id',
      name: 'ShowQuotation',
      component: ShowQuotation
    },
    {
      path: '/show-invoice/:id',
      name: 'ShowInvoice',
      component: ShowInvoice
    },
    {
      path: '/show-payment/:id',
      name: 'ShowPayment',
      component: ShowPayment
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Home',
      beforeEnter: auth,
      component: TheContainer,

      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: auth
        },

        {
          path: 'merchant',
          name: 'Merchant',
          component: Merchant,
          beforeEnter: auth
        },
        {
          path: '/branches',
          name: 'Branches',
          component: Branches,
          beforeEnter: auth
        },
        {
          path: 'branch/create',
          name: 'Create Branch',
          component: CreateBranch,
          beforeEnter: auth
        },
        {
          path: 'branch/:id',
          name: 'Edit Branch',
          component: EditBranch,
          beforeEnter: auth
        },
        {
          path: 'test',
          name: 'test',
          component: test,
          // beforeEnter: auth
        },

        employeeRoutes,
        departmentRoutes,
        designationRoutes,
        attendanceRoutes,
        settingRoutes,
        salesRoutes,
        invoiceRoutes,
        paymentRoutes,
        assetRoutes,
        awardRoutes,
        gradeRoutes,
        terminationRoutes,
        resignationRoutes,
        courseRoutes,
        letterTemplateRoutes,
        transferRoutes,
        traningTypeRoutes,
        trainerRoutes,
        trainingRoutes,
        complainRoutes,
        warningRoutes,
        salaryRoutes,
        salaryPaymentRoutes,
        accountingRoutes,
        recruitmentRoutes,
        profileRoutes,
        leaveRoutes,
        rolesandpermissions,
        customersRoutes,
        customerGroupsRoutes,
        supplierGroupsRoutes,
        supplierRoutes,
        productRoutes,
        productCategoryRoutes,
        brandRoutes,
        receivingRoutes,
        damageRoutes,
        offerRoutes,
        userRoutes,
        modifierRoutes,
        reportRoutes,
        purchaseOrderRoutes,
        journalRoutes,
        returnRoutes,

        // {
        //   path: 'theme',
        //   redirect: '/theme/colors',
        //   name: 'Theme',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'colors',
        //       name: 'Colors',
        //       component: Colors
        //     },
        //     {
        //       path: 'typography',
        //       name: 'Typography',
        //       component: Typography
        //     }
        //   ]
        // },
        // {
        //   path: 'charts',
        //   name: 'Charts',
        //   component: Charts
        // },
        {
          path: 'tables',
          redirect: '/tables/tables',
          name: 'Tables',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'tables',
              name: 'Basic tables',
              component: Tables
            },
            {
              path: 'advanced-tables',
              name: 'Advanced tables',
              component: AdvancedTables
            }
          ]
        },
        // {
        //   path: 'widgets',
        //   name: 'Widgets',
        //   component: Widgets
        // },
        // {
        //   path: 'users',
        //   meta: { label: 'Users' },
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: '',
        //       name: 'Users',
        //       component: Users
        //     },
        //     {
        //       path: ':id',
        //       meta: {
        //         label: 'User Details'
        //       },
        //       name: 'User',
        //       component: User
        //     }
        //   ]
        // },
        // {
        //   path: 'base',
        //   redirect: '/base/cards',
        //   name: 'Base',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'breadcrumbs',
        //       name: 'Breadcrumbs',
        //       component: Breadcrumbs
        //     },
        //     {
        //       path: 'cards',
        //       name: 'Cards',
        //       component: Cards
        //     },
        //     {
        //       path: 'carousels',
        //       name: 'Carousels',
        //       component: Carousels
        //     },
        //     {
        //       path: 'collapses',
        //       name: 'Collapses',
        //       component: Collapses
        //     },
        //     {
        //       path: 'jumbotrons',
        //       name: 'Jumbotrons',
        //       component: Jumbotrons
        //     },
        //     {
        //       path: 'list-groups',
        //       name: 'List Groups',
        //       component: ListGroups
        //     },
        //     {
        //       path: 'navs',
        //       name: 'Navs',
        //       component: Navs
        //     },
        //     {
        //       path: 'navbars',
        //       name: 'Navbars',
        //       component: Navbars
        //     },
        //     {
        //       path: 'paginations',
        //       name: 'Paginations',
        //       component: Paginations
        //     },
        //     {
        //       path: 'popovers',
        //       name: 'Popovers',
        //       component: Popovers
        //     },
        //     {
        //       path: 'progress-bars',
        //       name: 'Progress Bars',
        //       component: ProgressBars
        //     },
        //     {
        //       path: 'switches',
        //       name: 'Switches',
        //       component: Switches
        //     },
        //     {
        //       path: 'tabs',
        //       name: 'Tabs',
        //       component: Tabs
        //     },
        //     {
        //       path: 'tooltips',
        //       name: 'Tooltips',
        //       component: Tooltips
        //     }
        //   ]
        // },
        // {
        //   path: 'buttons',
        //   redirect: '/buttons/standard-buttons',
        //   name: 'Buttons',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'standard-buttons',
        //       name: 'Standard Buttons',
        //       component: StandardButtons
        //     },
        //     {
        //       path: 'button-groups',
        //       name: 'Button Groups',
        //       component: ButtonGroups
        //     },
        //     {
        //       path: 'dropdowns',
        //       name: 'Dropdowns',
        //       component: Dropdowns
        //     },
        //     {
        //       path: 'brand-buttons',
        //       name: 'Brand Buttons',
        //       component: BrandButtons
        //     },
        //     {
        //       path: 'loading-buttons',
        //       name: 'Loading Buttons',
        //       component: LoadingButtons
        //     }
        //   ]
        // },
        // {
        //   path: 'editors',
        //   redirect: '/editors/text-editors',
        //   name: 'Editors',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'text-editors',
        //       name: 'Text Editors',
        //       component: TextEditors
        //     },
        //     {
        //       path: 'code-editors',
        //       name: 'Code Editors',
        //       component: CodeEditors
        //     }
        //   ]
        // },
        // {
        //   path: 'forms',
        //   redirect: '/forms/basic-forms',
        //   name: 'Forms',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'basic-forms',
        //       name: 'Basic Forms',
        //       component: BasicForms
        //     },
        //     {
        //       path: 'advanced-forms',
        //       name: 'Advanced Forms',
        //       component: AdvancedForms
        //     },
        //     {
        //       path: 'validation-forms',
        //       name: 'Form Validation',
        //       component: ValidationForms
        //     },
        //     {
        //       path: 'multi-select',
        //       name: 'Multiselect',
        //       component: MultiSelect
        //     },
        //   ]
        // },
        // {
        //   path: 'google-maps',
        //   name: 'Google Maps',
        //   component: GoogleMaps
        // },
        // {
        //   path: 'icons',
        //   redirect: '/icons/font-awesome',
        //   name: 'Icons',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'coreui-icons',
        //       name: 'CoreUI Icons',
        //       component: CoreUIIcons
        //     },
        //     {
        //       path: 'flags',
        //       name: 'Flags',
        //       component: Flags
        //     },
        //     {
        //       path: 'brands',
        //       name: 'Brands',
        //       component: Brands
        //     }
        //   ]
        // },
        // {
        //   path: 'notifications',
        //   redirect: '/notifications/alerts',
        //   name: 'Notifications',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'alerts',
        //       name: 'Alerts',
        //       component: Alerts
        //     },
        //     {
        //       path: 'badges',
        //       name: 'Badges',
        //       component: Badges
        //     },
        //     {
        //       path: 'modals',
        //       name: 'Modals',
        //       component: Modals
        //     },
        //     {
        //       path: 'toaster',
        //       name: 'Toaster',
        //       component: Toaster
        //     }
        //   ]
        // },
        // {
        //   path: 'plugins',
        //   redirect: '/plugins/draggable',
        //   name: 'Plugins',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'draggable',
        //       name: 'Draggable Cards',
        //       component: Draggable
        //     },
        //     {
        //       path: 'calendar',
        //       name: 'Calendar',
        //       component: Calendar
        //     },
        //     {
        //       path: 'spinners',
        //       name: 'Spinners',
        //       component: Spinners
        //     }
        //   ]
        // },

        // {
        //   path: 'apps',
        //   name: 'Apps',
        //   redirect: '/apps/invoicing/invoice',
        //   component: {
        //     render(c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'invoicing',
        //       redirect: '/apps/invoicing/invoice',
        //       name: 'Invoicing',
        //       component: {
        //         render(c) { return c('router-view') }
        //       },
        //       children: [
        //         {
        //           path: 'invoice',
        //           name: 'Invoice',
        //           component: Invoice
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    },
    // {
    //   path: '/apps/email',
    //   redirect: '/apps/email/inbox',
    //   name: 'Email',
    //   component: EmailApp,
    //   children: [{
    //     path: 'compose',
    //     name: 'Compose',
    //     component: Compose
    //   },
    //   {
    //     path: 'inbox',
    //     name: 'Inbox',
    //     component: Inbox
    //   },
    //   {
    //     path: 'message',
    //     name: 'Message',
    //     component: Message
    //   }
    //   ]
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLoggedIn) {
          next({ path: "/dashboard" });
        } else {
          next();
        }
      }
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/reset-password/:token/:email',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/not-found',
      name: "Page404",
      component: Page404
    },
    {
      path: '/something-wrong',
      name: "Page500",
      component: Page500
    },
    {
      path: '*',
      component: Page404
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    // {
    //   path: '/pages',
    //   redirect: '/pages/404',
    //   name: 'Pages',
    //   component: {
    //     render(c) { return c('router-view') }
    //   },
    //   children: [
    //     {
    //       path: '404',
    //       name: 'Page404',
    //       component: Page404
    //     },
    //     {
    //       path: '500',
    //       name: 'Page500',
    //       component: Page500
    //     },
    //     // {
    //     //   path: 'login',
    //     //   name: 'Login',
    //     //   component: Login
    //     // },
    //     // {
    //     //   path: 'register',
    //     //   name: 'Register',
    //     //   component: Register
    //     // }
    //   ]
    // }
  ]
})

router.beforeEach((to, from, next) => {

  let selected_branches = JSON.parse(localStorage.getItem("selected_branches"));
  if (
    (selected_branches === "" || selected_branches === null) &&
    store.getters.isLoggedIn
  ) {
    store.commit("set_show_branch_model", true);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }


  next();
});

// hasAccess(name){
//   let permissions = localStorage.getItem("permissions")

//   switch (name) {

//     case "home":
//       return true;

//     case "IndexDepartment":
//       return permissions.includes("IndexDepartment")

//     case "permissions":
//       return permissions.includes("View All Permissions")

//     case "roles":
//       return permissions.includes("View All Roles")

//     default:
//       return false;
//   }
// }







const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
