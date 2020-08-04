import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, AsyncStorage } from 'react-native'
import color from '../../constant/color'
import offset from '../../constant/offset'
import { Container, Content, Icon, Toast } from 'native-base'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'


export class ContractProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            loading: true,
            loadingTxt: 'Loading....',
            profileData: null,
            workingSchedule: [],
            testSchedules: [],
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
                            this.getDashboardContractProfileData(auth, id, url, currentYear)
                        })
                })
        })
    }

    getDashboardContractProfileData(auth, id, url, year) {
        APIs.getDashboardContractData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    if (res.error) {
                       this.tokenExpiration()
                    } else {
                        this.setState({
                            loading: false,
                            loadingTxt: '',
                            profileData: res.data[0],
                            workingSchedule: res.data[1]
                        })
                    }

                } else {
                    this.apiFail()
                    this.setState({
                        profileData: null,
                        loadingTxt: '',
                        workingSchedule: []
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
        this.props.navigatin.navigate('Login')
        
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

        if (this.state.profileData == null) {
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
                        }}>Contract Profile</Text>
                    </View>
                    <Content>
                        <View style={{ marginTop: offset.o5, backgroundColor: color.lighter, borderRadius: 8, margin: 10, borderColor: color.placeHolder, borderWidth: 0.3, }}>
                            <View style={{ backgroundColor: color.light, display: 'flex', alignItems: 'center', padding: offset.o2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                                <Image source={
                                    require('../../assets/icon/user.png')
                                } style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    borderColor: color.primary,
                                    borderWidth: 2,
                                    marginTop: - (offset.o5 + offset.o1),
                                    backgroundColor: color.light,
                                    marginBottom: offset.o1
                                }} />

                                <Text style={{
                                    color: color.placeHolder,
                                    marginBottom: offset.oh,
                                    textAlign: 'center',
                                    marginTop: 10,
                                    fontSize: 13,
                                }}>ID - {this.state.profileData["employee_id"]}</Text>
                                <Text style={{
                                    color: color.primary,
                                    fontFamily: 'Nunito-Bold',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    marginTop: 3,

                                }}>{this.state.profileData["name"]}</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#333333',
                                    marginTop: 5,
                                    fontSize: 14,
                                }}>
                                    {this.state.profileData["job"]}
                                </Text>
                            </View>
                            <View style={{ padding: 15, backgroundColor: color.light, }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Department</Text>
                                <Text style={{ marginTop: 10, fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}>{this.state.profileData["department"]}</Text>
                            </View>
                            <View style={{ height: 0.5, width: '100%', backgroundColor: color.placeHolder }}></View>
                            <View style={{ padding: 15, backgroundColor: color.light }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Emplyoee Type</Text>
                                <Text style={{ marginTop: 10, fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}>Contract</Text>
                            </View>
                            <View style={{ height: 0.5, width: '100%', backgroundColor: color.placeHolder }}></View>
                            <View style={{ padding: 15, backgroundColor: color.light }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Salary Reference</Text>
                                <Text style={{ marginTop: 10, fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}>{this.state.profileData["wage"]}</Text>
                            </View>
                            <View style={{ height: 0.5, width: '100%', backgroundColor: color.placeHolder }}></View>
                            <View style={{ padding: 15, backgroundColor: color.light }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Working Schedule</Text>
                                {/* <Text style={{ marginTop: 10, fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}>09:00 AM - 06:00 PM</Text> */}
                                {this.state.workingSchedule.map((schedule, index) => {
                                    return (
                                        <View key={index} style={{ flex: 1, marginTop: 10, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                            <Text style={{ width: '50%', fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}>{schedule["working schedule"]["name"]} </Text>
                                            <Text style={{ fontSize: 16, color: '#333333' }}>-</Text>
                                            <Text style={{ marginLeft: 5, width: '50%', fontSize: 16, color: '#333333', fontFamily: 'Nunito' }}> {schedule["working schedule"]["hour from"]} : {schedule["working schedule"]["hour to"]}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ backgroundColor: color.lighter, flexDirection: 'row', borderColor: color.placeHolder, borderWidth: 0.3, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>

                                <View style={{ padding: 20, width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>Start Date</Text>
                                    <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'Nunito', color: '#333333' }}>{this.state.profileData["date_start"]}</Text>
                                </View>
                                <View style={{ width: 1, backgroundColor: color.placeHolder, height: '100%' }}></View>
                                <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Nunito', color: '#A5A5A5' }}>End Date</Text>
                                    <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'Nunito', color: '#333333' }}>{this.state.profileData["contract_expire"] == null ? "-" : profileData["contract_expire"]}</Text>
                                </View>
                            </View>
                        </View>

                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default ContractProfile
