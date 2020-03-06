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
                <Image source={
                    this.props.profileImage[0] === false ? 
                    require('../../assets/icon/user.png') :
                    {
                        uri: `data:${this.props.profileImage[1]};base64,${this.props.profileImage[0]}`
                    }
                } style={styProfile.image}/>
                <Text style={styProfile.id}>{
                    this.props.data['Employee Code'] === undefined ?
                    'ID - UNKNOWN' : 
                    this.props.data['Employee Code']
                }</Text>
                <Text style={styProfile.name}>{
                    this.props.data['Employee Name'] === undefined ?
                    'UNKNOWN EMPLOYEE' : 
                    this.props.data['Employee Name']
                }</Text>
                <Text style={styProfile.jobTitle}>{
                    this.props.data['Job Position'] === undefined ?
                    'UNKNOWN TITLE' : 
                    this.props.data['Job Position']
                }</Text>
            </View>
        )
    }
}