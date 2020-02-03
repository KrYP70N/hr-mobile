import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text
} from 'react-native'

import {
  Content,
  List,
  ListItem
} from 'native-base';


// icon set
import Icon from 'react-native-vector-icons/Feather';

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'

export default class AttendanceScreen extends Component {
  render() {
    return (
      <ScrollView style={style.container}>
        <Text style={style.h2}>Attendance Screens</Text>
      </ScrollView>
    )
  }
}