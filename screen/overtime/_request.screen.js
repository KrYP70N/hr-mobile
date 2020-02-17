import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Container, Content, Form, Text, Item, Input, Label, Icon, Row, Col, Button, Textarea } from 'native-base'
import color from '../../constant/color'
import { KeyboardAvoidingView } from 'react-native'

export default class Request extends Component {
    render () {
        return (
            <Container>
                <KeyboardAvoidingView style={{flex: 1}} behavior="height">
                    <Content style={styOt.requestBox}>
                        <Form>
                            <Item floatingLabel last>
                                <Label style={styOt.label}>Overtime Date</Label>
                                <Input style={styOt.input} />
                                <Icon name="calendar" style={styOt.icon}/>
                            </Item>
                            <Row>
                                <Col style={styOt.left}>
                                    <Item floatingLabel last>
                                        <Label style={styOt.label}>Start Time</Label>
                                        <Input style={styOt.input} />
                                    </Item>       
                                </Col>
                                <Col style={styOt.right}>
                                    <Item floatingLabel last>
                                        <Label style={styOt.label}>End Time</Label>
                                        <Input style={styOt.input} />
                                    </Item>       
                                </Col>
                            </Row>
                            
                            <Textarea rowSpan={5} bordered placeholder="Reason" placeholderTextColor={color.placeHolder} style={styOt.textarea}/>   
                        </Form>
                    </Content>
                    <Button style={styOt.button}>
                        <Text>Submit</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Container>
        )
    }
}