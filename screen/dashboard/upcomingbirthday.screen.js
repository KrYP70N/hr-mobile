import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, AsyncStorage } from 'react-native'
import { Container, Content, Icon, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import BackHeader from '../../components/BackHeader'

export class UpcomingBirthday extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            year: null,
            birthdayLists: [],
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
                            this.getBirthdayLists(auth, id, url, currentYear)
                        })
                })

        })
    }

    getBirthdayLists(auth, id, url, year) {
        APIs.getBirthdayListData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    if (res.error) {
                        this.tokenExpiration()
                    } else {
                        this.setState({
                            birthdayLists: res.data,
                            loading: false,
                            requestData: false,
                            loadingTxt: ''
                        })
                    }
                } else {
                    this.apiFail()
                    this.setState({
                        birthdayLists: [],
                        loading: false,
                        requestData: false,
                        loadingTxt: ''
                    })
                }
            })
    }

    tokenExpiration() {
        Toast.show({
            text: 'Please login again. Your token is expired!',
            textStyle: {
                textAlign: 'center'
            },
            style: {
                backgroundColor: color.primary
            },
            duration: 6000
        })
        this.props.navigation.navigate('Login')
    }

    apiFail() {
        Toast.show({
            text: 'Authentication Failed!',
            textStyle: {
                textAlign: 'center'
            },
            style: {
                backgroundColor: color.primary
            },
            duration: 6000
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
                    <BackHeader name="Upcoming Birthdays" navigation={this.props.navigation} parent="Dashboard" />
                    <Content style={{ flex: 1, marginBottom: 15 }}>
                        {
                            this.state.birthdayLists.map((birthday, index) => {
                                return (
                                    <View key={index} style={{ marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.cardBorder }}>
                                        <Image style={{ width: 40, height: 40, borderRadius: 40 / 2 }} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{birthday["name"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>Date - {birthday["birthday"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 14, fontFamily: 'Nunito', color: '#333333' }}>DOB - {birthday["DOB"]}</Text>

                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Content>
                </Container>

            </SafeAreaView>
        )
    }
}

export default UpcomingBirthday
