import React, { Component } from 'react';
import { Platform, StatusBar, AsyncStorage, } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { View, Text, Content, Container, Toast, Tab, Header, Left, Right, Icon, Card, CardItem, Body, Row, Col,
     Button, Picker, Form, Item, Label, Badge} from 'native-base'
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
            selectedLeaveType: '',
            leaveHistoryLists: [],
            year: null,
            month: null,
            status: 'all',
            token: null,
        };

    }

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
    
    // update ot list
    updateLeave = () => {
        APIs.LeaveMonthly(this.state.url, this.state.auth, this.state.id, this.state.year, this.state.month)
        .then((res) => {
            if(res.status === 'success') {
                if(this.state.status !== 'all') {
                    let data = res.data.filter(list => list.state === this.state.status)
                    this.setState({
                        leaveHistoryLists: data
                    })
                } else {
                    this.setState({
                        leaveHistoryLists: res.data
                    })
                }
            } else {
                this.setState({
                    leaveHistoryLists: []
                })
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
            let date = new Date()
            this.setState({
                refresh: !this.state.refresh,
                index: 0,
                year: date.getFullYear(),
                month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
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
                            this.getRequestData(auth, url);
                            this.getApproveData(auth, id, url);
                            this.getHistoryData(auth, id, url);
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
        APIs.LeaveMonthly(url, auth, id, this.state.year, this.state.month)
            .then((res) => {
                if (res.status === 'success') {
                    if (this.state.status !== 'all') {
                        let data = res.data.filter(list => list.state === this.state.status)
                        this.setState({
                            leaveHistoryLists: data
                        })
                    } else {
                        
                        this.setState({
                            leaveHistoryLists: res.data
                        })
                    }
                } else {
                    this.setState({
                        leaveHistoryLists: []
                    })
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

    _renderTabBar = props => (
        <TabBar
            renderLabel={this._renderLabel}
            {...props}
            indicatorStyle={{ backgroundColor: color.indicator, height: 5 }}
            style={{ backgroundColor: color.primary }}
            labelStyle={{ color: 'white', fontFamily: 'Nunito-Bold' }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'first') {
                    this.getRequestData(this.state.auth, this.state.url)
                } else if (route.key === 'second') {
                    this.getApproveData(this.state.auth, this.state.id, this.state.url)
                } else if (route.key === 'third'){
                    this.getHistoryData(this.state.auth, this.state.id, this.state.url)
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
                const GetLeave = this.state.leaves.map((leave) => {
                    return (
                        <Card key={leave['Obj id']}>
                            <CardItem>
                                <Body>
                                    <View style={styLeave.cardTitleContainer}>
                                        <Text style={styLeave.cardTitle}>{leave['Leave Type']}</Text>
                                    </View>
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
                                }} />
                                <Text style={{
                                    color: color.placeHolder
                                }}>There is no pending leave request!</Text>
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

                // data render
                let GetLeavesRequest = this.state.leaveHistoryLists.map((leave) => {
                    let background;
                    if (leave.state === 'cancel') {
                        background = color.placeHolder
                    } else if (leave.state === 'reject') {
                        background = color.danger
                    } else {
                        background = color.primary
                    }

                    return (
                        <Card key={Math.floor(Math.random() * 1000)}>
                            <CardItem>
                                <Body>
                                    <View style={styLeave.cardTitleContainer}>
                                        <Text style={styLeave.cardTitle}>{leave.Leave_Type}</Text>
                                    </View>
                                    <View style={styLeave.cardTitleContainer}>
                                    
                                        <Text style={styLeave.dateFromText}>{`${leave.date_from} to ${leave.date_to}`}</Text>
                                        <View style = {{backgroundColor: background, borderRadius: 5, paddingTop: 4,paddingBottom: 4, paddingLeft: 10, paddingRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style= {{color: "#fff", fontSize: 12}}>{leave.state}</Text>
                                        </View>
                                    </View>
                                    <Text style = {styLeave.cardWarning}>{leave["State Note"]}</Text>
                                    <Text style={[styLeave.cardReasonLabelText, {
                                        display: leave.Reason === null || leave.Reason === 'null' ? 'none' : 'flex'
                                    }]}>Reason:  {leave.Reason}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })

                return (
                    <Container>
                        <Content style={styLeave.overlay}>
                            <Form style={styLeave.container}>
                                <Row>
                                    <Col style={styLeave.left}>
                                        <Item picker style={styLeave.picker}>
                                            <Label style={styLeave.label}>
                                                <Text style={styLeave.placeholder}>Year</Text>
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
                                    <Col style={styLeave.right}>
                                        <Item picker style={styLeave.picker}>
                                            <Label style={styLeave.label}>
                                                <Text style={styLeave.placeholder}>Month</Text>
                                            </Label>
                                            <Picker mode="dialog"
                                            iosIcon={
                                                <Icon name="arrow-down" />
                                            }
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

                                <Button
                                    style={styLeave.buttonPrimary}
                                    onPress={() => this.updateLeave()}
                                >
                                    <Text>Search</Text>
                                </Button>
                            </Form>
                            <View style={styLeave.resultBox}>
                                {GetLeavesRequest}

                                <View style={{
                                    display: this.state.leaveHistoryLists.length === 0 ? 'flex' : 'none',
                                    alignItems: "center"
                                }}>
                                    <Icon name='ios-information-circle-outline' style={{
                                        color: color.placeHolder,
                                        fontSize: 40
                                    }} />
                                    <Text style={{
                                        color: color.placeHolder
                                    }}>There is no leave request for {this.state.month}-{this.state.year}!</Text>
                                </View>
                            </View>
                        </Content>
                    </Container>
                )
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
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Leave</Text>
                    </Left>
                    <Right></Right>
                </Header>
                
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    swipeEnabled={false}
                />
            </Container>
        );
    }
}