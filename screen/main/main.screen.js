import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon, Card, CardItem, Body, Title, Textarea } from 'native-base'
import { Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import styMain from './main.style'
import po from './po'
import color from '../../constant/color'

import Loading from '../../components/loading.component'

import APIs from '../../controllers/api.controller'
import Time from '../../controllers/time.controller'

import ProfileModel from '../../model/profile.model'

import CheckInOut from '../../components/checkinout.component'
import Clock from '../../components/time.component'

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
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
        
        // profile request
        if(this.state.auth !== null && this.state.profile === null) {
            APIs.Profile(this.state.id, this.state.auth, this.props.route.params.url)
            .then((res) => {                
                this.setState({
                    profile: res.data
                })
            })
        }
        
        // remove overlay
        if(
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
                        onPress={() => {
                            this.props.navigation.navigate('Profile', {
                                profile: this.state.profile
                            })
                        }
                    }>
                        <Clock 
                        style={styMain.time} 
                        auth={this.props.route.params.auth} 
                        url={this.props.route.params.url} />
                        <Row>
                            <Col style={styMain.userInfo}>
                                <Image source={
                                    ProfileModel.checkKey(
                                    this.state.profile['General Information'], 'Profile Picture') === undefined ?
                                    require('../../assets/icon/user.png') : 
                                    {uri: 'data:image/png;base64,' + this.state.data['Profile Picture']}
                                } style={styMain.profilePic} />
                                <View>
                                    <Text style={styMain.name}>
                                        {/* {this.state.profile.data['Employee Name']} */}{
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
                        <CheckInOut data={this.state.profile['General Information']}
                        userid={this.state.id}
                        auth={this.state.auth}
                        url={this.props.route.params.url}/>
                    </View>
                    
                    {/* nav list */}

                    {/* menu */}
                    <Row style={styMain.menuHolder}>
                        <Col style={styMain.cardLft}>
                            <Card style={!po.menu[1].navigate ? styMain.disabledMenu : null}>
                                <TouchableNativeFeedback onPress={() => 
                                    po.menu[1].navigate ? 
                                    this.props.navigation.navigate(
                                        po.menu[1].navigate, {
                                            data: this.state,
                                            url: this.props.route.params.url
                                        }
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[1].icon} style={styMain.icon} /> */}
                                            <Image style={styMain.imgIcn} source={require('../../assets/icon/attendance.png')}/>
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
                                        po.menu[2].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[2].icon} style={styMain.icon} /> */}
                                            <Image style={styMain.imgIcn} source={require('../../assets/icon/leave.png')}/>
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
                                        po.menu[3].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[3].icon} style={styMain.icon} /> */}
                                            <Image style={[styMain.imgIcn, {height: 45}]} source={require('../../assets/icon/ot.png')}/>
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
                                        po.menu[4].navigate
                                    ) : null
                                    }>
                                    <CardItem>
                                        <Body style={styMain.menuBody}>
                                            {/* <Icon name={po.menu[4].icon} style={styMain.icon} /> */}
                                            <Image style={[styMain.imgIcn, {height: 40}]} source={require('../../assets/icon/payroll.png')}/>
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