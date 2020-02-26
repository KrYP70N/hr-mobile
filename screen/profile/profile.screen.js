import React, {Component} from 'react'
import { Image } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, View } from 'native-base'

import styProfile from './profile.style'
import po from './po'

import GeneralProfile from './_general.profile'
import WorkProfile from './_work.profile'
import PersonalProfile from './_personal.profile'

export default class Profile extends Component {
    constructor (props) {
        super(props)
    }

    render () {

        let profile_data = this.props.route.params['profile']

        return (
            <Container>
                <Content style={styProfile.content}>
                    <GeneralProfile data={profile_data['General Information']} profileImage={profile_data['Profile Image']}/>
                    <WorkProfile data={profile_data['Work Information']}/>
                    <PersonalProfile data={profile_data['Personal Information']}/>
                </Content>
            </Container>
        )
    }
}