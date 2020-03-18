import React, { Component } from 'react'
import { Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'

import color from '../../constant/color'
import styLeave from './leave.style'
import { View, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native'

import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';

import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
var $this;
var url;
var auth;
var id;

export default class LeaveRequest extends Component {

    constructor(props) {
        super(props)
        $this = this;
        this.state = {
            leaveType: [],
            selectedLeaveType: null,
            today: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`,
            from: null,
            to: null,
            dayType: false,
            description: null,
            file: null,
            refresh: false,
            fDate: new Date(),
            placeHolder: 'testing'
        }
        this.fromDate = this.fromDate.bind(this);

    }

    fromDate(newDate){
        this.setState({fDate: newDate})
    }

    controlFrom = (data) => {
        let date = new Date(data)
        this.setState({
            from: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        })
    }

    controlTo = (data) => {
        let date = new Date(data)
        this.setState({
            to: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
        })
    }

    dayType = (data) => {
        this.setState({
            dayType: data
        })
    }

    submit(auth, id, url) {
        APIs.requestLeave(auth, url, id, this.state.selectedLeaveType, this.state.from, this.state.to, this.state.dayType, this.state.description)
            .then((res) => {
                if (res.status === 'success') {
                    let date = new Date();
                    this.setState({
                        selectedLeaveType: this.props.leaveType[0].name,
                    })
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
                    const d = new Date()
                    this.setState({
                        fDate: new Date(),
                        selectedLeaveType: this.props.leaveType[0],
                    })
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

                this.setState({
                    from: this.state.from,
                    to: this.state.to,
                    description: null
                })
            })
    }
    
    componentDidMount () {
        this.setState({
            from: this.state.today,
            to: this.state.today,
        })
    }

    render() {

        if(this.state.from === null || this.state.to === null) {
            return (
                <Loading />
            )
        }

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
                                    <Text style={{
                                        position: "absolute",
                                        fontSize: 16,
                                        top: 10,
                                        left: 25,
                                        opacity: this.state.from === this.state.today ? 1 : 0
                                    }}>
                                    {new Date().getDate()}/{(new Date().getMonth() + 1)}/{new Date().getFullYear()}
                                    </Text>
                                    <DatePicker
                                        placeHolderText=" "
                                        onDateChange={this.controlFrom.bind(this)}
                                        textStyle={{
                                            color: this.state.from !== this.state.today ? color.secondary : 'transparent'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row style={styLeave.DatePicker}>
                                <Col>
                                    <Text style={styLeave.datePlaceholder}>End Date</Text>
                                </Col>
                                <Col style={styLeave.datePlaceholder}>
                                    <Text style={{
                                        position: "absolute",
                                        fontSize: 16,
                                        top: 10,
                                        left: 25,
                                        opacity: this.state.to === this.state.today ? 1 : 0
                                    }}>
                                    {new Date().getDate()}/{(new Date().getMonth() + 1)}/{new Date().getFullYear()}
                                    </Text>
                                    <DatePicker
                                        placeHolderText=" "
                                        onDateChange={this.controlTo.bind(this)}
                                        textStyle={{
                                            color: this.state.to !== this.state.today ? color.secondary : 'transparent'
                                        }}
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
                                placeholderTextColor={color.placeHolder}
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
                                                    FileSystem.readAsStringAsync(res.uri, {encoding : FileSystem.EncodingType.Base64})
                                                    .then((res) => {
                                                        console.log('testing ...')
                                                    })
                                                })
                                        }}
                                    >
                                        <Text style={styLeave.buttonText}>Add File</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                    </KeyboardAvoidingView>
                </Content>
                <Button style={styLeave.submitButton} onPress={() => { this.submit(this.props.auth, this.props.id, this.props.url) }}>
                    <Text style={styLeave.buttonText}>Submit</Text>
                </Button>
            </Container>
        );

    }
}


