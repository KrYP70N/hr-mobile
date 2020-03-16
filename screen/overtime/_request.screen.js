import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Container, Content, Form, Text, Item, Input, Label, Icon, Row, Col, Button, Textarea, DatePicker, View, Toast } from 'native-base'
import color from '../../constant/color'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import APIs from '../../controllers/api.controller'
import DateTimePicker from "react-native-modal-datetime-picker";

export default class Request extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: null,
            hour: 0,
            description: null,
            isDateTimePickerVisible: false,
        }

        // pick date
        this.pickDate = (data) => {
            let date = new Date(data)
            this.setState({
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            })
        }

        // pick hour
        this.pickHour = (data) => {
            this.setState({
                hour: data
            })
        }

        // description
        this.description = (data) => {
            this.setState({
                description: data
            })
        }

        // submit
        this.submit = () => {
            if (this.state.date === null || this.state.hour === 0) {
                Toast.show({
                    text: 'Please fill all fields!',
                    position: 'bottom',
                    duration: 6000,
                    style: {
                        backgroundColor: color.danger
                    },
                    textStyle: {
                        textAlign: 'center'
                    }
                })
            } else {
                APIs.OTRequest(
                    this.props.id,
                    this.props.auth,
                    this.props.url,
                    this.state.date,
                    this.state.hour,
                    this.state.description
                )
                    .then((res) => {
                        if (res.status === 'success') {
                            const d = new Date();
                            this.pickDate(d);
                            this.setState({
                                date: d,
                                hour: 0,
                                description: null,
                            })
                            Toast.show({
                                text: 'Request Success!',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.primary
                                },
                                duration: 5000
                            })
                        } else {
                            this.setState({
                                date: null,
                                hour: 0,
                                description: null,
                            })
                            Toast.show({
                                text: 'Network Error! Please try again in later.',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.danger
                                },
                                duration: 5000
                            })
                        }
                    })
            }
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };



    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
                    <Content style={styOt.container}>
                        <Form>

                            <View style={styOt.datepicker}>
                                <DatePicker
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    placeHolderText={po.request.datePicker.placeHolder}
                                    placeHolderTextStyle={{ color: color.placeHolder, marginBottom: -10 }}
                                    textStyle={{ color: color.secondary, marginBottom: -10 }}
                                    onDateChange={(newDate) => this.pickDate(newDate)}
                                />
                                <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn} />
                            </View>
                            <Row>
                                <TouchableOpacity onPress = {this.showDateTimePicker}>
                            <View style={styOt.datepicker}>
                                <DateTimePicker
                                    timePickerModeAndroid = {"spinner"}
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                                <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn} />
                            </View>
                            </TouchableOpacity>
                                {/* <Col style={styOt.left}>
                                    <Item floatingLabel last>
                                        <Label style={styOt.label}>{po.request.hour.label}</Label>
                                        <Input style={styOt.input} 
                                        keyboardType="number-pad"
                                        onChangeText={(data) => this.pickHour(data)}
                                        value = {this.state.hour}
                                        />
                                    </Item>       
                                </Col> */}
                            </Row>

                            <Textarea rowSpan={5} bordered placeholder={po.request.textarea.label} placeholderTextColor={color.placeHolder} style={styOt.textarea}
                                onChangeText={(data) => { this.description(data) }}
                                value={this.state.description}
                            />
                        </Form>
                    </Content>
                    <Button style={styOt.button} onPress={this.submit}>
                        <Text>{po.request.buttonText}</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Container>
        )
    }
}