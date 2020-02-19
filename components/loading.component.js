import React, { Component } from 'react'
import { Image } from 'react-native'
import { Content, Container, View, Text } from 'native-base'

export default class Loading extends Component {
    render () {
        return ( 
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Image 
                    source={require('../assets/upload/loading.gif')}
                    style={{
                        alignSelf: 'center'
                    }}
                />
            </View>
        )
    }
}