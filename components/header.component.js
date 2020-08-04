import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Icon, Text } from 'native-base'
import styMain from '../screen/main/main.style'
import color from '../constant/color'
import offset from '../constant/offset'
export default class Heading extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.secondary) {
      return (
        <View style={{ height: 50, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
          <Icon name='ios-arrow-round-back' style={{
            fontSize: offset.o4,
            color: color.primary,
            marginRight: offset.o2,
            marginLeft: 15,
          }} onPress={() => { this.props.navigation.navigate('Main') }} />
          <Text style={{
            color: color.secondary,
            fontFamily: 'Nunito'
          }}>Attendance</Text>
        </View>
      )
    }

    return (
      <View style={{ height: 50, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Icon name='menu' style={{
          fontSize: offset.o4,
          color: color.primary,
          marginRight: offset.o2,
          marginLeft: 15,
        }} onPress={() => { this.props.navigation.openDrawer(this.props) }} />
        <Image source={
          require('../assets/upload/logo.png')
        } style={styMain.headerLogo} />
      </View>
    )
  }
}