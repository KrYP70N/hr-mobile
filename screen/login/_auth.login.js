import React, { Component } from 'react'
import APIs from '../../controllers/api.controller'
import { Image, AsyncStorage, Keyboard } from 'react-native'
import { View, Text, Container, Content, Form, Item, Label, Input, Body, Button, Textarea, Toast, Icon } from 'native-base'

import styAuth from './_auth.style'
import { KeyboardAvoidingView } from 'react-native'
import Loading from '../../components/loading.component'
import Overlay from '../../components/overlay.component'
import color from '../../constant/color'
import { Updates } from 'expo'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: null,
            version: 1,
            loading: false,
            secure: true,
            error: false
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
            this.setState({
                loading: true
            })
            APIs.Auth(this.state.key, this.state.version)
                .then((res) => {
                    if(res.status === 'success') {
                        // save api-infomation
                        AsyncStorage.setItem('@hr:endPoint', JSON.stringify(res.data))
                        .then(() => {
                            this.setState({
                                loading: false,
                                error: false
                            })
                            Updates.reload()
                        })
                    } else {
                        this.setState({
                            loading: false,
                            error: true
                        })
                    }
                    
                })

        }
    }

    async componentDidMount () {
        try {
            const key = await AsyncStorage.getItem('@hr:endPoint')
            if(key !== null) {
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            Toast.show({
                text: 'An Error occur! Please try again in later.',
                textStyle: {
                    textAlign: 'center'
                },
                style: {
                    backgrounfdColor: color.primary
                }
            })
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
                            <Item fixedLabel style={styAuth.item}>
                                {/* <Label style={styAuth.label}>Enter Your Access Token</Label> */}
                                <Input 
                                placeholder = "Enter Your Access Token"
                                placeholderTextColor = {color.placeHolder}
                                style={styAuth.input}
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
                            <Text style={[
                                styAuth.errdisplay,
                                {
                                    display: this.state.error === true ? 'flex' : 'none'
                                }
                            ]}>Invalid sit key!</Text>
                            <Button style={styAuth.button} onPress={() => {this.submitKey()}}>
                                <Text style={styAuth.textButton}>
                                    Submit</Text>
                            </Button>
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Overlay overlay={this.state.overlay}/>
            </Container>
        )
    }
}