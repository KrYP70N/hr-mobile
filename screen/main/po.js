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
            icon: 'ios-speedometer',
            name: 'Dashboard',
            navigate: 'Dashboard'
        },
        //1
        {
            icon: 'ios-calendar',
            name: 'Attendance',
            navigate: 'Attendance'
        },
        //2
        {
            icon: 'ios-walk',
            name: 'Leave',
            navigate: 'Leave'
        },
        //3
        {
            icon: 'ios-stopwatch',
            name: 'Overtime',
            navigate: 'Overtime'
        },
        //4
        {
            icon: 'ios-calendar',
            name: 'Approve Leave ',
            navigate: 'AdminLeaveApprove'
        },
       //5
        {
            icon: 'ios-walk',
            name: 'Approve OT',
            navigate: 'AdminOvertimeApprove'
        },
        //6
        {
            icon: 'md-bookmarks',
            name: 'Payroll',
            navigate :'Payroll'
        },
        //7
        {
            icon: 'ios-walk',
            name: 'Announcement',
            navigate: 'NoticeBoard'
        },
         //8
        {
            icon: 'md-cash',
            name: 'Loan'
        },
    ]
}