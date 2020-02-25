import React, { Component } from 'react'

import { Image, StyleSheet } from 'react-native'
import { Text, View, Row, Col, Card, CardItem, Icon } from 'native-base'

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
        }

        this.checkin = () => {
            if(!this.state.geofacing) {
                alert('hola')
            } else {
                
                // tracing geo

            }
        }
    }

    componentDidMount () {
        this.setState({
            geofacing: ProfileModel.checkKey(this.props.data, 'Geo Fencing') ? true : false
        })
    }

    render() {
        return (
            <Row style={styles.row}>
                <Col style={styles.lft}>
                    <Card>
                        <TouchableNativeFeedback 
                        style={styles.card}
                        onPress={this.checkin}
                        >
                            <View style={styles.view}>
                                <Icon name='time' style={styles.icon} />
                                <Text style={styles.text}>Check In</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Card>
                </Col>
                <Col style={styles.rht}>
                    <Card>
                        <TouchableNativeFeedback style={styles.card}>
                            <View style={styles.view}>
                                <Icon name='time' style={styles.icon} />
                                <Text style={styles.text}>Check Out</Text>
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
        padding: offset.o1
    },
    lft: {
        paddingRight: offset.o1
    },
    rht: {
        paddingLeft: offset.o1
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