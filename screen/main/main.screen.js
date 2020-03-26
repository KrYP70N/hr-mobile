import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea, Header, Left, Right } from 'native-base'
import { Image, AsyncStorage, Platform, StatusBar, TouchableOpacity, BackHandler, Alert, StyleSheet} from 'react-native'

// import { TouchableOpacity } from 'react-native-gesture-handler'

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
import Modal from 'react-native-modal';

import DB from '../../model/db.model'
import moment from 'moment'

export default class Main extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
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
      isModalVisible: false,
    }

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );

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
            AsyncStorage.setItem('@hr:login', 'false')
          }
        })
        .catch((error) => {
          this.props.navigation.navigate('Login')
        })
    }

    this.checkToken = () => {
      AsyncStorage.getItem('@hr:token')
      .then((res) => {
        let current_date = new Date()
        let data = JSON.parse(res)
        let exp = data.exp
        
        let dif = moment(exp).diff(moment(new Date()), 'hours')

        if(dif < 9)  {
          this.setState({
            loading: true
          })
          
          // check url 
          AsyncStorage.getItem('@hr:endPoint')
          .then((res) => {
            let url = JSON.parse(res)
            this.setState({
              url: url.ApiEndPoint
            })
            APIs.RefreshToken(url.ApiEndPoint, data.key)
            .then((res) => {
              if(res.status === 'success') {
                let date = new Date()
                let exp_date = moment(date).add(60000, 'seconds')
                AsyncStorage.setItem('@hr:token', JSON.stringify({
                    key: 'Bearer '+ res.data.access_token,
                    // key: res.data.access_token,
                    id: res.data.employee_id,
                    exp: exp_date
                }))
              } else {
                this.props.navigation.navigate('Login')
              }
              this.setState({
                loading: false
              })
            })
          })

        } else {
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
        }
      })
    }
  }

  backAction = () => {
    this.setState({
      isModalVisible: true
    })
    return true;
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  );
    //this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction)
    this.checkToken()
    this.props.navigation.addListener('focus', () => {
      this.checkToken()
      if (this.state.url !== null && this.state.id !== null) {
        this.getProfile()
      }

    })
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    // this.backHandler.remove();
    // this.setState({
    //   isModalVisible: false
    // })
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };

  componentDidUpdate() {
    // profile request
    if (this.state.profile === null && this.state.url !== null && this.state.id !== null) {
      this.getProfile()
    }
  }

  exitFromApp(){
    this.setState({
      isModalVisible: false
    })
    BackHandler.exitApp();
  }

  render() {
    if (this.state.loading === true || this.state.profile === null) {
      return (
        <Loading info='request profile data ...'/>
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
                <View>
                  <Text style={styMain.name}>
                    {/* emp name */}
                    {
                      this.state.profile['General Information']['Employee Name'] ?
                      this.state.profile['General Information']['Employee Name'] :
                      'Unknown User'
                    }
                  </Text>
                  <Text style={[styMain.pos]}>
                    {/* emp position */}
                    {
                      this.state.profile['General Information']['Job Position'] ?
                      this.state.profile['General Information']['Job Position'] :
                      'Untitled Position'
                    }
                  </Text>

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

          <Row style={styMain.menuHolder}>
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
                      <Image style={[styMain.imgIcn, { height: 45 }]} source={require('../../assets/icon/ot.png')} />
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
                      <Image style={[styMain.imgIcn, { height: 40 }]} source={require('../../assets/icon/payroll.png')} />
                      <Text>{po.menu[6].name}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </Col>
          </Row>

        </Content>
        <Modal isVisible={this.state.isModalVisible} >
          <View style={styles.ModelViewContainer}>
            <Text style={[styles.lanTitle, styles.lanTitleMM]}>{'Are you sure want to exit?'}</Text>
            <View style={styles.ModalTextContainer}>
              <TouchableOpacity style={styles.CancelOpacityContainer}
                onPress={() => this.setState({ isModalVisible: false })} >
                <Text style={styles.modalTextStyle} >
                  {'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.OkOpacityContainer}
                onPress={() => { this.exitFromApp() }} >
                <Text style={styles.modalTextStyle} >
                  {'OK'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  ModelViewContainer: { width: '75%', height: 130, backgroundColor: '#f2f2f2', borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 20, marginLeft: 'auto', marginRight: 'auto', elevation: 5, shadowColor: '#000000', shadowOpacity: 1, shadowOffset: { height: 10, width: 10 },},
  lanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  lanTitleMM: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  ModalTextContainer: {flexDirection: 'row', justifyContent: 'space-between', width: '100%', flex: 1, alignItems: 'center',},
  CancelOpacityContainer: {marginLeft: 10,width: '45%',height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 1,shadowOffset: { height: 10, width: 10 },},
  OkOpacityContainer: {marginRight: 10,width: '45%',height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 1,shadowOffset: { height: 10, width: 10 },},
  modalTextStyle: {color: color.primary, textAlign: 'center',},

})