import React, { Component } from 'react'
import { Image, Platform, StatusBar } from 'react-native'
import { Icon, Header, Left, Right, Text } from 'native-base'
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
        <Header style={{
          backgroundColor: color.primary,
          marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }}>
          <Left style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon name='ios-arrow-round-back' style={{
              fontSize: offset.o3,
              color: color.light,
              marginRight: offset.o2
            }} onPress={() => { this.props.navigation.navigate('Main') }} />
            <Text style={{
              color: color.light,
              fontSize: offset.o1 + 6
            }}>{this.props.title}</Text>
          </Left>
          <Right>

          </Right>
        </Header>
      )
    }

    return (
      <Header style={[styMain.header, {
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      }]}>
        <Left>
          <Icon name='menu' style={styMain.headerMenu}
            onPress={() => {
              this.props.navigation.openDrawer(this.props)
            }}
          />
        </Left>
        <Right>
          <Image source={
            require('../assets/upload/logo.png')
          } style={styMain.headerLogo} />
        </Right>
      </Header>
    )
  }
}