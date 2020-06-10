import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage, SafeAreaView, Image, Dimensions } from 'react-native'
import { Icon, Header, Left, Right, Toast, Container, Content } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import styles from './overtime.style'
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height
const data = [
    { name: 'Phoe Phoe', email: 'phoephoe@gmail.com' },
    { name: 'Thet Su', email: 'thetsu@gmail.com' },
    { name: 'Lwin', email: 'lwin@gmail.com' },
    { name: 'Ei Zon', email: 'eizon@gmail.com' },

];

export default class OvertimeApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: '',
            url: '',
            id: '',
            refresh: false,
            overtimeList: [],
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
        APIs.OTApproval(url, auth, id)
            .then((res) => {
                console.log("OT Approved Data", res.data)
                if (res.status === 'success') {
                    this.setState({
                        refresh: !this.state.refresh,
                        overtimeList: res.data,
                    })
                } else {
                    this.setState({
                        overtimeList: []
                    })
                }
            })
    }

    sendApproveRejectOT(otID, auth, url, status) {
        APIs.OTUpdateStatus(otID, auth, url, status)
            .then((res) => {
                console.log("OT Approvement by HR", res.data)
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
                        this.setState({
                            refresh: !this.state.refresh,
                            checkMessage: res.data.message,
                            changeIconStatus: 'fail',
                            isModalVisible: true,
                        })
                        this.getApproveStatus(this.state.url, this.state.auth, this.state.id)

                    }
                } else {
                    this.setState({
                        checkMessage: "Approve OT Failed!",
                        changeIconStatus: 'fail',
                        isModalVisible: true,
                    })
                    this.getApproveStatus(this.state.url, this.state.auth, this.state.id)

                }

            })

    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ flex: 1, backgroundColor: color.lighter }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Approve OT</Text>
                    </View>
                    <Content>

                        <View style={{
                            display: this.state.overtimeList.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>You have no overtime approval list!</Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            {this.state.overtimeList.map((item, index) => {
                                return (
                                    <View key={index} style={styles.leaveApproveCard}>
                                        <Text style={styles.name}>{item.employee_name}</Text>
                                        <Text style={styles.position}>{`${item["Job Position"]}`}</Text>
                                        <Text style={styles.date}>{`From - ${item.overtime_date_from}`}</Text>
                                        <Text style={styles.toDate}>{`To     - ${item.overtime_date_to}`}</Text>
                                        <Text style={styles.otHour}>{`OT Hours - ${item.overtime_hours}:${item.overtime_minute}`}</Text>

                                        <View style={styles.leaveApproveBtn}>
                                            <TouchableOpacity
                                                onPress={() => { this.sendApproveRejectOT(item.Overtime_id, this.state.auth, this.state.url, 'reject') }}
                                                style={{ width: '48%' }}
                                            >
                                                <View style={{ backgroundColor: color.placeHolder, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                    <Text>Reject</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => { this.sendApproveRejectOT(item.Overtime_id, this.state.auth, this.state.url, 'confirm') }}
                                                style={{ width: '48%' }}
                                            >
                                                <View style={{ marginLeft: 10, backgroundColor: color.primary, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
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


