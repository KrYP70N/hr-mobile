import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Container, Content, Form, Text, Item, Input, Label, Icon, Row, Col, Button, Textarea, DatePicker, View } from 'native-base'
import color from '../../constant/color'
import { KeyboardAvoidingView } from 'react-native'

export default class Request extends Component {

    constructor (props) {
        super(props)
        this.state = {
            date: null
        }
        
    }

    render () {
        return (
            <Container>
                <KeyboardAvoidingView style={{flex: 1}} behavior="height">
                    <Content style={styOt.container}>
                        <Form>
                            
                            <View style={styOt.datepicker}>
                                <DatePicker 
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    placeHolderText={po.request.datePicker.placeHolder}
                                    placeHolderTextStyle={{color: color.placeHolder, marginBottom: -10}}
                                    textStyle={{color: color.secondary, marginBottom: -10}}
                                    onDateChange={(newDate) => alert(newDate)}

                                />
                                <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn}/>
                            </View>
                            <Row>
                                <Col style={styOt.left}>
                                    <Item floatingLabel last>
                                        <Label style={styOt.label}>{po.request.start.label}</Label>
                                        <Input style={styOt.input} />
                                    </Item>       
                                </Col>
                                <Col style={styOt.right}>
                                    <Item floatingLabel last>
                                        <Label style={styOt.label}>{po.request.end.label}</Label>
                                        <Input style={styOt.input} />
                                    </Item>       
                                </Col>
                            </Row>
                            
                            <Textarea rowSpan={5} bordered placeholder={po.request.textarea.label} placeholderTextColor={color.placeHolder} style={styOt.textarea}/>   
                        </Form>
                    </Content>
                    <Button style={styOt.button}>
                        <Text>{po.request.buttonText}</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Container>
        )
    }
}