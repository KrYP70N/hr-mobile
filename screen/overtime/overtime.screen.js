import React, { Component } from 'react'
import {
    View, Text, Content, Container, Toast, Tab, Header, Left, Right, Icon,
    Card, CardItem, Body, Row, Col, Button, Form, Item, Label,
    Input, Picker, Badge,
} from 'native-base'
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
            //for History
            year: null,
            month: null,
            status: 'all',
            record: [],
        }
    }

    //for History
    // handel year
    chageYear = (year) => {
        this.setState({
            year: year
        })
    }

    // handel month
    changeMonth = (month) => {
        this.setState({
            month: month + 1 < 10 ? '0' + ( month + 1 ) : month + 1
        })
    }

    // handel status
    changeStatus = (status) => {
        this.setState({
            status: status
        })
    }

    // handel otlist
    getOT = () => {
        APIs.OTMonthly(this.state.url, this.state.auth, this.state.id, this.state.year, this.state.month)
            .then((res) => {

                if (res.status === 'success') {
                    this.setState({
                        record: res.data
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
            let currentdate = new Date();
            this.setState({
                refresh: !this.state.refresh, index: 0,
                year: currentdate.getFullYear(),
                month: currentdate.getMonth() + 1 < 10 ? '0' + (currentdate.getMonth() + 1) : currentdate.getMonth() + 1
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
                            this.getApproveData(auth, id, url);
                            this.getHistoryData(auth, id, url);
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
                    this.setState({
                        data: res.data
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
        APIs.OTMonthly(url, auth, id, this.state.year, this.state.month)
            .then((res) => {

                if (res.status === 'success') {
                    this.setState({
                        record: res.data
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

    cancelOT = (data) => {
        APIs.OTUpdateStatus(data, this.state.auth, this.state.url, 'cancel')
            .then((res) => {
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

                if (res.status !== 'success') {
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
            labelStyle={{ color: 'white', fontFamily: 'Nunito-Bold' }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'first') {
                    //this.getRequestData(this.state.auth, this.state.url, this.state.id)
                } else if (route.key === 'second') {
                    this.getApproveData(this.state.auth, this.state.id, this.state.url)
                } else if (route.key === 'third') {
                    this.getHistoryData(this.state.auth, this.state.id, this.state.url)
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
                        <Card key={req["Obj Id"]}>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                                    </View>
                                    <Text style={styOt.cardXSText}>From : {`${req['date_from']}`}</Text>
                                    <Text style={styOt.cardXSText}>To : {`${req['date_to']}`}</Text>
                                    <Text style={styOt.cardSText}>{po.approve.staff.label2}{`${req['hour']} : ${req['minute']} `}</Text>
                                    <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                                    <Button
                                        style={styOt.ButtonSecondary}
                                        onPress={() => this.cancelOT(req['Obj Id'])}
                                    >
                                        <Text>Cancel</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })

                return (
                    <Container >
                        <Content style={{ padding: 10 }}>
                            <View style={{ paddingBottom: 30 }}>
                                {requests}
                            </View>
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                display: this.state.data.length === 0 || this.state.data === null ? 'flex' : 'none'
                            }}>
                                <Icon name='ios-information-circle-outline' style={{
                                    color: color.placeHolder,
                                    fontSize: 40
                                }} />
                                <Text style={{
                                    color: color.placeHolder
                                }}>There is no pending overtime request!</Text>
                            </View>
                        </Content>
                    </Container>
                )
            case 'third':
        
                if (
                    this.state.month === null ||
                    this.state.year === null ||
                    this.state.url === null ||
                    this.state.auth === null ||
                    this.state.id === null ||
                    this.state.leaveHistoryLists === null
                ) {
                    return (
                        <Loading info='loading api data ...' />
                    )
                }
                let currentYear = new Date().getFullYear()

                // year render
                let years = []

                for (let i = currentYear; i > 1986; i--) {
                    years.push(i)
                }

                let getYear = years.map((year) => {
                    return (
                        <Picker.Item label={year.toString()} value={year} key={year} />
                    )
                })

                // month render
                let currentMonth = new Date().getMonth()
                let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                let monthEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                let getMonth = months.map((month) => {
                    return (
                        <Picker.Item label={monthEng[month]} value={month} key={month} />
                    )
                })

                let records = this.state.record.map((record, idx) => {
                    let badge_color = color.primary

                    if (record.state === 'Cancel' || record.state === 'cancel') {
                        badge_color = color.placeHolder
                    } else if (record.state === 'refuse' || record.state === 'Refuse') {
                        badge_color = color.danger
                    }

                    return (
                        <Card key={idx.toString()}>
                            <CardItem>
                                <Body>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardXSText}>OT Hours - {record.hour}:{record.minute}</Text>
                                        <View style = {{backgroundColor: badge_color, borderRadius: 5, paddingTop: 4,paddingBottom: 4, paddingLeft: 10, paddingRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style= {{color: "#fff", fontSize: 12}}>{record.state}</Text>
                                        </View>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.dateFromText}>From - {record.date_from}</Text>
                                    </View>
                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.dateFromText}>To   - {record.date_to}</Text>
                                    </View>

                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardWarning}>{record["State Note"]}</Text>
                                    </View>

                                    <View style={styOt.cardTitleContainer}>
                                        <Text style={styOt.cardReasonLabelText}>Reason:  {record.name}</Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })

                return (
                    <Container>
                        <Content style={styOt.overlay}>
                            <Form style={styOt.container}>
                                <Row>
                                    <Col style={styOt.left}>
                                        <Item picker style={styOt.picker}>
                                            <Label style={styOt.label}>
                                                <Text>Year</Text>
                                            </Label>
                                            <Picker mode="dialog"
                                                iosIcon={
                                                    <Icon name="arrow-down" />
                                                }
                                                placeholder="Status"
                                                textStyle={{ color: color.primary }}
                                                selectedValue={this.state.year}
                                                onValueChange={this.chageYear.bind(this)}
                                            >
                                                {getYear}
                                            </Picker>
                                        </Item>
                                    </Col>
                                    <Col style={styOt.right}>
                                        <Item picker style={styOt.picker}>
                                            <Label style={styOt.label}>
                                                <Text>Month</Text>
                                            </Label>
                                            <Picker
                                                iosIcon={
                                                    <Icon name="arrow-down" />
                                                }
                                                mode="dialog"
                                                placeholder="Status"
                                                textStyle={{ color: color.primary }}
                                                selectedValue={Number(this.state.month) - 1}
                                                onValueChange={this.changeMonth.bind(this)}
                                            >
                                                {getMonth}
                                            </Picker>
                                        </Item>
                                    </Col>
                                </Row>
                                <Button style={styOt.buttonPrimary}
                                    onPress={this.getOT}
                                >
                                    <Text>Search</Text>
                                </Button>
                            </Form>
                            <View style={styOt.resultBox}>
                                {records}
                            </View>
                            <View style={{
                                display: this.state.record.length === 0 ? 'flex' : 'none',
                                alignItems: 'center'
                            }}>
                                <Icon name='ios-information-circle-outline' style={{
                                    color: color.placeHolder,
                                    fontSize: 40
                                }} />
                                <Text style={{
                                    color: color.placeHolder
                                }}>There is no overtime request for {this.state.month}-{this.state.year}</Text>
                            </View>
                        </Content>
                    </Container>
                )
            default:
                return null;
        }
    }

    render() {
        if (this.state.url === null && this.state.auth === null && this.state.id === null) {
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
                    lazy={true}
                />
            </Container>
        )
    }
}