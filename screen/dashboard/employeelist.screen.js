import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image } from 'react-native'
import { Container, Icon, Content, Toast} from 'native-base'
import color from '../../constant/color'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import BackHeader from '../../components/BackHeader'

export class EmployeeListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: null,
            empLists: [],
            loading: true,
            loadingTxt: 'Loading...',
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
                            this.getEmployeeListData(auth, id, url, currentYear);
                        })
                })
        })
    }

    getEmployeeListData(auth, id, url, year) {
        APIs.getEmployeeListData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    if (res.error == true) {
                       ErrorMessage('token', this.props.navigation)
                    } else { 
                        this.setState({
                            empLists: res.data,
                            loading: false,
                            loadingTxt: '',
                            requestData: false,
                        })
                    }

                } else {
                    this.setState({
                        empLists: [],
                        loading: false,
                        loadingTxt: '',
                        requestData: false,
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
                <BackHeader name="Employees" navigation = {this.props.navigation} parent = "Dashboard"/>
                    {/* <Content style={{ flex: 1, marginBottom: 15}}> */}
                        {
                            this.state.empLists.map((emp, index) => {
                                return (
                                    <View key={index} style={{flex: 1, marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.cardBorder }}>
                                        <Image style={{ width: 40, height: 40, borderRadius: 40 / 2}} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{flex: 1, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{emp["employee"]}</Text>
                                            <Text style={{marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>{emp["position"] == null ? "Untitle Position" : emp["position"]}, {emp["dept"] == null ? "Untitle Dept" : emp["dept"]}</Text>
                                            <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'Nunito', color: '#333333' }}>{emp["location"] == null ? "Untitle location" : emp["location"]}</Text>
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
                            }}>There is no Employee List!</Text>
                        </View>

                    {/* </Content> */}
                </Container>

            </SafeAreaView>
        )
    }
}

export default EmployeeListScreen
