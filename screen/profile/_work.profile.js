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

        let data = this.props.data
        
        return (
            <Card style={styProfile.workInfos}>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Branch
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Branch']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Company
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Company']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Deparment
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Deparment']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Grade
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Grade']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Join Date
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Join Date']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Location
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Location']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Service Year
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Service Year']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Work Email
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Work Email']}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={styProfile.infoItem} key={ProfileModel.getKey(data)}>
                    <Body>
                        <Text style={styProfile.workLabel}>
                            Work Phone
                        </Text>
                        <Text style={styProfile.workInfo}>
                            {data['Work Phone']}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
            
        )
    }
}