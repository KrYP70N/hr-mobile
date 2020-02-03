import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import color from './colors.constant'

let main;

export default main = StyleSheet.create({
    banner: {
        display: 'flex',
        padding: 20,
        backgroundColor: color.primary
    },
    bannerTime: {
        textAlign: 'center'
    },
    bannerText: {
        color: color.light,
        textAlign: 'center'
    },
    bannerProfile: {
        display: 'flex',
        flexDirection: 'row'
    },
    info: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bannerLink: {
        flex: 1
    },
    profile: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: color.light,
        marginRight: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: color.light,
        position: 'relative'
    },
    profileImage: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    panel: {
        paddingLeft: 20,
        paddingRight: 20
    },
    listContainer: {
        marginTop: -50,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card: {
        width: '47%',
        backgroundColor: color.light,
        padding: 10,
        color: color.primary,
        borderRadius: 7,
        marginBottom: 20
    }
})