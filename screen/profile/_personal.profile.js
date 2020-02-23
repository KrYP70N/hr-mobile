import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Text, View, Card, CardItem, Body } from 'native-base'

import styProfile from './profile.style'
import ProfileModel from '../../model/profile.model'

export default class PersonalProfile extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        
        // let data = this.props.data
        let InfoItems = this.props.data.map(data => {
            return (
                <CardItem style={styProfile.infoItem} >
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
            <View style={{marginBottom: 20}}>
                <Text style={styProfile.sectionTitle}>Personal Infomation</Text>
                <Card style={styProfile.workInfos}>
                    { InfoItems }
                </Card>
            </View>
        )
    }
}