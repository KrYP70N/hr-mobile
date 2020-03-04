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
        {
            icon: 'ios-speedometer',
            name: 'Dashboard'
        },
        {
            icon: 'ios-calendar',
            name: 'Attendance',
            navigate: 'Attendance'
        },
        {
            icon: 'ios-walk',
            name: 'Leave',
            navigate: 'Leave'
        },
        {
            icon: 'ios-stopwatch',
            name: 'Overtime',
            navigate: 'Overtime'
        },
        {
            icon: 'md-bookmarks',
            name: 'Payroll',
            navigate :'Payroll'
        },
        {
            icon: 'md-cash',
            name: 'Loan'
        }
    ]
}