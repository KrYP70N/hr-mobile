import React, { Component } from 'react'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

import { KeyboardAvoidingView, Image, Keyboard, AsyncStorage } from 'react-native'
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

export default class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            apiUrl: null,
            db: null,
            hidePassword: true,
            user: null,
            name: null,
            loading: false,
            auth: null
        }
        // submit
        this.login = () => {
            // inject keyboard
            Keyboard.dismiss()
            this.setState({
                loading: true
            })
            APIs.Token(this.state.apiUrl, this.state.db, this.state.user, this.state.password)
                .then((res) => {
                    // display loading
                    this.setState({
                        loading: true
                    })
                    if (res.status === 'success') {
                        AsyncStorage.setItem('@hr:token', JSON.stringify({
                            // key: 'Bearer '+ res.data.access_token,
                            key: res.data.access_token,
                            id: res.data.employee_id
                        }))
                        .then(() => {
                            AsyncStorage.setItem('@hr:login', 'true')
                            .then(() => {
                                this.setState({
                                    loading: false
                                })
                                this.props.navigation.navigate('Main')
                            })
                        })

                    } else {
                        this.setState({
                            loading: false
                        })
                        Toast.show({
                            text: 'user name or password is not correct!',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.primary
                            },
                            duration: 4000
                        })
                    }
                })
        }

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

    componentDidMount () {
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            if(res !== null) {
                this.setState({
                    apiUrl: DB.getEndPoint(res),
                    db: DB.getName(res)
                })
            }
        })

        // check token
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:token')
            .then((res) => {
                if(res !== null) {
                    let data = JSON.parse(res)
                    this.setState({
                        auth: data.key
                    })
                }
            })
        })
    }

    render () {
        
        if(this.state.apiUrl === null) {
            return (
                <Auth navigation={this.props.navigation}/>
            )
        }
        
        if(this.state.auth !== null) {
            this.props.navigation.navigate('Main')
        }

        return (
            <KeyboardAvoidingView behavior="height" style={styLogin.kbView}>
                <Container style={styLogin.container}>
                    <Image
                        source={require('../../assets/upload/logo.png')}
                        style={styLogin.logo}
                    />
                    <Text style={styLogin.title}>{po.title}</Text>
                    <Text style={styLogin.sub}>{po.sub}</Text>

                    <Item inlineLabel style={styLogin.item}>
                        <Label style={styLogin.label}>
                            <Icon name='ios-person' style={styLogin.icn}/>
                        </Label>
                        <Input onChangeText={(key) => this.user(key)} />
                    </Item>

                    <Item inlineLabel style={styLogin.password}>
                        <Label style={styLogin.label}>
                            <Icon name='ios-lock' style={styLogin.icn}/>
                        </Label>
                        <Input secureTextEntry={this.state.hidePassword} style={styLogin.input}
                            onChangeText={(key) => { this.password(key) }}
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
            </KeyboardAvoidingView>
        )
    }
}