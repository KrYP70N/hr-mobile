import React, { Component } from 'react'
import { Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'
import color from '../../constant/color'
import styLeave from './leave.style'
import { View, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';
import po from './po'
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
            dayType: false,
            description: null,
            file: null,
            refresh: false,
            placeHolder: 'testing',
            isStartDateVisible: false,
            startDate: '',
            endDate: '',
            isEndDateVisible: false,
        }

    }

    dayType = (data) => {
        this.setState({
            dayType: data
        })
    }

    submit(auth, id, url) {
        console.log(this.state.selectedLeaveType);
        APIs.requestLeave(auth, url, id, this.state.selectedLeaveType, this.state.startDate, this.state.endDate, this.state.dayType, this.state.description)
            .then((res) => {
               
                if (res.data.error == false) {
                    console.log("Success Request Leave::", res.data)
                    this.setState({refresh: !this.state.refresh, description: null})
                    this.getRequestData(auth, url);
                    Toast.show({
                        text: res.data.message,
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                } else {
                    this.setState({refresh: !this.state.refresh, description: null})
                    this.getRequestData(auth, url);
                    Toast.show({
                        //text: res.data.message,
                        text: res.error + "",
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.danger
                        }
                    })
                    // this.setState({refresh: !this.state.refresh})
                    // this.getRequestData(url,id)
                    // Toast.show({
                    //     text: 'Request Fail! Please try again in later.',
                    //     textStyle: {
                    //         textAlign: 'center'
                    //     },
                    //     style: {
                    //         backgroundColor: color.danger
                    //     }
                    // })
                }

               
            })
    }

    getRequestData(auth, url) {
        const d = new Date();
        APIs.getLeaveType(auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        leaveType: res.data,
                        startDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                        endDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                        selectedLeaveType: res.data[0]['leave_type_id'],
                        description: null,
                    })
                } else {
                    $this.props.navigation.navigate('Login')
                }
            })
    }

    componentDidMount() {
        this.getRequestData(this.props.auth, this.props.url)
    }

    showDatePicker = () => {
        this.setState({ isStartDateVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isStartDateVisible: false });
    };

    pickDate = (data) => {
        let date = new Date(data)
        this.setState({
            startDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        })
        this.hideDatePicker();
    }

    showEndDatePicker = () => {
        this.setState({ isEndDateVisible: true });
    };

    hideEndDatePicker = () => {
        this.setState({ isEndDateVisible: false });
    };

    pickEndDate = (data) => {
        let date = new Date(data)
        this.setState({
            endDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        })
        this.hideEndDatePicker();
    }

    render() {

        if (this.state.startDate === null || this.state.endDate === null) {
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
                                        this.state.leaveType.map((type) => {
                                            return (
                                                <Picker.Item label={type['name']} value={type['leave_type_id']} key={type['leave_type_id']} />
                                            )
                                        })
                                    }
                                </Picker>
                            </Item>

                            <View style={{ position: 'relative' }}>
                                <DateTimePickerModal
                                    isVisible={this.state.isStartDateVisible}
                                    mode="date"
                                    onConfirm={this.pickDate}
                                    onCancel={this.hideDatePicker}

                                />
                                <View style={{  flexDirection: 'row',marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15}}>
                                    <Text style = {{color: color.placeHolder}}>Start Date</Text>
                                    <View style={{ flexDirection: 'row', width : 150}}>
                                        <Text style={{ paddingLeft: 10, }}>{this.state.startDate}</Text>
                                        <Icon name={po.request.datePicker.icon} style={styLeave.pickerIcn} onPress={() => { this.showDatePicker() }} />
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 0.5, backgroundColor: color.placeHolder, marginTop: 10 }}></View>
                            </View>

                            <View style={{ position: 'relative' }}>
                                <DateTimePickerModal
                                    isVisible={this.state.isEndDateVisible}
                                    mode="date"
                                    onConfirm={this.pickEndDate}
                                    onCancel={this.hideEndDatePicker}

                                />
                                <View style={{  flexDirection: 'row',marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15}}>
                                    <Text style = {{color: color.placeHolder}}>End Date</Text>
                                    <View style={{ flexDirection: 'row', width : 150}}>
                                        <Text style={{ paddingLeft: 10, }}>{this.state.endDate}</Text>
                                        <Icon name={po.request.datePicker.icon} style={styLeave.pickerIcn} onPress={() => { this.showEndDatePicker() }} />
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 0.5, backgroundColor: color.placeHolder, marginTop: 10 }}></View>
                            </View>

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
                                                    FileSystem.readAsStringAsync(res.uri, { encoding: FileSystem.EncodingType.Base64 })
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


