import React, { Component } from 'react'
import { Text, View } from 'native-base'

import Moment from 'moment'
import APIs from '../controllers/api.controller'
import Time from '../controllers/time.controller'
import color from '../constant/color'

export default class Clock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: null
        }
    }

    componentDidMount () {
        // time request
        if (this.props.auth !== null && this.state.time === null) {
            APIs.Time(this.props.auth, this.props.url)
                .then((res) => {
                    if (res.status === 'success') {
                        this.setState({
                            time: Moment(res.data).format()
                        })
                    } else {
                        this.props.navigation.navigate('Login')
                    }
                })
        }
    }

    componentDidUpdate () {
         // time request
         if(this.state.time !== null) {
            let t = new Date(this.state.time)
            setTimeout(() => {
                this.setState({
                    time: t.setSeconds(t.getSeconds() + 1)
                })
            }, 1000)
        }
    }

    render () {
        let time = this.state.time

        if(this.state.time !== null) {
            if(this.props.view === 'split' ) {
                return (
                    <View style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Text style={this.props.monthStyle ? this.props.monthStyle : null}>{Time.date(time)} {Time.month(time)} {Time.year(time)}</Text>
                        <Text style={[this.props.style, {textAlign: 'center'}]}>{Time.hour(time)}:{Time.minute(time)}:{Time.second(time)} {Time.part(time)}</Text>
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
        
        return (
            <Text style={{
                width: '100%',
                color: color.light,
                textAlign: 'center'
            }}>...</Text>
        )
        
    }
}