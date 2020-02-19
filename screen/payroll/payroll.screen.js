import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { Container, Content, Text, Form, Item, Label, Input, Picker, Row, Col, Button, View, CardItem, Body, Card, Icon } from 'native-base'

export default class Payroll extends Component {
    render() {
        return (
            <Container style={styPayroll.container}>
                <Content>
                    <Form style={styPayroll.form}>
                        <Row style={styPayroll.fieldSet}>
                            <Col style={styPayroll.left}>
                                <Item picker>
                                    <Picker mode="dialog">
                                        <Picker.Item label="Month" value={null}/>
                                        <Picker.Item label="January" value={0}/>
                                        <Picker.Item label="February" value={1}/>
                                    </Picker>
                                </Item>
                            </Col>
                            <Col style={styPayroll.right}>
                                <Item picker>
                                    <Picker mode="dialog">
                                        <Picker.Item label="Year" value={null}/>
                                        <Picker.Item label="January" value={0}/>
                                        <Picker.Item label="February" value={1}/>
                                    </Picker>
                                </Item>
                            </Col>
                        </Row>
                        <Button style={styPayroll.buttonLg}>
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styPayroll.list}>
                        
                            <Card>
                                <CardItem>
                                    <Body>
                                        <View style={styPayroll.titleHolder}>
                                            <Text style={styPayroll.cardTitle}>October</Text>
                                            <Icon name="ios-arrow-round-forward" style={styPayroll.cardRthLabel}/>
                                        </View>
                                        <Text style={styPayroll.month}>29 Oct 2020</Text>
                                        <Text style={styPayroll.salary}>Net Salary - 780,000 MMK</Text>
                                        <Button style={styPayroll.cardButton}>
                                            <Text>Download PDF</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <View style={styPayroll.titleHolder}>
                                            <Text style={styPayroll.cardTitle}>October</Text>
                                            <Icon name="ios-arrow-round-forward" style={styPayroll.cardRthLabel}/>
                                        </View>
                                        <Text style={styPayroll.month}>29 Oct 2020</Text>
                                        <Text style={styPayroll.salary}>Net Salary - 780,000 MMK</Text>
                                        <Button style={styPayroll.cardButton}>
                                            <Text>Download PDF</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <View style={styPayroll.titleHolder}>
                                            <Text style={styPayroll.cardTitle}>October</Text>
                                            <Icon name="ios-arrow-round-forward" style={styPayroll.cardRthLabel}/>
                                        </View>
                                        <Text style={styPayroll.month}>29 Oct 2020</Text>
                                        <Text style={styPayroll.salary}>Net Salary - 780,000 MMK</Text>
                                        <Button style={styPayroll.cardButton}>
                                            <Text>Download PDF</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}