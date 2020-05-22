import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, AsyncStorage } from 'react-native'
import { Icon, Card, Container, Content, Header, Left, Right } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Cards from '../overtime/card'
import Chart from '../overtime/chart'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

export class Overtime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            summaryData: [],
            loading: false,
        }
    }

    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Container>
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
                        }}>Overtime</Text>
                    </View>

                    <Content style={{ flex: 1 }}>
                        <Chart navigation={this.props.navigation}/>
                        <Cards navigation={this.props.navigation} />
                    </Content>
                </Container>
            </SafeAreaView>

        )
    }
}

export default Overtime