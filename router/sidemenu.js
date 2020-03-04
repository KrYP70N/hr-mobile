import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styNav from './navigation.style'
export class sidemenu extends Component {
    render() {
        return (
            <View style = {{flex: 1}}>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/user-icn.png')} style={styNav.image}/>
                <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/attendance.png')} style={styNav.image}/>
                <Text>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/leave.png')} style={styNav.image}/>
                <Text>Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/ot.png')} style={styNav.image2}/>
                <Text>Overtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/payroll.png')} style={styNav.image3}/>
                <Text>Payroll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item}>
                <Image source={require('../assets/icon/lgoout.png')} style={styNav.image2}/>
                <Text>Logout</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

export default sidemenu
