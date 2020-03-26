import React, { Component } from 'react'
import { Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'
import color from '../../constant/color'
import styLeave from './leave.style'
import { View, Text, KeyboardAvoidingView, AsyncStorage, SegmentedControlIOS } from 'react-native'
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
            attachment: null,
            selectedLeaveType: null,
            dayType: false,
            description: null,
            file: [],
            refresh: false,
            placeHolder: 'testing',
            isStartDateVisible: false,
            startDate: '',
            endDate: '',
            isEndDateVisible: false,
            binary: []
        }
    }

    dayType = (data) => {
        this.setState({
            dayType: data
        })
    }

    submit(auth, id, url) {
        APIs.requestLeave(auth, url, id, this.state.selectedLeaveType, this.state.startDate, this.state.endDate, this.state.dayType, this.state.description, this.state.binary)
            .then((res) => {
        
                if (res.data.error == false) {
                    this.setState({ refresh: !this.state.refresh, description: null })
                    this.getRequestData(auth, url);
                    Toast.show({
                        text: res.data.message,
                        // text: 'an error occur, please try again in later',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                } else {
                    this.setState({ refresh: !this.state.refresh, description: null })
                    this.getRequestData(auth, url);
                    Toast.show({
                        text: res.data.message,
                        // text: 'an error occur, please try again in later',
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

    componentDidUpdate() {
        if (this.state.leaveType.length > 0 && this.state.attachment === null) {
            this.setState({
                attachment: this.state.leaveType[0].image
            })
        }
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

    changeLeaveType = (val, pos) => {
        let attachNumber = this.state.leaveType[pos].image
        this.setState({
            selectedLeaveType: val,
            attachment: attachNumber,
            file: [],
            binary: []
        })

    }

    render() {

        if (this.state.startDate === null || this.state.endDate === null || this.state.attachment === null) {
            return (
                <Loading />
            )
        }

        let AttachButton = () => {
            let attach = []
            for(let i=0; i<this.state.attachment; i++) {
                attach.push(i)
            }
            let data = attach.map((a, id) => {
                return (
                    <Row style={styLeave.attachRow} key={id}>
                        <Col>
                            {
                                this.state.file[id] === undefined ?
                                    <Text style={styLeave.placeholder}>Attachment</Text>
                                    :
                                    <View style={styLeave.file}>
                                        <Text style={styLeave.filename}>
                                                    {this.state.file[id].name}
                                        </Text>
                                        <Icon
                                            name='ios-close-circle-outline'
                                            style={styLeave.closeImage}
                                            onPress={() =>
                                            {
                                                let getFile = this.state.file
                                                getFile[id] = undefined
                                                let getBinary = this.state.binary
                                                getBinary[id] = undefined
                                                this.setState({
                                                    file: getFile,
                                                    binary: getBinary
                                                })
                                            }
                                            }
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
                                            if (res.type === 'success') {

                                                let getFile = this.state.file

                                                getFile[id] = res

                                                this.setState({
                                                    file: getFile
                                                })
                                                FileSystem.readAsStringAsync(res.uri, {
                                                    encoding: FileSystem.EncodingType.Base64
                                                })
                                                .then((res) => {
                                                    let getBinary = this.state.binary
                                                    getBinary[id] = res
                                                    this.setState({
                                                        binary: getBinary
                                                    })
                                                })
                                            }
                                        })
                                }}
                            >
                                <Text style={styLeave.buttonText}>Add File</Text>
                            </Button>

                        </Col>
                    </Row>

                )
            })
            return (
                <View>
                    {data}
                </View>
            )
        }

        return (
            <Container>
                <Content style={styLeave.container}>
                    <KeyboardAvoidingView behavior='padding'>
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
                                        this.changeLeaveType(itemValue, itemPosition)
                                    }
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
                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15 }}>
                                    <Text style={{ color: color.placeHolder }}>Start Date</Text>
                                    <View style={{ flexDirection: 'row', width: 150 }}>
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
                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15 }}>
                                    <Text style={{ color: color.placeHolder }}>End Date</Text>
                                    <View style={{ flexDirection: 'row', width: 150 }}>
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
                            <AttachButton />
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