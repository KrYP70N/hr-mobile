import React, { Component } from 'react'
import { View, Text, Content, Row, Col, Icon, Toast } from 'native-base'
import { Image, AsyncStorage, TouchableOpacity, BackHandler, SafeAreaView } from 'react-native'
import po from './po'
import color from '../../constant/color'
import offset from '../../constant/offset'
import styMain from './main.style'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import BottomTab from '../../components/bottomtab.component'
import Heading from '../../components/header.component'
import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'
import DB from '../../model/db.model'

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
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('@hr:token')
        .then((res) => {
          const auth = DB.getToken(res)
          const id = DB.getUserId(res)
          this.setState({
            auth: DB.getToken(res),
            id: DB.getUserId(res)
          })
          AsyncStorage.getItem('@hr:endPoint')
            .then((res) => {
              const url = DB.getEndPoint(res)
              this.setState({
                url: DB.getEndPoint(res)
              })
              this.getProfile(url, auth, id)
              this.isLowest(url, auth, id)
            })
        })
    })
  }

  getProfile(url, auth, id) {
    APIs.Profile(url, auth, id)
      .then((res) => {
        if (res.status === 'success') {
          if (res.error) {
            Toast.show({
              text: 'Please login again. Your token is expired!',
              textStyle: {
                  textAlign: 'center'
              },
              style: {
                  backgroundColor: color.primary
              },
              duration: 6000
          })
            this.props.navigation.navigate('Login')
            
          } else {
            this.setState({
              profile: res.data,
              loading: false
            })
          }
        } else {
          Toast.show({
            text: 'Authentication Failed!',
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

  isLowest(url, auth, id) {
    APIs.Level(url, auth, id)
      .then((res) => {
        if (res.status == 'success') {
          if (res.error) {
            this.props.navigation.navigate('Login')
          } else {
            this.setState({
              lowestLevel: res.data.lowest_level
            })
          }
        } else {
          Toast.show({
            text: 'Authentication Failed!',
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

  render() {
    if (this.state.loading === true || this.state.profile === null) {
      return (
        <Loading info='request profile data ...' />
      )
    }

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

          {/* main menu */}
          <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 15,
                flexWrap: 'wrap'
            }}>
          {po.menu.map((card, key) => (
            <TouchableOpacity
                            style={{
                                display: (this.state.lowestLevel === true && (card.name == 'Approve Leave' || card.name == 'Approve OT')) ? 'none' : 'flex',
                                width: '48%',
                                padding: offset.o2,
                                backgroundColor: color.light,
                                marginTop: offset.o1 + offset.oh,
                                borderRadius: offset.o1,
                                borderColor: color.cardBorder,
                                borderWidth: 0.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 110,
                            }} key={key}
                            onPress={() => { this.props.navigation.navigate(card.navigate) }}
                            >
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} key={key}>
                                <Image source={card.icon} style={{
                                    width: 35,
                                    height: 35,
                                    marginBottom: offset.o1 + offset.oh
                                }} />
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito' }}>{card.name}</Text>
                            </View>
                        </TouchableOpacity>
          ))}

          </View>
        </Content>
        <BottomTab navigation={this.props.navigation} screen='main' />

      </SafeAreaView>
    )
  }
}