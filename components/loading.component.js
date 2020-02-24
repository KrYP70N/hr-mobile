import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Container, View, Text, Icon, Spinner } from 'native-base'

export default class Loading extends Component {
    render () {
        return ( 
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fff'
            }}>
                <Spinner />
            </View>
        )
    }
}