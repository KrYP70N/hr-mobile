import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppNavigator from './router/router'

export default class App extends Component {
  render () {
    return (
      <AppNavigator />
    )
  }
}