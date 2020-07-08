import React, { Component } from 'react'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

import { KeyboardAvoidingView, Image, Keyboard, AsyncStorage, BackHandler, SafeAreaView } from 'react-native'
import { View, Text, Container, Form, Content, Item, Label, Input, Button, Footer, Icon, Toast } from 'native-base'

import styLogin from './login.style'
import po from './po'

import Overlay from '../../components/overlay.component'

import APIs from '../../controllers/api.controller'
import DB from '../../model/db.model'
import color from '../../constant/color';
import Auth from './_auth.login'
import { Updates } from 'expo';
import Loading from '../../components/loading.component';
import moment from 'moment';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: null,
            db: null,
            hidePassword: true,
            user: null,
            password: null,
            loading: false,
            auth: null
        };


        // handle user field
        this.user = (key) => {
            this.setState({
                user: key
            })
        }

        // handle password field
        this.password = (key) => {
            this.setState({
                password: key
            })
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    if (res !== null) {
                        this.setState({
                            apiUrl: DB.getEndPoint(res),
                            db: DB.getName(res)
                        })
                    }
                })

            AsyncStorage.getItem('@hr:token')
                .then((res) => {
                    console.log("Reach Login")
                    if (res !== null) {
                        let data = JSON.parse(res)

                        let diff = moment(data.exp).diff(moment(new Date()), 'minutes')
                        // let diff = moment('2020-06-27 04:17:02').diff(moment(new Date()), 'mintues')
                        console.log("Diff", diff)
                        if (diff < 2 && diff > 0) {
                            // refresh
                            let token = data.key
                            let id = data.id

                            AsyncStorage.getItem('@hr:endPoint')
                                .then((res) => {
                                    let dataEndPoint = JSON.parse(res)
                                    let url = dataEndPoint.ApiEndPoint

                                    APIs.RefreshToken(url, token)
                                        .then((res) => {
                                            data.key = `Bearer ${res.data.access_token}`
                                            AsyncStorage.setItem('@hr:token', JSON.stringify(data))
                                                .then(() => {
                                                    this.props.navigation.navigate('Main')
                                                })
                                        })
                                        .catch(() => {
                                            this.setState({
                                                loading: false
                                            })
                                        })
                                })

                            // } else if(diff <= 0) {
                        } else if (diff <= 0) {
                            // expired

                            AsyncStorage.removeItem('@hr:token')
                                .then(() => {
                                    this.setState({
                                        loading: false
                                    })
                                })
                        } else {
                            this.props.navigation.navigate('Main')
                        }
                    } else {
                        // logouted
                        this.setState({
                            loading: false
                        })
                    }
                })
        })
    }

    login = () => {
        console.log("Click Login :::")
        APIs.Token(this.state.apiUrl, this.state.db, this.state.user, this.state.password)
            .then((res) => {
                console.log("Login RES:::", res)
                if (res.status === 'success') {
                    if (res.geterror) {
                        Toast.show({
                            text: 'user name or password is not correct!',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.primary
                            },
                            duration: 3000
                        })
                    }else{
                        let date = new Date()
                        let exp_date = moment(date).add(res.data.expires_in, 'seconds')
                        AsyncStorage.setItem('@hr:token', JSON.stringify({
                            key: 'Bearer ' + res.data.access_token,
                            id: res.data.employee_id,
                            exp: exp_date
                        }))
                            .then(() => {
                                AsyncStorage.setItem('@hr:login', 'true')
                                    .then(() => {
                                        //to clear input text
                                        this.setState({
                                            user: null,
                                            password: null
                                        })
                                        this.props.navigation.navigate('Main')
                                    })
                            })
                    }
                    
                } else {
                    console.log("You got 403 from Sever")
                }
            })
    }
    render() {
        if (this.state.apiUrl === null) {
            return (
                <Auth navigation={this.props.navigation} />
            )
        }
        return (
            // <KeyboardAvoidingView behavior="height" style={styLogin.kbView}>
            <SafeAreaView style={styLogin.kbView}>
                <Container style={styLogin.container}>
                    <Image
                        source={require('../../assets/upload/logo.png')}
                        style={styLogin.logo}
                    />
                    <Text style={styLogin.title}>{po.title}</Text>
                    <Text style={styLogin.sub}>{po.sub}</Text>

                    <Item inlineLabel style={styLogin.item}>
                        <Input value={this.state.user}
                            style={styLogin.input}
                            onChangeText={(key) => this.user(key)}
                            placeholder='User Name'
                            placeholderTextColor={color.placeHolder} />
                    </Item>

                    <Item inlineLabel style={styLogin.password}>
                        <Input secureTextEntry={this.state.hidePassword}
                            style={styLogin.input}
                            value={this.state.password}
                            onChangeText={(key) => { this.password(key) }}
                            placeholder='Password'
                            placeholderTextColor={color.placeHolder}
                        />
                        <Icon active name={
                            this.state.hidePassword === true ? 'ios-eye-off' : 'ios-eye'
                        } onPress={() => {
                            this.setState({
                                hidePassword: !this.state.hidePassword
                            })
                        }} style={styLogin.icn} />
                    </Item>

                    <Button style={styLogin.button} onPress={this.login}>
                        <Text style={styLogin.buttonText}>{po.label.btn}</Text>
                    </Button>

                    <Button transparent style={styLogin.resetPwd} onPress={() => {
                        AsyncStorage.removeItem('@hr:endPoint')
                            .then(() => {
                                Updates.reload()
                            })
                    }}>
                        <Text style={styLogin.resetTxt}>Change Access Token?</Text>
                    </Button>
                </Container>
                <Overlay overlay={this.state.overlay} />
                </SafeAreaView>
            // </KeyboardAvoidingView>

        )

    }
}

export default login;
