import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity onPress={() => { this.props.navigation.navigate(this.props.parent) }}>
        <Image source={require('../assets/icon/back_arrow.png')} style={{
           width: 25,
           height: 25,
            tintColor: color.primary,
            marginRight: offset.o2,
            marginLeft: 15,
        }} />
        </TouchableOpacity>
       
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
