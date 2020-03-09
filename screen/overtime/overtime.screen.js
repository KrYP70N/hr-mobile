import React, {Component} from 'react'
import { View, Text, Content, Container, Tabs, Tab, Header, Left, Right, Icon } from 'native-base'

import styOt from './overtime.style'
import po from './po'


import Request from './_request.screen'
import Approve from './_approve.screen'
import History from './_history.screen'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Loading from '../../components/loading.component'
import { AsyncStorage } from 'react-native'


export default class Overtime extends Component {
    constructor (props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            token: 1
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

        if(this.state.url === null && this.state.auth === null && this.state.id === null) {
            return (
                <Loading />
            )
        }

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
                        }}>Overtime</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <Tabs onChangeTab={() => {
                    this.setState({
                        token: this.state.token + 1
                    })
                }}>
                    <Tab heading="Request" tabStyle={{
                        backgroundColor: color.primary
                    }} activeTabStyle={{
                        backgroundColor: color.primary
                    }}>
                        <Request data={this.state} />
                    </Tab>
                    <Tab heading="Approve" tabStyle={{
                        backgroundColor: color.primary
                    }} activeTabStyle={{
                        backgroundColor: color.primary
                    }}>
                        <Approve data={this.state} token={this.state.token} />
                    </Tab>
                    <Tab heading="History" tabStyle={{
                        backgroundColor: color.primary
                    }} activeTabStyle={{
                        backgroundColor: color.primary
                    }}>
                        <History data={this.state} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}