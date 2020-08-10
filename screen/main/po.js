export default {
    checkin: {
        icon: 'ios-clock',
        title: 'Check In',
        checked: {
            true: "You already check in.",
            false: "You haven't check in yet."
        }
    },
    checkout: {
        icon: 'ios-clock',
        title: 'Check Out',
        checked: {
            true: "You already check out.",
            false: "Don't forget to check out"
        }
    },
    menu: [
        //0
        {
            icon: require('../../assets/icon/dashboard.png'),
            name: 'Dashboard',
            navigate: 'Dashboard'
        },
        //1
        {
            icon: require('../../assets/icon/attendance.png'),
            name: 'Attendance',
            navigate: 'Attendance'
        },
        //2
        {
            icon: require('../../assets/icon/leave.png'),
            name: 'Leave',
            navigate: 'Leave'
        },
        //3
        {
            icon: require('../../assets/icon/ot.png'),
            name: 'Overtime',
            navigate: 'Overtime'
        },
        //4
        {
            icon: require('../../assets/icon/approve-leave.png'),
            name: 'Approve Leave',
            navigate: 'AdminLeaveApprove'
        },
       //5
        {
            icon: require('../../assets/icon/approve-ot.png'),
            name: 'Approve OT',
            navigate: 'AdminOvertimeApprove'
        },
        //6
        {
            icon: require('../../assets/icon/payroll.png'),
            name: 'Payroll',
            navigate :'Payroll'
        },
        //7
        {
            icon: require('../../assets/icon/noticebo.png'),
            name: 'Announcement',
            navigate: 'NoticeBoard'
        },
        
    ]
}