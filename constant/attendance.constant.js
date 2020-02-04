import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import color from './colors.constant'
import style from './style.constant'

let attendance;

export default attendance = StyleSheet.create({
    timeBanner: {
        display: 'flex',
        alignItems: 'center',
        padding: 30,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: color.light
    },
    infoCheckIn: {
        display: 'flex',
        flexDirection: 'row'
    },
    info: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    infoBorder: {
        borderRightWidth: 1,
        borderRightColor: color.light2
    },
    infoList: {
        display: 'flex',
        flexDirection: 'column'
    },
    infoList: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: color.light,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    quickCard: {
        backgroundColor: color.light,
        width: '47%',
        borderRadius: 5,
        padding: 10
    },
    stickyFoot: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 20,
        backgroundColor: color.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})