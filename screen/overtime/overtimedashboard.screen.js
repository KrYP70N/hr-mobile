import React, { Component } from 'react'
import { Text, View, SafeAreaView,} from 'react-native'
import { Icon, Container, Content,} from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Cards from '../overtime/card'
import Chart from '../overtime/chart'
import BottomTab from '../../components/bottomtab.component'

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
                <Container style = {{flex: 1, backgroundColor: color.lighter}}>
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
                    <BottomTab navigation={this.props.navigation} screen='ot' />
                </Container>
            </SafeAreaView>

        )
    }
}

export default Overtime
