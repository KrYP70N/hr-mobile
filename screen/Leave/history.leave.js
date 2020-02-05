import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native'

// icon set
import Icon from 'react-native-vector-icons/Feather'

// import component
import Card from '../../components/card.component'


// import constant & style

import color from '../../constant/colors.constant'
import style from '../../constant/style.constant'
import attendance from '../../constant/attendance.constant'

export default class History extends History {
    render () {
        return (
            <View style={style.container}>
                <Text>Request</Text>
            </View>
        )
    }
}