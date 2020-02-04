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
  Button
} from 'native-base'

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import login from '../constant/login.constant'

export default class LoginScreen extends Component {
  
  // log-in constructor
  constructor (props) {
    super (props)
    this.state = {
      securePassword: true
    }
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state
    
    return {
      headerShown: false 
    };
  }

  render () {
    
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
              <Icon active name='user' style={[style.icon, style.textPlaceholder]}/>
              <Input placeholder='Icon Textbox' placeholderTextColor={color.placeholder}/>
            </Item>
          </View>
          <View style={style.mb30}>
            <Item>
              <Icon active name='lock' style={[style.icon, style.textPlaceholder]}/>
              <Input secureTextEntry={this.state.securePassword} placeholder='Icon Textbox' placeholderTextColor={color.placeholder}/>
              <Icon 
                active name={this.state.securePassword === true ? 'eye-off' : 'eye'} 
                style={[style.icon, style.textPlaceholder]} 
                onPress={() => {
                  this.setState({
                    securePassword: !this.state.securePassword
                  })}
                }/>
            </Item>
          </View>
          <View style={[style.textCenter, style.mb50]}>
            <Button 
            block 
            style={style.buttonPrimary}
            onPress={() => this.props.navigation.navigate('MainScreen')}
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

