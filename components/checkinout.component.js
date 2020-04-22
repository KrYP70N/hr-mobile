import React, { Component } from 'react'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import * as geolib from 'geolib';


import { StyleSheet, Image, AsyncStorage, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { Text, Row, Col, Card, Body, View, Toast } from 'native-base'
import offset from '../constant/offset'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../constant/color';
import typography from '../constant/typography';
import APIs from '../controllers/api.controller';
import Modal from 'react-native-modal';
const height = Dimensions.get('screen').height;
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
    }
    // check in control
    this.CheckIn = () => {

      const fun = () => {
        if (this.state.geofencing) {
          // geo true
          APIs.Checkin(this.state.url, this.state.auth, this.state.id, {
            lat: this.state.location['latitude'],
            long: this.state.location['longitude']
          }).then((res) => {
            if (res.status === 'success') {
              this.setState({
                checkMessage: 'Success check in!',
                isModalVisible: true,
                
              })
            } else {
              this.setState({
                checkMessage: "You're already check in!",
                isModalVisible: true,
                
              })
              
            }
            this.CheckStatus()
          })
            .catch((error) => {
              this.props.navigation.navigate('Login')
            })
        } else {
          // geo false
          APIs.Checkin(this.state.url, this.state.auth, this.state.id)
            .then((res) => {
              if (res.status === 'success') {
                this.setState({
                  checkMessage: 'Success check in!',
                  isModalVisible: true,
                  
                })
                this.CheckStatus()
              } else {
                this.setState({
                  checkMessage: "You're already check in!",
                  isModalVisible: true,
                  
                })
              }
              this.CheckStatus()
            })
            .catch((error) => {
              this.props.navigation.navigate('Login')
            })
        }
      }

      if (this.state.status.Multiple_checkinout === true) {
        fun()
      } else {
        if (this.state.status.Checkin !== true) {
          fun()
        } else {
          this.setState({
            checkMessage: "You're already checked in!",
            isModalVisible: true,
            
          })
         
        }
      }

    }
    // checkout control
    this.CheckOut = () => {
      const fun = () => {
        if (this.state.geofencing) {
          // geo true
          APIs.Checkout(this.state.url, this.state.auth, this.state.id, {
            lat: this.state.location['latitude'],
            long: this.state.location['longitude']
          }).then((res) => {
            if (res.status === 'success') {
              this.setState({
                checkMessage: 'Success check out!',
                isModalVisible: true,
                
              })
            } else {
              this.setState({
                checkMessage:  "You're already check out!",
                isModalVisible: true,
                
              })
            }

            this.CheckStatus()
          })
            .catch((error) => {
              this.props.navigation.navigate('Login')
            })
        } else {
          // geo false
          APIs.Checkout(this.state.url, this.state.auth, this.state.id)
            .then((res) => {
              if (res.status === 'success') {
                this.setState({
                  checkMessage: 'Success check out!',
                  isModalVisible: true,                 
                })
               
              } else {
                this.setState({
                  checkMessage: "You're Already Check Out!",
                  isModalVisible: true,
                 
                })
                
              }
              this.CheckStatus()
            })
            .catch((error) => {
              this.props.navigation.navigate('Login')
            })
        }
      }
      if (this.state.status.Multiple_checkinout === true) {
        fun()
      } else {
        if (this.state.status.Checkout !== true) {
          fun()
        }else{
          this.setState({
            checkMessage: "You're already checked out!",
            isModalVisible: true,
            
          })
        }
      }
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
        let location = await Location.getCurrentPositionAsync({})
        this.setState({
          location: location.coords
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

  async componentDidUpdate() {

    if (this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
      APIs.Profile(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          this.setState({
            data: res.data,
            geofencing: res.data['General Information']['Geo Fencing'],
            // geofencing: false,
            radius: res.data['General Information']['Radius(m)'],
            officeCoord: {
              latitude: res.data['General Information']['Latitude'],
              longitude: res.data['General Information']['Longtitude']
            }
          })
        })
        .catch((error) => {
          this.props.navigation.navigate('Login')
        })

      if (this.state.status === null) {
        this.CheckStatus()
      }

    }

    if (this.state.location !== null && this.state.geofencing === true) {
      setTimeout(async () => {
        let location = await Location.getCurrentPositionAsync({})

        if (
          geolib.isPointWithinRadius(
            this.state.officeCoord,
            // this.state.officeCoord,
            {
              latitude: this.state.location['latitude'],
              longitude: this.state.location['longitude'],
            },
            this.state.radius
          )
        ) {
          this.setState({
            withinRadius: true
          })
        } else {
          this.setState({
            withinRadius: false
          })
        }

      }, 2000)
    }



  }

  render() {
    // locatoin update
    if (this.state.locError) {
      return (
        <View style={styles.errorBox}>
          <TouchableOpacity onPress={() => {
            IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
          }}>
            <Card style={styles.error}>
              <Image source={require('../assets/icon/location-2.png')} style={styles.errImg} />
              {/* <Text style={styles.errorTitle}>Location Error!</Text> */}
              <Text style={[styles.errorTxt, {
                textAlign: 'center'
              }]}>In order to use Check In / Check Out and Attendance Functions, you will need to turn on your location service.</Text>
            </Card>
          </TouchableOpacity>
        </View>
      )
    }

    // checking radius
    if (this.state.withinRadius === 'wait' && this.state.geofencing === true) {
      return (
        <View style={styles.errorBox}>
          <Card style={styles.error}>
            <Image source={require('../assets/icon/compass.png')} style={styles.errImg} />
            <Text style={styles.errorTitle}>Checking Radius!</Text>
            <Text style={styles.errorTxt}>It may take few seconds.</Text>
          </Card>
        </View>
      )
    }

    // checking radius
    if (this.state.withinRadius === false && this.state.geofencing === true) {
      return (
        <View style={styles.errorBox}>
          <Card style={styles.error}>
            <Image source={require('../assets/icon/location-3.png')} style={styles.errImg} />
            <Text style={styles.errorTitle}>You are out of office area!</Text>
            <Text style={styles.errorTxt}>Can't check in/out.</Text>
          </Card>
        </View>
      )
    }

    if (this.state.status === null) {
      return (
        <View style={styles.errorBox}>
          <Card style={styles.error}>
            <Image source={require('../assets/icon/location-3.png')} style={styles.errImg} />
            <Text style={styles.errorTitle}>loading data ...</Text>
            <Text style={styles.errorTxt}></Text>
          </Card>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
     <Card style={styles.cardHolder}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('CheckInOut', {location: this.state.location})
              //this.CheckInOut()
            }}>
              <View style={styles.card}>
                <Image
                  source={require('../assets/icon/checktime.png')}
                  style={[styles.icon]}
                />
                <Text style = {{marginTop: 5, color: color.primary}}>Get your Attendance!</Text>
                <Text
                  style={{
                    //opacity: this.state.status.Checkin === true && this.state.status.Multiple_checkinout === false ? 0.5 : 1,
                    fontFamily: 'Nunito-Bold',
                    fontSize: 16,
                    marginTop: 10,
                  }}
                >Check In/Check Out</Text>
              </View>
            </TouchableOpacity>
            </Card>
      <Modal isVisible={this.state.isModalVisible} >
          <View style={styles.ModelViewContainer}>
            <View style = {styles.iconView}>
            <Image source={require('../assets/icon/checktime.png')} style = {styles.dialogIcon}/>
            </View>
          <Text style={[styles.lanTitle, styles.lanTitleMM]}>{this.state.checkMessage}</Text>
            <View style={styles.ModalTextContainer}>
              <TouchableOpacity style={styles.CancelOpacityContainer}
                onPress={() => this.setState({ isModalVisible: false })} >
                <Text style={styles.modalTextStyle} >
                  {'Close'}
                </Text>
              </TouchableOpacity>
             
            </View>

          </View>
        </Modal>
      </View>
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
    borderRadius: 5,
    overflow: 'hidden'
  },
  card: {
    minHeight: 150,
    padding: offset.o3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: offset.o1
  },
  errorBox: {
    padding: 15
  },
  error: {
    backgroundColor: color.light,
    padding: offset.o3,
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
   bottom: Platform.OS === 'ios'? 15 : -20,
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
  ModalTextContainer: { width: '100%', flex: 1, position: 'absolute', bottom: 0},
  CancelOpacityContainer: {
    width: '100%',
    height: 50, 
    backgroundColor: color.primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  modalTextStyle: {color: '#fff', textAlign: 'center',},
  iconView: {
    width:'100%',
    alignItems: 'center',
  },
  dialogIcon: {
    width: 28,
    height: 28,
    marginBottom: offset.o1,
    marginTop: offset.o2,
  }

})

