import React, { Component } from 'react'
import { View, Text, Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, Card, Body, CardItem, Toast } from 'native-base'

import color from '../../constant/color'
import styLeave from './leave.style'
import { KeyboardAvoidingView } from 'react-native'
import APIs from '../../controllers/api.controller'

export default class LeaveApprove extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: this.props.id,
            auth: this.props.auth,
            url: this.props.url,
            leaves: [],
            count: this.props.count
        }
    }

    componentDidMount () {
        APIs.getLeaveRequest(this.state.auth, this.state.url, this.state.id)
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        leaves: res.data
                    })
                } else {
                    Toast.show({
                        text: 'Sever Error! Please try again in later.'
                    })
                }
            })
    }

    render () {
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
                                Toast.show({
                                    text: 'Request fail! Please try again in later',
                                    textStyle: {
                                        textAlign: 'center'
                                    },
                                    style: {
                                        backgroundColor: color.danger
                                    }
                                })
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