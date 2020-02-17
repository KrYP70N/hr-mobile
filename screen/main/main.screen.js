import React, { Component } from 'react'
import { View, Text, Container, Content, Button, Row, Col, Icon } from 'native-base'
import { Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import styMain from './main.style'

export default class Main extends Component {
    render () {
        return (
            <Container>
                <Content>
                    
                    <TouchableNativeFeedback style={styMain.banner}>
                        <Text style={styMain.time}>10:11 AM Friday, 01 Nov 2019</Text>
                        <Row>
                            <Col style={styMain.userInfo}>
                                <Image source={require('../../assets/icon/user.png')} style={styMain.profilePic}/>
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

                </Content>
            </Container>
        )
    }
}