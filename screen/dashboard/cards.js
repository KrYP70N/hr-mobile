import React, { Component } from 'react'
import { TouchableOpacity, AsyncStorage, } from 'react-native'
import {View, Text, Image } from 'react-native'
import styles from './dashboard.style'
import APIs from '../../controllers/api.controller'
import ErrorMessage from '../../constant/messagetext'
// const cardList = [
//     {
//         title: 'Employees',
//         noti: 2,
//         icon: require('../../assets/icon/dashboard-leave.png'),
//         // page: 'DashboardLeaveRequest'
//         page: 'EmployeeList'
//     },
//     {
//         title: 'Today Leaves',
//         noti: 3,
//         icon: require('../../assets/icon/dashboard-request.png'),
//         // page: 'DashboardRequest'
//         page: 'TodayLeave'
//     },
//     {
//         title: 'Upcoming Birthday',
//         noti: 4,
//         icon: require('../../assets/icon/dashboard-pending.png'),
//         //page: 'Pending'
//         page: 'UpcomingBirthday'
//     },
//     {
//         title: 'Department',
//         noti: 0,
//         icon: require('../../assets/icon/dashboard-payroll.png'),
//         page: 'Department'
//     },
//     {
//         title: 'Leave Request',
//         noti: 0,
//         icon: require('../../assets/icon/dashboard-leave.png'),
//         //page: 'AttendanceRecord'
//         page: 'DashboardLeaveRequestList'
//     },
//     {
//         title: 'Announcement',
//         noti: 9,
//         icon: require('../../assets/icon/dashboard-notification.png'),
//         page: 'NoticeBoard'
//     },
   
// ]

export default class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            cardList: [],
            activeEmployeeList: [],
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date()
                    const currentYear = date.getFullYear()
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getSummaryData(auth, id, url, currentYear);

                        })
                })
        })
    }

    componentDidUpdate() {
        if (
            this.state.url !== null &&
            this.state.auth !== null &&
            this.state.id !== null &&
            this.state.summaryData === null
        ) {
            let date = new Date();
            let year = date.getFullYear();
            //let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            this.getSummaryData(this.state.auth, this.state.id, this.state.url, year)
        }
    }

    getSummaryData(auth, id, url, year) {
        APIs.getDashboardSummary(url, auth, id, year)
            .then((res) => {
                let list = [];
                if (res.status == 'success') {
                    if(res.error){
                       ErrorMessage('token', this.props.navigation)
                    }else{
                        if (res.data["Dashboard Type"] == "employee") {
                            list.push(
                                {
                                    title: 'Today dept Leaves',
                                    noti: res.data["Today Leave Count"][0][0] == "0" ? "0" : res.data["Today Leave Count"][0][0],
                                    icon: require('../../assets/icon/leave.png'),
                                    // page: 'DashboardRequest'
                                    page: 'TodayLeave'
                                }
                            )
                            list.push(
                                {
                                    title: 'Upcoming Birthday',
                                    noti: res.data["Birthday Count"][0][0] == "0" ? "0" : res.data["Birthday Count"][0][0],
                                    icon: require('../../assets/icon/upcoming-birthday.png'),
                                    // page: 'DashboardRequest'
                                    page: 'UpcomingBirthday'
                                },
                            )
    
                            list.push(
                                {
                                    title: 'Announcement',
                                    noti: res.data["Announcement Count"] == "0" ? "0" : res.data["Announcement Count"],
                                    icon: require('../../assets/icon/noticebo.png'),
                                    page: 'NoticeBoard'
                                }
                            )
    
                            list.push(
                                {
                                    title: 'Contract',
                                    noti: res.data["Contract Count"][0][0] == "0" ? "0" : res.data["Contract Count"][0][0],
                                    icon: require('../../assets/icon/profile.png'),
                                    page: 'ContractProfile'
                                }
                            )
                        }
                        else {
                            list.push(
                                {
                                    title: 'Employees',
                                    noti: res.data["Active Employee List Count"][0][0] == "0" ? "0" : res.data["Active Employee List Count"][0][0],
                                    icon: require('../../assets/icon/employee.png'),
                                    page: 'EmployeeList'
                                }
                            )
                            list.push(
                                {
                                    title: 'Department',
                                    noti: res.data["Department Count"][0][0] == "0" ? "0" : res.data["Department Count"][0][0],
                                    icon: require('../../assets/icon/department.png'),
                                    page: 'Department'
                                }
                            )
                            list.push(
                                {
                                    title: 'Today Attendance',
                                    noti: res.data["Attendance Count"][0][0] == "0" ? "0" : res.data["Attendance Count"][0][0],
                                    icon: require('../../assets/icon/attendance.png'),
                                    page: 'DashboardAttendance'
                                }
                            )
    
                            list.push(
                                {
                                    title: 'Today Absent',
                                    noti: res.data["Today Absent Count"][0][0] == "0" ? "0" : res.data["Today Absent Count"][0][0],
                                    icon: require('../../assets/icon/absence.png'),
                                    page: 'AbsentEmployeeList'
                                }
                            )
    
                            list.push(
                                {
                                    title: 'Today on Leaves',
                                    noti: res.data["Today Leave Count"][0][0] == "0" ? "0" : res.data["Today Leave Count"][0][0],
                                    icon: require('../../assets/icon/leave.png'),
                                    page: 'TodayLeave'
                                }
                            )
    
                            list.push(
                                {
                                    title: 'Leave Request Lists',
                                    noti: res.data["Leave Request Count"][0][0] == "0" ? "0" : res.data["Leave Request Count"][0][0],
                                    icon: require('../../assets/icon/leave-request-list.png'),
                                    page: 'DashboardLeaveRequestList'
                                }
                            )
                            list.push(
                                {
                                    title: 'Exit Employee',
                                    noti: res.data["Exit Employee Count"][0][0] == "0" ? "0" : res.data["Exit Employee Count"][0][0],
                                    icon: require('../../assets/icon/exit-employee.png'),
                                    page: 'ExitEmployeeList'
                                }
                            )
    
                            list.push(
                                {
                                    title: 'Join Employee',
                                    noti: res.data["Join Employee Count"][0][0] == "0" ? "0" : res.data["Join Employee Count"][0][0],
                                    icon: require('../../assets/icon/join-employee.png'),
                                    page: 'JoinEmployeeList'
                                }
                            )
                            list.push(
                                {
                                    title: 'Upcoming Birthday',
                                    noti: res.data["Birthday Count"][0][0] == "0" ? "0" : res.data["Birthday Count"][0][0],
                                    icon: require('../../assets/icon/upcoming-birthday.png'),
                                    page: 'UpcomingBirthday'
                                },
                            )
                           
    
                            list.push(
                                {
                                    title: 'Announcement',
                                    noti: res.data["Announcement Count"] == "0" ? "0" : res.data["Announcement Count"],
                                    icon: require('../../assets/icon/noticebo.png'),
                                    page: 'NoticeBoard'
                                }
                            )
                           
                            list.push(
                                {
                                    title: 'Contract',
                                    noti: res.data["Contract Count"][0][0] == "0" ? "0" : res.data["Contract Count"][0][0],
                                    icon: require('../../assets/icon/profile.png'),
                                    page: 'ContractProfile'
                                }
                            )
                        }
                        this.setState({
                            cardList: list
                        })
                    }
                    
                }
            })
    }

    componentWillUnmount(){
        this.setState({
            cardList: [],
            activeEmployeeList: []
        })
    }

    render() {
        return (
            <View style={styles.row}>
                {
                    this.state.cardList.map((card, key) => (
                        <TouchableOpacity style={styles.card} key={key} onPress={() => { 
                            this.props.navigation.navigate(card.page, {pageFrom: "Dashboard"})
                            }}>
                            <Image source={card.icon} style={styles.notiIcn} />
                            <Text style={[styles.noti, {
                                opacity: card.noti === 0 ? 0 : 1
                            }]}>
                                {card.noti < 10 ? '0' + card.noti : card.noti}
                            </Text>
                            <Text style={styles.notinfo}>{card.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}
