import React, { Component } from 'react'
import { View, Text, Content, Container, Toast, Tab, Header, Left, Right, Icon, Card, CardItem, Body, Row, Col, Button, } from 'native-base'
import styOt from './overtime.style'
import po from './po'
import Request from './_request.screen'
import Pending from './_pending.screen'
import History from './_history.screen'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Loading from '../../components/loading.component'
import { AsyncStorage, Platform, StatusBar } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view';
import APIs from '../../controllers/api.controller';


export default class Overtime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            token: 1,
            index: 0,
            routes: [
                { key: 'first', title: 'Request' },
                { key: 'second', title: 'Pending' },
                { key: 'third', title: 'History' },
            ],
            data: [],
            refresh: false,
            date: 'OT Date',
            fromTime: 'From Time',
            toTime: 'To Time',
            datetextColor: color.placeHolder,
            fromtextColor: color.placeHolder,
            totextColor: color.placeHolder,
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({ refresh: !this.state.refresh, index: 0})
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
                            this.getApproveData(auth, id, url);
                        })
                })
        })
    }

    getRequestData(auth, url, id) {
        this.setState({
            date: 'OT Date',
            fromTime: 'From Time',
            toTime: 'To Time',
            datetextColor: color.placeHolder,
            fromtextColor: color.placeHolder,
            totextColor: color.placeHolder,
            refresh: !this.state.refresh,
        })

    }

    getApproveData(auth, id, url) {
        APIs.OTPending(id, auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Pending List::", res.data)
                    this.setState({
                        data: res.data
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

    getHistoryData(auth, id, url) {

    }

    cancelOT = (data) => {
        APIs.OTUpdateStatus(data, this.state.auth, this.state.url, 'cancel')
            .then((res) => {
                console.log("Return Message", res.data)
                if (res.data.error === false) {
                    this.setState({ refresh: !this.state.refresh })
                    this.getApproveData(this.state.auth, this.state.id, this.state.url);
                    //this.getOTList()
                    Toast.show({
                        text: res.data.message,
                        textStyle: {
                            textAlign: "center"
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                } else {
                    Toast.show({
                        text: res.data.message,
                        textStyle: {
                            textAlign: "center"
                        },
                        style: {
                            backgroundColor: color.danger
                        }
                    })
                }
            })
    }

    _handleIndexChange = index => this.setState({ index });

    _renderLabel = ({ route }) => (
        <Text style={{ color: 'white' }}>{route.title}</Text>
    );

    _renderTabBar = props => (
        <TabBar
            renderLabel={this._renderLabel}
            {...props}
            indicatorStyle={{ backgroundColor: color.indicator, height: 5 }}
            style={{ backgroundColor: color.primary }}
            labelStyle={{ color: 'white' }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'first') {
                    //this.getRequestData(this.state.auth, this.state.url, this.state.id)
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
                    <Request
                        auth={this.state.auth}
                        id={this.state.id}
                        url={this.state.url}
                        date={this.state.date}
                        fromTime={this.state.fromTime}
                        toTime={this.state.toTime}
                        datetextColor={this.state.datetextColor}
                        fromtextColor={this.state.fromtextColor}
                        totextColor={this.state.totextColor}
                    //data = {this.state.data}
                    />
                )

            case 'second':
                let requests = this.state.data.map((req) => {
                    return (
                        <Card key={req["Obj Id"]} >
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                                    </View>
                                    {/* <Text style={{ marginBottom: 5 }}>{`${req["Employee_Name"]} (${req["Job Position"]})`}</Text> */}
                                    <Text style={styOt.cardXSText}>From : {`${req['date_from']}`}</Text>
                                    <Text style={styOt.cardXSText}>To : {`${req['date_to']}`}</Text>
                                    <Text style={styOt.cardSText}>{po.approve.staff.label2}{`${req['hour']} : ${req['minute']} `}</Text>
                                    <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                                    <Button
                                        style={styOt.ButtonSecondary}
                                        onPress={() => this.cancelOT(req['Obj Id'])}
                                    >
                                        <Text>{po.approve.staff.button}</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })

                return (
                    <Container style={styOt.container}>
                        <Content>
                            {requests}
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                display: this.state.data.length === 0 || this.state.data === null ? 'flex' : 'none'
                            }}>
                                <Icon name='ios-information-circle-outline' style={{
                                    color: color.placeHolder,
                                    fontSize: 40
                                }}/>
                                <Text style={{
                                    color: color.placeHolder
                                }}>There is no pending overtime request!</Text>
                            </View>
                        </Content>
                    </Container>
                )
            case 'third':
                console.log("Third Click")
                return <History />;
            default:
                return null;
        }
    }

    render() {
        console.log("Reach OT Screen")
        if (this.state.url === null && this.state.auth === null && this.state.id === null) {
            return (
                <Loading />
            )
        }

        return (
            <Container>
            <Header style={{
                    backgroundColor: color.light,
                    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
                        }}>Overtime</Text>
                    </Left>
                    <Right></Right>
                </Header>
                
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
                swipeEnabled={false}
                lazy = {true}
                //initialRouteName = {'Request'}
            />
            </Container>
        )
    }
}