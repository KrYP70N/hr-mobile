import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

export default class Attendance extends Component {
    render () {
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
                                        <Text style={styAttend.timeLabel}>CHECK IN TIME</Text>
                                        <Text style={styAttend.timeValue}>02:26 PM</Text>
                                    </Col>
                                    <Col style={styAttend.checkoutTime}>
                                        <Text style={styAttend.timeLabel}>CHECK OUT TIME</Text>
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
                                            <Icon name="clock" style={styAttend.cardIcon}/>
                                            <Text style={styAttend.cardSTitle}>Check In</Text>
                                        </View>
                                        <Text style={styAttend.cardinfo}>You haven't check in yet.</Text>
                                    </Body>
                                </Card>
                            </TouchableNativeFeedback>
                        </Col>
                        <Col style={styAttend.right}>
                            <TouchableNativeFeedback>
                                <Card style={styAttend.checkCard}>
                                    <Body>
                                        <View style={styAttend.cardTitle}>
                                            <Icon name="clock" style={styAttend.cardIcon}/>
                                            <Text style={styAttend.cardSTitle}>Check Out</Text>
                                        </View>
                                        <Text style={styAttend.cardinfo}>Don't forgot to check out.</Text>
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
                </Content>
            </Container>
        )
    }
}