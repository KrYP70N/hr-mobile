import React, { Component } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Container, Content } from 'native-base'
import color from '../../constant/color'
import Cards from '../leave/cards'
import Chart from '../leave/chart'
import BottomTab from '../../components/bottomtab.component'
import BackHeader from '../../components/BackHeader'

export class Leave extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Container style = {{flex: 1, backgroundColor: color.lighter}}>
                <BackHeader name = "Leave" navigation = {this.props.navigation} parent = "Main" />

                    <View style={{ flex: 1 }}>
                        <Chart navigation={this.props.navigation}/>
                        <Cards navigation={this.props.navigation} />
                    </View>
                    <BottomTab navigation={this.props.navigation} screen='leave' />
                </Container>
            </SafeAreaView>

        )
    }
}

export default Leave
