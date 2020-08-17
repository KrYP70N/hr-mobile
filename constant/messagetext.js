import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import { Toast } from 'native-base'
import color from './color'

export default ErrorMessage = (errorMsg, navigation) => {
    if(errorMsg === 'token'){
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
          AsyncStorage.removeItem('@hr:token').then((res) => {
            navigation.navigate('Login')
          })
    }else{
        Toast.show({
            text: 'Something wrong in (Network or Server)!',
            textStyle: {
              textAlign: 'center'
            },
            style: {
              backgroundColor: color.primary
            },
            duration: 3000
          })
    }
}

