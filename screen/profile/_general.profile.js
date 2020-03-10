import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Text, View } from 'native-base'

import styProfile from './profile.style'
import ProfileModel from '../../model/profile.model'

export default class GeneralProfile extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <View style={styProfile.personalInfo}>
                <View style={styProfile.personalContainer}>
                    <Image source={
                    this.props.data['Profile Picture'][0] === false ?
                        require('../../assets/icon/user.png') :
                        {
                        uri: `data:${this.props.data['Profile Picture'][1]};base64,${this.props.data['Profile Picture'][0]}`
                        }
                    } style={styProfile.profileImage}/>
                </View>
            </View>
        )
    }
}