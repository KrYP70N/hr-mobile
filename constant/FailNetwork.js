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
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
       <Image style = {{width: 100, height: 100}} source = {require('../assets/icon/off.png')} />
       <Text style = {{marginTop: 30, fontSize: 20, textAlign: 'center'}}>Mobile network is not available!. Please open your network!.</Text>
      </View>
    );
  }
}

export default FailNetwork;
