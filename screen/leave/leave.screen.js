import React, { Component } from 'react'
import { View, Text, Container, Tab, Tabs, Header, Left, Right, Icon } from 'native-base'

import styLeave from './leave.style'
import LeaveRequest from './_request.screen'
import LeaveApprove from './_approve.screen'
import LeaveHistory from './_history.screen'

import offset from '../../constant/offset'
import color from '../../constant/color'
import APIs from '../../controllers/api.controller'

export default class Leave extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            id: this.props.route.params.id,
            url: this.props.route.params.url,
            auth: this.props.route.params.auth
        }
    }

    render () {

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
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary
                        }}>Leave</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <Tabs onChangeTab={() => {
                    console.log('change tabs')
                }}>
                    <Tab heading='Request' activeTabStyle={styLeave.tabStyle} tabStyle={styLeave.tabStyle}>
                        <LeaveRequest 
                            id={this.state.id}
                            url={this.state.url}
                            auth={this.state.auth}
                        />
                    </Tab>
                    <Tab heading='Approve' activeTabStyle={styLeave.tabStyle} tabStyle={styLeave.tabStyle}>
                        <LeaveApprove 
                            id={this.state.id}
                            url={this.state.url}
                            auth={this.state.auth}
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