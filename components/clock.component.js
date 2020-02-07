import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'

import APIs from '../controller/api.controller'

export default class Clock extends Component {

    constructor (props) {
        super(props)
        this.state = {
            serverTime: null,
            hour: null,
            minute: null,
            second: null,
            part: null
        }
    }

    componentDidMount () {
        // get server time
        if(this.state.serverTime === null) {
            APIs.getServerTime(this.props.token)
            .then((res) => {                
                this.setState({
                    serverTime: res.data['Current Server Time']
                })
            })
        }

    }

    render () {
        return (
            <Text style={this.props.style}>{this.state.serverTime}</Text>
        )
    }
}