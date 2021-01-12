import React, { Component } from 'react'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { StyleSheet, Image, AsyncStorage, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { Text, Card, View, } from 'native-base'
import offset from '../constant/offset'
import color from '../constant/color';
import typography from '../constant/typography';
import APIs from '../controllers/api.controller';
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width;
export default class CheckInOut extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      auth: null,
      id: null,
      location: null,
      locError: null,
      data: null,
      geofencing: null,
      officeCoord: null,
      radius: null,
      withinRadius: 'wait',
      status: null,
      isModalVisible: false,
      checkMessage: '',
      attOrBreak: 'attendance'
    }

    // check status 
    this.CheckStatus = () => {
      APIs.CheckStatus(this.state.id, this.state.auth, this.state.url)
        .then((res) => {
          if (res.status === 'success') {
            this.setState({
              status: res.data
            })
          } else {
            this.setState({
              status: null
            })
          }
        })
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        locError: true
      });
    } else {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          locError: true
        })
      } else {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        this.setState({
          location: location.coords,
          locError: false
        })
      }
    }

    AsyncStorage.getItem('@hr:endPoint')
      .then((res) => {
        this.setState({
          url: JSON.parse(res)['ApiEndPoint']
        })
      })

    AsyncStorage.getItem('@hr:token')
      .then((res) => {
        let data = JSON.parse(res)
        this.setState({
          auth: data['key'],
          id: data['id'],
        })
      })

  }

  async getLocationService() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        locError: true
      });
    } else {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          locError: true
        })
      } else {

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        this.setState({
          location: location.coords,
          locError: false
        })
      }
    }
  }

  render() {

    // locatoin update
    if (this.state.locError) {
      return (
        <View style={styles.errorBox}>
          <TouchableOpacity onPress={() => {
            this.getLocationService()
            //IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
          }}>
            <Card style={styles.error}>
              <Image source={require('../assets/icon/location-2.png')} style={styles.errImg} />
              <Text style={[styles.errorTxt, {
                textAlign: 'center'
              }]}>In order to use Check In / Check Out and Attendance Functions, you will need to turn on your location service.</Text>
            </Card>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{padding: 15 }}>
     
        <View style={styles.cardHolder}>
        <View style={{flexDirection: 'row', borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
            <TouchableOpacity onPress={() => {
              this.setState({
                attOrBreak: 'attendance'
              })
            }} style={{width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: color.light, borderTopLeftRadius: 5}}>
              <Text style={{color: color.primary, fontSize: 16, fontFamily: 'Nunito'}}>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({
                attOrBreak: 'breakInOut'
              })
            }} style={{width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: color.breakinout, borderTopRightRadius: 5}}>
              <Text style={{color: color.light}}>Break In</Text>
            </TouchableOpacity>
        </View>
          {/* <Image
            source={require('../assets/icon/checkintime.png')}
            style={[styles.icon]}
          />
           <Text style={{fontFamily: 'Nunito', color: color.primary, fontSize: 18 }}>Get your Attendance!</Text> */}
          <View style={{width: '100%', padding: 10, alignItems: 'center', backgroundColor: this.state.attOrBreak == 'attendance' ? color.light : color.breakinout, borderBottomLeftRadius: 5, borderBottomRightRadius: 5,}}>
           {
             this.state.attOrBreak == "attendance" ?
             <View style={{
              flexDirection: 'row',
              justifyContent: "space-between",
              width: '95%',
              marginTop: 10,
            }}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CheckIn'), { geofencing: this.state.geofencing }
              }}>
                <View style={{width: width/2 - 40,  borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',}}>
                  <Image
                    source={require('../assets/icon/checkin.png')}
                    style={{ width: 30, height: 30, tintColor: color.light }}
                  />
                  <Text style={{fontFamily: 'Nunito', color: '#fff', marginTop: 5 }}>Check In</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CheckOut')
              }}>
                <View style={{width: width/2 - 40, borderRadius: 10,paddingHorizontal: 30, paddingVertical: 10, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',}}>
                  <Image
                    source={require('../assets/icon/checkout.png')}
                    style={{ width: 30, height: 30, tintColor: color.light }}
                  />
                  <Text style={{fontFamily: 'Nunito', color: '#fff', marginTop: 5 }}>Check Out</Text>
                </View>
              </TouchableOpacity>
            </View>
            :
            <View style={{
              flexDirection: 'row',
              justifyContent: "space-between",
              width: '95%',
              marginTop: 10,
            }}>
             <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CheckOut')
              }}>
                <View style={{width: width/2 - 40, borderRadius: 10,paddingHorizontal: 30, paddingVertical: 10, height: 70, borderColor: color.primary, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.light}}>
                  <Image
                    source={require('../assets/icon/checkout.png')}
                    style={{ width: 30, height: 30, tintColor: color.primary }}
                  />
                  <Text style={{fontFamily: 'Nunito', color: color.primary, marginTop: 5 }}>Break Out</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CheckIn'), { geofencing: this.state.geofencing }
              }}>
                <View style={{width: width/2 - 40,  borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, height: 70,borderColor: color.primary, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.light}}>
                  <Image
                    source={require('../assets/icon/checkin.png')}
                    style={{ width: 30, height: 30, tintColor: color.primary}}
                  />
                  <Text style={{fontFamily: 'Nunito', color: color.primary, marginTop: 5 }}>Break In</Text>
                </View>
              </TouchableOpacity>
             
            </View>
           }

            {/* Break In Out View */}
            </View>
        </View>

      </View>
      // <View>
      //   <Card style={styles.cardHolder}>
      //     <View style={{}}>
      // <Image
      //   source={require('../assets/icon/checkintime.png')}
      //   style={[styles.icon]}
      // />
      //       <Text style={{fontFamily: 'Nunito', color: color.primary, fontSize: 18 }}>Get your Attendance!</Text>
            // <View style={{
            //   flexDirection: 'row',
            //   justifyContent: "space-between",
            //   width: '100%',
            //   marginTop: 10,
            // }}>
            //   <TouchableOpacity onPress={() => {
            //     this.props.navigation.navigate('CheckIn'), { geofencing: this.state.geofencing }
            //   }}>
            //     <View style={{ borderRadius: 10, width: width / 3, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',}}>
            //       <Image
            //         source={require('../assets/icon/checkin.png')}
            //         style={{ width: 30, height: 30 }}
            //       />
            //       <Text style={{fontFamily: 'Nunito', color: '#fff', marginTop: 5 }}>Check In</Text>
            //     </View>
            //   </TouchableOpacity>
            //   <TouchableOpacity onPress={() => {
            //     this.props.navigation.navigate('CheckOut')
            //   }}>
            //     <View style={{ borderRadius: 10, width: width / 3, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',}}>
            //       <Image
            //         source={require('../assets/icon/checkout.png')}
            //         style={{ width: 30, height: 30, }}
            //       />
            //       <Text style={{fontFamily: 'Nunito', color: '#fff', marginTop: 5 }}>Check Out</Text>
            //     </View>
            //   </TouchableOpacity>
            // </View>
      //     </View>

      //   </Card>
      //   <Modal isVisible={this.state.isModalVisible} >
      //     <View style={styles.ModelViewContainer}>
      //       <View style={styles.iconView}>
      //         <Image source={require('../assets/icon/checktime.png')} style={styles.dialogIcon} />
      //       </View>
      //       <Text style={[styles.lanTitle, styles.lanTitleMM]}>{this.state.checkMessage}</Text>
      //       <View style={styles.ModalTextContainer}>
      //         <TouchableOpacity style={styles.CancelOpacityContainer}
      //           onPress={() => this.setState({ isModalVisible: false })} >
      //           <Text style={styles.modalTextStyle} >
      //             {'Close'}
      //           </Text>
      //         </TouchableOpacity>

      //       </View>

      //     </View>
      //   </Modal>
      // </View>
    )
  }
}

let styles = StyleSheet.create({
  cardRow: {
    marginBottom: offset.o3
  },
  left: {
    paddingLeft: 15,
    paddingRight: offset.oh
  },
  right: {
    paddingLeft: offset.o1,
    paddingRight: 15
  },
  cardHolder: {
    backgroundColor: color.light,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  card: {
    //minHeight: 150,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: width / 2 - 50
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: offset.o1
  },
  errorBox: {
    padding: 10
  },
  error: {
    backgroundColor: color.light,
    padding: 14.3,
    display: 'flex',
    alignItems: 'center'
  },
  errorTitle: {
    ...typography.subHeader
  },
  errorTxt: {
    ...typography.placeholder,
    fontSize: 14
  },
  errImg: {
    width: 64,
    height: 64,
    marginBottom: offset.o2
  },
  ModelViewContainer: {
    width: width + 30,
    height: 200,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: -30,
    bottom: Platform.OS === 'ios' ? 15 : -20,
  },
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
  ModalTextContainer: { width: '100%', flex: 1, position: 'absolute', bottom: 0 },
  CancelOpacityContainer: {
    width: '100%',
    height: 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextStyle: { color: '#fff', textAlign: 'center', },
  iconView: {
    width: '100%',
    alignItems: 'center',
  },
  dialogIcon: {
    width: 28,
    height: 28,
    marginBottom: offset.o1,
    marginTop: offset.o2,
  }

})

