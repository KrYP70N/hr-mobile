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
            <Text></Text>
          </View>
          <View style={dashboard.card}>
            <Text></Text>
          </View>
          <View style={dashboard.card}>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}