import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native'

// native base
import {
  Toast
} from 'native-base'

// icon set
import Icon from 'react-native-vector-icons/Feather';

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
      user: null
    }
  }

  // didmount
  componentDidMount() {
    // load user
    APIs.getProfile(this.state.token.val, this.state.token.id)
      .then((res) => {
        console.log(res.status)
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
                    <Icon active name='arrow-right' style={[style.h1, style.textLight, style.textRight]}></Icon> : 
                    <Image 
                      style={{
                        width: 64,
                        height: 64,
                        position: 'absolute',
                        top: 0
                      }}
                      source={{
                        uri: `data:${this.state.user.data['Profile Picture'][1]};base64,${this.state.user.data['Profile Picture'][0]}`
                      }}
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
                      this.state.user.data['Job Position']
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
              placeholder: "You haven't check in yet."
            }} />
            <Card data={{
              cardStyle: main.card,
              title: {
                icon: 'clock',
                label: 'Check Out',
                layout: 'row'
              },
              placeholder: "Don't forget to check out."
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
