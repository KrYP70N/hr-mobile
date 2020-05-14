import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, AsyncStorage } from 'react-native'
import { Icon, Card, Container, Content, Header, Left, Right } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Cards from '../leave/cards'
import Chart from '../leave/chart'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

export class Leave extends Component {
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

    // componentDidMount() {
    //     this.props.navigation.addListener('focus', () => {
    //         let date = new Date()
    //         this.setState({
    //             year: date.getFullYear(),
    //         })

    //         AsyncStorage.getItem('@hr:endPoint')
    //             .then((res) => {
    //                 let date = new Date()
    //                 const currentYear = date.getFullYear()
    //                 const url = JSON.parse(res).ApiEndPoint
    //                 this.setState({ url: JSON.parse(res).ApiEndPoint })
    //                 AsyncStorage.getItem('@hr:token')
    //                     .then((res) => {
    //                         const auth = JSON.parse(res).key;
    //                         const id = JSON.parse(res).id;
    //                         this.setState({
    //                             auth: JSON.parse(res).key,
    //                             id: JSON.parse(res).id
    //                         })
    //                         this.getSummaryData(auth, id, url, currentYear);

    //                     })
    //             })
    //     })
    // }

    // getSummaryData(auth, id, url, year) {
    //     APIs.getLeaveSummary(url, auth, id, year)
    //         .then((res) => {
    //             if (res.status === 'success') {
    //                 this.setState({
    //                     summaryData: res.data
    //                 })
    //             } else {
                  
    //             }
    //         })
    // }

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
                        }}>Leave</Text>
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

export default Leave
