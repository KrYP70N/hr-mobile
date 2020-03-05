import React, { Component } from 'react'
import { View, Text, Container, Tab, Tabs, Header, Left, Right, Icon } from 'native-base'

import styLeave from './leave.style'
import LeaveRequest from './_request.screen'
import LeaveApprove from './_approve.screen'
import LeaveHistory from './_history.screen'

import offset from '../../constant/offset'
import color from '../../constant/color'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import { AsyncStorage, Platform, StatusBar } from 'react-native'

export default class Leave extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            url: null,
            auth: null,
            id: null,
            count: 0
        }
    }

    componentDidMount () {
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            this.setState({
                url: JSON.parse(res).ApiEndPoint
            })
            AsyncStorage.getItem('@hr:token')
            .then((res) => {
                this.setState({
                    auth: JSON.parse(res).key,
                    id: JSON.parse(res).id
                })
            })
        })
    }

    render () {
        if(this.state.url === null || this.state.auth === null || this.state.id === null) {
            return (
                <Loading />
            )
        }

        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
                    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
                            color: color.secondary
                        }}>Leave</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <Tabs>
                    <Tab heading='Request' activeTabStyle={styLeave.tabStyle} tabStyle={styLeave.tabStyle}>
                        <LeaveRequest 
                            id={this.state.id}
                            url={this.state.url}
                            auth={this.state.auth}
                        />
                    </Tab>
                    <Tab
                        
                        heading='Approve' activeTabStyle={styLeave.tabStyle} tabStyle={styLeave.tabStyle}>
                        <LeaveApprove 
                            id={this.state.id}
                            url={this.state.url}
                            auth={this.state.auth}
                            count={this.state.count}
                        />
                    </Tab>
                    <Tab heading='History' activeTabStyle={styLeave.tabStyle} tabStyle={styLeave.tabStyle}>
                        <LeaveHistory />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}