import React, { Component } from 'react'

import { Image, StyleSheet, Platform, AsyncStorage } from 'react-native'
import { Text, View, Row, Col, Card, CardItem, Icon, Toast } from 'native-base'

import offset from '../constant/offset'
import colors from '../constant/color'
import typo from '../constant/typography'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import color from '../constant/color'

import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as geolib from 'geolib'

import APIs from '../controllers/api.controller'
import ProfileModel from '../model/profile.model'
import * as IntentLauncher from 'expo-intent-launcher'

export default class CheckInOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            geofencing: null,
            granted: null,
            lat: 0,
            long: 0,
            userLat: 0,
            userLong: 0,
            radius: 0,
            nextCheckin: false,
            nextCheckout: false,
            url: null,
            token: null,
            id: null
        }

        this.status = (id, auth, url) => {
            APIs.CheckStatus(id, auth, url)
                .then((res) => {
                    this.setState({
                        nextCheckin: res.data['Checkin'],
                        nextCheckout: res.data['Checkout']
                    })
                })
        }

        this.checkin = () => {
            if (this.state.geofencing === false) {
                APIs.Checkin(this.state.url, this.state.auth, this.state.id)
                    .then((res) => {
                        if (res.status === 'success') {
                            Toast.show({
                                text: 'Success Check In',
                                style: {
                                    backgroundColor: color.primary
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 4000
                            })
                            
                        } else {
                            Toast.show({
                                text: 'Invalid Check In',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 4000
                            })
                        }
                    })

            } else {
                let checkRange = geolib.isPointWithinRadius(
                    { latitude: this.state.userLat, longitude: this.state.userLong },
                    { latitude: this.state.lat, longitude: this.state.long },
                    this.state.radius
                )
                if(checkRange === true)  {
                    APIs.Checkin(this.state.url, this.state.token, this.state.id, {lat: this.state.lat, long: this.state.long})
                    .then((res) => {
                        if(res.status === 'success') {
                            Toast.show({
                                text: 'Check in success!',
                                style: {
                                    backgroundColor: color.primary
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 3000
                            })
                        } else {
                            AsyncStorage.setItem('@hr:login', 'false')
                            .then(() => {
                                this.props.navigation.navigate('Login')
                            })
                        }
                    })
                } else {
                    Toast.show({
                        text: 'OPP! Location out of range.',
                        style: {
                            backgroundColor: color.primary
                        },
                        textStyle: {
                            textAlign: 'center'
                        },
                        duration: 3000
                    })
                }
            }
        }

        this.checkout = () => {
            if (this.state.geofencing === false) {
                APIs.Checkout(this.state.url, this.state.auth, this.state.id)
                    .then((res) => {
                        if (res.status === 'success') {
                            Toast.show({
                                text: 'Success Check Out',
                                style: {
                                    backgroundColor: color.primary
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 4000
                            })
                        } else {
                            Toast.show({
                                text: 'Invalid Check Out',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 4000
                            })
                        }
                    })

            } else {
                let checkRange = geolib.isPointWithinRadius(
                    { latitude: this.state.userLat, longitude: this.state.userLong },
                    { latitude: this.state.lat, longitude: this.state.long },
                    this.state.radius
                )
                if(checkRange === true)  {
                    APIs.Checkout(this.state.url, this.state.token, this.state.id, {lat: this.state.lat, long: this.state.long})
                    .then((res) => {
                        if(res.status === 'success') {
                            Toast.show({
                                text: 'Check out success!',
                                style: {
                                    backgroundColor: color.primary
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 3000
                            })
                        } else {
                            AsyncStorage.setItem('@hr:login', 'false')
                            .then(() => {
                                this.props.navigation.navigate('Login')
                            })
                        }
                    })
                } else {
                    Toast.show({
                        text: 'OPP! Location out of range.',
                        style: {
                            backgroundColor: color.primary
                        },
                        textStyle: {
                            textAlign: 'center'
                        },
                        duration: 3000
                    })
                }
            }
        }

    }

    componentDidMount() {
        // check next chekin
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                url: data.ApiEndPoint
            })
            AsyncStorage.getItem('@hr:token')
            .then((res) => {
                let data = JSON.parse(res)
                this.setState({
                    token: data.key,
                    id: data.id
                })
            })
        })
    }

    componentDidUpdate () {

        // collect checkin info
        if(
            this.state.url !== null && 
            this.state.token !== null && 
            this.state.id !== null &&
            this.state.geofencing === null) {
                APIs.Profile(this.state.url, this.state.token, this.state.id)
                .then((res) => {
                    let data = res.data['General Information']
                    this.setState({
                        geofencing: ProfileModel.checkKey(data, 'Geo Fencing'),
                        lat: ProfileModel.checkKey(data, 'Latitude'),
                        long: ProfileModel.checkKey(data, 'Longtitude'),
                        radius: ProfileModel.checkKey(data, 'Radius(m)')
                    })
                })
        }

        // user location
        if(this.state.geofencing === true && this.state.granted === null) {
            // not supported location service
            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    granted: 'error'
                })
                Toast.show({
                    text: 'OPP! Location service is not supported on your device!',
                    duration: 4000,
                    style: {
                        backgroundColor: color.primary
                    },
                    textStyle: {
                        textAlign: 'center'
                    }
                })
            } else {
                Permissions.askAsync(Permissions.LOCATION)
                .then((res) => {
                    if(res.status === 'granted') {
                        this.setState({
                            granted: true
                        })
                        Location.getCurrentPositionAsync()
                        .then((res) => {
                            this.setState({
                                userLat: res.coords.latitude,
                                userLong: res.coords.longitude,
                            })
                        })
                        .catch((error) => {
                            this.setState({
                                granted: 'error'
                            })
                        })
                    } else {
                        this.setState({
                            granted: false
                        })
                    }
                })
            }
        }
        
    }

    render() {
        if(this.state.granted === 'error') {
            return (
                <Row style={styles.row}>
                    <Col>
                        <Card style={styles.cardLocation}>
                            <TouchableNativeFeedback
                                style={styles.locationOn}
                                onPress={
                                    () => {
                                        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
                                    }
                                }
                            > 
                                <Icon name='md-globe' style={styles.map}/>
                                <Text style={styles.placeholder}>OPP, Your device is not supported!</Text>
                            </TouchableNativeFeedback>
                        </Card>
                    </Col>
                </Row>
            )
        }

        if(this.status.geofencing !== false && this.state.granted === false) {
            return (
                <Row style={styles.row}>
                    <Col>
                        <Card style={styles.cardLocation}>
                            <TouchableNativeFeedback
                                style={styles.locationOn}
                                onPress={
                                    () => {
                                        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
                                    }
                                }
                            > 
                                <Icon name='md-globe' style={styles.map}/>
                                <Text style={styles.placeholder}>Please, Turn location service on!</Text>
                            </TouchableNativeFeedback>
                        </Card>
                    </Col>
                </Row>
            )
        }

        return (
            <Row style={styles.row}>
                <Col style={styles.lft}>
                    <Card>
                        <TouchableNativeFeedback
                            style={styles.card}
                            onPress={
                                this.state.geofencing !== null &&
                                this.state.granted !== null
                                ? this.checkin :
                                () => {
                                    Toast.show({
                                        text: 'Connection Err! Please Try again in later.',
                                        style: {
                                            backgroundColor: color.primary
                                        },
                                        textStyle: {
                                            textAlign: 'center'
                                        }
                                    })
                                }
                            }
                        >
                            <View style={styles.view}>
                                <Icon
                                    name='time'
                                    style={[styles.icon,
                                    this.state.nextCheckin === true ?
                                        { opacity: 0.5 } : null
                                    ]}
                                />
                                <Text style={[styles.text,
                                this.state.nextCheckin === true ?
                                    { opacity: 0.5 } : null
                                ]}>Check In</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Card>
                </Col>
                <Col style={styles.rht}>
                    <Card>
                        <TouchableNativeFeedback style={styles.card}
                            onPress={
                                this.state.geofencing !== null &&
                                this.state.granted !== null
                                ? this.checkout : () => {
                                Toast.show({
                                    text: 'Connection Err! Please Try again in later.',
                                    style: {
                                        backgroundColor: color.primary
                                    },
                                    textStyle: {
                                        textAlign: 'center'
                                    }
                                })
                            }}
                        >
                            <View style={styles.view}>
                                <Icon name='time' style={[styles.icon,
                                this.state.nextCheckin === true ?
                                    { opacity: 0.5 } : null
                                ]} />
                                <Text style={[styles.text,
                                this.state.nextCheckin === true ?
                                    { opacity: 0.5 } : null
                                ]}>Check Out</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        paddingLeft: offset.o1,
        paddingRight: offset.o1,
        paddingBottom: offset.o1
    },
    lft: {
        paddingRight: offset.oh
    },
    rht: {
        paddingLeft: offset.oh
    },
    card: {
        minHeight: 120
    },
    locationOn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        padding: offset.o2
    },
    view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: offset.o2
    },
    icon: {
        color: colors.primary,
        marginBottom: offset.o1
    },
    text: {
        ...typo.subHeader,
        color: color.secondary
    },
    cardLocation: {
        borderRadius: offset.o1
    },
    placeholder: {
        ...typo.placeholder
    },
    map: {
        fontSize: offset.o5,
        color: color.placeHolder,
        marginBottom: offset.o1
    }
})