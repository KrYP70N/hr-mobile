import React, { Component } from 'react'

import Constants from 'expo-constants'

import APIs from '../../controllers/api.controller'
import { Image, AsyncStorage, Keyboard } from 'react-native'
import { View, Text, Container, Content, Form, Item, Label, Input, Body, Button, Textarea, Toast, Icon } from 'native-base'

import styAuth from './auth.style'
import { KeyboardAvoidingView } from 'react-native'
import Loading from '../../components/loading.component'
import Overlay from '../../components/overlay.component'
import { hydrate } from 'react-dom'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: null,
            version: 1,
            auth: null,
            loading: true,
            overlay: false,
            secure: true
        }

        // key handle
        this.keyHandle = (key) => {
            this.setState({
                key: key
            })
        }

        // submit key
        this.submitKey = () => {
            Keyboard.dismiss()
            APIs.Auth(this.state.key, this.state.version)
                .then((res) => {
                    if(res.status === 'success') {
                        this.setState({
                            overlay: true
                        })
                        AsyncStorage.setItem('@hrdata:data', JSON.stringify(res))
                        .then(() => {
                            console.log(this.state.key)
                            this.setState({
                                overlay: false
                            })
                            this.props.navigation.navigate('Login', {data: res})
                        })
                    } else {
                        Toast.show({
                            text: 'Invalid security key!',
                            buttonText: 'Okay',
                            duration: 4000
                        })
                    }
                    
                })

        }
    }

    async componentDidMount () {
        try {
            const key = await AsyncStorage.getItem('@hrdata:data')
            if(key === null) {
                this.setState({
                    loading: false
                })
            } else {
                this.setState({
                    loading: false
                })
                AsyncStorage.getItem('@hrdata:data')
                    .then((res) => {
                        this.props.navigation.navigate('Login', {data: JSON.parse(res)})
                    })
            }
        } catch (error) {
            console.log('error')
        }
    
    }

    render() {
        if(this.state.loading === true) {
            return (
                <Loading />
            )
        }

        return (
            <Container>
                <Content contentContainerStyle={styAuth.content}>
                    <KeyboardAvoidingView behavior='position'>
                        <Form style={styAuth.form}>
                            <Image source={require('../../assets/upload/logo.png')} styl/>
                            <Text style={styAuth.title}>Verification</Text>
                            <Item last floatingLabel style={styAuth.item}>
                                <Label style={styAuth.label}>Enter Your Security Key</Label>
                                <Input 
                                style={styAuth.input} 
                                keyboardType='numeric'
                                onChangeText={(data) => this.keyHandle(data)}
                                secureTextEntry={this.state.secure}
                                />
                                <Icon name={this.state.secure ? 'ios-eye-off' : 'ios-eye'} 
                                style={styAuth.icon} 
                                onPress={() => {
                                    this.setState({
                                        secure: !this.state.secure
                                    })
                                }}
                                />
                            </Item>
                            <Button style={styAuth.button} onPress={() => {this.submitKey()}}>
                                <Text style={styAuth.textButton}>Submit</Text>
                            </Button>
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Overlay overlay={this.state.overlay}/>
            </Container>
        )
    }
}