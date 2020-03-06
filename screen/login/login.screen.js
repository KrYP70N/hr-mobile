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
import Loading from '../../components/loading.component';
import DB from '../../model/db.model'
import color from '../../constant/color';
import { withNavigation } from 'react-navigation';



class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiUrl: null,
            db: null,
            hidePassword: true,
            user: null,
            name: null,
            loading: false
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

    componentDidMount() {

        console.log(this.props.navigation)

        // check auth success?
        AsyncStorage.getItem('@hr:endPoint')
        .then((resEndPoint) => {
            if(resEndPoint === null) {
                this.props.navigation.navigate('Auth')
            } else {
                AsyncStorage.getItem('@hr:login')
                .then((res) => {
                    if(res === 'true') {
                        this.props.navigation.navigate('Main')
                    } else {
                        this.setState({
                            apiUrl: DB.getEndPoint(resEndPoint),
                            db: DB.getName(resEndPoint)
                        })
                    }
                })
            }
        })

        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            // The screen is focused
            // Call any action
            console.log('hola')
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    render() {

        if(this.state.db === null || this.state.apiUrl === null || this.state.loading === true) {
            return (
                <Loading />
            )
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

                    <Item fixedLabel style={styLogin.item}>
                        <Label style={styLogin.label}>{po.label.name}</Label>
                        <Input onChangeText={(key) => this.user(key)} />
                    </Item>

                    <Item fixedLabel style={styLogin.password}>
                        <Label style={styLogin.label}>{po.label.psw}</Label>
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
                        alert('sorry, not avaliable!')
                    }}>
                        <Text style={styLogin.resetTxt}>Change Access Token?</Text>
                    </Button>
                </Container>
                <Overlay overlay={this.state.overlay} />
            </KeyboardAvoidingView>
        )
    }
}

export default withNavigation(Login)