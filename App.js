import React from 'react';
import { Root } from 'native-base';
import {View, Text} from 'react-native'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import Navigation from './router/navigation'
import Loading from './components/loading.component'
import FailNetwork from './constant/FailNetwork';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isConnected: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Nunito': require('./assets/fonts/Nunito-Regular.ttf'),
      'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })

    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.setState({
        isConnected: state.isConnected
      })
    });

    setTimeout(() => {
      this.setState({ isReady: true });
    }, 4000)
  }


  render() {

    if (!this.state.isConnected) {
      return (
          <FailNetwork />
      )
    }
    
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