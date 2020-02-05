import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native'

// icon set
import Icon from 'react-native-vector-icons/Feather';

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'

import dashboard from '../constant/dashboard.constant'

export default class DashboardScreen extends Component {
  render() {
    return (
      <ScrollView style={style.container}>
        <View style={dashboard.list}>
          <View style={dashboard.card}>
            <View style={dashboard.icon}>
              <Icon active name='calendar' style={[style.h3, style.textLight]}/>
            </View>
            <Text style={[style.h1, style.textPrimary]}>20</Text>
            <Text style={[style.h3, style.textPlaceholder]}>Leave Request</Text>
          </View>
          <View style={dashboard.card}>
            <View style={dashboard.icon}>
              <Icon active name='mail' style={[style.h3, style.textLight]}/>
            </View>
            <Text style={[style.h1, style.textPrimary]}>20</Text>
            <Text style={[style.h4, style.textPlaceholder]}>Request</Text>
          </View>
          <View style={dashboard.card}>
            <View style={dashboard.icon}>
              <Icon active name='server' style={[style.h3, style.textLight]}/>
            </View>
            <Text style={[style.h1, style.textPrimary]}>04</Text>
            <Text style={[style.h4, style.textPlaceholder]}>Pending</Text>
          </View>
          <View style={dashboard.card}>
            <View style={dashboard.icon}>
              <Icon active name='dollar-sign' style={[style.h3, style.textLight]}/>
            </View>
            <Text style={[style.h1, style.textPrimary]}>04</Text>
            <Text style={[style.h4, style.textPlaceholder]}>Payroll</Text>
          </View>
          <View style={dashboard.card}>
            <View style={dashboard.icon}>
              <Icon active name='book' style={[style.h3, style.textLight]}/>
            </View>
            <Text style={[style.h1, style.textPrimary]}>04</Text>
            <Text style={[style.h4, style.textPlaceholder]}>Atendance Record</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}