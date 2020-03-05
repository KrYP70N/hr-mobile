import React, { Component } from 'react'
import { View, Text, Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'

import color from '../../constant/color'
import styLeave from './leave.style'
import { KeyboardAvoidingView } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';

import APIs from '../../controllers/api.controller'

export default class LeaveRequest extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: this.props.id,
            auth: this.props.auth,
            url: this.props.url,
            leaveType: [],
            selectedLeaveType: null,
            from: null,
            to: null,
            dayType: false,
            description: null,
            file: null
        }
        // selectLeaveType
        this.selectLeaveType = (data) => {
            this.setState({
                selectedLeaveType: data
            })
        }

        // control from
        this.controlFrom = (data) => {
            let date = new Date(data)
            this.setState({
                from: `${date.getFullYear()}-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`
            })
        }
        // control to
        this.controlTo = (data) => {
            let date = new Date(data)
            this.setState({
                to: `${date.getFullYear()}-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`
            })
        }
        // control dayType
        this.dayType = (data) => {
            this.setState({
                dayType: data
            })
        }
        // submit
        this.submit = () => {
            APIs.requestLeave(this.state.auth, this.state.url, this.state.id, this.state.selectedLeaveType, this.state.from, this.state.to, this.state.dayType)
                .then((res) => {
                    console.log(this.state.auth, this.state.url, this.state.id, this.state.selectedLeaveType, this.state.from, this.state.to, this.state.dayType)
                    if(res.status === 'success') {
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
    }

    componentDidMount () {

        let date = new Date()
        
        this.setState({
            from: `${date.getFullYear()}-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`,
            to: `${date.getFullYear()}-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`
        })

        APIs.getLeaveType(this.state.auth, this.state.url)
            .then((res) => {
                console.log(res)
                if(res.status === 'success') {
                    console.log(res.data)
                    this.setState({
                        leaveType: res.data
                    })
                    // select leave type
                    this.setState({
                        selectedLeaveType: res.data[0]['leave_type_id']
                    })
                } else {

                    this.props.navigation.navigate('Login')
                }
            })
    }

    render() {
        const LeaveTypes = this.state.leaveType.map((type) => {
            return (
                <Picker.Item label={type['name']} value={type['leave_type_id']} key={type['leave_type_id']}/>
            )
        })
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
                                    this.state.selectedLeaveType === null ?
                                    '...' :
                                    this.state.selectedLeaveType
                                }
                                onValueChange={this.selectLeaveType.bind(this)}
                                >
                                    {LeaveTypes}
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
                                    onValueChange={this.dayType.bind(this)}
                                    selectedValue={this.state.dayType}
                                >
                                    <Picker.Item label='full day' value={false} />
                                    <Picker.Item label='half day' value={true} />
                                </Picker>
                            </Item>
                            <Textarea 
                            placeholderTextColor={{ color: color.placeholder }} rowSpan={6} 
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
                                                onPress={() => this.setState({file: null})}
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
                <Button style={styLeave.submitButton} onPress={this.submit}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        )
    }
}