import React, { Component } from 'react'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

import { KeyboardAvoidingView, Image, Keyboard, AsyncStorage, BackHandler } from 'react-native'
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

// export default class Login extends Component {

//     constructor (props) {
//         super(props)
//         this.state = {
//             apiUrl: null,
//             db: null,
//             hidePassword: true,
//             user: null,
//             password: null,
//             loading: false,
//             auth: null
//         }
//         // submit
//         this.login = () => {
//             console.log(this.state.apiUrl)
//             console.log(this.state.db)
//             // inject keyboard
//             Keyboard.dismiss()
//             this.setState({
//                 loading: true
//             })
//             APIs.Token(this.state.apiUrl, this.state.db, this.state.user, this.state.password)
//                 .then((res) => {

//                     if (res.status === 'success') {
//                         if(res.data.error === true){
//                             this.setState({
//                                 loading: false
//                             })
//                             Toast.show({
//                                 text: 'user name or password is not correct!',
//                                 textStyle: {
//                                     textAlign: 'center'
//                                 },
//                                 style: {
//                                     backgroundColor: color.primary
//                                 },
//                                 duration: 4000
//                             })
//                         }else{
//                             //test loading
//                             this.setState({
//                                 loading: false
//                             })
//                             let date = new Date()
//                             let exp_date = moment(date).add(res.data.expires_in, 'seconds')
//                             AsyncStorage.setItem('@hr:token', JSON.stringify({
//                                 key: 'Bearer '+ res.data.access_token,
//                                 // key: res.data.access_token,
//                                 id: res.data.employee_id,
//                                 exp: exp_date
//                             }))
//                             .then(() => {
//                                 AsyncStorage.setItem('@hr:login', 'true')
//                                 .then(() => {
//                                     this.setState({
//                                         loading: false
//                                     })
//                                     this.setState({
//                                         user: null,
//                                         password: null
//                                     })
//                                     this.props.navigation.navigate('Main')
//                                 })
//                             })
//                         }

//                     } else {
//                         this.setState({
//                             loading: false
//                         })
//                         Toast.show({
//                             text: 'user name or password is not correct!',
//                             textStyle: {
//                                 textAlign: 'center'
//                             },
//                             style: {
//                                 backgroundColor: color.primary
//                             },
//                             duration: 4000
//                         })
//                     }
//                 })
//         }

//         // handle user field
//         this.user = (key) => {
//             this.setState({
//                 user: key
//             })
//         }

//         // handle password field
//         this.password = (key) => {
//             this.setState({
//                 password: key
//             })
//         }
//     }

//     componentDidMount () {
//         AsyncStorage.getItem('@hr:endPoint')
//         .then((res) => {
//             if(res !== null) {
//                 this.setState({
//                     apiUrl: DB.getEndPoint(res),
//                     db: DB.getName(res)
//                 })
//             }
//         })

//         // check token
//         this.props.navigation.addListener('focus', () => {
//             this.setState({
//                 user: null,
//                 password: null,
//                 loading: true
//             })

//             AsyncStorage.getItem('@hr:token')
//             .then((res) => {
//                 if(res !== null) {
//                     let data = JSON.parse(res)
//                     let diff = moment(data.exp).diff(moment(new Date()), 'hours')
//                     if(diff < 50 && diff > 0) {
//                         // refresh
//                         let token = data.key
//                         let id = data.id

//                         AsyncStorage.getItem('@hr:endPoint')
//                         .then((res) => {
//                             let dataEndPoint = JSON.parse(res)
//                             let url = dataEndPoint.ApiEndPoint

//                         //     APIs.RefreshToken(url, token)
//                         //     .then((res) => {
//                         //         data.key = `Bearer ${res.data.access_token}`
//                         //         AsyncStorage.setItem('@hr:token', JSON.stringify(data))
//                         //         .then(() => {
//                         //             this.props.navigation.navigate('Main')
//                         //         })
//                         //     })
//                         //     .catch(() => {
//                         //         this.setState({
//                         //             loading: false
//                         //         })
//                         //     })
//                          })

//                     // } else if(diff <= 0) {
//                     } else if(diff <= 0) {
//                         // expired
//                         AsyncStorage.removeItem('@hr:token')
//                         .then(() => {
//                             this.setState({
//                                 loading: false
//                             })
//                         })
//                     } else {
//                         this.setState({
//                             loading: false
//                         })
//                         this.props.navigation.navigate('Main')
//                     }
//                 } else {
//                     // logouted
//                     this.setState({
//                         loading: false
//                     })
//                 }
//             })
//         })
//     }

//     render () {
//         console.log("Url", this.state.apiUrl)
//         if(this.state.loading === true) {
//             return (
//                 <Loading info='collect user data ...' />
//             )
//         }

//         if(this.state.apiUrl === null) {
//             return (
//                 <Auth navigation={this.props.navigation}/>
//             )
//         }

//         // if(this.state.auth !== null || this.state.auth !== undefined) {
//         //     this.props.navigation.navigate('Main')
//         // }

//         return (
//             <KeyboardAvoidingView behavior="height" style={styLogin.kbView}>
//                 <Container style={styLogin.container}>
//                     <Image
//                         source={require('../../assets/upload/logo.png')}
//                         style={styLogin.logo}
//                     />
//                     <Text style={styLogin.title}>{po.title}</Text>
//                     <Text style={styLogin.sub}>{po.sub}</Text>

//                     <Item inlineLabel style={styLogin.item}>
//                         <Input value={this.state.user} 
//                         style={styLogin.input}
//                         onChangeText={(key) => this.user(key)} 
//                         placeholder='User Name' 
//                         placeholderTextColor={color.placeHolder}/>
//                     </Item>

//                     <Item inlineLabel style={styLogin.password}>
//                         <Input secureTextEntry={this.state.hidePassword} 
//                             style={styLogin.input}
//                             value={this.state.password}
//                             onChangeText={(key) => { this.password(key) }}
//                             placeholder='Password'
//                             placeholderTextColor={color.placeHolder}
//                         />
//                         <Icon active name={
//                             this.state.hidePassword === true ? 'ios-eye-off' : 'ios-eye'
//                         } onPress={() => {
//                             this.setState({
//                                 hidePassword: !this.state.hidePassword
//                             })
//                         }} style={styLogin.icn} />
//                     </Item>

//                     <Button style={styLogin.button} onPress={this.login}>
//                         <Text style={styLogin.buttonText}>{po.label.btn}</Text>
//                     </Button>

//                     <Button transparent style={styLogin.resetPwd} onPress={() => {
//                         AsyncStorage.removeItem('@hr:endPoint')
//                         .then(() => {
//                             Updates.reload()
//                         })
//                     }}>
//                         <Text style={styLogin.resetTxt}>Change Access Token?</Text>
//                     </Button>
//                 </Container>
//                 <Overlay overlay={this.state.overlay} />
//             </KeyboardAvoidingView>
//         )
//     }
// }

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
                    console.log("Login Res is not null",typeof(res))
                    console.log("Data", res)
                    if (res !== null) {
                        let data = JSON.parse(res)
                        let diff = moment(data.exp).diff(moment(new Date()), 'hours')
                        if (diff < 50 && diff > 0) {
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
                            this.setState({
                                loading: false
                            })
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
        console.log("Click Login")
        console.log("Url", this.state.apiUrl)
        console.log("DB", this.state.db)
        APIs.Token(this.state.apiUrl, this.state.db, this.state.user, this.state.password)
            .then((res) => {
                console.log("RES", res)
                if (res.status === "success") {
                    console.log("Status Success")
                    console.log("Error message", res.data)

                    if (res.data.data) {
                        console.log("Here is error true:::")
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
                    } else {
                        console.log("Error false is here:::")
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


    render() {

        console.log("User name::", this.state.user)
        console.log("Password", this.state.password)
        if (this.state.apiUrl === null) {
            return (
                <Auth navigation={this.props.navigation} />
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

                    {/* <Button transparent style={styLogin.resetPwd} onPress={() => {
                        AsyncStorage.removeItem('@hr:endPoint')
                            .then(() => {
                                Updates.reload()
                            })
                    }}>
                        <Text style={styLogin.resetTxt}>Change Access Token?</Text>
                    </Button> */}
                </Container>
                <Overlay overlay={this.state.overlay} />
            </KeyboardAvoidingView>
        )

    }
}

export default login;
