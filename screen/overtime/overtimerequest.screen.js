import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Icon} from 'native-base'

export class OTRequest extends Component {
    render() {
        return (
            <View style = {{flex: 1}}>
                 <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Apply Leave</Text>
                    </View>
              
            </View>
        )
    }
}

export default OTRequest
