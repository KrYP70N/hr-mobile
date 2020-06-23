import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea, Header, Left, Right, Toast } from 'native-base'
import { Image, AsyncStorage, Platform, StatusBar, TouchableOpacity, BackHandler, Modal, SafeAreaView } from 'react-native'

import po from './po'
import color from '../../constant/color'
import styMain from './main.style'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import BottomTab from '../../components/bottomtab.component'
import Heading from '../../components/header.component'
import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'
import DB from '../../model/db.model'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import * as geolib from 'geolib';
export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      auth: null,
      id: null,
      profile: null,
      loading: true,
      modal: false,
      location: null,
      locError: null,
      lowestLevel: true,
      refresh: false,
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

    this.isLowest = (auth, url, id) => {
      APIs.Level(url, auth, id)
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

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    this.props.navigation.addListener('focus', () => {
      this.setState({
        refresh: !this.state.refresh
      })
      AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
          let date = new Date()
          const currentYear = date.getFullYear()
          const url = JSON.parse(res).ApiEndPoint
          this.setState({ url: JSON.parse(res).ApiEndPoint })
          AsyncStorage.getItem('@hr:token')
            .then((res) => {
              const auth = JSON.parse(res).key;
              const id = JSON.parse(res).id;
              this.setState({
                auth: JSON.parse(res).key,
                id: JSON.parse(res).id
              })
              this.getProfileData(auth, id, url);
              this.isLowest(auth, url, id)

            })
        })
    })
  }

  getProfileData(auth, id, url) {
    APIs.Profile(url, auth, id)
      .then((res) => {
        if (res.status === 'success') {
          this.setState({
            profile: res.data
          })
          this.setState({
            loading: false
          })
        } else {
          console.log("Profile Data Error")
          // AsyncStorage.setItem('@hr:login', 'false')
          // Toast.show({
          //   text: 'Connection time out. Please check your internet connection!',
          //   textStyle: {
          //     textAlign: 'center'
          //   },
          //   style: {
          //     backgroundColor: color.primary
          //   },
          //   duration: 6000
          // })
        }
      })
  }

  // componentDidUpdate() {
  //   // profile request
  //   if (this.state.profile === null && this.state.url !== null && this.state.id !== null && this.state.auth !== null) {
  //     this.getProfileData(this.state.auth, this.state.id, this.state.url)
  //     this.isLowest()
  //   }
  // }

  render() {
    if (this.state.loading === true || this.state.profile === null) {
      return (
        <Loading info='request profile data ...' />
      )
    }

    console.log("Lowest Level", this.state.lowestLevel)

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                <View style={{ marginLeft: 15 }}>
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

          {/* including dashboard */}
          <Row style={styMain.menuHolder}>
            <Col style={styMain.cardLft}>
              <Card style={[!po.menu[0].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[0].navigate ?
                    this.props.navigation.navigate(
                      po.menu[0].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={styMain.imgIcn} source={require('../../assets/icon/dashboard.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[0].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={[!po.menu[1].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[1].navigate ?
                    this.props.navigation.navigate(
                      po.menu[1].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={styMain.imgIcn} source={require('../../assets/icon/attendance.png')} />
                      <Text style={styMain.menuTxt} >{po.menu[1].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

          <Row style={styMain.menuHolder}>
            <Col style={styMain.cardLft}>
              <Card style={[!po.menu[2].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[2].navigate ?
                    this.props.navigation.navigate(
                      po.menu[2].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={styMain.imgIcn} source={require('../../assets/icon/leave.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[2].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={[!po.menu[3].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[3].navigate ?
                    this.props.navigation.navigate(
                      po.menu[3].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={[styMain.imgIcn, { height: 45 }]} source={require('../../assets/icon/ot.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[3].name}</Text>
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
              <Card style={[!po.menu[4].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[4].navigate ?
                    this.props.navigation.navigate(
                      po.menu[4].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={[styMain.imgIcn, { width: 50, height: 42 }]} source={require('../../assets/icon/approve-leave.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[4].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={[!po.menu[5].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[5].navigate ?
                    this.props.navigation.navigate(
                      po.menu[5].navigate,
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={[styMain.imgIcn, { width: 45, height: 43 }]} source={require('../../assets/icon/approve-ot.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[5].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

          <Row style={styMain.menuHolder}>
            <Col style={styMain.cardLft}>
              <Card style={[!po.menu[6].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[6].navigate ?
                    this.props.navigation.navigate(
                      po.menu[6].navigate
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={[styMain.imgIcn, { width: 46, height: 47 }]} source={require('../../assets/icon/payroll.png')} />
                      <Text style={styMain.menuTxt}>{po.menu[6].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
            <Col style={styMain.cardRight}>
              <Card style={[!po.menu[7].navigate ? styMain.disabledMenu : null, {
                borderRadius: 10,
                overflow: 'hidden'
              }]}>
                <TouchableOpacity onPress={() =>
                  po.menu[7].navigate ?
                    this.props.navigation.navigate(
                      po.menu[7].navigate, { pageFrom: "Main" }
                    ) : null
                }>
                  <CardItem>
                    <Body style={styMain.menuBody}>
                      <Image style={[styMain.imgIcn, { width: 46, height: 47 }]} source={require('../../assets/icon/noticebo.png')} />
                      <Text style={styMain.menuTxt} >{po.menu[7].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

        </Content>
        <BottomTab navigation={this.props.navigation} screen='main' />

      </SafeAreaView>
    )
  }
}