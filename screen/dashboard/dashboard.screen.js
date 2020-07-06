import React, { Component, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Container, Header, Left, Icon, Text, Right, Content, View } from 'native-base'

// variable
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './dashboard.style'

// components
import Cards from './cards'
import Chart from './chart'

import BottomTab from '../../components/bottomtab.component'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            id: null,
            auth: null,
            dashboardData: [],
        }
    }

    componentDidMount() {

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
                    {/* <Header style={{
                        backgroundColor: color.light,
                        // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                    }}>
                        <Left style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-arrow-round-back' style={{
                                fontSize: offset.o4,
                                color: color.primary,
                                marginRight: offset.o2
                            }} onPress={() => { this.props.navigation.navigate('Main') }} />
                            <Text style={{
                                color: color.secondary,
                                fontFamily: 'Nunito'
                            }}>Dashboard</Text>
                        </Left>
                        <Right></Right>
                    </Header> */}

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
