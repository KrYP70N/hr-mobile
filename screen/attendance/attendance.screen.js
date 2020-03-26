

import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon, Header, Left, Right, Toast } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import Loading from '../../components/loading.component'
import Clock from '../../components/time.component'
import CheckInOut from '../../components/checkinout.component'
import APIs from '../../controllers/api.controller'

import offset from '../../constant/offset'
import color from '../../constant/color'
import { AsyncStorage, StatusBar, Platform, BackHandler } from 'react-native'

export default class Attendance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            token: null,
            id: null,
            data: null,
            dataTitle: null
        }
    }

    componentDidMount() {
       
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            this.setState({
                url: JSON.parse(res).ApiEndPoint
            })
            AsyncStorage.getItem('@hr:token')
            .then((res) => {
                this.setState({
                    token: JSON.parse(res).key,
                    id: JSON.parse(res).id
                })
            })
        })

        this.props.navigation.addListener('focus', () => {
            if(
                this.state.url !== null &&
                this.state.token !== null &&
                this.state.id !== null
            ) {
                APIs.AttendanceSummary(this.state.url, this.state.token, this.state.id)
                .then((res) => {
                    this.setState({
                        data: res.data
                    })
                })
            }
        })
    }

    componentDidUpdate() {
        if(
            this.state.url !== null &&
            this.state.token !== null &&
            this.state.id !== null &&
            this.state.data === null
        ) {
            APIs.AttendanceSummary(this.state.url, this.state.token, this.state.id)
            .then((res) => {
                if(res.status === 'success') {
                    this.setState({
                        data: res.data
                    })
                } else {
                    this.setState({
                        data: []
                    })
                }
            })
        }

        if (this.state.data !== null && this.state.dataTitle === null) {
            let titles = []
            for (const key in this.state.data) {
                if (this.state.data.hasOwnProperty(key)) {
                    titles.push(key)
                }
            }
            this.setState({
                dataTitle: titles
            })
        }
    }

    render() {
        if (this.state.data === null || this.state.dataTitle === null) {
            return (
                <Loading />
            )
        }

        let infos = this.state.dataTitle.map((title) => {
            return (
                <Card style={[styAttend.infoCard,
                this.state.data[title][0][0] === null || this.state.data[title][0][0] === 0 ? { display: 'none' } : null
                ]} key={title}>
                    <View style={styAttend.cardLTitle}>
                        <Text style={styAttend.infoCardTitle}>{title}</Text>
                        <Text style={styAttend.infoCardLabelSuccess}>{this.state.data[title][0]}</Text>
                    </View>
                </Card>
            )
        })
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
                        }}>Attendance</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <Content>
                    {/* time card */}
                    <View style={styAttend.timeBanner}>
                        <Clock style={styAttend.time} monthStyle={styAttend.date} navigation={this.props.navigation} view="split" />

                    </View>
                    {/* check in / out */}
                    <CheckInOut navigation={this.props.navigation}/>

                    <View style={[styAttend.container, {
                        marginBottom: offset.o3
                    }]}>

                        {infos}

                    </View>
                </Content>
            </Container>
        )
    }
}