import React, { Component } from 'react'

import { Image, StyleSheet } from 'react-native'
import { Text, View, Row, Col, Card, CardItem, Icon, Toast } from 'native-base'

import offset from '../constant/offset'
import colors from '../constant/color'
import typo from '../constant/typography'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import color from '../constant/color'

import APIs from '../controllers/api.controller'
import ProfileModel from '../model/profile.model'

export default class CheckInOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            geofacing: false,
            lat: null,
            long: null,
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
            if (!this.state.geofacing) {

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
                // tracing ge
            }
        }

        this.checkout = () => {
            if (!this.state.geofacing) {
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
                // geo facing in here
            }
        }
    }

    componentDidMount() {
        // check geo fencing
        this.setState({
            geofacing: ProfileModel.checkKey(this.props.data, 'Geo Fencing') ? true : false
        })

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
                            onPress={this.state.nextCheckin === true ? this.checkin : 
                                () => {
                                    Toast.show({
                                        text: 'Invalid Check In!',
                                        style: {
                                            backgroundColor: color.danger
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
                                this.state.nextCheckin === false ?
                                { opacity: 0.5 } : null
                                ]}
                                />
                                <Text style={[styles.text,
                                this.state.nextCheckin === false ?
                                { opacity: 0.5 } : null
                                ]}>Check In</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Card>
                </Col>
                <Col style={styles.rht}>
                    <Card>
                        <TouchableNativeFeedback style={styles.card}
                            onPress={this.state.nextCheckout === true ? this.checkout : () => {
                                    Toast.show({
                                        text: 'Invalid Check Out!',
                                        style: {
                                            backgroundColor: color.danger
                                        },
                                        textStyle: {
                                            textAlign: 'center'
                                        }
                                    })
                                }}
                        >
                            <View style={styles.view}>
                                <Icon name='time' style={[styles.icon,
                                this.state.nextCheckin === false ?
                                { opacity: 0.5 } : null
                                ]} />
                                <Text style={[styles.text,
                                this.state.nextCheckin === false ?
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