import React, { Component, useState } from 'react'
import { Container, Header, Left, Icon, Text, Right, Content, View } from 'native-base'

// variable
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './noticeboard.style'
// import { Image } from 'react-native'

// components
import NotiList from './notilist'
import Loading from '../../components/loading.component'

export default class NoticeBoard extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            startDate: '',
            endDate: ''
        }
    }
    componentDidMount(){

    }

    render() {
        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Dashboard') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Notice Board</Text>
                    </View>    
                
                    {/* <Right /> */}
                </Header>
                
                <Content style={styles.container}>
                    <NotiList navigation={this.props.navigation}/>
                </Content>
            </Container>
        )
    }
}