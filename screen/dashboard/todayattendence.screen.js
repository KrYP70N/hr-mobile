import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'

export class TodayAttendanceList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            year: null,
            empLists: [],
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
                        this.getEmployeeListData(auth, id, url, currentYear);
                    })
            })
        })
    }

    getEmployeeListData(auth, id, url, year) {
        APIs.getDashboardAttendanceEmployeeListData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    this.setState({
                        empLists: res.data
                    })
                } else {
                    this.setState({ empLists: [] })
                }
            })
    }

    render() {
        console.log("Today Attendance Employee", this.state.empLists)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ flex: 1, backgroundColor: color.lighter }}>
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
                        }}>Today Attendance</Text>
                    </View>
                    <Content style={{ flex: 1 }}>
                        {
                            this.state.empLists.map((emp, index) => {
                                return (
                                    <View key={index} style={{marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.placeHolder }}>
                                        <Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{flex: 1, marginLeft: 15}}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{emp["name"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>{emp["job"] == null ? "Untitle Job" : emp["job"]}, {emp["department"] == null ? "Untitle Department" : emp["department"]}</Text>
                                            <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Join Date - {emp["date_start"]}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        <View style={{
                            marginTop: 20,
                            display: this.state.empLists.length === 0 ? 'flex' : 'none',
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

export default TodayAttendanceList
