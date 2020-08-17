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
      <View style = {{flex: 1}}>
       <Image style = {{width: '100%', height: '100%'}} source={require('../assets/icon/no_internet.png')} />
      </View>
    );
  }
}

export default FailNetwork;
