import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Text, Container, Content, Card, CardItem, Body, Row, Col, Button, View } from 'native-base'

export default class Approve extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Container style={styOt.container}>
                <Content >
                    
                    <Card>
                        <CardItem>
                            <Body>
                                <View style={styOt.cardTitleContainer}>
                                    <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                                    <Text style={styOt.cardRthLabel}>1{po.approve.staff.sideTitle}</Text>
                                </View>
                                <Text style={styOt.cardXSText}>{po.approve.staff.label1}07 Nov 2020</Text>
                                <Text style={styOt.cardSText}>{po.approve.staff.label2}05:00 PM to 8:00 PM</Text>
                                <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                                <Button style={styOt.ButtonSecondary}>
                                    <Text>{po.approve.staff.button}</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        )
    }
}