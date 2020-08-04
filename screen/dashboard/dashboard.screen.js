import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Container, Icon, Text, Content, View } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Cards from './cards'
import Chart from './chart'
import BottomTab from '../../components/bottomtab.component'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ flex: 1 }}>
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
                        }}>Dashboard</Text>
                    </View>
                    <Content style={{ backgroundColor: color.lighter }}>
                        <Chart navigation={this.props.navigation} />
                        <View style={{ backgroundColor: color.lighter, paddingLeft: offset.o1 + offset.oh, paddingRight: offset.o1 + offset.oh, paddingTop: 15 }}>
                            <Cards navigation={this.props.navigation} />
                        </View>
                    </Content>
                    <BottomTab navigation={this.props.navigation} screen='dashboard' />
                </Container>
            </SafeAreaView>
        )
    }
}
