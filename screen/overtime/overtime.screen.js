import React, {Component} from 'react'
import { View, Text, Content, Container, Tabs, Tab, Header } from 'native-base'

import styOt from './overtime.style'
import po from './po'


import Request from './_request.screen'
import Approve from './_approve.screen'
import History from './_history.screen'
import color from '../../constant/color'


export default class Overtime extends Component {
    constructor (props) {
        super(props)
        this.state = {
            auth: this.props.route.params.data['auth'],
            url: this.props.route.params.url,
            id: this.props.route.params.id
        }
    }

    render () {
        return (
            <Container>
                <Tabs >
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
                        <Approve data={this.state} />
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