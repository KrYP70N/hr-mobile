import React, { Component } from 'react'
import { Text, View, FlatList, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import styles from './overtime.style'
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
        }
    }
    componentDidMount() {
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
                        console.log("auth::", auth);
                        console.log("id::", id);
                        console.log("url::", url);
                        this.getApproveStatus(url, auth, id);
                    })
            })
        // this.setState({ leaveLists: data })
    }

    getApproveStatus(url, auth, id) {
        console.log("auth::", auth);
        console.log("id::", id);
        console.log("url::", url);
        APIs.OTApproval(url, auth, id)
            .then((res) => {
                if (res.status === 'success') {
                    const OTList = [];
                    OTList.push(res.data);
                    this.setState({
                        overtimeList: OTList,
                    })
                } else {
                    console.log("Error Message", res.error);
                    Toast.show({
                        text: 'Network Error',
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

    sendApproveRejectOT(otID, auth, url, status) {
        console.log("Click Reject Button");
        APIs.OTUpdateStatus(otID, auth, url, status)
            .then((res) => {
                console.log("Return Reject Message", res.data)
                if (res.status === 'success') {
                    this.setState({refresh : !this.state.refresh})
                    APIs.OTApproval(this.state.url, this.state.auth, this.state.id)
                        .then((res) => {
                            if (res.status === 'success') {
                                const OTList = [];
                                OTList.push(res.data);
                                this.setState({
                                    refresh: !this.state.refresh,
                                    overtimeList: OTList,
                                })
                            } else {
                                console.log("Error Message", res.error);
                                Toast.show({
                                    text: 'Network Error',
                                    textStyle: {
                                        textAlign: 'center'
                                    },
                                    style: {
                                        backgroundColor: color.danger
                                    }
                                })
                            }
                        })
                } else {
                    console.log(res.error);
                    Toast.show({
                        text: 'Network Error',
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


    render() {
        console.log("Overtime list", this.state.overtimeList);
        return (
            <View style={styles.leaveApproveContainer}>
                <Header style={{ backgroundColor: color.light, marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                    <Left style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4, color: color.primary, marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{ color: color.secondary }}>OT Approve</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <View>
                    <FlatList
                        data={this.state.overtimeList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={styles.leaveApproveCard}>
                                <Text style={styles.name}>{item.employee_name}</Text>
                                <Text style={styles.position}>Web Developer</Text>
                                <Text style={styles.date}>Date - {item.overtime_date}</Text>
                                <Text style={styles.otHour}>OT Hour - {item.overtime_hours} Hr</Text>
                                <View style={styles.leaveApproveBtn}>
                                    <TouchableOpacity
                                        onPress={() => { this.sendApproveRejectOT(item.Overtime_id, this.state.auth, this.state.url, 'reject') }}
                                    >
                                        <View style={{ backgroundColor: color.placeHolder, width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                            <Text>Reject</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { this.sendApproveRejectOT(item.Overtime_id, this.state.auth, this.state.url, 'confirm') }}
                                    >
                                        <View style={{ marginLeft: 10, backgroundColor: color.primary, width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: 'white' }}>Approve</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.employee_name}
                    />

                </View>
            </View>
        )
    }
}


