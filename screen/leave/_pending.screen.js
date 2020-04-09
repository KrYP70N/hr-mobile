import React, { Component } from 'react'
import { FlatList, AsyncStorage } from 'react-native'
import { View, Text, Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, Card, Body, CardItem, Toast } from 'native-base'

import color from '../../constant/color'
import styLeave from './leave.style'
import { KeyboardAvoidingView } from 'react-native'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

export default class LeavePending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            leaves: [],
            count: ''
        }

        this.cancelOT = (cid) => {
            APIs.leaveStatusUpdate(this.state.url, this.state.auth, cid, 'cancel')
            .then((res) => {
                if(res.status === 'success') {
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

    componentDidMount () {
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
                        //this.getRequestData(auth, url);
                        this.getApproveData(auth, id, url);
                    })
            })
        // AsyncStorage.getItem('@hr:token')
        // .then((res) => {
        //     let data = JSON.parse(res)
        //     this.setState({
        //         auth: data.key,
        //         id: data.id
        //     })
        // })
        // AsyncStorage.getItem('@hr:endPoint')
        // .then((res) => {
        //     let data = JSON.parse(res)
        //     this.setState({
        //         url: data['ApiEndPoint']
        //     })
        // })
    }
  

    render() {
        if(this.state.url === null || this.state.auth === null || this.state.id === null) {
            return (
                <Loading />
            )
        }

        if(this.props.leaves.length === 0)  {
            return (
                <Text>no data avaliable</Text>
            )
        }


        const GetLeave = this.state.leaves.map((leave) => {
            return (
                <Card key={leave['Obj id']}>
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
            <Container>
                <Content style={styLeave.container}>
                    {GetLeave}
                </Content>
            </Container>
        )
    }
}