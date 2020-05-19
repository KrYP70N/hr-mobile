import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import color from '../../constant/color'
import offset from '../../constant/offset'
import { Picker, Textarea, Row, Col, Button, Toast, Icon, Container, Content, Header } from 'native-base'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';
import po from './po'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import styLeave from './leave.style'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export class LeaveRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
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
            loadingTxt: '',
            checked: 'full',
            startDateMonthLabel: '',
            startDateDayLabel: '',
            endDateMonthLabel: '',
            endDateDayLabel: '',
            totalDay: 1
        }
    }

    submit(auth, id, url) {
        this.setState({
            loading: true,
            loadingTxt: 'requesting your leave ...'
        })
        APIs.requestLeave(auth, url, id, this.state.selectedLeaveType, this.state.startDate, this.state.endDate, this.state.dayType, this.state.description, this.state.binary)
            .then((res) => {
                if (res.status == "success") {
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
                    console.log(res)
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

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                refresh: !this.state.refresh,
                year: date.getFullYear(),
                month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                startDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                startDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                startDateMonthLabel: months[date.getMonth()],
                startDateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                endDateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                totalDay: 1
            })

            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getRequestData(auth, url);
                        })
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
                        startDateMonthLabel: months[d.getMonth()],
                        startDateDayLabel: d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
                        endDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                        endDateMonthLabel: months[d.getMonth()],
                        endDateDayLabel: d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
                        selectedLeaveType: res.data[0]['leave_type_id'],
                        //description: null,
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
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
            startDateMonthLabel: months[date.getMonth()],
            startDateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            endDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
            endDateMonthLabel: months[date.getMonth()],
            endDateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            totalDay: 1,

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
        console.log("End Date Data", data)
        let date = new Date(data)
        // difference between Start Date and End Date
        let secondDate = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
        let eDate = new Date(secondDate);
        let sDate = new Date(this.state.startDate);
        console.log("Start DAte", this.state.startDate);
        console.log(secondDate);

        if (sDate <= eDate) {
            let diffTime = eDate - sDate;
            let diffDay = (diffTime / (1000 * 3600 * 24)) + 1;
            console.log(diffDay);
            this.setState({
                endDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                endDateMonthLabel: months[date.getMonth()],
                endDateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                totalDay: diffDay,

            })
        } else {
            this.setState({
                endDate: this.state.endDate,
                endDateMonthLabel: this.state.endDateMonthLabel,
                endDateDayLabel: this.state.endDateDayLabel,
                totalDay: this.state.totalDay,

            })
        }
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
                <Container style={{ flex: 1, backgroundColor: color.light, }}>

                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Apply Leave</Text>
                    </View>
                   

                    <Content>
                    <View style={{ width: '100%', height: 20, backgroundColor: color.lighter }}></View>
                        <KeyboardAvoidingView behavior='padding'>
                            <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                                <Picker
                                    //placeholder="Select Leve Type"
                                    textStyle={{
                                        fontFamily: 'Nunito',
                                        // color: 'red'
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
                                                <Picker.Item label={type['name']} value={type['leave_type_id']} key={type['leave_type_id']} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>

                            <View style={styLeave.container}>
                                <View style={{ width: '100%', height: 1, backgroundColor: color.placeHolder, }} />

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: offset.o3 }}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: '#656565', fontFamily: 'Nunito' }}>From</Text>
                                        <TouchableOpacity onPress={() => { this.showDatePicker() }}>
                                            <DateTimePickerModal
                                                isVisible={this.state.isStartDateVisible}
                                                mode="date"
                                                onConfirm={this.pickDate}
                                                onCancel={this.hideDatePicker}
                                            />
                                            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', borderColor: color.placeHolder, borderRadius: 5, borderWidth: 1, width: 80, height: 80 }}>
                                                <Text style={{ color: '#656565', fontSize: 16, fontFamily: 'Nunito' }}>{this.state.startDateMonthLabel}</Text>
                                                <Text style={{ marginTop: 5, fontFamily: 'Nunito-Bold', fontSize: 18 }}>{this.state.startDateDayLabel}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 16, color: '#656565', fontFamily: 'Nunito' }}>To</Text>
                                        <TouchableOpacity onPress={() => { this.showEndDatePicker() }}>
                                            <DateTimePickerModal
                                                isVisible={this.state.isEndDateVisible}
                                                mode="date"
                                                onConfirm={this.pickEndDate}
                                                onCancel={this.hideEndDatePicker}

                                            />
                                            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', borderColor: color.placeHolder, borderRadius: 5, borderWidth: 1, width: 80, height: 80 }}>
                                                <Text style={{ color: '#656565', fontSize: 16, fontFamily: 'Nunito' }}>{this.state.endDateMonthLabel}</Text>
                                                <Text style={{ marginTop: 5, fontFamily: 'Nunito-Bold', fontSize: 18 }}>{this.state.endDateDayLabel}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 16, color: '#656565', fontFamily: 'Nunito' }}>Total Day</Text>
                                        <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: color.primary, width: 80, height: 80 }}>
                                            <Text style={{ marginTop: 5, fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff' }}>{this.state.totalDay}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: '100%', marginTop: 30 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => { this.setState({ checked: 'mhalf', dayType: true }) }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderColor: color.dark, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 13, height: 13, borderRadius: 13 / 2, backgroundColor: this.state.checked === 'mhalf' ? color.primary : color.light }}></View>
                                                </View>
                                                <Text style={{ marginLeft: 5, fontSize: 16, color: '#333333', fontFamily: 'Nunito', }}>Morning Leave</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setState({ checked: 'ehalf', dayType: true }) }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderColor: color.dark, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 13, height: 13, borderRadius: 13 / 2, backgroundColor: this.state.checked === 'ehalf' ? color.primary : color.light }}></View>
                                                </View>
                                                <Text style={{ marginLeft: 5, fontSize: 16, color: '#333333', fontFamily: 'Nunito', }}>Evening Leave</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.setState({ checked: 'full', dayType: false }) }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                            <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderColor: color.dark, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: 13, height: 13, borderRadius: 13 / 2, backgroundColor: this.state.checked === 'full' ? color.primary : color.light }}></View>
                                            </View>
                                            <Text style={{ marginLeft: 5, fontSize: 16, color: '#333333', fontFamily: 'Nunito', }}>Full Day Leave</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontSize: 16, marginBottom: 10, fontFamily: 'Nunito', color: '#656565' }}>Reason For Leave</Text>
                                    <Textarea
                                        placeholderTextColor={color.placeHolder}
                                        rowSpan={3}
                                        bordered
                                        style={{ backgroundColor: color.lighter }}
                                        //placeholder='Reason for Leave'
                                        onChangeText={(data) => {
                                            //this.state.description = data;
                                            this.setState({
                                                description: data
                                            })
                                        }}
                                        value={this.state.description}
                                    />
                                </View>

                                <AttachButton />
                                <TouchableOpacity onPress={() => { this.submit(this.state.auth, this.state.id, this.state.url) }}>
                                    <View style={styLeave.submitButton} >
                                        <Text style={styLeave.buttonText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </Content>


                </Container>

            </SafeAreaView>
        )
    }
}

export default LeaveRequest
