import React, { Component } from 'react'

import { Image, StyleSheet, Platform } from 'react-native'
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

export default class CheckInOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            geofencing: false,
            lat: null,
            long: null,
            radius: null,
            nextCheckin: false,
            nextCheckout: false
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
            if (!this.state.geofencing) {

                APIs.Checkin(this.props.userid, this.props.auth, this.props.url)
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
                                duration: 3000
                            })
                            this.status(this.props.userid, this.props.auth, this.props.url)
                        } else {
                            Toast.show({
                                text: 'Invalid Check In',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 3000
                            })
                        }
                    })

            } else {
                this.fencing()
                    .then((res) => {
                        console.log(res.latitude, res.longitude)
                        console.log(this.state.lat, this.state.long)

                        let checkRange = geolib.isPointWithinRadius(
                            { latitude: res.latitude, longitude: res.longitude },
                            { latitude: this.state.lat, longitude: this.state.long },
                            this.state.radius
                        )

                        console.log(checkRange)
                        
                        if (checkRange === false) {
                            Toast.show({
                                text: 'Opp! You are out of range.',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: "center"
                                },
                                duration: 3000
                            })
                        } else {
                            APIs.Checkin(this.props.userid, this.props.auth, this.props.url, {lat: res.latitude, long: res.longitude})
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
                                            duration: 3000
                                        })
                                        this.status(this.props.userid, this.props.auth, this.props.url)
                                    } else {
                                        Toast.show({
                                            text: 'Invalid Check In',
                                            style: {
                                                backgroundColor: color.danger
                                            },
                                            textStyle: {
                                                textAlign: 'center'
                                            },
                                            duration: 3000
                                        })
                                    }
                                })
                        }
                    })
            }
        }

        this.checkout = () => {
            if (!this.state.geofencing) {
                APIs.Checkout(this.props.userid, this.props.auth, this.props.url)
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
                                duration: 3000
                            })
                            this.status(this.props.userid, this.props.auth, this.props.url)
                        } else {
                            Toast.show({
                                text: 'Invalid Check Out',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: 'center'
                                },
                                duration: 3000
                            })
                        }
                    })
            } else {
                this.fencing()
                    .then((res) => {
                        let checkRange = geolib.isPointWithinRadius(
                            { latitude: res.latitude, longitude: res.longitude },
                            { latitude: this.state.lat, longitude: this.state.long },
                            this.state.radius
                        )
                        if (checkRange === false) {
                            Toast.show({
                                text: 'Opp! You are out of range.',
                                style: {
                                    backgroundColor: color.danger
                                },
                                textStyle: {
                                    textAlign: "center"
                                },
                                duration: 3000
                            })
                        } else {
                            APIs.Checkout(this.props.userid, this.props.auth, this.props.url, {lat: res.latitude, long: res.longitude})
                                .then((res) => {
                                    console.log(res)
                                    if (res.status === 'success') {
                                        Toast.show({
                                            text: 'Success Check Out',
                                            style: {
                                                backgroundColor: color.primary
                                            },
                                            textStyle: {
                                                textAlign: 'center'
                                            },
                                            duration: 3000
                                        })
                                        // this.status(this.props.userid, this.props.auth, this.props.url)
                                    } else {
                                        Toast.show({
                                            text: 'Invalid Check Out',
                                            style: {
                                                backgroundColor: color.danger
                                            },
                                            textStyle: {
                                                textAlign: 'center'
                                            },
                                            duration: 3000
                                        })
                                    }
                                })
                        }
                    })
            }
        }

        // geo fencing
        this.fencing = async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== 'granted') {
                Toast.show({
                    text: 'Permission to access location was denied',
                    duration: 6000,
                    style: {
                        backgroundColor: color.primary
                    },
                    textStyle: {
                        textAlign: 'center'
                    }
                })
            } else {
                let location = await Location.getCurrentPositionAsync({});
                return location.coords
            }
        }
    }

    componentDidMount() {
        // check geo fencing
        if (ProfileModel.checkKey(this.props.data, 'Geo Fencing')) {
            this.setState({
                lat: ProfileModel.checkKey(this.props.data, 'Latitude'),
                long: ProfileModel.checkKey(this.props.data, 'Longtitude'),
                radius: ProfileModel.checkKey(this.props.data, 'Radius(m)'),
                geofencing: true
            })

            // tracing geo
            if (Platform.OS === 'android' && !Constants.isDevice) {
                Toast.show({
                    text: 'OPP! Location service is not supported on your device!',
                    duration: 6000,
                    style: {
                        backgroundColor: color.primary
                    },
                    textStyle: {
                        textAlign: 'center'
                    }
                })
            } else {
                this.fencing()
            }
        }

        // check next chekin
        this.status(this.props.userid, this.props.auth, this.props.url)
    }

    render() {
        return (
            <Row style={styles.row}>
                <Col style={styles.lft}>
                    <Card>
                        <TouchableNativeFeedback
                            style={styles.card}
                            onPress={this.state.nextCheckin === false ? this.checkin :
                                () => {
                                    Toast.show({
                                        text: 'You already check in!',
                                        style: {
                                            backgroundColor: color.secondary
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
                            onPress={this.state.nextCheckout === false ? this.checkout : () => {
                                Toast.show({
                                    text: 'You already Check Out!',
                                    style: {
                                        backgroundColor: color.secondary
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
    }
})