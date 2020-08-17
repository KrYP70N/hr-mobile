import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class FailNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Image source={require('../assets/icon/off.png')} />
       <Text style = {{ padding: 20, fontSize: 22, textAlign: 'center'}}>Mobile Network is not available!. Please open your network!.</Text>
      </View>
    );
  }
}

export default FailNetwork;
