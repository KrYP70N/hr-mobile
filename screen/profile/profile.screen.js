import React, {Component} from 'react'
import { Image } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text, View } from 'native-base'

import styProfile from './profile.style'
import po from './po'

export default class Profile extends Component {
    render () {
        return (
            <Container>
                <Content style={styProfile.content}>
                    <View style={styProfile.personalInfo}>
                    </View>
                </Content>
            </Container>
        )
    }
}