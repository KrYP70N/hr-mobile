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
            leaves: [],
            count: '',
            //count: this.props.count
        }
        
    }
  

    render() {  
        const GetLeave = this.props.leaves.map((leave) => {
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