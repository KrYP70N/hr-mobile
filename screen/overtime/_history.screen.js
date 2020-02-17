import React, { Component } from 'react'

import styOt from './overtime.style'
import po from './po'
import { View, Text, Container, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge } from 'native-base'
import color from '../../constant/color'

export default class History extends Component {
    render () {
        return (
            <Container>
                <Content style={styOt.overlay}>
                    <Form style={styOt.container}>
                        <Row>
                            <Col style={styOt.left}>
                                <Item floatingLabel last>
                                    <Label style={styOt.label}>{po.history.label1}</Label>
                                    <Input style={styOt.input}/>
                                </Item>
                            </Col>
                            <Col style={styOt.right}>
                                <Item floatingLabel last>
                                    <Label style={styOt.label}>{po.history.label2}</Label>
                                    <Input style={styOt.input}/>
                                </Item>
                            </Col>
                        </Row>
                        <Item picker style={styOt.picker}>
                            <Picker mode="dialog" 
                                placeholder="Status"
                                textStyle={{color: color.primary}}
                                selectedValue="Status"
                                
                            >
                                <Picker.Item label="Status" value="status"/>
                                <Picker.Item label="all" value="all"/>
                                <Picker.Item label="success" value="success"/>
                                <Picker.Item label="reject" value="reject"/>
                            </Picker>
                        </Item>
                        <Button style={styOt.buttonPrimary}>
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styOt.resultBox}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.history.card.title}</Text>
                                        <Text style={styOt.cardRthLabel}>05 Nov 2020</Text>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardXSText}>{po.history.card.date}05 Nov 2020</Text>
                                        <Badge style={styOt.badgeSuccess}>
                                            <Text>{po.history.card.badge.success}</Text>
                                        </Badge>
                                    </View>
                                    <Text style={styOt.cardSText}>{po.history.card.hour}5:00 PM to 8:00 PM</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.history.card.title}</Text>
                                        <Text style={styOt.cardRthLabel}>05 Nov 2020</Text>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardXSText}>{po.history.card.date}05 Nov 2020</Text>
                                        <Badge style={styOt.badgeReject}>
                                            <Text>{po.history.card.badge.fail}</Text>
                                        </Badge>
                                    </View>
                                    <Text style={styOt.cardSText}>{po.history.card.hour}5:00 PM to 8:00 PM</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Text style={styOt.divideText}>October 2020</Text>
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.history.card.title}</Text>
                                        <Text style={styOt.cardRthLabel}>05 Nov 2020</Text>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardXSText}>{po.history.card.date}05 Nov 2020</Text>
                                        <Badge style={styOt.badgeReject}>
                                            <Text>{po.history.card.badge.fail}</Text>
                                        </Badge>
                                    </View>
                                    <Text style={styOt.cardSText}>{po.history.card.hour}5:00 PM to 8:00 PM</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}