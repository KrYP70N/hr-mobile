import React, { Component } from 'react'
import { View, Text, Container, Content, Row, Col, Form, Item, Label, Input, Picker, Button, Card, CardItem, Body, Badge, Icon } from 'native-base'
import color from '../../constant/color'
import styLeave from './leave.style'
import { KeyboardAvoidingView, AsyncStorage } from 'react-native'
import po from './po'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import offset from '../../constant/offset'

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
            leave: null,
            token: null
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
                month: month + 1 < 10 ? '0' + ( month + 1 ) : month + 1
            })
        }

        // handel status
        this.changeStatus = (status) => {
            this.setState({
                status: status
            })
        }
        
        // update ot list
        this.updateLeave = () => {
            APIs.LeaveMonthly(this.state.url, this.state.auth, this.state.id, this.state.year, this.state.month)
            .then((res) => {
                if(res.status === 'success') {
                    if(this.state.status !== 'all') {
                        let data = res.data.filter(list => list.state === this.state.status)
                        this.setState({
                            leave: data
                        })
                    } else {
                        this.setState({
                            leave: res.data
                        })
                    }
                } else {
                    this.setState({
                        leave: []
                    })
                }
            })
        }
    }

    componentDidMount () {
        // set default date month year
        let date = new Date()
        this.setState({
            year: date.getFullYear(),
            month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        })

        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                url: data['ApiEndPoint']
            })
        })

        AsyncStorage.getItem('@hr:token')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                auth: data['key'],
                id: data['id']
            })
        })
    }

    componentDidUpdate () {
        if(this.state.url !== null && this.state.id !== null && this.state.auth !== null && this.state.leave === null) {
            this.updateLeave()
        }
    }

    render () {
        // loading data
        if(
            this.state.month === null || 
            this.state.year === null ||
            this.state.url === null ||
            this.state.auth === null || 
            this.state.id === null ||
            this.state.leave === null
        ) {
            return (
                <Loading info='loading api data ...'/>
            )
        }

        let currentYear = new Date().getFullYear()
        
        // year render
        let years = []
        
        for(let i=currentYear; i>1986; i--) {
            years.push(i)
        }

        let getYear = years.map((year) => {
            return (
                <Picker.Item label={year.toString()} value={year} key={year} />
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

        // data render
        let GetLeavesRequest = this.state.leave.map((leave) => {
            let background;
            if(leave.state === 'cancel') {
                background = color.placeHolder
            } else if(leave.state === 'reject') {
                background = color.danger
            } else {
                background = color.primary
            }
            console.log(leave)
            return (
                <Card key={Math.floor(Math.random() * 1000)}>
                    <CardItem>
                        <Body>
                            <View style={styLeave.cardTitleContainer}>
                                <Text style={styLeave.cardTitle}>{leave.Leave_Type}</Text>
                                <Text style={styLeave.cardRthLabel}>05 Nov 2020</Text>
                            </View>
                            <View style={styLeave.cardTitleContainer}>
                                <Text style={styLeave.cardXSText}>From : {leave.date_from}</Text>
                                <Badge style={[styLeave.badgeSuccess, {
                                        backgroundColor: background
                                    }
                                ]}>
                                    <Text>{leave.state}</Text>
                                </Badge>
                            </View>
                            <Text style={[styLeave.cardXSText, {marginBottom: offset.o2}]}>To : {leave.date_to}</Text>
                            <Text style={[styLeave.cardSText, {
                                display: leave.Reason === null || leave.Reason === 'null' ? 'none' : 'flex'
                            }]}>{leave.Reason}</Text>
                        </Body>
                    </CardItem>
                </Card>
            )
        })

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
                                    selectedValue={Number(this.state.month) - 1}
                                    onValueChange={this.changeMonth.bind(this)}
                                    >
                                        {getMonth}
                                    </Picker>
                                </Item>
                            </Col>
                        </Row>
                        {/* <Item picker style={styLeave.picker}>
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
                                <Picker.Item label="confirm" value="confirm"/>
                                <Picker.Item label="reject" value="reject"/>
                                <Picker.Item label="cancel" value="cancel"/>
                            </Picker>
                        </Item> */}
                        <Button 
                        style={styLeave.buttonPrimary}
                        onPress={() => this.updateLeave()}
                        >
                            <Text>Search</Text>
                        </Button>
                    </Form>
                    <View style={styLeave.resultBox}>
                        { GetLeavesRequest }

                        <View style={{
                            display: this.state.leave.length === 0 ? 'flex' : 'none',
                            alignItems: "center"
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }}/>
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no leave request for {this.state.month}-{this.state.year}!</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}