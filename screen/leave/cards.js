import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Card } from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'
const height = Dimensions.get('screen').height;
import React, { Component } from 'react'
const cardList = [
    {
        title: 'Apply',
        noti: 2,
        icon: require('../../assets/icon/leave_apply.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'History',
        noti: 3,
        icon: require('../../assets/icon/leave_history.png'),
        page: 'EmployeeLeaveHistory'
    },
    {
        title: 'Balance',
        noti: 4,
        icon: require('../../assets/icon/leave_balance.png'),
        page: 'EmployeeLeaveBalance'
    },
    {
        title: 'Approved',
        noti: 0,
        icon: require('../../assets/icon/leave_approved.png'),
        page: 'EmployeeLeaveApproved'
    },
    {
        title: 'Rejected',
        noti: 0,
        icon: require('../../assets/icon/leave_reject.png'),
        page: 'EmployeeLeaveRejected'
    },
    {
        title: 'Pending Approval',
        noti: 9,
        icon: require('../../assets/icon/leave_pending.png'),
        page: 'EmployeeLeavePending'
    },
]
export class cards extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 15,
                flexWrap: 'wrap'
            }}>
                {
                    cardList.map((card, key) => (
                        <TouchableOpacity
                            style={{
                                width: '48%',
                                padding: offset.o2,
                                backgroundColor: color.light,
                                marginTop: offset.o1 + offset.oh,
                                borderRadius: offset.o1,
                                borderColor: color.cardBorder,
                                borderWidth: 0.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 110,
                            }} key={key}
                            onPress={() => { this.props.navigation.navigate(card.page) }}>
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} key={key}>
                                <Image source={card.icon} style={{
                                    width: 35,
                                    height: 35,
                                    marginBottom: offset.o1 + offset.oh
                                }} />
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito' }}>{card.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}


export default cards