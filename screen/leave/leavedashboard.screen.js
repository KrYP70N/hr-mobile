import React, { Component } from 'react'
import { Text, View } from 'react-native'
import color from '../../constant/color'

export class Leave extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = {{flex: 1}}>
               <View style = {{width: "100%", height: '30%', backgroundColor: color.primary}}></View>
               
            </View>
        )
    }
}

export default Leave
