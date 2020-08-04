import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Container, Content, } from 'native-base'
import color from '../../constant/color'
import Cards from '../overtime/card'
import Chart from '../overtime/chart'
import BackHeader from '../../components/BackHeader'
import BottomTab from '../../components/bottomtab.component'

export class Overtime extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ flex: 1, backgroundColor: color.lighter }}>
                    <BackHeader name="Overtime" navigation={this.props.navigation} parent="Main" />
                    <Content style={{ flex: 1 }}>
                        <Chart navigation={this.props.navigation} />
                        <Cards navigation={this.props.navigation} />
                    </Content>
                    <BottomTab navigation={this.props.navigation} screen='ot' />
                </Container>
            </SafeAreaView>

        )
    }
}

export default Overtime
