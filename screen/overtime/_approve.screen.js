import React, { Component } from 'react'
import { Text, View, FlatList, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Toast, Container, Content } from 'native-base'
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
                if (res.status === 'success') {
                    this.setState({
                        refresh: !this.state.refresh,
                        overtimeList: res.data,
                    })
                } else {
                    Toast.show({
                        text: 'You have no overtime approval list!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                }
            })
    }

    sendApproveRejectOT(otID, auth, url, status) {
        APIs.OTUpdateStatus(otID, auth, url, status)
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
                    APIs.OTApproval(this.state.url, this.state.auth, this.state.id)
                        .then((res) => {
                            if (res.status === 'success') {
                                console.log("Response Api OT Lists:::", res.data)
                                this.setState({
                                    refresh: !this.state.refresh,
                                    overtimeList: res.data,
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
        console.log("Overtime Approve Screen")
        console.log("Overtime Render list::", this.state.overtimeList.length);
        return (
            <Container>
                <Header style={{ backgroundColor: color.light, marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                    <Left style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4, color: color.primary, marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{ color: color.secondary }}>Approve OT</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <Content>

                   {this.state.overtimeList.length === 0 ? <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                    <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>You have no overtime approval list!</Text>
                   </View>: 
                //    <View style={[
                //         styles.leaveApproveContainer
                //     ]}>

                        <FlatList
                            data={this.state.overtimeList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={styles.leaveApproveCard}>
                                    <Text style={styles.name}>{item.employee_name}</Text>
                                    <Text style={styles.position}>{`(${item["Job Position"]})`}</Text>
                                    <Text style={styles.date}>{`From - ${item.overtime_date_from}`}</Text>
                                    <Text style={styles.toDate}>{`To     - ${item.overtime_date_to}`}</Text>
                                    <Text style={styles.otHour}>{`OT Hours - ${item.overtime_hours}:${item.overtime_minute}`}</Text>

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
                            keyExtractor={(item, index) => index.toString()}
                        />
                        /* <View style={{
                            display: this.state.overtimeList.length === 0 ? 'none' : 'flex',
                            alignItems: "center",
                            // position: "absolute",
                            // top: 100,
                            // width: '100%',
                            // opacity: this.state.overtimeList.length === 0 ? 1 : 0
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>You have no overtime approval list!</Text>
                        </View>*/
                    
                    }
                    

                </Content>
            </Container>

        )
    }
}


