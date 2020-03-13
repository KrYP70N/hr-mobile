import React, { Component } from 'react';
import { Text, Platform, StatusBar, AsyncStorage,} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Header, Left, Right, Container, Toast, Icon,} from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import LeaveRequest from './_request.screen'
import LeaveApprove from './_approve.screen'
import LeaveHistory from './_history.screen'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'

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
                { key: 'second', title: 'Approve' },
                { key: 'third', title: 'History' },
            ],
            leaveType: [],
            leaves: [],
        };

    }
    componentDidMount() {
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
    }

    _handleIndexChange = index => this.setState({ index });

    _renderLabel = ({ route }) => (
        <Text style={{ color: 'white' }}>{route.title}</Text>
    );

    getRequestData(auth, url) {
        APIs.getLeaveType(auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    console.log(res.data)
                    this.setState({
                        leaveType: res.data
                    })
                    // select leave type
                    this.setState({
                        selectedLeaveType: res.data[0]['leave_type_id']
                    })
                } else {
                    this.props.navigation.navigate('Login')
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
                        text: 'Sever Error! Please try again in later.'
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
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: color.primary }}
            labelStyle={{ color: 'white' }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'first') {
                    this.getRequestData(this.state.auth, this.state.url)
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
                return(
                    <LeaveRequest 
                    auth = {this.state.auth}
                    id = {this.state.id}
                    url = {this.state.url}
                    leaveType = {this.state.leaveType}
                     />
                )
            case 'second':
                console.log("Leaves;:::", this.state.leaves)
                return(
                    <LeaveApprove leaves = {this.state.leaves} />
                )
                
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
                        }}>Leave</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}

                />
            </Container>
        );
    }
}