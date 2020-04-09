import React from 'react';
import { AppLoading } from 'expo';
import { Container, Spinner, View, Root, Alert } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Navigation from './router/navigation'

import Loading from './components/loading.component'
import { BackHandler } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Nunito': require('./assets/fonts/Nunito-Regular.ttf'),
      'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
      // Roboto: require('native-base/Fonts/Roboto.ttf'),
      // Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 4000)
  }

  render() {

    BackHandler.addEventListener('hardwareBackPress', function() {
      console.log('hola')
    })

    if (!this.state.isReady) {
      return (
        <Loading />
      )
    }

    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}