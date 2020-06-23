import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import styNav from './navigation.style'
import APIs from '../controllers/api.controller'

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

//   componentDidMount() {
//      //this.props.navigation.addListener('focus', () => {
//       AsyncStorage.getItem('@hr:endPoint')
//       .then((res) => {
//           const url = JSON.parse(res).ApiEndPoint
//           this.setState({ url: JSON.parse(res).ApiEndPoint })
//           AsyncStorage.getItem('@hr:token')
//               .then((res) => {
//                   const auth = JSON.parse(res).key;
//                   const id = JSON.parse(res).id;
//                   this.setState({
//                       auth: JSON.parse(res).key,
//                       id: JSON.parse(res).id
//                   })
//                   this.getLevel(auth, id, url);

//               })
//       })
     
//     // })
//   }

//   componentDidUpdate() {
//     if (
//         this.state.url !== null &&
//         this.state.auth !== null &&
//         this.state.id !== null 
       
//     ) {
//         this.getLevel(this.state.url, this.state.auth, this.state.id)
//     }
// }

  getLevel(url, auth, id){
    APIs.Level(url, auth, id)
    .then((res) => {
      if (res.status === 'success') {
        this.setState({
          level: res.data.lowest_level
        })
      } else {
        // api errors 
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
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
        {/* {
          this.state.level === true ? <View></View> : <TouchableOpacity style={styNav.item} onPress={() => { this.props.navigation.navigate('AdminLeaveApprove') }}>
          <Image source={require('../assets/icon/approve-leave.png')} style={styNav.img} />
          <Text>Approved Leave</Text>
        </TouchableOpacity>
        }
       {
         this.state.level === true ? <View></View> :  <TouchableOpacity style={ styNav.item} onPress={() => { this.props.navigation.navigate('AdminOvertimeApprove') }}>
         <Image source={require('../assets/icon/approve-ot.png')} style={styNav.img1} />
         <Text>Approved Overtime</Text>
       </TouchableOpacity>
       } */}
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
