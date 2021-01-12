import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, AsyncStorage, ScrollView } from 'react-native'
import color from '../constant/color'
import styNav from './navigation.style'

export class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: null,
      url: null,
      id: null,
      level: null,
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, marginTop: 20 }}>
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
            <Image source={require('../assets/icon/dashboard.png')} style={styNav.image} />
            <Text>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Profile') }}>
            <Image source={require('../assets/icon/profile.png')} style={styNav.image} />
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
            <Image source={require('../assets/icon/ot.png')} style={styNav.image} />
            <Text>Overtime</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Payroll') }}>
            <Image source={require('../assets/icon/payroll.png')} style={styNav.image} />
            <Text>Payroll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('NoticeBoard') }}>
            <Image source={require('../assets/icon/noticebo.png')} style={styNav.image} />
            <Text>Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styNav.item} onPress={() => {
            AsyncStorage.removeItem('@hr:token')
              .then(() => {
                this.props.navigation.navigate('Login')
              })
          }}>
            <Image source={require('../assets/icon/logout.png')} style={styNav.image2} />
            <Text>Logout</Text>
          </TouchableOpacity>

          <View style={{ marginLeft: 15, width: '87%', height: 1, backgroundColor: color.placeHolder, paddingHorizontal: 10 }} />
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('FeedBack') }}>
            <Image source={require('../assets/icon/ot.png')} style={styNav.image} />
            <Text>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('Hotline') }}>
            <Image source={require('../assets/icon/payroll.png')} style={styNav.image} />
            <Text>Call Hotline</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default SideMenu
