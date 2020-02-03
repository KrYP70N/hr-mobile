import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import color from './colors.constant'

let login;

export default login = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: color.light
    },
    brand: {
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 40
    },
    welcome: {
        marginBottom: 30
    }
})