import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Icon} from 'native-base'
import color from '../constant/color'
import offset from '../constant/offset'

class BackHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
        <Icon name='ios-arrow-round-back' style={{
            fontSize: offset.o4,
            color: color.primary,
            marginRight: offset.o2,
            marginLeft: 15,
        }} onPress={() => { this.props.navigation.navigate(this.props.parent) }} />
        <Text style={{
            fontSize: 16,
            color: color.secondary,
            fontFamily: 'Nunito'
        }}>{this.props.name}</Text>
    </View>
    );
  }
}

export default BackHeader;
