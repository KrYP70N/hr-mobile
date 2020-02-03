import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import color from './colors.constant'
import style from './style.constant'

let profile;
export default profile = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20
    },
    topGab: {
        width: '100%',
        height: 50
    },
    personalContainer: {
        backgroundColor: color.light,
        borderRadius: 5
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        padding: 20
    },
    pictureBox: {
        width: 100,
        height: 100,
        marginTop: -70,
        marginBottom: 20,
        borderRadius: 50,
        borderColor: color.primary,
        borderWidth: 2,
        position: 'relative'
    },
    picture: {
        width: 96,
        height: 96,
        position: 'absolute',
        top: 0,
        left: 0
    }
})