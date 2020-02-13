import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native'

// import native base
import { 
    Container, 
    Header, 
    Content, 
    Tab, 
    Tabs,
    Footer,
    FooterTab,
    Button
} from 'native-base';


// icon set
import Icon from 'react-native-vector-icons/Feather'

// import component
import Card from '../../components/card.component'


// import constant & style

import color from '../../constant/colors.constant'
import style from '../../constant/style.constant'
import attendance from '../../constant/attendance.constant'

// import leave modules
import Request from './request.leave'
import Approve from './approve.leave'
import History from './history.leave'

// export 
export default class LeaveScreen extends Component {
    render () {
        return (
            <Container>
                <Tabs>
                    <Tab heading="Request" tabStyle={{backgroundColor: color.primary}} activeTabStyle={{backgroundColor: color.primary}}>
                        <Request />
                    </Tab>
                    <Tab heading="Approve" tabStyle={{backgroundColor: color.primary}} activeTabStyle={{backgroundColor: color.primary}}>
                        <Approve />
                    </Tab>
                    <Tab heading="History" tabStyle={{backgroundColor: color.primary}} activeTabStyle={{backgroundColor: color.primary}}>
                        <History />
                    </Tab>
                </Tabs>
                
            </Container>
        )
    }
}