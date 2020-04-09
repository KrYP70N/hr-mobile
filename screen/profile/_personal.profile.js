import React, { Component }  from 'react'
import { Text, View } from 'native-base'

import styProfile from './profile.style'

export default class PersonalProfile extends Component {

    render () {

        let array = []
        
        for (const key in this.props.data) {
            if (this.props.data.hasOwnProperty(key)) {
                array.push(key)
            }
        }

        let dataList = array.map(list => {
            if(list === this.props.data[0]) {
                return (
                    <View style={[styProfile.dataListLast, {
                        display: this.props.data[`${list}`] ? null : 'none'
                    }]} key={list}>
                        <Text style={styProfile.label}>{list}</Text>
                        <Text style={[styProfile.dataValue, {paddingBottom: offset.o1}]}>{this.props.data[`${list}`]}</Text>
                    </View>    
                )
            }
            return (
                <View style={[styProfile.dataList, {
                    display: this.props.data[`${list}`] ? null : 'none'
                }]} key={list}>
                    <Text style={styProfile.label}>{list}</Text>
                    <Text style={styProfile.dataValue}>{this.props.data[`${list}`]}</Text>
                </View>
            )
        })

        return (
            <View style={styProfile.personalInfo}>
                <View style={styProfile.personalContainer}>
                    {dataList}
                </View>
            </View>
        )
    }
}