import React, { useState } from 'react'
import {  FlatList, StyleSheet } from 'react-native'
import { View, Text } from 'native-base'

import styles from './dashboard.style'

export default function Cards() {
    const [cardList, setcardList] = useState([
        {
            title: 'Leave Request',
            noti: 2
        },
        {
            title: 'Request',
            noti: 3
        },
        {
            title: 'Pending',
            noti: 4
        },
        {
            title: 'Payroll',
            noti: 0
        },
        {
            title: 'Attendance Record',
            noti: 0
        },
        {
            title: 'Notification',
            noti: 9
        },
    ])
    return (
        <View style={styles.row}>
            {
                cardList.map((card, key) => (
                    <View style={styles.card} key={key}>
                        <Text style={[styles.noti, {
                            opacity: card.noti === 0 ? 0 : 1
                        }]}>
                            {card.noti < 10 ? '0'+card.noti : card.noti}
                        </Text>
                        <Text style={styles.notinfo}>{card.title}</Text>
                    </View>
                ))
            }
        </View>
    )
}
