import React, { Component } from 'react'

import styOt from './overtime.style'
import po from './po'
import { View, Text, Container, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge } from 'native-base'
import color from '../../constant/color'
import APIs from '../../controllers/api.controller'
import { AsyncStorage } from 'react-native'
import Loading from '../../components/loading.component'

export default class History extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            year: null,
            month: null,
            status: 'all',
            record: null
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

        // handel otlist
        this.getOT = () => {

            let month = this.state.month + 1 < 10 ? '0' + (this.state.month + 1) : this.state.month + 1 

            console.log(month)

            APIs.OTMonthly(this.state.url, this.state.auth, this.state.id, this.state.year, month)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    record : res.data
                })
                
                // if(this.state.status === 'all') {
                //     this.setState({
                //         record : res.data
                //     })
                // } else {
                //     let data = res.data.filter(list => list.state.indexOf(this.state.status) !== -1)
                //     this.setState({
                //         record : data
                //     })
                // }

            })
        }
        
    }

    componentDidMount () {
        // get url
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                url: data['ApiEndPoint']
            })
        })

        // get key && id
        AsyncStorage.getItem('@hr:token')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                auth: data['key'],
                id: data['id']
            })
        })

        let currentYear = new Date().getFullYear()
        if(this.state.year === null) {
            this.setState({
                year: currentYear
            })
        }

        if(this.state.month === null) {
            this.setState({
                month: new Date().getMonth()
            })
        }

    }

    componentDidUpdate () {
        if(
            this.state.url !== null && 
            this.state.auth !== null && 
            this.state.id !== null && 
            this.state.year !== null && 
            this.state.record === null) {
            this.getOT()
        }

    }


    render () {
       

        // year render
        let years = []
        let currentYear = new Date().getFullYear()
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
       
        if(this.state.record === null) {
            return (
                <Loading />
            )
        }

        let records = this.state.record.map((record, idx) => {
            let badge_color = color.primary

            if(record.state === 'cancel') {
                badge_color = color.placeHolder
            } else if(record.state === 'refuse') {
                badge_color = color.danger
            }

            return (
                <Card key={idx.toString()}>
                    <CardItem>
                        <Body>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardTitle}>Name will here</Text>
                            </View>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardXSText}>OT Hours - {record.hour}:{record.minute}</Text>
                                <Badge style={[styOt.badgeSuccess, {
                                    backgroundColor: badge_color
                                }]}>
                                    <Text>{record.state}</Text>
                                </Badge>
                            </View>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardXSText}>From - {record.date_from}</Text>
                            </View>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardXSText}>To - {record.date_to}</Text>
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            )
        })

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
                                <Picker.Item label="confirm" value="confirm"/>
                                <Picker.Item label="refuse" value="refuse"/>
                                <Picker.Item label="cancel" value="cancel"/>
                            </Picker>
                        </Item>
                        <Button style={styOt.buttonPrimary}
                            onPress={this.getOT}
                        >
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styOt.resultBox}>
                        {records}
                    </View>
                    <View style={{
                        display: this.state.record.length === 0 ? 'flex' : 'none',
                        alignItems: 'center'
                    }}>
                        <Text>There is no data for {this.state.month + 1}-{this.state.year}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}