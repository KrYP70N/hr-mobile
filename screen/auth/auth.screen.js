import React, { Component } from 'react'

import Constants from 'expo-constants'

import APIs from '../../controllers/api.controller'
import { Image, AsyncStorage, Keyboard } from 'react-native'
import { View, Text, Container, Content, Form, Item, Label, Input, Body, Button, Textarea } from 'native-base'

import styAuth from './auth.style'
import { KeyboardAvoidingView } from 'react-native'
import Loading from '../../components/loading.component'
import Overlay from '../../components/overlay.component'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: null,
            version: 1,
            auth: null,
            loading: true,
            overlay: false
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
                    
                    // set overlay
                    this.setState({
                        overlay: true
                    })
                    
                    AsyncStorage.setItem('@hrdata:data', {
                        key: this.state.key,
                        data: res
                    })
                        .then(() => {
                            console.log(this.state.key)
                            this.setState({
                                overlay: false
                            })
                        })
                })

        }
    }

    async componentDidMount () {
        try {
            const key = await AsyncStorage.getItem('@hrdata:key')
            if(key === null) {
                this.setState({
                    loading: false
                })
            } else {
                AsyncStorage.getItem('@hrdata:key')
                    .then((res) => {
                        console.log(res)
                    })
            }
        } catch (error) {
            console.log('error')
        }
    
    }

    render() {
        console.log(this.state)
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
                            <Text style={styAuth.title}>Varification</Text>
                            <Item last floatingLabel style={styAuth.item}>
                                <Label style={styAuth.label}>Enter Your Security Key</Label>
                                <Input 
                                style={styAuth.input} 
                                keyboardType='numeric'
                                onChangeText={(data) => this.keyHandle(data)}
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