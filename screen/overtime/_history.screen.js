import React, { Component } from 'react'

import styOt from './overtime.style'
import po from './po'
import { View, Text, Container, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge } from 'native-base'
import color from '../../constant/color'

export default class History extends Component {

    constructor(props) {
        super(props)
        this.state = {
            year: null,
            month: null,
            status: 'all'
        }

        // handel year
        this.chageYear = (year) => {
            this.setState({
                year: year
            })
        }
        
        // handel month
        this.changeMonth = (month) => {
            this.setState({
                month: month
            })
        }

        // handel status
        this.changeStatus = (status) => {
            this.setState({
                status: status
            })
        }
        
    }

    render () {

        let currentYear = new Date().getFullYear()
        if(this.state.year === null) {
            this.setState({
                year: currentYear
            })
        }

        // year render
        let years = []
        
        for(let i=currentYear; i>1986; i--) {
            years.push(i)
        }

        let getYear = years.map((year) => {
            return (
                <Picker.Item label={year.toString()} value={year} key={year}/>
            )
        })

        // month render
        let currentMonth = new Date().getMonth()
        let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        let monthEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let getMonth = months.map((month) => {
            return (
                <Picker.Item label={monthEng[month]} value={month} key={month}/>
            )
        })
        if(this.state.month === null) {
            this.setState({
                month: currentMonth
            })
        }

        return (
            <Container>
                <Content style={styOt.overlay}>
                    <Form style={styOt.container}>
                        <Row>
                            <Col style={styOt.left}>
                                <Item picker style={styOt.picker}>
                                    <Label style={styOt.label}>
                                        <Text>Year</Text>
                                    </Label>
                                    <Picker mode="dialog" 
                                    placeholder="Status"
                                    textStyle={{color: color.primary}}
                                    selectedValue={this.state.year}
                                    onValueChange={this.chageYear.bind(this)}
                                    >
                                        {getYear}
                                    </Picker>
                                </Item>
                            </Col>
                            <Col style={styOt.right}>
                                <Item picker style={styOt.picker}>
                                    <Label style={styOt.label}>
                                        <Text>Month</Text>
                                    </Label>
                                    <Picker mode="dialog" 
                                    placeholder="Status"
                                    textStyle={{color: color.primary}}
                                    selectedValue={this.state.month}
                                    onValueChange={this.changeMonth.bind(this)}
                                    >
                                        {getMonth}
                                    </Picker>
                                </Item>
                            </Col>
                        </Row>
                        <Item picker style={styOt.picker}>
                            <Label style={styOt.label}>
                                <Text>Status</Text>
                            </Label>
                            <Picker mode="dialog" 
                                placeholder="Status"
                                textStyle={{color: color.primary}}
                                selectedValue={this.state.status}
                                onValueChange={this.changeStatus.bind(this)}
                            >
                                <Picker.Item label="all" value="all"/>
                                <Picker.Item label="success" value="success"/>
                                <Picker.Item label="reject" value="reject"/>
                            </Picker>
                        </Item>
                        <Button style={styOt.buttonPrimary}>
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styOt.resultBox}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.history.card.title}</Text>
                                        <Text style={styOt.cardRthLabel}>05 Nov 2020</Text>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardXSText}>{po.history.card.date}05 Nov 2020</Text>
                                        <Badge style={styOt.badgeSuccess}>
                                            <Text>{po.history.card.badge.success}</Text>
                                        </Badge>
                                    </View>
                                    <Text style={styOt.cardSText}>{po.history.card.hour}5:00 PM to 8:00 PM</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    
                    </View>
                </Content>
            </Container>
        )
    }
}