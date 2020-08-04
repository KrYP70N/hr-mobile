import React, { Component } from 'react'
import { Image } from 'react-native'
import { Text, View } from 'native-base'

import Moment from 'moment'
import APIs from '../controllers/api.controller'
import Time from '../controllers/time.controller'
import color from '../constant/color'
import { AsyncStorage } from 'react-native'
import DB from '../model/db.model'

export default class Clock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: null,
            shiftData: '',
        }
    }


    setTime = (time) => {
        let t = new Date(time)
        setTimeout(() => {
            this.setState({
                time: t.setSeconds(t.getSeconds() + 1)
            })
        }, 1000)

    }

    componentDidMount() {
        AsyncStorage.getItem('@hr:endPoint')
            .then((res) => {
                let endPoint = DB.getEndPoint(res)

                AsyncStorage.getItem('@hr:token')
                    .then((res) => {
                        let key = DB.getToken(res)
                        let id = DB.getUserId(res)
                        // request time
                        APIs.Time(endPoint, key, id)
                            .then((response) => {
                                if (response.status === 'success') {
                                    //this.setTime(Moment(response.data["Current Server Time"]))
                                    this.setState({
                                        time: Moment(response.data["Current Server Time"]),
                                        shiftData: response.data["Today's Shift"],
                                    })
                                } else {
                                }
                            })
                            .catch((error) => {
                                //this.props.navigation.navigate('Login')
                            })
                    })
            })
    }
    
    componentDidUpdate() {
        // time request
        if (this.state.time !== null) {
            let t = new Date(this.state.time)
            setTimeout(() => {
                this.setState({
                    time: t.setSeconds(t.getSeconds() + 1)
                })
            }, 1000)
        }
    }

    render() {
        let time = this.state.time

        if (this.state.time !== null) {
            if (this.props.view === 'split') {
                return (
                    <View style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Text style={this.props.monthStyle ? this.props.monthStyle : null}>{Time.date(time)} {Time.month(time)} {Time.year(time)}</Text>
                        <Text style={[this.props.style, { textAlign: 'center' }]}>{Time.hour(time)}:{Time.minute(time)}:{Time.second(time)} {Time.part(time)}</Text>
                    </View>
                )
            } else {
                if (this.props.checkScreen === "checkinout") {
                    return (

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, fontSize: 30, color: color.primary, fontWeight: 'bold' }}>
                                {Time.hour(time)}:{Time.minute(time)}:{Time.second(time)} {Time.part(time)}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 18, }}>{Time.day(time)}, {Time.date(time)} {Time.month(time)} {Time.year(time)}</Text>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 60,
                                borderRadius: 25,
                                backgroundColor: color.lighter,
                                marginTop: 20,
                            }}>
                                {this.props.checkIconChange === "checkin" ? <Image style={{
                                    width: 20,
                                    height: 20,
                                }}

                                    source={require('../assets/icon/checkintime.png')} /> : <Image style={{
                                        width: 20,
                                        height: 20,
                                    }}

                                        source={require('../assets/icon/checkouttime.png')} />}

                                <Text style={{
                                    marginLeft: 10,

                                }}>{this.state.shiftData}</Text>
                            </View>
                        </View>
                    )
                } else {
                    return (
                        <Text style={this.props.style}>
                            {Time.hour(time)}:{Time.minute(time)}:{Time.second(time)} {Time.part(time)} {Time.day(time)}, {Time.date(time)} {Time.month(time)} {Time.year(time)}
                        </Text>
                    )
                }

            }
        }

        return (
            <Text style={[this.props.style, {
                width: '100%',
                color: color.light,
                textAlign: 'center'
            }]}>...</Text>
        )

    }
}