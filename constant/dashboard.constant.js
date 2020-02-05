import React, { Component } from 'react'
import {
  StyleSheet, ProgressBarAndroidComponent
} from 'react-native'
import color from './colors.constant'

let dashboard

export default dashboard = StyleSheet.create({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        width: '47%',
        padding: 20,
        backgroundColor: color.light,
        borderRadius: 5,
        marginBottom: 20
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: color.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})