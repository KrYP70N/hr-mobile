import React, { Component } from 'react'
import { View, Spinner } from 'native-base'

export default class Overlay extends Component {
    render () {
        if(this.props.overlay) {
            return (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'none',
                    justifyContent: 'center'
                }}>
                    <Spinner />
                </View>
            )
        } else {
            return null
        }
    }
}