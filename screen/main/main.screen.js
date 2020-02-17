import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title } from 'native-base'
import { Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import styMain from './main.style'
import po from './po'

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkin: {
                status: true,
                disabled: false
            },
            checkout: {
                status: true,
                disabled: true
            }
        }
    }

    render() {
        return (
            <Container>
                <Content>

                    <TouchableNativeFeedback style={styMain.banner}>
                        <Text style={styMain.time}>10:11 AM Friday, 01 Nov 2019</Text>
                        <Row>
                            <Col style={styMain.userInfo}>
                                <Image source={require('../../assets/icon/user.png')} style={styMain.profilePic} />
                                <View>
                                    <Text style={styMain.name}>John Doe</Text>
                                    <Text style={styMain.pos}>Web Developer</Text>
                                </View>
                            </Col>
                            <Col>
                                <Icon name="ios-arrow-round-forward" style={styMain.profileDetail}></Icon>
                            </Col>
                        </Row>
                    </TouchableNativeFeedback>

                    {/* check in/out */}
                    <Row style={styMain.checkHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={this.state.checkout.disabled ? styMain.disabled : null }>
                                <TouchableNativeFeedback>
                                    <CardItem>
                                        <Body style={styMain.checkBody}>
                                            <View style={styMain.checkTitle}>
                                                <Icon name={po.checkin.icon} style={styMain.checkIcn} />
                                                <Text style={styMain.checkTitleTxt}>{po.checkin.title}</Text>
                                            </View>
                                            <Text style={styMain.checkInfo}>
                                                {this.state.checkin ? po.checkin.checked.true : po.checkin.checked.true}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card style={this.state.checkout.disabled ? styMain.disabled : null}>
                                <TouchableNativeFeedback>
                                    <CardItem>
                                        <Body style={styMain.checkBody}>
                                            <View style={styMain.checkTitle}>
                                                <Icon name={po.checkout.icon} style={styMain.checkIcn} />
                                                <Text style={styMain.checkTitleTxt}>{po.checkout.title}</Text>
                                            </View>
                                            <Text style={styMain.checkInfo}>
                                                {this.state.checkout.status ? po.checkout.checked.true : po.checkout.checked.false}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                    </Row>
                    {/* nav list */}

                    {/* menu */}
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={styMain.disabled}>
                                <CardItem>
                                    <Body style={styMain.menuBody}>
                                        <Icon name={po.menu[0].icon} style={styMain.icon} />
                                        <Text>{po.menu[0].name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card>
                                <CardItem>
                                    <Body style={styMain.menuBody}>
                                        <Icon name={po.menu[1].icon} style={styMain.icon} />
                                        <Text>{po.menu[1].name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card>
                                <TouchableNativeFeedback onPress={() => {alert('hi')}}>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[2].icon} style={styMain.icon} />
                                            <Text>{po.menu[2].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card>
                                <CardItem>
                                    <Body style={styMain.menuBody}>
                                        <Icon name={po.menu[3].icon} style={styMain.icon} />
                                        <Text>{po.menu[3].name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card>
                                <CardItem>
                                    <Body style={styMain.menuBody}>
                                        <Icon name={po.menu[4].icon} style={styMain.icon} />
                                        <Text>{po.menu[4].name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card>
                                <CardItem>
                                    <Body style={styMain.menuBody}>
                                        <Icon name={po.menu[5].icon} style={styMain.icon} />
                                        <Text>{po.menu[5].name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>

                </Content>
            </Container>
        )
    }
}