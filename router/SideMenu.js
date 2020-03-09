import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image} from 'react-native'
import styNav from './navigation.style'

export class SideMenu extends Component {
    constructor(props){
        super(props)
    }

    goToLogin(){
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={styNav.item} onPress = {() => {this.props.navigation.navigate('Main')}}>
                <Image source={require('../assets/icon/house.png')} style={styNav.image}/>
                <Text>Main</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item} onPress = {() => {this.props.navigation.navigate('Attendance')}}>
                <Image source={require('../assets/icon/attendance.png')} style={styNav.image}/>
                <Text>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item} onPress = {() => {this.props.navigation.navigate('Leave')}}>
                <Image source={require('../assets/icon/leave.png')} style={styNav.image}/>
                <Text>Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item} onPress = {() => {this.props.navigation.navigate('Overtime')}}>
                <Image source={require('../assets/icon/ot.png')} style={styNav.image2}/>
                <Text>Overtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item} onPress = {() => {this.props.navigation.navigate('Payroll')}}>
                <Image source={require('../assets/icon/payroll.png')} style={styNav.image3}/>
                <Text>Payroll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styNav.item} onPress = {() => {this.goToLogin()}}>
                <Image source={require('../assets/icon/lgoout.png')} style={styNav.image2}/>
                <Text>Logout</Text>
            </TouchableOpacity>
                
            </View>
        )
    }
}

export default SideMenu