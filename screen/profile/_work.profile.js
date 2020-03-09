import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Text, View, Card, CardItem, Body } from 'native-base'

import styProfile from './profile.style'
import ProfileModel from '../../model/profile.model'

export default class WorkProfile extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        
        // let data = this.props.data
        let InfoItems = this.props.data.map(data => {
            return (
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            {ProfileModel.getKey(data)}
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {ProfileModel.getVal(data)}
                        </Text>
                    </Body>
                </CardItem>
            )
        })
        return (
            <Card style={styProfile.workInfos}>
                { InfoItems }
            </Card>
            
        )
    }
}