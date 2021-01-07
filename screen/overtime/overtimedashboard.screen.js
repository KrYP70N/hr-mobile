import React, { Component } from 'react'
import { SafeAreaView, View, Dimensions } from 'react-native'
import { Container, Content, } from 'native-base'
import color from '../../constant/color'
import Cards from '../overtime/card'
import Chart from '../overtime/chart'
import BackHeader from '../../components/BackHeader'
import BottomTab from '../../components/bottomtab.component'
const height = Dimensions.get('screen').height
export class Overtime extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <BackHeader name="Overtime" navigation={this.props.navigation} parent="Main" />
                <View style={{flex: 1, height: height, backgroundColor: color.lighter }}>
                  
                        <Chart navigation={this.props.navigation} />
                      

                        <Cards navigation={this.props.navigation} />
                      
                    
                </View>
                <BottomTab navigation={this.props.navigation} screen='ot' />
            </SafeAreaView>

        )
    }
}

export default Overtime
