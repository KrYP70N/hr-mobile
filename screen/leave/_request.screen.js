import React, { Component } from 'react'
import { Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'

import color from '../../constant/color'
import styLeave from './leave.style'
import { View, Text, KeyboardAvoidingView, AsyncStorage} from 'react-native'

import * as DocumentPicker from 'expo-document-picker'

import APIs from '../../controllers/api.controller'
var $this;
var url;
var auth;
var id;
import LeaveScreen from '../leave/leave.screen';

export default class LeaveRequest extends Component {

    constructor(props) {
        super(props)
        $this = this;
        this.state = {
            leaveType: [],
            selectedLeaveType: null,
            from: null,
            to: null,
            dayType: false,
            description: null,
            file: null,
            refresh: false,
        }

        let date = new Date()
        this.setState({
            from: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
            to: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        })

    }

    controlFrom = (data) => {
        let date = new Date(data)
        this.setState({
            from: `${date.getFullYear()}-${(date.getMonth() + 1)  < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        })
    }

    controlTo = (data) => {
        let date = new Date(data)
        this.setState({
            to: `${date.getFullYear()}-${(date.getMonth() + 1)  < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        })
    }

    dayType = (data) => {
        this.setState({
            dayType: data
        })
    }

    submit() {
        //console.log("URL:: AUTH:: ID", auth + "::" + url + "::" + id)
        APIs.requestLeave(this.props.auth, this.props.url, this.props.id, this.state.selectedLeaveType, this.state.from, this.state.to, this.state.dayType)
            .then((res) => {
                if (res.status === 'success') {
                    Toast.show({
                        text: 'Request Success',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                } else {
                    Toast.show({
                        text: 'Request Fail! Please try again in later.',
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

    render() {
        console.log("LeaveType:::", this.props.leaveType);

        return (
            <Container>
                <Content style={styLeave.container}>
                    <KeyboardAvoidingView behavior='height'>
                        <Form>
                            <Item picker fixedLabel last>
                                <Label>
                                    <Text style={styLeave.placeholder}>Leave Type</Text>
                                </Label>
                                <Picker
                                    selectedValue={
                                        // this.state.selectedLeaveType === null ?
                                        // '...' :
                                        this.state.selectedLeaveType
                                    }
                                    onValueChange={(itemValue, itemPosition) =>
                                        this.setState({ selectedLeaveType: itemValue })}  //, choosenIndex: itemPosition
                                >
                                    {
                                        this.props.leaveType.map((type) => {
                                            return (
                                                <Picker.Item label={type['name']} value={type['leave_type_id']} key={type['leave_type_id']} />
                                            )
                                        })
                                    }
                                </Picker>
                            </Item>

                            <Row style={styLeave.DatePicker}>
                                <Col>
                                    <Text style={styLeave.datePlaceholder}>Start Date</Text>
                                </Col>
                                <Col style={styLeave.datePlaceholder}>
                                    <DatePicker
                                        defaultDate={new Date}
                                        onDateChange={this.controlFrom.bind(this)}
                                    />
                                </Col>
                            </Row>

                            <Row style={styLeave.DatePicker}>
                                <Col>
                                    <Text style={styLeave.datePlaceholder}>End Date</Text>
                                </Col>
                                <Col style={styLeave.datePlaceholder}>
                                    <DatePicker
                                        defaultDate={new Date}
                                        onDateChange={this.controlTo.bind(this)}
                                    />
                                </Col>
                            </Row>

                            <Item picker fixedLabel last style={styLeave.formItem}>
                                <Label>
                                    <Text style={styLeave.placeholder}>Day Type</Text>
                                </Label>
                                <Picker
                                    onValueChange={(itemValue, itemPosition) =>
                                        this.setState({ dayType: itemValue })}
                                    selectedValue={this.state.dayType}
                                >
                                    <Picker.Item label='full day' value={false} />
                                    <Picker.Item label='half day' value={true} />
                                </Picker>
                            </Item>
                            <Textarea
                                placeholderTextColor={"#00ffdd"}
                                rowSpan={6}
                                bordered
                                style={styLeave.textarea}
                                placeholder='Reason for Leave'
                                onChangeText={(data) => {
                                    this.setState({
                                        description: data
                                    })
                                }}
                            />
                            <Row style={styLeave.attachRow}>
                                <Col>
                                    {
                                        this.state.file === null ?
                                            <Text style={styLeave.placeholder}>Attachment</Text>
                                            :
                                            <View style={styLeave.file}>
                                                <Text style={styLeave.filename}>0.
                                                    {this.state.file.name}
                                                </Text>
                                                <Icon
                                                    name='ios-close-circle-outline'
                                                    style={styLeave.closeImage}
                                                    onPress={() => this.setState({ file: null })}
                                                />
                                            </View>
                                    }
                                </Col>
                                <Col>
                                    <Button
                                        style={styLeave.attachButton}
                                        onPress={() => {
                                            DocumentPicker.getDocumentAsync()
                                                .then((res) => {
                                                    this.setState({
                                                        file: res
                                                    })
                                                })
                                        }}
                                    >
                                        <Text>Add File</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                    </KeyboardAvoidingView>
                </Content>
                <Button style={styLeave.submitButton} onPress={() => { this.submit() }}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        );

    }
}