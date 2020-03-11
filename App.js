import React from 'react';
import { AppLoading } from 'expo';
import { Container, Spinner, View, Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Navigation from './router/navigation'

import Loading from './components/loading.component'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 4000)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <Loading />
      )
    }
    
    <img src=""></img>

    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}