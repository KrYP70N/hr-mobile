import React, { Component } from 'react'
import { View, Text, Content, Row, Col, Icon, Toast } from 'native-base'
import { Image, AsyncStorage, TouchableOpacity, BackHandler, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native'
import po from './po'
import color from '../../constant/color'
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import styMain from './main.style'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import BottomTab from '../../components/bottomtab.component'
import Heading from '../../components/header.component'
import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'
import DB from '../../model/db.model'
const width = Dimensions.get('screen').width

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
      lowestLevel: true,
      time: null
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
              // this.getServerTime(url, auth, id)
            })
        })
    })
  }

  getProfile(url, auth, id) {
    APIs.Profile(url, auth, id)
      .then((res) => {
        if (res.status === 'success') {
          if (res.error) {
            ErrorMessage('token', this.props.navigation)
          } else {
            this.setState({
              profile: res.data,
              loading: false
            })
          }
        } else {
          //ErrorMessage('serverError', this.props.navigation)
        }
      })
  }

  isLowest(url, auth, id) {
    APIs.Level(url, auth, id)
      .then((res) => {
        if (res.status == 'success') {
          if (res.error) {
            ErrorMessage('token', this.props.navigation)
          } else {
            this.setState({
              lowestLevel: res.data.lowest_level
            })
          }
        } else {
          //ErrorMessage('serverError', this.props.navigation)
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
        <View style={{ flex: 1 }}>
          <View style={{ position: 'relative', width: '100%', height: width / 2 + 90, }}>
            <View style={{ width: '100%', paddingBottom: 30, backgroundColor: color.primary, 
            height: width / 2 - 40, 
            paddingHorizontal: 15, paddingTop: 10,
            alignItems: 'center' }}>
              <Clock style={styMain.time} navigation={this.props.navigation} />
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styMain.userInfo}>
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

                </View>
                <View>
                  <Image style={{ width: 30, height: 30, alignItems: 'flex-end' }} source={require('../../assets/icon/right_arrow.png')} />
                </View>
              </View>
            </View>
            <View style={{height: (width/2 + 130) - (width/2 - 50), width: '100%', position: 'absolute', top: (width/2 - 100), marginVertical: 20 }}>
              <CheckInOut navigation={this.props.navigation} />
            </View>
            {/* <View style={{ width: '100%', position: 'absolute', bottom:- 10, marginVertical: 20 }}>
              <CheckInOut navigation={this.props.navigation} />
            </View> */}
          </View>

          <FlatList 
         numColumns={2}
           data={po.menu}
           renderItem={({item, index}) => {
             return(
              <TouchableOpacity
                  style={{
                    display: (this.state.lowestLevel === true && (item.name == 'Approve Leave' || item.name == 'Approve OT')) ? 'none' : 'flex',
                    width: width/2 - 20,
                    padding: offset.o2,
                    backgroundColor: color.light,
                    //marginTop: offset.o1 + offset.oh,
                    borderRadius: offset.o1,
                    borderColor: color.cardBorder,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                    height: 110,
                  }}
                  onPress={() => { this.props.navigation.navigate(item.navigate) }}
                >
                  <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Image source={item.icon} style={{
                      width: 35,
                      height: 35,
                      marginBottom: offset.o1 + offset.oh
                    }} />
                    <Text style={{ fontSize: 14, fontFamily: 'Nunito' }}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
             )
           }}
           showsVerticalScrollIndicator={false}
           keyExtractor={(item, index) => index.toString()}
         />
        </View>
        <BottomTab navigation={this.props.navigation} screen='main' />
      </SafeAreaView>
    )
  }
}