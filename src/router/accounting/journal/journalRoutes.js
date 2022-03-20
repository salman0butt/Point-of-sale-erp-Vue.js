import auth from '@/middleware/auth'

//Journal
const IndexJournal = () => import('@/views/accounting/journal/Index')
const CreateJournal = () => import('@/views/accounting/journal/CreateOrUpdate')
const ShowJournal = () => import('@/views/accounting/journal/Show')

const journalRoutes = {
  path: '/accounting/journals',
  redirect: '/accounting/journals/index',
  name: 'Journals',
  component: {
    render(c) { return c('router-view') }
  },
  beforeEnter: auth,
  children: [
    {
      path: 'index',
      name: 'All Journal',
      component: IndexJournal
    },
    {
      path: 'create',
      name: 'Create Journal',
      component: CreateJournal
    },
    {
      path: 'edit/:id',
      name: 'Edit Journal',
      component: CreateJournal
    },
    {
      path: 'show/:id',
      name: 'Show Journal',
      component: ShowJournal
    }
  ]
};

export default journalRoutes;
