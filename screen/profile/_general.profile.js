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
        console.log(this.props.data)
        return (
            <View style={styProfile.personalInfo}>
                <Image source={
                    ProfileModel.checkKey(
                    this.props.data, 'Profile Picture') === undefined ?
                    require('../../assets/icon/user.png') : 
                    {
                        uri: ProfileModel.checkKey(this.props.data, 'Profile Picture')[0] + ',' + 
                        ProfileModel.checkKey(this.props.data, 'Profile Picture')[1]
                    }
                } style={styProfile.image}/>
                <Text style={styProfile.id}>{
                    ProfileModel.checkKey(this.props.data, 'Employee Code') === undefined ?
                    'ID - UNKNOWN' : 
                    ProfileModel.checkKey(this.props.data, 'Employee Code')
                }</Text>
                <Text style={styProfile.name}>{
                    ProfileModel.checkKey(this.props.data, 'Employee Name') === undefined ?
                    'UNKNOWN EMPLOYEE' : 
                    ProfileModel.checkKey(this.props.data, 'Employee Name')
                }</Text>
                <Text style={styProfile.jobTitle}>{
                    ProfileModel.checkKey(this.props.data, 'Job Position') === undefined ?
                    'UNKNOWN POSITION' : 
                    ProfileModel.checkKey(this.props.data, 'Job Position')
                }</Text>
            </View>
        )
    }
}