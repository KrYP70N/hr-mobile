import React, { Component } from 'react'
import { View, Text, Content, Row, Col, Icon, Card, CardItem, Body, Toast } from 'native-base'
import { Image, AsyncStorage, TouchableOpacity, BackHandler, SafeAreaView } from 'react-native'

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
// export default class Main extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       url: null,
//       auth: null,
//       id: null,
//       profile: null,
//       checkin: {
//         status: true,
//         disabled: false
//       },
//       checkout: {
//         status: true,
//         disabled: true
//       },
//       loading: true,
//       modal: false,
//       lowestLevel: true
//     }

//     this.getProfile = (url, auth, id) => {
//       console.log("Auth", auth)
//       console.log("url", url)
//       console.log("id", id)
//       APIs.Profile(url, auth, id)
//         .then((res) => {
//           console.log("Arrive Main")
//           if (res.status == 'success') {
//             //console.log("main token expire", res.error)
//             // if(res.error){
//             //   this.props.navigation.navigate("Login")
//             //   Toast.show({
//             //     text: 'Please login again. Your token is expried!',
//             //     textStyle: {
//             //       textAlign: 'center'
//             //     },
//             //     style: {
//             //       backgroundColor: color.primary
//             //     },
//             //     duration: 6000
//             //   })

//             // }else{
//               this.setState({
//                 profile: res.data
//               })
//            // }

//             this.setState({
//               loading: false
//             })
//           } else {
//             console.log("Main Error Arrive Here::::::")
//             //this.props.navigation.navigate('Login')
//             //AsyncStorage.setItem('@hr:login', 'false')
//           }
//         })
//     }

//     this.checkToken = () => {
//       AsyncStorage.getItem('@hr:token')
//         .then((res) => {
//           let auth = DB.getToken(res)
//           let id = DB.getUserId(res)
//           this.setState({
//             auth: DB.getToken(res),
//             id: DB.getUserId(res)
//           })
//           AsyncStorage.getItem('@hr:endPoint')
//             .then((res) => {
//               let url = DB.getEndPoint(res)
//               this.setState({
//                 url: DB.getEndPoint(res)
//               })

//               this.getProfile(url, auth, id)
//               this.isLowest(url, auth, id)
//             })
//         })
//     }

//     this.isLowest = (url, auth, id) => {
//       APIs.Level(url, auth, id)
//         .then((res) => {
//           if (res.status === 'success') {
//             // if(res.error){
//             //   this.props.navigation.navigate('Login')
//             // }else{
//               this.setState({
//                 lowestLevel: res.data.lowest_level
//               })
//             //} 
//           } else {
//           //  this.setState({
//           //    profile: null
//           //  })
//           }
//         })
//     }
//   }

//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', () => {
//       return true
//     })
//     this.props.navigation.addListener('focus', () => {
//       AsyncStorage.getItem('@hr:token')
//         .then((res) => {
//           let auth = DB.getToken(res)
//           let id = DB.getUserId(res)
//           this.setState({
//             auth: DB.getToken(res),
//             id: DB.getUserId(res)
//           })
//           AsyncStorage.getItem('@hr:endPoint')
//             .then((res) => {
//               let url = DB.getEndPoint(res)
//               this.setState({
//                 url: DB.getEndPoint(res)
//               })

//               this.getProfile(url, auth, id)
//               this.isLowest(url, auth, id)
//             })
//         })
//     })
//   }

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
          console.log("Main Screen Auth", DB.getToken(res))
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
            this.props.navigation.navigate('Login')
          } else {
            this.setState({
              profile: res.data,
              loading: false
            })
          }
        } else {
          // AsyncStorage.setItem('@hr:login', 'false')
          //console.log("Arrive ")
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
        console.log("Main Level Result", res)
        if (res.status == 'success') {
          if (res.error) {
            this.props.navigation.navigate('Login')
          } else {
            this.setState({
              lowestLevel: res.data.lowest_level
            })
          }
        } else {
          console.log("Arrive Level Error")
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

  // componentDidUpdate() {
  //   // profile request
  //   if (this.state.profile === null && this.state.url !== null && this.state.id !== null) {
  //     this.getProfile(this.state.url, this.state.auth, this.state.id)
  //     this.isLowest(this.state.url, this.state.auth, this.state.id)
  //   }
  // }

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