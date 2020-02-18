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

                    {/* profile info */}
                    <View style={styProfile.personalInfo}>
                        <Image source={require('../../assets/icon/user.png')} style={styProfile.image}/>
                        <Text style={styProfile.id}>ID - 123456</Text>
                        <Text style={styProfile.name}>John Doe</Text>
                        <Text style={styProfile.jobTitle}>Web Developer</Text>
                    </View>

                    {/* work info */}
                    <Card style={styProfile.workInfos}>
                        <CardItem style={styProfile.infoItem}>
                            <Body>
                                <Text style={styProfile.workLabel}>Department</Text>
                                <Text style={styProfile.workInfo}>IT</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={styProfile.infoItem}>
                            <Body>
                                <Text style={styProfile.workLabel}>Date of Joining</Text>
                                <Text style={styProfile.workInfo}>01/05/2018</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={styProfile.infoItem}>
                            <Body>
                                <Text style={styProfile.workLabel}>E-mail</Text>
                                <Text style={styProfile.workInfo}>johndoe@innovixhr.com</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    
                    {/* personal info */}
                    <Text style={styProfile.sectionTitle}>Contact Info</Text>
                    <Card style={styProfile.workInfos}>
                        <CardItem style={styProfile.infoItem}>
                            <Body>
                                <Text style={styProfile.workLabel}>Phone</Text>
                                <Text style={styProfile.workInfo}>09 967 891121</Text>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        )
    }
}