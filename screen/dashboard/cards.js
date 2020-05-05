import React, { Component, useState } from 'react'
import {  FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text } from 'native-base'

import styles from './dashboard.style'
const cardList = [
    {
        title: 'Leave Request',
        noti: 2,
        icon: require('../../assets/icon/dashboard-leave.png'),
        page: 'DashboardLeaveRequest'
    },
    {
        title: 'Request',
        noti: 3,
        icon: require('../../assets/icon/dashboard-request.png'),
        page: 'DashboardRequest'
    },
    {
        title: 'Pending',
        noti: 4,
        icon: require('../../assets/icon/dashboard-pending.png'),
        page: 'Pending'
    },
    {
        title: 'Payroll',
        noti: 0,
        icon: require('../../assets/icon/dashboard-payroll.png'),
        page: 'Payroll'
    },
    {
        title: 'Attendance Record',
        noti: 0,
        icon: require('../../assets/icon/dashboard-leave.png'),
        page: 'AttendanceRecord'
    },
    {
        title: 'Announcement',
        noti: 9,
        icon: require('../../assets/icon/dashboard-notification.png'),
        page: 'NoticeBoard'
    },
]

export default class Cards extends Component {
    render(){
    return (
        <View style={styles.row}>
            {
                cardList.map((card, key) => (
                    <TouchableOpacity style={styles.card} key={key} onPress = {() => {this.props.navigation.navigate('NoticeBoard')}}>
                        <Image source={card.icon} style={styles.notiIcn}/>
                        <Text style={[styles.noti, {
                            opacity: card.noti === 0 ? 0 : 1
                        }]}>
                            {card.noti < 10 ? '0'+card.noti : card.noti}
                        </Text>
                        <Text style={styles.notinfo}>{card.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
        }
}
