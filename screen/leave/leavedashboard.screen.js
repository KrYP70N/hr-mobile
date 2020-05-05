import React, { Component } from 'react'
import { Text, View, SafeAreaView, } from 'react-native'
import { Icon, Card } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Cards from '../leave/cards'
import Chart from '../leave/chart'

export class Leave extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Leave</Text>
                    </View>
                    <View style={{ flex: 1, width: '100%' }}>
                        {/* <View style={{ width: "100%", height: '30%', backgroundColor: color.primary , justifyContent: "center"}}> */}
                        <Chart/>
                        {/* </View> */}
                        <View style={{
                            backgroundColor: color.lighter,
                            padding: offset.o1 + offset.oh
                        }}>
                            <Cards navigation = {this.props.navigation}/>
                        </View>
                    </View>



                </View>
            </SafeAreaView>
        )
    }
}

export default Leave
