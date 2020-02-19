import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title } from 'native-base'
import { Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import styMain from './main.style'
import po from './po'
import color from '../../constant/color'


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
        console.log(this.props.navigation)
        return (
            <Container>
                <Content>

                    <TouchableNativeFeedback style={styMain.banner}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
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
                            <TouchableNativeFeedback>
                                <Card style={[
                                    this.state.checkin.disabled ? styMain.disabled : null,
                                    styMain.checkCard]}>
                                    <Body style={styMain.checkBody}>
                                        <View style={styMain.checkTitle}>
                                            <Icon name={po.checkin.icon} style={[
                                                styMain.checkIcn,
                                                this.state.checkin.disabled ? { color: color.light } : null]} />
                                            <Text style={[
                                                styMain.checkIcn, this.state.checkin.disabled ? { color: color.light } : null,
                                                styMain.checkTitleTxt]}>{po.checkin.title}</Text>
                                        </View>
                                        <Text style={styMain.checkInfo}>
                                            {this.state.checkin ? po.checkin.checked.true : po.checkin.checked.true}
                                        </Text>
                                    </Body>
                                </Card>
                            </TouchableNativeFeedback>
                        </Col>

                        <Col style={styMain.cardRight}>
                            <TouchableNativeFeedback>
                                <Card style={[
                                    this.state.checkout.disabled ? styMain.disabled : null,
                                    styMain.checkCard]}>
                                    <Body style={styMain.checkBody}>
                                        <View style={styMain.checkTitle}>
                                            <Icon name={po.checkout.icon} style={[
                                                    styMain.checkIcn,
                                                    this.state.checkout.disabled ? { color: color.light } : null]} />
                                            <Text style={[
                                                styMain.checkIcn, this.state.checkout.disabled ? { color: color.light } : null,
                                                styMain.checkTitleTxt]}>{po.checkout.title}</Text>
                                        </View>
                                        <Text style={styMain.checkInfo}>
                                            {this.state.checkout.status ? po.checkout.checked.true : po.checkout.checked.false}
                                        </Text>
                                    </Body>
                                </Card>
                            </TouchableNativeFeedback>
                        </Col>
                    </Row>
                    {/* nav list */}

                    {/* menu */}
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[0].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() =>
                                    po.menu[0].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[0].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[0].icon} style={styMain.icon} />
                                            <Text>{po.menu[0].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card style={!po.menu[1].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[1].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[1].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[1].icon} style={styMain.icon} />
                                            <Text>{po.menu[1].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[2].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[2].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[2].navigate
                                    ) : null
                                    }>
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
                            <Card style={!po.menu[3].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[3].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[3].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[3].icon} style={styMain.icon} />
                                            <Text>{po.menu[3].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[4].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[4].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[4].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[4].icon} style={styMain.icon} />
                                            <Text>{po.menu[4].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card style={!po.menu[5].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[5].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[5].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            <Icon name={po.menu[5].icon} style={styMain.icon} />
                                            <Text>{po.menu[5].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                    </Row>

                </Content>
            </Container>
        )
    }
}