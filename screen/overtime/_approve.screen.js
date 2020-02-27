import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Text, Container, Content, Card, CardItem, Body, Row, Col, Button, View } from 'native-base'
import APIs from '../../controllers/api.controller'

export default class Approve extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: []
        }
    }

    render () {
        
        if(this.state.data.length === 0) {
            APIs.OTPending(this.props.data.id, this.props.data.auth, this.props.data.url)
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        data: res.data
                    })
                }
            })
        }

        
        let requests = this.state.data.map((req) => {
            console.log(req)
            return (
                <Card key={req['overtime_emp_id']}>
                    <CardItem>
                        <Body>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                            </View>
                            <Text style={styOt.cardXSText}>{po.approve.staff.label1}{req['date']}</Text>
                            <Text style={styOt.cardSText}>{po.approve.staff.label2}{req['hours']}</Text>
                            <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                            <Button style={styOt.ButtonSecondary}>
                                <Text>{po.approve.staff.button}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            )
        })

        return (
            <Container style={styOt.container}>
                <Content>
                    {requests}
                </Content>
            </Container>
        )
    }
}