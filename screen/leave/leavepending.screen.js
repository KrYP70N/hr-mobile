import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, AsyncStorage } from 'react-native'
import { Content, Container, Toast, Icon, Card, CardItem, Body, Button, } from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import styLeave from './leave.style'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height
export class EmployeeLeavePending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            leaves: [],
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
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
                            this.getApproveData(auth, id, url);

                        })
                })
        })
    }

    cancelOT = (cid) => {
        APIs.leaveStatusUpdate(this.state.url, this.state.auth, cid, 'cancel')
            .then((res) => {
                if (res.status === 'success') {
                    this.getApproveData(this.state.auth, this.state.id, this.state.url)
                    Toast.show({
                        text: 'Cancel Success!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                } else {
                    Toast.show({
                        text: 'Connection time out. Please check your internet connection!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        },
                        duration: 6000
                    })
                }
            })
    }

    getApproveData(auth, id, url) {
        APIs.getLeaveRequest(auth, url, id)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        leaves: res.data
                    })
                } else {
                    Toast.show({
                        text: 'Connection time out. Please check your internet connection!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        },
                        duration: 6000
                    })
                }
            })
    }

    render() {
        let GetLeave = this.state.leaves.map((leave) => {
            return (
                <Card key={leave['Obj id']} style = {{marginBottom: 16, padding: 10}}>
                    <CardItem>
                        <Body>
                            <View style={styLeave.cardTitleContainer}>
                                <Text style={styLeave.cardTitle}>{leave['Leave Type']}</Text>
                            </View>
                            <Text style={styLeave.cardXSText}>{leave['date_from']} to {leave['date_to']}</Text>
                            <Text style={styLeave.cardSText}>Leave left - {leave['number of days']} Days</Text>
                            <Text style={styLeave.cardWarning}>Your request is pending</Text>
                            <Button
                                style={styLeave.ButtonSecondary}
                                onPress={() => {
                                    this.cancelOT(leave['Obj id'])
                                }}
                            >
                                <Text>Cancel Request</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            )
        })
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Pending Approval</Text>
                    </View>
                    <Content style={{ flex: 1, backgroundColor: color.lighter }}>
                        <View style={{ padding: 16 }}>
                            {GetLeave}
                        </View>

                        <View style={{
                            display: this.state.leaves.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no pending leave request!</Text>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default EmployeeLeavePending
