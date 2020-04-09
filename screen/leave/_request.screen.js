import React, { Component } from 'react'
import { Form, Item, Label, Picker, Input, Textarea, Row, Col, Button, Container, Content, DatePicker, Toast, Icon } from 'native-base'
import color from '../../constant/color'
import styLeave from './leave.style'
import { View, Text, KeyboardAvoidingView, SafeAreaView, SegmentedControlIOS } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';
import po from './po'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import { ScrollView } from 'react-native-gesture-handler'
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
            binary: [],
            loading: false,
            loadingTxt: ''
        }
    }

    dayType = (data) => {
        this.setState({
            dayType: data
        })
    }

    submit(auth, id, url) {
        this.setState({
            loading: true,
            loadingTxt: 'requesting your leave ...'
        })
        APIs.requestLeave(auth, url, id, this.state.selectedLeaveType, this.state.startDate, this.state.endDate, this.state.dayType, this.state.description, this.state.binary)
            .then((res) => {
                if (res.status == "success") {
                    console.log("Leve Request Success",res.data);
                    if (res.data.error == false) {
                        const d = new Date();
                        this.setState({
                            refresh: !this.state.refresh,
                            startDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                            endDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                            //selectedLeaveType: res.data[0]['leave_type_id'],
                            file: [],
                            binary: [],
                            description: null
                        })
                        this.getRequestData(auth, url);
                        Toast.show({
                            text: res.data.message,
                            duration: 5000,
                            // text: 'an error occur, please try again in later',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.primary
                            }
                        })
                    } else {
                        const d = new Date();
                        this.setState({
                            refresh: !this.state.refresh,
                            startDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                            endDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                            //selectedLeaveType: res.data[0]['leave_type_id'],
                            binary: [],
                            file: [],
                            description: null
                        })
                        this.getRequestData(auth, url);
                        Toast.show({
                            duration: 5000,
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
                } else {
                    console.log("Not Success Leave Request ::", res.data)
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
                this.setState({
                    loading: false,
                    loadingTxt: ''
                })
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

    getIndex(value, leaveTypes) {
        for (var i = 0; i < leaveTypes.length; i++) {
            if (leaveTypes[i]["leave_type_id"] === value) {
                return i;
            }
        }
    }

    changeLeaveType(val, pos) {
        const index = this.getIndex(val, this.state.leaveType);
        const attachNumber = this.state.leaveType[index].image
        this.setState({
            selectedLeaveType: val,
            attachment: attachNumber,
            file: [],
            binary: []
        })

    }

    render() {

        if (this.state.startDate === null || this.state.endDate === null || this.state.attachment === null || this.state.loading === true) {
            return (
                <Loading info={this.state.loadingTxt} />
            )
        }

        let AttachButton = () => {
            let attach = []
            for (let i = 0; i < this.state.attachment; i++) {
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
                                            onPress={() => {
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
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <Content style={styLeave.container}>
                        <KeyboardAvoidingView behavior='padding'>
                            <ScrollView>
                                <Form style={{
                                    paddingBottom: 100
                                }}>
                                    <Item picker fixedLabel last>
                                        <Label>
                                            <Text style={styLeave.placeholder}>Leave Type</Text>
                                        </Label>
                                        <Picker
                                            textStyle={{
                                                fontFamily: 'Nunito',
                                                color: 'red'
                                            }}
                                            iosIcon={
                                                <Icon name="arrow-down" />
                                            }
                                            selectedValue={
                                                this.state.selectedLeaveType
                                            }
                                            onValueChange={(value, index) => {
                                                this.changeLeaveType(value, index)
                                            }}>
                                            {
                                                this.state.leaveType.map((type) => {
                                                    return (
                                                        <Picker.Item label={type['name']} value={type['leave_type_id']} key={type['leave_type_id']}/>
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
                                            <Text style={{ color: color.placeHolder }, styLeave.placeholder}>Start Date</Text>
                                            <View style={{ flexDirection: 'row', width: 150 }}>
                                                <Text style={{ textAlign: 'left', fontSize: 16 }}>{this.state.startDate}</Text>
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
                                            <Text style={{ color: color.placeHolder }, styLeave.placeholder}>End Date</Text>
                                            <View style={{ flexDirection: 'row', width: 150 }}>
                                                <Text style={{ fontSize: 16 }}>{this.state.endDate}</Text>
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
                                            iosIcon={
                                                <Icon name="arrow-down" />
                                            }
                                            onValueChange={(itemValue, itemPosition) =>
                                                this.setState({ dayType: itemValue })}
                                            selectedValue={this.state.dayType}
                                        >
                                            <Picker.Item label='Full Day' value={false} />
                                            <Picker.Item label='Half Day' value={true} />
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
                                    <Button style={styLeave.submitButton} onPress={() => { this.submit(this.props.auth, this.props.id, this.props.url) }}>
                                        <Text style={styLeave.buttonText}>SUBMIT</Text>
                                    </Button>
                                </Form>

                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Content>
                    {/* <Button style={styLeave.submitButton} onPress={() => { this.submit(this.props.auth, this.props.id, this.props.url) }}>
                        <Text style={styLeave.buttonText}>Submit</Text>
                    </Button> */}
                </Container>
            </SafeAreaView>
        );

    }
}