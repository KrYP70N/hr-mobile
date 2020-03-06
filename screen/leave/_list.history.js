import React, { Component } from 'react'
import { View, Text, Icon, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge } from 'native-base'
import styLeave from './leave.style'
import po from './po'
import offset from '../../constant/offset'
import color from '../../constant/color'

export default class LeaveHistoryList extends Component {
    render () {
        if(this.props.list === [] || this.props.list === null) {
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <View style={styLeave.cardTitleContainer}>
                                <Text style={styLeave.cardTitle}>{po.history.card.title}</Text>
                                <Text style={styLeave.cardRthLabel}>05 Nov 2020</Text>
                            </View>
                            <View style={styLeave.cardTitleContainer}>
                                <Text style={styLeave.cardXSText}>{po.history.card.date}05 Nov 2020</Text>
                                <Badge style={styLeave.badgeSuccess}>
                                    <Text>{po.history.card.badge.success}</Text>
                                </Badge>
                            </View>
                            <Text style={styLeave.cardSText}>{po.history.card.hour}5:00 PM to 8:00 PM</Text>
                        </Body>
                    </CardItem>
                </Card>
            )
        } else {
            return (
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> 
                    <Icon 
                    name="ios-information-circle-outline"
                    style={{
                        fontSize: offset.o4,
                        color: color.placeHolder
                    }}
                    />
                    <Text
                    style={{
                        color: color.placeHolder
                    }}
                    >No data available!</Text>
                </View>
            )
        }
    }
}