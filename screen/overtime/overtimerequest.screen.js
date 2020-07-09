import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage, StyleSheet, Image, Dimensions } from 'react-native'
import { Icon, Textarea, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
import DateTimePicker from "react-native-modal-datetime-picker";
import APIs from '../../controllers/api.controller'
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height
import moment from 'moment'
export class OTRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            refresh: false,
            description: '',
            hour: 0,
            isDatePickerVisible: false,
            isTimePickerFromVisible: false,
            isTimePickerToVisible: false,

            date: '',
            dateDayLabel: '',
            dateMonthLabel: '',
            dateYearLabel: '',
            fromTime: '',
            fromTimehrLabel: '',
            fromTimeAMPM: '',
            toTime: '',
            toTimehrLabel: '',
            toTimeAMPM: '',
            totalHR: '00:00',
            //show label
            fromTimeHr: 0,
            fromTimeMinus: 0,
            isModalVisible: false,
            changeIconStatus: '',
            checkMessage: '',
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                refresh: !this.state.refresh,
                date: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                dateMonthLabel: months[date.getMonth()],
                dateYearLabel: date.getFullYear(),
                dateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                fromTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                fromTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                fromTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                toTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                toTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                toTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                totalHR: "00:00",
                fromTimeHr: date.getHours(),
                fromTimeMinus: date.getMinutes(),
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
                            //this.getRequestData(auth, url);
                        })
                })
        })
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
            dateMonthLabel: months[date.getMonth()],
            dateYearLabel: date.getFullYear(),
            dateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            //datetextColor: '#000'
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
        this.setState({
            fromTime: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
            fromTimehrLabel: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
            fromTimeAMPM: hours > 11 ? "PM" : "AM",
            toTime: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
            toTimehrLabel: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
            toTimeAMPM: hours > 11 ? "PM" : "AM",
            fromTimeHr: hours,
            fromTimeMinus: minutes,
            totalHR: "00:00",
            //toTime: `${hours}:${minutes}:${seconds}`, totextColor: '#000'
        })
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
        let ftime = this.state.date + " " + this.state.fromTime;
        let totime = this.state.date + " " + `${hours}:${minutes}:${seconds}`

        if (ftime <= totime) {
            if (minutes < this.state.fromTimeMinus) {
                const hr = (hours - this.state.fromTimeHr) - 1
                const min = (60 + minutes) - this.state.fromTimeMinus
                this.setState({
                    toTime: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
                    toTimehrLabel: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
                    toTimeAMPM: hours > 11 ? "PM" : "AM",
                    totalHR: `${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}`
                })
            } else {
                const dif_hr = hours - this.state.fromTimeHr
                const dif_min = minutes - this.state.fromTimeMinus
                this.setState({
                    toTime: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
                    toTimehrLabel: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
                    toTimeAMPM: hours > 11 ? "PM" : "AM",
                    totalHR: `${dif_hr < 10 ? '0' + dif_hr : dif_hr}:${dif_min < 10 ? '0' + dif_min : dif_min}`
                })
            }
        } else {
            //console.log("")
        }
        this.hideTimePickerto();
    };

    description = (data) => {
        this.setState({
            description: data
        })
    }

    submit(auth, id, url) {
        const request_from = this.state.date + " " + this.state.fromTime;
        const request_to = this.state.date + " " + this.state.toTime;
        console.log(auth)
        console.log(id)
        console.log(url)
        console.log(request_from)
        console.log(request_to)
        APIs.OTRequest(id, auth, url, request_from, request_to, this.state.description)
            .then((res) => {
                if (res.status === "success") {
                    if (res.error) {
                        Toast.show({
                            text: 'Please login again. Your token is expried!',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.primary
                            },
                            duration: 6000
                        })
                        this.props.navigation.navigate('Login')
                    } else {
                        if (res.data.error == false) {
                            let date = new Date();
                            //this.pickDate(d);
                            this.setState({
                                description: '',
                                date: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                                dateMonthLabel: months[date.getMonth()],
                                dateYearLabel: date.getFullYear(),
                                dateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                                fromTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                fromTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                                fromTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                                toTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                toTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                                toTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                                totalHR: "00:00",
                                fromTimeHr: date.getHours(),
                                fromTimeMinus: date.getMinutes(),
                                checkMessage: 'Overtime Request Successful!',
                                changeIconStatus: 'success',
                                isModalVisible: true,
                            })
                        } else {
                            this.setState({
                                description: '',
                                date: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
                                dateMonthLabel: months[date.getMonth()],
                                dateYearLabel: date.getFullYear(),
                                dateDayLabel: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                                fromTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                fromTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                                fromTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                                toTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                toTimehrLabel: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
                                toTimeAMPM: date.getHours() > 11 ? "PM" : "AM",
                                totalHR: "00:00",
                                fromTimeHr: date.getHours(),
                                fromTimeMinus: date.getMinutes(),
                                checkMessage: res.data.message,
                                changeIconStatus: 'fail',
                                isModalVisible: true,
                            })
                        }
                    }
                } else {
                    this.setState({
                        checkMessage: 'Overtime Request Failed!',
                        changeIconStatus: 'fail',
                        isModalVisible: true,

                    })
                }
            })

    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: color.light }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Overtime Request</Text>
                    </View>
                    <View style={{ width: '100%', height: 20, backgroundColor: color.lighter }}></View>
                    <View style={{ width: '100%', padding: 15 }}>

                        <Text style={{ fontFamily: 'Nunito', color: '#656565', fontSize: 16 }}>Overtime Date</Text>
                        <TouchableOpacity onPress={() => { this.showDatePicker() }}>
                            <View style={{ width: '100%', height: 70, alignItems: 'center', justifyContent: 'center', borderColor: color.placeHolder, borderWidth: 0.5, borderRadius: 8, marginTop: 10 }}>
                                <DateTimePicker
                                    style={{ width: 320, backgroundColor: "white" }}
                                    isVisible={this.state.isDatePickerVisible}
                                    mode="date"
                                    onConfirm={this.pickDate}
                                    onCancel={this.hideDatePicker}

                                />
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 18 }}>{this.state.dateDayLabel}</Text>
                                    <Text style={{ marginLeft: 5, color: '#656565', fontSize: 18, fontFamily: 'Nunito' }}>{this.state.dateMonthLabel} {this.state.dateYearLabel}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>

                            <View>
                                <Text style={{ fontFamily: 'Nunito', color: '#656565', fontSize: 16 }}>From</Text>
                                <TouchableOpacity onPress={() => { this.showTimePickerFrom() }}>
                                    <View style={{ marginTop: 10, width: 100, height: 60, borderWidth: 0.5, borderColor: color.placeHolder, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <DateTimePicker
                                            style={{ width: 320, backgroundColor: "white" }}
                                            isVisible={this.state.isTimePickerFromVisible}
                                            mode="time"
                                            display="spinner"
                                            headerTextIOS="Pick a time"
                                            onConfirm={this.pickTimeFrom}
                                            onCancel={this.hideTimePickerFrom}
                                            is24Hour={true} //24 hour fomat in android
                                            locale="en_GB" // 24 hour fomat in ios
                                        />
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16 }}>{this.state.fromTimehrLabel}</Text>
                                            <Text style={{ marginLeft: 5, color: '#656565', fontSize: 12, fontFamily: 'Nunito' }}>{this.state.fromTimeAMPM}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'Nunito', color: '#656565', fontSize: 16 }}>To</Text>
                                <TouchableOpacity onPress={() => { this.showTimePickerto() }}>
                                    <View style={{ marginTop: 10, width: 100, height: 60, borderWidth: 0.5, borderColor: color.placeHolder, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <DateTimePicker
                                            style={{ width: 320, backgroundColor: "white" }}
                                            isVisible={this.state.isTimePickerToVisible}
                                            mode="time"
                                            headerTextIOS="Pick a time"
                                            display="spinner"
                                            onConfirm={this.pickTimeTo}
                                            onCancel={this.hideTimePickerto}
                                            is24Hour={true} //24 hour fomat in android
                                            locale="en_GB" // 24 hour fomat in ios
                                        />
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 16 }}>{this.state.toTimehrLabel}</Text>
                                            <Text style={{ marginLeft: 5, color: '#656565', fontSize: 12, fontFamily: 'Nunito' }}>{this.state.toTimeAMPM}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'Nunito', color: '#656565', fontSize: 16 }}>Duration</Text>
                                <View style={{ marginTop: 10, width: 70, height: 60, backgroundColor: color.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: color.light, fontFamily: 'Nunito-Bold', fontSize: 16 }}>{this.state.totalHR}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 16, marginBottom: 10, fontFamily: 'Nunito', color: '#656565', fontSize: 16 }}>Reason</Text>
                            <Textarea
                                placeholderTextColor={color.placeHolder}
                                rowSpan={4}
                                bordered
                                borderRadius={5}
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

                        <TouchableOpacity style={{ marginTop: 40 }}
                            onPress={() => { this.submit(this.state.auth, this.state.id, this.state.url) }}
                        >
                            <View style={{
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: color.primary,
                                width: '100%',
                                //marginTop: 30,
                                borderRadius: 5
                            }} >
                                <Text style={{
                                    color: color.light,
                                    fontFamily: 'Nunito'
                                }}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible={this.state.isModalVisible} >
                        <View style={styles.ModelViewContainer}>
                            <View style={styles.iconView}>
                                {/* <Image source={require('../../assets/icon/checktime.png')} style={styles.dialogIcon} /> */}
                                {this.state.changeIconStatus === "success" ? <Image source={require('../../assets/icon/success_icon.png')} style={styles.dialogIcon} /> : <Image source={require('../../assets/icon/fail_icon.png')} style={styles.dialogIcon} />}
                            </View>
                            <Text style={[styles.lanTitle, styles.lanTitleMM]}>{this.state.checkMessage}</Text>
                            <View style={styles.ModalTextContainer}>
                                <TouchableOpacity style={styles.CancelOpacityContainer}
                                    onPress={() => this.setState({ isModalVisible: false })} >
                                    <Text style={styles.modalTextStyle} >
                                        {'Close'}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>
                </View>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    ModelViewContainer: {
        width: width + 30,
        height: 200,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: -30,
        bottom: Platform.OS === 'ios' ? 15 : -20,
    },
    lanTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
    lanTitleMM: {
        fontSize: 14,
        marginTop: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
    ModalTextContainer: { width: '100%', flex: 1, position: 'absolute', bottom: 0 },
    CancelOpacityContainer: {
        width: '100%',
        height: 50,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTextStyle: { color: '#fff', textAlign: 'center', },
    iconView: {
        width: '100%',
        alignItems: 'center',
    },
    dialogIcon: {
        width: 28,
        height: 28,
        marginBottom: offset.o1,
        marginTop: offset.o2,
    }
});

export default OTRequest
