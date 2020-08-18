import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, Image } from 'react-native'
import { Icon, Container, Content } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import styles from './leave.style';
import Modal from 'react-native-modal';
import BackHeader from '../../components/BackHeader'
const width = Dimensions.get('screen').width;

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
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
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
                    <Content>
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
                                return (
                                    <View key={index} style={styles.leaveApproveCard}>
                                        <Text style={styles.name}>{`${item.Employee_Name}`}</Text>
                                        <Text style={styles.position}>{`(${item["Job Position"]})`}</Text>
                                        <Text style={styles.date}>{`From ${item.date_from} To ${item.date_to}`}</Text>
                                        <Text style={styles.leaveText}>{item["Leave Type"]}</Text>
                                        <Text style={{fontFamily: 'Nunito', color: color.tertiary, fontSize: 16}} >Reason : {item["Reason"]}</Text>
                                        <View style={styles.leaveApproveBtn}>
                                            <TouchableOpacity
                                                style={{ width: '48%' }}
                                                onPress={() => { this.sendApproveRejectLeave(this.state.url, this.state.auth, item["Obj id"], 'reject') }}>
                                                <View style={{ backgroundColor: color.placeHolder, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                    <Text>Reject</Text>
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
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const mstyles = StyleSheet.create({
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



