import React, { Component, useState } from 'react'
import { Container, Header, Left, Icon, Text, Right, Content, View } from 'native-base'

// variable
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './noticeboard.style'
// import { Image } from 'react-native'

// components

export default class Dashboard extends Component {
    render() {
        const { params } = this.props.route
        
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
                        }} onPress={() => { this.props.navigation.navigate('NoticeBoard') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>{params['Subject'].slice(0, 8)} {params['Subject'].length > 8 && '...'}</Text>
                    </Left>
                    <Right>
                        {/* <Image source={require('../../assets/icon/delete-button.png')} style={{
                            width: 20,
                            height: 25
                        }}/> */}
                    </Right>
                </Header>
                
                <Content style={{
                    backgroundColor: color.lighter
                }}>
                    {/* banner */}
                    <View style={styles.banner}>
                        <Text style={styles.bannerTitle}>{params['Subject']}</Text>
                    </View>

                    {/* body */}
                    <View style={styles.container}>
                        <Text style={styles.detailDate}>{params['Date']}</Text>
                        <Text style={styles.detailTitle}>{
                            params['Channel']
                        }</Text>
                        <Text style={styles.detailBody}>{
                            params['Body']
                            .replace(/<\/?[^>]+(>|$)/g, "")
                            .replace(/\s+/g,' ').trim()
                        }</Text>
                        <Text style={styles.detailSender}>- {params['Author']}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
