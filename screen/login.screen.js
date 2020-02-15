import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView
} from 'react-native'

// icon set
import Icon from 'react-native-vector-icons/Feather';

// native-base component
import {
  Item,
  Input,
  Button,
  Toast,
  Container,
  Header,
  Content
} from 'native-base'

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import login from '../constant/login.constant'

// import controller
import APIs from '../controller/api.controller'

export default class LoginScreen extends Component {

  // log-in constructor
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      password: null,
      securePassword: true
    }
    // user name ctrl
    this.userFieldCtrl = (key) => {
      this.setState({
        user: key
      })
    }
    // password ctrl
    this.passFieldCtrl = (key) => {
      this.setState({
        password: key
      })
    }
    // validate
    this.validateLogin = (name, password) => {
      console.log(this.state)
      APIs.getToken(name, password)
        .then((res) => {
          // this.props.navigation.navigate('MainScreen', { id: res.data.employee_id, token: res.data.access_token })
          if (res.status === 'success') {
            this.props.navigation.navigate('MainScreen', {id: res.data.employee_id, token: res.data.access_token})
          } else {
            Toast.show({
              text: "Sorry, user name or password is not correct!",
              buttonText: "Okay",
              position: "bottom"
            })
          }
        })
    }
  }

  // navigatoin options
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      headerShown: false
    };
  }

  // didmount
  render() {

    return (
      <KeyboardAvoidingView behavior='height'>
        <View style={login.container}>
          {/* brand start */}
          <View style={[login.brand, style.mb40]}>
            <Image
              source={require('../assets/upload/innovix_hr_2.png')}
              style={login.image}
            />
          </View>
          {/* brand end */}

          {/* welcome start */}
          <View style={login.welcome}>
            <Text style={[style.h1, style.txtPrimary]}>Welcome</Text>
            <Text style={[style.textSecondary]}>Login To your Account</Text>
          </View>
          {/* welcome end */}

          {/* form start */}
          <View style={style.mb20}>
            <Item>
              <Icon active name='user' style={[style.icon, style.textPlaceholder]} />
              {/* user name */}
              <Input
                placeholder='User Name'
                placeholderTextColor={color.placeholder}
                onChangeText={(key) => this.userFieldCtrl(key)}
              />
            </Item>
          </View>
          <View style={style.mb30}>
            <Item>
              <Icon active name='lock' style={[style.icon, style.textPlaceholder]} />
              {/* password  */}
              <Input
                secureTextEntry={this.state.securePassword}
                placeholder='Password'
                placeholderTextColor={color.placeholder}
                onChangeText={(key) => this.passFieldCtrl(key)}
              />
              <Icon
                active name={this.state.securePassword === true ? 'eye-off' : 'eye'}
                style={[style.icon, style.textPlaceholder]}
                onPress={() => {
                  this.setState({
                    securePassword: !this.state.securePassword
                  })
                }
                } />
            </Item>
          </View>
          <View style={[style.textCenter, style.mb50]}>
            <Button
              block
              style={style.buttonPrimary}
              onPress={() => this.validateLogin(this.state.user, this.state.password)}
            >
              <Text style={[style.textLight, style.textButton]}>Login</Text>
            </Button>
          </View>
          {/* form end */}

          {/* copyright start */}
          <View style={style.copyright}>
            <Text style={style.textCenter}>&copy; InnovixHR All rights reserved</Text>
          </View>
          {/* copyright end */}
        </View>
      </KeyboardAvoidingView>

    )
  }
}

