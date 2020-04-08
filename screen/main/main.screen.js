import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea, Header, Left, Right, Toast } from 'native-base'
import { Image, AsyncStorage, Platform, StatusBar, TouchableOpacity, BackHandler, Modal, TouchableHighlight } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';

import po from './po'
import color from '../../constant/color'
import styMain from './main.style'

import Loading from '../../components/loading.component'

import APIs from '../../controllers/api.controller'
import Time from '../../controllers/time.controller'

// import ProfileModel from '../../model/profile.model'

import Heading from '../../components/header.component'
import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'

import DB from '../../model/db.model'
import moment from 'moment'

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      auth: null,
      id: null,
      profile: null,
      checkin: {
        status: true,
        disabled: false
      },
      checkout: {
        status: true,
        disabled: true
      },
      loading: true,
      modal: false,
      lowestLevel: true
    }

    this.getProfile = () => {
      APIs.Profile(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          if (res.status === 'success') {
            this.setState({
              profile: res.data
            })
            this.setState({
              loading: false
            })
          } else {
            // AsyncStorage.setItem('@hr:login', 'false')
            Toast.show({
              text: 'Connection time out. Please check your internet connection!',
              textStyle: {
                textAlign: 'center'
              },
              style: {
                backgroundColor: color.primary
              },
              duration: 6000
            })
          }
        })
    }

    this.checkToken = () => {
      AsyncStorage.getItem('@hr:token')
        .then((res) => {
          let current_date = new Date()
          let data = JSON.parse(res)
          let exp = data.exp
          this.setState({
            auth: DB.getToken(res),
            id: DB.getUserId(res)
          })
          AsyncStorage.getItem('@hr:endPoint')
            .then((res) => {
              this.setState({
                url: DB.getEndPoint(res)
              })
            })
        })
    }

    this.isLowest = () => {
      APIs.Level(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          if (res.status === 'success') {
            this.setState({
              lowestLevel: res.data.lowest_level
            })
          } else {
            Toast.show({
              text: 'Connection time out. Please check your internet connection!',
              textStyle: {
                textAlign: 'center'
              },
              style: {
                backgroundColor: color.primary
              },
              duration: 6000
            })
          }
        })
    }

  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        url: null,
        auth: null,
        id: null,
        profile: null,
        checkin: {
          status: true,
          disabled: false
        },
        checkout: {
          status: true,
          disabled: true
        },
        loading: true,
        modal: false,
        lowestLevel: true
      })
      this.checkToken()
    })
  }

  componentDidUpdate() {
    // profile request
    if (this.state.profile === null && this.state.url !== null && this.state.id !== null) {
      this.getProfile()
      this.isLowest()
    }
  }

  render() {
    if (this.state.loading === true || this.state.profile === null) {
      return (
        <Loading info='request profile data ...' />
      )
    }

    return (
      <Container>
        <Heading navigation={this.props.navigation} />
        <Content>
          <TouchableOpacity style={styMain.banner}
            onPress={() => {
              this.props.navigation.navigate('Profile')
            }
            }>
            <Clock style={styMain.time} navigation={this.props.navigation} />

            <Row>
              <Col style={styMain.userInfo}>
                <Image source={
                  this.state.profile['Profile Image'][0] === false ?
                    require('../../assets/icon/user.png') :
                    {
                      uri: `data:${this.state.profile['Profile Image'][1]};base64,${this.state.profile['Profile Image'][0]}`
                    }
                } style={styMain.profilePic} />
                <View style = {{marginLeft: 15}}>
                  {
                    this.state.profile['General Information']['Employee Name'] ?
                      <Text style={styMain.name}>
                        {this.state.profile['General Information']['Employee Name']} </Text> :
                      <Text style={styMain.name}>Unknown User</Text>

                  }
                  {
                    this.state.profile['General Information']['Job Position'] ?
                      <Text style={[styMain.pos]}>{this.state.profile['General Information']['Job Position']} </Text> :
                      <Text style={[styMain.pos]}>Untitled Position</Text>
                  }
                </View>

              </Col>
              <Col>
                <Icon name="ios-arrow-round-forward" style={styMain.profileDetail}></Icon>
              </Col>
            </Row>
          </TouchableOpacity>

          {/* check in/out */}
          <View style={styMain.checkinout}>
            <CheckInOut navigation={this.props.navigation} />
          </View>

          {/* menu */}
          <Row style={styMain.menuHolder}>
            <Col style={styMain.cardLft}>
              <Card style={!po.menu[1].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[1].navigate ?
                    this.props.navigation.navigate(
                      po.menu[1].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={styMain.imgIcn} source={require('../../assets/icon/attendance.png')} />
                      <Text>{po.menu[1].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={!po.menu[2].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[2].navigate ?
                    this.props.navigation.navigate(
                      po.menu[2].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      {/* <Icon name={po.menu[2].icon} style={styMain.icon} /> */}
                      <Image style={styMain.imgIcn} source={require('../../assets/icon/leave.png')} />
                      <Text>{po.menu[2].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

          <Row style={styMain.menuHolder}>
            <Col style={styMain.cardLft}>
              <Card style={!po.menu[3].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[3].navigate ?
                    this.props.navigation.navigate(
                      po.menu[3].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      {/* <Icon name={po.menu[3].icon} style={styMain.icon} /> */}
                      <Image style={[styMain.imgIcn, { height: 45 }]} source={require('../../assets/icon/ot.png')} />
                      <Text>{po.menu[3].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={!po.menu[4].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[4].navigate ?
                    this.props.navigation.navigate(
                      po.menu[4].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      {/* <Icon name={po.menu[4].icon} style={styMain.icon} /> */}
                      <Image style={[styMain.imgIcn, { height: 40 }]} source={require('../../assets/icon/payroll.png')} />
                      <Text>{po.menu[4].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

          <Row style={[styMain.menuHolder, {
            display: this.state.lowestLevel === true ? 'none' : 'flex'
          }]}>
            <Col style={styMain.cardLft}>
              <Card style={!po.menu[5].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[5].navigate ?
                    this.props.navigation.navigate(
                      po.menu[5].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      {/* <Icon name={po.menu[3].icon} style={styMain.icon} /> */}
                      <Image style={[styMain.imgIcn, { width: 50, height: 42 }]} source={require('../../assets/icon/approve-leave.png')} />
                      <Text>{po.menu[5].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={!po.menu[6].navigate ? styMain.disabledMenu : null}>
                <TouchableOpacity onPress={() =>
                  po.menu[6].navigate ?
                    this.props.navigation.navigate(
                      po.menu[6].navigate,
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      {/* <Icon name={po.menu[4].icon} style={styMain.icon} /> */}
                      <Image style={[styMain.imgIcn, { width: 45, height: 43 }]} source={require('../../assets/icon/approve-ot.png')} />
                      <Text>{po.menu[6].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

        </Content>

      </Container>
    )
  }
}