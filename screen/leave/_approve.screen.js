import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, Image, ScrollView, TextInput } from 'react-native'
import { Icon, Container, Content, Textarea } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import styles from './leave.style';
import Modal from 'react-native-modal';
import BackHeader from '../../components/BackHeader'
import moment from 'moment'
const width = Dimensions.get('screen').width;

const leaveLists = [{
    name: '',
    Reason: 'Reason'
},
{
    name: '',
    Reason: 'Second'
}]

const availableLeaves = ["8 days unpaid leave available", "6 days casual leave available", "10 days medical leaves available", "8 days nth leaves available", "4 days nth leaves available"]
export default class LeaveApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: '',
            url: '',
            id: '',
            refresh: false,
            leaveLists: [],
            isModalVisible: false,
            checkMessage: '',
            changeIconStatus: '',
            description: '',
            clickLeaves: false,
            viewLeaveBalance: []
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                clickLeaves: false
            })
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({
                        url: JSON.parse(res).ApiEndPoint
                    })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getApproveStatus(url, auth, id);
                        })
                })
        })
    }

    getApproveStatus(url, auth, id) {
        console.log("Data", url, auth, id)
        APIs.leaveApproval(url, auth, id)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        res.data.map(data => {
                            data["clickLeaveBalance"] = false
                        })

                        this.setState({
                            refresh: !this.state.refresh,
                            leaveLists: res.data,
                        })
                    }

                } else {
                    this.setState({ leaveLists: [] })
                }
            })
    }

    sendApproveRejectLeave(url, auth, leaveID, status) {
        APIs.leaveStatusUpdate(url, auth, leaveID, status)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.data.error == false) {
                        this.setState({
                            refresh: !this.state.refresh,
                            checkMessage: res.data.message,
                            changeIconStatus: 'success',
                            isModalVisible: true,
                        })
                        this.getApproveStatus(this.state.url, this.state.auth, this.state.id)
                    } else {
                        if (res.data.code == 'token') {
                            ErrorMessage('token', this.props.navigation)
                        } else {
                            this.setState({
                                refresh: !this.state.refresh,
                                checkMessage: res.data.message,
                                changeIconStatus: 'fail',
                                isModalVisible: true,
                            })
                            this.getApproveStatus(this.state.url, this.state.auth, this.state.id)
                        }
                    }
                } else {
                    this.setState({
                        checkMessage: "Approve Leave Failed!",
                        changeIconStatus: 'fail',
                        isModalVisible: true,
                    })
                    this.getApproveStatus(this.state.url, this.state.auth, this.state.id)
                }
            })
    }

    render() {
        console.log("Reach Approve Leave", this.state.leaveLists)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ flex: 1, backgroundColor: color.lighter }}>
                    <BackHeader name="Approve Leave" navigation={this.props.navigation} parent="Main" />
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                display: this.state.leaveLists.length == 0 ? 'flex' : 'none',
                                alignItems: "center",
                                position: "absolute",
                                marginTop: 20,
                                width: '100%',
                                opacity: this.state.leaveLists.length == 0 ? 1 : 0
                            }}>
                                <Icon name='ios-information-circle-outline' style={{
                                    color: color.placeHolder,
                                    fontSize: 40
                                }} />
                                <Text style={{
                                    color: color.placeHolder
                                }}>You have no leave approval list!</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                {this.state.leaveLists.map((item, index) => {

                                    {/* let d = "2020-09-07 19:57:55"
                                    let start_date = d.split(" ")
                                    console.log("Start Date", start_date[0]) */}
                                    let from_date = moment(item.date_from).format("YYYY-MMM-DD")
                                    let splitOne = from_date.split("-")
                                    let f_month = splitOne[1]
                                    let f_day = splitOne[2]

                                    switch (f_month) {
                                        case "Sep": f_month = "Sept"
                                            break;

                                        case "Jun": f_month = "June"
                                            break;

                                        case "Jul": f_month = "July"
                                            break;

                                        default: f_month
                                    }

                                    let to_date = moment(item.date_to).format("YYYY-MMM-DD")
                                    let toSplit = to_date.split("-")
                                    let to_month = toSplit[1]
                                    let to_day = toSplit[2]

                                    switch (to_month) {
                                        case "Sep": to_month = "Sept"
                                            break;

                                        case "Jun": to_month = "June"
                                            break;

                                        case "Jul": to_month = "July"
                                            break;

                                        default: to_month
                                    }

                                    console.log("From Date", to_month)
                                  
                                               
                                    return (
                                        <View key={index} style={styles.leaveApproveCard}>
                                            <View style={{ width: '100%', alignItems: 'flex-end', }}>
                                                <Text style={{ fontFamily: 'Nunito', fontSize: 12 }}>{`Submitted Date at : ${item["submitted date"]}`}</Text>
                                            </View>
                                            <Text style={styles.name}>{item["Employee_Name"]}</Text>
                                            <Text style={styles.position}>{`(${item["Job Position"]})`}</Text>
                                            <View style={mstyles.reasonContainer}>
                                                <View style={mstyles.triangle}></View>
                                                <Text>{item["Reason"]}</Text>
                                            </View>

                                            <View style={{ marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '62%', }}>
                                                    <Text style={styles.leaveText}>{item["Leave Type"]}</Text>
                                                    <Text style={{ marginTop: 10 }}>{item["number of days"]}</Text>

                                                </View>
                                                <View style={{ width: '38%', height: width / 7, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <View style={{ width: width / 7, padding: 15, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                        <Text style={{ color: color.light }}>{f_month}</Text>
                                                        <Text style={{ color: color.light }}>{f_day}</Text>
                                                    </View>
                                                    <View style={{ width: width / 7, marginLeft: 5, padding: 15, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                        <Text style={{ color: color.light }}>{to_month}</Text>
                                                        <Text style={{ color: color.light }}>{to_day}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <TouchableOpacity style={{ marginTop: 10, paddingVertical: 5, }} onPress={() => {
                                                this.setState({
                                                    clickLeaves: !this.state.clickLeaves
                                                })
                                                //this.state.leaveLists[index]["clickLeaveBalance"] = !this.state.leaveLists[index]["clickLeaveBalance"]
                                            }}>
                                               {item["leave balance list"].length > 0 && <Text style={{ color: color.primary, fontFamily: 'Nunito-Bold' }}>See Leave Balance</Text>}
                                            </TouchableOpacity>
                                            <View style={{ display: this.state.clickLeaves ? 'flex' : 'none' }}>
                                                {
                                                    item["leave balance list"].map((item, index) => {
                                                        return (
                                                            <Text style={{ marginBottom: 10 }} key={index}>{item["leave balance"]}</Text>
                                                        )
                                                    })
                                                }
                                            </View>


                                            <Text style={{ marginTop: 10, fontFamily: 'Nunito', color: color.tertiary, fontSize: 16 }}>Message</Text>
                                            <Textarea
                                                placeholderTextColor={color.placeHolder}
                                                rowSpan={4}
                                                borderRadius={5}
                                                bordered
                                                style={{ backgroundColor: color.lighter }}
                                                onChangeText={(data) => {
                                                    this.setState({
                                                        description: data,
                                                    });
                                                }}
                                                value={this.state.description}
                                            />
                                            <View style={styles.leaveApproveBtn}>
                                                <TouchableOpacity
                                                    style={{ width: '48%' }}
                                                    onPress={() => { this.sendApproveRejectLeave(this.state.url, this.state.auth, item["Obj id"], 'reject') }}>
                                                    <View style={{ backgroundColor: color.reject, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                        <Text style={{ color: 'white' }}>Reject</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ width: '48%' }}
                                                    onPress={() => { this.sendApproveRejectLeave(this.state.url, this.state.auth, item["Obj id"], 'confirm') }}>
                                                    <View style={{ marginLeft: 10, backgroundColor: color.primary, width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                        <Text style={{ color: 'white' }}>Approve</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <Modal isVisible={this.state.isModalVisible} >
                                <View style={mstyles.ModelViewContainer}>
                                    <View style={mstyles.iconView}>
                                        {this.state.changeIconStatus === "success" ? <Image source={require('../../assets/icon/success_icon.png')} style={mstyles.dialogIcon} /> : <Image source={require('../../assets/icon/fail_icon.png')} style={mstyles.dialogIcon} />}
                                    </View>
                                    <Text style={[mstyles.lanTitle, mstyles.lanTitleMM]}>{this.state.checkMessage}</Text>
                                    <View style={mstyles.ModalTextContainer}>
                                        <TouchableOpacity style={mstyles.CancelOpacityContainer}
                                            onPress={() => this.setState({ isModalVisible: false })} >
                                            <Text style={mstyles.modalTextStyle} >
                                                {'Close'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </Container>
            </SafeAreaView>
        )
    }
}

const mstyles = StyleSheet.create({
    reasonContainer: { marginTop: 10, backgroundColor: color.lighter, width: '100%', padding: 10, borderRadius: 5, },
    triangle: {
        position: 'absolute',
        top: -8,
        marginLeft: 15,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: color.lighter,
    },
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



