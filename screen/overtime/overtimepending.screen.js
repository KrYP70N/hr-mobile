import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, AsyncStorage } from 'react-native'
import { Content, Container, Toast, Icon, Card, CardItem, Body, Button, } from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import styOt from '../overtime/overtime.style'
import po from './po'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height
export class OvertimePending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            overtimes: [],
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

    cancelOT = (otId) => {
        APIs.OTUpdateStatus(otId, this.state.auth, this.state.url, 'cancel')
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
        APIs.OTPending(id, auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        overtimes: res.data
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
        console.log("Overtimes::::", this.state.overtimes)
        // let GetLeave = this.state.overtimes.map((leave) => {
        //     return (
        //         <Card key={leave['Obj id']} style = {{marginBottom: 16, padding: 10}}>
        //             <CardItem>
        //                 <Body>
        //                     <View style={styLeave.cardTitleContainer}>
        //                         <Text style={styLeave.cardTitle}>{leave['Leave Type']}</Text>
        //                     </View>
        //                     <Text style={styLeave.cardXSText}>{leave['date_from']} to {leave['date_to']}</Text>
        //                     <Text style={styLeave.cardSText}>Leave left - {leave['number of days']} Days</Text>
        //                     <Text style={styLeave.cardWarning}>Your request is pending</Text>
        //                     <Button
        //                         style={styLeave.ButtonSecondary}
        //                         onPress={() => {
        //                             this.cancelOT(leave['Obj id'])
        //                         }}
        //                     >
        //                         <Text>Cancel Request</Text>
        //                     </Button>
        //                 </Body>
        //             </CardItem>
        //         </Card>
        //     )
        // })
        let requests = this.state.overtimes.map((req) => {
            return (
                <Card key={req['Obj Id']} >
                    <CardItem>
                        <Body>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                            </View>
                            <Text style={styOt.cardXSText}>{po.approve.staff.labelfrom}{req['date_from']}</Text>
                            <Text style={styOt.cardXSText}>{po.approve.staff.labelto}{req['date_to']}</Text>
                            <Text style={styOt.cardSText}>{po.approve.staff.label2}{req['hour']}:{req['minute']}</Text>
                            <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                            <Button
                                style={styOt.ButtonSecondary}
                                onPress={() => { this.cancelOT(req['Obj Id']) }}
                            >
                                <Text>{po.approve.staff.button}</Text>
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
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Overtime Approval</Text>
                    </View>
                    <Content style={{ flex: 1, backgroundColor: color.lighter }}>
                        <View style={{ padding: 16 }}>
                            {requests}
                        </View>

                        <View style={{
                            display: this.state.overtimes.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no pending OT request!</Text>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default OvertimePending

