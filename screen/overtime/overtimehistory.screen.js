import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage } from 'react-native'
import { Left, Right, Icon, Container, Content, Header, Toast } from 'native-base'

import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from '../leave/leave.style'

// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/otstatuscard.component'

import APIs from '../../controllers/api.controller'
import moment from 'moment'

export class OvertimeHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            OTHistoryLists: [],
            filter: true,
            OTStatus: []
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
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
                            this.getOTHistory(auth, id, url, this.state.year, this.state.month);
                            APIs.getOTStatus(url, auth)
                                .then((res) => {
                                    console.log('OT Status', res.data)
                                    this.setState({
                                        OTStatus: res.data
                                    })
                                })
                        })
                })
        })
    }

    getOTHistory(auth, id, url, year, month) {
        APIs.getOTHistory(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Leave Data", res.data)
                    this.setState({
                        OTHistoryLists: res.data
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

    // change value
    changeValue = (date, status) => {
        this.getOTHistory(this.state.auth, this.state.id, this.state.url, moment(date).format('YYYY'), moment(date).format('MM'), status)
    }

    render() {
        console.log("OT History List", this.state.OTHistoryLists)
        let statusData = this.state.OTHistoryLists.map((history, index) => {
            return (
                <StatusCard
                    key={index}
                    hour={`${history['hour']}:${history['minute']}`}
                    date_from={history['date_from']}
                    date_to={history['date_to']}
                    description = {history['name']=== null ? '': history['name']}
                    status={history.state}
                />
            )
        })

        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
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
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>History</Text>
                    </Left>
                    <Right>
                        <Icon
                            name="ios-options"
                            onPress={() => {
                                this.setState({
                                    filter: !this.state.filter
                                })
                            }}
                        />
                    </Right>
                </Header>
                <Content style={styles.pdContainer}>
                    <MonthPicker
                        show={this.state.filter}
                        onClosePress={() => this.setState({
                            filter: !this.state.filter
                        })}
                        optionList={this.state.OTStatus}
                        onChangeValue={this.changeValue}
                    />
                    {statusData}
                    {/* <StatusCard
                        key={index}
                        hour={2}
                        date_from={`2020-5-20 03:01:15`}
                        date_to={`2020-5-2020 05:01:15`}
                        status={`Approved`}
                    />
                    <StatusCard
                        key={index}
                        hour={3}
                        date_from={`2020-5-20 03:01:15`}
                        date_to={`2020-5-2020 05:01:15`}
                        status={`Rejected`}
                    /> */}
                </Content>
            </Container>
        )
    }
}

export default OvertimeHistory
