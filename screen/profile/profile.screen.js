import React, {Component} from 'react'
import { Image } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, View, Header, Left, Right, Icon } from 'native-base'

import styProfile from './profile.style'
import po from './po'

import GeneralProfile from './_general.profile'
import WorkProfile from './_work.profile'
import PersonalProfile from './_personal.profile'
import color from '../../constant/color'
import offset from '../../constant/offset'

export default class Profile extends Component {
    constructor (props) {
        super(props)
    }

    render () {

        let profile_data = this.props.route.params['profile']

        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light
                }}>
                    <Left style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => {this.props.navigation.navigate('Main')}}/>
                        <Text style={{
                            fontSize: offset.o2,
                            color: color.secondary
                        }}>Profile</Text>
                    </Left>
                    <Right></Right>
                </Header>
                
                <Content style={styProfile.content}>
                    <GeneralProfile data={profile_data['General Information']} profileImage={profile_data['Profile Image']}/>
                    <WorkProfile data={profile_data['Work Information']}/>
                    <PersonalProfile data={profile_data['Personal Information']}/>
                </Content>
            </Container>
        )
    }
}