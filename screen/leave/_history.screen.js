import React, { Component } from 'react'
import { View, Text, Container, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge } from 'native-base'
import color from '../../constant/color'
import styLeave from './leave.style'
import { KeyboardAvoidingView, AsyncStorage } from 'react-native'
import po from './po'
import APIs from '../../controllers/api.controller'

import LeaveHistoryList from './_list.history'

export default class LeaveHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            year: null,
            month: null,
            status: 'all',
            leave: null
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

    componentDidUpdate () {
        if(
            this.state.url !== null &&
            this.state.auth !== null && 
            this.state.id !== null &&
            this.state.year !== null &&
            this.state.month !== null &&
            this.state.leave === null
        ) {
            APIs.leaveHistory(this.state.url, this.state.auth, this.state.id, this.state.year, this.state.month)
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        leave: this.res
                    })
                } else {
                    this.setState({
                        leave: []
                    })
                }
            })
        }
    }
    

    render () {
        console.log(this.state)
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
                <Content style={styLeave.overlay}>
                    <Form style={styLeave.container}>
                        <Row>
                            <Col style={styLeave.left}>
                                <Item picker style={styLeave.picker}>
                                    <Label style={styLeave.label}>
                                        <Text style={styLeave.placeholder}>Year</Text>
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
                            <Col style={styLeave.right}>
                                <Item picker style={styLeave.picker}>
                                    <Label style={styLeave.label}>
                                        <Text style={styLeave.placeholder}>Month</Text>
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
                        <Item picker style={styLeave.picker}>
                            <Label style={styLeave.label}>
                                <Text style={styLeave.placeholder}>Status</Text>
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
                        <Button style={styLeave.buttonPrimary}>
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styLeave.resultBox}>
                        <LeaveHistoryList list={this.state.leave}/>
                    </View>
                </Content>
            </Container>
        )
    }
}