import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import styNav from './navigation.style'

export class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
          <Image source={require('../assets/icon/dashboard.png')} style={styNav.image} />
          <Text>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Profile') }}>
          <Image source={require('../assets/icon/user-icn.png')} style={styNav.image} />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Attendance') }}>
          <Image source={require('../assets/icon/attendance.png')} style={styNav.image} />
          <Text>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Leave') }}>
          <Image source={require('../assets/icon/leave.png')} style={styNav.image} />
          <Text>Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Overtime') }}>
          <Image source={require('../assets/icon/ot.png')} style={styNav.image2} />
          <Text>Overtime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Payroll') }}>
          <Image source={require('../assets/icon/payroll.png')} style={styNav.image3} />
          <Text>Payroll</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('NoticeBoard') }}>
          <Image source={require('../assets/icon/noticeboard-2.png')} style={styNav.image4} />
          <Text>Announcement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styNav.item} onPress={() => {
          AsyncStorage.removeItem('@hr:token')
          .then(() => {
            this.props.navigation.navigate('Login')
          })
        }}>
          <Image source={require('../assets/icon/lgoout.png')} style={styNav.image2} />
          <Text>Logout</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default SideMenu
