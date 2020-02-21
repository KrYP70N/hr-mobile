import React, { Component } from 'react'
import { KeyboardAvoidingView, Image, Keyboard } from 'react-native'
import { View, Text, Container, Form, Content, Item, Label, Input, Button, Footer, Icon, Toast } from 'native-base'

import styLogin from './login.style'
import po from './po'

import Overlay from '../../components/overlay.component'

import APIs from '../../controllers/api.controller'

export default class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            hide_passowrd: true,
            overlay: false,
            user: null,
            name: null,
            auth: null,
            id: null
        }

        // submit
        this.login = () => {
            // inject keyboard
            Keyboard.dismiss()
            this.setState({
                overlay: true
            })
            APIs.Token(this.state.user, this.state.password)
                .then((res) => {
                    this.setState({
                        overlay: false
                    })
                    if(res.status === 'success') {
                        this.setState({
                            auth: res.data.access_token,
                            id: res.data.uid
                        })
                        this.props.navigation.navigate('Main', {auth: this.state.auth, id: this.state.id})
                    } else {
                        Toast.show({
                            text: 'user name or password is not correct!',
                            buttonStyle: 'Okay'
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
        this.password = (key)  => {
            this.setState({
                password: key
            })
        }

    }
    
    render() {
        
        return (
            <KeyboardAvoidingView behavior="height" style={styLogin.kbView}>
                <Container style={styLogin.container}>
                    <Image
                        source={require('../../assets/upload/logo.png')}
                        style={styLogin.logo}
                    />
                    <Text style={styLogin.title}>{po.title}</Text>
                    <Text style={styLogin.sub}>{po.sub}</Text>
                    
                    <Item floatingLabel style={styLogin.item}>
                        <Label style={styLogin.label}>{po.label.name}</Label>
                        <Input style={styLogin.input} onChangeText={(key) => this.user(key)}/>
                    </Item>

                    <Item floatingLabel style={styLogin.password}>
                        <Label style={styLogin.label}>{po.label.psw}</Label>
                        <Input secureTextEntry={this.state.hide_passowrd} style={styLogin.input} 
                            onChangeText={(key) => {this.password(key)}}
                        />
                        <Icon active name={
                            this.state.hide_passowrd === true ? 'ios-eye-off' : 'ios-eye'
                        } onPress={() => {
                            this.setState({
                                hide_passowrd: !this.state.hide_passowrd
                            })
                        }} style={styLogin.icn}/> 
                    </Item>

                    <Button style={styLogin.button} onPress={this.login}>
                        <Text style={styLogin.buttonText}>{po.label.btn}</Text>
                    </Button>

                    <Button transparent style={styLogin.resetPwd} onPress={() => {
                        alert('sorry, not avaliable!')
                    }}>
                        <Text style={styLogin.resetTxt}>Forget Passowrd?</Text>
                    </Button>

                    <Text style={styLogin.copyright}>{po.copyright}</Text>
                </Container>
                <Overlay overlay={this.state.overlay}/>
            </KeyboardAvoidingView>
        )
    }
}