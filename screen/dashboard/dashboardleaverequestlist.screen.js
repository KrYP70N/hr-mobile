import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Icon, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import BackHeader from '../../components/BackHeader'

export class DashboardLeaveRequestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            year: null,
            leaveLists: [],
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
                            this.getEmployeeListData(auth, id, url, currentYear);
                        })
                })
        })
    }

    getEmployeeListData(auth, id, url, year) {
        APIs.getDashboardLeaveRequestEmpListData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    if(res.error){
                       this.tokenExpiration()
                    }else{
                        this.setState({
                            leaveLists: res.data,
                            loading: false,
                            requestData: false,
                            loadingTxt: ''
                        })
                    }   
                } else {
                    this.apiFail()
                    this.setState({
                        leaveLists: [],
                        loading: false,
                        requestData: false,
                        loadingTxt: '',
                    })
                }
            })
    }

    tokenExpiration(){
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

    apiFail(){
        Toast.show({
            text: 'Authentication Failed!',
            textStyle: {
                textAlign: 'center'
            },
            style: {
                backgroundColor: color.primary
            },
            duration: 3000
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
                <Container style={{ flex: 1, backgroundColor: color.lighter }}>
                <BackHeader name = "Leave Request" navigation = {this.props.navigation} parent = "Dashboard"/>
                    <Content style={{ flex: 1, marginBottom: this.state.leaveLists.length === 0 ? 0 : 50 }}>
                        {
                            this.state.leaveLists.map((request, index) => {
                                return (
                                    <View key={index} style={{ marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.cardBorder }}>
                                        <Image style={{ width: 40, height: 40, borderRadius: 40 / 2 }} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{flex: 1, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{request["emp_name"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>{request["leave_name"]}</Text>
                                            <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>{request["date_from"]} to {request["date_to"]}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={{
                            marginTop: 20,
                            display: this.state.leaveLists.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no Leave Request List!</Text>
                        </View>
                       
                    </Content>
                    <TouchableOpacity style={{ display: this.state.leaveLists.length === 0 ? 'none' : 'flex', position: 'absolute', bottom: 0, width: '100%', height: 50, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('AdminLeaveApprove') }}>
                            <View><Text style={{ fontFamily: 'Nunito', fontSize: 14, color: color.light }}>Approve Leave</Text></View>
                        </TouchableOpacity>
                </Container>
            </SafeAreaView>
        )
    }
}

export default DashboardLeaveRequestList
