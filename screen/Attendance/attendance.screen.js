import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

export default class Attendance extends Component {
    render() {
        return (
            <Container style={styAttend.container}>
                <Content>

                    {/* time card */}
                    <Card style={styAttend.timeCard}>
                        <CardItem>
                            <Body style={styAttend.clock}>
                                <Text style={styAttend.date}>Monday, 04 Nov 2019</Text>
                                <Text style={styAttend.time}>03:55 PM</Text>
                                <Row>
                                    <Col style={styAttend.checkinTime}>
                                        <Text style={styAttend.timeLabel}>{po.time.in}</Text>
                                        <Text style={styAttend.timeValue}>02:26 PM</Text>
                                    </Col>
                                    <Col style={styAttend.checkoutTime}>
                                        <Text style={styAttend.timeLabel}>{po.time.out}</Text>
                                        <Text style={styAttend.timeValue}>08:15 AM</Text>
                                    </Col>
                                </Row>
                            </Body>
                        </CardItem>
                    </Card>

                    {/* check in / out */}
                    <Row>
                        <Col style={styAttend.left}>
                            <TouchableNativeFeedback>
                                <Card style={styAttend.checkCard}>
                                    <Body>
                                        <View style={styAttend.cardTitle}>
                                            <Icon name={po.checkin.icon} style={styAttend.cardIcon} />
                                            <Text style={styAttend.cardSTitle}>{po.checkin.title}</Text>
                                        </View>
                                        <Text style={styAttend.cardinfo}>{po.checkin.checked.true}</Text>
                                    </Body>
                                </Card>
                            </TouchableNativeFeedback>
                        </Col>
                        <Col style={styAttend.right}>
                            <TouchableNativeFeedback>
                                <Card style={styAttend.checkCard}>
                                    <Body>
                                        <View style={styAttend.cardTitle}>
                                            <Icon name={po.checkout.icon} style={styAttend.cardIcon} />
                                            <Text style={styAttend.cardSTitle}>{po.checkout.title}</Text>
                                        </View>
                                        <Text style={styAttend.cardinfo}>{po.checkout.checked.true}</Text>
                                    </Body>
                                </Card>
                            </TouchableNativeFeedback>
                        </Col>

                    </Row>

                    <Card style={styAttend.infoCard}>
                        <View style={styAttend.cardLTitle}>
                            <Text style={styAttend.infoCardTitle}>Attendance</Text>
                            <Text style={styAttend.infoCardLabelSuccess}>18 Days</Text>
                        </View>
                    </Card>

                    <Card style={styAttend.infoCard}>
                        <View style={styAttend.cardLTitle}>
                            <Text style={styAttend.infoCardTitle}>Leaves</Text>
                            <Text style={styAttend.infoCardLabelDanger}>3 Days</Text>
                        </View>
                    </Card>

                    <Card style={styAttend.infoCard}>
                        <View style={styAttend.cardLTitle}>
                            <Text style={styAttend.infoCardTitle}>Late In</Text>
                            <Text style={styAttend.infoCardLabel}>00:00</Text>
                        </View>
                    </Card>

                    <Card style={styAttend.infoCard}>
                        <View style={styAttend.cardLTitle}>
                            <Text style={styAttend.infoCardTitle}>Overtime</Text>
                            <Text style={styAttend.infoCardLabel}>00:00</Text>
                        </View>
                    </Card>
                </Content>
            </Container>
        )
    }
}