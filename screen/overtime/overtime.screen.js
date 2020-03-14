import React, { Component } from 'react'
import { View, Text, Content, Container, Toast, Tab, Header, Left, Right, Icon } from 'native-base'
import styOt from './overtime.style'
import po from './po'
import Request from './_request.screen'
import Pending from './_pending.screen'
import History from './_history.screen'
import color from '../../constant/color'
import offset from '../../constant/offset'
import Loading from '../../components/loading.component'
import { AsyncStorage } from 'react-native'
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
                { key: 'second', title: 'Approve' },
                { key: 'third', title: 'History' },
            ],
            data: [],
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
                        this.getApproveData(auth, id, url);
                    })
            })
    }

    getRequestData(auth, url) {

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

    _handleIndexChange = index => this.setState({ index });

    _renderLabel = ({ route }) => (
        <Text style={{ color: 'white' }}>{route.title}</Text>
    );

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
                return (
                    <Request
                        auth={this.state.auth}
                        id={this.state.id}
                        url={this.state.url}
                    //data = {this.state.data}
                    />
                )
            case 'second':
                console.log("Data:::", this.state.data)
                return (
                    <Pending
                        auth={this.state.auth}
                        id={this.state.id}
                        url={this.state.url}
                    //data = {this.state.data}
                    />
                )

            case 'third':
                return <History />;
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
                    backgroundColor: color.light
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

                />
            </Container>
        )
    }
}