import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image } from 'react-native'
import { Container, Content, Icon, } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
//import { SafeAreaView } from 'react-native-safe-area-context'

const todayLeaveLists = [
    {
        "name": "Hla Hla",
        "position": "Manager",
        "deptname": "IT",
        "location": "Yangon"
    },
    {
        "name": "Aung Aung",
        "position": "Manager",
        "deptname": "IT",
        "location": "Yangon"
    },
    {
        "name": "Su Su",
        "position": "Manager",
        "deptname": "Marketing",
        "location": "Mandalay"
    }
]

export class TodayLeaves extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            year: null,
            todayLeaveListData: [],
            loading: true,
            loadingTxt: 'Loading....',
            requestData: true,

        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                year: date.getFullYear(),
            })

            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date()
                    const currentYear = date.getFullYear()
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getTodayLeavesData(auth, id, url, currentYear);
                        })
                })
        })
    }

    getTodayLeavesData(auth, id, url, year) {
        APIs.getTodayLeavesData(url, auth, id, year)
            .then((res) => {
                console.log("Today Leave Data", res.data)
                if (res.status == 'success') {
                    this.setState({
                        todayLeaveListData: res.data,
                        loading: false,
                        requestData: false,
                        loadingTxt: ''
                    })
                } else {
                    this.setState({
                        todayLeaveListData: [],
                        loading: false,
                        requestData: false,
                        loadingTxt: ''
                    })
                }
            })
    }

    render() {
        if (this.state.requestData == true) {
            return (
                <Loading info={this.state.loadingTxt} />
            )
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ backgroundColor: color.lighter }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Dashboard') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Today Leaves</Text>
                    </View>
                    <Content style={{ flex: 1 }}>
                        {
                            this.state.todayLeaveListData.map((leave, index) => {
                                return (
                                    <View key={index} style={{ marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.placeHolder }}>
                                        <Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{leave["emp_name"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>{leave["date_from"]} to {leave["date"]}</Text>
                                            <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'Nunito', color: '#FF0000' }}>{leave["leave_name"]}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        <View style={{
                            marginTop: 20,
                            display: this.state.todayLeaveListData.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no Absent Employee!</Text>
                        </View>
                    </Content>
                </Container>

            </SafeAreaView>
        )
    }
}

export default TodayLeaves
