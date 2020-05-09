import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Left, Right, Icon, Container, Content, Header } from 'native-base'

export class EmployeeLeaveApproved extends Component {
    render() {
        return (
           <Container>
                <Header style={{
                    backgroundColor: color.light,
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
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>{params['Subject'].slice(0, 8)} {params['Subject'].length > 8 && '...'}</Text>
                    </Left>
                    <Right>
                        <Image source={require('../../assets/icon/delete-button.png')} style={{
                            width: 20,
                            height: 25
                        }}/>
                    </Right>
                </Header>
                <Content></Content>
           </Container>
        )
    }
}

export default EmployeeLeaveApproved
