import React, { useState } from 'react'
import {  FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text } from 'native-base'

import styles from './dashboard.style'

export default function Cards() {
    const [cardList, setcardList] = useState([
        {
            title: 'Leave Request',
            noti: 2,
            icon: require('../../assets/icon/dashboard-leave.png')
        },
        {
            title: 'Request',
            noti: 3,
            icon: require('../../assets/icon/dashboard-request.png')
        },
        {
            title: 'Pending',
            noti: 4,
            icon: require('../../assets/icon/dashboard-pending.png')
        },
        {
            title: 'Payroll',
            noti: 0,
            icon: require('../../assets/icon/dashboard-payroll.png')
        },
        {
            title: 'Attendance Record',
            noti: 0,
            icon: require('../../assets/icon/dashboard-leave.png')
        },
        {
            title: 'Notification',
            noti: 9,
            icon: require('../../assets/icon/dashboard-notification.png')
        },
    ])
    return (
        <View style={styles.row}>
            {
                cardList.map((card, key) => (
                    <TouchableOpacity style={styles.card} key={key}>
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
