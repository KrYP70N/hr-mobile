import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'

// native base
import {
  Toast
} from 'native-base'

// icon set
import Icon from 'react-native-vector-icons/Feather';

// location
import * as Location from 'expo-location'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import { isPointWithinRadius } from 'geolib'

// import constant & style
import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import main from '../constant/main.constant'

// import component
import Card from '../components/card.component'
import Clock from '../components/clock.component'

// import controller
import APIs from '../controller/api.controller'


export default class MainScreen extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = {
      token: {
        id: this.props.navigation.state.params.id,
        val: this.props.navigation.state.params.token
      },
      user: null,
      location: null,
      errorMessage: null
    }
  }
  
  // get location
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  // didmount
  componentDidMount() {
    // check location
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    // load user
    APIs.getProfile(this.state.token.val, this.state.token.id)
      .then((res) => {
        if (res.status === 'success') {
          this.setState({
            user: res.data
          })
        } else {
          Toast.show({
            text: "Sorry, connection time out!",
            buttonText: "Okay",
            position: "bottom"
          })
        }
      })
  }
  
  // nav options
  static navigationOptions = navData => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          navData.navigation.openDrawer()
        }}>
          {/* <Image style={styles.headerImage} source={require('../assets/icons/Menu.png')} onPress={() => {
                        navData.navigation.openDrawer();
                    }} /> */}
          <Icon active name='menu' style={[style.h2, style.textSecondary, style.ml20]} onPress={() => {
            navData.navigation.openDrawer();
          }} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    // profile pic
    let picture = require('../assets/icon/user.png')
    if(this.state.user !== null) {
      if(this.state.user.data['Profile Picture'][0] !== false) {
        picture = {
          uri: `
            data:${this.state.user.data['Profile Picture'][1]};base64,${this.state.user.data['Profile Picture'][0]}
          `
        }
      }
    }

    return (
      <ScrollView>
        {/* banner section */}
        <TouchableNativeFeedback 
          onPress={
            () => this.props.navigation.navigate('ProfileScreen', {
              user: this.state.user,
              token: this.state.token
            })
            
          }>
          <View style={main.banner}>
            <Clock style={[main.bannerText, style.textLight, style.mb20, style.mt20]} token={this.state.token.val}/>
            <View style={[main.bannerProfile, style.mb50]}>
              <View style={[main.info]}>
                <View style={main.profile}>
                  {
                    this.state.user === null ? 
                    <Image
                      style={{
                          width: 64,
                          height: 64,
                          position: 'absolute',
                          top: 0
                        }}
                      source={require('../assets/icon/user.png')}
                    /> : 
                    <Image 
                      style={{
                        width: 64,
                        height: 64,
                        position: 'absolute',
                        top: 0
                      }}
                      source={picture}
                    />
                  }
                </View>
                <View>
                  <Text style={[style.textLight, style.h2]}>
                    {
                      this.state.user === null ? null : 
                      this.state.user.data['Employee Name']
                    }
                  </Text>
                  <Text style={[style.textLight]}>
                    {
                      this.state.user === null ? null : 
                      this.state.user.data['Job Position'] === false ?
                      'untiled position' : this.state.user.data['Job Position']
                    }
                  </Text>
                </View>
              </View>
              <View style={[main.bannerLink]}>
                <Icon active name='arrow-right' style={[style.h1, style.textLight, style.textRight]}></Icon>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
        {/* banner section */}
        <View style={main.panel}>
          <View style={main.listContainer}>
            {/* check in/out */}
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'clock',
                label: 'Check In',
                layout: 'row'
              },
              placeholder: "You haven't check in yet.",
              click: () => {
                {/* alert(this.state.location) */}
                if(this.state.location !== null) {
                  let userLat = this.state.user.data['Latitude']
                  let userLong = this.state.user.data['Longtitude']
                  {/* let isCenter =  isPointWithinRadius(
                    {latitude: userLat, longitude: userLong},
                    {latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude},
                    this.state.user.data['Radius(m)']) */}
                  let isCenter =  isPointWithinRadius(
                    {latitude: userLat, longitude: userLong},
                    {latitude: userLat, longitude: userLong},
                    9
                  )
                  isCenter ? alert('check in success') : alert('out of range')
                } else {
                  alert('please check your GPS setting!')
                }
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'clock',
                label: 'Check Out',
                layout: 'row'
              },
              placeholder: "Don't forget to check out.",
              click: () => {
                {/* alert(this.state.location) */}
                if(this.state.location !== null) {
                  let userLat = this.state.user.data['Latitude']
                  let userLong = this.state.user.data['Longtitude']
                  {/* let isCenter =  isPointWithinRadius(
                    {latitude: userLat, longitude: userLong},
                    {latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude},
                    this.state.user.data['Radius(m)']) */}
                  let isCenter =  isPointWithinRadius(
                    {latitude: userLat, longitude: userLong},
                    {latitude: userLat, longitude: userLong},
                    9
                  )
                  isCenter ? alert('check out success') : alert('out of range')
                } else {
                  alert('please check your GPS setting!')
                }
              }
            }} />

            {/* navigation list */}
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'layout',
                label: 'Dashboard',
                layout: 'column'
              },
              click: () => {
                this.props.navigation.navigate('DashboardScreen')
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'calendar',
                label: 'Attandance',
                layout: 'column'
              },
              click: () => {
                this.props.navigation.navigate('AttendanceScreen')
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'user-minus',
                label: 'Leave',
                layout: 'column'
              },
              click: () => {
                this.props.navigation.navigate('LeaveScreen')
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'watch',
                label: 'Overtime',
                layout: 'column'
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'file-text',
                label: 'Payroll',
                layout: 'column'
              }
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'percent',
                label: 'Loan',
                layout: 'column'
              }
            }} />

          </View>
        </View>
      </ScrollView>
    )
  }
}