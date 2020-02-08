import React, {Component} from 'react';

import AppNavigator from './router/router'
import {Font} from 'expo-font'
import { Root } from 'native-base';

export default class App extends Component {
  render () {
    Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    return (
      <Root>
        {/* <AppNavigator /> */}
      </Root>
    )
  }
}












/* hello this is comment */
