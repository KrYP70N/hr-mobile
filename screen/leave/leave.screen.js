import React, { Component } from 'react';
import { Platform, StatusBar, AsyncStorage, } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
//import { Header, Left, Right, Container, Toast, Icon,} from 'native-base'
import { View, Text, Content, Container, Toast, Tab, Header, Left, Right, Icon, Card, CardItem, Body, Row, Col, Button, } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import LeaveRequest from './_request.screen'
import LeavePending from './_pending.screen'
import LeaveHistory from './_history.screen'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'
import styLeave from './leave.style'

export default class TabViewExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            index: 0,
            routes: [
                { key: 'first', title: 'Request' },
                { key: 'second', title: 'Pending' },
                { key: 'third', title: 'History' },
            ],
            leaveType: [],
            leaves: [],
            refresh: false,
            startDate: '',
            endDate: '',
            selectedLeaveType: ''
        };

    }

    cancelOT = (cid) => {
        APIs.leaveStatusUpdate(this.state.url, this.state.auth, cid, 'cancel')
            .then((res) => {
                if (res.status === 'success') {
                    this.getApproveData(this.state.auth, this.state.id, this.state.url)
                    Toast.show({
                        text: 'Cancel Success!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
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
        this.props.navigation.addListener('focus', () => {
            this.setState({ refresh: !this.state.refresh, index: 0})
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
                            this.getApproveData(auth, id, url);
                        })
                })
        })
    }

    _handleIndexChange = index => this.setState({ index });

    _renderLabel = ({ route }) => (
        <Text style={{ color: 'white' }}>{route.title}</Text>
    );

    getRequestData(auth, url) {
        const d = new Date();
        APIs.getLeaveType(auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        leaveType: res.data,
                        startDate: `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`,
                        selectedLeaveType: res.data[0]['leave_type_id'],
                        refresh: !this.state.refresh,
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

    getApproveData(auth, id, url) {
        APIs.getLeaveRequest(auth, url, id)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Leave Pending List::", res.data)
                    this.setState({
                        leaves: res.data
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

    getHistoryData(auth, id, url) {

    }

    _renderTabBar = props => (
        <TabBar
            renderLabel={this._renderLabel}
            {...props}
            indicatorStyle={{ backgroundColor: color.indicator, height: 5 }}
            style={{ backgroundColor: color.primary }}
            labelStyle={{ color: 'white' }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'first') {
                    this.getRequestData(this.state.auth, this.state.url)
                } else if (route.key === 'second') {
                    this.getApproveData(this.state.auth, this.state.id, this.state.url)
                } else if (route.key === 'third') {
                    //this.getHistoryData(this.state.auth, this.state.id, this.state.url)
                }
            }}
        />
    );

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <LeaveRequest
                        auth={this.state.auth}
                        id={this.state.id}
                        url={this.state.url}
                    />
                )
            case 'second':
                console.log("Leves Pending:::", this.state.leaves)
                const GetLeave = this.state.leaves.map((leave) => {
                    return (
                        <Card key={leave['Obj id']}>
                            <CardItem>
                                <Body>
                                    <View style={styLeave.cardTitleContainer}>
                                        <Text style={styLeave.cardTitle}>{leave['Leave Type']}</Text>
                                    </View>
                                    {/* <Text style={{ marginBottom: 5 }}>{`${leave["Employee_Name"]} (${leave["Job Position"]})`}</Text> */}
                                    <Text style={styLeave.cardXSText}>{leave['date_from']} to {leave['date_to']}</Text>
                                    <Text style={styLeave.cardSText}>Leave left - {leave['number of days']} Days</Text>
                                    <Text style={styLeave.cardWarning}>Your request is pending</Text>
                                    <Button
                                        style={styLeave.ButtonSecondary}
                                        onPress={() => {
                                            this.cancelOT(leave['Obj id'])
                                        }}
                                    >
                                        <Text>Cancel Request</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })

                return (
                    <Container>
                        <Content style={styLeave.container}>
                            {GetLeave}
                            <View style={{
                        display: this.state.leaves.length === 0 ? 'flex' : 'none',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-information-circle-outline' style={{
                            color: color.placeHolder,
                            fontSize: 40
                        }}/>
                        <Text style={{
                            color: color.placeHolder
                        }}>There is no pending leave request!</Text>
                    </View>
                        </Content>
                    </Container>
                )
            // return(
            //     <LeavePending leaves = {this.state.leaves} navigation={this.props.navigation}/>
            // )

            case 'third':
                return <LeaveHistory />;
            default:
                return null;
        }
    }

    render() {
        if (this.state.url === null || this.state.auth === null || this.state.id === null) {
            return (
                <Loading />
            )
        }

        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    <Left style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary
                        }}>Leave</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    swipeEnabled = {false}
                />
            </Container>
        );
    }
}