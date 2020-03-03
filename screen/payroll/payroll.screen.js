import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { Container, Content, Text, Form, Item, Label, Input, Picker, Row, Col, Button, View, CardItem, Body, Card, Icon, Header, Left, Right } from 'native-base'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import PayrollList from './_list.payroll.screen.'
import offset from '../../constant/offset'
import color from '../../constant/color'


export default class Payroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            month: null,
            year: null,
            payroll: null
        }

        // handel year
        this.changeYear = (year) => {
            this.setState({
                year: year
            })
        }

        // change month
        this.changeMonth = (month) => {
            this.setState({
                month: month
            })
        }

        // search payslip
        this.searchPayroll = () => {
            APIs.yearPayroll(
                this.props.route.params.id,
                this.props.route.params.auth,
                this.props.route.params.url,
                this.state.year
            ).then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        payroll: res.data
                    })
                } else {
                    this.setState({
                        payroll: []
                    })
                }
            })
        }
    }

    render() {

        let date = new Date()

        let years = []
        for (let i = date.getFullYear(); i > 1986; i--) {
            years.push(i)
        }
        let getYear = years.map((year) => {
            return (
                <Picker.Item label={String(year)} value={year} key={year} />
            )
        })


        if (this.state.year === null) {
            this.setState({
                year: date.getFullYear()
            })
        }

        // month section
        let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        let monthEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let getMonth = months.map((month) => {
            return (
                <Picker.Item label={monthEng[month]} value={month} key={month} />
            )
        })
        if (this.state.month === null) {
            this.setState({
                month: date.getMonth()
            })
        }

        if (this.state.payroll === null) {
            this.searchPayroll()
            return (
                <Loading />
            )
        }

        return (
            <Container style={styPayroll.container}>
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
                            }}>Payroll</Text>
                        </Left>
                        <Right></Right>
                    </Header>

                <Content>
                    <Form style={styPayroll.form}>
                        <Row style={styPayroll.fieldSet}>
                            <Col style={styPayroll.right}>
                                <Item picker>
                                    <Label>
                                        <Text>Select Year</Text>
                                    </Label>
                                    <Picker
                                        mode="dialog"
                                        selectedValue={this.state.year}
                                        onValueChange={this.changeYear.bind(this)}
                                    >
                                        {getYear}
                                    </Picker>
                                </Item>
                            </Col>
                        </Row>
                        <Button style={styPayroll.buttonLg} onPress={this.searchPayroll}>
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <PayrollList 
                    data={this.state.payroll} 
                    year={this.state.year} 
                    navigation={this.props.navigation}
                    apidata={{
                        auth: this.props.route.params.auth,
                        url: this.props.route.params.url
                    }}
                    />
                </Content>
            </Container>
        )
    }
}