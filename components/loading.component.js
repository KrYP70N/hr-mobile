import React, { Component } from 'react'
import { View, Text, Spinner } from 'native-base'
import color from '../constant/color'

export default class Loading extends Component {
    constructor(props) {
        super(props)
    }
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
                <Text
                    style={{
                        color: color.placeHolder,
                        textAlign: 'center',
                    }}
                >{this.props.info}</Text>
            </View>
        )
    }
}