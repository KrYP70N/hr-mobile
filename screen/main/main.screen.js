import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea } from 'native-base'
import { Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import Moment from 'moment'

import styMain from './main.style'
import po from './po'
import color from '../../constant/color'

import Loading from '../../components/loading.component'

import APIs from '../../controllers/api.controller'
import Time from '../../controllers/time.controller'

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            time: null,
            profile: null,
            overlay: true,
            checkin: {
                status: true,
                disabled: false
            },
            checkout: {
                status: true,
                disabled: true
            },
            isReady: false
        }
    }

    componentDidMount () {
        this.setState({
            auth: this.props.route.params.auth,
            id: this.props.route.params.id
        })

        
    }

    componentDidUpdate () {
        // time request
        if(this.state.auth !== null && this.state.time === null) {
            APIs.Time('access_token_23600924292eba93058d060f4f28c574b5e53336')
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        time: Moment(res.data).format()
                    })
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
        }

        // profile request
        if(this.state.auth !== null && this.state.profile === null) {
            APIs.Profile(this.state.id, this.state.auth)
            .then((res) => {
                // this.setState({
                //     profile: res.data
                // })
            })
        }

        if(this.state.time !== null) {
            let t = new Date(this.state.time)
            setTimeout(() => {
                this.setState({
                    time: t.setSeconds(t.getSeconds() + 1)
                })
            }, 1000)
        }

        
        // remove overlay
        if(
            this.state.time !== null && 
            this.state.id !== null && 
            this.state.auth !== null &&
            this.state.profile !== null &&
            this.state.isReady === false
        ) {
            this.setState({
                isReady: true
            })
        }

        
    }

    render() {
        let time = this.state.time
        // loading screen
        if(this.state.isReady === false) {
            return (
                <Loading />
            )
        }
        return (
            <Container>
                <Content>
                    <TouchableNativeFeedback style={styMain.banner}
                        onPress={() => 
                        this.props.navigation.navigate('Profile', {
                            profile: this.state.profile
                        })
                    }>
                        <Text style={styMain.time}>
                            {Time.hour(time)}:{Time.minute(time)}:{Time.second(time)} {Time.part(time)} {Time.day(time)}, {Time.date(time)} {Time.month(time)} {Time.year(time)}
                        </Text>
                        <Row>
                            <Col style={styMain.userInfo}>
                                <Image source={
                                    this.state.profile.data['Profile Picture'][0] ?
                                    {uri: 'data:image/png;base64,' + this.state.data["Profile Picture"]} : 
                                    require('../../assets/icon/user.png')
                                } style={styMain.profilePic} />
                                <View>
                                    <Text style={styMain.name}>{this.state.profile.data['Employee Name']}</Text>
                                    <Text style={[styMain.pos, {display: this.state.profile.data['Job Position'] ? null : 'none'}]}>{this.state.profile.data['Job Position']}</Text>
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