import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Text, Container, Content, Card, CardItem, Body, Row, Col, Button, View, Toast } from 'native-base'
import APIs from '../../controllers/api.controller'
import color from '../../constant/color'

export default class Approve extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: [],
            token: null
        }

        this.getOTList = () => {
            
            APIs.OTPending(this.props.data.id, this.props.data.auth, this.props.data.url)
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        data: res.data
                    })
                } else {
                    Toast.show({
                        text: 'Network Error',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.danger
                        }
                    })
                }
            })
        }

        this.cancelOT = (data) => {
            APIs.OTCancel(data, this.props.data.auth, this.props.data.url, 'reject')
                .then((res) => {
                    if(res.status === 'success') {
                        this.getOTList()
                        Toast.show({
                            text: 'OT Cancel successful!',
                            textStyle: {
                                textAlign: "center"
                            },
                            style: {
                                backgroundColor: color.primary
                            }
                        })
                    }
                })
        }
    }

    render () {
        console.log(this.state.token)
        if(this.state.token !== this.props.token) {
            this.setState({
                token: this.props.token
            })
            this.getOTList()
        }

        
        let requests = this.state.data.map((req) => {
            return (
                <Card key={req['OT_Obj_Id']+Math.floor(Math.random()*3000)} >
                    <CardItem>
                        <Body>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                            </View>
                            <Text style={styOt.cardXSText}>{po.approve.staff.label1}{req['date']}</Text>
                            <Text style={styOt.cardSText}>{po.approve.staff.label2}{req['hours']}</Text>
                            <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                            <Button 
                            style={styOt.ButtonSecondary}
                            onPress={() => this.cancelOT(req['OT_Obj_Id'])}
                            >
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