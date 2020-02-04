import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableNativeFeedback
} from 'react-native'

import {
  Content,
  List,
  ListItem
} from 'native-base';


// icon set
import Icon from 'react-native-vector-icons/Feather'

// import component
import Card from '../components/card.component'


// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import attendance from '../constant/attendance.constant'

export default class AttendanceScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView style={style.container}>
          {/* time banner */}
          <View style={attendance.timeBanner}>
            <Text style={[style.h3, style.mb20, style.textPlaceholder]}>Monday, 04 Nov 2019</Text>
            <Text style={[style.h1, style.textPrimary, style.mb30]}>04:58 AM</Text>
            
            {/* check-in/out time */}
            <View style={attendance.infoCheckIn}>
              <View style={[attendance.info, attendance.infoBorder]}>
                <Text style={[style.textPlaceholder, style.textRight]}>CHEK IN TIME</Text>
                <Text style={[style.textPrimary, style.textRight]}>08:15 AM</Text>
              </View>
              <View style={[attendance.info]}>
                <Text style={[style.textPlaceholder]}>CHEK OUT TIME</Text>
                <Text style={[style.textPrimary]}>00:00 PM</Text>
              </View>
            </View>
          </View>

          {/* quick checkin/out */}
          <View style={[style.flex, style.flexRow, style.mb20, style.justifyBetween]}>
            <Card data={{
                cardStyle: attendance.quickCard,
                title: {
                    icon: 'clock',
                    label: 'Check In',
                    layout: 'row'
                },
                placeholder: "You haven't check in yet."
            }}/>
            <Card data={{
                cardStyle: attendance.quickCard,
                title: {
                    icon: 'clock',
                    label: 'Check Out',
                    layout: 'row'
                },
                placeholder: "You haven't check in yet."
            }}/>
          </View>
          {/* infolist */}
          <View style={attendance.listBox}>
            <View style={attendance.infoList}>
              <Text style={style.h3}>Attendance</Text>
              <Text style={[style.h3, style.textPrimary]}>18 Days</Text>
            </View>
            <View style={attendance.infoList}>
              <Text style={style.h3}>Leaves</Text>
              <Text style={[style.h3, style.textNegative]}>3 Days</Text>
            </View>
            <View style={attendance.infoList}>
              <Text style={style.h3}>Late In</Text>
              <Text style={[style.h3, style.textPlaceholder]}>00:00</Text>
            </View>
            <View style={[attendance.infoList, style.mb100]}>
              <Text style={style.h3}>Overtime</Text>
              <Text style={[style.h3, style.textPlaceholder]}>00:00</Text>
            </View>
          </View>
          
          
        </ScrollView>
          
        {/* footer sticky */}
        
         <TouchableNativeFeedback>
          <View style={attendance.stickyFoot}>
            <Icon active name='calendar' style={[style.h2, style.textLight, style.mr10]}/>
            <Text style={[style.textCenter, style.textLight, style.h3]}>Attendance Record</Text>
          </View>
         </TouchableNativeFeedback>
        
      </View>
    
    )
  }
}