import React, { Component, useState } from 'react'
import { Container, Header, Left, Icon, Text, Right, Content, } from 'native-base'
import { View, SafeAreaView } from 'react-native'

// variable
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './noticeboard.style'
// import { Image } from 'react-native'

// components
import NotiList from './notilist'
import Loading from '../../components/loading.component'

export default class NoticeBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            startDate: '',
            endDate: ''
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Notice Board</Text>
                    </View>
                    {/* <Header style={{
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
                        }} onPress={() => { 
                            this.props.route.params.pageFrom == "Dashboard" ? this.props.navigation.navigate('Dashboard') : this.props.navigation.navigate('Main') 
                            //this.props.navigation.navigate('Main')
                        }}/>
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Notice Board</Text>
                    </View>    
                </Header> */}

                    <Content style={styles.container}>
                        <NotiList navigation={this.props.navigation} />
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}
