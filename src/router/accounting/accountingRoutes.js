import auth from '@/middleware/auth'

//Accounts
const IndexAccounts = () => import('@/views/accounting/accounts/index')
const CreateAccount = () => import('@/views/accounting/accounts/create')
const EditAccount = () => import('@/views/accounting/accounts/edit')

// Payment Methods
const IndexPaymentMethods = () => import('@/views/accounting/paymentMethods/index')
const CreatePaymentMethods = () => import('@/views/accounting/paymentMethods/create')
const EditpaymentMethod = () => import('@/views/accounting/paymentMethods/edit')

// Category
const IndexAccountCategory = () => import('@/views/accounting/category/Index')
const CreateAccountCategory = () => import('@/views/accounting/category/Create')
const EditAccountCategory = () => import('@/views/accounting/category/Edit')

// Income
const IndexIncome = () => import('@/views/accounting/income/Index')
const CreateIncome = () => import('@/views/accounting/income/Create')
const EditIncome = () => import('@/views/accounting/income/Edit')

// Expense
const IndexExpense = () => import('@/views/accounting/expense/Index')
const CreateExpense = () => import('@/views/accounting/expense/Create')
const EditExpense = () => import('@/views/accounting/expense/Edit')

// Transfer
const IndexTransfer = () => import('@/views/accounting/transfer/Index')
const CreateTransfer = () => import('@/views/accounting/transfer/Create')
const EditTransfer = () => import('@/views/accounting/transfer/Edit')

// Biller
const IndexBiller = () => import('@/views/accounting/biller/Index')
const CreateBiller = () => import('@/views/accounting/biller/Create')
const EditBiller = () => import('@/views/accounting/biller/Edit')


const accountingRoutes =
{
    path: 'accounting/',
    redirect: 'accounting/accounts/index',
    name: 'Accounting',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'accounts/index',
            name: 'Accounts',
            component: IndexAccounts,
        },
        {
            path: 'accounts/create',
            name: 'Create Account',
            component: CreateAccount,
        },
        {
            path: 'accounts/:id',
            name: 'Edit Account',
            component: EditAccount,
        },
        {
            path: 'paymentMethods/index',
            name: 'Index PaymentMethods',
            component: IndexPaymentMethods,
        },
        {
            path: 'paymentMethods/create',
            name: 'Create PaymentMethods',
            component: CreatePaymentMethods,
        },
        {
            path: 'paymentMethods/:id',
            name: 'Edit paymentMethod',
            component: EditpaymentMethod,
        },
        {
            path: 'category/index',
            name: 'IndexAccountCategory',
            component: IndexAccountCategory,
        },
        {
            path: 'category/create',
            name: 'CreateAccountCategory',
            component: CreateAccountCategory,
        },
        {
            path: 'category/edit/:id',
            name: 'EditAccountCategory',
            component: EditAccountCategory,
        },
        {
            path: 'income/index',
            name: 'IndexIncome',
            component: IndexIncome,
        },
        {
            path: 'income/create',
            name: 'CreateIncome',
            component: CreateIncome,
        },
        {
            path: 'income/edit/:id',
            name: 'EditIncome',
            component: EditIncome,
        },
        {
            path: 'expense/index',
            name: 'IndexExpense',
            component: IndexExpense,
        },
        {
            path: 'expense/create',
            name: 'CreateExpense',
            component: CreateExpense,
        },
        {
            path: 'expense/edit/:id',
            name: 'EditExpense',
            component: EditExpense,
        },
        {
            path: 'transfer/index',
            name: 'IndexTransfer',
            component: IndexTransfer,
        },
        {
            path: 'transfer/create',
            name: 'CreateTransfer',
            component: CreateTransfer,
        },
        {
            path: 'transfer/edit/:id',
            name: 'EditTransfer',
            component: EditTransfer,
        },
        {
            path: 'biller/index',
            name: 'IndexBiller',
            component: IndexBiller,
        },
        {
            path: 'biller/create',
            name: 'CreateBiller',
            component: CreateBiller,
        },
        {
            path: 'biller/edit/:id',
            name: 'EditBiller',
            component: EditBiller,
        },


    ]
};

export default accountingRoutes;
