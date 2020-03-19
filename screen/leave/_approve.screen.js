import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon, Header, Toast, Left, Right } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import styles from './leave.style';
const data = [
    { name: 'Phoe Phoe', email: 'phoephoe@gmail.com' },
    { name: 'Thet Su', email: 'thetsu@gmail.com' },
    { name: 'Lwin', email: 'lwin@gmail.com' },
    { name: 'Ei Zon', email: 'eizon@gmail.com' },

];

export default class LeaveApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: '',
            url: '',
            id: '',
            refresh: false,
            leaveLists: [],
        }
    }

    componentDidMount() {
        // this.props.navigation.addListener('focus', () => {
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
        //})
    }

    getApproveStatus(url, auth, id) {
        APIs.leaveApproval(url, auth, id)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        refresh: !this.state.refresh,
                        leaveLists: res.data,
                    })
                } else {
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

    sendApproveRejectLeave(url, auth, leaveID, status) {
        APIs.leaveStatusUpdate(url, auth, leaveID, status)
            .then((res) => {
                console.log("Return Message::", res.data)
                if (res.data.error == false) {
                    this.setState({ refresh: !this.state.refresh })
                    Toast.show({
                        text: res.data.message,
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                    APIs.leaveApproval(this.state.url, this.state.auth, this.state.id)
                        .then((res) => {
                            if (res.status === 'success') {
                                console.log("Response Api OT Lists:::", res.data)
                                this.setState({
                                    refresh: !this.state.refresh,
                                    leaveLists: res.data,
                                })
                            } else {
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
                    Toast.show({
                        text: res.data.message,
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
        console.log("Leave Approve List::", this.state.leaveLists);
        return (
            <View style={styles.leaveApproveContainer}>
                <Header style={{ backgroundColor: color.light, marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                    <Left style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4, color: color.primary, marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{ color: color.secondary }}>Leave Approve</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <FlatList
                    data={this.state.leaveLists}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>

                        <View style={styles.leaveApproveCard}>
                            <Text style={styles.name}>{item.Employee_Name}</Text>
                            <Text style={styles.name}>{item["Job Position"]}</Text>
                            {/* <Text style={styles.position}>Web Developer</Text> */}
                            <Text style={styles.date}>{`From ${item.date_from} To ${item.date_to}`}</Text>
                            <Text style={styles.leaveText}>{item["Leave Type"]}</Text>
                            <View style={styles.leaveApproveBtn}>
                                <TouchableOpacity onPress={() => { this.sendApproveRejectLeave(this.state.url, this.state.auth, item["Obj id"], 'reject') }}>
                                    <View style={{ backgroundColor: color.placeHolder, width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Text>Reject</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.sendApproveRejectLeave(this.state.url, this.state.auth, item["Obj id"], 'confirm') }}>
                                    <View style={{ marginLeft: 10, backgroundColor: color.primary, width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Text style={{ color: 'white' }}>Approve</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     leaveApproveContainer: {
//         flex: 1,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     position:{fontSize: 14, marginTop: 3},
//     leaveApproveCard: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         shadowColor: '#000',
//         shadowRadius: 3,
//         elevation: 5,
//         shadowOpacity: 0.62,
//         padding: 20,
//         marginTop: 10,
//         marginLeft: 10,
//         marginRight: 10,
//         marginBottom: 5
//     },
//     leaveApproveBtn: {
//         flexDirection: 'row',
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     date:{
//         fontSize: 12,
//         marginTop: 15,
//         color: '#000'
//     },
//     leaveText:{
//         color: '#ff0000',
//         fontSize: 14,
//         marginTop: 5,
//     },
// })


