import auth from '@/middleware/auth'


//Department
const IndexAttendance = () => import('@/views/hr/attendance/Index')
const CreateAttendanceByMachine = () => import('@/views/hr/attendance/CreateAttendanceByMachine')
const EditAttendance = () => import('@/views/hr/attendance/Edit')

const attendanceRoutes = {
    path: 'attendance',
    redirect: '/attendance/index',
    name: 'Attendance',
    component: {
        render(c) { return c('router-view') }
    },
    beforeEnter: auth,
    children: [
        {
            path: 'index',
            name: 'IndexAttendance',
            component: IndexAttendance
        },
        {
            path: 'create-attendance-by-machine',
            name: 'CreateAttendanceByMachine',
            component: CreateAttendanceByMachine
        },
        {
            path: 'edit/:id',
            name: 'editAttendance',
            component: EditAttendance
        },


    ],

};
export default attendanceRoutes;
