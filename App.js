import React from 'react';
import { Root } from 'native-base';
import { Image, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
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
      connectedState: null,
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

    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        this.setState({ connectedState: true })
      } else {
        this.setState({ connectedState: false });
      }
    });

    setTimeout(() => {
      this.setState({ isReady: true });
    }, 4000)
  }

  // _handleConnectivityChange = (isConnected) => {
  //   console.log("isConnected Status::", isConnected);
  //   if (isConnected == true) {
  //     this.setState({ connection_Status: "Online" })
  //   }
  //   else {
  //     this.setState({ connection_Status: "Offline" })
  //   }
  // };

  async _cacheResourcesAsync() {
  let img =  Asset.loadAsync([
      require('./assets/icon/off.png'),
    ]);
    console.log("Image", img)
  }

  render() {

    if (!this.state.connectedState) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style = {{fontSize: 24, color: '#656565', fontWeight: 'bold'}}>No Internet Connection!!</Text>
          <Text style={{marginTop: 15 , fontSize: 18,  }}>Your mobile network is not available.</Text>
          <Text style={{ marginTop: 15, fontSize: 18,}}>Please open your internet connection.</Text>
        </View>
      );
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


  //   if (!this.state.connectedState) {
  //     return (
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <Image source={require('./assets/icon/off.png')} />
  //         <Text style={{ padding: 20, fontSize: 22, textAlign: 'center' }}>Mobile Network is not available!. Please open your network!.</Text>
  //       </View>
  //     )
  //   }

  //   if (!this.state.isReady) {
  //     return (
  //       <Loading />
  //     )
  //   }

  //   return (
  //     <Root>
  //       <Navigation />
  //     </Root>
  //   );
  // }
//}