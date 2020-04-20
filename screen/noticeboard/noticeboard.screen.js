import React, { Component, useState } from 'react'
import { Container, Header, Left, Icon, Text, Right, Content } from 'native-base'

// variable
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './noticeboard.style'
import { Image } from 'react-native'

// components
import NotiList from './notilist'

export default class Dashboard extends Component {
    render() {
        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Notice Board</Text>
                    </Left>
                    <Right>
                        <Image source={require('../../assets/icon/delete-button.png')} style={{
                            width: 20,
                            height: 25
                        }}/>
                    </Right>
                </Header>
                
                <Content style={styles.container}>
                    <NotiList />
                </Content>
            </Container>
        )
    }
}
