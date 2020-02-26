import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import Clock from '../../components/time.component'
import CheckInOut from '../../components/checkinout.component'
import offset from '../../constant/offset'

export default class Attendance extends Component {
    render() {
        return (
            <Container>
                <Content>
                    {/* time card */}
                    <View style={[styAttend.container, {
                        marginTop: offset.o1
                    }]}>
                        <Card style={styAttend.timeCard}>
                            <CardItem>
                                <Body style={styAttend.clock}>
                                    {/* <Text style={styAttend.time}>03:55 PM</Text> */}
                                    <Clock
                                    auth={this.props.route.params.data.auth}
                                    url={this.props.route.params.url}
                                    style={styAttend.time}
                                    monthStyle={styAttend.date}
                                    view="split"
                                    />
                                </Body>
                            </CardItem>
                        </Card>

                    </View>
                    {/* check in / out */}
                    <CheckInOut 
                    data={this.props.route.params.data.profile['General Information']}
                    auth={this.props.route.params.data.auth}
                    userid={this.props.route.params.data.id}
                    url={this.props.route.params.url}
                    />

                    <View style={[styAttend.container, {
                        marginBottom: offset.o3
                    }]}>
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
                    
                    </View>
                </Content>
            </Container>
        )
    }
}