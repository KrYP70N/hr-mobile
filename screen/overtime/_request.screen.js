import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Container, Content, Form, Text, Item, Input, Label, Icon, Row, Col, Button, Textarea, DatePicker, View, Toast } from 'native-base'
import color from '../../constant/color'
import { KeyboardAvoidingView, TouchableOpacity, SafeAreaView } from 'react-native'

import APIs from '../../controllers/api.controller'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class Request extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //date: null,
            hour: 0,
            description: null,
            isDatePickerVisible: false,
            isTimePickerFromVisible: false,
            isTimePickerToVisible: false,
            // date: 'OT Date',
            // fromTime: 'From Time',
            // toTime: 'To Time',
            date: this.props.date,
            fromTime: this.props.fromTime,
            toTime: this.props.toTime,
            datetextColor: this.props.datetextColor,
            fromtextColor: this.props.fromtextColor,
            totextColor: this.props.totextColor,
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
            if (this.state.date === null) {
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
                const request_from = this.state.date + " " + this.state.fromTime;
                const request_to = this.state.date + " " + this.state.toTime;
                APIs.OTRequest(
                    this.props.id,
                    this.props.auth,
                    this.props.url,
                    request_from,
                    request_to,
                    this.state.description
                )
                    .then((res) => {
                        if (res.data.error == false) {
                            const d = new Date();
                            this.pickDate(d);
                            this.setState({
                                date: 'OT Date',
                                datetextColor: color.placeHolder,
                                fromTime: 'From Time',
                                fromtextColor: color.placeHolder,
                                toTime: 'To Time',
                                totextColor: color.placeHolder,
                                description: null,
                            })
                            Toast.show({
                                text: res.data.message,
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
                                date: 'OT Date',
                                datetextColor: color.placeHolder,
                                fromTime: 'From Time',
                                fromtextColor: color.placeHolder,
                                toTime: 'To Time',
                                totextColor: color.placeHolder,
                                description: null,
                            })
                            Toast.show({
                                text: res.data.message,
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.danger
                                },
                                duration: 5000
                            })
                        }
                        if (res.status !== 'success') {
                            Toast.show({
                                text: 'Connection time out. Please check your internet connection!',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.primary
                                },
                                duration: 6000
                            })
                        }
                    })
            }
        }
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    pickDate = (data) => {
        let date = new Date(data)
        this.setState({
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            datetextColor: '#000'
        })
        this.hideDatePicker();
    }

    showTimePickerFrom = () => {
        this.setState({ isTimePickerFromVisible: true });
    };

    hideTimePickerFrom = () => {
        this.setState({ isTimePickerFromVisible: false });
    };

    pickTimeFrom = date => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        this.setState({ fromTime: `${hours}:${minutes}:${seconds}`, fromtextColor: '#000' })
        this.hideTimePickerFrom();
    };

    showTimePickerto = () => {
        this.setState({ isTimePickerToVisible: true });
    };

    hideTimePickerto = () => {
        this.setState({ isTimePickerToVisible: false });
    };

    pickTimeTo = date => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        this.setState({ toTime: `${hours}:${minutes}:${seconds}`, totextColor: '#000' })
        this.hideTimePickerto();
    };



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
                        <Content style={styOt.container}>
                            <Form>
                                <View style={{ position: 'relative' }}>
                                    <DateTimePickerModal
                                        isVisible={this.state.isDatePickerVisible}
                                        mode="date"
                                        onConfirm={this.pickDate}
                                        onCancel={this.hideDatePicker}

                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <Text style={{ paddingLeft: 10, color: this.state.datetextColor, fontFamily: 'Nunito' }}>{this.state.date}</Text>
                                        <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn} onPress={() => { this.showDatePicker() }} />
                                    </View>
                                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', }}></View>
                                </View>

                                <View style={{ position: 'relative' }}>
                                    <DateTimePickerModal
                                        isVisible={this.state.isTimePickerFromVisible}
                                        mode="time"
                                        display="spinner"
                                        headerTextIOS="Pick a time"
                                        onConfirm={this.pickTimeFrom}
                                        onCancel={this.hideTimePickerFrom}
                                        is24Hour={true} //24 hour fomat in android
                                        locale="en_GB" // 24 hour fomat in ios
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <Text style={{ paddingLeft: 10, color: this.state.fromtextColor, fontFamily: 'Nunito' }}>{this.state.fromTime}</Text>
                                        <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn} onPress={() => { this.showTimePickerFrom() }} />
                                    </View>
                                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', }}></View>
                                </View>

                                <View style={{ position: "relative", }}>
                                    <DateTimePickerModal
                                        isVisible={this.state.isTimePickerToVisible}
                                        mode="time"
                                        headerTextIOS="Pick a time"
                                        display="spinner"
                                        onConfirm={this.pickTimeTo}
                                        onCancel={this.hideTimePickerto}
                                        is24Hour={true} //24 hour fomat in android
                                        locale="en_GB" // 24 hour fomat in ios
                                    />

                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <Text style={{ paddingLeft: 10, color: this.state.totextColor, fontFamily: 'Nunito' }}>{this.state.toTime}</Text>
                                        <Icon name={po.request.datePicker.icon} style={styOt.pickerIcn} onPress={() => { this.showTimePickerto() }} />
                                    </View>
                                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#000' }}></View>

                                </View>


                                <Textarea rowSpan={5} bordered placeholder={po.request.textarea.label} placeholderTextColor={color.placeHolder} style={styOt.textarea}
                                    onChangeText={(data) => { this.description(data) }}
                                    value={this.state.description}
                                />
                                <Button style={styOt.button} onPress={this.submit}>
                                    <Text>{po.request.buttonText}</Text>
                                </Button>
                            </Form>
                        </Content>
                        {/* <Button style={styOt.button} onPress={this.submit}>
                        <Text>{po.request.buttonText}</Text>
                    </Button> */}
                    </KeyboardAvoidingView>

                </Container>
            </SafeAreaView>
        )
    }
}