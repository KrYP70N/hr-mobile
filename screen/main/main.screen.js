import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea, Header, Left, Right } from 'native-base'
import { Image, AsyncStorage, Platform, StatusBar } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import po from './po'
import color from '../../constant/color'
import styMain from '../main/main.style'

import Loading from '../../components/loading.component'

import APIs from '../../controllers/api.controller'
import Time from '../../controllers/time.controller'

import ProfileModel from '../../model/profile.model'

import Heading from '../../components/header.component'
import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'

import DB from '../../model/db.model'

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            profile: null,
            checkin: {
                status: true,
                disabled: false
            },
            checkout: {
                status: true,
                disabled: true
            },
            loading: true
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('@hr:token')
            .then((res) => {
                this.setState({
                    auth: DB.getToken(res),
                    id: DB.getUserId(res)
                })
                AsyncStorage.getItem('@hr:endPoint')
                    .then((res) => {
                        this.setState({
                            url: DB.getEndPoint(res)
                        })
                    })
            })


    }

    componentDidUpdate() {

        // profile request
        if (this.state.profile === null && this.state.url !== null && this.state.id !== null) {
            APIs.Profile(this.state.url, this.state.auth, this.state.id)
                .then((res) => {
                    if (res.status === 'success') {
                        this.setState({
                            profile: res.data
                        })
                        this.setState({
                            loading: false
                        })
                    } else {
                        AsyncStorage.setItem('@hr:login', 'false')
                    }
                })
                .catch((error) => {
                    this.props.navigation.navigate('Login')
                })
        }

    }

    render() {
        if (this.state.loading === true || this.state.profile === null) {
            return (
                <Loading />
            )
        }
        return (
            <Container>

                <Content>

                    <Heading navigation={this.props.navigation} />

                    <TouchableNativeFeedback style={styMain.banner}
                        onPress={() => {
                            this.props.navigation.navigate('Profile', {
                                profile: this.state.profile
                            })
                        }
                        }>
                        <Clock style={styMain.time} navigation={this.props.navigation} />

                        <Row>
                            <Col style={styMain.userInfo}>
                                <Image source={
                                    this.state.profile['Profile Image'][0] === false ?
                                        require('../../assets/icon/user.png') :
                                        {
                                            uri: `data:${this.state.profile['Profile Image'][1]};base64,${this.state.profile['Profile Image'][0]}`
                                        }
                                } style={styMain.profilePic} />
                                <View>
                                    <Text style={styMain.name}>
                                        {this.state.profile['Employee Name']}{
                                            ProfileModel.checkKey(
                                                this.state.profile['General Information'], 'Employee Name'
                                            ) === undefined ?
                                                "UNKNOWN EMPLOYEE" :
                                                ProfileModel.checkKey(
                                                    this.state.profile['General Information'], 'Employee Name'
                                                )
                                        }
                                    </Text>
                                    <Text style={[styMain.pos]}>
                                        {
                                            ProfileModel.checkKey(
                                                this.state.profile['General Information'], 'Job Position'
                                            ) === undefined ?
                                                "UNKNOWN POSITION" :
                                                ProfileModel.checkKey(
                                                    this.state.profile['General Information'], 'Job Position'
                                                )
                                        }
                                    </Text>

                                </View>

                            </Col>
                            <Col>
                                <Icon name="ios-arrow-round-forward" style={styMain.profileDetail}></Icon>
                            </Col>
                        </Row>
                    </TouchableNativeFeedback>

                    {/* check in/out */}
                    <View style={styMain.checkinout}>
                        <CheckInOut navigation={this.props.navigation}/>
                    </View>

                    {/* menu */}
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[1].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() =>
                                    po.menu[1].navigate ?
                                        this.props.navigation.navigate(
                                            po.menu[1].navigate
                                        ) : null
                                }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[1].icon} style={styMain.icon} /> */}
                                            <Image style={styMain.imgIcn} source={require('../../assets/icon/attendance.png')} />
                                            <Text>{po.menu[1].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card style={!po.menu[2].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() =>
                                    po.menu[2].navigate ?
                                        this.props.navigation.navigate(
                                            po.menu[2].navigate, {
                                            auth: this.state.auth,
                                            url: this.props.route.params.url,
                                            id: this.props.route.params.id
                                        }
                                        ) : null
                                }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[2].icon} style={styMain.icon} /> */}
                                            <Image style={styMain.imgIcn} source={require('../../assets/icon/leave.png')} />
                                            <Text>{po.menu[2].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styMain.menuHolder}>

                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[3].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() =>
                                    po.menu[3].navigate ?
                                        this.props.navigation.navigate(
                                            po.menu[3].navigate, {
                                            data: this.state,
                                            url: this.props.route.params.url,
                                            id: this.props.route.params.id
                                        }
                                        ) : null
                                }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[3].icon} style={styMain.icon} /> */}
                                            <Image style={[styMain.imgIcn, { height: 45 }]} source={require('../../assets/icon/ot.png')} />
                                            <Text>{po.menu[3].name}</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableNativeFeedback>
                            </Card>
                        </Col>
                        <Col style={styMain.cardRight}>
                            <Card style={!po.menu[4].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() =>
                                    po.menu[4].navigate ?
                                        this.props.navigation.navigate(
                                            po.menu[4].navigate, {
                                            auth: this.state.auth,
                                            url: this.props.route.params.url,
                                            id: this.props.route.params.id
                                        }
                                        ) : null
                                }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[4].icon} style={styMain.icon} /> */}
                                            <Image style={[styMain.imgIcn, { height: 40 }]} source={require('../../assets/icon/payroll.png')} />
                                            <Text>{po.menu[4].name}</Text>
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