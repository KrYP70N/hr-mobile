import React, { Component } from 'react'
import { KeyboardAvoidingView, Image } from 'react-native'
import { View, Text, Container, Form, Content, Item, Label, Input, Button, Footer, Icon } from 'native-base'

import styLogin from './login.style'
import po from './po'
import { ScrollView } from 'react-native-gesture-handler'

export default class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            hide_passowrd: true
        }

        // submit
        this.login = () => {
            this.props.navigation.navigate('Main')
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
                        <Input style={styLogin.input} />
                    </Item>

                    <Item floatingLabel style={styLogin.password}>
                        <Label style={styLogin.label}>{po.label.psw}</Label>
                        <Input secureTextEntry={this.state.hide_passowrd} style={styLogin.input} />
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
            </KeyboardAvoidingView>
        )
    }
}